const { redisUtils } = require('../config/redis.config');

class RedisService {
  constructor() {
    // Cache expiration times (in seconds)
    this.CACHE_TIMES = {
      USER_PROFILE: 1800,      // 30 minutes
      TRANSACTION_HISTORY: 900, // 15 minutes
      SESSION: 86400,          // 24 hours
      OTP: 900,               // 15 minutes
      RATE_LIMIT: 3600,       // 1 hour
      BLACKLIST_TOKEN: 86400,  // 24 hours
      CUSTOMER_BALANCE: 300,   // 5 minutes
      BANKER_DATA: 1800       // 30 minutes
    };
  }

  // Session Management
  async createSession(userId, role, sessionData) {
    const sessionKey = `session:${role}:${userId}`;
    const sessionId = `${userId}_${Date.now()}`;
    
    const session = {
      sessionId,
      userId,
      role,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      ...sessionData
    };

    await redisUtils.set(sessionKey, session, this.CACHE_TIMES.SESSION);
    return sessionId;
  }

  async getSession(userId, role) {
    const sessionKey = `session:${role}:${userId}`;
    return await redisUtils.get(sessionKey);
  }

  async updateSessionActivity(userId, role) {
    const sessionKey = `session:${role}:${userId}`;
    const session = await redisUtils.get(sessionKey);
    
    if (session) {
      session.lastActivity = new Date().toISOString();
      await redisUtils.set(sessionKey, session, this.CACHE_TIMES.SESSION);
    }
  }

  async destroySession(userId, role) {
    const sessionKey = `session:${role}:${userId}`;
    return await redisUtils.del(sessionKey);
  }

  async destroyAllUserSessions(userId) {
    const patterns = [`session:customer:${userId}`, `session:banker:${userId}`];
    for (const pattern of patterns) {
      await redisUtils.del(pattern);
    }
  }

  // Token Blacklisting
  async blacklistToken(token, expiresIn = this.CACHE_TIMES.BLACKLIST_TOKEN) {
    const tokenKey = `blacklist:token:${token}`;
    await redisUtils.set(tokenKey, 'blacklisted', expiresIn);
  }

  async isTokenBlacklisted(token) {
    const tokenKey = `blacklist:token:${token}`;
    return await redisUtils.exists(tokenKey);
  }

  // User Profile Caching
  async cacheUserProfile(userId, role, profileData) {
    const profileKey = `profile:${role}:${userId}`;
    await redisUtils.set(profileKey, profileData, this.CACHE_TIMES.USER_PROFILE);
  }

  async getUserProfile(userId, role) {
    const profileKey = `profile:${role}:${userId}`;
    return await redisUtils.get(profileKey);
  }

  async invalidateUserProfile(userId, role) {
    const profileKey = `profile:${role}:${userId}`;
    await redisUtils.del(profileKey);
  }

  // Customer Balance Caching
  async cacheCustomerBalance(customerId, balance) {
    const balanceKey = `balance:customer:${customerId}`;
    await redisUtils.set(balanceKey, { balance, lastUpdated: new Date().toISOString() }, this.CACHE_TIMES.CUSTOMER_BALANCE);
  }

  async getCustomerBalance(customerId) {
    const balanceKey = `balance:customer:${customerId}`;
    return await redisUtils.get(balanceKey);
  }

  async invalidateCustomerBalance(customerId) {
    const balanceKey = `balance:customer:${customerId}`;
    await redisUtils.del(balanceKey);
  }

  // Transaction History Caching
  async cacheTransactionHistory(userId, role, transactions, filters = '') {
    const cacheKey = `transactions:${role}:${userId}:${Buffer.from(filters).toString('base64')}`;
    await redisUtils.set(cacheKey, transactions, this.CACHE_TIMES.TRANSACTION_HISTORY);
  }

  async getTransactionHistory(userId, role, filters = '') {
    const cacheKey = `transactions:${role}:${userId}:${Buffer.from(filters).toString('base64')}`;
    return await redisUtils.get(cacheKey);
  }

  async invalidateTransactionHistory(userId, role = null) {
    const patterns = role 
      ? [`transactions:${role}:${userId}:*`]
      : [`transactions:customer:${userId}:*`, `transactions:banker:${userId}:*`];
    
    for (const pattern of patterns) {
      const keys = await redisUtils.keys(pattern);
      for (const key of keys) {
        await redisUtils.del(key);
      }
    }
  }

