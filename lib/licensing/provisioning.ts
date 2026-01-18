/**
 * License Provisioning System
 * Handles automatic setup when a license is purchased
 */

import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export interface ProvisioningParams {
  licenseType: 'basic' | 'professional' | 'enterprise';
  companyName: string;
  adminEmail: string;
  companyDomain?: string;
  stripeCustomerId: string;
  stripeSubscriptionId?: string;
  paymentType: 'one_time' | 'subscription';
}

export interface ProvisioningResult {
  success: boolean;
  tenantId?: string;
  apiKey?: string;
  apiSecret?: string;
  adminPassword?: string;
  error?: string;
}

/**
 * Generate secure API credentials
 */
export function generateApiCredentials(): { apiKey: string; apiSecret: string } {
  const apiKey = `efh_live_${crypto.randomBytes(20).toString('hex')}`;
  const apiSecret = `efh_secret_${crypto.randomBytes(40).toString('hex')}`;
  return { apiKey, apiSecret };
}

/**
 * Generate tenant slug from company name
 */
function generateSlug(companyName: string): string {
  return companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

/**
 * Generate temporary password
 */
function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password + '!';
}

/**
 * Get license limits based on plan
 */
function getLicenseLimits(licenseType: string) {
  const plans: Record<string, any> = {
    basic: {
      max_users: 10,
      max_students: 100,
      max_programs: 5,
      features: {
        ai_features: false,
        white_label: false,
        custom_domain: false,
        api_access: true,
        advanced_reporting: false,
        bulk_operations: false,
        sso: false,
        priority_support: false,
      },
    },
    professional: {
      max_users: 50,
      max_students: 1000,
      max_programs: 25,
      features: {
        ai_features: true,
        white_label: true,
        custom_domain: true,
        api_access: true,
        advanced_reporting: true,
        bulk_operations: true,
        sso: false,
        priority_support: false,
      },
    },
    enterprise: {
      max_users: null, // Unlimited
      max_students: null,
      max_programs: null,
      features: {
        ai_features: true,
        white_label: true,
        custom_domain: true,
        api_access: true,
        advanced_reporting: true,
        bulk_operations: true,
        sso: true,
        priority_support: true,
      },
    },
  };
  return plans[licenseType] || plans.basic;
}

/**
 * Provision a new license - called after successful payment
 */
export async function provisionLicense(params: ProvisioningParams): Promise<ProvisioningResult> {
  const supabase = await createClient();
  
  try {
    // Generate all credentials
    const tenantId = crypto.randomUUID();
    const { apiKey, apiSecret } = generateApiCredentials();
    const adminPassword = generateTempPassword();
    const slug = generateSlug(params.companyName);
    const limits = getLicenseLimits(params.licenseType);

    // Calculate expiration
    const expiresAt = params.paymentType === 'one_time'
      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
      : null; // Subscription - no fixed expiration

    // 1. Create tenant
    const { error: tenantError } = await supabase.from('tenants').insert({
      id: tenantId,
      name: params.companyName,
      slug,
      domain: params.companyDomain || null,
      primary_color: '#2563eb',
      secondary_color: '#1e40af',
      accent_color: '#f97316',
      active: true,
      created_at: new Date().toISOString(),
    });

    if (tenantError) throw new Error(`Tenant creation failed: ${tenantError.message}`);

    // 2. Create license
    const { error: licenseError } = await supabase.from('licenses').insert({
      id: crypto.randomUUID(),
      tenant_id: tenantId,
      plan: params.licenseType,
      status: 'active',
      api_key: apiKey,
      api_secret_hash: crypto.createHash('sha256').update(apiSecret).digest('hex'),
      stripe_customer_id: params.stripeCustomerId,
      stripe_subscription_id: params.stripeSubscriptionId || null,
      started_at: new Date().toISOString(),
      expires_at: expiresAt,
      max_users: limits.max_users,
      max_students: limits.max_students,
      max_programs: limits.max_programs,
      features: limits.features,
      created_at: new Date().toISOString(),
    });

    if (licenseError) throw new Error(`License creation failed: ${licenseError.message}`);

    // 3. Create admin user
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: params.adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: `${params.companyName} Admin`,
        tenant_id: tenantId,
        role: 'admin',
      },
    });

    if (authError) {
      console.error('Admin user creation failed:', authError);
      // Continue anyway - they can use password reset
    }

    // 4. Create admin profile
    if (authUser?.user) {
      await supabase.from('profiles').insert({
        id: authUser.user.id,
        email: params.adminEmail,
        full_name: `${params.companyName} Admin`,
        role: 'admin',
        tenant_id: tenantId,
        created_at: new Date().toISOString(),
      });
    }

    // 5. Send welcome email with credentials
    await sendProvisioningEmail({
      email: params.adminEmail,
      companyName: params.companyName,
      tenantId,
      apiKey,
      apiSecret,
      adminPassword,
      licenseType: params.licenseType,
    });

    // 6. Log the provisioning
    await supabase.from('audit_logs').insert({
      action: 'license_provisioned',
      entity_type: 'license',
      entity_id: tenantId,
      details: {
        company_name: params.companyName,
        license_type: params.licenseType,
        admin_email: params.adminEmail,
      },
      created_at: new Date().toISOString(),
    });

    return {
      success: true,
      tenantId,
      apiKey,
      apiSecret,
      adminPassword,
    };

  } catch (error) {
    console.error('License provisioning failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Provisioning failed',
    };
  }
}

