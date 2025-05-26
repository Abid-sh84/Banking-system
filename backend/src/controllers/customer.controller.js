const CustomerModel = require('../models/customer.model');
const TransactionModel = require('../models/transaction.model');
const { ApiError, asyncHandler } = require('../utils/error.utils');

// Get customer profile
const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  
  const customer = await CustomerModel.findById(id);
  
  // Log the customer data to debug missing fields
  console.log('Customer profile data:', {
    id: customer.id, 
    name: customer.name,
    email: customer.email,
    customer_id: customer.customer_id || 'Missing customer_id'
  });
  
  // Ensure customer_id is included in the response
  if (!customer.customer_id) {
    // Generate a customer ID if it's missing
    const customerId = 'CUST' + Math.floor(1000000000 + Math.random() * 9000000000).toString();
    await CustomerModel.updateCustomerId(customer.id, customerId);
    customer.customer_id = customerId;
  }
  
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
    
    // Ensure timestamps are properly formatted as strings for consistent display
    const formattedTransactions = (result.transactions || []).map(tx => ({
      ...tx,
      created_at: tx.created_at ? new Date(tx.created_at).toISOString() : null,
      updated_at: tx.updated_at ? new Date(tx.updated_at).toISOString() : null
    }));
    
    res.status(200).json({
      success: true,
      data: formattedTransactions
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
    
    // For deposits, we need to update the balance here since the transaction model no longer does it
    if (type === 'deposit') {
      await CustomerModel.updateBalance(customerId, amount, 'credit');
    }
    
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

// Find a recipient by phone or account number
const findRecipient = asyncHandler(async (req, res) => {
  const { phone, account } = req.query;
  const currentUserId = req.user.id;
  
  try {
    let recipient;
    
    if (phone) {
      recipient = await CustomerModel.findByPhoneOrAccount(phone, 'phone');
    } else if (account) {
      recipient = await CustomerModel.findByPhoneOrAccount(account, 'account');
    } else {
      throw new ApiError(400, 'Phone number or account number is required');
    }
    
    // Don't allow transfers to self
    if (recipient.id === currentUserId) {
      throw new ApiError(400, 'Cannot transfer money to your own account');
    }
    
    res.status(200).json({
      success: true,
      data: recipient
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(404, 'Recipient not found');
  }
});

// Transfer money to another customer
const transferMoney = asyncHandler(async (req, res) => {
  const { id: senderId } = req.user;
  const { recipientId, amount, description } = req.body;
  
  // Validate inputs
  if (!recipientId) {
    throw new ApiError(400, 'Recipient ID is required');
  }
  
  if (!amount || isNaN(amount) || amount <= 0) {
    throw new ApiError(400, 'Valid amount is required');
  }
  
  // Don't allow transfers to self - convert both IDs to strings for comparison
  if (String(recipientId) === String(senderId)) {
    throw new ApiError(400, 'Cannot transfer money to your own account');
  }
    try {
    // Process the transfer
    const result = await CustomerModel.transferMoney(senderId, recipientId, parseFloat(amount), description);
    
    // Return the updated balance and transaction info
    res.status(200).json({    success: true,
    message: 'Transfer completed successfully',
    data: {
      balance: result.balance,
      transactionId: result.transactionId
    }
    });
  } catch (error) {
    console.error('Transfer error:', {
      senderId,
      recipientId, 
      amount,
      error: error.message,
      stack: error.stack
    });
    
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, `Transfer failed: ${error.message}`);
  }
});

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getTransactions,
  getTransactionById,
  createTransaction,
  findRecipient,
  transferMoney
};
