import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import helmet from 'helmet';
import xssClean from 'xss-clean';

/**
 * Rate limiting middleware
 * Limits requests per IP to prevent abuse
 */
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  // Store in Redis if available
  // store: new RedisStore({ client: redisClient }),
});

/**
 * API rate limiting (stricter)
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many API requests, please try again later.',
});

/**
 * Auth rate limiting (very strict)
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true,
});

/**
 * Speed limiting middleware
 * Slows down requests after threshold
 */
export const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50, // Allow 50 requests per 15 minutes at full speed
  delayMs: 500, // Add 500ms delay per request after threshold
});

/**
 * Helmet security headers
 */
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://cuxzzpsyufcewtmicszk.supabase.co'],
      fontSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});

/**
 * XSS protection middleware
 */
export const xssProtection = xssClean();

/**
 * CORS configuration
 */
export const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
};

/**
 * Request logging middleware
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
  });

  next();
};

/**
 * Error handling middleware
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  // Don't leak error details in production
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message;

  res.status(500).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * 404 handler
 */
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
  });
};
