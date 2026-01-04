import * as crypto from 'node:crypto';

/**
 * Generate a unique license key
 */
export function generateLicenseKey(): string {
  const segments = [];
  for (let i = 0; i < 4; i++) {
    const segment = crypto.randomBytes(4).toString('hex').toUpperCase();
    segments.push(segment);
  }
  return segments.join('-');
}

/**
 * Validate license key format
 */
export function isValidLicenseKeyFormat(key: string): boolean {
  const pattern = /^[A-F0-9]{8}-[A-F0-9]{8}-[A-F0-9]{8}-[A-F0-9]{8}$/;
  return pattern.test(key);
}

/**
 * Hash license key for storage
 */
export function hashLicenseKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}

/**
 * Verify license key against hash
 */
export function verifyLicenseKey(key: string, hash: string): boolean {
  return hashLicenseKey(key) === hash;
}

/**
 * Generate license metadata
 */
export function generateLicenseMetadata(email: string, productId: string) {
  return {
    email,
    productId,
    issuedAt: new Date().toISOString(),
    expiresAt: null, // null = lifetime license
    maxActivations: 1,
    activations: 0,
  };
}
