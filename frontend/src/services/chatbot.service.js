import api from './api';

/**
 * Service for chatbot-related API calls
 */
export class ChatbotService {
  /**
   * Check if the API is available
   * @returns {Promise<boolean>} True if API is available, false otherwise
   */
  static async checkApiAvailable() {
    try {
      // Make a simple request to check API status
      const response = await api.get('/chatbot/health');
      return response.status === 200;
    } catch (error) {
      console.warn('API health check failed:', error.message);
      return false;
    }
  }
  /**
   * Get account information for the current customer
   * @returns {Promise} Response from backend API
   */
  static async getAccountInfo() {
    return api.get('/chatbot/account-info');
  }
  
  /**
   * Get recent transactions for the current customer
   * @param {number} limit - Maximum number of transactions to retrieve
   * @returns {Promise} Response from backend API
   */
  static async getRecentTransactions(limit = 5) {
    return api.get(`/chatbot/recent-transactions?limit=${limit}`);
  }

  /**
   * Get comprehensive dashboard data for the customer (account, transactions, cards, deposits)
   * @returns {Promise} Response from backend API
   */
  static async getDashboardData() {
    return api.get('/chatbot/dashboard-data');
  }
  
  /**
   * Ask a question to the chatbot
   * @param {string} question - The question to ask
   * @returns {Promise} Response from backend API with OpenRouter Deepseek AI response
   */
  static async askQuestion(question) {
    try {
      return await api.post('/chatbot/ask', { question });
    } catch (error) {
      console.error('Error asking question to chatbot:', error);
      // Return a formatted response with a friendly error message
      return {
        data: {
          status: 'error',
          data: {
            response: "I'm sorry, I couldn't process your request due to a connection issue. Please try again later."
          }
        }
      };
    }
  }
}

export default ChatbotService;
