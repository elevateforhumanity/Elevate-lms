#!/usr/bin/env node

// Environment validation script to check required environment variables
const requiredEnvVars = {
  JWT_SECRET: {
    required: true,
    minLength: 16,
    description: 'JWT secret for authentication',
  },
  NODE_ENV: {
    required: false,
    default: 'development',
    validValues: ['development', 'production', 'test'],
  },
  DATABASE_URL: {
    required: false,
    description: 'Database connection string',
  },
  STRIPE_SECRET_KEY: {
    required: false,
    description: 'Stripe secret key for payments',
  },
  LOG_LEVEL: {
    required: false,
    default: 'info',
    validValues: ['error', 'warn', 'info', 'debug', 'trace'],
  },
};

function validateEnvironment() {
  const errors = [];
  const warnings = [];

  console.log('🔍 Validating environment variables...\n');

  for (const [varName, config] of Object.entries(requiredEnvVars)) {
    const value = process.env[varName];

    if (!value) {
      if (config.required) {
        errors.push(
          `❌ ${varName} is required but not set. ${config.description || ''}`
        );
      } else if (config.default) {
        warnings.push(
          `⚠️  ${varName} not set, using default: ${config.default}`
        );
      } else {
        warnings.push(
          `⚠️  ${varName} is optional but not set. ${config.description || ''}`
        );
      }
      continue;
    }

    // Check minimum length
    if (config.minLength && value.length < config.minLength) {
      errors.push(
        `❌ ${varName} must be at least ${config.minLength} characters long`
      );
      continue;
    }

    // Check valid values
    if (config.validValues && !config.validValues.includes(value)) {
      errors.push(
        `❌ ${varName} must be one of: ${config.validValues.join(', ')}`
      );
      continue;
    }

    console.log(`✅ ${varName}: configured`);
  }

  // Show warnings
  if (warnings.length > 0) {
    console.log('\n' + warnings.join('\n'));
  }

  // Show errors
  if (errors.length > 0) {
    console.log('\n💥 Environment validation failed:\n');
    console.log(errors.join('\n'));
    process.exit(1);
  }

  console.log('\n🎉 Environment validation passed!');
}

// Set defaults for missing optional variables
if (!process.env.JWT_SECRET) {
  console.log('⚠️  Setting temporary JWT_SECRET for development...');
  process.env.JWT_SECRET =
    'dev-secret-key-not-for-production-use-16-chars-minimum';
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

validateEnvironment();
