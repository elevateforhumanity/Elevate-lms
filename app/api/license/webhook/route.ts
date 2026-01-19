import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { createSupabaseClient } from '@/lib/supabase-api';
import { logger } from '@/lib/logger';
import { enqueueJob } from '@/lib/jobs/queue';
import { getCorrelationFromStripeEvent } from '@/lib/observability/correlation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-10-29.clover' as Stripe.LatestApiVersion,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

/**
 * STEP 6A: Async Stripe webhook handler
 * 
 * Pattern:
 * 1. Validate signature
 * 2. Idempotency check
 * 3. Enqueue job
 * 4. Return 200 immediately
 * 
 * Worker processes jobs asynchronously with retries.
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
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
    logger.error('Webhook signature verification failed', err instanceof Error ? err : new Error(String(err)));
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Extract correlation context
  const correlation = getCorrelationFromStripeEvent(event);
  
  logger.info('Webhook received', {
    eventType: event.type,
    eventId: event.id,
    correlationId: correlation.correlationId,
  });

  const supabase = createSupabaseClient();

  try {
    // Idempotency check
    const { data: existing } = await supabase
      .from('processed_stripe_events')
      .select('id')
      .eq('stripe_event_id', event.id)
      .single();

    if (existing) {
      logger.info('Duplicate webhook event (idempotent)', { eventId: event.id });
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Record event as processed
    await supabase.from('processed_stripe_events').insert({
      stripe_event_id: event.id,
      event_type: event.type,
      correlation_id: correlation.correlationId,
      payload: event.data.object,
    });

    // Enqueue job for async processing (fast return)
    const jobType = mapEventToJobType(event.type);
    
    if (jobType) {
      await enqueueJob({
        jobType,
        correlationId: correlation.correlationId,
        stripeEventId: event.id,
        paymentIntentId: correlation.paymentIntentId,
        tenantId: correlation.tenantId,
        payload: {
          eventType: event.type,
          eventData: event.data.object,
        },
      });
    }

    const duration = Date.now() - startTime;
    
    logger.info('Webhook processed (async)', {
      eventType: event.type,
      eventId: event.id,
      correlationId: correlation.correlationId,
      durationMs: duration,
    });

    // Return immediately - job processes in background
    return NextResponse.json({ 
      received: true,
      correlationId: correlation.correlationId,
      durationMs: duration,
    });
  } catch (error) {
    logger.error('Webhook handler error', error instanceof Error ? error : new Error(String(error)), {
      eventId: event.id,
      correlationId: correlation.correlationId,
    });
    
    // Still return 200 to prevent Stripe retries for non-transient errors
    // Job queue will handle retries
    return NextResponse.json({ 
      received: true, 
      error: 'Queued for retry',
      correlationId: correlation.correlationId,
    });
  }
}

/**
 * Map Stripe event type to job type
 */
function mapEventToJobType(eventType: string): string | null {
  const mapping: Record<string, string> = {
    'checkout.session.completed': 'license_provision',
    'invoice.paid': 'license_provision',
    'customer.subscription.deleted': 'license_suspend',
    'charge.refunded': 'license_suspend',
    'charge.dispute.created': 'license_suspend',
    'charge.dispute.closed': 'license_reactivate',
  };
  
  return mapping[eventType] || 'webhook_process';
}
