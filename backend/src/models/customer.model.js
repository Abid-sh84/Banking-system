const { pool, query } = require('../config/db.config');
const bcrypt = require('bcrypt');
const { ApiError } = require('../utils/error.utils');
const emailService = require('../utils/email.utils');

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
        // Insert customer with initial balance of 0 - using lowercase status to match DB constraint
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
    const { name, address, phone, email } = updateData;
    
    try {
      let sql = 'UPDATE customers SET ';
      const params = [];
      const updates = [];
      
      // Build dynamic SQL query with only fields that are provided
      if (name !== undefined) {
        params.push(name);
        updates.push(`name = $${params.length}`);
      }
      
      if (address !== undefined) {
        params.push(address);
        updates.push(`address = $${params.length}`);
      }
      
      if (phone !== undefined) {
        params.push(phone);
        updates.push(`phone = $${params.length}`);
      }
      
      if (email !== undefined) {
        // Check if email already exists for another user
        const emailCheck = await query(
          'SELECT id FROM customers WHERE email = $1 AND id != $2',
          [email, id]
        );
        
        if (emailCheck.rows.length > 0) {
          throw new ApiError(409, 'Email already in use by another customer');
        }
        
        params.push(email);
        updates.push(`email = $${params.length}`);
      }
      
      // Add updated_at timestamp
      updates.push(`updated_at = NOW()`);
      
      // Complete the SQL query
      sql += updates.join(', ');
      
      // Add WHERE clause and RETURNING
      params.push(id);
      sql += ` WHERE id = $${params.length} RETURNING *`;
      
      // Execute the query
      const result = await query(sql, params);
      
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
  
  // Find customer by phone or account number (for transfers)
  static async findByPhoneOrAccount(identifier, type) {
    try {
      let queryString, params;
      
      if (type === 'phone') {
        queryString = 'SELECT id, name, account_number FROM customers WHERE phone = $1';
        params = [identifier];
      } else if (type === 'account') {
        queryString = 'SELECT id, name, account_number FROM customers WHERE account_number = $1';
        params = [identifier];
      } else {
        throw new ApiError(400, 'Invalid search type');
      }
      
      const result = await query(queryString, params);
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      // Return limited information for security
      return result.rows[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error finding customer: ${error.message}`);
    }
  }
    // Transfer money between accounts
  static async transferMoney(senderId, recipientId, amount, description) {
    const client = await pool.connect();
    
    try {
      console.log('Starting transfer process:', {
        senderId, 
        recipientId,
        amount,
        senderIdType: typeof senderId,
        recipientIdType: typeof recipientId
      });
      
      // Start transaction
      await client.query('BEGIN');
        // Get current balances - ensure IDs are parsed as integers for PostgreSQL
      const senderIdNum = parseInt(senderId, 10);
      const recipientIdNum = parseInt(recipientId, 10);
      
      if (isNaN(senderIdNum) || isNaN(recipientIdNum)) {
        throw new ApiError(400, 'Invalid sender or recipient ID');
      }
      
      const senderResult = await client.query(
        'SELECT balance FROM customers WHERE id = $1 FOR UPDATE',
        [senderIdNum]
      );
      
      if (senderResult.rows.length === 0) {
        throw new ApiError(404, 'Sender account not found');
      }
      
      const recipientResult = await client.query(
        'SELECT id FROM customers WHERE id = $1 FOR UPDATE',
        [recipientIdNum]
      );
      
      if (recipientResult.rows.length === 0) {
        throw new ApiError(404, 'Recipient account not found');
      }
      
      const senderBalance = parseFloat(senderResult.rows[0].balance);
      
      // Check if sender has enough balance
      if (senderBalance < amount) {
        throw new ApiError(400, 'Insufficient balance');
      }
        // Update sender's balance
      await client.query(
        'UPDATE customers SET balance = balance - $1, updated_at = NOW() WHERE id = $2',
        [amount, senderIdNum]
      );
      
      // Update recipient's balance
      await client.query(
        'UPDATE customers SET balance = balance + $1, updated_at = NOW() WHERE id = $2',
        [amount, recipientIdNum]
      );
        // Create transaction records
      const transferId = 'TRF' + Date.now() + Math.floor(Math.random() * 1000);
        // Sender's transaction record (withdrawal)
      const senderTxResult = await client.query(
        'INSERT INTO transactions (customer_id, type, amount, description, sender_id, receiver_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        [senderIdNum, 'transfer', amount, description || 'Transfer to another account', senderIdNum, recipientIdNum, 'completed']
      );
      
      // Recipient's transaction record (deposit)
      await client.query(
        'INSERT INTO transactions (customer_id, type, amount, description, sender_id, receiver_id, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [recipientIdNum, 'received', amount, description || 'Transfer from another account', senderIdNum, recipientIdNum, 'completed']
      );
        // Commit transaction
      await client.query('COMMIT');
          // Get updated sender and recipient details for email notifications
      const updatedSenderResult = await client.query(
        'SELECT id, name, email, balance FROM customers WHERE id = $1',
        [senderIdNum]
      );
      
      const updatedRecipientResult = await client.query(
        'SELECT id, name, email, balance FROM customers WHERE id = $1',
        [recipientIdNum]
      );
      
      // Log sender and recipient info for debugging
      console.log('Sender details:', {
        id: updatedSenderResult.rows[0]?.id,
        name: updatedSenderResult.rows[0]?.name,
        emailPresent: !!updatedSenderResult.rows[0]?.email,
        balance: updatedSenderResult.rows[0]?.balance
      });
      
      console.log('Recipient details:', {
        id: updatedRecipientResult.rows[0]?.id,
        name: updatedRecipientResult.rows[0]?.name,
        emailPresent: !!updatedRecipientResult.rows[0]?.email,
        balance: updatedRecipientResult.rows[0]?.balance
      });
      
      // Send debit notification to sender
      try {
        if (updatedSenderResult.rows[0]?.email) {
          console.log(`Sending debit notification to ${updatedSenderResult.rows[0].email}`);
          await emailService.sendTransactionNotification({
            to: updatedSenderResult.rows[0].email,
            subject: 'Debit Alert - Money Transfer',
            transactionDetails: {
              type: 'transfer',
              amount,
              description: description || 'Transfer to another account',
              balance: parseFloat(updatedSenderResult.rows[0].balance),
              transactionId: senderTxResult.rows[0].id
            }
          });
          console.log('Debit notification sent successfully');
        } else {
          console.warn('Sender email not found, skipping debit notification');
        }
      } catch (emailError) {
        console.error('Failed to send debit notification:', emailError.message);
        // Continue execution despite email failure
      }
      
      // Send credit notification to recipient
      try {
        if (updatedRecipientResult.rows[0]?.email) {
          console.log(`Sending credit notification to ${updatedRecipientResult.rows[0].email}`);
          await emailService.sendTransactionNotification({
            to: updatedRecipientResult.rows[0].email,
            subject: 'Credit Alert - Money Received',
            transactionDetails: {
              type: 'received',
              amount,
              description: description || 'Transfer from another account',
              balance: parseFloat(updatedRecipientResult.rows[0].balance),
              transactionId: senderTxResult.rows[0].id
            }
          });
          console.log('Credit notification sent successfully');
        } else {
          console.warn('Recipient email not found, skipping credit notification');
        }
      } catch (emailError) {
        console.error('Failed to send credit notification:', emailError.message);
        // Continue execution despite email failure
      }
      
      return {
        success: true,
        transactionId: senderTxResult.rows[0].id,
        balance: parseFloat(updatedSenderResult.rows[0].balance)
      };} catch (error) {
      // Rollback transaction in case of error
      await client.query('ROLLBACK');
      
      console.error('Transfer error in model:', {
        senderId,
        recipientId,
        amount,
        error: error.message,
        stack: error.stack
      });
        // Handle specific database errors
      if (error.code) {
        console.error(`Database error code: ${error.code}, ${error.detail || ''}`);
      }
      
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Transfer failed: ${error.message}`);
    } finally {
      client.release();
    }
  }
  // Update customer status (active, inactive, suspended)
  static async updateStatus(id, status) {
    try {
      // Convert status to lowercase to ensure consistency
      const normalizedStatus = status.toLowerCase();
      
      // Map frontend 'frozen' to database 'suspended'
      let dbStatus = normalizedStatus;
      if (normalizedStatus === 'frozen') {
        dbStatus = 'suspended';
      }
      
      // Validate status against database allowed values
      if (!['active', 'inactive', 'suspended'].includes(dbStatus)) {
        throw new ApiError(400, 'Invalid status value');
      }
      
      const result = await query(
        'UPDATE customers SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [dbStatus, id]
      );
      
      if (result.rowCount === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      return result.rows[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error updating customer status: ${error.message}`);
    }
  }
  
  // Delete customer account
  static async delete(id) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // First check if customer exists
      const checkResult = await client.query(
        'SELECT id FROM customers WHERE id = $1',
        [id]
      );
      
      if (checkResult.rows.length === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      // Delete customer's transactions
      await client.query(
        'DELETE FROM transactions WHERE customer_id = $1 OR sender_id = $1 OR receiver_id = $1',
        [id]
      );
      
      // Delete customer's virtual cards if they exist
      await client.query(
        'DELETE FROM virtual_cards WHERE customer_id = $1',
        [id]
      );
      
      // Finally delete the customer
      await client.query(
        'DELETE FROM customers WHERE id = $1',
        [id]
      );
      
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error deleting customer:', error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error deleting customer: ${error.message}`);
    } finally {
      client.release();
    }
  }
}

module.exports = CustomerModel;
