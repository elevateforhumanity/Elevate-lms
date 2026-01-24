import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import Stripe from 'stripe';

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function getWebhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET_LICENSES || process.env.STRIPE_WEBHOOK_SECRET || '';
}

/**
 * POST /api/licenses/webhook
 * 
 * Handles Stripe webhook events for license purchases:
 * - checkout.session.completed: Activate license after successful payment
 * - customer.subscription.updated: Update license status
 * - customer.subscription.deleted: Deactivate license
 * - invoice.paid: Record payment, extend license
 * - invoice.payment_failed: Mark license as past_due
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const stripe = getStripe();
  const webhookSecret = getWebhookSecret();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('License webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createAdminClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Check if this is a license purchase
        const licenseType = session.metadata?.license_type;
        const organizationId = session.metadata?.organization_id;
        const planId = session.metadata?.plan_id;
        
        if (!licenseType || !planId) {
          // Not a license purchase, skip
          break;
        }

        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        // Generate license key
        const licenseKey = generateLicenseKey(planId);

        // Get or create organization
        let orgId = organizationId;
        if (!orgId && session.customer_details?.email) {
          const { data: existingOrg } = await supabase
            .from('organizations')
            .select('id')
            .eq('contact_email', session.customer_details.email)
            .single();

          if (existingOrg) {
            orgId = existingOrg.id;
          } else {
            const { data: newOrg } = await supabase
              .from('organizations')
              .insert({
                name: session.customer_details.name || session.customer_details.email.split('@')[0],
                type: 'training_provider',
                contact_name: session.customer_details.name || 'Account Owner',
                contact_email: session.customer_details.email,
              })
              .select('id')
              .single();
            
            orgId = newOrg?.id;
          }
        }

        if (!orgId) {
          console.error('Could not determine organization for license');
          break;
        }

        // Create or update license
        const { data: license, error: licenseError } = await supabase
          .from('licenses')
          .upsert({
            organization_id: orgId,
            status: 'active',
            plan_id: planId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            current_period_start: new Date().toISOString(),
            current_period_end: getNextBillingDate(planId),
            last_payment_status: 'paid',
          }, {
            onConflict: 'organization_id',
          })
          .select()
          .single();

        if (licenseError) {
          console.error('Failed to create license:', licenseError);
          break;
        }

        // Set usage limits based on plan
        const limits = getPlanLimits(planId);
        await supabase
          .from('license_usage')
          .upsert({
            license_id: license.id,
            student_limit: limits.students,
            admin_limit: limits.admins,
            program_limit: limits.programs,
            student_count: 0,
            admin_count: 0,
            program_count: 0,
          }, {
            onConflict: 'license_id',
          });

        // Store license key
        await supabase
          .from('license_keys')
          .insert({
            license_id: license.id,
            key: licenseKey,
            status: 'active',
          });

        // Send activation email (via existing email system)
        await supabase.from('email_queue').insert({
          to: session.customer_details?.email,
          template: 'license_activated',
          data: {
            license_key: licenseKey,
            plan_name: getPlanName(planId),
            organization_name: session.customer_details?.name,
          },
        }).catch(() => {
          // Email queue may not exist
        });

        console.log(`License activated: ${license.id} for org ${orgId}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update license status based on subscription status
        const status = mapSubscriptionStatus(subscription.status);
        
        await supabase
          .from('licenses')
          .update({
            status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        console.log(`License updated: subscription ${subscription.id} -> ${status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        await supabase
          .from('licenses')
          .update({
            status: 'canceled',
            canceled_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        console.log(`License canceled: subscription ${subscription.id}`);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        if (!subscriptionId) break;

        await supabase
          .from('licenses')
          .update({
            status: 'active',
            last_payment_status: 'paid',
            last_invoice_url: invoice.hosted_invoice_url,
            current_period_end: new Date(invoice.period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscriptionId);

        // Record payment
        await supabase.from('license_payments').insert({
          stripe_subscription_id: subscriptionId,
          stripe_invoice_id: invoice.id,
          amount: (invoice.amount_paid || 0) / 100,
          currency: invoice.currency,
          status: 'paid',
          invoice_url: invoice.hosted_invoice_url,
          paid_at: new Date().toISOString(),
        }).catch(() => {
          // Table may not exist
        });

        console.log(`License payment recorded: invoice ${invoice.id}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoice.subscription as string;

        if (!subscriptionId) break;

        await supabase
          .from('licenses')
          .update({
            status: 'past_due',
            last_payment_status: 'failed',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscriptionId);

        console.log(`License payment failed: invoice ${invoice.id}`);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('License webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Helper functions

function generateLicenseKey(planId: string): string {
  const prefix = planId.toUpperCase().slice(0, 3);
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `EFH-${prefix}-${timestamp}-${random}`;
}

function getPlanLimits(planId: string): { students: number; admins: number; programs: number } {
  const limits: Record<string, { students: number; admins: number; programs: number }> = {
    'starter': { students: 50, admins: 2, programs: 5 },
    'pro': { students: 200, admins: 10, programs: 25 },
    'enterprise': { students: -1, admins: -1, programs: -1 }, // -1 = unlimited
    'clone-starter': { students: 100, admins: 5, programs: 10 },
    'clone-pro': { students: 500, admins: 25, programs: 50 },
    'clone-enterprise': { students: -1, admins: -1, programs: -1 },
  };
  return limits[planId] || limits['starter'];
}

function getPlanName(planId: string): string {
  const names: Record<string, string> = {
    'starter': 'Starter License',
    'pro': 'Pro License',
    'enterprise': 'Enterprise License',
    'clone-starter': 'LMS Clone - Starter',
    'clone-pro': 'LMS Clone - Pro',
    'clone-enterprise': 'LMS Clone - Enterprise',
  };
  return names[planId] || 'License';
}

function getNextBillingDate(planId: string): string {
  const now = new Date();
  // Most licenses are annual
  now.setFullYear(now.getFullYear() + 1);
  return now.toISOString();
}

function mapSubscriptionStatus(stripeStatus: string): string {
  const statusMap: Record<string, string> = {
    'active': 'active',
    'past_due': 'past_due',
    'canceled': 'canceled',
    'unpaid': 'suspended',
    'incomplete': 'pending',
    'incomplete_expired': 'canceled',
    'trialing': 'trial',
    'paused': 'suspended',
  };
  return statusMap[stripeStatus] || 'active';
}
