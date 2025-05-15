const express = require('express');
const router = express.Router();
const { 
  registerCustomer, 
  loginCustomer, 
  loginBanker, 
  logout, 
  getCurrentUser 
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

// Routes
router.post('/register', validateRequest(registerSchema), registerCustomer);
router.post('/login/customer', validateRequest(loginSchema), loginCustomer);
router.post('/login/banker', validateRequest(loginSchema), loginBanker);
router.post('/logout', logout);
router.get('/me', authenticate, getCurrentUser);

module.exports = router;
