const { createClient } = require('redis');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Redis client configuration
let redisClient;

const connectRedis = async () => {
  // Skip Redis connection if URL is not provided or disabled
  if (!process.env.REDIS_URL || process.env.REDIS_URL === 'disabled') {
    console.warn('⚠️  Redis URL not configured - Running without Redis caching');
    return null;
  }

  try {
    // Create Redis client with connection string from environment
    redisClient = createClient({
      url: process.env.REDIS_URL,
      socket: {
        connectTimeout: 10000,
        reconnectStrategy: (retries) => {
          if (retries > 5) {
            console.error('❌ Redis connection attempts exhausted');
            return new Error('Max reconnection attempts reached');
          }
          const delay = Math.min(retries * 500, 3000);
          console.log(`🔄 Retrying Redis connection in ${delay}ms (attempt ${retries + 1}/5)`);
          return delay;
        }
      }
    });

    // Event listeners
    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err.message);
      // Don't crash the app on Redis errors
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis client connected successfully');
    });

    redisClient.on('ready', () => {
      console.log('✅ Redis client ready to use');
    });

    redisClient.on('end', () => {
      console.log('⚠️  Redis client disconnected');
    });

    // Connect to Redis with timeout
    const connectPromise = redisClient.connect();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Redis connection timeout')), 15000)
    );
    
    await Promise.race([connectPromise, timeoutPromise]);
    
    // Test the connection
    await redisClient.ping();
    console.log('✅ Redis connection test successful');
    
    return redisClient;
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error.message);
    console.warn('⚠️  Application will continue without Redis caching');
    redisClient = null;
    return null;
  }
};

// Graceful disconnect
const disconnectRedis = async () => {
  if (redisClient) {
    await redisClient.quit();
    console.log('Redis client disconnected gracefully');
  }
};

// Get Redis client instance
const getRedisClient = () => {
  if (!redisClient) {
    console.warn('⚠️  Redis client not available - operations will be skipped');
    return null;
  }
  return redisClient;
};

// Redis utility functions
const redisUtils = {
  // Set data with expiration
  set: async (key, value, expireInSeconds = 3600) => {
    try {
      const client = getRedisClient();
      if (!client) return false; // Skip if Redis not available
      
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      await client.setEx(key, expireInSeconds, serializedValue);
      return true;
    } catch (error) {
      console.error('Redis SET error:', error.message);
      return false;
    }
  },

  // Get data
  get: async (key) => {
    try {
      const client = getRedisClient();
      if (!client) return null; // Skip if Redis not available
      
      const value = await client.get(key);
      if (!value) return null;
      
      try {
        return JSON.parse(value);
      } catch {
        return value; // Return as string if not JSON
      }
    } catch (error) {
      console.error('Redis GET error:', error.message);
      return null;
    }
  },

  // Delete data
  del: async (key) => {
    try {
      const client = getRedisClient();
      if (!client) return false; // Skip if Redis not available
      
      await client.del(key);
      return true;
    } catch (error) {
      console.error('Redis DEL error:', error.message);
      return false;
    }
  },

  // Check if key exists
  exists: async (key) => {
    try {
      const client = getRedisClient();
      if (!client) return false; // Skip if Redis not available
      
      const result = await client.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Redis EXISTS error:', error.message);
      return false;
    }
  },

  // Set expiration for existing key
  expire: async (key, seconds) => {
    try {
      const client = getRedisClient();
      if (!client) return false; // Skip if Redis not available
      
      await client.expire(key, seconds);
      return true;
    } catch (error) {
      console.error('Redis EXPIRE error:', error.message);
      return false;
    }
  },

  // Increment counter
  incr: async (key) => {
    try {
      const client = getRedisClient();
      if (!client) return null; // Skip if Redis not available
      
      return await client.incr(key);
    } catch (error) {
      console.error('Redis INCR error:', error.message);
      return null;
    }
  },

  // Get multiple keys
  mget: async (keys) => {
    try {
      const client = getRedisClient();
      if (!client) return []; // Skip if Redis not available
      
      const values = await client.mGet(keys);
      return values.map(value => {
        if (!value) return null;
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      });
    } catch (error) {
      console.error('Redis MGET error:', error.message);
      return [];
    }
  },

  // Set multiple keys
  mset: async (keyValuePairs) => {
    try {
      const client = getRedisClient();
      if (!client) return false; // Skip if Redis not available
      
      const serializedPairs = {};
      for (const [key, value] of Object.entries(keyValuePairs)) {
        serializedPairs[key] = typeof value === 'string' ? value : JSON.stringify(value);
      }
      await client.mSet(serializedPairs);
      return true;
    } catch (error) {
      console.error('Redis MSET error:', error.message);
      return false;
    }
  },

  // Pattern-based key search
  keys: async (pattern) => {
    try {
      const client = getRedisClient();
      if (!client) return []; // Skip if Redis not available
      
      return await client.keys(pattern);
    } catch (error) {
      console.error('Redis KEYS error:', error.message);
      return [];
    }
  }
};

module.exports = {
  connectRedis,
  disconnectRedis,
  getRedisClient,
  redisUtils
};
