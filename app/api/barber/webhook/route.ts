import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Stripe from 'stripe';
import { BARBER_PRICING, calculateWeeklyPayment } from '@/lib/programs/pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_BARBER || process.env.STRIPE_WEBHOOK_SECRET!;

/**
 * POST /api/barber/webhook
 * 
 * Handles Stripe webhook events for Barber Apprenticeship subscriptions:
 * - checkout.session.completed: Store subscription details
 * - customer.subscription.updated: Handle plan changes
 * - customer.subscription.deleted: Handle cancellation
 * - invoice.paid: Track payments
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Only process barber enrollments
        if (session.metadata?.program !== 'barber-apprenticeship') {
          break;
        }

        const subscriptionId = session.subscription as string;
        const userId = session.metadata?.user_id;
        const enrollmentId = session.metadata?.enrollment_id;

        if (!subscriptionId || !userId) {
          console.error('Missing subscription or user ID');
          break;
        }

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Store subscription in database
        await supabase.from('barber_subscriptions').upsert({
          user_id: userId,
          enrollment_id: enrollmentId || null,
          stripe_subscription_id: subscriptionId,
          stripe_customer_id: session.customer as string,
          status: subscription.status,
          setup_fee_paid: true,
          setup_fee_amount: BARBER_PRICING.setupFee,
          weekly_payment_cents: parseInt(subscription.metadata?.weekly_payment_cents || '0'),
          weeks_remaining: parseInt(subscription.metadata?.weeks_remaining || '0'),
          hours_per_week: parseInt(subscription.metadata?.hours_per_week || '40'),
          transferred_hours_verified: parseInt(subscription.metadata?.transferred_hours_verified || '0'),
          billing_cycle_anchor: new Date((subscription.billing_cycle_anchor || 0) * 1000).toISOString(),
          current_period_start: new Date((subscription.current_period_start || 0) * 1000).toISOString(),
          current_period_end: new Date((subscription.current_period_end || 0) * 1000).toISOString(),
          created_at: new Date().toISOString(),
        }, {
          onConflict: 'stripe_subscription_id',
        });

        // Update enrollment status if enrollment_id provided
        if (enrollmentId) {
          await supabase
            .from('enrollments')
            .update({ 
              payment_status: 'active',
              stripe_subscription_id: subscriptionId,
            })
            .eq('id', enrollmentId);
        }

        console.log(`Barber subscription created: ${subscriptionId} for user ${userId}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Only process barber subscriptions
        if (subscription.metadata?.program !== 'barber-apprenticeship') {
          break;
        }

        await supabase
          .from('barber_subscriptions')
          .update({
            status: subscription.status,
            weekly_payment_cents: parseInt(subscription.metadata?.weekly_payment_cents || '0'),
            weeks_remaining: parseInt(subscription.metadata?.weeks_remaining || '0'),
            current_period_start: new Date((subscription.current_period_start || 0) * 1000).toISOString(),
            current_period_end: new Date((subscription.current_period_end || 0) * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        console.log(`Barber subscription updated: ${subscription.id}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        if (subscription.metadata?.program !== 'barber-apprenticeship') {
          break;
        }

        await supabase
          .from('barber_subscriptions')
          .update({
            status: 'canceled',
            canceled_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        console.log(`Barber subscription canceled: ${subscription.id}`);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        if (!subscriptionId) break;

        // Get subscription to check if it's a barber subscription
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        if (subscription.metadata?.program !== 'barber-apprenticeship') {
          break;
        }

        // Record payment
        await supabase.from('barber_payments').insert({
          user_id: subscription.metadata?.user_id,
          stripe_subscription_id: subscriptionId,
          stripe_invoice_id: invoice.id,
          amount_paid: (invoice.amount_paid || 0) / 100,
          payment_date: new Date().toISOString(),
          invoice_url: invoice.hosted_invoice_url,
        }).catch(() => {
          // Table may not exist
        });

        // Decrement weeks remaining
        const currentWeeks = parseInt(subscription.metadata?.weeks_remaining || '0');
        if (currentWeeks > 0) {
          await supabase
            .from('barber_subscriptions')
            .update({
              weeks_remaining: currentWeeks - 1,
              last_payment_date: new Date().toISOString(),
            })
            .eq('stripe_subscription_id', subscriptionId);
        }

        console.log(`Barber payment recorded: ${invoice.id}`);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

/**
 * PUT /api/barber/webhook
 * 
 * Update subscription when transfer hours are verified
 * Called internally when admin verifies transfer hours
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
    }

    // Verify admin access
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { 
      subscription_id,
      transferred_hours_verified,
      hours_per_week,
    } = body;

    if (!subscription_id) {
      return NextResponse.json({ error: 'Subscription ID required' }, { status: 400 });
    }

    // Get current subscription
    const subscription = await stripe.subscriptions.retrieve(subscription_id);
    
    if (subscription.metadata?.program !== 'barber-apprenticeship') {
      return NextResponse.json({ error: 'Not a barber subscription' }, { status: 400 });
    }

    // Recalculate weekly payment with new transfer hours
    const hpw = hours_per_week || parseInt(subscription.metadata?.hours_per_week || '40');
    const calculation = calculateWeeklyPayment(hpw, transferred_hours_verified);

    // Update subscription item quantity (weekly payment amount)
    const subscriptionItem = subscription.items.data[0];
    
    await stripe.subscriptionItems.update(subscriptionItem.id, {
      quantity: calculation.weeklyPaymentCents,
      proration_behavior: 'none', // No mid-cycle adjustments
    });

    // Update subscription metadata
    await stripe.subscriptions.update(subscription_id, {
      metadata: {
        ...subscription.metadata,
        transferred_hours_verified: transferred_hours_verified.toString(),
        hours_remaining: calculation.hoursRemaining.toString(),
        weeks_remaining: calculation.weeksRemaining.toString(),
        weekly_payment_cents: calculation.weeklyPaymentCents.toString(),
        weekly_payment_dollars: calculation.weeklyPaymentDollars.toFixed(2),
      },
    });

    // Update database
    await supabase
      .from('barber_subscriptions')
      .update({
        transferred_hours_verified,
        hours_remaining: calculation.hoursRemaining,
        weeks_remaining: calculation.weeksRemaining,
        weekly_payment_cents: calculation.weeklyPaymentCents,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscription_id);

    return NextResponse.json({
      success: true,
      updated: {
        transferredHours: transferred_hours_verified,
        hoursRemaining: calculation.hoursRemaining,
        weeksRemaining: calculation.weeksRemaining,
        newWeeklyPayment: calculation.weeklyPaymentDollars,
      },
      message: `Weekly payment updated to $${calculation.weeklyPaymentDollars.toFixed(2)} for ${calculation.weeksRemaining} weeks`,
    });
  } catch (error) {
    console.error('Transfer hours update error:', error);
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
  }
}
