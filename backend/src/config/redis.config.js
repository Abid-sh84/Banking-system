const { createClient } = require('redis');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Redis client configuration
let redisClient;

const connectRedis = async () => {
  try {
    // Create Redis client with connection string from environment
    redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
      retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
          console.error('Redis server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          console.error('Redis retry time exhausted');
          return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
          console.error('Redis connection attempts exhausted');
          return undefined;
        }
        // Reconnect after
        return Math.min(options.attempt * 100, 3000);
      }
    });

    // Event listeners
    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Redis client connected successfully');
    });

    redisClient.on('ready', () => {
      console.log('Redis client ready to use');
    });

    redisClient.on('end', () => {
      console.log('Redis client disconnected');
    });

    // Connect to Redis
    await redisClient.connect();
    
    // Test the connection
    await redisClient.ping();
    console.log('Redis connection test successful');
    
    return redisClient;
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    throw error;
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
    throw new Error('Redis client not initialized. Call connectRedis() first.');
  }
  return redisClient;
};

// Redis utility functions
const redisUtils = {
  // Set data with expiration
  set: async (key, value, expireInSeconds = 3600) => {
    try {
      const client = getRedisClient();
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      await client.setEx(key, expireInSeconds, serializedValue);
      return true;
    } catch (error) {
      console.error('Redis SET error:', error);
      return false;
    }
  },

  // Get data
  get: async (key) => {
    try {
      const client = getRedisClient();
      const value = await client.get(key);
      if (!value) return null;
      
      try {
        return JSON.parse(value);
      } catch {
        return value; // Return as string if not JSON
      }
    } catch (error) {
      console.error('Redis GET error:', error);
      return null;
    }
  },

  // Delete data
  del: async (key) => {
    try {
      const client = getRedisClient();
      await client.del(key);
      return true;
    } catch (error) {
      console.error('Redis DEL error:', error);
      return false;
    }
  },

  // Check if key exists
  exists: async (key) => {
    try {
      const client = getRedisClient();
      const result = await client.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Redis EXISTS error:', error);
      return false;
    }
  },

  // Set expiration for existing key
  expire: async (key, seconds) => {
    try {
      const client = getRedisClient();
      await client.expire(key, seconds);
      return true;
    } catch (error) {
      console.error('Redis EXPIRE error:', error);
      return false;
    }
  },

  // Increment counter
  incr: async (key) => {
    try {
      const client = getRedisClient();
      return await client.incr(key);
    } catch (error) {
      console.error('Redis INCR error:', error);
      return null;
    }
  },

  // Get multiple keys
  mget: async (keys) => {
    try {
      const client = getRedisClient();
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
      console.error('Redis MGET error:', error);
      return [];
    }
  },

  // Set multiple keys
  mset: async (keyValuePairs) => {
    try {
      const client = getRedisClient();
      const serializedPairs = {};
      for (const [key, value] of Object.entries(keyValuePairs)) {
        serializedPairs[key] = typeof value === 'string' ? value : JSON.stringify(value);
      }
      await client.mSet(serializedPairs);
      return true;
    } catch (error) {
      console.error('Redis MSET error:', error);
      return false;
    }
  },

  // Pattern-based key search
  keys: async (pattern) => {
    try {
      const client = getRedisClient();
      return await client.keys(pattern);
    } catch (error) {
      console.error('Redis KEYS error:', error);
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
