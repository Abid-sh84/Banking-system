const jwt = require('jsonwebtoken');
const { ApiError } = require('./error.utils');
const redisService = require('../services/redis.service');

// Generate JWT token from environment variable
const generateToken = (payload, expiresIn = '24h') => {
  try {
    // Use the same secret (with fallback) as token verification
    const secret = process.env.JWT_SECRET;
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
    // Check if token is blacklisted in Redis
    const isBlacklisted = await redisService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      throw new ApiError(401, 'Token has been invalidated');
    }

    // Use the same secret (with fallback) as token generation
    const secret = process.env.JWT_SECRET;
    
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

// Blacklist a token (for logout)
const blacklistToken = async (token, expiresIn = '24h') => {
  try {
    // Calculate expiration time in seconds
    let expirationSeconds = 86400; // Default 24 hours
    
    if (typeof expiresIn === 'string') {
      const unit = expiresIn.slice(-1);
      const value = parseInt(expiresIn.slice(0, -1));
      
      switch (unit) {
        case 'h':
          expirationSeconds = value * 3600;
          break;
        case 'm':
          expirationSeconds = value * 60;
          break;
        case 's':
          expirationSeconds = value;
          break;
        case 'd':
          expirationSeconds = value * 86400;
          break;
        default:
          expirationSeconds = 86400;
      }
    }
    
    await redisService.blacklistToken(token, expirationSeconds);
    return true;
  } catch (error) {
    console.error('Error blacklisting token:', error);
    return false;
  }
};

module.exports = {
  generateToken,
  verifyToken,
  blacklistToken
};
