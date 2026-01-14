// @ts-nocheck
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey
  ? new Stripe(stripeKey, {
      apiVersion: '2025-10-29.clover',
    })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Supabase admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function POST(request: NextRequest) {
  if (!stripe || !supabase) {
    return NextResponse.json(
      { error: 'Stripe or Supabase not configured' },
      { status: 503 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    logger.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      // LANE B: Handle store subscription checkout
      if (
        session.mode === 'subscription' &&
        session.metadata?.subscription_type === 'store'
      ) {
        try {
          const userId = session.metadata.user_id;

          if (!userId) {
            logger.error('No user_id in subscription checkout metadata');
            break;
          }

          // Subscription will be created by customer.subscription.created event
          // Just log the checkout completion here
          logger.info(
            `✅ Store subscription checkout completed: ${session.id}`
          );
        } catch (err: any) {
          logger.error(
            'Error processing store subscription checkout:',
            err instanceof Error ? err : new Error(String(err))
          );
        }
        break;
      }

      // LANE A: Handle enrollment payment checkout
      if (
        session.mode === 'payment' &&
        session.metadata?.payment_type === 'enrollment'
      ) {
        try {
          const enrollmentId = session.metadata.enrollment_id;

          if (!enrollmentId) {
            logger.error('No enrollment_id in payment checkout metadata');
            break;
          }

          // Complete enrollment payment using RPC
          const { data, error }: any = await supabase.rpc(
            'complete_enrollment_payment',
            {
              p_enrollment_id: enrollmentId,
              p_stripe_event_id: event.id,
              p_stripe_session_id: session.id,
              p_stripe_payment_intent_id: session.payment_intent as string,
              p_amount_cents: session.amount_total || 0,
            }
          );

          if (error) {
            logger.error('Error completing enrollment payment:', error);
          } else if (data?.duplicate) {
            logger.info(`⚠️ Duplicate enrollment webhook ignored: ${event.id}`);
          } else {
            logger.info(`✅ Enrollment payment completed: ${enrollmentId}`);
          }
        } catch (err: any) {
          logger.error(
            'Error processing enrollment payment:',
            err instanceof Error ? err : new Error(String(err))
          );
        }
        break;
      }

      // Handle drug testing products and training courses
      if (
        session.metadata?.type === 'service' ||
        session.metadata?.type === 'course'
      ) {
        try {
          // Log the purchase
          const { error: logError } = await supabase
            .from('payment_logs')
            .insert({
              stripe_session_id: session.id,
              stripe_payment_id: session.payment_intent as string,
              amount: (session.amount_total || 0) / 100,
              currency: 'usd',
              status: 'completed',
              metadata: {
                productName: session.metadata.productName,
                type: session.metadata.type,
                category: session.metadata.category,
                price: session.metadata.price,
                customer_email: session.customer_email,
              },
            });

          if (logError) {
            logger.error('Error logging drug testing purchase:', logError);
          }

          // Create order record
          const { error: orderError } = await supabase
            .from('drug_testing_orders')
            .insert({
              product_name: session.metadata.productName,
              product_type: session.metadata.type,
              category: session.metadata.category,
              price: parseFloat(session.metadata.price || '0'),
              customer_email: session.customer_email,
              stripe_session_id: session.id,
              stripe_payment_id: session.payment_intent as string,
              status: 'pending_contact',
              created_at: new Date().toISOString(),
            });

          if (orderError) {
            logger.error('Error creating drug testing order:', orderError);
          } else {
            logger.info(
              '✅ Drug testing order created:',
              session.metadata.productName
            );
          }

          // Send confirmation email to customer

          // Send notification to admin
        } catch (err: any) {
          logger.error(
            'Error processing drug testing purchase:',
            err instanceof Error ? err : new Error(String(err))
          );
        }
        break;
      }

      // Handle barber apprenticeship enrollment
      if (session.metadata?.programSlug === 'barber-apprenticeship' && session.metadata?.applicationId) {
        try {
          const applicationId = session.metadata.applicationId;
          
          // Update application status to paid
          const { error: appError } = await supabase
            .from('applications')
            .update({
              status: 'paid',
              payment_completed_at: new Date().toISOString(),
              stripe_session_id: session.id,
            })
            .eq('id', applicationId);

          if (appError) {
            logger.error('Error updating barber application:', appError);
          }

          // Update RAPIDS registration status
          await supabase
            .from('rapids_registrations')
            .update({
              status: 'active',
              payment_completed_at: new Date().toISOString(),
            })
            .eq('application_id', applicationId);

          // Create LMS enrollment
          const { data: application } = await supabase
            .from('applications')
            .select('*')
            .eq('id', applicationId)
            .single();

          if (application) {
            // Get or create user profile
            let userId = application.user_id;
            
            if (!userId) {
              // Create profile for new user
              const { data: profile } = await supabase
                .from('profiles')
                .insert({
                  email: application.email,
                  full_name: `${application.first_name} ${application.last_name}`,
                  role: 'student',
                })
                .select('id')
                .single();
              
              userId = profile?.id;
            }

            if (userId) {
              // Create enrollment record
              await supabase.from('enrollments').insert({
                user_id: userId,
                program_slug: 'barber-apprenticeship',
                status: 'active',
                payment_status: 'paid',
                payment_amount: (session.amount_total || 0) / 100,
                enrolled_at: new Date().toISOString(),
              });
            }
          }

          // Log payment
          await supabase.from('payment_logs').insert({
            stripe_session_id: session.id,
            stripe_payment_id: session.payment_intent as string,
            amount: (session.amount_total || 0) / 100,
            currency: 'usd',
            status: 'completed',
            metadata: {
              programSlug: 'barber-apprenticeship',
              applicationId,
              type: 'apprenticeship',
            },
          });

          logger.info('✅ Barber apprenticeship enrollment completed:', applicationId);
        } catch (err: any) {
          logger.error(
            'Error processing barber apprenticeship enrollment:',
            err instanceof Error ? err : new Error(String(err))
          );
        }
        break;
      }

      // Check if this is a partner course enrollment (new system)
      if (session.metadata?.course_id && session.metadata?.provider_id) {
        try {
          // Create partner enrollment record
          const { error: enrollmentError } = await supabase
            .from('partner_lms_enrollments')
            .insert({
              provider_id: session.metadata.provider_id,
              student_id: session.metadata.student_id,
              course_id: session.metadata.course_id,
              status: 'active',
              payment_status: 'paid',
              payment_amount: (session.amount_total || 0) / 100,
              payment_session_id: session.id,
              payment_completed_at: new Date().toISOString(),
              course_name: session.metadata.course_code,
              metadata: {
                wholesale_cost: session.metadata.wholesale_cost,
                retail_price: session.metadata.retail_price,
                profit_margin: session.metadata.profit_margin,
                course_url: session.metadata.course_url,
              },
            });

          if (enrollmentError) {
            logger.error('Error creating partner enrollment:', enrollmentError);
          } else {
            logger.info(
              '✅ Partner course enrollment created:',
              session.metadata.course_code
            );
          }

          // Log payment
          await supabase.from('payment_logs').insert({
            stripe_session_id: session.id,
            stripe_payment_id: session.payment_intent as string,
            amount: (session.amount_total || 0) / 100,
            currency: 'usd',
            status: 'completed',
            metadata: session.metadata,
          });

          logger.info('✅ Partner course payment logged');
        } catch (err: any) {
          logger.error(
            'Error processing partner course enrollment:',
            err instanceof Error ? err : new Error(String(err))
          );
        }
        break;
      }

      // Check if this is an HSI enrollment (legacy system)
      if (session.metadata?.provider === 'hsi') {
        try {
          // Get course details
          const { data: course } = await supabase
            .from('hsi_course_products')
            .select('*')
            .eq('course_type', session.metadata.course_type)
            .single();

          if (!course) {
            logger.error('HSI course not found:', session.metadata.course_type);
            break;
          }

          // Create enrollment queue entry
          const { error: queueError } = await supabase
            .from('hsi_enrollment_queue')
            .insert({
              student_id: session.metadata.student_id,
              course_type: session.metadata.course_type,
              stripe_payment_id: session.payment_intent as string,
              stripe_session_id: session.id,
              amount_paid: (session.amount_total || 0) / 100,
              student_email: session.metadata.student_email,
              student_name: session.metadata.student_name,
              student_phone: session.metadata.student_phone || '',
              student_address: session.metadata.student_address || '',
              hsi_enrollment_link: course.hsi_enrollment_link,
              enrollment_status: 'pending',
            });

          if (queueError) {
            logger.error('Error creating HSI enrollment queue:', queueError);
          } else {
            logger.info(
              '✅ HSI enrollment queued:',
              session.metadata.student_name
            );
          }

          // Create partner enrollment record
          const { data: provider } = await supabase
            .from('partner_lms_providers')
            .select('id')
            .eq('provider_type', 'hsi')
            .single();

          if (provider) {
            await supabase.from('partner_lms_enrollments').insert({
              provider_id: provider.id,
              student_id: session.metadata.student_id,
              status: 'payment_pending',
              payment_status: 'paid',
              payment_amount: (session.amount_total || 0) / 100,
              payment_session_id: session.id,
              payment_completed_at: new Date().toISOString(),
              course_name: course.course_name,
            });
          }

          // Log payment
          await supabase.from('payment_logs').insert({
            stripe_session_id: session.id,
            stripe_payment_id: session.payment_intent as string,
            amount: (session.amount_total || 0) / 100,
            currency: 'usd',
            status: 'completed',
            metadata: session.metadata,
          });

          logger.info('✅ HSI payment logged successfully');
        } catch (err: any) {
          logger.error(
            'Error processing HSI enrollment:',
            err instanceof Error ? err : new Error(String(err))
          );
        }
        break;
      }

      // Handle regular course enrollments (LANE A: Tuition/Enrollment)
      const enrollmentId = session.metadata?.enrollment_id;

      if (enrollmentId) {
        try {
          // Use idempotent payment completion function
          const { data, error }: any = await supabase.rpc(
            'complete_stripe_payment',
            {
              p_enrollment_id: enrollmentId,
              p_stripe_event_id: event.id,
              p_stripe_session_id: session.id,
              p_stripe_payment_intent_id: session.payment_intent as string,
              p_amount_cents: session.amount_total || 0,
            }
          );

          if (error) {
            logger.error('Error completing enrollment payment:', error);
          } else if (data?.duplicate) {
            logger.info(`⚠️ Duplicate webhook ignored: ${event.id}`);
          } else {
            logger.info(`✅ Enrollment payment completed: ${enrollmentId}`);
          }
        } catch (err: any) {
          logger.error(
            'Error processing enrollment payment:',
            err instanceof Error ? err : new Error(String(err))
          );
        }
        break;
      }

      // Legacy fallback for old enrollments without enrollment_id
      const userId = session.metadata?.user_id;
      const courseId = session.metadata?.course_id;
      const partnerOwedCents = parseInt(
        session.metadata?.partner_owed_cents || '0',
        10
      );
      const yourRevenueCents = parseInt(
        session.metadata?.your_revenue_cents || '0',
        10
      );

      if (userId && courseId) {
        // Create new enrollment (legacy path)
        await supabase.from('enrollments').insert({
          user_id: userId,
          course_id: courseId,
          status: 'active',
          payment_status: 'paid',
          stripe_checkout_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          paid_at: new Date().toISOString(),
          amount_paid_cents: session.amount_total || 0,
          enrollment_type: 'standalone',
          funding_source: 'self_pay',
          partner_owed_cents: partnerOwedCents,
          your_revenue_cents: yourRevenueCents,
        });

        // Create partner payment record if applicable
        if (partnerOwedCents > 0) {
          const { data: course } = await supabase
            .from('courses')
            .select('partner_id')
            .eq('id', courseId)
            .single();

          if (course?.partner_id) {
            await supabase.from('partner_course_payments').insert({
              enrollment_id: enrollmentId,
              course_id: courseId,
              partner_id: course.partner_id,
              student_paid_cents: session.amount_total || 0,
              partner_owed_cents: partnerOwedCents,
              your_revenue_cents: yourRevenueCents,
              status: 'pending',
              due_date: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              ).toISOString(),
            });
          }
        }

        logger.info(
          `✅ Payment processed (legacy): user ${userId}, course ${courseId}`
        );
      }
      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      logger.info('PaymentIntent succeeded:', paymentIntent.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const failedPayment = event.data.object as Stripe.PaymentIntent;

      // Handle enrollment payment failure
      const enrollmentId = failedPayment.metadata?.enrollment_id;
      if (enrollmentId) {
        try {
          const { error } = await supabase.rpc('fail_stripe_payment', {
            p_enrollment_id: enrollmentId,
            p_stripe_event_id: event.id,
            p_error_message:
              failedPayment.last_payment_error?.message || 'Payment failed',
          });

          if (error) {
            logger.error('Error handling payment failure:', error);
          } else {
            logger.info(
              `✅ Enrollment payment failure handled: ${enrollmentId}`
            );
          }
        } catch (err: any) {
          logger.error(
            'Error processing payment failure:',
            err instanceof Error ? err : new Error(String(err))
          );
        }
      } else {
        logger.info('Payment failed:', failedPayment.id);
      }
      break;
    }

    // LANE B: Store subscription events
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;

      // Only handle store subscriptions
      if (subscription.metadata?.user_id) {
        try {
          const userId = subscription.metadata.user_id;
          const priceId = subscription.items.data[0]?.price.id;

          if (!priceId) {
            logger.error('No price ID in subscription');
            break;
          }

          // Upsert subscription
          const { data, error }: any = await supabase.rpc(
            'upsert_store_subscription',
            {
              p_user_id: userId,
              p_stripe_subscription_id: subscription.id,
              p_stripe_customer_id: subscription.customer as string,
              p_stripe_price_id: priceId,
              p_status: subscription.status,
              p_cancel_at_period_end: subscription.cancel_at_period_end,
              p_current_period_start: new Date(
                (subscription as any).current_period_start * 1000
              ).toISOString(),
              p_current_period_end: new Date(
                (subscription as any).current_period_end * 1000
              ).toISOString(),
              p_canceled_at: subscription.canceled_at
                ? new Date(subscription.canceled_at * 1000).toISOString()
                : null,
              p_ended_at: subscription.ended_at
                ? new Date(subscription.ended_at * 1000).toISOString()
                : null,
              p_trial_start: subscription.trial_start
                ? new Date(subscription.trial_start * 1000).toISOString()
                : null,
              p_trial_end: subscription.trial_end
                ? new Date(subscription.trial_end * 1000).toISOString()
                : null,
              p_metadata: subscription.metadata,
            }
          );

          if (error) {
            logger.error('Error upserting subscription:', error);
          } else {
            logger.info(
              `✅ Store subscription ${event.type}: ${subscription.id}`
            );
          }
        } catch (err: any) {
          logger.error(
            'Error processing subscription event:',
            err instanceof Error ? err : new Error(String(err))
          );
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;

      if (subscription.metadata?.user_id) {
        try {
          const userId = subscription.metadata.user_id;
          const priceId = subscription.items.data[0]?.price.id;

          if (!priceId) {
            logger.error('No price ID in subscription');
            break;
          }

          // Mark subscription as canceled
          const { error } = await supabase.rpc('upsert_store_subscription', {
            p_user_id: userId,
            p_stripe_subscription_id: subscription.id,
            p_stripe_customer_id: subscription.customer as string,
            p_stripe_price_id: priceId,
            p_status: 'canceled',
            p_cancel_at_period_end: false,
            p_current_period_start: new Date(
              (subscription as any).current_period_start * 1000
            ).toISOString(),
            p_current_period_end: new Date(
              (subscription as any).current_period_end * 1000
            ).toISOString(),
            p_canceled_at: subscription.canceled_at
              ? new Date(subscription.canceled_at * 1000).toISOString()
              : null,
            p_ended_at: new Date().toISOString(),
            p_trial_start: subscription.trial_start
              ? new Date(subscription.trial_start * 1000).toISOString()
              : null,
            p_trial_end: subscription.trial_end
              ? new Date(subscription.trial_end * 1000).toISOString()
              : null,
            p_metadata: subscription.metadata,
          });

          if (error) {
            logger.error('Error canceling subscription:', error);
          } else {
            logger.info(`✅ Store subscription canceled: ${subscription.id}`);
          }
        } catch (err: any) {
          logger.error(
            'Error processing subscription deletion:',
            err instanceof Error ? err : new Error(String(err))
          );
        }
      }
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;

      // Log successful subscription payment
      if ((invoice as any).subscription) {
        logger.info(
          `✅ Subscription payment succeeded: ${(invoice as any).subscription}`
        );
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;

      // Handle failed subscription payment
      if ((invoice as any).subscription) {
        logger.error(
          `❌ Subscription payment failed: ${(invoice as any).subscription}`
        );

        // Subscription status will be updated by customer.subscription.updated event
        // Could send notification email here
      }
      break;
    }

    default:
      logger.info(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
