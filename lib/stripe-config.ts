/**
 * Stripe Configuration
 * Pulls from Vercel environment variables with proper fallbacks
 * Supports both server-side and client-side usage
 */

import Stripe from 'stripe';

// Server-side Stripe configuration
export function getStripeServerConfig() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'STRIPE_SECRET_KEY must be set in Vercel environment variables'
      );
    }
    return null;
  }

  return new Stripe(secretKey, {
    apiVersion: '2024-11-20.acacia' as Stripe.LatestApiVersion,
    typescript: true,
    appInfo: {
      name: 'Elevate for Humanity',
      version: '2.0.0',
      url: 'https://elevateforhumanity.org',
    },
  });
}

// Client-side publishable key
export function getStripePublishableKey(): string | null {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    if (process.env.NODE_ENV === 'production') {
      // Error logged
    }
    return null;
  }

  return publishableKey;
}

// Singleton instance for server-side
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (!stripeInstance) {
    stripeInstance = getStripeServerConfig();
  }
  return stripeInstance;
}

// Webhook secret
export function getStripeWebhookSecret(): string | null {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    if (process.env.NODE_ENV === 'production') {
    }
    return null;
  }

  return webhookSecret;
}

// Configuration validation
export function validateStripeConfig(): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check server-side key
  if (!process.env.STRIPE_SECRET_KEY) {
    errors.push('STRIPE_SECRET_KEY is not set');
  }

  // Check client-side key
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
  }

  // Check webhook secret
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    warnings.push('STRIPE_WEBHOOK_SECRET is not set - webhooks will not work');
  }

  // Validate key format
  if (
    process.env.STRIPE_SECRET_KEY &&
    !process.env.STRIPE_SECRET_KEY.startsWith('sk_')
  ) {
    errors.push('STRIPE_SECRET_KEY must start with sk_');
  }

  if (
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.startsWith('pk_')
  ) {
    errors.push('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must start with pk_');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

// Export for use in API routes
export const stripe = getStripe();
