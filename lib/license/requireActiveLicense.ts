import { LicenseStatus } from '@/lib/billing/getLicenseStatus';

/**
 * Require active license for admin/creation features
 * Never blocks student learning
 */
export function requireActiveLicense(status: LicenseStatus): void {
  if (status !== 'active' && status !== 'grace') {
    throw new Error(
      'License inactive. Please update your billing information to continue.'
    );
  }
}

/**
 * Check if license allows admin operations
 */
export function canPerformAdminAction(status: LicenseStatus): boolean {
  return status === 'active' || status === 'grace';
}

/**
 * Get user-friendly license message
 */
export function getLicenseMessage(status: LicenseStatus): string {
  switch (status) {
    case 'active':
      return 'License active';
    case 'grace':
      return 'Payment past due - grace period active';
    case 'restricted':
      return 'License restricted - please update billing';
    case 'inactive':
      return 'No active license - please subscribe';
    default:
      return 'Unknown license status';
  }
}
