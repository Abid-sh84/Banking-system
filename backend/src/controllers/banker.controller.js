const CustomerModel = require('../models/customer.model');
const BankerModel = require('../models/banker.model');
const TransactionModel = require('../models/transaction.model');
const { ApiError, asyncHandler } = require('../utils/error.utils');

// Get banker profile
const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  
  const banker = await BankerModel.findById(id);
  
  res.status(200).json({
    success: true,
    data: banker
  });
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { currentPassword, newPassword } = req.body;
  
  const result = await BankerModel.changePassword(id, currentPassword, newPassword);
  
  res.status(200).json({
    success: true,
    message: 'Password changed successfully'
  });
});

// Get all customers with pagination
const getAllCustomers = asyncHandler(async (req, res) => {
  // Parse query parameters with defaults
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 50;
  const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  
  try {
    // Find all customers with pagination
    const result = await CustomerModel.findAll(limit, offset);
    
    // Return success response with customers
    res.status(200).json({
      success: true,
      data: {
        customers: result.customers,
        pagination: result.pagination
      }
    });
  } catch (error) {
    console.error('Error in getAllCustomers:', error);
    throw new ApiError(500, `Error fetching customers: ${error.message}`);
  }
});

// Get customer by ID
const getCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const customer = await CustomerModel.findById(id);
  
  res.status(200).json({
    success: true,
    data: customer
  });
});

// Get customer transactions
const getCustomerTransactions = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { limit = 50, offset = 0 } = req.query;
  
  // First check if customer exists
  await CustomerModel.findById(id);
  
  const result = await TransactionModel.findByCustomerId(
    id,
    parseInt(limit),
    parseInt(offset)
  );
  
  res.status(200).json({
    success: true,
    data: result
  });
});

// Get all transactions with filters and pagination
const getAllTransactions = asyncHandler(async (req, res) => {
  try {
    // Parse query parameters with defaults and proper type conversion
    const { 
      startDate, 
      endDate, 
      customerId, 
      type, 
      limit = 50, 
      offset = 0 
    } = req.query;
    
    // Convert limit and offset to numbers
    const limitNum = parseInt(limit, 10) || 50;
    const offsetNum = parseInt(offset, 10) || 0;
    
    // Convert customerId to number if present
    const customerIdNum = customerId ? parseInt(customerId, 10) : null;
    
    // Prepare filters object
    const filters = {};
    
    if (type) filters.type = type;
    if (customerId) filters.customerId = customerIdNum;
    
    // Only include dates if both are provided and valid
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      
      if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
        // Format dates as YYYY-MM-DD for MySQL
        filters.startDate = startDateObj.toISOString().split('T')[0];
        filters.endDate = endDateObj.toISOString().split('T')[0];
      }
    }
    
    // Find transactions with filters
    const result = await TransactionModel.findAll(limitNum, offsetNum, filters);
    
    res.status(200).json({
      success: true,
      data: {
        transactions: result.transactions || [],
        pagination: { limit: limitNum, offset: offsetNum, total: result.total || 0 }
      }
    });
  } catch (error) {
    console.error('Error in getAllTransactions:', error);
    throw new ApiError(500, `Error fetching transactions: ${error.message}`);
  }
});

// Create banker (admin only)
const createBanker = asyncHandler(async (req, res) => {
  // Ensure only admin can create bankers
  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Only admins can create banker accounts');
  }
  
  const { name, email, role = 'banker' } = req.body;
  // Use fixed password 'admin123' instead of password from request
  
  const newBanker = await BankerModel.create({
    name,
    email,
    password: 'admin123', // Always set password to 'admin123'
    role
  });
  
  res.status(201).json({
    success: true,
    message: 'Banker created successfully',
    data: newBanker
  });
});

// Create a deposit for a customer
const createCustomerDeposit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  
  if (!amount || parseFloat(amount) <= 0) {
    throw new ApiError(400, 'Amount must be greater than zero');
  }
  
  // Find customer to ensure they exist
  const customer = await CustomerModel.findById(id);
  
  // Create a deposit transaction
  const transaction = await TransactionModel.create({
    customer_id: id,
    amount: parseFloat(amount),
    type: 'deposit',
    description: 'Deposit made by banker',
    status: 'completed'
  });
  
  // Update customer balance
  const updatedBalance = await CustomerModel.updateBalance(id, amount, 'credit');
  
  res.status(201).json({
    success: true,
    message: 'Deposit added successfully',
    data: {
      transaction,
      balance_after: updatedBalance.newBalance
    }
  });
});

module.exports = {
  getProfile,
  changePassword,
  getAllCustomers,
  getCustomerById,
  getCustomerTransactions,
  getAllTransactions,
  createBanker,
  createCustomerDeposit
};
