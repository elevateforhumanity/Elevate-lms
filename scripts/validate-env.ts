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

  const ok = results.filter((r) => r.status === 'ok');
  const missing = results.filter((r) => r.status === 'missing');
  const invalid = results.filter((r) => r.status === 'invalid');
  const warnings = results.filter((r) => r.status === 'warning');

  if (ok.length > 0) {
    ok.forEach((r) => console.log(`   ${r.name}`));
  }

  if (warnings.length > 0) {
    warnings.forEach((r) => console.log(`   ${r.name} - ${r.message}`));
  }

  if (invalid.length > 0) {
    invalid.forEach((r) => console.log(`   ${r.name} - ${r.message}`));
  }

  if (missing.length > 0) {
    missing.forEach((r) => console.log(`   ${r.name} - ${r.message}`));
  }


  if (missing.length > 0 || invalid.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

// Additional checks
function performAdditionalChecks(): void {

  // Check for common mistakes
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (supabaseUrl && supabaseUrl.endsWith('/')) {
  }

  if (appUrl && appUrl.endsWith('/')) {
  }

  // Check for test/development keys in production
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const nodeEnv = process.env.NODE_ENV;

  if (
    nodeEnv === 'production' &&
    stripeKey &&
    stripeKey.startsWith('sk_test_')
  ) {
  }

  // Check for localhost URLs in production
  if (nodeEnv === 'production' && appUrl && appUrl.includes('localhost')) {
  }

}

// Main execution
function main(): void {

  const results = validateEnv();
  performAdditionalChecks();
  printResults(results);
}

main();
