const CustomerModel = require('../models/customer.model');
const TransactionModel = require('../models/transaction.model');
const { ApiError, asyncHandler } = require('../utils/error.utils');
const { generateToken } = require('../utils/jwt.utils');

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
  
  // Check customer status before allowing transaction
  const customer = await CustomerModel.findById(customerId);
  if (customer.status === 'frozen') {
    throw new ApiError(403, 'Your account is frozen. Transactions are not allowed. Please contact bank support.');
  } else if (customer.status === 'inactive') {
    throw new ApiError(403, 'Your account is inactive. Please contact bank support.');
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
  
  // Check sender's account status before allowing transfer
  const sender = await CustomerModel.findById(senderId);
  if (sender.status === 'frozen') {
    throw new ApiError(403, 'Your account is frozen. Transfers are not allowed. Please contact bank support.');
  } else if (sender.status === 'inactive') {
    throw new ApiError(403, 'Your account is inactive. Please contact bank support.');
  }
  
  // Don't allow transfers to self - convert both IDs to strings for comparison
  if (String(recipientId) === String(senderId)) {
    throw new ApiError(400, 'Cannot transfer money to your own account');
  }
  
  // Check recipient's account status
  const recipient = await CustomerModel.findById(recipientId);
  if (!recipient) {
    throw new ApiError(404, 'Recipient account not found');
  }
  
  if (recipient.status === 'inactive') {
    throw new ApiError(403, 'Recipient account is inactive. Transfers to this account are not allowed.');
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

// Send account statement and personal data via email
const sendAccountStatement = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { statementType } = req.body;
    try {
    // Get customer details
    const customer = await CustomerModel.findById(id);
    
    if (!customer || !customer.email) {
      throw new ApiError(400, 'Customer email not found');
    }
    
    // Import the emailService singleton instance
    const emailService = require('../utils/email.utils');
    
    let subject, content, attachmentData;
    
    switch (statementType) {
      case 'account_statement':
        // Get transactions for account statement
        const transactions = await TransactionModel.findByCustomerId(id, 100, 0);
        
        subject = 'Your Modern Bank Account Statement';
        content = generateAccountStatementEmail(customer, transactions.transactions);
        break;
        
      case 'transaction_history':
        // Get all transactions for transaction history
        const allTransactions = await TransactionModel.findByCustomerId(id, 500, 0);
        
        subject = 'Your Transaction History';
        content = generateTransactionHistoryEmail(customer, allTransactions.transactions);
        break;
        
      case 'personal_data':
        subject = 'Your Personal Data';
        content = generatePersonalDataEmail(customer);
        break;
        
      default:
        throw new ApiError(400, 'Invalid statement type');
    }
    
    // Send email
    await emailService.sendCustomEmail({
      to: customer.email,
      subject,
      html: content
    });
    
    res.status(200).json({
      success: true,
      message: `${statementType.replace('_', ' ')} has been sent to your email address`
    });
  } catch (error) {
    console.error(`Error sending ${statementType}:`, error);
    throw new ApiError(500, `Failed to send ${statementType}: ${error.message}`);
  }
});

// Sign out from all devices
const signOutAllSessions = asyncHandler(async (req, res) => {
  const { id } = req.user;
  
  try {
    // Invalidate all tokens by incrementing the token version
    const result = await CustomerModel.invalidateAllTokens(id);
    
    // Generate a new token with the updated token version
    const newToken = generateToken({
      id,
      role: 'customer',
      token_version: result.token_version
    });
    
    // Return success response with the new token
    res.status(200).json({
      success: true,
      message: 'Signed out from all other devices',
      token: newToken
    });
  } catch (error) {
    console.error('Error signing out all sessions:', error);
    throw new ApiError(500, `Error signing out all sessions: ${error.message}`);
  }
});