/**
 * Suspend a license (non-payment, violation, etc.)
 */
export async function suspendLicense(tenantId: string, reason: string): Promise<boolean> {
  const supabase = await createClient();

  try {
    // Update license status
    await supabase
      .from('licenses')
      .update({
        status: 'suspended',
        suspended_at: new Date().toISOString(),
        suspended_reason: reason,
      })
      .eq('tenant_id', tenantId);

    // Deactivate tenant
    await supabase
      .from('tenants')
      .update({ active: false })
      .eq('id', tenantId);

    // Get admin email for notification
    const { data: license } = await supabase
      .from('licenses')
      .select('stripe_customer_id')
      .eq('tenant_id', tenantId)
      .single();

    if (license?.stripe_customer_id) {
      const customer = await stripe.customers.retrieve(license.stripe_customer_id);
      if ('email' in customer && customer.email) {
        await sendSuspensionEmail(customer.email, reason);
      }
    }

    return true;
  } catch (error) {
    console.error('License suspension failed:', error);
    return false;
  }
}

/**
 * Reactivate a suspended license
 */
export async function reactivateLicense(tenantId: string): Promise<boolean> {
  const supabase = await createClient();

  try {
    await supabase
      .from('licenses')
      .update({
        status: 'active',
        suspended_at: null,
        suspended_reason: null,
      })
      .eq('tenant_id', tenantId);

    await supabase
      .from('tenants')
      .update({ active: true })
      .eq('id', tenantId);

    return true;
  } catch (error) {
    console.error('License reactivation failed:', error);
    return false;
  }
}

/**
 * Check subscription status and enforce
 */
export async function enforceSubscriptionStatus(subscriptionId: string): Promise<void> {
  const supabase = await createClient();

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    // Find the license
    const { data: license } = await supabase
      .from('licenses')
      .select('tenant_id, status')
      .eq('stripe_subscription_id', subscriptionId)
      .single();

    if (!license) return;

    // Check status
    if (['past_due', 'unpaid', 'canceled'].includes(subscription.status)) {
      if (license.status === 'active') {
        await suspendLicense(license.tenant_id, `Subscription ${subscription.status}`);
      }
    } else if (subscription.status === 'active' && license.status === 'suspended') {
      await reactivateLicense(license.tenant_id);
    }
  } catch (error) {
    console.error('Subscription enforcement failed:', error);
  }
}

/**
 * Rotate API credentials
 */
export async function rotateApiCredentials(tenantId: string): Promise<{ apiKey: string; apiSecret: string } | null> {
  const supabase = await createClient();
  const { apiKey, apiSecret } = generateApiCredentials();

  try {
    await supabase
      .from('licenses')
      .update({
        api_key: apiKey,
        api_secret_hash: crypto.createHash('sha256').update(apiSecret).digest('hex'),
        api_key_rotated_at: new Date().toISOString(),
      })
      .eq('tenant_id', tenantId);

    return { apiKey, apiSecret };
  } catch (error) {
    console.error('API credential rotation failed:', error);
    return null;
  }
}

