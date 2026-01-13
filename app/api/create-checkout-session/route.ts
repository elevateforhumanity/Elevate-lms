export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import Stripe from 'stripe';
import { logger } from '@/lib/logger';

const stripeKey = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeKey
  ? new Stripe(stripeKey, {
      apiVersion: '2025-10-29.clover',
    })
  : null;

export async function POST(request: NextRequest) {
  // Log for debugging (remove in production)

  if (!stripe) {
    return NextResponse.json(
      {
        error:
          'Payment system not configured. Please contact support at 317-314-3757',
        debug:
          process.env.NODE_ENV === 'development'
            ? 'STRIPE_SECRET_KEY not set'
            : undefined,
      },
      { status: 503 }
    );
  }

  try {
    const {
      programName,
      programSlug,
      price,
      paymentType = 'full',
    } = await request.json();

    // Enable payment methods (Affirm removed per request)
    // Students can combine methods or choose what they qualify for
    const paymentMethods = [
      'card', // Credit/debit cards
      'klarna', // Klarna (4 payments, up to $1,000)
      'afterpay_clearpay', // Afterpay (4 payments, up to $1,000)
      'us_bank_account', // ACH Direct Debit (lowest fees)
      'cashapp', // Cash App Pay (up to $7,500)
      'link', // Stripe Link (one-click)
      'zip', // Zip (4 payments, up to $1,000)
      'paypal', // PayPal
      'venmo', // Venmo (up to $5,000)
    ];

    let sessionConfig: any = {
      payment_method_types: paymentMethods,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/enroll/success?session_id={CHECKOUT_SESSION_ID}&program=${programSlug}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/micro-classes`,
      metadata: {
        programName,
        programSlug,
        paymentType,
      },
    };

    if (paymentType === 'plan' && price > 500) {
      // Payment plan - 4 monthly installments
      const monthlyAmount = Math.ceil(price / 4);

      sessionConfig = {
        ...sessionConfig,
        mode: 'subscription',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${programName} - Payment Plan`,
                description: `4-month payment plan for ${programName}`,
              },
              unit_amount: monthlyAmount * 100,
              recurring: {
                interval: 'month',
                interval_count: 1,
              },
            },
            quantity: 1,
          },
        ],
        subscription_data: {
          metadata: {
            programName,
            programSlug,
            totalAmount: price,
            installments: 4,
          },
        },
      };
    } else {
      // One-time payment
      sessionConfig = {
        ...sessionConfig,
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${programName} - Micro Class`,
                description: `Enrollment in ${programName} training program`,
              },
              unit_amount: price * 100,
            },
            quantity: 1,
          },
        ],
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    logger.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
