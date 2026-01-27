/**
 * Stripe Environment Variable Validation
 * 
 * Fail-fast validation for Stripe configuration.
 * Ensures all required Stripe env vars are present before processing payments.
 */

export interface StripeEnvConfig {
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_PRICE_MONTHLY?: string;
  STRIPE_PRICE_ANNUAL?: string;
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string;
}

export class StripeConfigError extends Error {
  constructor(message: string, public missingVars: string[]) {
    super(message);
    this.name = 'StripeConfigError';
  }
}

/**
 * Validate Stripe environment variables
 * Call this at the start of any payment-related API route
 */
export function validateStripeEnv(): StripeEnvConfig {
  const required = [
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new StripeConfigError(
      `Missing required Stripe environment variables: ${missing.join(', ')}`,
      missing
    );
  }

  return {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,
    STRIPE_PRICE_MONTHLY: process.env.STRIPE_PRICE_MONTHLY,
    STRIPE_PRICE_ANNUAL: process.env.STRIPE_PRICE_ANNUAL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  };
}

/**
 * Validate that price IDs are configured for subscription creation
 */
export function validateStripePriceIds(): void {
  const priceIds = [
    'STRIPE_PRICE_MONTHLY',
    'STRIPE_PRICE_ANNUAL',
  ];

  const missing = priceIds.filter((key) => !process.env[key]);

  if (missing.length === priceIds.length) {
    throw new StripeConfigError(
      'No Stripe price IDs configured. At least one of STRIPE_PRICE_MONTHLY or STRIPE_PRICE_ANNUAL must be set.',
      missing
    );
  }
}

/**
 * Check if we're using live mode (production)
 */
export function isStripeLiveMode(): boolean {
  const key = process.env.STRIPE_SECRET_KEY || '';
  return key.startsWith('sk_live_');
}

/**
 * Check if we're using test mode
 */
export function isStripeTestMode(): boolean {
  const key = process.env.STRIPE_SECRET_KEY || '';
  return key.startsWith('sk_test_');
}

/**
 * Get Stripe mode for logging/debugging
 */
export function getStripeMode(): 'live' | 'test' | 'unknown' {
  if (isStripeLiveMode()) return 'live';
  if (isStripeTestMode()) return 'test';
  return 'unknown';
}

/**
 * Validate webhook secret format
 */
export function validateWebhookSecret(): boolean {
  const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
  return secret.startsWith('whsec_');
}

/**
 * Full Stripe configuration check - use in API routes
 */
export function assertStripeConfigured(): void {
  validateStripeEnv();
  
  if (!validateWebhookSecret()) {
    throw new StripeConfigError(
      'Invalid STRIPE_WEBHOOK_SECRET format. Must start with "whsec_"',
      ['STRIPE_WEBHOOK_SECRET']
    );
  }
}
