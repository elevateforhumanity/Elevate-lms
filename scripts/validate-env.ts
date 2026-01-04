#!/usr/bin/env tsx

/**
 * Environment Validation Script
 *
 * Validates all required environment variables are present and correctly formatted.
 * Run before deployment to catch configuration issues early.
 *
 * Usage:
 *   pnpm validate-env
 *   tsx scripts/validate-env.ts
 */

interface EnvVar {
  name: string;
  required: boolean;
  validator?: (value: string) => boolean;
  description: string;
}

const ENV_VARS: EnvVar[] = [
  // Supabase
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    required: true,
    validator: (v) => v.startsWith('https://') && v.includes('.supabase.co'),
    description: 'Supabase project URL',
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    required: true,
    validator: (v) => v.length > 100 && v.startsWith('eyJ'),
    description: 'Supabase anonymous key (JWT)',
  },
  {
    name: 'SUPABASE_SERVICE_ROLE_KEY',
    required: true,
    validator: (v) => v.length > 100 && v.startsWith('eyJ'),
    description: 'Supabase service role key (JWT)',
  },

  // Stripe
  {
    name: 'STRIPE_SECRET_KEY',
    required: true,
    validator: (v) => v.startsWith('sk_'),
    description: 'Stripe secret key',
  },
  {
    name: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    required: true,
    validator: (v) => v.startsWith('pk_'),
    description: 'Stripe publishable key',
  },
  {
    name: 'STRIPE_WEBHOOK_SECRET',
    required: true,
    validator: (v) => v.startsWith('whsec_'),
    description: 'Stripe webhook signing secret',
  },

  // Resend
  {
    name: 'RESEND_API_KEY',
    required: true,
    validator: (v) => v.startsWith('re_'),
    description: 'Resend API key for email delivery',
  },

  // Application
  {
    name: 'NEXT_PUBLIC_APP_URL',
    required: true,
    validator: (v) => v.startsWith('http://') || v.startsWith('https://'),
    description: 'Application base URL',
  },
  {
    name: 'APP_VERSION',
    required: false,
    description: 'Application version (optional, falls back to git hash)',
  },

  // Optional: Analytics, monitoring, etc.
  {
    name: 'NEXT_PUBLIC_POSTHOG_KEY',
    required: false,
    description: 'PostHog analytics key (optional)',
  },
  {
    name: 'SENTRY_DSN',
    required: false,
    description: 'Sentry error tracking DSN (optional)',
  },
];

interface ValidationResult {
  name: string;
  status: 'ok' | 'missing' | 'invalid' | 'warning';
  message: string;
}

function validateEnv(): ValidationResult[] {
  const results: ValidationResult[] = [];

  for (const envVar of ENV_VARS) {
    const value = process.env[envVar.name];

    if (!value) {
      if (envVar.required) {
        results.push({
          name: envVar.name,
          status: 'missing',
          message: `Required: ${envVar.description}`,
        });
      } else {
        results.push({
          name: envVar.name,
          status: 'warning',
          message: `Optional: ${envVar.description}`,
        });
      }
      continue;
    }

    if (envVar.validator && !envVar.validator(value)) {
      results.push({
        name: envVar.name,
        status: 'invalid',
        message: `Invalid format: ${envVar.description}`,
      });
      continue;
    }

    results.push({
      name: envVar.name,
      status: 'ok',
      message: envVar.description,
    });
  }

  return results;
}

function printResults(results: ValidationResult[]): void {
  console.log('\n=== Environment Validation Results ===\n');

  const ok = results.filter((r) => r.status === 'ok');
  const missing = results.filter((r) => r.status === 'missing');
  const invalid = results.filter((r) => r.status === 'invalid');
  const warnings = results.filter((r) => r.status === 'warning');

  if (ok.length > 0) {
    console.log('✅ Valid:');
    ok.forEach((r) => console.log(`   ${r.name}`));
    console.log('');
  }

  if (warnings.length > 0) {
    console.log('⚠️  Optional (not set):');
    warnings.forEach((r) => console.log(`   ${r.name} - ${r.message}`));
    console.log('');
  }

  if (invalid.length > 0) {
    console.log('❌ Invalid:');
    invalid.forEach((r) => console.log(`   ${r.name} - ${r.message}`));
    console.log('');
  }

  if (missing.length > 0) {
    console.log('❌ Missing (required):');
    missing.forEach((r) => console.log(`   ${r.name} - ${r.message}`));
    console.log('');
  }

  console.log('=== Summary ===');
  console.log(`Total: ${results.length}`);
  console.log(`Valid: ${ok.length}`);
  console.log(`Optional: ${warnings.length}`);
  console.log(`Invalid: ${invalid.length}`);
  console.log(`Missing: ${missing.length}`);
  console.log('');

  if (missing.length > 0 || invalid.length > 0) {
    console.log('❌ Validation FAILED');
    console.log('\nRemediation:');
    console.log('1. Copy .env.example to .env.local');
    console.log('2. Fill in all required values');
    console.log('3. Run this script again to verify');
    console.log('');
    process.exit(1);
  } else {
    console.log('✅ Validation PASSED');
    console.log('');
    process.exit(0);
  }
}

// Additional checks
function performAdditionalChecks(): void {
  console.log('\n=== Additional Checks ===\n');

  // Check for common mistakes
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (supabaseUrl && supabaseUrl.endsWith('/')) {
    console.log('⚠️  NEXT_PUBLIC_SUPABASE_URL should not end with /');
  }

  if (appUrl && appUrl.endsWith('/')) {
    console.log('⚠️  NEXT_PUBLIC_APP_URL should not end with /');
  }

  // Check for test/development keys in production
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const nodeEnv = process.env.NODE_ENV;

  if (
    nodeEnv === 'production' &&
    stripeKey &&
    stripeKey.startsWith('sk_test_')
  ) {
    console.log('❌ Using Stripe TEST key in production environment!');
  }

  // Check for localhost URLs in production
  if (nodeEnv === 'production' && appUrl && appUrl.includes('localhost')) {
    console.log('❌ NEXT_PUBLIC_APP_URL contains localhost in production!');
  }

  console.log('');
}

// Main execution
function main(): void {
  console.log('Environment Validation Script');
  console.log('=============================');

  const results = validateEnv();
  performAdditionalChecks();
  printResults(results);
}

main();
