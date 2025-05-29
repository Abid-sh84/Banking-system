const DepositModel = require('../models/deposit.model');
const TransactionModel = require('../models/transaction.model');
const { ApiError, asyncHandler } = require('../utils/error.utils');

// Create a new deposit
const createDeposit = asyncHandler(async (req, res) => {
  const { 
    customerId, 
    amount, 
    depositType,
    interestRate,
    tenure, 
    description 
  } = req.body;
  
  // Validate amount
  if (parseFloat(amount) <= 0) {
    throw new ApiError(400, 'Amount must be greater than zero');
  }
  
  // Calculate maturity date based on tenure (in months)
  const maturityDate = new Date();
  maturityDate.setMonth(maturityDate.getMonth() + parseInt(tenure, 10));
  
  // Create transaction first
  const transaction = await TransactionModel.create({
    customer_id: customerId,
    amount: parseFloat(amount),
    type: 'deposit',
    description: `${depositType.toUpperCase()} Deposit: ${description || ''}`,
    deposit_type: depositType,
    interest_rate: interestRate,
    maturity_date: maturityDate
  });
  
  // Prepare deposit data
  const depositData = {
    customer_id: customerId,
    amount: parseFloat(amount),
    type: depositType,
    interest_rate: parseFloat(interestRate),
    maturity_date: maturityDate,
    description: description || `${depositType.toUpperCase()} Deposit for ${tenure} months`,
    transaction_id: transaction.id
  };
  
  // Create appropriate deposit type
  let deposit;
  switch(depositType) {
    case 'fixed':
      deposit = await DepositModel.createFixedDeposit(depositData);
      break;
    case 'recurring':
      deposit = await DepositModel.createRecurringDeposit(depositData);
      break;
    case 'savings':
      deposit = await DepositModel.createSavingsDeposit(depositData);
      break;
    case 'tax_saving':
      deposit = await DepositModel.createTaxSavingDeposit(depositData);
      break;
    default:
      deposit = await DepositModel.create(depositData);
  }
  
  res.status(201).json({
    success: true,
    message: 'Deposit created successfully',
    data: {
      deposit,
      transaction
    }
  });
});

// Get deposits for customer
const getCustomerDeposits = asyncHandler(async (req, res) => {
  const { customerId } = req.params;
  
  // Authorize request - make sure current user can access this data
  if (req.user.role === 'customer' && req.user.id !== parseInt(customerId)) {
    throw new ApiError(403, 'You do not have permission to view these deposits');
  }
  
  const deposits = await DepositModel.getByCustomerId(customerId);
  
  res.status(200).json({
    success: true,
    data: deposits
  });
});

// Get all deposits (for banker dashboard)
const getAllDeposits = asyncHandler(async (req, res) => {
  // Only bankers can access all deposits
  if (req.user.role !== 'banker' && req.user.role !== 'admin') {
    throw new ApiError(403, 'Unauthorized access');
  }
  
  const { limit = 100, offset = 0 } = req.query;
  const deposits = await DepositModel.getAll(parseInt(limit), parseInt(offset));
  
  res.status(200).json({
    success: true,
    data: deposits
  });
});

// Get deposit by id
const getDepositById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const deposit = await DepositModel.getById(id);
  
  // Authorize - bankers can see all, customers only their own
  if (req.user.role === 'customer' && deposit.customer_id !== req.user.id) {
    throw new ApiError(403, 'You do not have permission to view this deposit');
  }
  
  res.status(200).json({
    success: true,
    data: deposit
  });
});

// Get deposits summary for dashboard
const getDepositsSummary = asyncHandler(async (req, res) => {
  // Only bankers can access the summary
  if (req.user.role !== 'banker' && req.user.role !== 'admin') {
    throw new ApiError(403, 'Unauthorized access');
  }
  
  const summary = await DepositModel.getDepositsSummary();
  
  res.status(200).json({
    success: true,
    data: summary
  });
});

module.exports = {
  createDeposit,
  getCustomerDeposits,
  getAllDeposits,
  getDepositById,
  getDepositsSummary
};
