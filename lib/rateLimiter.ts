// lib/rateLimiter.ts
// Rate limiting and caching with Redis support
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

const RATE_LIMIT_REQUESTS = Number(process.env.RATE_LIMIT_REQUESTS || 100);
const RATE_LIMIT_WINDOW_SECONDS = Number(
  process.env.RATE_LIMIT_WINDOW_SECONDS || 60
);

let redisClient: ReturnType<typeof createClient> | null = null;
let redisAvailable = false;

async function getRedis() {
  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!redisClient) {
    try {
      redisClient = createClient({
        url: process.env.REDIS_URL,
      });

      redisClient.on('error', (err) => {
        // Error: $1
        redisAvailable = false;
      });

      redisClient.on('connect', () => {
        redisAvailable = true;
      });

      await redisClient.connect();
    } catch (error: any) {
      // Error: $1
      redisClient = null;
      redisAvailable = false;
      return null;
    }
  }

  return redisAvailable ? redisClient : null;
}

// In-memory fallback for rate limiting when Redis is not available
const memoryStore = new Map<string, { count: number; resetAt: number }>();

function cleanupMemoryStore() {
  const now = Date.now();
  for (const [key, value] of memoryStore.entries()) {
    if (value.resetAt < now) {
      memoryStore.delete(key);
    }
  }
}

// Clean up memory store every minute
setInterval(cleanupMemoryStore, 60000);

/**
 * Rate limit a request
 * Returns null if request is allowed, or NextResponse with 429 if rate limited
 */
export async function rateLimit(
  req: NextRequest,
  keyPrefix: string,
  options?: {
    requests?: number;
    windowSeconds?: number;
  }
): Promise<NextResponse | null> {
  const requests = options?.requests || RATE_LIMIT_REQUESTS;
  const windowSeconds = options?.windowSeconds || RATE_LIMIT_WINDOW_SECONDS;

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    (req as any).ip ||
    'unknown';

  const key = `rl:${keyPrefix}:${ip}`;
  const client = await getRedis();

  if (client) {
    // Use Redis for rate limiting
    try {
      const current = Number((await client.get(key)) || 0);

      if (current >= requests) {
        const ttl = Number(await client.ttl(key));
        return NextResponse.json(
          {
            error: 'Too many requests. Please slow down.',
            retryAfter: ttl > 0 ? ttl : windowSeconds,
          },
          {
            status: 429,
            headers: {
              'Retry-After': String(ttl > 0 ? ttl : windowSeconds),
              'X-RateLimit-Limit': String(requests),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': String(Date.now() + ttl * 1000),
            },
          }
        );
      }

      if (current === 0) {
        await client.set(key, '1', { EX: windowSeconds });
      } else {
        await client.incr(key);
      }

      return null;
    } catch (error: any) {
      // Error: $1
      // Fall through to memory-based rate limiting
    }
  }

  // Fallback to in-memory rate limiting
  const now = Date.now();
  const resetAt = now + windowSeconds * 1000;
  const existing = memoryStore.get(key);

  if (existing) {
    if (existing.resetAt < now) {
      // Window expired, reset
      memoryStore.set(key, { count: 1, resetAt });
      return null;
    }

    if (existing.count >= requests) {
      const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
      return NextResponse.json(
        {
          error: 'Too many requests. Please slow down.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'X-RateLimit-Limit': String(requests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(existing.resetAt),
          },
        }
      );
    }

    existing.count++;
    return null;
  }

  memoryStore.set(key, { count: 1, resetAt });
  return null;
}

/**
 * Cache helper with Redis
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  const client = await getRedis();
  if (!client) return null;

  try {
    const value = await client.get(key);
    return value ? JSON.parse(value as string) : null;
  } catch (error: any) {
    // Error: $1
    return null;
  }
}

export async function cacheSet(
  key: string,
  value: any,
  ttlSeconds: number = 300
): Promise<void> {
  const client = await getRedis();
  if (!client) return;

  try {
    await client.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } catch (error: any) {
    // Error: $1
  }
}

export async function cacheDel(key: string): Promise<void> {
  const client = await getRedis();
  if (!client) return;

  try {
    await client.del(key);
  } catch (error: any) {
    // Error: $1
  }
}

/**
 * Cache decorator for functions
 */
export function cached<T>(
  keyFn: (...args: any[]) => string,
  ttlSeconds: number = 300
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheKey = keyFn(...args);

      // Try to get from cache
      const cached = await cacheGet<T>(cacheKey);
      if (cached !== null) {
        return cached;
      }

      // Execute original function
      const result = await originalMethod.apply(this, args);

      // Store in cache
      await cacheSet(cacheKey, result, ttlSeconds);

      return result;
    };

    return descriptor;
  };
}

/**
 * Rate limit decorator for API route handlers
 */
export function rateLimited(
  keyPrefix: string,
  options?: { requests?: number; windowSeconds?: number }
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: NextRequest, ...args: any[]) {
      const limited = await rateLimit(req, keyPrefix, options);
      if (limited) return limited;

      return originalMethod.apply(this, [req, ...args]);
    };

    return descriptor;
  };
}
