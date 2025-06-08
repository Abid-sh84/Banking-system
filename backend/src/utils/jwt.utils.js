const jwt = require('jsonwebtoken');
const { ApiError } = require('./error.utils');

// Generate JWT token with hardcoded fallback secret
const generateToken = (payload, expiresIn = '24h') => {
  try {
    // Get JWT_SECRET with fallback
    const secret = process.env.JWT_SECRET || 'e1f4cf15351809c2e2d5b22016ee8be8224bcc104b4150b4b1d0e507f6b697c9';
    
    console.log('JWT_SECRET check:', {
      envVariableExists: !!process.env.JWT_SECRET,
      usingFallback: !process.env.JWT_SECRET,
      secretLength: secret ? secret.length : 0
    });
    
    if (!secret) {
      console.error('JWT_SECRET is not defined in environment variables and fallback is not working');
      throw new Error('JWT_SECRET is not configured');
    }
    
    return jwt.sign(
      payload,
      secret,
      { expiresIn }
    );
  } catch (error) {
    console.error('Error generating JWT token:', error.message);
    console.error('Error stack:', error.stack);
    throw new ApiError(500, 'Could not create authentication token');
  }
};

// Verify JWT token with the same fallback secret as generateToken
const verifyToken = async (token) => {
  try {
    // Use the same secret (with fallback) as token generation
    const secret = process.env.JWT_SECRET || 'e1f4cf15351809c2e2d5b22016ee8be8224bcc104b4150b4b1d0e507f6b697c9';
    
    console.log('JWT verify using secret:', {
      envVariableExists: !!process.env.JWT_SECRET,
      usingFallback: !process.env.JWT_SECRET,
      tokenLength: token.length
    });
    
    if (!secret) {
      console.error('JWT_SECRET is not defined for token verification');
      throw new Error('JWT_SECRET is not configured');
    }
    
    const decoded = jwt.verify(token, secret);
    
    // Check token version for customer role
    if (decoded.role === 'customer' && decoded.token_version !== undefined) {
      const { pool, query } = require('../config/db.config');
      // Get current token version from database
      const result = await query(
        'SELECT token_version FROM customers WHERE id = $1',
        [decoded.id]
      );
      
      if (result.rows.length === 0) {
        throw new ApiError(404, 'Customer not found');
      }
      
      const currentTokenVersion = result.rows[0].token_version || 0;
      
      // If token version doesn't match, token has been invalidated
      if (decoded.token_version !== currentTokenVersion) {
        throw new ApiError(401, 'Token has been invalidated');
      }
    }
    
    return decoded;  } catch (error) {
    console.error('Token verification error:', error.message);
    console.error('Token verification error details:', error);
    
    if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Invalid token. Please log in again.');
    } else if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Token has expired. Please log in again.');
    } else if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(401, 'Authentication failed. Please log in again.');
    }
  }
};

module.exports = {
  generateToken,
  verifyToken
};
