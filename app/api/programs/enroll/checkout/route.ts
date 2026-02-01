export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

/**
 * POST /api/programs/enroll/checkout
 * 
 * Canonical program enrollment checkout for ALL programs.
 * Creates a Stripe Checkout Session with standardized metadata.
 * 
 * Metadata contract (required for webhook provisioning):
 *   kind: 'program_enrollment'
 *   program_id: uuid
 *   student_id: uuid (auth user id)
 *   program_slug: string
 *   funding_source: 'self_pay' | 'workone' | 'wioa' | 'grant' | 'employer'
 * 
 * Pricing rules:
 *   - If funding_source is workone/wioa/grant/employer → amount = 0 (funded)
 *   - If funding_source is self_pay → amount = programs.total_cost
 */

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key);
}

interface CheckoutRequest {
  program_id: string;
  funding_source?: 'self_pay' | 'workone' | 'wioa' | 'grant' | 'employer';
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    // Require authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized - login required' }, { status: 401 });
    }

    const body: CheckoutRequest = await request.json();
    const { program_id, funding_source = 'self_pay' } = body;

    if (!program_id) {
      return NextResponse.json({ error: 'program_id is required' }, { status: 400 });
    }

    // Lookup program
    const { data: program, error: programError } = await supabase
      .from('programs')
      .select('id, slug, title, total_cost')
      .eq('id', program_id)
      .single();

    if (programError || !program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    const stripe = getStripe();

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email, full_name')
      .eq('id', user.id)
      .single();

    let stripeCustomerId: string;

    if (profile?.stripe_customer_id) {
      stripeCustomerId = profile.stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({
        email: user.email || profile?.email,
        name: profile?.full_name || undefined,
        metadata: {
          user_id: user.id,
        },
      });
      stripeCustomerId = customer.id;

      // Save customer ID to profile
      await supabase
        .from('profiles')
        .update({ stripe_customer_id: stripeCustomerId })
        .eq('id', user.id);
    }

    // Determine amount based on funding source
    const isFunded = ['workone', 'wioa', 'grant', 'employer'].includes(funding_source);
    const totalCostCents = program.total_cost 
      ? Math.round(Number(program.total_cost) * 100) 
      : 0;
    const amountCents = isFunded ? 0 : totalCostCents;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';

    // Create Checkout Session with canonical metadata
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      customer: stripeCustomerId,
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: program.title,
              description: `Enrollment in ${program.title}`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/programs/${program.slug}?canceled=true`,
      metadata: {
        // CANONICAL METADATA CONTRACT
        kind: 'program_enrollment',
        program_id: program.id,
        student_id: user.id,
        program_slug: program.slug,
        funding_source: funding_source,
      },
    };

    // For self-pay, enable BNPL options
    if (!isFunded && amountCents > 0) {
      sessionConfig.payment_method_types = ['card', 'affirm', 'klarna', 'afterpay_clearpay'];
      sessionConfig.payment_intent_data = {
        setup_future_usage: 'off_session',
      };
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      program: {
        id: program.id,
        slug: program.slug,
        title: program.title,
      },
      funding_source,
      amount: amountCents / 100,
    });
  } catch (error) {
    console.error('Program enrollment checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
