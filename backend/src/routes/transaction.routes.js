const express = require('express');
const router = express.Router();
const { 
  getTransactionById,
  createTransaction
} = require('../controllers/transaction.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const { validateRequest } = require('../middleware/validation.middleware');

// Validation schemas
const createTransactionSchema = {
  required: ['customerId', 'amount', 'type', 'description'],
  properties: {
    customerId: { type: 'number' },
    amount: { type: 'number', minimum: 0.01 },
    type: { type: 'string', enum: ['deposit', 'withdrawal', 'transfer'] },
    description: { type: 'string' },
    receiverAccountNumber: { type: 'string' }
  }
};

// Apply middleware to all routes
router.use(authenticate);

// Routes
router.get('/:id', getTransactionById);

// Banker only routes
router.use(authorize('banker', 'admin'));
router.post('/', validateRequest(createTransactionSchema), createTransaction);

module.exports = router;
