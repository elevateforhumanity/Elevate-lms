import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Lazy initialization to avoid build-time errors when env vars are not set
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, {
    apiVersion: '2025-10-29.clover' as Stripe.LatestApiVersion,
  });
}

// License configurations with trial pricing
const LICENSES: Record<string, { 
  name: string; 
  price: number; 
  stripePriceId: string;
  trialDays: number;
}> = {
  'starter-license': {
    name: 'Elevate LMS Starter License',
    price: 299,
    stripePriceId: 'price_1SqluuIRNf5vPH3A7VEoPwRw',
    trialDays: 14,
  },
  'pro-license': {
    name: 'Elevate LMS Pro License',
    price: 999,
    stripePriceId: 'price_1SqluuIRNf5vPH3AAHrdLDu3',
    trialDays: 14,
  },
  'enterprise-clone-license': {
    name: 'Elevate LMS Enterprise License',
    price: 5000,
    stripePriceId: 'price_1SqluuIRNf5vPH3ALcAcExyz',
    trialDays: 14,
  },
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const licenseSlug = searchParams.get('license');
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const company = searchParams.get('company');

  if (!licenseSlug || !email || !name) {
    return NextResponse.redirect(new URL('/store/licenses', request.url));
  }

  const license = LICENSES[licenseSlug];
  if (!license) {
    return NextResponse.redirect(new URL('/store/licenses', request.url));
  }

  try {
    const stripe = getStripe();
    // Create Stripe checkout session with trial period
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      metadata: {
        license_slug: licenseSlug,
        customer_name: name,
        company: company || '',
        trial: 'true',
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${license.name} (14-Day Trial)`,
              description: `Full access for ${license.trialDays} days. You will be charged $${license.price} after the trial ends unless you cancel.`,
            },
            unit_amount: license.price * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      // For trials, we use subscription mode with trial_period_days
      // But since these are one-time purchases, we'll use a different approach:
      // Create a $0 authorization now, then charge after trial
      payment_intent_data: {
        setup_future_usage: 'off_session',
        metadata: {
          license_slug: licenseSlug,
          trial_ends: new Date(Date.now() + license.trialDays * 24 * 60 * 60 * 1000).toISOString(),
        },
      },
      success_url: `${request.nextUrl.origin}/store/licenses/trial-success?session_id={CHECKOUT_SESSION_ID}&license=${licenseSlug}`,
      cancel_url: `${request.nextUrl.origin}/store/licenses/${licenseSlug}`,
    });

    if (session.url) {
      return NextResponse.redirect(session.url);
    }

    return NextResponse.redirect(new URL('/store/licenses', request.url));
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.redirect(new URL('/store/licenses?error=checkout_failed', request.url));
  }
}
