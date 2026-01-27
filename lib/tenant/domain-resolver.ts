import { createClient } from '@/lib/supabase/server';

export interface TenantFromDomain {
  organizationId: string;
  organizationName: string;
  licenseStatus: string | null;
}

/**
 * Resolve tenant from custom domain
 * Used by middleware to route requests to correct tenant context
 */
export async function resolveTenantFromDomain(domain: string): Promise<TenantFromDomain | null> {
  // Skip resolution for main domains
  const mainDomains = [
    'elevateforhumanity.org',
    'www.elevateforhumanity.org',
    'elevate317.netlify.app',
    'localhost',
  ];
  
  if (mainDomains.some(d => domain.includes(d))) {
    return null;
  }

  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .rpc('get_tenant_by_domain', { p_domain: domain })
      .single();

    if (error || !data) {
      return null;
    }

    return {
      organizationId: data.organization_id,
      organizationName: data.organization_name,
      licenseStatus: data.license_status,
    };
  } catch {
    return null;
  }
}

/**
 * Check if tenant license allows access
 */
export function isTenantLicenseActive(status: string | null): boolean {
  return status === 'active' || status === 'trial';
}

/**
 * Get suspension page URL for locked out tenants
 */
export function getSuspensionPageUrl(organizationId: string): string {
  return `/license-suspended?org=${organizationId}`;
}
