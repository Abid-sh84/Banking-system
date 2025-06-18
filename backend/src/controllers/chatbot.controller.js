const { pool, query } = require('../config/db.config');
const { ApiError } = require('../utils/error.utils');
const axios = require('axios');
require('dotenv').config();

class ChatbotController {
  /**
   * Get account information for the customer to be displayed by the chatbot
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>}
   */  static async getAccountInfo(req, res, next) {
    try {
      const customerId = req.user.id;
      
      if (!customerId) {
        return next(new ApiError(400, 'Customer ID is required'));
      }
      
      // Query to get customer account information
      const customerResult = await query(
        'SELECT id, name, email, account_number, balance, status, account_type FROM customers WHERE id = $1',
        [customerId]
      );
      
      if (customerResult.rows.length === 0) {
        return next(new ApiError(404, 'Customer not found'));
      }
      
      const customer = customerResult.rows[0];
      
      // Return customer account information
      res.status(200).json({
        status: 'success',
        data: {
          customer: {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            accountNumber: customer.account_number,
            balance: customer.balance,
            status: customer.status,
            accountType: customer.account_type
          }
        }
      });
    } catch (error) {
      next(new ApiError(500, `Error retrieving account information: ${error.message}`));
    }
  }
  
  /**
   * Get recent transactions for the customer to be displayed by the chatbot
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>}
   */  static async getRecentTransactions(req, res, next) {
    try {
      const customerId = req.user.id;
      const limit = req.query.limit || 5; // Default to 5 transactions
      
      if (!customerId) {
        return next(new ApiError(400, 'Customer ID is required'));
      }
      
      // Query to get recent transactions
      const transactionsResult = await query(
        'SELECT id, type, amount, description, created_at, status FROM transactions WHERE customer_id = $1 ORDER BY created_at DESC LIMIT $2',
        [customerId, limit]
      );
      
      // Return transactions
      res.status(200).json({
        status: 'success',
        data: {
          transactions: transactionsResult.rows
        }
      });
    } catch (error) {
      next(new ApiError(500, `Error retrieving recent transactions: ${error.message}`));
    }
  }
    /**
   * Process a question from the chatbot and provide a response
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>}
   */  static async processQuestion(req, res, next) {
    try {
      const { question } = req.body;
      const customerId = req.user.id;
      
      if (!question) {
        return next(new ApiError(400, 'Question is required'));
      }

      // Get customer data from the database to provide context to the AI model
      const customerResult = await query(
        'SELECT name, account_number, balance, status, account_type, created_at FROM customers WHERE id = $1',
        [customerId]
      );

      if (customerResult.rows.length === 0) {
        return next(new ApiError(404, 'Customer not found'));
      }

      const customer = customerResult.rows[0];
      
      // Get recent transactions to provide context
      const transactionsResult = await query(
        'SELECT type, amount, description, created_at, status FROM transactions WHERE customer_id = $1 ORDER BY created_at DESC LIMIT 5',
        [customerId]
      );
      
      // Format the customer data and transactions as context for the AI
      const customerContext = {
        name: customer.name,
        accountNumber: customer.account_number,
        balance: customer.balance,
        accountType: customer.account_type,
        status: customer.status,
        createdAt: customer.created_at
      };
      
      const transactions = transactionsResult.rows.map(tx => ({
        type: tx.type,
        amount: tx.amount,
        description: tx.description,
        date: tx.created_at,
        status: tx.status
      }));

      // Create system message with information about the bank and customer data
      const systemMessage = `You are an AI banking assistant for Modern Bank India. 
Today's date is ${new Date().toLocaleDateString('en-IN')}.
You have access to the following customer information:
Customer Name: ${customerContext.name}
Account Number: ${customerContext.accountNumber}
Account Type: ${customerContext.accountType}
Current Balance: ₹${customerContext.balance.toLocaleString('en-IN')}
Account Status: ${customerContext.status}

Recent transactions:
${transactions.map(tx => `- ${new Date(tx.date).toLocaleDateString('en-IN')}: ${tx.type} of ₹${tx.amount.toLocaleString('en-IN')} - ${tx.description} (${tx.status})`).join('\\n')}

Provide helpful, accurate, and concise responses. If you don't know the answer to a specific question about the customer's account that isn't in the provided data, suggest where they might find this information or who they can contact. Always be professional and helpful.`;

      try {
        // Call OpenRouter API with Deepseek model
        const openRouterResponse = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model: 'deepseek/deepseek-chat-v3-0324:free',
            messages: [
              {
                role: 'system',
                content: systemMessage
              },
              {
                role: 'user',
                content: question
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY || process.env.CHAT_API_KEY}`
            }
          }
        );

        // Get AI response
        const aiResponse = openRouterResponse.data.choices[0].message.content;

        // Return AI response
        res.status(200).json({
          status: 'success',
          data: {
            response: aiResponse
          }
        });
      } catch (apiError) {
        console.error('OpenRouter API Error:', apiError.response?.data || apiError.message);
        
        // Fallback response if API fails
        const questionLower = question.toLowerCase();
        let response = '';
        
        // Determine response based on key terms in the question
        if (questionLower.includes('balance') || questionLower.includes('how much')) {
          response = `Your current account balance is ₹${customerContext.balance.toLocaleString('en-IN')}.`;
        } else if (questionLower.includes('transaction') || questionLower.includes('history')) {
          response = "You can view your recent transactions in the Transaction History section of your dashboard.";
        } else if (questionLower.includes('transfer') || questionLower.includes('send money')) {
          response = "To transfer money, click on the 'Transfer' button in the Quick Actions section, enter the recipient's details and amount, then confirm the transfer.";
        } else if (questionLower.includes('deposit')) {
          response = "To make a deposit, click on the 'Deposit' button in the Quick Actions section, enter the amount, and follow the instructions to complete your deposit.";
        } else if (questionLower.includes('card')) {
          response = "You can view your debit card details by clicking the 'View your debit card' button in the Account Overview section.";
        } else if (questionLower.includes('contact') || questionLower.includes('support') || questionLower.includes('help')) {
          response = "For customer support, please email us at support@bankingsystem.com or call our 24/7 helpline at 1800-123-4567.";
        } else {
          response = "I'm sorry, I don't have information about that. Please contact our support team for more assistance.";
        }
        
        res.status(200).json({
          status: 'success',
          data: {
            response
          }
        });
      }
    } catch (error) {
      next(new ApiError(500, `Error processing question: ${error.message}`));
    }
  }

  /**
   * Get comprehensive information about the customer for the chatbot
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>}
   */
  static async getCustomerDashboardData(req, res, next) {
    try {
      const customerId = req.user.id;
      
      if (!customerId) {
        return next(new ApiError(400, 'Customer ID is required'));
      }
      
      // Query to get customer account information
      const customerResult = await query(
        'SELECT id, name, email, account_number, balance, status, account_type, created_at FROM customers WHERE id = $1',
        [customerId]
      );
      
      if (customerResult.rows.length === 0) {
        return next(new ApiError(404, 'Customer not found'));
      }
      
      const customer = customerResult.rows[0];
      
      // Get recent transactions
      const transactionsResult = await query(
        'SELECT id, type, amount, description, created_at, status FROM transactions WHERE customer_id = $1 ORDER BY created_at DESC LIMIT 10',
        [customerId]
      );

      // Get cards information
      const cardsResult = await query(
        'SELECT id, card_number, card_type, expiry_date, status FROM cards WHERE customer_id = $1',
        [customerId]
      );
      
      // Get deposits information
      const depositsResult = await query(
        'SELECT id, amount, interest_rate, term_length, maturity_date, status FROM deposits WHERE customer_id = $1',
        [customerId]
      );
      
      // Return comprehensive customer information
      res.status(200).json({
        status: 'success',
        data: {
          customer: {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            accountNumber: customer.account_number,
            balance: customer.balance,
            status: customer.status,
            accountType: customer.account_type,
            createdAt: customer.created_at
          },
          transactions: transactionsResult.rows,
          cards: cardsResult.rows,
          deposits: depositsResult.rows
        }
      });
    } catch (error) {
      next(new ApiError(500, `Error retrieving dashboard data: ${error.message}`));
    }
  }
}

module.exports = ChatbotController;
