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
const verifyToken = (token) => {
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
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error.message);
    throw new ApiError(401, 'Invalid or expired token');
  }
};

module.exports = {
  generateToken,
  verifyToken
};
