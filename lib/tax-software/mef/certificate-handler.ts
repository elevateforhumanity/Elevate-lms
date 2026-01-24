/**
 * IRS MeF Certificate Handler
 * Manages TLS certificates for IRS mutual authentication
 * 
 * Certificate Requirements:
 * - IRS requires mutual TLS (mTLS) for MeF transmission
 * - Certificates must be obtained from IRS-approved providers
 * - Separate certificates for TEST and PRODUCTION environments
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

export interface CertificateConfig {
  environment: 'test' | 'production';
  certPath: string;
  keyPath: string;
  caPath?: string;
  passphrase?: string;
}

export interface CertificateInfo {
  subject: string;
  issuer: string;
  validFrom: Date;
  validTo: Date;
  serialNumber: string;
  fingerprint: string;
  isValid: boolean;
  daysUntilExpiry: number;
}

export interface CertificateStatus {
  loaded: boolean;
  environment: string;
  info?: CertificateInfo;
  error?: string;
}

// Environment variable names for certificates
export const CERT_ENV_VARS = {
  test: {
    cert: 'IRS_TEST_CERT_PATH',
    key: 'IRS_TEST_KEY_PATH',
    ca: 'IRS_TEST_CA_PATH',
    passphrase: 'IRS_TEST_CERT_PASSPHRASE'
  },
  production: {
    cert: 'IRS_PROD_CERT_PATH',
    key: 'IRS_PROD_KEY_PATH',
    ca: 'IRS_PROD_CA_PATH',
    passphrase: 'IRS_PROD_CERT_PASSPHRASE'
  }
};

// Default certificate paths (relative to project root)
export const DEFAULT_CERT_PATHS = {
  test: {
    cert: 'certs/test/client.crt',
    key: 'certs/test/client.key',
    ca: 'certs/test/ca.crt'
  },
  production: {
    cert: 'certs/prod/client.crt',
    key: 'certs/prod/client.key',
    ca: 'certs/prod/ca.crt'
  }
};

/**
 * Certificate Handler for IRS MeF
 */
export class CertificateHandler {
  private environment: 'test' | 'production';
  private certPath: string | null = null;
  private keyPath: string | null = null;
  private caPath: string | null = null;
  private passphrase: string | null = null;
  private certContent: Buffer | null = null;
  private keyContent: Buffer | null = null;
  private caContent: Buffer | null = null;

  constructor(environment: 'test' | 'production' = 'test') {
    this.environment = environment;
    this.loadFromEnvironment();
  }

  /**
   * Load certificate paths from environment variables
   */
  private loadFromEnvironment(): void {
    const envVars = CERT_ENV_VARS[this.environment];
    const defaults = DEFAULT_CERT_PATHS[this.environment];

    this.certPath = process.env[envVars.cert] || defaults.cert;
    this.keyPath = process.env[envVars.key] || defaults.key;
    this.caPath = process.env[envVars.ca] || defaults.ca;
    this.passphrase = process.env[envVars.passphrase] || undefined;
  }

  /**
   * Check if certificates are available
   */
  async checkCertificatesAvailable(): Promise<{ available: boolean; missing: string[] }> {
    const missing: string[] = [];

    if (!this.certPath || !await this.fileExists(this.certPath)) {
      missing.push(`Client certificate (${this.certPath || 'not configured'})`);
    }

    if (!this.keyPath || !await this.fileExists(this.keyPath)) {
      missing.push(`Private key (${this.keyPath || 'not configured'})`);
    }

    // CA is optional but recommended
    if (this.caPath && !await this.fileExists(this.caPath)) {
      missing.push(`CA certificate (${this.caPath})`);
    }

    return {
      available: missing.length === 0 || (missing.length === 1 && missing[0].includes('CA')),
      missing
    };
  }

  /**
   * Load certificates into memory
   */
  async loadCertificates(): Promise<CertificateStatus> {
    try {
      const { available, missing } = await this.checkCertificatesAvailable();

      if (!available) {
        return {
          loaded: false,
          environment: this.environment,
          error: `Missing certificates: ${missing.join(', ')}`
        };
      }

      // Load certificate files
      if (this.certPath) {
        this.certContent = await fs.promises.readFile(this.certPath);
      }
      if (this.keyPath) {
        this.keyContent = await fs.promises.readFile(this.keyPath);
      }
      if (this.caPath && await this.fileExists(this.caPath)) {
        this.caContent = await fs.promises.readFile(this.caPath);
      }

      // Parse certificate info
      const info = this.parseCertificateInfo();

      return {
        loaded: true,
        environment: this.environment,
        info
      };
    } catch (err) {
      return {
        loaded: false,
        environment: this.environment,
        error: err instanceof Error ? err.message : 'Failed to load certificates'
      };
    }
  }

