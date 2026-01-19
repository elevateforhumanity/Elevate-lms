import { NextResponse } from 'next/server';
import { getTenantContext, TenantContextError } from '@/lib/tenant';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

/**
 * STEP 5B: License Enforcement Middleware
 * 
 * Canonical license statuses:
 * - active: Full access
 * - suspended: Payment problem (refund/dispute)
 * - expired: Time-based expiry
 * - revoked: Admin action
 */

export type LicenseStatus = 'active' | 'suspended' | 'expired' | 'revoked';

export interface License {
  id: string;
  tenant_id: string;
  status: LicenseStatus;
  plan: string;
  expires_at: string | null;
  features: Record<string, boolean>;
  max_users: number | null;
  max_students: number | null;
  max_programs: number | null;
}

export class LicenseError extends Error {
  public statusCode: number;
  public licenseStatus: LicenseStatus | 'missing';
  
  constructor(message: string, statusCode: number, licenseStatus: LicenseStatus | 'missing') {
    super(message);
    this.name = 'LicenseError';
    this.statusCode = statusCode;
    this.licenseStatus = licenseStatus;
  }
}

/**
 * Get active license for tenant
 * Uses database function that auto-expires if needed
 */
export async function getActiveLicense(tenantId: string): Promise<License | null> {
  const supabase = await createClient();
  
  // Use the database function that handles expiry
  const { data, error } = await supabase
    .rpc('get_active_license', { p_tenant_id: tenantId });
  
  if (error) {
    logger.error('Failed to fetch license', error, { tenantId });
    return null;
  }
  
  return data as License | null;
}

/**
 * Validate license is active and not expired
 */
function validateLicense(license: License | null): void {
  if (!license) {
    throw new LicenseError(
      'No license found. Please purchase a license to continue.',
      402,
      'missing'
    );
  }
  
  if (license.status === 'suspended') {
    throw new LicenseError(
      'License suspended due to payment issue. Please resolve billing to restore access.',
      402,
      'suspended'
    );
  }
  
  if (license.status === 'expired') {
    throw new LicenseError(
      'License expired. Please renew to continue.',
      402,
      'expired'
    );
  }
  
  if (license.status === 'revoked') {
    throw new LicenseError(
      'License revoked. Please contact support.',
      403,
      'revoked'
    );
  }
  
  // Double-check expiry (belt and suspenders)
  if (license.expires_at && new Date(license.expires_at) < new Date()) {
    throw new LicenseError(
      'License expired. Please renew to continue.',
      402,
      'expired'
    );
  }
}

/**
 * STEP 5B: Require active license for route
 * 
 * Usage in API route:
 * ```
 * const license = await requireActiveLicense();
 * // Route continues only if license is active
 * ```
 */
export async function requireActiveLicense(): Promise<License> {
  const tenantContext = await getTenantContext();
  const license = await getActiveLicense(tenantContext.tenantId);
  
  validateLicense(license);
  
  return license!;
}

/**
 * Check license without throwing (returns null if invalid)
 */
export async function checkLicense(): Promise<License | null> {
  try {
    return await requireActiveLicense();
  } catch {
    return null;
  }
}

/**
 * Create error response for license errors
 */
export function licenseErrorResponse(error: LicenseError): NextResponse {
  return NextResponse.json(
    { 
      error: error.message,
      licenseStatus: error.licenseStatus,
      code: 'LICENSE_REQUIRED'
    },
    { status: error.statusCode }
  );
}

/**
 * Wrapper for API routes that require active license
 */
export function withActiveLicense<T>(
  handler: (license: License) => Promise<NextResponse>
): () => Promise<NextResponse> {
  return async () => {
    try {
      const license = await requireActiveLicense();
      return handler(license);
    } catch (error) {
      if (error instanceof LicenseError) {
        return licenseErrorResponse(error);
      }
      if (error instanceof TenantContextError) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode });
      }
      throw error;
    }
  };
}
