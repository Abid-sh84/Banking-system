const redisService = require('../services/redis.service');
const { ApiError } = require('../utils/error.utils');

// Rate limiting middleware factory
const createRateLimit = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes default
    max = 100, // 100 requests per window
    message = 'Too many requests, please try again later',
    keyGenerator = (req) => req.ip, // Default to IP-based limiting
    skipSuccessfulRequests = false,
    skipFailedRequests = false
  } = options;

  return async (req, res, next) => {
    try {
      const key = `rate_limit:${keyGenerator(req)}`;
      const windowTimeInSeconds = Math.ceil(windowMs / 1000);
      
      const rateLimitInfo = await redisService.checkRateLimit(key, max, windowTimeInSeconds);
      
      // Set rate limit headers
      res.set({
        'X-RateLimit-Limit': max,
        'X-RateLimit-Remaining': rateLimitInfo.remaining,
        'X-RateLimit-Reset': new Date(Date.now() + windowMs).toISOString()
      });

      if (rateLimitInfo.exceeded) {
        throw new ApiError(429, message);
      }

      // Store original send function to track response status
      const originalSend = res.send;
      res.send = function(body) {
        const statusCode = res.statusCode;
        
        // If we should skip successful/failed requests, decrement counter
        if ((skipSuccessfulRequests && statusCode >= 200 && statusCode < 300) ||
            (skipFailedRequests && statusCode >= 400)) {
          // Note: Redis doesn't have native decrement with expiry, so we'll skip this for now
          // In production, you might want to implement a more sophisticated approach
        }
        
        return originalSend.call(this, body);
      };

      next();
    } catch (error) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
          rateLimited: true
        });
      }
      
      // If Redis is down, allow the request to proceed
      console.warn('Rate limiting check failed, allowing request:', error.message);
      next();
    }
  };
};

// Predefined rate limiters for different endpoints
const rateLimiters = {
  // General API rate limiting
  general: createRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per 15 minutes
    message: 'Too many API requests, please try again later'
  }),

  // Authentication endpoints - stricter limits
  auth: createRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 auth attempts per 15 minutes
    message: 'Too many authentication attempts, please try again later',
    keyGenerator: (req) => `auth:${req.ip}:${req.body.email || 'unknown'}`
  }),

  // OTP endpoints - very strict
  otp: createRateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // 5 OTP requests per 10 minutes
    message: 'Too many OTP requests, please try again later',
    keyGenerator: (req) => `otp:${req.ip}:${req.body.email || 'unknown'}`
  }),

  // Transaction endpoints - moderate limits
  transaction: createRateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 transactions per minute
    message: 'Too many transaction requests, please wait before trying again',
    keyGenerator: (req) => `transaction:${req.user?.id || req.ip}`
  }),

  // Password reset - strict limits
  passwordReset: createRateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 password reset attempts per hour
    message: 'Too many password reset attempts, please try again later',
    keyGenerator: (req) => `password_reset:${req.ip}:${req.body.email || 'unknown'}`
  }),

  // Customer registration - moderate limits
  registration: createRateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 registration attempts per hour
    message: 'Too many registration attempts, please try again later',
    keyGenerator: (req) => `registration:${req.ip}`
  }),

  // File upload - strict limits
  upload: createRateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 uploads per hour
    message: 'Too many file uploads, please try again later',
    keyGenerator: (req) => `upload:${req.user?.id || req.ip}`
  })
};

// IP-based rate limiting for sensitive operations
const createIPRateLimit = (maxRequests = 5, windowMs = 15 * 60 * 1000) => {
  return createRateLimit({
    windowMs,
    max: maxRequests,
    keyGenerator: (req) => `ip_limit:${req.ip}`,
    message: 'Too many requests from this IP address'
  });
};

// User-based rate limiting for authenticated endpoints
const createUserRateLimit = (maxRequests = 50, windowMs = 15 * 60 * 1000) => {
  return createRateLimit({
    windowMs,
    max: maxRequests,
    keyGenerator: (req) => `user_limit:${req.user?.id || req.ip}`,
    message: 'Too many requests from this account'
  });
};

module.exports = {
  createRateLimit,
  rateLimiters,
  createIPRateLimit,
  createUserRateLimit
};
