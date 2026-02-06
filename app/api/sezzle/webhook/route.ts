/**
 * Sezzle Webhook Handler
 * 
 * Handles Sezzle payment events:
 * - order.complete: Payment successful
 * - order.refund: Refund processed
 * - order.cancel: Order canceled
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';
import crypto from 'crypto';

// Use admin client for webhook processing
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Verify Sezzle webhook signature
function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('sezzle-signature') || '';
    const webhookSecret = process.env.SEZZLE_WEBHOOK_SECRET;

    // Verify signature if secret is configured
    if (webhookSecret && signature) {
      if (!verifyWebhookSignature(payload, signature, webhookSecret)) {
        logger.warn('Sezzle webhook signature verification failed');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(payload);
    const { event_type, data } = event;

    logger.info('Sezzle webhook received', { event_type, orderUuid: data?.order?.uuid });

    const supabase = getSupabaseAdmin();

    switch (event_type) {
      case 'order.complete': {
        // Payment was successful
        const orderUuid = data.order?.uuid;
        const referenceId = data.order?.reference_id;
        const amountInCents = data.order?.order_amount?.amount_in_cents;

        if (!orderUuid) {
          logger.error('Sezzle order.complete missing order UUID');
          break;
        }

        // Update application status
        if (supabase && referenceId) {
          // Find application by Sezzle reference
          const { data: application } = await supabase
            .from('applications')
            .select('id, email, program_id')
            .eq('sezzle_reference_id', referenceId)
            .single();

          if (application) {
            // Update application to paid
            await supabase
              .from('applications')
              .update({
                status: 'paid',
                payment_status: 'completed',
                payment_provider: 'sezzle',
                payment_amount: amountInCents ? amountInCents / 100 : null,
                paid_at: new Date().toISOString(),
              })
              .eq('id', application.id);

            // Create or update enrollment
            const { data: profile } = await supabase
              .from('profiles')
              .select('id')
              .eq('email', application.email)
              .single();

            if (profile) {
              await supabase
                .from('program_enrollments')
                .upsert({
                  student_id: profile.id,
                  program_id: application.program_id,
                  funding_source: 'SELF_PAY',
                  status: 'ACTIVE',
                  payment_status: 'PAID',
                  payment_provider: 'sezzle',
                  sezzle_order_uuid: orderUuid,
                }, {
                  onConflict: 'student_id,program_id',
                });
            }

            logger.info('Sezzle payment completed', {
              applicationId: application.id,
              orderUuid,
              amount: amountInCents ? amountInCents / 100 : null,
            });
          }
        }
        break;
      }

      case 'order.refund': {
        // Refund was processed
        const orderUuid = data.order?.uuid;
        const refundAmount = data.refund?.amount?.amount_in_cents;

        if (supabase && orderUuid) {
          // Update application
          await supabase
            .from('applications')
            .update({
              payment_status: 'refunded',
              refund_amount: refundAmount ? refundAmount / 100 : null,
              refunded_at: new Date().toISOString(),
            })
            .eq('sezzle_order_uuid', orderUuid);

          logger.info('Sezzle refund processed', { orderUuid, refundAmount });
        }
        break;
      }

      case 'order.cancel': {
        // Order was canceled
        const orderUuid = data.order?.uuid;

        if (supabase && orderUuid) {
          await supabase
            .from('applications')
            .update({
              status: 'canceled',
              payment_status: 'canceled',
            })
            .eq('sezzle_order_uuid', orderUuid);

          logger.info('Sezzle order canceled', { orderUuid });
        }
        break;
      }

      default:
        logger.info('Unhandled Sezzle event type', { event_type });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    logger.error('Sezzle webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
