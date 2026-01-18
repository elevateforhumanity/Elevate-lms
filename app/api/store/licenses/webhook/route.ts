export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe/client';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { headers } from 'next/headers';
import { Resend } from 'resend';
import { generateLicenseKey, hashLicenseKey } from '@/lib/store/license';
import { generateLicenseWelcomeEmail } from '@/lib/email-templates/license-welcome';
import { logger } from '@/lib/logger';

const resend = new Resend(process.env.RESEND_API_KEY);

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
          const adminSupabase = createAdminClient();
          
          // Create tenant
          const { data: tenant } = await adminSupabase
            .from('tenants')
            .insert({
              name: purchase.organization_name,
              slug: generateSlug(purchase.organization_name),
              status: 'active',
            })
            .select()
            .single();

          if (tenant) {
            // Generate license key
            const licenseKey = generateLicenseKey();
            const licenseKeyHash = hashLicenseKey(licenseKey);
            
            // Create license
            const validUntil = new Date();
            validUntil.setFullYear(validUntil.getFullYear() + 1); // 1 year

            const features = getFeatures(purchase.license_type);
            const maxUsers = getMaxUsers(purchase.license_type);
            const maxDeployments = getMaxDeployments(purchase.license_type);

            await adminSupabase.from('licenses').insert({
              license_key: licenseKeyHash,
              domain: 'pending-setup',
              customer_email: purchase.contact_email,
              tenant_id: tenant.id,
              tier: mapLicenseTypeToTier(purchase.license_type),
              status: 'active',
              max_users: maxUsers,
              max_deployments: maxDeployments,
              features: features,
              expires_at: validUntil.toISOString(),
              metadata: {
                product_slug: purchase.product_slug,
                organization_name: purchase.organization_name,
                purchased_at: new Date().toISOString(),
              },
            });

            // Update purchase with tenant_id
            await adminSupabase
              .from('license_purchases')
              .update({
                tenant_id: tenant.id,
                status: 'provisioned',
              })
              .eq('id', purchase.id);

            // Send comprehensive welcome email with license key
            try {
              const emailData = {
                organizationName: purchase.organization_name,
                contactName: purchase.contact_name,
                email: purchase.contact_email,
                licenseKey: licenseKey, // Send the actual key (only time it's sent)
                licenseType: purchase.license_type as 'single' | 'school' | 'enterprise',
                tier: mapLicenseTypeToTier(purchase.license_type),
                expiresAt: validUntil.toISOString(),
                features: features,
                repoUrl: getRepoUrl(purchase.license_type),
                maxDeployments: maxDeployments,
                maxUsers: maxUsers,
              };

              const { subject, html, text } = generateLicenseWelcomeEmail(emailData);

              await resend.emails.send({
                from: 'Elevate for Humanity <licenses@elevateforhumanity.org>',
                to: purchase.contact_email,
                subject,
                html,
                text,
              });

              logger.info('License welcome email sent', {
                email: purchase.contact_email,
                licenseType: purchase.license_type,
              });
            } catch (emailError) {
              // Log but don't fail - license is provisioned
              logger.error('Failed to send license welcome email', emailError as Error);
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

function getMaxDeployments(licenseType: string): number {
  switch (licenseType) {
    case 'single':
      return 1;
    case 'school':
      return 3;
    case 'enterprise':
      return 999; // Unlimited
    default:
      return 1;
  }
}

function getRepoUrl(licenseType: string): string {
  const repos: Record<string, string> = {
    single: 'https://github.com/elevateforhumanity/elevate-starter',
    school: 'https://github.com/elevateforhumanity/elevate-professional',
    enterprise: 'https://github.com/elevateforhumanity/elevate-enterprise',
  };
  return repos[licenseType] || repos.single;
}
