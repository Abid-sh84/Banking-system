const CustomerModel = require('../models/customer.model');
const BankerModel = require('../models/banker.model');
const { generateToken } = require('../utils/jwt.utils');
const { ApiError, asyncHandler } = require('../utils/error.utils');
const bcrypt = require('bcrypt');

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
  const { email, password } = req.body;
  
  // Find customer by email
  const customer = await CustomerModel.findByEmail(email);
  
  // Check if customer is active
  if (customer.status !== 'active') {
    throw new ApiError(403, 'Your account is not active. Please contact support.');
  }
  
  // Check password
  const isMatch = await bcrypt.compare(password, customer.password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }
  
  // Generate token
  const token = generateToken({
    id: customer.id,
    role: 'customer'
  });
  
  // Remove sensitive data
  delete customer.password;
  
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
      customer,
      token
    }
  });
});

// Banker login
const loginBanker = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  console.log(`Login attempt for banker: ${email}`);
  
  try {
    // Find banker by email
    const banker = await BankerModel.findByEmail(email);
    console.log(`Banker found: ${banker.id}, role: ${banker.role}, status: ${banker.status}`);
    
    // Check if banker is active
    if (banker.status !== 'active') {
      console.log(`Banker account not active: ${banker.status}`);
      throw new ApiError(403, 'Your account is not active. Please contact support.');
    }
    
    // Check if password matches the banker's stored password
    console.log(`Comparing password with hash: ${banker.password.substring(0, 15)}...`);
    const isMatch = await bcrypt.compare(password, banker.password);
    console.log(`Password match result: ${isMatch ? 'SUCCESS' : 'FAILED'}`);
    
    if (!isMatch) {
      throw new ApiError(401, 'Invalid credentials');
    }
  } catch (error) {
    console.error('Error during banker login:', error);
    throw error;
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

module.exports = {
  registerCustomer,
  loginCustomer,
  loginBanker,
  logout,
  getCurrentUser
};
