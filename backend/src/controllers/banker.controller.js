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
        // Format dates as YYYY-MM-DD for PostgreSQL
        filters.startDate = startDateObj.toISOString().split('T')[0];
        filters.endDate = endDateObj.toISOString().split('T')[0];
      }
    }
      // Find transactions with filters
    const result = await TransactionModel.findAll(limitNum, offsetNum, filters);
    
    // Ensure timestamps are properly formatted as strings
    const formattedTransactions = result.transactions.map(tx => ({
      ...tx,
      created_at: tx.created_at ? new Date(tx.created_at).toISOString() : null,
      updated_at: tx.updated_at ? new Date(tx.updated_at).toISOString() : null
    }));
    
    res.status(200).json({
      success: true,
      data: {
        transactions: formattedTransactions || [],
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
  // Use environment variable for password from .env file
  
  const newBanker = await BankerModel.create({
    name,
    email,
    // The default password is handled in the model where bcrypt is also applied
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
  
  // Update customer balance - this is now the only place where balance is updated for deposits
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

// Approve a pending transaction
const approveTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find transaction by ID
    const transaction = await TransactionModel.findById(id);
    
    // Check if transaction exists
    if (!transaction) {
      throw new ApiError(404, 'Transaction not found');
    }
    
    // Check if transaction is in pending status
    if (transaction.status !== 'pending') {
      throw new ApiError(400, `Transaction cannot be approved as it is already ${transaction.status}`);
    }
    
    // Update transaction status to approved
    const updatedTransaction = await TransactionModel.update(id, {
      status: 'approved',
      approved_by: req.user.id,
      approved_at: new Date().toISOString()
    });
    
    // Return updated transaction
    res.status(200).json({
      success: true,
      message: 'Transaction approved successfully',
      data: updatedTransaction
    });
  } catch (error) {
    console.error('Error in approveTransaction:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, `Error approving transaction: ${error.message}`);
  }
});

// Reject a pending transaction
const rejectTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  
  if (!reason || !reason.trim()) {
    throw new ApiError(400, 'Rejection reason is required');
  }
  
  try {
    // Find transaction by ID
    const transaction = await TransactionModel.findById(id);
    
    // Check if transaction exists
    if (!transaction) {
      throw new ApiError(404, 'Transaction not found');
    }
    
    // Check if transaction is in pending status
    if (transaction.status !== 'pending') {
      throw new ApiError(400, `Transaction cannot be rejected as it is already ${transaction.status}`);
    }
    
    // Update transaction status to rejected
    const updatedTransaction = await TransactionModel.update(id, {
      status: 'rejected',
      rejected_by: req.user.id,
      rejected_at: new Date().toISOString(),
      rejection_reason: reason
    });
    
    // Return updated transaction
    res.status(200).json({
      success: true,
      message: 'Transaction rejected successfully',
      data: updatedTransaction
    });
  } catch (error) {
    console.error('Error in rejectTransaction:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, `Error rejecting transaction: ${error.message}`);
  }
});

// Export transactions data
const exportTransactions = asyncHandler(async (req, res) => {
  const { format, startDate, endDate, type, customerId } = req.query;
  
  try {
    // Validate format
    const validFormats = ['csv', 'xlsx', 'pdf'];
    if (!validFormats.includes(format)) {
      throw new ApiError(400, `Invalid export format. Supported formats: ${validFormats.join(', ')}`);
    }
    
    // Prepare filters
    const filters = {};
    
    if (type) filters.type = type;
    if (customerId) filters.customerId = parseInt(customerId, 10);
    
    // Add date filters if provided
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      
      if (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime())) {
        filters.startDate = startDateObj.toISOString().split('T')[0];
        filters.endDate = endDateObj.toISOString().split('T')[0];
      }
    }
    
    // Get transactions using existing model functionality, but don't paginate for exports
    const result = await TransactionModel.findAll(1000, 0, filters);
    
    // Format transactions for export
    const transactions = result.transactions.map(tx => ({
      id: tx.id,
      customer_id: tx.customer_id,
      customer_name: tx.customer_name || 'N/A',
      type: tx.type,
      amount: tx.amount,
      status: tx.status,
      transaction_date: tx.transaction_date ? new Date(tx.transaction_date).toISOString().split('T')[0] : null,
      description: tx.description || 'N/A'
    }));
    
    // Set appropriate content type and filename
    let filename, contentType;
    
    switch(format.toLowerCase()) {
      case 'csv':
        contentType = 'text/csv';
        filename = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
        
        // Convert to CSV
        const csvContent = generateCSV(transactions);
        
        // Set headers and send response
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        return res.send(csvContent);
        
      case 'xlsx':
        contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        filename = `transactions-${new Date().toISOString().split('T')[0]}.xlsx`;
        
        // For now, we're sending a JSON response since XLSX generation requires additional libraries
        res.status(200).json({
          success: false,
          message: 'XLSX export is not implemented yet. Please use CSV format.'
        });
        break;
        
      case 'pdf':
        contentType = 'application/pdf';
        filename = `transactions-${new Date().toISOString().split('T')[0]}.pdf`;
        
        // For now, we're sending a JSON response since PDF generation requires additional libraries
        res.status(200).json({
          success: false,
          message: 'PDF export is not implemented yet. Please use CSV format.'
        });
        break;
        
      default:
        // Send JSON as a fallback
        return res.status(200).json({
          success: true,
          data: transactions
        });
    }
  } catch (error) {
    console.error('Error in exportTransactions:', error);
    throw new ApiError(500, `Error exporting transactions: ${error.message}`);
  }
});

