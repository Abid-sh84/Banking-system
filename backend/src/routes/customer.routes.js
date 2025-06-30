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

// Routes
router.get('/profile', getProfile);
router.put('/profile', validateRequest(updateProfileSchema), updateProfile);
router.post('/change-password', validateRequest(changePasswordSchema), changePassword);
router.get('/transactions', getTransactions);
router.get('/transactions/:id', getTransactionById);
router.post('/transactions', validateRequest(createTransactionSchema), createTransaction);
router.get('/find-recipient', findRecipient);
router.post('/transfer', validateRequest(transferSchema), transferMoney);
router.get('/cibil-score', getCustomerCibilScore);
router.post('/account-statement', validateRequest(accountStatementSchema), sendAccountStatement);
router.post('/signout-all-sessions', signOutAllSessions);

module.exports = router;
