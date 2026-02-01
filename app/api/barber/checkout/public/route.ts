import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  BARBER_PRICING,
  calculateWeeklyPayment,
  getBillingCycleAnchor,
  formatFirstBillingDate,
} from '@/lib/programs/pricing';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key);
}

/**
 * POST /api/barber/checkout/public
 * 
 * Public checkout for Barber Apprenticeship - no authentication required.
 * Creates a Stripe Checkout session with:
 * 1. Setup fee ($1,743) collected immediately
 * 2. Weekly payments starting on the FOLLOWING Friday
 * 3. Weekly amount = $3,237 / weeks_remaining
 * 
 * Friday billing rule:
 * - Mon-Thu enrollment: first charge upcoming Friday
 * - Friday enrollment: first charge next week's Friday (7 days later)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      hours_per_week = 40,
      transferred_hours_verified = 0,
      customer_email,
      customer_name,
      customer_phone,
      application_id,
      has_host_shop,
      host_shop_name,
      success_url,
      cancel_url,
    } = body;

    // Validate required fields
    if (!customer_email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate hours per week
    if (hours_per_week < 20 || hours_per_week > 50) {
      return NextResponse.json(
        { error: 'Hours per week must be between 20 and 50' },
        { status: 400 }
      );
    }

    // Calculate weekly payment based on schedule and transfer hours
    const calculation = calculateWeeklyPayment(hours_per_week, transferred_hours_verified);

    if (calculation.weeksRemaining <= 0) {
      return NextResponse.json(
        { error: 'Invalid calculation: no weeks remaining' },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // Create or retrieve Stripe customer
    const customers = await stripe.customers.list({
      email: customer_email,
      limit: 1,
    });

    let stripeCustomerId: string;
    if (customers.data.length > 0) {
      stripeCustomerId = customers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: customer_email,
        name: customer_name || undefined,
        phone: customer_phone || undefined,
        metadata: {
          program: 'barber-apprenticeship',
          application_id: application_id || '',
        },
      });
      stripeCustomerId = customer.id;
    }

    // Get billing cycle anchor (following Friday at 10 AM Indianapolis)
    const billingCycleAnchor = getBillingCycleAnchor();
    const firstBillingDateFormatted = formatFirstBillingDate();

    // Build success/cancel URLs
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';
    const finalSuccessUrl = success_url || `${baseUrl}/programs/barber-apprenticeship/enrollment-success?session_id={CHECKOUT_SESSION_ID}`;
    const finalCancelUrl = cancel_url || `${baseUrl}/programs/barber-apprenticeship/apply?canceled=true`;

    // Create Checkout Session with subscription mode
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card', 'us_bank_account'],
      line_items: [
        // Setup fee (one-time) - collected immediately
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Barber Apprenticeship - Setup Fee (35%)',
              description: 'Enrollment setup fee - covers onboarding, registration support, employer coordination, and program setup. Non-refundable.',
            },
            unit_amount: BARBER_PRICING.setupFee * 100, // $1,743 in cents
          },
          quantity: 1,
        },
        // Weekly payment (recurring)
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Barber Apprenticeship - Weekly Payment',
              description: `Weekly payment billed every Friday for ~${calculation.weeksRemaining} weeks. Total remaining: $${BARBER_PRICING.remainingBalance.toLocaleString()}`,
            },
            unit_amount: calculation.weeklyPaymentCents,
            recurring: {
              interval: 'week',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        billing_cycle_anchor: billingCycleAnchor,
        metadata: {
          program: 'barber-apprenticeship',
          programSlug: 'barber-apprenticeship',
          application_id: application_id || '',
          customer_name: customer_name || '',
          customer_phone: customer_phone || '',
          hours_per_week: hours_per_week.toString(),
          transferred_hours_verified: transferred_hours_verified.toString(),
          hours_remaining: calculation.hoursRemaining.toString(),
          weeks_remaining: calculation.weeksRemaining.toString(),
          weekly_payment_cents: calculation.weeklyPaymentCents.toString(),
          weekly_payment_dollars: calculation.weeklyPaymentDollars.toFixed(2),
          full_price: BARBER_PRICING.fullPrice.toString(),
          setup_fee: BARBER_PRICING.setupFee.toString(),
          remaining_balance: BARBER_PRICING.remainingBalance.toString(),
          first_billing_date: firstBillingDateFormatted,
          has_host_shop: has_host_shop || '',
          host_shop_name: host_shop_name || '',
        },
      },
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      metadata: {
        program: 'barber-apprenticeship',
        programSlug: 'barber-apprenticeship',
        checkout_type: 'barber_enrollment_public',
        application_id: application_id || '',
        customer_name: customer_name || '',
        customer_phone: customer_phone || '',
        transferHours: transferred_hours_verified.toString(),
        has_host_shop: has_host_shop || '',
        host_shop_name: host_shop_name || '',
      },
      custom_text: {
        submit: {
          message: `Setup fee ($${BARBER_PRICING.setupFee.toLocaleString()}) due today. Weekly payments ($${calculation.weeklyPaymentDollars.toFixed(2)}/week) begin ${firstBillingDateFormatted}.`,
        },
      },
      // Allow promotion codes
      allow_promotion_codes: true,
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      calculation: {
        setupFee: BARBER_PRICING.setupFee,
        weeklyPayment: calculation.weeklyPaymentDollars,
        weeklyPaymentCents: calculation.weeklyPaymentCents,
        weeksRemaining: calculation.weeksRemaining,
        hoursRemaining: calculation.hoursRemaining,
        firstBillingDate: firstBillingDateFormatted,
        billingDay: 'Friday',
        totalProgram: BARBER_PRICING.fullPrice,
      },
    });
  } catch (error) {
    console.error('Barber public checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/barber/checkout/public
 * 
 * Calculate payment plan without creating a session (for preview)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const hoursPerWeek = parseInt(searchParams.get('hours_per_week') || '40');
    const transferredHours = parseInt(searchParams.get('transferred_hours') || '0');

    if (hoursPerWeek < 20 || hoursPerWeek > 50) {
      return NextResponse.json(
        { error: 'Hours per week must be between 20 and 50' },
        { status: 400 }
      );
    }

    const calculation = calculateWeeklyPayment(hoursPerWeek, transferredHours);
    const firstBillingDateFormatted = formatFirstBillingDate();

    return NextResponse.json({
      pricing: {
        fullPrice: BARBER_PRICING.fullPrice,
        setupFee: BARBER_PRICING.setupFee,
        setupFeeRate: '35%',
        remainingBalance: BARBER_PRICING.remainingBalance,
        totalHoursRequired: BARBER_PRICING.totalHoursRequired,
      },
      calculation: {
        hoursPerWeek,
        transferredHours,
        hoursRemaining: calculation.hoursRemaining,
        weeksRemaining: calculation.weeksRemaining,
        weeklyPaymentDollars: calculation.weeklyPaymentDollars,
        weeklyPaymentCents: calculation.weeklyPaymentCents,
      },
      billing: {
        setupFeeDueAt: 'enrollment',
        firstWeeklyCharge: firstBillingDateFormatted,
        billingDay: 'Friday',
      },
      summary: {
        dueToday: `$${BARBER_PRICING.setupFee.toLocaleString()} (setup fee)`,
        weeklyPayment: `$${calculation.weeklyPaymentDollars.toFixed(2)}/week`,
        duration: `~${calculation.weeksRemaining} weeks`,
      },
    });
  } catch (error) {
    console.error('Barber checkout GET error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate payment plan' },
      { status: 500 }
    );
  }
}
