import Redis from 'ioredis';

/**
 * Redis client configuration
 */
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
};

/**
 * Create Redis client
 */
export const redis = new Redis(redisConfig);

/**
 * Redis connection event handlers
 */
redis.on('connect', () => {
});

redis.on('error', (err) => {
  console.error('❌ Redis error:', err);
});

redis.on('close', () => {
});

/**
 * Cache middleware for Express
 */
export const cacheMiddleware = (duration: number = 300) => {
  return async (req: any, res: any, next: any) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;

    try {
      const cached = await redis.get(key);

      if (cached) {
        return res.json(JSON.parse(cached));
      }

      // Store original res.json
      const originalJson = res.json.bind(res);

      // Override res.json
      res.json = (body: any) => {
        // Cache the response
        redis.setex(key, duration, JSON.stringify(body)).catch(console.error);
        // Send response
        return originalJson(body);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

/**
 * Clear cache by pattern
 */
export const clearCache = async (pattern: string = '*') => {
  try {
    const keys = await redis.keys(`cache:${pattern}`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Get cache stats
 */
export const getCacheStats = async () => {
  try {
    const info = await redis.info('stats');
    const keys = await redis.dbsize();
    return {
      keys,
      info,
    };
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return null;
  }
};

export default redis;
