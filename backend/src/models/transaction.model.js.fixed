const { pool } = require('../config/db.config');
const { ApiError } = require('../utils/error.utils');
const CustomerModel = require('./customer.model');

class TransactionModel {
  // Create a new transaction
  static async create(transactionData) {
    const { 
      customer_id, 
      amount, 
      type, 
      description,
      receiver_account_number = null
    } = transactionData;
    
    try {
      const connection = await pool.getConnection();
      
      try {
        await connection.beginTransaction();
        
        // Check if it's a transfer transaction
        if (type === 'transfer' && receiver_account_number) {
          // Find receiver by account number
          const [receivers] = await connection.execute(
            'SELECT id FROM customers WHERE account_number = ?',
            [receiver_account_number]
          );
          
          if (receivers.length === 0) {
            throw new ApiError(404, 'Receiver account not found');
          }
          
          const receiver_id = receivers[0].id;
          
          // Deduct from sender's balance
          await CustomerModel.updateBalance(customer_id, amount, 'debit');
          
          // Add to receiver's balance
          await CustomerModel.updateBalance(receiver_id, amount, 'credit');
          
          // Record the transaction
          const [result] = await connection.execute(
            'INSERT INTO transactions (customer_id, amount, type, description, receiver_id, status) VALUES (?, ?, ?, ?, ?, ?)',
            [customer_id, amount, type, description, receiver_id, 'completed']
          );
          
          // Record the receiver's transaction
          await connection.execute(
            'INSERT INTO transactions (customer_id, amount, type, description, sender_id, status) VALUES (?, ?, ?, ?, ?, ?)',
            [receiver_id, amount, 'received', `Received from transfer: ${description}`, customer_id, 'completed']
          );
          
          await connection.commit();
          
          return {
            id: result.insertId,
            customer_id,
            amount,
            type,
            description,
            receiver_id,
            status: 'completed',
            created_at: new Date()
          };
        } else if (type === 'deposit') {
          // Add to customer's balance
          await CustomerModel.updateBalance(customer_id, amount, 'credit');
          
          // Record the transaction
          const [result] = await connection.execute(
            'INSERT INTO transactions (customer_id, amount, type, description, status) VALUES (?, ?, ?, ?, ?)',
            [customer_id, amount, type, description, 'completed']
          );
          
          await connection.commit();
          
          return {
            id: result.insertId,
            customer_id,
            amount,
            type,
            description,
            status: 'completed',
            created_at: new Date()
          };
        } else if (type === 'withdrawal') {
          // Deduct from customer's balance
          await CustomerModel.updateBalance(customer_id, amount, 'debit');
          
          // Record the transaction
          const [result] = await connection.execute(
            'INSERT INTO transactions (customer_id, amount, type, description, status) VALUES (?, ?, ?, ?, ?)',
            [customer_id, amount, type, description, 'completed']
          );
          
          await connection.commit();
          
          return {
            id: result.insertId,
            customer_id,
            amount,
            type,
            description,
            status: 'completed',
            created_at: new Date()
          };
        } else {
          throw new ApiError(400, 'Invalid transaction type');
        }
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error creating transaction: ${error.message}`);
    }
  }
  
  // Get transactions for a customer
  static async findByCustomerId(customerId, limit = 50, offset = 0) {
    try {
      // Convert limit and offset to integers to ensure they are valid
      const safeLimit = parseInt(limit) || 50;
      const safeOffset = parseInt(offset) || 0;
      
      // Use the query directly without parameterized LIMIT and OFFSET
      const query = `SELECT t.*, 
          s.name as sender_name, s.account_number as sender_account_number,
          r.name as receiver_name, r.account_number as receiver_account_number
        FROM transactions t
        LEFT JOIN customers s ON t.sender_id = s.id
        LEFT JOIN customers r ON t.receiver_id = r.id
        WHERE t.customer_id = ?
        ORDER BY t.created_at DESC
        LIMIT ${safeLimit} OFFSET ${safeOffset}`;
      
      const [transactions] = await pool.execute(query, [customerId]);
      
      const [total] = await pool.execute(
        'SELECT COUNT(*) as total FROM transactions WHERE customer_id = ?',
        [customerId]
      );
      
      return {
        transactions,
        total: total[0].total,
        limit: safeLimit,
        offset: safeOffset
      };
    } catch (error) {
      throw new ApiError(500, `Error fetching transactions: ${error.message}`);
    }
  }
  
  // Get a transaction by ID
  static async findById(id) {
    try {
      const [transactions] = await pool.execute(
        `SELECT t.*, 
          s.name as sender_name, s.account_number as sender_account_number,
          r.name as receiver_name, r.account_number as receiver_account_number
        FROM transactions t
        LEFT JOIN customers s ON t.sender_id = s.id
        LEFT JOIN customers r ON t.receiver_id = r.id
        WHERE t.id = ?`,
        [id]
      );
      
      if (transactions.length === 0) {
        throw new ApiError(404, 'Transaction not found');
      }
      
      return transactions[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error finding transaction: ${error.message}`);
    }
  }
  
