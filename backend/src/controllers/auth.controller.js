const CustomerModel = require('../models/customer.model');
const BankerModel = require('../models/banker.model');
const { generateToken, verifyToken } = require('../utils/jwt.utils');
const { ApiError, asyncHandler } = require('../utils/error.utils');
const bcrypt = require('bcrypt');
const { pool } = require('../config/db.config');

// Customer registration
const registerCustomer = asyncHandler(async (req, res) => {
  const { name, email, password, address, phone, accountType } = req.body;
  
  const newCustomer = await CustomerModel.create({
    name,
    email,
    password,
    address,
    phone,
    accountType: accountType || 'savings' // Default to savings if not provided
  });
  
  // Generate token
  const token = generateToken({
    id: newCustomer.id,
    role: 'customer'
  });
  
  // Remove sensitive data
  delete newCustomer.password;
  
  // Set cookie
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production'
  });
  
  res.status(201).json({
    success: true,
    message: 'Customer registered successfully',
    data: {
      customer: newCustomer,
      token
    }
  });
});

// Customer login
const loginCustomer = asyncHandler(async (req, res) => {
  console.log('Customer login attempt:', { 
    email: req.body.email, 
    bodyProvided: !!req.body,
    contentType: req.headers['content-type']
  });
  
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.error('Missing email or password in request body');
      throw new ApiError(400, 'Email and password are required');
    }
    
    console.log('Finding customer by email:', email);
    // Find customer by email
    const customer = await CustomerModel.findByEmail(email);
    console.log('Customer found:', { id: customer.id, status: customer.status });
    
    // Check if customer is active
    if (customer.status !== 'active') {
      console.log('Customer account not active:', customer.status);
      throw new ApiError(403, 'Your account is not active. Please contact support.');
    }
    
    // Check password
    console.log('Comparing password with hash');
    const isMatch = await bcrypt.compare(password, customer.password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }
    
    // Generate token
    console.log('Generating token for customer:', customer.id);
    const token = generateToken({
      id: customer.id,
      role: 'customer'
    });
    
    // Remove sensitive data
  delete customer.password;
  
  // Set cookie
  console.log('Setting cookie with token');
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production'
  });
  
  console.log('Sending successful response');
  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      customer,
      token
    }
  });
  
  console.log('Customer login completed successfully');
  } catch (error) {
    console.error('Error in customer login:', error.message);
    console.error('Error stack:', error.stack);
    // Let the error middleware handle the error
    throw error;
  }
});

// Banker login
const loginBanker = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  console.log(`Login attempt for banker: ${email}`);
  
  let banker;
  let isMatch = false;
  
  try {
    // Find banker by email
    banker = await BankerModel.findByEmail(email);
    console.log(`Banker found: ${banker.id}, role: ${banker.role}, status: ${banker.status}`);
    
    // Check if banker is active
    if (banker.status !== 'active') {
      console.log(`Banker account not active: ${banker.status}`);
      throw new ApiError(403, 'Your account is not active. Please contact support.');
    }    // Check if password matches the banker's stored password
    console.log(`Checking password for user: ${banker.email} with role: ${banker.role}`);
      // Special handling for admin user
    if (banker.role === 'admin') {
      console.log('Using special admin authentication');
      
      // Try direct comparison first (if password is stored directly as per requirement)
      if (password === banker.password) {
        console.log('Direct password match successful');
        isMatch = true;
      } 
      // Try comparing with predefined BANKER_PASSWORD in .env
      else if (password === process.env.BANKER_PASSWORD) {
        console.log('Matched with BANKER_PASSWORD from .env');
        isMatch = true;
        
        // Update the stored password to match the environment variable for future logins
        try {
          await pool.query(
            "UPDATE bankers SET password = $1 WHERE role = 'admin'",
            [process.env.BANKER_PASSWORD || 'admin@123']
          );
          console.log('Updated admin password to match .env BANKER_PASSWORD');
        } catch (err) {
          console.error('Failed to update admin password:', err);
        }
      }
      // Try bcrypt as fallback in case the password is still a hash
      else if (banker.password.startsWith('$2')) {
        console.log('Trying bcrypt comparison for admin user');
        isMatch = await bcrypt.compare(password, banker.password);
        
        // If successful with bcrypt, update to direct password for future
        if (isMatch) {
          try {
            await pool.query(
              "UPDATE bankers SET password = $1 WHERE role = 'admin'",
              [process.env.BANKER_PASSWORD || 'admin@123']
            );
            console.log('Updated admin password from hash to direct password');
          } catch (err) {
            console.error('Failed to update admin password:', err);
          }
        }
      }
    } else {
      // For regular banker users, use bcrypt
      console.log(`Comparing regular banker password with hash: ${banker.password.substring(0, 15)}...`);
      isMatch = await bcrypt.compare(password, banker.password);
    }
    
    console.log(`Password match result: ${isMatch ? 'SUCCESS' : 'FAILED'}`);
    
    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }
      // Make sure the role is set correctly - important for admin@bank.com user
    const role = banker.role || 'banker';
    
    // Generate token
    const token = generateToken({
      id: banker.id,
      role: role
    });
    
    // Remove sensitive data
    delete banker.password;
    
    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: process.env.NODE_ENV === 'production'
    });
      res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        banker,
        token
      }
    });
  } catch (error) {
    console.error('Error during banker login:', error);
    throw error;
  }
});

// Logout
const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production'
  });
  
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Get current user
const getCurrentUser = asyncHandler(async (req, res) => {
  const { id, role } = req.user;
  
  let user;
  if (role === 'customer') {
    user = await CustomerModel.findById(id);
  } else {
    user = await BankerModel.findById(id);
  }
  
  res.status(200).json({
    success: true,
    data: {
      user,
      role
    }
  });
});

// Refresh token
const refreshToken = asyncHandler(async (req, res) => {
  try {
    console.log('Token refresh attempt');
    // Get the current token
    const token = req.cookies.token || 
      (req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
        ? req.headers.authorization.split(' ')[1] 
        : null);
    
    if (!token) {
      throw new ApiError(401, 'No token provided');
    }
    
    // Verify the token
    const decoded = verifyToken(token);
    console.log('Current token verified for user ID:', decoded.id);
    
    // Generate a new token with the same payload but new expiration
    const newToken = generateToken({
      id: decoded.id,
      role: decoded.role
    });
    
    // Set cookie
    res.cookie('token', newToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: process.env.NODE_ENV === 'production'
    });
    
    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: newToken
      }
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    throw new ApiError(401, 'Invalid token, please log in again');
  }
});

module.exports = {
  registerCustomer,
  loginCustomer,
  loginBanker,
  logout,
  getCurrentUser,
  refreshToken
};
