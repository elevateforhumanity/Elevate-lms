import Stripe from 'stripe';

// Stripe client - requires STRIPE_SECRET_KEY in production
// Build-time placeholder allows compilation without key
const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey && process.env.NODE_ENV === 'production') {
  console.warn('STRIPE_SECRET_KEY not set in production');
}

export const stripe = stripeKey 
  ? new Stripe(stripeKey, {
      apiVersion: '2025-10-29.clover',
      typescript: true,
    })
  : null;

// Helper to get stripe client with runtime check
export function getStripe(): Stripe {
  if (!stripe) {
    throw new Error('Stripe not configured - STRIPE_SECRET_KEY required');
  }
  return stripe;
}
