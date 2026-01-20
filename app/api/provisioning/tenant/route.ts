import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * POST /api/provisioning/tenant
 * 
 * Provisions a new white-label tenant:
 * 1. Creates organization record
 * 2. Creates license record
 * 3. Sets up subdomain routing
 * 4. Sends welcome email
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin or webhook secret
    const authHeader = request.headers.get('authorization');
    const webhookSecret = request.headers.get('x-webhook-secret');
    
    if (webhookSecret !== process.env.PROVISIONING_WEBHOOK_SECRET) {
      // TODO: Add proper admin auth check
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      organizationName,
      organizationType,
      contactName,
      contactEmail,
      contactPhone,
      planId,
      subdomain,
      customDomain,
      stripeCustomerId,
      stripeSubscriptionId,
    } = body;

    // Validate required fields
    if (!organizationName || !contactEmail || !planId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate subdomain if not provided
    const tenantSubdomain = subdomain || 
      organizationName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30);

    // Check if subdomain is taken
    const { data: existing } = await supabase
      .from('organizations')
      .select('id')
      .eq('slug', tenantSubdomain)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Subdomain already taken' },
        { status: 409 }
      );
    }

    // Create organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({
        name: organizationName,
        slug: tenantSubdomain,
        type: organizationType || 'training_provider',
        status: 'active',
        contact_name: contactName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        domain: customDomain || `${tenantSubdomain}.elevatelms.com`,
      })
      .select()
      .single();

    if (orgError) {
      console.error('Org creation error:', orgError);
      return NextResponse.json(
        { error: 'Failed to create organization' },
        { status: 500 }
      );
    }

    // Create license
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    const { data: license, error: licenseError } = await supabase
      .from('licenses')
      .insert({
        organization_id: org.id,
        status: stripeSubscriptionId ? 'active' : 'trial',
        plan_id: planId,
        trial_started_at: new Date().toISOString(),
        trial_ends_at: trialEndsAt.toISOString(),
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
      })
      .select()
      .single();

    if (licenseError) {
      console.error('License creation error:', licenseError);
      // Rollback org creation
      await supabase.from('organizations').delete().eq('id', org.id);
      return NextResponse.json(
        { error: 'Failed to create license' },
        { status: 500 }
      );
    }

    // Log provisioning event
    await supabase.from('license_events').insert({
      license_id: license.id,
      organization_id: org.id,
      event_type: 'tenant_provisioned',
      event_data: {
        plan_id: planId,
        subdomain: tenantSubdomain,
        custom_domain: customDomain,
      },
    });

    // TODO: Send welcome email via Resend
    // TODO: Set up DNS for custom domain if provided

    return NextResponse.json({
      success: true,
      tenant: {
        id: org.id,
        name: org.name,
        subdomain: tenantSubdomain,
        domain: org.domain,
        dashboardUrl: `https://${tenantSubdomain}.elevatelms.com/admin`,
      },
      license: {
        id: license.id,
        status: license.status,
        planId: license.plan_id,
        trialEndsAt: license.trial_ends_at,
      },
    });
  } catch (error) {
    console.error('Provisioning error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/provisioning/tenant?subdomain=xxx
 * 
 * Check if subdomain is available
 */
export async function GET(request: NextRequest) {
  const subdomain = request.nextUrl.searchParams.get('subdomain');
  
  if (!subdomain) {
    return NextResponse.json({ error: 'Subdomain required' }, { status: 400 });
  }

  const normalized = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  
  // Reserved subdomains
  const reserved = ['www', 'app', 'api', 'admin', 'dashboard', 'mail', 'support', 'help', 'docs'];
  if (reserved.includes(normalized)) {
    return NextResponse.json({ available: false, reason: 'Reserved' });
  }

  const { data } = await supabase
    .from('organizations')
    .select('id')
    .eq('slug', normalized)
    .single();

  return NextResponse.json({ 
    available: !data,
    subdomain: normalized,
    domain: `${normalized}.elevatelms.com`,
  });
}
