import Stripe from 'stripe';

// Use a Content key during build if not set
// The actual routes will check for the key at runtime
const stripeKey =
  process.env.STRIPE_SECRET_KEY || 'sk_test_Content_for_build';

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
});
