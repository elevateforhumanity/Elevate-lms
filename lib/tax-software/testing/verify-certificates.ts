/**
 * Certificate Verification Script
 * Verifies IRS MeF certificate setup for TEST and PRODUCTION environments
 * 
 * Usage: npx tsx lib/tax-software/testing/verify-certificates.ts
 */

import { CertificateHandler, verifyCertificateSetup, CERT_ENV_VARS } from '../mef/certificate-handler';

async function main() {
  console.log('='.repeat(60));
  console.log('IRS MeF Certificate Verification');
  console.log('='.repeat(60));
  console.log();

  // Check environment variables
  console.log('Environment Variables:');
  console.log('-'.repeat(40));
  
  for (const [env, vars] of Object.entries(CERT_ENV_VARS)) {
    console.log(`\n${env.toUpperCase()}:`);
    for (const [key, varName] of Object.entries(vars)) {
      const value = process.env[varName];
      const status = value ? '✓ Set' : '✗ Not set';
      console.log(`  ${varName}: ${status}`);
    }
  }

  console.log();
  console.log('Certificate Status:');
  console.log('-'.repeat(40));

  const status = await verifyCertificateSetup();

  // Test environment
  console.log('\nTEST Environment:');
  if (status.test.loaded) {
    console.log('  ✓ Certificates loaded successfully');
    if (status.test.info) {
      console.log(`  Fingerprint: ${status.test.info.fingerprint}`);
    }
  } else {
    console.log('  ✗ Certificates not loaded');
    console.log(`  Error: ${status.test.error}`);
  }

  // Production environment
  console.log('\nPRODUCTION Environment:');
  if (status.production.loaded) {
    console.log('  ✓ Certificates loaded successfully');
    if (status.production.info) {
      console.log(`  Fingerprint: ${status.production.info.fingerprint}`);
    }
  } else {
    console.log('  ✗ Certificates not loaded');
    console.log(`  Error: ${status.production.error}`);
  }

  console.log();
  console.log('='.repeat(60));

  // Print setup instructions if certificates are missing
  if (!status.test.loaded || !status.production.loaded) {
    console.log('\nSetup Instructions:');
    console.log(CertificateHandler.getSetupInstructions('test'));
  }

  // Exit with error if no certificates are loaded
  if (!status.test.loaded && !status.production.loaded) {
    process.exit(1);
  }
}

main().catch(console.error);
