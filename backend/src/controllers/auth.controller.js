const CustomerModel = require('../models/customer.model');
const BankerModel = require('../models/banker.model');
const { generateToken, verifyToken } = require('../utils/jwt.utils');
const { ApiError, asyncHandler } = require('../utils/error.utils');
const bcrypt = require('bcrypt');
const { pool } = require('../config/db.config');

// Customer registration - Step 1: Send OTP
const registerCustomer = asyncHandler(async (req, res) => {
  const { name, email, password, address, phone, accountType } = req.body;
  
  // Check if email already exists in customers table
  try {
    const existingCustomer = await pool.query(
      'SELECT * FROM customers WHERE email = $1',
      [email]
    );
    
    if (existingCustomer.rows.length > 0) {
      throw new ApiError(409, 'Email already exists');
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, `Error checking customer: ${error.message}`);
  }
  
  // Import the OTP utils
  const OTPService = require('../utils/otp.utils');
  
  // Generate OTP
  const otp = OTPService.generateOTP();
  
  // Hash password before storing it
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Store user data and OTP in pending registration table
  await OTPService.saveRegistrationOTP(
    {
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      accountType: accountType || 'savings'
    },
    otp
  );
  
  // Send OTP via email
  await OTPService.sendOTPEmail(email, name, otp);
  
  res.status(200).json({
    success: true,
    message: 'OTP sent to your email. Please verify to complete registration.',
    data: {
      email
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
    const customer = await CustomerModel.findByEmail(email);    console.log('Customer found:', { id: customer.id, status: customer.status });
    
    // Check customer status
    if (customer.status === 'inactive') {
      console.log('Customer account is deactivated:', customer.status);
      throw new ApiError(403, 'Your account is deactivated. Please contact bank support.');
    } else if (customer.status === 'frozen') {
      console.log('Customer account is frozen:', customer.status);
      // Allow login for frozen accounts, but they won't be able to make transactions
      // This allows customers to see their account but not perform transactions
    } else if (customer.status !== 'active') {
      console.log('Customer account has invalid status:', customer.status);
      throw new ApiError(403, 'Your account status is invalid. Please contact bank support.');
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

// Verify OTP for customer registration - Step 2: Create account after OTP verification
const verifyRegistrationOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  
  if (!email || !otp) {
    throw new ApiError(400, 'Email and OTP are required');
  }
  
  const OTPService = require('../utils/otp.utils');
  
  // Verify the OTP
  const userData = await OTPService.verifyOTP(email, otp);
  
  // Create the customer account
  const newCustomer = await CustomerModel.create({
    name: userData.name,
    email: userData.email,
    password: userData.password, // Password is already hashed from the OTP service
    address: userData.address,
    phone: userData.phone,
    accountType: userData.accountType
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
  
  // Delete the OTP record 
  await OTPService.deleteOTPRecord(email);
  
  res.status(201).json({
    success: true,
    message: 'Account created successfully',
    data: {
      customer: newCustomer,
      token
    }
  });
});

// Resend OTP for registration
const resendRegistrationOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    throw new ApiError(400, 'Email is required');
  }
  
  // Check if email exists in pending registration
  const OTPService = require('../utils/otp.utils');
  const pendingRegistration = await pool.query(
    'SELECT * FROM registration_otp WHERE email = $1',
    [email]
  );
  
  if (pendingRegistration.rows.length === 0) {
    throw new ApiError(404, 'No pending registration found for this email');
  }
  
  // Generate new OTP
  const otp = OTPService.generateOTP();
  
  // Update OTP in database
  await pool.query(
    'UPDATE registration_otp SET otp = $1, expires_at = $2, attempted_count = 0 WHERE email = $3',
    [otp, new Date(Date.now() + 15 * 60000), email]
  );
  
  // Send OTP via email
  await OTPService.sendOTPEmail(email, pendingRegistration.rows[0].name, otp);
  
  res.status(200).json({
    success: true,
    message: 'OTP resent to your email',
    data: {
      email
    }
  });
});

module.exports = {
  registerCustomer,
  verifyRegistrationOTP,
  resendRegistrationOTP,
  loginCustomer,
  loginBanker,
  logout,
  getCurrentUser,
  refreshToken
};
