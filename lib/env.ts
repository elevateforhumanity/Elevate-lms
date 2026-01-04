import { z } from 'zod';

/**
 * Environment variable validation schema
 * Validates critical env vars at runtime
 */
const EnvSchema = z.object({
  // Supabase (required)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(20, 'Invalid Supabase anon key'),

  // Service role (required for server operations)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20, 'Service role key required'),

  // Database URL (required)
  DATABASE_URL: z.string().url('Invalid database URL'),

  // Site URL (required)
  NEXT_PUBLIC_SITE_URL: z.string().url('Site URL required'),

  // Email (optional)
  RESEND_API_KEY: z.string().min(10).optional(),

  // Stripe (optional)
  STRIPE_SECRET_KEY: z.string().min(20).optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(20).optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(20).optional(),
});

/**
 * Validated environment variables
 * Use this instead of process.env for type safety
 *
 * @example
 * ```ts
 * import { env } from '@/lib/env';
 *
 * const supabase = createClient(
 *   env.NEXT_PUBLIC_SUPABASE_URL,
 *   env.NEXT_PUBLIC_SUPABASE_ANON_KEY
 * );
 * ```
 */
export const env = EnvSchema.parse(process.env);

/**
 * Check if service role key is configured
 */
export function hasServiceRoleKey(): boolean {
  return !!env.SUPABASE_SERVICE_ROLE_KEY;
}

/**
 * Check if email is configured
 */
export function hasEmailConfigured(): boolean {
  return !!env.RESEND_API_KEY;
}

/**
 * Check if Stripe is configured
 */
export function hasStripeConfigured(): boolean {
  return !!env.STRIPE_SECRET_KEY && !!env.STRIPE_WEBHOOK_SECRET;
}
