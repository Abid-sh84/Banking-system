const CustomerModel = require('../models/customer.model');
const TransactionModel = require('../models/transaction.model');
const { ApiError, asyncHandler } = require('../utils/error.utils');

// Get customer profile
const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  
  const customer = await CustomerModel.findById(id);
  
  res.status(200).json({
    success: true,
    data: customer
  });
});

// Update customer profile
const updateProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { name, address, phone } = req.body;
  
  const updatedCustomer = await CustomerModel.update(id, {
    name,
    address,
    phone
  });
  
  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: updatedCustomer
  });
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { currentPassword, newPassword } = req.body;
  
  const result = await CustomerModel.changePassword(id, currentPassword, newPassword);
  
  res.status(200).json({
    success: true,
    message: 'Password changed successfully'
  });
});

// Get customer transactions
const getTransactions = asyncHandler(async (req, res) => {
  const { id } = req.user;
  // Provide default values and ensure type conversion
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 50;
  const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  
  try {
    const result = await TransactionModel.findByCustomerId(id, limit, offset);
    
    res.status(200).json({
      success: true,
      data: result.transactions || [] // Ensure we always return an array
    });
  } catch (error) {
    console.error('Transaction fetch error:', error);
    throw new ApiError(500, `Error fetching transactions: ${error.message}`);
  }
});

// Get customer transaction by ID
const getTransactionById = asyncHandler(async (req, res) => {
  const { id: customerId } = req.user;
  const { id: transactionId } = req.params;
  
  const transaction = await TransactionModel.findById(transactionId);
  
  // Verify the transaction belongs to the customer
  if (transaction.customer_id !== customerId) {
    throw new ApiError(403, 'You do not have permission to view this transaction');
  }
  
  res.status(200).json({
    success: true,
    data: transaction
  });
});

// Create a new transaction
const createTransaction = asyncHandler(async (req, res) => {
  const { id: customerId } = req.user;
  let { amount, type, description, receiverAccountNumber } = req.body;
  
  // Validate amount
  if (parseFloat(amount) <= 0) {
    throw new ApiError(400, 'Amount must be greater than zero');
  }
  
  // Standardize transaction type names
  if (type === 'withdraw') {
    type = 'withdrawal';
  }
  
  // Create the transaction
  try {
    const transaction = await TransactionModel.create({
      customer_id: customerId,
      amount: parseFloat(amount),
      type,
      description,
      receiver_account_number: receiverAccountNumber
    });
    
    // Get updated balance
    const customer = await CustomerModel.findById(customerId);
    
    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: {
        transaction,
        balance: customer.balance
      }
    });
  } catch (error) {
    console.error('Transaction creation error:', error);
    throw new ApiError(500, `Error creating transaction: ${error.message}`);
  }
});

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getTransactions,
  getTransactionById,
  createTransaction
};