  // Get all transactions (for banker dashboard)
  static async findAll(limit = 100, offset = 0, filters = {}) {
    try {
      // Build query parts
      let query = `
        SELECT t.*, 
          c.name as customer_name, c.account_number
        FROM transactions t
        JOIN customers c ON t.customer_id = c.id
      `;
      
      const queryParams = [];
      
      // Add filters if any
      if (Object.keys(filters).length > 0) {
        query += ' WHERE';
        let filterAdded = false;
        
        if (filters.type) {
          query += ' t.type = ?';
          queryParams.push(filters.type);
          filterAdded = true;
        }
        
        if (filters.startDate && filters.endDate) {
          if (filterAdded) query += ' AND';
          // Modify date range to be inclusive of the whole day
          query += ' DATE(t.created_at) BETWEEN DATE(?) AND DATE(?)';
          queryParams.push(filters.startDate, filters.endDate);
          filterAdded = true;
        }
        
        if (filters.customerId) {
          if (filterAdded) query += ' AND';
          query += ' t.customer_id = ?';
          queryParams.push(filters.customerId);
          filterAdded = true;
        }
      }
      
      // Add order and limit
      query += ' ORDER BY t.created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(parseInt(limit, 10), parseInt(offset, 10));
      
      // Add extra logging for debugging
      console.log('Transaction query:', query);
      console.log('Transaction params:', queryParams);
      
      const [transactions] = await pool.execute(query, queryParams);
      
      console.log(`Found ${transactions.length} transactions`);
      
      // Count total with the same filters
      let countQuery = 'SELECT COUNT(*) as total FROM transactions t';
      const countParams = [...queryParams];
      countParams.pop(); // Remove offset
      countParams.pop(); // Remove limit
      
      if (Object.keys(filters).length > 0) {
        countQuery += ' WHERE';
        let filterAdded = false;
        
        if (filters.type) {
          countQuery += ' t.type = ?';
          filterAdded = true;
        }
        
        if (filters.startDate && filters.endDate) {
          if (filterAdded) countQuery += ' AND';
          // Use the same DATE() function for consistency
          countQuery += ' DATE(t.created_at) BETWEEN DATE(?) AND DATE(?)';
          filterAdded = true;
        }
        
        if (filters.customerId) {
          if (filterAdded) countQuery += ' AND';
          countQuery += ' t.customer_id = ?';
          filterAdded = true;
        }
      }
      
      const [total] = await pool.execute(countQuery, countParams);
      
      return {
        transactions,
        total: total[0]?.total || 0,
        limit,
        offset
      };
    } catch (error) {
      console.error('Error in TransactionModel.findAll:', error);
      throw new ApiError(500, `Error fetching transactions: ${error.message}`);
    }
  }
}

module.exports = TransactionModel;