// Helper functions for generating email content
function generateAccountStatementEmail(customer, transactions) {
  const currentDate = new Date().toLocaleDateString('en-IN');
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 1);
  const formattedStartDate = startDate.toLocaleDateString('en-IN');
  
  // Format balance as currency
  const formattedBalance = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(customer.balance);
  
  // Create transaction rows
  const transactionRows = transactions
    .slice(0, 20) // Take most recent 20 transactions
    .map(tx => {
      const date = new Date(tx.created_at).toLocaleDateString('en-IN');
      const amount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(tx.amount);
      
      const isCredit = ['deposit', 'received'].includes(tx.type);
      
      return `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${date}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${tx.description || 'N/A'}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: ${isCredit ? '#4CAF50' : '#f44336'}">
            ${isCredit ? '+' : '-'}${amount}
          </td>
        </tr>
      `;
    })
    .join('');
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="background-color: #3f51b5; color: white; padding: 15px; text-align: center; border-radius: 5px 5px 0 0;">
        <h1 style="margin: 0;">Modern Bank Account Statement</h1>
      </div>
      
      <div style="padding: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div>
            <p><strong>Statement Date:</strong> ${currentDate}</p>
            <p><strong>Statement Period:</strong> ${formattedStartDate} - ${currentDate}</p>
          </div>
          <div>
            <p><strong>Account Number:</strong> ${customer.account_number}</p>
            <p><strong>Customer ID:</strong> ${customer.customer_id}</p>
          </div>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h2>Account Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px;"><strong>Account Holder:</strong></td>
              <td style="padding: 8px;">${customer.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Account Type:</strong></td>
              <td style="padding: 8px;">${customer.account_type.charAt(0).toUpperCase() + customer.account_type.slice(1)}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Current Balance:</strong></td>
              <td style="padding: 8px;"><strong>${formattedBalance}</strong></td>
            </tr>
          </table>
        </div>
        
        <h2>Recent Transactions</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Date</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Description</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Type</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${transactionRows || '<tr><td colspan="4" style="padding: 10px; text-align: center;">No transactions found</td></tr>'}
          </tbody>
        </table>
        
        <div style="margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
          <p><strong>Note:</strong> This is an electronic statement of your account. Please review all transactions and contact us if you notice any discrepancies.</p>
          <p>Thank you for banking with Modern Bank India.</p>
        </div>
      </div>
      
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px;">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; ${new Date().getFullYear()} Modern Bank India. All rights reserved.</p>
      </div>
    </div>
  `;
}

function generateTransactionHistoryEmail(customer, transactions) {
  const currentDate = new Date().toLocaleDateString('en-IN');
  
  // Format balance as currency
  const formattedBalance = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(customer.balance);
  
  // Create transaction rows
  const transactionRows = transactions
    .map(tx => {
      const date = new Date(tx.created_at).toLocaleDateString('en-IN');
      const amount = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(tx.amount);
      
      const isCredit = ['deposit', 'received'].includes(tx.type);
      
      return `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${date}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${tx.description || 'N/A'}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0; color: ${isCredit ? '#4CAF50' : '#f44336'}">
            ${isCredit ? '+' : '-'}${amount}
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</td>
        </tr>
      `;
    })
    .join('');
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="background-color: #3f51b5; color: white; padding: 15px; text-align: center; border-radius: 5px 5px 0 0;">
        <h1 style="margin: 0;">Modern Bank Transaction History</h1>
      </div>
      
      <div style="padding: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div>
            <p><strong>Generated Date:</strong> ${currentDate}</p>
          </div>
          <div>
            <p><strong>Account Number:</strong> ${customer.account_number}</p>
            <p><strong>Customer ID:</strong> ${customer.customer_id}</p>
          </div>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h2>Account Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px;"><strong>Account Holder:</strong></td>
              <td style="padding: 8px;">${customer.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Email:</strong></td>
              <td style="padding: 8px;">${customer.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Current Balance:</strong></td>
              <td style="padding: 8px;"><strong>${formattedBalance}</strong></td>
            </tr>
          </table>
        </div>
        
        <h2>Complete Transaction History</h2>
        <p>Transaction count: ${transactions.length}</p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Date</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Description</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Type</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Amount</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${transactionRows || '<tr><td colspan="5" style="padding: 10px; text-align: center;">No transactions found</td></tr>'}
          </tbody>
        </table>
        
        <div style="margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
          <p><strong>Note:</strong> This is a complete history of transactions for your account. Please review all transactions and contact us if you notice any discrepancies.</p>
          <p>Thank you for banking with Modern Bank India.</p>
        </div>
      </div>
      
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px;">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; ${new Date().getFullYear()} Modern Bank India. All rights reserved.</p>
      </div>
    </div>
  `;
}

function generatePersonalDataEmail(customer) {
  const currentDate = new Date().toLocaleDateString('en-IN');
  const joinDate = new Date(customer.created_at).toLocaleDateString('en-IN');
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="background-color: #3f51b5; color: white; padding: 15px; text-align: center; border-radius: 5px 5px 0 0;">
        <h1 style="margin: 0;">Modern Bank Personal Data</h1>
      </div>
      
      <div style="padding: 20px;">
        <div style="text-align: right; margin-bottom: 20px;">
          <p><strong>Generated Date:</strong> ${currentDate}</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h2>Personal Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px;"><strong>Full Name:</strong></td>
              <td style="padding: 8px;">${customer.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Email Address:</strong></td>
              <td style="padding: 8px;">${customer.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Phone Number:</strong></td>
              <td style="padding: 8px;">${customer.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Address:</strong></td>
              <td style="padding: 8px;">${customer.address || 'Not provided'}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h2>Account Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px;"><strong>Customer ID:</strong></td>
              <td style="padding: 8px;">${customer.customer_id}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Account Number:</strong></td>
              <td style="padding: 8px;">${customer.account_number}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Account Type:</strong></td>
              <td style="padding: 8px;">${customer.account_type.charAt(0).toUpperCase() + customer.account_type.slice(1)}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Current Balance:</strong></td>
              <td style="padding: 8px;">${new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
              }).format(customer.balance)}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Account Status:</strong></td>
              <td style="padding: 8px;">${customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}</td>
            </tr>
            <tr>
              <td style="padding: 8px;"><strong>Account Created On:</strong></td>
              <td style="padding: 8px;">${joinDate}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
          <p><strong>Privacy Notice:</strong> This data is provided to you in accordance with your rights under data protection regulations. Please keep this information secure.</p>
          <p>Thank you for banking with Modern Bank India.</p>
        </div>
      </div>
      
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 5px 5px;">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; ${new Date().getFullYear()} Modern Bank India. All rights reserved.</p>
      </div>
    </div>
  `;
}

module.exports = {
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
};
