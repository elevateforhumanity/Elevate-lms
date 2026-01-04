#!/usr/bin/env node

/**
 * Test Enrollment Flow Autopilot Runner
 * Executes the enrollment flow test with proper environment setup
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🤖 Enrollment Flow Autopilot Test');
console.log('=====================================\n');

// Check environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
];

const missingVars = requiredEnvVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(v => console.error(`   - ${v}`));
  console.error('\n💡 Load environment variables first:');
  console.error('   source .env.local');
  console.error('   or');
  console.error('   export $(cat .env.local | xargs)');
  process.exit(1);
}

// Configuration
const config = {
  studentEmail: process.env.TEST_STUDENT_EMAIL || 'autopilot-test@elevateforhumanity.org',
  studentPassword: process.env.TEST_STUDENT_PASSWORD || 'AutopilotTest123!',
  programSlug: process.env.TEST_PROGRAM_SLUG || 'barber-apprenticeship',
  skipPayment: true,
};

console.log('📋 Test Configuration:');
console.log(`   Student Email: ${config.studentEmail}`);
console.log(`   Program: ${config.programSlug}`);
console.log(`   Skip Payment: ${config.skipPayment}`);
console.log('');

// Set environment variables for the test
process.env.TEST_STUDENT_EMAIL = config.studentEmail;
process.env.TEST_STUDENT_PASSWORD = config.studentPassword;
process.env.TEST_PROGRAM_SLUG = config.programSlug;

try {
  // Compile TypeScript file
  console.log('🔨 Compiling test script...');
  execSync('npx tsx lib/autopilot/test-enrollment-flow.ts', {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env,
  });
  
  console.log('\n✅ Autopilot test completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('\n❌ Autopilot test failed!');
  console.error(error.message);
  process.exit(1);
}
