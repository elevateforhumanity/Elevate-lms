import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  handleCheckoutCompleted,
  handleInvoicePaid,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  handlePaymentFailed,
} from '@/lib/license/linkStripeToLicense';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(key, {
    apiVersion: '2025-10-29.clover' as Stripe.LatestApiVersion,
  });
}

/**
 * POST /api/license/webhook
 * 
 * Stripe webhook handler for license lifecycle events.
 * Uses shared linking logic from lib/license/linkStripeToLicense.ts
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
    const stripe = getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[/api/license/webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Idempotency check
  const supabase = createAdminClient();
  
  if (!supabase) {
    console.error('[/api/license/webhook] Supabase admin client not available');
    return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });
  }
  
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
    .catch((e) => console.warn('[/api/license/webhook] Could not insert event:', e));

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const result = await handleCheckoutCompleted(event, session);
        console.log(`[/api/license/webhook] checkout.session.completed:`, result);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const result = await handleSubscriptionUpdated(event, subscription);
        console.log(`[/api/license/webhook] subscription.updated:`, result);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const result = await handleSubscriptionDeleted(event, subscription);
        console.log(`[/api/license/webhook] subscription.deleted:`, result);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const result = await handleInvoicePaid(event, invoice);
        console.log(`[/api/license/webhook] invoice.paid:`, result);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const result = await handlePaymentFailed(event, invoice);
        console.log(`[/api/license/webhook] invoice.payment_failed:`, result);
        break;
      }
    }

    // Mark event as processed
    await supabase
      .from('stripe_webhook_events')
      .update({ status: 'processed' })
      .eq('stripe_event_id', event.id);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[/api/license/webhook] Processing error:', error);
    
    await supabase
      .from('stripe_webhook_events')
      .update({ status: 'failed', error: String(error) })
      .eq('stripe_event_id', event.id);

    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
