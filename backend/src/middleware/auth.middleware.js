const { verifyToken } = require('../utils/jwt.utils');
const { ApiError } = require('../utils/error.utils');
const { asyncHandler } = require('../utils/error.utils');
const { pool } = require('../config/db.config');

// Authentication middleware
const authenticate = asyncHandler(async (req, res, next) => {
  // Get token from cookies or authorization header
  const token = req.cookies.token || 
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
      ? req.headers.authorization.split(' ')[1] 
      : null);
  
  console.log('Auth middleware:', { 
    path: req.path, 
    hasToken: !!token, 
    tokenFrom: token ? (req.cookies.token ? 'cookie' : 'header') : 'none',
    cookieCount: Object.keys(req.cookies || {}).length,
    hasAuthHeader: !!req.headers.authorization
  });

  if (!token) {
    throw new ApiError(401, 'Authentication required. Please login.');
  }

  try {
    // Verify token
    const decoded = verifyToken(token);
    console.log('Token verified successfully for user:', {
      id: decoded.id,
      role: decoded.role
    });
    
    // Add user data to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    throw new ApiError(401, 'Invalid or expired token. Please login again.');
  }
});

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, 'You do not have permission to perform this action');
    }
    next();
  };
};

// Check if user exists and is active
const checkUserStatus = asyncHandler(async (req, res, next) => {
  let query;
  let params;
  
  if (req.user.role === 'customer') {
    query = 'SELECT * FROM customers WHERE id = $1 AND status = $2';
    params = [req.user.id, 'active'];
  } else if (req.user.role === 'banker' || req.user.role === 'admin') {
    query = 'SELECT * FROM bankers WHERE id = $1 AND status = $2';
    params = [req.user.id, 'active'];
  } else {
    throw new ApiError(403, 'Invalid user role');
  }
  
  const results = await pool.query(query, params);
  
  if (results.rows.length === 0) {
    throw new ApiError(403, 'Account is inactive or doesn\'t exist');
  }
  
  next();
});

module.exports = {
  authenticate,
  authorize,
  checkUserStatus
};
