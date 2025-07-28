# Redis Integration Documentation

## Overview
This banking system now includes comprehensive Redis integration for caching, session management, rate limiting, and performance optimization.

## Features Implemented

### 1. Redis Configuration (`src/config/redis.config.js`)
- Connection management with retry logic
- Health check functionality
- Graceful disconnection
- Error handling and fallback mechanisms

### 2. Redis Service (`src/services/redis.service.js`)
- **Session Management**: Create, update, and destroy user sessions
- **Token Blacklisting**: Invalidate JWT tokens on logout
- **User Profile Caching**: Cache customer/banker profiles
- **Transaction History Caching**: Cache transaction data
- **OTP Management**: Store OTPs with expiration
- **Rate Limiting**: Track API request counts
- **Banking Data Caching**: Balance, cards, deposits

### 3. Rate Limiting Middleware (`src/middleware/rateLimit.middleware.js`)
Predefined rate limiters for different endpoints:
- **General API**: 100 requests per 15 minutes
- **Authentication**: 10 attempts per 15 minutes
- **OTP**: 5 requests per 10 minutes  
- **Transactions**: 20 per minute
- **Password Reset**: 3 attempts per hour
- **Registration**: 5 attempts per hour

### 4. Updated Authentication (`src/utils/jwt.utils.js`)
- Token blacklisting on logout
- Redis-based token validation
- Session tracking

### 5. Enhanced OTP System (`src/utils/otp.utils.js`)
- Redis-first OTP storage with database fallback
- Faster OTP verification
- Automatic expiration handling

## Environment Configuration

Add to your `.env` file:
```bash
# Redis Configuration
REDIS_URL=your_redis_connection_string_here
```

## Benefits

### Performance Improvements
- **Faster Authentication**: Cached user profiles reduce database queries
- **Quick Session Validation**: Redis-based session checks
- **Reduced Database Load**: Frequently accessed data cached

### Security Enhancements
- **Rate Limiting**: Prevents abuse and brute force attacks
- **Token Blacklisting**: Immediate token invalidation on logout
- **Session Management**: Better control over user sessions

### Scalability
- **Horizontal Scaling**: Redis supports clustering
- **Load Distribution**: Reduced database pressure
- **Fast Data Access**: In-memory operations

## Usage Examples

### 1. Caching User Profile
```javascript
// Cache user profile
await redisService.cacheUserProfile(userId, 'customer', profileData);

// Get cached profile
const profile = await redisService.getUserProfile(userId, 'customer');
```

### 2. Rate Limiting Routes
```javascript
// Apply rate limiting to routes
router.post('/login', rateLimiters.auth, loginController);
router.post('/transfer', rateLimiters.transaction, transferController);
```

### 3. Session Management
```javascript
// Create session on login
await redisService.createSession(userId, 'customer', sessionData);

// Update activity
await redisService.updateSessionActivity(userId, 'customer');

// Destroy session on logout
await redisService.destroySession(userId, 'customer');
```

### 4. Token Blacklisting
```javascript
// Blacklist token on logout
await blacklistToken(token);

// Check if token is blacklisted
const isBlacklisted = await redisService.isTokenBlacklisted(token);
```

## Cache Expiration Times

| Data Type | Expiration | Reason |
|-----------|------------|--------|
| User Profile | 30 minutes | Relatively stable data |
| Transaction History | 15 minutes | May change frequently |
| Session | 24 hours | Matches JWT expiration |
| OTP | 15 minutes | Security requirement |
| Rate Limit | 1 hour | Reset window |
| Customer Balance | 5 minutes | Frequently changing |

## Fallback Mechanisms

The system includes fallback mechanisms to ensure functionality even if Redis is unavailable:

1. **Authentication**: Falls back to database token validation
2. **Caching**: Direct database queries if cache miss
3. **Rate Limiting**: Allows requests if Redis is down
4. **Sessions**: Basic JWT validation without session tracking

## Health Monitoring

Check system health including Redis:
```bash
GET /health
```

Response includes Redis status:
```json
{
  "status": "up",
  "database": "connected",
  "redis": "connected",
  "timestamp": "2025-01-28T10:00:00.000Z"
}
```

## Best Practices

### 1. Cache Invalidation
Always invalidate related cache when data changes:
```javascript
// After updating profile
await redisService.invalidateUserProfile(userId, 'customer');

// After transaction
await redisService.invalidateCustomerBalance(customerId);
await redisService.invalidateTransactionHistory(userId, 'customer');
```

### 2. Error Handling
Wrap Redis operations in try-catch blocks:
```javascript
try {
  await redisService.cacheUserProfile(userId, role, data);
} catch (error) {
  console.warn('Redis caching failed:', error.message);
  // Continue without failing the request
}
```

### 3. Performance Optimization
- Use appropriate cache expiration times
- Cache frequently accessed data
- Invalidate cache when data changes
- Monitor Redis memory usage

## Security Considerations

### 1. Rate Limiting
- Different limits for different endpoints
- IP-based and user-based limiting
- Configurable limits and time windows

### 2. Session Security
- Secure session data storage
- Automatic session cleanup
- Session activity tracking

### 3. Token Management
- Immediate token blacklisting
- Configurable token expiration
- Secure token storage

## Monitoring and Maintenance

### 1. Redis Monitoring
- Monitor connection status
- Track memory usage
- Monitor cache hit rates

### 2. Performance Metrics
- Response times with/without cache
- Database query reduction
- Rate limiting effectiveness

### 3. Error Tracking
- Redis connection failures
- Cache operation errors
- Fallback mechanism usage

## Future Enhancements

### 1. Advanced Caching
- Implement cache warming strategies
- Add cache analytics and metrics
- Implement smart cache invalidation

### 2. Real-time Features
- WebSocket session management
- Real-time notifications
- Live transaction updates

### 3. Advanced Security
- Suspicious activity detection
- Advanced rate limiting algorithms
- Enhanced session security

## Troubleshooting

### Common Issues

1. **Redis Connection Failed**
   - Check Redis URL in environment
   - Verify Redis server is running
   - Check network connectivity

2. **High Memory Usage**
   - Review cache expiration times
   - Monitor cached data sizes
   - Implement cache cleanup policies

3. **Rate Limiting Too Aggressive**
   - Adjust rate limit configurations
   - Implement whitelist for trusted IPs
   - Add bypass mechanisms for admin users

## Configuration Options

All Redis-related configurations can be adjusted in:
- `src/config/redis.config.js` - Connection settings
- `src/services/redis.service.js` - Cache expiration times
- `src/middleware/rateLimit.middleware.js` - Rate limiting rules
