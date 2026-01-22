import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY not configured');
  return new Stripe(key, {
    apiVersion: '2025-10-29.clover' as Stripe.LatestApiVersion,
  });
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

/**
 * POST /api/license/webhook
 * 
 * Stripe webhook handler for license lifecycle events.
 * Idempotent via stripe_webhook_events table.
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

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

  // Idempotency check
  const supabase = await createClient();
  if (supabase) {
    const { data: existing } = await supabase
      .from('stripe_webhook_events')
      .select('id')
      .eq('stripe_event_id', event.id)
      .single();

    if (existing) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    await supabase
      .from('stripe_webhook_events')
      .insert({ stripe_event_id: event.id, event_type: event.type, status: 'processing' })
      .catch(() => {});
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;

      case 'charge.dispute.created':
        await handleDisputeCreated(event.data.object as Stripe.Dispute);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

/**
 * checkout.session.completed
 * Create organization and license records, log agreement acceptance
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;
  const metadata = session.metadata || {};

  console.log('Checkout completed:', {
    customerId,
    subscriptionId,
    organizationName: metadata.organization_name,
    planId: metadata.plan_id,
  });

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Get Supabase admin client
  const { createAdminClient } = await import('@/lib/supabase/admin');
  const supabase = createAdminClient();

  try {
    // 1. Create or update organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .upsert({
        name: metadata.organization_name,
        organization_type: metadata.organization_type || 'other',
        contact_name: metadata.contact_name,
        contact_email: session.customer_email || metadata.contact_email,
        stripe_customer_id: customerId,
        status: 'active',
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'stripe_customer_id',
      })
      .select()
      .single();

    if (orgError) {
      console.error('Error creating organization:', orgError);
      throw orgError;
    }

    console.log('Organization created/updated:', org.id);

    // 2. Create license record
    const licenseStatus = subscription.status === 'trialing' ? 'trial' : 'active';
    const { data: license, error: licenseError } = await supabase
      .from('licenses')
      .upsert({
        organization_id: org.id,
        stripe_subscription_id: subscriptionId,
        stripe_customer_id: customerId,
        plan_id: metadata.plan_id,
        status: licenseStatus,
        trial_started_at: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
        trial_ends_at: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
        current_period_start: new Date((subscription as any).current_period_start * 1000).toISOString(),
        current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'stripe_subscription_id',
      })
      .select()
      .single();

    if (licenseError) {
      console.error('Error creating license:', licenseError);
      throw licenseError;
    }

    console.log('License created/updated:', license.id);

    // 3. Log agreement acceptances if present
    if (metadata.agreements_accepted) {
      const agreements = metadata.agreements_accepted.split(',');
      const acceptedAt = metadata.agreements_accepted_at || new Date().toISOString();

      for (const agreementType of agreements) {
        await supabase
          .from('license_agreement_acceptances')
          .upsert({
            organization_id: org.id,
            agreement_type: agreementType,
            document_version: '1.0',
            accepted_at: acceptedAt,
            acceptance_context: 'checkout',
            stripe_session_id: session.id,
          }, {
            onConflict: 'user_id,agreement_type,document_version',
            ignoreDuplicates: true,
          });
      }

      console.log('Agreement acceptances logged:', agreements);
    }

    // 4. Log license event
    await supabase
      .from('license_events')
      .insert({
        license_id: license.id,
        event_type: 'license_created',
        event_data: {
          plan_id: metadata.plan_id,
          status: licenseStatus,
          stripe_session_id: session.id,
        },
      });

    console.log('License provisioning complete for:', metadata.organization_name);

  } catch (error) {
    console.error('Error in handleCheckoutCompleted:', error);
    throw error;
  }
}

/**
 * invoice.paid
 * Activate license - this is when trial converts to paid
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as any).subscription as string;
  
  if (!subscriptionId) {
    console.log('Invoice paid but no subscription (one-time payment)');
    return;
  }

  console.log('Invoice paid:', {
    subscriptionId,
    amountPaid: invoice.amount_paid / 100,
    invoiceUrl: invoice.hosted_invoice_url,
  });

  // TODO: Update license in database
  // await db.licenses.update({
  //   where: { stripeSubscriptionId: subscriptionId },
  //   data: {
  //     status: 'active',
  //     lastPaymentStatus: 'paid',
  //     lastInvoiceUrl: invoice.hosted_invoice_url,
  //   },
  // });
}

/**
 * invoice.payment_failed
 * Set past_due status, start grace period
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as any).subscription as string;
  
  if (!subscriptionId) return;

  console.log('Invoice payment failed:', {
    subscriptionId,
    attemptCount: invoice.attempt_count,
  });

  // TODO: Update license in database
  // await db.licenses.update({
  //   where: { stripeSubscriptionId: subscriptionId },
  //   data: {
  //     status: 'past_due',
  //     lastPaymentStatus: 'failed',
  //   },
  // });

  // TODO: Send email notification about payment failure
}

/**
 * customer.subscription.updated
 * Handle plan changes, cancellation scheduling
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', {
    subscriptionId: subscription.id,
    status: subscription.status,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  });

  let newStatus: string;
  
  switch (subscription.status) {
    case 'trialing':
      newStatus = 'trial';
      break;
    case 'active':
      newStatus = 'active';
      break;
    case 'past_due':
      newStatus = 'past_due';
      break;
    case 'canceled':
    case 'unpaid':
      newStatus = 'suspended';
      break;
    default:
      newStatus = subscription.status;
  }

  // TODO: Update license in database
  // await db.licenses.update({
  //   where: { stripeSubscriptionId: subscription.id },
  //   data: {
  //     status: newStatus,
  //     currentPeriodEnd: new Date(subscription.current_period_end * 1000),
  //     canceledAt: subscription.cancel_at_period_end ? new Date() : null,
  //   },
  // });
}

/**
 * customer.subscription.deleted
 * Hard cancel - suspend license immediately
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', {
    subscriptionId: subscription.id,
  });

  // TODO: Update license in database
  // await db.licenses.update({
  //   where: { stripeSubscriptionId: subscription.id },
  //   data: {
  //     status: 'canceled',
  //     canceledAt: new Date(),
  //   },
  // });
}

/**
 * charge.refunded
 * Immediate suspension to protect against abuse
 */
async function handleChargeRefunded(charge: Stripe.Charge) {
  const customerId = charge.customer as string;
  
  console.log('Charge refunded - suspending license:', {
    customerId,
    amount: charge.amount_refunded / 100,
  });

  // TODO: Find and suspend license
  // await db.licenses.updateMany({
  //   where: { stripeCustomerId: customerId },
  //   data: {
  //     status: 'suspended',
  //     suspendedAt: new Date(),
  //   },
  // });
}

/**
 * charge.dispute.created
 * Immediate suspension on chargeback
 */
async function handleDisputeCreated(dispute: Stripe.Dispute) {
  const charge = await stripe.charges.retrieve(dispute.charge as string);
  const customerId = charge.customer as string;

  console.log('Dispute created - suspending license:', {
    customerId,
    reason: dispute.reason,
  });

  // TODO: Find and suspend license
  // await db.licenses.updateMany({
  //   where: { stripeCustomerId: customerId },
  //   data: {
  //     status: 'suspended',
  //     suspendedAt: new Date(),
  //   },
  // });
}