import api from './api';

/**
 * Service for chatbot-related API calls
 */
export class ChatbotService {
  /**
   * Get account information for the current customer
   * @returns {Promise} Response from backend API
   */
  static async getAccountInfo() {
    return api.get('/api/chatbot/account-info');
  }
  
  /**
   * Get recent transactions for the current customer
   * @param {number} limit - Maximum number of transactions to retrieve
   * @returns {Promise} Response from backend API
   */
  static async getRecentTransactions(limit = 5) {
    return api.get(`/api/chatbot/recent-transactions?limit=${limit}`);
  }
  
  /**
   * Ask a question to the chatbot
   * @param {string} question - The question to ask
   * @returns {Promise} Response from backend API
   */
  static async askQuestion(question) {
    return api.post('/api/chatbot/ask', { question });
  }
}

export default ChatbotService;
