export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';


interface CheckoutRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  programSlug: string;
}

export async function POST(req: Request) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment system not configured. Please contact support.' },
        { status: 503 }
      );
    }

    const body: CheckoutRequest = await req.json();
    const { firstName, lastName, email, phone, programSlug } = body;

    if (!firstName || !lastName || !email || !programSlug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get program details
    const { data: program, error: programError } = await supabase
      .from('programs')
      .select('id, name, slug, total_cost')
      .eq('slug', programSlug)
      .single();

    if (programError || !program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    // Get or create Stripe price for this program
    const amount = program.total_cost
      ? Math.round(Number(program.total_cost) * 100)
      : 489000; // Default $4,890

    // Create or get user profile
    let userId: string | null = null;

    // Check if user exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existingProfile) {
      userId = existingProfile.id;
    }

    // Create application record
    const { data: application, error: appError } = await supabase
      .from('applications')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
        phone: phone ?? null,
        program_id: programSlug,
        status: 'pending_payment',
      })
      .select('id')
      .single();

    if (appError) {
      logger.error('Application creation error', appError);
      return NextResponse.json(
        { error: 'Failed to create application' },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email.toLowerCase(),
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: program.name,
              description: `Enrollment in ${program.name} program`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/apply?program=${programSlug}`,
      metadata: {
        // Webhook expects these exact field names for auto-enrollment
        student_id: userId || application.id, // Use profile ID if exists, else application ID
        program_id: program.id,
        program_slug: program.slug,
        funding_source: 'self-pay',
        // Additional fields for reference
        application_id: application.id,
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
        phone: phone || '',
      },
      // Enable all payment methods including BNPL
      payment_method_types: ['card', 'klarna', 'afterpay_clearpay'],
      // Enable automatic tax if configured
      automatic_tax: {
        enabled: true,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      );
    }

    // Update application with stripe session ID
    await supabase
      .from('applications')
      .update({
        stripe_session_id: session.id,
      })
      .eq('id', application.id);

    logger.info('Checkout session created', {
      sessionId: session.id,
      applicationId: application.id,
      email: email.toLowerCase(),
    });

    return NextResponse.json({
      ok: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (err: unknown) {
    logger.err('Checkout creation err', err);
    return NextResponse.json(
      { err: toErrorMessage(err) || 'Internal server err' },
      { status: 500 }
    );
  }
}
