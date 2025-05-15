const { pool } = require('../config/db.config');
const bcrypt = require('bcrypt');
const { ApiError } = require('../utils/error.utils');

class CustomerModel {
  // Create a new customer
  static async create(customerData) {
    const { name, email, password, address, phone } = customerData;
    
    try {
      // Check if email already exists
      const [existingCustomers] = await pool.execute(
        'SELECT * FROM customers WHERE email = ?',
        [email]
      );
      
      if (existingCustomers.length > 0) {
        throw new ApiError(409, 'Email already exists');
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Generate account number (randomly for this example)
      const accountNumber = Math.floor(10000000000 + Math.random() * 90000000000).toString();
      
      // Insert customer with initial balance of 0
      const [result] = await pool.execute(
        'INSERT INTO customers (name, email, password, address, phone, account_number, balance, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, email, hashedPassword, address, phone, accountNumber, 0, 'active']
      );
      
      return {
        id: result.insertId,
        name,
        email,
        account_number: accountNumber,
        balance: 0,
        status: 'active'
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error creating customer: ${error.message}`);
    }
  }
  
  // Find a customer by ID
  static async findById(id) {
    try {
      const [customers] = await pool.execute(
        'SELECT id, name, email, address, phone, account_number, balance, status, created_at, updated_at FROM customers WHERE id = ?',
        [id]
      );
      
      if (customers.length === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      return customers[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error finding customer: ${error.message}`);
    }
  }
  
  // Find by email (for login)
  static async findByEmail(email) {
    try {
      const [customers] = await pool.execute(
        'SELECT * FROM customers WHERE email = ?',
        [email]
      );
      
      if (customers.length === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      return customers[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error finding customer: ${error.message}`);
    }
  }
  
  // Update customer profile
  static async update(id, updateData) {
    const { name, address, phone } = updateData;
    
    try {
      const [result] = await pool.execute(
        'UPDATE customers SET name = ?, address = ?, phone = ?, updated_at = NOW() WHERE id = ?',
        [name, address, phone, id]
      );
      
      if (result.affectedRows === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      return await this.findById(id);
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error updating customer: ${error.message}`);
    }
  }
  
  // Change password
  static async changePassword(id, oldPassword, newPassword) {
    try {
      // Get current password
      const [customers] = await pool.execute(
        'SELECT password FROM customers WHERE id = ?',
        [id]
      );
      
      if (customers.length === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      // Verify old password
      const isMatch = await bcrypt.compare(oldPassword, customers[0].password);
      if (!isMatch) {
        throw new ApiError(401, 'Current password is incorrect');
      }
      
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Update password
      await pool.execute(
        'UPDATE customers SET password = ?, updated_at = NOW() WHERE id = ?',
        [hashedPassword, id]
      );
      
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error changing password: ${error.message}`);
    }
  }
  
  // Update balance (for transactions)
  static async updateBalance(id, amount, type) {
    try {
      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();
        
        // Get current balance
        const [customers] = await connection.execute(
          'SELECT balance FROM customers WHERE id = ? FOR UPDATE',
          [id]
        );
        
        if (customers.length === 0) {
          throw new ApiError(404, 'Customer not found');
        }
        
        let newBalance;
        if (type === 'credit') {
          // Add amount to balance
          newBalance = parseFloat(customers[0].balance) + parseFloat(amount);
        } else if (type === 'debit') {
          // Check if enough balance
          if (parseFloat(customers[0].balance) < parseFloat(amount)) {
            throw new ApiError(400, 'Insufficient balance');
          }
          // Subtract amount from balance
          newBalance = parseFloat(customers[0].balance) - parseFloat(amount);
        } else {
          throw new ApiError(400, 'Invalid transaction type');
        }
        
        // Update balance
        await connection.execute(
          'UPDATE customers SET balance = ?, updated_at = NOW() WHERE id = ?',
          [newBalance, id]
        );
        
        await connection.commit();
        return { id, newBalance };
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error updating balance: ${error.message}`);
    }
  }
  
  // Get all customers (for banker dashboard)
  /**
   * Find all customers with pagination
   * @param {number} limit - Number of records to return
   * @param {number} offset - Number of records to skip
   * @returns {Promise<Array>} - Array of customers
   */
  static async findAll(limit = 50, offset = 0) {
    try {
      // Convert parameters to numbers to ensure correct type
      limit = parseInt(limit, 10) || 50;
      offset = parseInt(offset, 10) || 0;
      
      // Use a simple query without parameters if default values are used
      let query, params;
      
      if (limit === 50 && offset === 0) {
        query = 'SELECT id, name, email, account_number, balance, status, created_at, updated_at FROM customers ORDER BY created_at DESC';
        params = [];
      } else {
        query = 'SELECT id, name, email, account_number, balance, status, created_at, updated_at FROM customers ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params = [limit, offset];
      }
      
      const [customers] = await pool.execute(query, params);
      
      // Add additional logging to help debug
      console.log(`Found ${customers.length} customers with limit ${limit} and offset ${offset}`);
      
      return {
        customers,
        pagination: {
          limit,
          offset,
          total: customers.length // This is not accurate for total count when using pagination
        }
      };
    } catch (error) {
      console.error('Error in CustomerModel.findAll:', error);
      throw new ApiError(500, `Error fetching customers: ${error.message}`);
    }
  }
}

module.exports = CustomerModel;
