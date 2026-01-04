import { createClient } from '@/lib/supabase/server';

export type LicensePlan = 'trial' | 'basic' | 'professional' | 'enterprise';
export type LicenseStatus = 'active' | 'suspended' | 'expired' | 'cancelled';

export interface License {
  id: string;
  tenant_id: string;
  plan: LicensePlan;
  status: LicenseStatus;
  started_at: string;
  expires_at: string | null;
  trial_ends_at: string | null;
  max_users: number | null;
  max_programs: number | null;
  max_students: number | null;
  features: {
    ai_features: boolean;
    white_label: boolean;
    custom_domain: boolean;
    api_access: boolean;
    advanced_reporting: boolean;
    bulk_operations: boolean;
    sso: boolean;
    priority_support: boolean;
  };
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain: string | null;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  active: boolean;
}

export async function getTenantLicense(tenantId: string): Promise<License | null> {
  const supabase = await createClient();

  const { data, error }: any = await supabase
    .from('licenses')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;
  return data as License;
}

export async function isFeatureEnabled(tenantId: string, feature: keyof License['features']): Promise<boolean> {
  const license = await getTenantLicense(tenantId);
  if (!license) return false;
  return license.features[feature] === true;
}

export async function isLicenseValid(tenantId: string): Promise<boolean> {
  const license = await getTenantLicense(tenantId);
  if (!license) return false;

  if (license.status !== 'active') return false;

  if (license.expires_at) {
    const expiresAt = new Date(license.expires_at);
    if (expiresAt < new Date()) return false;
  }

  return true;
}

export async function getUserTenant(userId: string): Promise<Tenant | null> {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('tenant_id')
    .eq('id', userId)
    .single();

  if (!profile?.tenant_id) return null;

  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', profile.tenant_id)
    .single();

  return tenant as Tenant | null;
}

export async function checkUsageLimits(tenantId: string): Promise<{
  users: { current: number; max: number | null; exceeded: boolean };
  programs: { current: number; max: number | null; exceeded: boolean };
  students: { current: number; max: number | null; exceeded: boolean };
}> {
  const supabase = await createClient();
  const license = await getTenantLicense(tenantId);

  const { count: userCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('tenant_id', tenantId);

  const { count: studentCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('tenant_id', tenantId)
    .eq('role', 'student');

  return {
    users: {
      current: userCount || 0,
      max: license?.max_users || null,
      exceeded: license?.max_users ? (userCount || 0) >= license.max_users : false,
    },
    programs: {
      current: 0,
      max: license?.max_programs || null,
      exceeded: false,
    },
    students: {
      current: studentCount || 0,
      max: license?.max_students || null,
      exceeded: license?.max_students ? (studentCount || 0) >= license.max_students : false,
    },
  };
}

export async function requireFeature(tenantId: string, feature: keyof License['features']): Promise<void> {
  const enabled = await isFeatureEnabled(tenantId, feature);
  if (!enabled) {
    throw new Error(`Feature '${feature}' is not enabled for this tenant`);
  }
}

export async function requireValidLicense(tenantId: string): Promise<void> {
  const valid = await isLicenseValid(tenantId);
  if (!valid) {
    throw new Error('License is not valid or has expired');
  }
}
