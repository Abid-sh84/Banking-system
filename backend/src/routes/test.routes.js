const express = require('express');
const router = express.Router();
const emailService = require('../utils/email.utils');
const { pool } = require('../config/db.config');
const bcrypt = require('bcrypt');
const { ApiError, asyncHandler } = require('../utils/error.utils');
const { authenticate, authorize } = require('../middleware/auth.middleware');

// Simple health check endpoint
router.get('/health-check', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    service: 'banking-api'
  });
});

// Test user password validation - for diagnostic purposes only, requires admin authentication
router.post('/verify-password', authenticate, authorize('admin'), asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }
  
  // Get the user from database
  const result = await pool.query(
    'SELECT id, password FROM customers WHERE email = $1',
    [email]
  );
  
  if (result.rows.length === 0) {
    throw new ApiError(404, 'User not found');
  }
  
  const user = result.rows[0];
  const storedHash = user.password;
  
  // Check if the password is directly a bcrypt hash (single-hashed)
  const isMatchDirect = await bcrypt.compare(password, storedHash);
  
  // Try double-hashing and comparing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const isMatchDoubleHash = await bcrypt.compare(hashedPassword, storedHash);
  
  res.status(200).json({
    success: true,
    message: 'Password verification results',
    data: {
      userId: user.id,
      isDirectMatch: isMatchDirect,
      isDoubleHashMatch: isMatchDoubleHash,
      hashType: isMatchDirect ? 'Single hash (correct)' : 
                isMatchDoubleHash ? 'Double hash (problematic)' : 
                'Unknown hash format',
      recommendation: isMatchDirect ? 'No action needed' : 
                      isMatchDoubleHash ? 'Reset user password to fix double-hashing' :
                      'Reset user password as hash format is unknown'
    }
  });
}));

// Admin helper to reset password for a user with double-hashed password
router.post('/fix-double-hashed-password', authenticate, authorize('admin'), asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  
  if (!email || !newPassword) {
    throw new ApiError(400, 'Email and new password are required');
  }
  
  // Get the user from database
  const userResult = await pool.query(
    'SELECT id FROM customers WHERE email = $1',
    [email]
  );
  
  if (userResult.rows.length === 0) {
    throw new ApiError(404, 'User not found');
  }
  
  const userId = userResult.rows[0].id;
  
  // Hash the new password (single hash)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  
  // Update the user's password
  await pool.query(
    'UPDATE customers SET password = $1, updated_at = NOW() WHERE id = $2',
    [hashedPassword, userId]
  );
  
  res.status(200).json({
    success: true,
    message: `Password reset successful for user: ${email}`,
    data: {
      userId
    }
  });
}));

// Test email functionality
router.post('/email', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    // Send a test email
    const result = await emailService.testEmailConfig(email);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Test email sent successfully',
        data: result
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send test email',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Test route error:', error);
    res.status(500).json({
      success: false,
      message: 'Error testing email',
      error: error.message
    });
  }
});

// Check customer email in database
router.get('/check-customer-email/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    
    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: 'Customer ID is required'
      });
    }
    
    // Connect to database
    const { pool } = require('../config/db.config');
    const client = await pool.connect();
    
    try {
      // Query customer email
      const result = await client.query(
        'SELECT id, name, email, phone, balance FROM customers WHERE id = $1',
        [customerId]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Customer not found'
        });
      }
      
      // Return customer email details
      res.status(200).json({
        success: true,
        data: {
          id: result.rows[0].id,
          name: result.rows[0].name,
          email: result.rows[0].email,
          phone: result.rows[0].phone,
          balance: result.rows[0].balance,
          hasValidEmail: !!result.rows[0].email
        }
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Check customer email error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking customer email',
      error: error.message
    });
  }
});

// Test transaction email template
router.post('/transaction-email', async (req, res) => {
  try {
    const { email, type } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    // Create sample transaction details
    const transactionDetails = {
      type: type || 'deposit', 
      amount: 1000,
      description: 'Test transaction notification',
      balance: 5000,
      transactionId: 'TEST-' + Date.now(),
      date: new Date().toLocaleString()
    };

    // Send a test transaction notification
    const result = await emailService.sendTransactionNotification({
      to: email,
      subject: `Test ${transactionDetails.type} notification`,
      transactionDetails
    });

    res.status(200).json({
      success: true,
      message: 'Test transaction notification sent',
      data: result
    });
  } catch (error) {
    console.error('Test transaction notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending test transaction notification',
      error: error.message
    });
  }
});

module.exports = router;
