const TransactionModel = require('../models/transaction.model');
const { ApiError, asyncHandler } = require('../utils/error.utils');

// Get transaction by ID
const getTransactionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  
  const transaction = await TransactionModel.findById(id);
  
  // If customer, verify they own the transaction
  if (role === 'customer' && transaction.customer_id !== req.user.id) {
    throw new ApiError(403, 'You do not have permission to view this transaction');
  }
  
  res.status(200).json({
    success: true,
    data: transaction
  });
});

// Create a new transaction
const createTransaction = asyncHandler(async (req, res) => {
  const { 
    customerId, 
    amount, 
    type, 
    description, 
    receiverAccountNumber 
  } = req.body;
  
  // Validate amount
  if (parseFloat(amount) <= 0) {
    throw new ApiError(400, 'Amount must be greater than zero');
  }
  
  // Create the transaction
  const transaction = await TransactionModel.create({
    customer_id: customerId,
    amount: parseFloat(amount),
    type,
    description,
    receiver_account_number: receiverAccountNumber
  });
  
  res.status(201).json({
    success: true,
    message: 'Transaction created successfully',
    data: transaction
  });
});

module.exports = {
  getTransactionById,
  createTransaction
};
