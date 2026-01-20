/**
 * Licensing Mode Control
 * 
 * LICENSING_MODE=controlled - Only admin-generated checkout sessions allowed
 * LICENSING_MODE=open - Public checkout allowed (development only)
 */

export type LicensingMode = 'controlled' | 'open';

export function getLicensingMode(): LicensingMode {
  const mode = process.env.LICENSING_MODE;
  if (mode === 'controlled' || mode === 'open') {
    return mode;
  }
  // Default to controlled in production
  return process.env.NODE_ENV === 'production' ? 'controlled' : 'open';
}

export function isLicensingControlled(): boolean {
  return getLicensingMode() === 'controlled';
}

/**
 * Validate that a checkout request is authorized
 * In controlled mode, requires admin session or approved payment link
 */
export function validateCheckoutAuthorization(
  adminSessionId?: string,
  approvedLinkId?: string
): { authorized: boolean; reason?: string } {
  if (!isLicensingControlled()) {
    return { authorized: true };
  }

  if (adminSessionId) {
    // TODO: Validate admin session against database
    return { authorized: true };
  }

  if (approvedLinkId) {
    // TODO: Validate approved payment link
    return { authorized: true };
  }

  return {
    authorized: false,
    reason: 'Checkout requires admin authorization in controlled mode',
  };
}
