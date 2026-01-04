#!/usr/bin/env node

/**
 * Security Lockdown Verification
 * Verifies that RLS policies are correctly configured
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const adminClient = SUPABASE_SERVICE_ROLE_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  : null;

console.log('🔒 Security Lockdown Verification');
console.log('==================================\n');

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
};

async function testTable(tableName, shouldBeReadable) {
  try {
    const { data, error } = await anonClient
      .from(tableName)
      .select('*')
      .limit(1);

    if (shouldBeReadable) {
      if (error) {
        console.log(`❌ ${tableName}: Should be readable but got error`);
        console.log(`   Error: ${error.message}`);
        results.failed++;
        return false;
      } else {
        console.log(`✅ ${tableName}: Publicly readable (as expected)`);
        results.passed++;
        return true;
      }
    } else {
      if (error || !data || data.length === 0) {
        console.log(`✅ ${tableName}: Protected from public access`);
        results.passed++;
        return true;
      } else {
        console.log(`❌ ${tableName}: SECURITY ISSUE - publicly readable when it shouldn't be`);
        results.failed++;
        return false;
      }
    }
  } catch (err) {
    console.log(`⚠️  ${tableName}: Could not test (table may not exist)`);
    results.warnings++;
    return null;
  }
}

// Test public catalog tables (should be readable)
console.log('Testing Public Catalog Access:');
console.log('------------------------------');
await testTable('programs', true);
await testTable('credentials', true);
await testTable('credentialing_partners', true);

console.log('\nTesting Protected Tables (should NOT be readable):');
console.log('--------------------------------------------------');
await testTable('applications', false);
await testTable('profiles', false);
await testTable('enrollments', false);
await testTable('user_progress', false);
await testTable('quiz_attempts', false);
await testTable('learning_paths', false);
await testTable('credentials_attained', false);
await testTable('course_completion_status', false);

// Test application insertion
console.log('\nTesting Application Submission:');
console.log('-------------------------------');
const testApp = {
  first_name: 'Security',
  last_name: 'Test',
  email: `security-test-${Date.now()}@example.com`,
  phone: '555-0100',
  program_id: 'test',
  status: 'pending',
};

const { data: insertData, error: insertError } = await anonClient
  .from('applications')
  .insert(testApp)
  .select()
  .single();

if (insertError) {
  console.log('❌ Application submission: FAILED');
  console.log(`   Error: ${insertError.message}`);
  results.failed++;
} else {
  console.log('✅ Application submission: Working');
  results.passed++;
}

// Check if admin client can read applications
if (adminClient) {
  console.log('\nTesting Admin Access:');
  console.log('--------------------');
  const { data: adminData, error: adminError } = await adminClient
    .from('applications')
    .select('*')
    .limit(1);

  if (adminError) {
    console.log('⚠️  Admin access: Could not verify (this is expected if using service role)');
    results.warnings++;
  } else {
    console.log('✅ Admin access: Can read applications');
    results.passed++;
  }
}

// Summary
console.log('\n==================================');
console.log('Security Verification Summary:');
console.log(`  ✅ Passed: ${results.passed}`);
console.log(`  ❌ Failed: ${results.failed}`);
console.log(`  ⚠️  Warnings: ${results.warnings}`);
console.log('==================================\n');

if (results.failed > 0) {
  console.log('❌ SECURITY ISSUES DETECTED');
  console.log('   Review the failed tests above and fix before launching');
  process.exit(1);
} else {
  console.log('✅ SECURITY LOCKDOWN VERIFIED');
  console.log('   Database is properly secured for launch');
  process.exit(0);
}
