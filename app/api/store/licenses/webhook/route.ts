export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe/client';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { sendWelcomeEmail } from '@/lib/email';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Update license purchase status
        const { data: purchase } = await supabase
          .from('license_purchases')
          .update({ status: 'paid' })
          .eq('stripe_payment_intent_id', paymentIntent.id)
          .select()
          .single();

        if (purchase) {
          // Create tenant
          const { data: tenant } = await supabase
            .from('tenants')
            .insert({
              name: purchase.organization_name,
              slug: generateSlug(purchase.organization_name),
              status: 'active',
            })
            .select()
            .single();

          if (tenant) {
            // Create license
            const validUntil = new Date();
            validUntil.setFullYear(validUntil.getFullYear() + 1); // 1 year

            await supabase.from('licenses').insert({
              tenant_id: tenant.id,
              tier: mapLicenseTypeToTier(purchase.license_type),
              status: 'active',
              max_users: getMaxUsers(purchase.license_type),
              max_programs: getMaxPrograms(purchase.license_type),
              features: getFeatures(purchase.license_type),
              valid_from: new Date().toISOString(),
              valid_until: validUntil.toISOString(),
            });

            // Update purchase with tenant_id
            await supabase
              .from('license_purchases')
              .update({
                tenant_id: tenant.id,
                status: 'provisioned',
              })
              .eq('id', purchase.id);

            // Send welcome email
            try {
              await sendWelcomeEmail({
                to: purchase.email,
                tenantId: tenant.id,
                licenseType: purchase.license_type,
                validUntil: validUntil.toISOString(),
              });
            } catch (emailError) {
              // Don't fail the webhook - license is provisioned
            }
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        await supabase
          .from('license_purchases')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', paymentIntent.id);
        break;
      }

      default:
        // Unhandled event type
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error:
          (err instanceof Error ? err.message : String(err)) ||
          'Webhook handler failed',
      },
      { status: 500 }
    );
  }
}

// Helper functions
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function mapLicenseTypeToTier(licenseType: string): string {
  switch (licenseType) {
    case 'single':
      return 'basic';
    case 'school':
      return 'pro';
    case 'enterprise':
      return 'enterprise';
    default:
      return 'basic';
  }
}

function getMaxUsers(licenseType: string): number {
  switch (licenseType) {
    case 'single':
      return 100;
    case 'school':
      return 1000;
    case 'enterprise':
      return 999999; // Unlimited
    default:
      return 100;
  }
}

function getMaxPrograms(licenseType: string): number {
  switch (licenseType) {
    case 'single':
      return 10;
    case 'school':
      return 50;
    case 'enterprise':
      return 999999; // Unlimited
    default:
      return 10;
  }
}

function getFeatures(licenseType: string): string[] {
  const baseFeatures = ['lms', 'enrollment', 'admin', 'payments', 'mobile-app'];

  switch (licenseType) {
    case 'single':
      return baseFeatures;
    case 'school':
      return [
        ...baseFeatures,
        'partner-dashboard',
        'case-management',
        'compliance',
        'white-label',
      ];
    case 'enterprise':
      return [
        ...baseFeatures,
        'partner-dashboard',
        'case-management',
        'employer-portal',
        'compliance',
        'white-label',
        'ai-tutor',
        'api-access',
      ];
    default:
      return baseFeatures;
  }
}