  // OTP Management
  async storeOTP(identifier, otp, data = {}) {
    const otpKey = `otp:${identifier}`;
    const otpData = {
      otp,
      createdAt: new Date().toISOString(),
      attempts: 0,
      ...data
    };
    await redisUtils.set(otpKey, otpData, this.CACHE_TIMES.OTP);
  }

  async getOTP(identifier) {
    const otpKey = `otp:${identifier}`;
    return await redisUtils.get(otpKey);
  }

  async incrementOTPAttempts(identifier) {
    const otpKey = `otp:${identifier}`;
    const otpData = await redisUtils.get(otpKey);
    
    if (otpData) {
      otpData.attempts = (otpData.attempts || 0) + 1;
      await redisUtils.set(otpKey, otpData, this.CACHE_TIMES.OTP);
      return otpData.attempts;
    }
    return 0;
  }

  async deleteOTP(identifier) {
    const otpKey = `otp:${identifier}`;
    await redisUtils.del(otpKey);
  }

  // Rate Limiting
  async checkRateLimit(identifier, maxRequests = 5, windowTime = this.CACHE_TIMES.RATE_LIMIT) {
    const rateLimitKey = `rate_limit:${identifier}`;
    const current = await redisUtils.incr(rateLimitKey);
    
    if (current === 1) {
      await redisUtils.expire(rateLimitKey, windowTime);
    }
    
    return {
      current,
      remaining: Math.max(0, maxRequests - current),
      exceeded: current > maxRequests
    };
  }

  async resetRateLimit(identifier) {
    const rateLimitKey = `rate_limit:${identifier}`;
    await redisUtils.del(rateLimitKey);
  }

  // Banking-specific caching
  async cacheCardDetails(customerId, cards) {
    const cardKey = `cards:customer:${customerId}`;
    await redisUtils.set(cardKey, cards, this.CACHE_TIMES.USER_PROFILE);
  }

  async getCardDetails(customerId) {
    const cardKey = `cards:customer:${customerId}`;
    return await redisUtils.get(cardKey);
  }

  async invalidateCardDetails(customerId) {
    const cardKey = `cards:customer:${customerId}`;
    await redisUtils.del(cardKey);
  }

  // Deposits caching
  async cacheDeposits(customerId, deposits) {
    const depositKey = `deposits:customer:${customerId}`;
    await redisUtils.set(depositKey, deposits, this.CACHE_TIMES.USER_PROFILE);
  }

  async getDeposits(customerId) {
    const depositKey = `deposits:customer:${customerId}`;
    return await redisUtils.get(depositKey);
  }

  async invalidateDeposits(customerId) {
    const depositKey = `deposits:customer:${customerId}`;
    await redisUtils.del(depositKey);
  }

  // General cache invalidation for user data
  async invalidateAllUserData(userId, role) {
    const patterns = [
      `profile:${role}:${userId}`,
      `balance:customer:${userId}`,
      `cards:customer:${userId}`,
      `deposits:customer:${userId}`,
      `transactions:${role}:${userId}:*`,
      `session:${role}:${userId}`
    ];

    for (const pattern of patterns) {
      if (pattern.includes('*')) {
        const keys = await redisUtils.keys(pattern);
        for (const key of keys) {
          await redisUtils.del(key);
        }
      } else {
        await redisUtils.del(pattern);
      }
    }
  }

  // Banking system statistics caching
  async cacheBankingStats(stats) {
    const statsKey = 'banking:stats:overview';
    await redisUtils.set(statsKey, stats, 300); // 5 minutes cache
  }

  async getBankingStats() {
    const statsKey = 'banking:stats:overview';
    return await redisUtils.get(statsKey);
  }

  // Health check
  async healthCheck() {
    try {
      await redisUtils.set('health:check', 'ok', 60);
      const result = await redisUtils.get('health:check');
      await redisUtils.del('health:check');
      return result === 'ok';
    } catch (error) {
      console.error('Redis health check failed:', error);
      return false;
    }
  }
}

module.exports = new RedisService();
