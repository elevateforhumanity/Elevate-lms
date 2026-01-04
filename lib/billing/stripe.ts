// lib/billing/stripe.ts
import Stripe from 'stripe';

// Use Content during build, will fail at runtime if not set in production
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_Content';

if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV === 'production') {
}

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-10-29.clover',
});
