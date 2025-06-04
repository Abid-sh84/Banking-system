const { pool, query } = require('../config/db.config');
const { ApiError } = require('../utils/error.utils');

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
      
      // Simple FAQ handling - will be enhanced in future versions
      let response = '';
      const questionLower = question.toLowerCase();
      
      // Determine response based on key terms in the question
      if (questionLower.includes('balance') || questionLower.includes('how much')) {
        // Get customer balance
        const customerResult = await query(
          'SELECT balance FROM customers WHERE id = $1',
          [customerId]
        );
        
        if (customerResult.rows.length === 0) {
          response = "I couldn't retrieve your balance at this moment. Please try again later.";
        } else {
          const balance = customerResult.rows[0].balance;
          response = `Your current account balance is ₹${balance.toLocaleString('en-IN')}.`;
        }
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
      
      // Return response
      res.status(200).json({
        status: 'success',
        data: {
          response
        }
      });
    } catch (error) {
      next(new ApiError(500, `Error processing question: ${error.message}`));
    }
  }
}

module.exports = ChatbotController;
