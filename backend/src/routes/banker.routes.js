const express = require('express');
const router = express.Router();
const { 
  getProfile,
  changePassword,
  getAllCustomers,
  getCustomerById,
  getCustomerTransactions,
  getAllTransactions,
  createBanker,
  createCustomerDeposit
} = require('../controllers/banker.controller');
const { authenticate, authorize, checkUserStatus } = require('../middleware/auth.middleware');
const { validateRequest } = require('../middleware/validation.middleware');

// Validation schemas
const changePasswordSchema = {
  required: ['currentPassword', 'newPassword'],
  properties: {
    currentPassword: { type: 'string' },
    newPassword: { type: 'string', minLength: 6 }
  }
};

const createBankerSchema = {
  required: ['name', 'email', 'password'],
  properties: {
    name: { type: 'string', minLength: 2 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
    role: { type: 'string', enum: ['banker', 'admin'] }
  }
};

// Apply middleware to all routes
router.use(authenticate);
router.use(authorize('banker', 'admin'));
router.use(checkUserStatus);

// Routes
router.get('/profile', authenticate, authorize('banker', 'admin'), getProfile);
router.post('/change-password', validateRequest(changePasswordSchema), changePassword);
router.get('/customers', authenticate, authorize('banker', 'admin'), getAllCustomers);
router.get('/customers/:id', authenticate, authorize('banker', 'admin'), getCustomerById);
router.get('/customers/:id/transactions', getCustomerTransactions);
router.post('/customers/:id/deposit', authenticate, authorize('banker', 'admin'), createCustomerDeposit);
router.get('/transactions', getAllTransactions);

// Admin routes
router.post('/create', validateRequest(createBankerSchema), createBanker);

module.exports = router;
