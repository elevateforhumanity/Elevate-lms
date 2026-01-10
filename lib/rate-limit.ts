const redis = null;

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

export const authRateLimit = null;
export const paymentRateLimit = null;
export const contactRateLimit = null;
export const apiRateLimit = null;
