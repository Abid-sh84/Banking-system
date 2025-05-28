const express = require('express');
const { createDeposit, getCustomerDeposits, getAllDeposits, getDepositById, getDepositsSummary } = require('../controllers/deposit.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Create a new deposit (all routes require authentication)
router.post('/', authenticate, createDeposit);

// Get deposits for a customer
router.get('/customer/:customerId', authenticate, getCustomerDeposits);

// Get all deposits (banker only)
router.get('/', authenticate, authorize('banker', 'admin'), getAllDeposits);

// Get deposit summary (banker only)
router.get('/summary', authenticate, authorize('banker', 'admin'), getDepositsSummary);

// Get specific deposit by ID
router.get('/:id', authenticate, getDepositById);

module.exports = router;
