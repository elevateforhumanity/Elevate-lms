import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_Content'
);

export interface CheckoutSessionData {
  programId: string;
  programName: string;
  price: number;
  userId?: string;
}

/**
 * Create a Stripe Checkout session for program enrollment
 * Note: This requires a backend API endpoint to create the session
 */
export async function createCheckoutSession(data: CheckoutSessionData) {
  // Note: Replace with your actual backend API endpoint
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      programId: data.programId,
      programName: data.programName,
      price: data.price,
      successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/payment/cancelled`,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  const { sessionId } = await response.json();
  return sessionId;
}

/**
 * Redirect to Stripe Checkout
 */
export async function redirectToCheckout(sessionId: string) {
  const stripe = await stripePromise;
  if (!stripe) {
    throw new Error('Stripe failed to load');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    throw error;
  }
}

/**
 * Handle free enrollment (no payment required)
 */
export async function enrollFree(programId: string, userId: string) {
  // Note: Replace with your actual backend API endpoint
  const response = await fetch('/api/enroll-free', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      programId,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to enroll');
  }

  return await response.json();
}
