const { pool, query } = require('../config/db.config');
const { ApiError } = require('../utils/error.utils');
const CustomerModel = require('./customer.model');
const emailService = require('../utils/email.utils');
const DepositModel = require('./deposit.model');

class TransactionModel {
  // Create a new transaction
  static async create(transactionData) {
    const { 
      customer_id, 
      amount, 
      type, 
      description,
      receiver_account_number = null,
      deposit_type = null,
      interest_rate = null,
      maturity_date = null
    } = transactionData;
    
    try {
      const client = await pool.connect();
      
      try {
        await client.query('BEGIN');
        
        // Check if it's a transfer transaction
        if (type === 'transfer' && receiver_account_number) {
          // Find receiver by account number
          const receivers = await client.query(
            'SELECT id FROM customers WHERE account_number = $1',
            [receiver_account_number]
          );
          
          if (receivers.rows.length === 0) {
            throw new ApiError(404, 'Receiver account not found');          }
          
          const receiver_id = receivers.rows[0].id;
          
          // Deduct from sender's balance
          await CustomerModel.updateBalance(customer_id, amount, 'debit');
          
          // Add to receiver's balance
          await CustomerModel.updateBalance(receiver_id, amount, 'credit');
          
          // Record the transaction
          const result = await client.query(
            'INSERT INTO transactions (customer_id, amount, type, description, receiver_id, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [customer_id, amount, type, description, receiver_id, 'completed']
          );
          
          // Record the receiver's transaction
          await client.query(
            'INSERT INTO transactions (customer_id, amount, type, description, sender_id, status) VALUES ($1, $2, $3, $4, $5, $6)',
            [receiver_id, amount, 'received', `Received from transfer: ${description}`, customer_id, 'completed']
          );
            await client.query('COMMIT');
          
          // Get sender and receiver details for email notifications
          const senderDetails = await client.query(
            'SELECT name, email, balance FROM customers WHERE id = $1',
            [customer_id]
          );
          
          const receiverDetails = await client.query(
            'SELECT name, email, balance FROM customers WHERE id = $1',
            [receiver_id]
          );
          
          // Send debit notification to sender
          if (senderDetails.rows[0]?.email) {
            emailService.sendTransactionNotification({
              to: senderDetails.rows[0].email,
              subject: 'Debit Alert - Money Transfer',
              transactionDetails: {
                type,
                amount,
                description,
                balance: senderDetails.rows[0].balance,
                transactionId: result.rows[0].id
              }
            });
          }
          
          // Send credit notification to receiver
          if (receiverDetails.rows[0]?.email) {
            emailService.sendTransactionNotification({
              to: receiverDetails.rows[0].email,
              subject: 'Credit Alert - Money Received',
              transactionDetails: {
                type: 'received',
                amount,
                description: `Received from transfer: ${description}`,
                balance: receiverDetails.rows[0].balance,
                transactionId: result.rows[0].id
              }
            });
          }
          
          return {
            id: result.rows[0].id,
            customer_id,
            amount,
            type,
            description,          receiver_id,
            status: 'completed',
            created_at: new Date()
          };        
        } else if (type === 'deposit') {
          // Credit amount to customer's balance
          await CustomerModel.updateBalance(customer_id, amount, 'credit');
          
          // Record the transaction
          const result = await client.query(
            'INSERT INTO transactions (customer_id, amount, type, description, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, customer_id, amount, type, description, status, created_at',
            [customer_id, amount, type, description, 'completed']
          );
          
          await client.query('COMMIT');
          
          // Get customer details for email notification
          const customerDetails = await client.query(
            'SELECT name, email, balance FROM customers WHERE id = $1',
            [customer_id]
          );
          
          console.log('Customer details for deposit notification:', {
            id: customer_id,
            name: customerDetails.rows[0]?.name,
            emailPresent: !!customerDetails.rows[0]?.email,
            balance: customerDetails.rows[0]?.balance
          });
          
          // Send credit notification to customer (money added to account)
          try {
            if (customerDetails.rows[0]?.email) {
              console.log(`Sending deposit notification to ${customerDetails.rows[0].email}`);
              await emailService.sendTransactionNotification({
                to: customerDetails.rows[0].email,
                subject: 'Credit Alert - Deposit',
                transactionDetails: {
                  type: 'credit', // Changed to 'credit' since money is being added to customer's account
                  amount,
                  description,
                  balance: customerDetails.rows[0].balance,
                  transactionId: result.rows[0].id
                }
              });
              console.log('Deposit notification sent successfully');
            } else {
              console.warn('Customer email not found, skipping deposit notification');
            }
          } catch (emailError) {
            console.error('Failed to send deposit notification:', emailError.message);
            // Continue execution despite email failure
          }
          
          return result.rows[0] || {
            id: result.rows[0].id,
            customer_id,
            amount,
            type,
            description,
            status: 'completed',
            created_at: new Date()
          };
        } else if (type === 'withdrawal') {
          // Record the transaction only - let the controller handle balance updates
          const result = await client.query(
            'INSERT INTO transactions (customer_id, amount, type, description, status) VALUES ($1, $2, $3, $4, $5) RETURNING id',            [customer_id, amount, type, description, 'completed']
          );
          
          await client.query('COMMIT');
          
          // Get the transaction with created_at from the database
          const createdTransaction = await client.query(
            'SELECT id, customer_id, amount, type, description, status, created_at FROM transactions WHERE id = $1',
            [result.rows[0].id]          );          // Get customer details for email notification
          const customerDetails = await client.query(
            'SELECT name, email, balance FROM customers WHERE id = $1',
            [customer_id]
          );
          
          console.log('Customer details for withdrawal notification:', {
            id: customer_id,
            name: customerDetails.rows[0]?.name,
            emailPresent: !!customerDetails.rows[0]?.email,
            balance: customerDetails.rows[0]?.balance
          });
          
          // Send debit notification to customer
          try {
            if (customerDetails.rows[0]?.email) {
              console.log(`Sending withdrawal notification to ${customerDetails.rows[0].email}`);
              await emailService.sendTransactionNotification({
                to: customerDetails.rows[0].email,
                subject: 'Debit Alert - Withdrawal',
                transactionDetails: {
                  type,
                  amount,
                  description,
                  balance: customerDetails.rows[0].balance,
                  transactionId: result.rows[0].id
                }
              });
              console.log('Withdrawal notification sent successfully');
            } else {
              console.warn('Customer email not found, skipping withdrawal notification');
            }
          } catch (emailError) {
            console.error('Failed to send withdrawal notification:', emailError.message);
            // Continue execution despite email failure
          }
          
          return createdTransaction.rows[0] || {
            id: result.rows[0].id,
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
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
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
      
      // Use parametrized query
      const result = await query(
        `SELECT t.*, 
            s.name as sender_name, s.account_number as sender_account_number,
            r.name as receiver_name, r.account_number as receiver_account_number
          FROM transactions t
          LEFT JOIN customers s ON t.sender_id = s.id
          LEFT JOIN customers r ON t.receiver_id = r.id
          WHERE t.customer_id = $1
          ORDER BY t.created_at DESC
          LIMIT $2 OFFSET $3`,
        [customerId, safeLimit, safeOffset]
      );
      
      const total = await query(
        'SELECT COUNT(*) as total FROM transactions WHERE customer_id = $1',
        [customerId]
      );
      
      return {
        transactions: result.rows,
        total: parseInt(total.rows[0].total),
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
      const result = await query(
        `SELECT t.*, 
          s.name as sender_name, s.account_number as sender_account_number,
          r.name as receiver_name, r.account_number as receiver_account_number
        FROM transactions t
        LEFT JOIN customers s ON t.sender_id = s.id
        LEFT JOIN customers r ON t.receiver_id = r.id
        WHERE t.id = $1`,
        [id]
      );
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'Transaction not found');
      }
      
      return result.rows[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, `Error finding transaction: ${error.message}`);
    }
  }
    // Get all transactions (for banker dashboard)
  static async findAll(limit = 100, offset = 0, filters = {}) {
    try {
      // Build query parts
      let queryText = `
        SELECT t.*, 
          c.name as customer_name, c.account_number
        FROM transactions t
        JOIN customers c ON t.customer_id = c.id
      `;
      
      const queryParams = [];
      let paramIndex = 1;
      
      // Add filters if any
      if (Object.keys(filters).length > 0) {
        queryText += ' WHERE';
        let filterAdded = false;
        
        if (filters.type) {
          queryText += ` t.type = $${paramIndex++}`;
          queryParams.push(filters.type);
          filterAdded = true;
        }
        
        if (filters.startDate && filters.endDate) {
          if (filterAdded) queryText += ' AND';
          // Modify date range to be inclusive of the whole day
          queryText += ` DATE(t.created_at) BETWEEN DATE($${paramIndex++}) AND DATE($${paramIndex++})`;
          queryParams.push(filters.startDate, filters.endDate);
          filterAdded = true;
        }
        
        if (filters.customerId) {
          if (filterAdded) queryText += ' AND';
          queryText += ` t.customer_id = $${paramIndex++}`;
          queryParams.push(filters.customerId);
          filterAdded = true;
        }
      }
      
      // Add order and limit
      queryText += ` ORDER BY t.created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
      queryParams.push(parseInt(limit, 10), parseInt(offset, 10));
      
      // Add extra logging for debugging
      console.log('Transaction query:', queryText);
      console.log('Transaction params:', queryParams);
      
      const result = await query(queryText, queryParams);
      
      console.log(`Found ${result.rows.length} transactions`);
      
      // Count total with the same filters
      let countQueryText = 'SELECT COUNT(*) as total FROM transactions t';
      const countParams = [...queryParams];
      countParams.pop(); // Remove offset
      countParams.pop(); // Remove limit
      
      if (Object.keys(filters).length > 0) {
        countQueryText += ' WHERE';
        let filterAdded = false;
        let countIndex = 1;
        
        if (filters.type) {
          countQueryText += ` t.type = $${countIndex++}`;
          filterAdded = true;
        }
        
        if (filters.startDate && filters.endDate) {
          if (filterAdded) countQueryText += ' AND';
          // Use the same DATE() function for consistency
          countQueryText += ` DATE(t.created_at) BETWEEN DATE($${countIndex++}) AND DATE($${countIndex++})`;
          filterAdded = true;
        }
        
        if (filters.customerId) {
          if (filterAdded) countQueryText += ' AND';
          countQueryText += ` t.customer_id = $${countIndex++}`;
          filterAdded = true;
        }
      }
      
      const totalResult = await query(countQueryText, countParams);
      
      return {
        transactions: result.rows,
        total: parseInt(totalResult.rows[0]?.total) || 0,
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