// Email helpers
async function sendProvisioningEmail(params: {
  email: string;
  companyName: string;
  tenantId: string;
  apiKey: string;
  apiSecret: string;
  adminPassword: string;
  licenseType: string;
}): Promise<void> {
  try {
    const { sendEmail } = await import('@/lib/email/resend');
    
    await sendEmail({
      to: params.email,
      subject: `🎉 Your Elevate LMS License is Ready - ${params.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to Elevate LMS!</h1>
          <p>Your <strong>${params.licenseType}</strong> license for <strong>${params.companyName}</strong> is now active.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">🔐 Admin Login Credentials</h2>
            <p><strong>Email:</strong> ${params.email}</p>
            <p><strong>Temporary Password:</strong> <code style="background: #e5e7eb; padding: 2px 6px; border-radius: 4px;">${params.adminPassword}</code></p>
            <p><strong>Login URL:</strong> <a href="https://www.elevateforhumanity.org/login">https://www.elevateforhumanity.org/login</a></p>
            <p style="color: #dc2626; font-size: 14px;">⚠️ Please change your password after first login.</p>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">🔑 API Credentials (Save Securely!)</h2>
            <p>Use these for integrations and data import:</p>
            <p><strong>Tenant ID:</strong> <code style="background: #fde68a; padding: 2px 6px; border-radius: 4px;">${params.tenantId}</code></p>
            <p><strong>API Key:</strong> <code style="background: #fde68a; padding: 2px 6px; border-radius: 4px;">${params.apiKey}</code></p>
            <p><strong>API Secret:</strong> <code style="background: #fde68a; padding: 2px 6px; border-radius: 4px;">${params.apiSecret}</code></p>
            <p style="color: #dc2626; font-size: 14px;">⚠️ The API Secret is only shown once. Store it in a secure location.</p>
          </div>
          
          <h2>📥 Data Import Options</h2>
          <p>Import your existing data using any of these methods:</p>
          <ul>
            <li><strong>CSV Upload:</strong> Bulk import students, courses, and enrollments via the admin dashboard</li>
            <li><strong>API Integration:</strong> Use our REST API to sync data from your existing systems</li>
            <li><strong>Manual Entry:</strong> Add records directly through the admin interface</li>
          </ul>
          
          <h2>🎨 Customize Your Platform</h2>
          <ul>
            <li>Upload your logo and set brand colors</li>
            <li>Configure your custom domain (if included in your plan)</li>
            <li>Set up email templates with your branding</li>
          </ul>
          
          <h2>📚 API Documentation</h2>
          <p>Full API docs available at: <a href="https://www.elevateforhumanity.org/docs/api">https://www.elevateforhumanity.org/docs/api</a></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="color: #6b7280; font-size: 14px;">
            Need help? Contact us at <a href="mailto:support@elevateforhumanity.org">support@elevateforhumanity.org</a> or call (317) 314-3757
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send provisioning email:', error);
  }
}

async function sendSuspensionEmail(email: string, reason: string): Promise<void> {
  try {
    const { sendEmail } = await import('@/lib/email/resend');
    
    await sendEmail({
      to: email,
      subject: '⚠️ Action Required: Your Elevate LMS License Has Been Suspended',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">License Suspended</h1>
          <p>Your Elevate LMS license has been suspended.</p>
          
          <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
            <p><strong>Reason:</strong> ${reason}</p>
          </div>
          
          <h2>What This Means</h2>
          <ul>
            <li>Your students and staff cannot access the platform</li>
            <li>API access is disabled</li>
            <li>Your data is preserved and will be restored when reactivated</li>
          </ul>
          
          <h2>To Reactivate</h2>
          <p>Please update your payment method:</p>
          <p><a href="https://www.elevateforhumanity.org/account/billing" style="background: #2563eb; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">Update Payment Method</a></p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            Questions? Contact support@elevateforhumanity.org or call (317) 314-3757
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Failed to send suspension email:', error);
  }
}
