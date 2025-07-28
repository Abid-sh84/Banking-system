const express = require('express');
const router = express.Router();
const { 
  getProfile,
  updateProfile,
  changePassword,
  getTransactions,
  getTransactionById,
  createTransaction,
  findRecipient,
  transferMoney,
  sendAccountStatement,
  signOutAllSessions
} = require('../controllers/customer.controller');
const { getCustomerCibilScore } = require('../controllers/cibil.controller');
const { authenticate, authorize, checkUserStatus } = require('../middleware/auth.middleware');
const { validateRequest } = require('../middleware/validation.middleware');
const { rateLimiters, createUserRateLimit } = require('../middleware/rateLimit.middleware');

/**
 * Note: This application supports both text-based chatbot and voice assistant functionality
 * using the same backend endpoints for question processing
 */

// Validation schemas
const updateProfileSchema = {
  required: ['name', 'address', 'phone'],
  properties: {
    name: { type: 'string', minLength: 2 },
    address: { type: 'string', minLength: 5 },
    phone: { type: 'string', minLength: 10 }
  }
};

const changePasswordSchema = {
  required: ['currentPassword', 'newPassword'],
  properties: {
    currentPassword: { type: 'string' },
    newPassword: { type: 'string', minLength: 6 }
  }
};

const createTransactionSchema = {
  required: ['amount', 'type', 'description'],
  properties: {
    amount: { type: 'number', minimum: 0.01 },
    type: { type: 'string', enum: ['deposit', 'withdrawal', 'transfer'] },
    description: { type: 'string' },
    receiverAccountNumber: { type: 'string' }
  }
};

const transferSchema = {
  required: ['recipientId', 'amount'],
  properties: {
    recipientId: { type: 'number' },
    amount: { type: 'number', minimum: 0.01 },
    description: { type: 'string' }
  }
};

const accountStatementSchema = {
  required: ['statementType'],
  properties: {
    statementType: { 
      type: 'string', 
      enum: ['account_statement', 'transaction_history', 'personal_data']
    }
  }
};

// Apply middleware to all routes
router.use(authenticate);
router.use(authorize('customer'));
router.use(checkUserStatus);

// Routes with rate limiting
router.get('/profile', rateLimiters.general, getProfile);
router.put('/profile', rateLimiters.general, validateRequest(updateProfileSchema), updateProfile);
router.post('/change-password', rateLimiters.auth, validateRequest(changePasswordSchema), changePassword);
router.get('/transactions', rateLimiters.general, getTransactions);
router.get('/transactions/:id', rateLimiters.general, getTransactionById);
router.post('/transactions', rateLimiters.transaction, validateRequest(createTransactionSchema), createTransaction);
router.get('/find-recipient', rateLimiters.general, findRecipient);
router.post('/transfer', rateLimiters.transaction, validateRequest(transferSchema), transferMoney);
router.get('/cibil-score', createUserRateLimit(10, 60 * 60 * 1000), getCustomerCibilScore); // 10 requests per hour
router.post('/account-statement', createUserRateLimit(5, 60 * 60 * 1000), validateRequest(accountStatementSchema), sendAccountStatement); // 5 requests per hour
router.post('/signout-all-sessions', rateLimiters.auth, signOutAllSessions);

module.exports = router;
