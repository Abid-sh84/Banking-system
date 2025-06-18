const express = require('express');
const router = express.Router();
const ChatbotController = require('../controllers/chatbot.controller');
const { authenticate, isCustomer } = require('../middleware/auth.middleware');

/**
 * @route GET /api/chatbot/account-info
 * @desc Get customer account information for the chatbot
 * @access Private (Customer)
 */
router.get('/account-info', authenticate, isCustomer, ChatbotController.getAccountInfo);

/**
 * @route GET /api/chatbot/recent-transactions
 * @desc Get recent transactions for the chatbot
 * @access Private (Customer)
 */
router.get('/recent-transactions', authenticate, isCustomer, ChatbotController.getRecentTransactions);

/**
 * @route GET /api/chatbot/dashboard-data
 * @desc Get comprehensive customer information for the chatbot
 * @access Private (Customer)
 */
router.get('/dashboard-data', authenticate, isCustomer, ChatbotController.getCustomerDashboardData);

/**
 * @route POST /api/chatbot/ask
 * @desc Process a question from the chatbot using OpenRouter Deepseek AI model
 * @access Private (Customer)
 */
router.post('/ask', authenticate, isCustomer, ChatbotController.processQuestion);

module.exports = router;
