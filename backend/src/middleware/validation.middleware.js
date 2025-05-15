const { ApiError } = require('../utils/error.utils');

// Validate request body
const validateRequest = (schema) => {
  return (req, res, next) => {
    // Basic request validation
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new ApiError(400, 'Request body is empty');
    }

    // Validate required fields
    for (const field of schema.required) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        throw new ApiError(400, `${field} is required`);
      }
    }

    // Validate field types and formats
    for (const [field, rules] of Object.entries(schema.properties)) {
      if (req.body[field] !== undefined) {
        // Validate type
        if (rules.type === 'string' && typeof req.body[field] !== 'string') {
          throw new ApiError(400, `${field} must be a string`);
        }
        
        if (rules.type === 'number' && typeof req.body[field] !== 'number') {
          // Try to convert string to number if possible
          if (typeof req.body[field] === 'string' && !isNaN(req.body[field])) {
            req.body[field] = Number(req.body[field]);
          } else {
            throw new ApiError(400, `${field} must be a number`);
          }
        }
        
        // Validate email format
        if (rules.format === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body[field])) {
          throw new ApiError(400, `${field} must be a valid email address`);
        }
        
        // Validate minimum length
        if (rules.minLength && req.body[field].length < rules.minLength) {
          throw new ApiError(400, `${field} must be at least ${rules.minLength} characters long`);
        }
        
        // Validate maximum length
        if (rules.maxLength && req.body[field].length > rules.maxLength) {
          throw new ApiError(400, `${field} must be at most ${rules.maxLength} characters long`);
        }
        
        // Validate pattern
        if (rules.pattern && !new RegExp(rules.pattern).test(req.body[field])) {
          throw new ApiError(400, `${field} has an invalid format`);
        }
      }
    }
    
    next();
  };
};

module.exports = {
  validateRequest
};