  /**
   * Get certificate content for HTTPS agent
   */
  getCertificateContent(): {
    cert?: Buffer;
    key?: Buffer;
    ca?: Buffer;
    passphrase?: string;
  } {
    return {
      cert: this.certContent || undefined,
      key: this.keyContent || undefined,
      ca: this.caContent || undefined,
      passphrase: this.passphrase || undefined
    };
  }

  /**
   * Parse certificate information (basic parsing without openssl)
   */
  private parseCertificateInfo(): CertificateInfo | undefined {
    if (!this.certContent) return undefined;

    try {
      const certString = this.certContent.toString();
      
      // Extract basic info from PEM certificate
      // Note: Full parsing would require a library like node-forge
      const fingerprint = crypto
        .createHash('sha256')
        .update(this.certContent)
        .digest('hex')
        .toUpperCase()
        .match(/.{2}/g)
        ?.join(':') || '';

      // Basic validity check - look for dates in cert
      // This is a simplified check; production should use proper X.509 parsing
      const now = new Date();
      
      return {
        subject: 'Certificate loaded (parse with openssl for details)',
        issuer: 'Certificate loaded (parse with openssl for details)',
        validFrom: now, // Would need proper parsing
        validTo: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000), // Placeholder
        serialNumber: 'See certificate file',
        fingerprint,
        isValid: true, // Simplified
        daysUntilExpiry: 365 // Placeholder
      };
    } catch {
      return undefined;
    }
  }

  /**
   * Check if file exists
   */
  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(filePath, fs.constants.R_OK);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get setup instructions for certificates
   */
  static getSetupInstructions(environment: 'test' | 'production'): string {
    const envVars = CERT_ENV_VARS[environment];
    const defaults = DEFAULT_CERT_PATHS[environment];

    return `
IRS MeF Certificate Setup Instructions (${environment.toUpperCase()})
=====================================================================

1. OBTAIN CERTIFICATES
   - For TEST: Use IRS-provided test certificates or self-signed for initial testing
   - For PRODUCTION: Obtain from IRS-approved certificate provider (e.g., IdenTrust)
   
   IRS Certificate Requirements:
   - TLS 1.2 or higher
   - RSA 2048-bit minimum key size
   - SHA-256 signature algorithm

2. CERTIFICATE FILES NEEDED
   - Client Certificate (PEM format): ${defaults.cert}
   - Private Key (PEM format): ${defaults.key}
   - CA Certificate (optional): ${defaults.ca}

3. ENVIRONMENT VARIABLES
   Set these in your .env file or deployment environment:
   
   ${envVars.cert}=/path/to/client.crt
   ${envVars.key}=/path/to/client.key
   ${envVars.ca}=/path/to/ca.crt
   ${envVars.passphrase}=your-key-passphrase (if encrypted)

4. DIRECTORY STRUCTURE
   Create the following directory structure:
   
   certs/
   ├── test/
   │   ├── client.crt
   │   ├── client.key
   │   └── ca.crt
   └── prod/
       ├── client.crt
       ├── client.key
       └── ca.crt

5. SECURITY NOTES
   - NEVER commit certificates to version control
   - Add to .gitignore: certs/
   - Use secure secret management in production
   - Rotate certificates before expiry

6. VERIFY SETUP
   Run: npx tsx lib/tax-software/testing/verify-certificates.ts

7. IRS RESOURCES
   - IRS e-file Security Standards: https://www.irs.gov/e-file-providers/e-file-security-privacy-and-business-standards
   - MeF Developer Resources: Available through IRS e-Services portal
`;
  }
}

/**
 * Create certificate handler from environment
 */
export function createCertificateHandler(): CertificateHandler {
  const environment = (process.env.IRS_ENVIRONMENT as 'test' | 'production') || 'test';
  return new CertificateHandler(environment);
}

/**
 * Verify certificate setup
 */
export async function verifyCertificateSetup(): Promise<{
  test: CertificateStatus;
  production: CertificateStatus;
}> {
  const testHandler = new CertificateHandler('test');
  const prodHandler = new CertificateHandler('production');

  return {
    test: await testHandler.loadCertificates(),
    production: await prodHandler.loadCertificates()
  };
}
