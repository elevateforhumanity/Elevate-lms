import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 60;
import { logger } from '@/lib/logger';
import { toErrorMessage } from '@/lib/safe';
import * as crypto from 'node:crypto';

// Generate license key
function generateLicenseKey(): string {
  return `EFH-${crypto.randomBytes(8).toString('hex').toUpperCase()}-${crypto.randomBytes(8).toString('hex').toUpperCase()}`;
}

// Determine tier and features from product
function getProductTier(productSlug: string): {
  tier: 'starter' | 'business' | 'enterprise';
  features: string[];
  maxDeployments: number;
  maxUsers: number;
  duration: number; // days
} {
  const tiers = {
    'starter-license': {
      tier: 'starter' as const,
      features: ['basic_lms', 'single_deployment', 'email_support'],
      maxDeployments: 1,
      maxUsers: 50,
      duration: 365,
    },
    'school-license': {
      tier: 'business' as const,
      features: [
        'complete_lms',
        'payment_integration',
        'white_label',
        'priority_support',
      ],
      maxDeployments: 3,
      maxUsers: 500,
      duration: 365,
    },
    'agency-license': {
      tier: 'business' as const,
      features: [
        'complete_lms',
        'payment_integration',
        'white_label',
        'api_access',
      ],
      maxDeployments: 5,
      maxUsers: 1000,
      duration: 365,
    },
    'enterprise-license': {
      tier: 'enterprise' as const,
      features: [
        'complete_lms',
        'payment_integration',
        'white_label',
        'api_access',
        'custom_development',
        'dedicated_support',
      ],
      maxDeployments: 999,
      maxUsers: 999999,
      duration: 365,
    },
  };

  return tiers[productSlug as keyof typeof tiers] || tiers['starter-license'];
}

export async function POST(req: Request) {
  try {
    const { email, productSlug, domain } = await req.json();

    if (!email || !productSlug) {
      return Response.json(
        { error: 'Email and productSlug required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get product configuration
    const config = getProductTier(productSlug);

    // Generate license key
    const licenseKey = generateLicenseKey();

    // Calculate expiration
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + config.duration);

    // Store license
    const { data: license, error: licenseError } = await supabase
      .from('licenses')
      .insert({
        license_key: licenseKey,
        domain: domain || 'pending-setup',
        customer_email: email,
        tier: config.tier,
        status: 'active',
        features: config.features,
        max_deployments: config.maxDeployments,
        max_users: config.maxUsers,
        expires_at: expiresAt.toISOString(),
        metadata: {
          product_slug: productSlug,
          purchased_at: new Date().toISOString(),
        },
      })
      .select()
      .single();

    if (licenseError) {
      logger.error('Failed to store license:', licenseError);
      return Response.json(
        { error: 'Failed to generate license' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      licenseKey, // Only return once, should be emailed to customer
      licenseId: license.id,
      tier: config.tier,
      expiresAt: expiresAt.toISOString(),
      features: config.features,
    });
  } catch (error: unknown) {
    logger.error(
      'License generation error:',
      error instanceof Error ? error : new Error(String(error))
    );
    return Response.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