// Helper function to generate CSV content
function generateCSV(data) {
  if (!data || data.length === 0) return '';
  
  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create header row
  let csv = headers.join(',') + '\r\n';
  
  // Add data rows
  data.forEach(row => {
    const values = headers.map(header => {
      const val = row[header] || '';
      // Escape quotes and wrap in quotes if needed
      if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    });
    csv += values.join(',') + '\r\n';
  });
    return csv;
}

// Update customer status (activate/deactivate/freeze/unfreeze)
const updateCustomerStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  // Validate status value (case-insensitive)
  const validStatuses = ['active', 'inactive', 'frozen'];
  const normalizedStatus = status ? status.toLowerCase() : '';
  
  if (!validStatuses.includes(normalizedStatus)) {
    throw new ApiError(400, `Invalid status value. Must be one of: ${validStatuses.join(', ')}`);
  }
  
  // Just a note: 'frozen' will be mapped to 'suspended' in the model
  
  try {
    // Find customer first to check if exists
    const customer = await CustomerModel.findById(id);
    if (!customer) {
      throw new ApiError(404, 'Customer not found');
    }
    
    // Update customer status
    await CustomerModel.updateStatus(id, normalizedStatus);
    
    // Get updated customer
    const updatedCustomer = await CustomerModel.findById(id);
    
    res.status(200).json({
      success: true,
      message: `Customer status updated to ${normalizedStatus}`,
      data: {
        customer: updatedCustomer
      }
    });
  } catch (error) {
    console.error('Error updating customer status:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error updating customer status: ${error.message}`);
  }
});

// Delete customer account
const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find customer first to check if exists
    const customer = await CustomerModel.findById(id);
    if (!customer) {
      throw new ApiError(404, 'Customer not found');
    }
    
    // Delete customer
    await CustomerModel.delete(id);
    
    res.status(200).json({
      success: true,
      message: 'Customer account deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting customer account:', error);
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error deleting customer account: ${error.message}`);
  }
});

module.exports = {
  getProfile,
  changePassword,
  getAllCustomers,
  getCustomerById,
  getCustomerTransactions,
  getAllTransactions,
  createBanker,
  createCustomerDeposit,
  approveTransaction,
  rejectTransaction,
  exportTransactions,
  updateCustomerStatus,
  deleteCustomer
};
