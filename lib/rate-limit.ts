// lib/rate-limit.ts
import { Redis } from '@upstash/redis';

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

interface RateLimitConfig {
  key: string;
  limit: number;
  windowSeconds: number;
}

export async function checkRateLimit(config: RateLimitConfig) {
  if (!redis) {
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
