import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  BARBER_PRICING,
  calculateWeeklyPayment,
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
 * 
 * Payment Model (NOT a subscription):
 * 1. Setup fee ($1,743) - collected immediately via Checkout
 * 2. Weekly invoices - scheduled for each Friday, sent automatically
 * 
 * This allows:
 * - BNPL (Affirm, Klarna, Afterpay) for setup fee
 * - Automatic weekly invoice emails with payment links
 * - Student can pay via link or auto-charge if card saved
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

    let customerId: string;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email: customer_email,
        name: customer_name || undefined,
        phone: customer_phone || undefined,
        metadata: {
          program: 'barber-apprenticeship',
          application_id: application_id || '',
          hours_per_week: hours_per_week.toString(),
          transferred_hours: transferred_hours_verified.toString(),
          weeks_remaining: calculation.weeksRemaining.toString(),
          weekly_payment_cents: calculation.weeklyPaymentCents.toString(),
        },
      });
      customerId = customer.id;
    }

    // Build success/cancel URLs
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';
    const finalSuccessUrl = success_url || `${baseUrl}/programs/barber-apprenticeship/enrollment-success?session_id={CHECKOUT_SESSION_ID}`;
    const finalCancelUrl = cancel_url || `${baseUrl}/programs/barber-apprenticeship/apply?canceled=true`;

    const firstBillingDate = formatFirstBillingDate();

    // Create Checkout Session for SETUP FEE ONLY (one-time payment)
    // This allows BNPL options (Affirm, Klarna, Afterpay)
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment', // One-time payment, NOT subscription
      payment_method_types: ['card', 'us_bank_account', 'affirm', 'klarna', 'afterpay_clearpay'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Barber Apprenticeship - Setup Fee (35%)',
              description: `Enrollment fee. Weekly payments of $${calculation.weeklyPaymentDollars.toFixed(2)} begin ${firstBillingDate}.`,
            },
            unit_amount: BARBER_PRICING.setupFee * 100, // $1,743 in cents
          },
          quantity: 1,
        },
      ],
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      metadata: {
        program: 'barber-apprenticeship',
        programSlug: 'barber-apprenticeship',
        checkout_type: 'barber_setup_fee',
        application_id: application_id || '',
        customer_name: customer_name || '',
        customer_phone: customer_phone || '',
        transferHours: transferred_hours_verified.toString(),
        hours_per_week: hours_per_week.toString(),
        weeks_remaining: calculation.weeksRemaining.toString(),
        weekly_payment_cents: calculation.weeklyPaymentCents.toString(),
        weekly_payment_dollars: calculation.weeklyPaymentDollars.toFixed(2),
        has_host_shop: has_host_shop || '',
        host_shop_name: host_shop_name || '',
        // Flag to trigger invoice scheduling in webhook
        schedule_weekly_invoices: 'true',
      },
      custom_text: {
        submit: {
          message: `Setup fee due today. Weekly payments ($${calculation.weeklyPaymentDollars.toFixed(2)}/week for ~${calculation.weeksRemaining} weeks) begin ${firstBillingDate}.`,
        },
      },
      // Save payment method for future weekly charges
      payment_intent_data: {
        setup_future_usage: 'off_session',
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
        firstBillingDate,
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
    const firstBillingDate = formatFirstBillingDate();

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
        firstWeeklyCharge: firstBillingDate,
        billingDay: 'Friday',
        paymentMethod: 'Invoice sent weekly with payment link',
      },
      bnplAvailable: true,
      bnplOptions: ['Affirm', 'Klarna', 'Afterpay'],
      summary: {
        dueToday: `$${BARBER_PRICING.setupFee.toLocaleString()} (setup fee)`,
        weeklyPayment: `$${calculation.weeklyPaymentDollars.toFixed(2)}/week`,
        duration: `~${calculation.weeksRemaining} weeks`,
        paymentLinks: 'Sent every Friday via email',
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
