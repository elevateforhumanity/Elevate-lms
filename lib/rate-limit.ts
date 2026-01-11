import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis client
let redis: Redis | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// Rate limit configurations
const RATE_LIMITS = {
  auth: { requests: 5, window: '1 m' }, // 5 requests per minute
  payment: { requests: 10, window: '1 m' }, // 10 requests per minute
  contact: { requests: 3, window: '1 m' }, // 3 requests per minute
  api: { requests: 100, window: '1 m' }, // 100 requests per minute
  strict: { requests: 3, window: '5 m' }, // 3 requests per 5 minutes
} as const;

// Create rate limiters
export const authRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMITS.auth.requests, RATE_LIMITS.auth.window),
      analytics: true,
      prefix: 'ratelimit:auth',
    })
  : null;

export const paymentRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMITS.payment.requests, RATE_LIMITS.payment.window),
      analytics: true,
      prefix: 'ratelimit:payment',
    })
  : null;

export const contactRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMITS.contact.requests, RATE_LIMITS.contact.window),
      analytics: true,
      prefix: 'ratelimit:contact',
    })
  : null;

export const apiRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMITS.api.requests, RATE_LIMITS.api.window),
      analytics: true,
      prefix: 'ratelimit:api',
    })
  : null;

export const strictRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(RATE_LIMITS.strict.requests, RATE_LIMITS.strict.window),
      analytics: true,
      prefix: 'ratelimit:strict',
    })
  : null;

// Helper function to get identifier from request
export function getIdentifier(request: Request): string {
  // Try to get IP from headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  return ip;
}

// Helper function to create rate limit headers
export function createRateLimitHeaders(result: {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.reset).toISOString(),
  };
}

// Legacy interface for backwards compatibility
interface RateLimitConfig {
  key: string;
  limit: number;
  windowSeconds: number;
}

export async function checkRateLimit(config: RateLimitConfig) {
  if (!redis) {
    console.warn('⚠️ Rate limiting disabled - Redis not configured');
    return { ok: true, remaining: config.limit, current: 0 };
  }

  const { key, limit, windowSeconds } = config;
  const now = Math.floor(Date.now() / 1000);
  const windowKey = `${key}:${Math.floor(now / windowSeconds)}`;

  const current = (await redis.incr(windowKey)) as number;

  if (current === 1) {
    await redis.expire(windowKey, windowSeconds);
  }

  const remaining = Math.max(limit - current, 0);
  const ok = current <= limit;

  return {
    ok,
    remaining,
    current,
  };
}
