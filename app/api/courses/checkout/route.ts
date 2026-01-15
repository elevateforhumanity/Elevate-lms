import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-10-29.clover' })
  : null;

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { courseId, courseSlug, courseName, price, wholesaleCost, provider } = body;

    if (!courseId || !courseName || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate split payment amounts
    const priceInCents = Math.round(price * 100);
    const wholesaleCostInCents = Math.round((wholesaleCost || 0) * 100);
    const profitInCents = priceInCents - wholesaleCostInCents;

    // Get the base URL for redirects
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: courseName,
              description: `Professional certification course from ${provider}`,
              metadata: {
                course_id: courseId,
                course_slug: courseSlug,
                provider: provider,
              },
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/courses/${courseSlug}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/courses/${courseSlug}`,
      metadata: {
        // Standardized metadata for grant/license compliance
        payment_type: 'course_purchase',
        funding_source: 'self_pay',
        course_id: courseId,
        course_slug: courseSlug,
        course_name: courseName,
        provider: provider,
        wholesale_cost_cents: wholesaleCostInCents.toString(),
        retail_price_cents: priceInCents.toString(),
        profit_cents: profitInCents.toString(),
      },
      // Optional: Collect customer email
      customer_creation: 'always',
      billing_address_collection: 'required',
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Course checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
