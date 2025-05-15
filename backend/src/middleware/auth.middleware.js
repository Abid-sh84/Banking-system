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

  if (!token) {
    throw new ApiError(401, 'Authentication required. Please login.');
  }

  // Verify token
  const decoded = verifyToken(token);
  
  // Add user data to request
  req.user = decoded;
  next();
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
    query = 'SELECT * FROM customers WHERE id = ? AND status = "active"';
    params = [req.user.id];
  } else if (req.user.role === 'banker' || req.user.role === 'admin') {
    query = 'SELECT * FROM bankers WHERE id = ? AND status = "active"';
    params = [req.user.id];
  } else {
    throw new ApiError(403, 'Invalid user role');
  }
  
  const [results] = await pool.execute(query, params);
  
  if (results.length === 0) {
    throw new ApiError(403, 'Account is inactive or doesn\'t exist');
  }
  
  next();
});

module.exports = {
  authenticate,
  authorize,
  checkUserStatus
};
