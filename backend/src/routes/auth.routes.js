const express = require('express');
const router = express.Router();
const { 
  registerCustomer, 
  verifyRegistrationOTP, 
  resendRegistrationOTP,
  loginCustomer, 
  loginBanker, 
  logout, 
  getCurrentUser,
  refreshToken
} = require('../controllers/auth.controller');
const { validateRequest } = require('../middleware/validation.middleware');
const { authenticate } = require('../middleware/auth.middleware');

// Validation schemas
const registerSchema = {
  required: ['name', 'email', 'password', 'address', 'phone'],
  properties: {
    name: { type: 'string', minLength: 2 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
    address: { type: 'string', minLength: 5 },
    phone: { type: 'string', minLength: 10 }
  }
};

const loginSchema = {
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' }
  }
};

// Validation schema for OTP verification
const otpVerificationSchema = {
  required: ['email', 'otp'],
  properties: {
    email: { type: 'string', format: 'email' },
    otp: { type: 'string', minLength: 6, maxLength: 6 }
  }
};

// Validation schema for resend OTP
const resendOtpSchema = {
  required: ['email'],
  properties: {
    email: { type: 'string', format: 'email' }
  }
};

// Routes - ensure these match the frontend paths
router.post('/register', validateRequest(registerSchema), registerCustomer);
router.post('/verify-otp', validateRequest(otpVerificationSchema), verifyRegistrationOTP);
router.post('/resend-otp', validateRequest(resendOtpSchema), resendRegistrationOTP);
router.post('/login/customer', validateRequest(loginSchema), loginCustomer);
router.post('/login-customer', validateRequest(loginSchema), loginCustomer); // Add alternate route for compatibility
router.post('/login/banker', validateRequest(loginSchema), loginBanker);
router.post('/login-banker', validateRequest(loginSchema), loginBanker); // Add alternate route for compatibility
router.post('/logout', logout);
router.get('/me', authenticate, getCurrentUser);
router.post('/refresh-token', refreshToken); // Add token refresh endpoint

// Health check endpoint for diagnostics
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    time: new Date().toISOString(),
    service: 'auth',
    message: 'Auth service is running'
  });
});

module.exports = router;
