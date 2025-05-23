const { pool, query } = require('../config/db.config');
const bcrypt = require('bcrypt');
const { ApiError } = require('../utils/error.utils');

class CustomerModel {  // Create a new customer
  static async create(customerData) {
    const { name, email, password, address, phone } = customerData;
    
    try {
      // Check if email already exists
      const existingCustomers = await query(
        'SELECT * FROM customers WHERE email = $1',
        [email]
      );
      
      if (existingCustomers.rows.length > 0) {
        throw new ApiError(409, 'Email already exists');
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Generate account number (randomly for this example)
      const accountNumber = Math.floor(10000000000 + Math.random() * 90000000000).toString();
      
      // Generate a unique customer ID with prefix CUST and 10 random digits
      const customerId = 'CUST' + Math.floor(1000000000 + Math.random() * 9000000000).toString();
        // Get account type from customer data or default to savings
      const accountType = customerData.accountType || 'savings';
      
            // Insert customer with initial balance of 0
      const result = await query(
        'INSERT INTO customers (name, email, password, address, phone, account_number, customer_id, balance, status, account_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
        [name, email, hashedPassword, address, phone, accountNumber, customerId, 0, 'active', accountType]
      );
      
      return {
        id: result.rows[0].id,
        name,
        email,
        account_number: accountNumber,
        balance: 0,
        status: 'active'
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error creating customer: ${error.message}`);    }
  }
  
  // Find a customer by ID
  static async findById(id) {
    try {
      const result = await query(
        'SELECT id, name, email, address, phone, customer_id, account_number, balance, status, account_type, created_at, updated_at FROM customers WHERE id = $1',
        [id]
      );
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      return result.rows[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error finding customer: ${error.message}`);
    }
  }
  
  // Find by email (for login)
  static async findByEmail(email) {
    try {
      const result = await query(
        'SELECT * FROM customers WHERE email = $1',
        [email]
      );
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      return result.rows[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error finding customer: ${error.message}`);
    }
  }
  
  // Update customer profile
  static async update(id, updateData) {
    const { name, address, phone } = updateData;
    
    try {
      const result = await query(
        'UPDATE customers SET name = $1, address = $2, phone = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
        [name, address, phone, id]
      );
      
      if (result.rowCount === 0) {
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
      const result = await query(
        'SELECT password FROM customers WHERE id = $1',
        [id]
      );
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      // Verify old password
      const isMatch = await bcrypt.compare(oldPassword, result.rows[0].password);
      if (!isMatch) {
        throw new ApiError(401, 'Current password is incorrect');
      }
      
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Update password
      await query(
        'UPDATE customers SET password = $1, updated_at = NOW() WHERE id = $2',
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
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Get current balance
      const result = await client.query(
        'SELECT balance FROM customers WHERE id = $1 FOR UPDATE',
        [id]
      );
        if (result.rows.length === 0) {
        throw new ApiError(404, 'Customer not found');
      }
        
      let newBalance;
      if (type === 'credit') {
        // Add amount to balance
        newBalance = parseFloat(result.rows[0].balance) + parseFloat(amount);
      } else if (type === 'debit') {
        // Check if enough balance
        if (parseFloat(result.rows[0].balance) < parseFloat(amount)) {
          throw new ApiError(400, 'Insufficient balance');
        }
        // Subtract amount from balance
        newBalance = parseFloat(result.rows[0].balance) - parseFloat(amount);
      } else {
        throw new ApiError(400, 'Invalid transaction type');
      }
      
      // Update balance
      await client.query(
        'UPDATE customers SET balance = $1, updated_at = NOW() WHERE id = $2',
        [newBalance, id]
      );
      
      await client.query('COMMIT');
      return { id, newBalance };
    } catch (error) {
      await client.query('ROLLBACK');
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error updating balance: ${error.message}`);
    } finally {
      client.release();
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
        
      // Query for customers with pagination
      const result = await query(
        'SELECT id, customer_id, name, email, phone, account_number, balance, status, created_at, updated_at FROM customers ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
      );
      
      // Get total count for accurate pagination
      const countResult = await query('SELECT COUNT(*) FROM customers');
      const total = parseInt(countResult.rows[0].count);
      
      // Add additional logging to help debug
      console.log(`Found ${result.rows.length} customers with limit ${limit} and offset ${offset}`);
      
      return {
        customers: result.rows,
        pagination: {
          limit,
          offset,
          total
        }
      };
    } catch (error) {
      console.error('Error in CustomerModel.findAll:', error);
      throw new ApiError(500, `Error fetching customers: ${error.message}`);
    }
  }
    // Update customer ID
  static async updateCustomerId(id, customerId) {
    try {
      const result = await query(
        'UPDATE customers SET customer_id = $1 WHERE id = $2',
        [customerId, id]
      );
      
      if (result.rowCount === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      return true;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error updating customer ID: ${error.message}`);
    }
  }
}

module.exports = CustomerModel;
