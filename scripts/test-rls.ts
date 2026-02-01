/**
 * RLS Policy Test Script
 * 
 * Run with: npx tsx scripts/test-rls.ts
 * 
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

async function test(name: string, fn: () => Promise<boolean>) {
  try {
    const passed = await fn();
    results.push({ name, passed });
    console.log(passed ? `✅ ${name}` : `❌ ${name}`);
  } catch (error: any) {
    results.push({ name, passed: false, error: error.message });
    console.log(`❌ ${name}: ${error.message}`);
  }
}

async function runTests() {
  console.log('\n=== RLS Policy Tests ===\n');

  // Test 1: Verify RLS is enabled on key tables
  await test('RLS enabled on enrollments', async () => {
    const { data } = await supabase.rpc('check_rls_enabled', { table_name: 'enrollments' });
    return data === true;
  });

  // Test 2: Verify applications table has RLS
  await test('RLS enabled on applications', async () => {
    const { data } = await supabase.rpc('check_rls_enabled', { table_name: 'applications' });
    return data === true;
  });

  // Test 3: Verify audit_logs table has RLS
  await test('RLS enabled on audit_logs', async () => {
    const { data } = await supabase.rpc('check_rls_enabled', { table_name: 'audit_logs' });
    return data === true;
  });

  // Test 4: Verify attendance_hours table has RLS
  await test('RLS enabled on attendance_hours', async () => {
    const { data } = await supabase.rpc('check_rls_enabled', { table_name: 'attendance_hours' });
    return data === true;
  });

  // Test 5: Verify partner_sites table has RLS
  await test('RLS enabled on partner_sites', async () => {
    const { data } = await supabase.rpc('check_rls_enabled', { table_name: 'partner_sites' });
    return data === true;
  });

  // Test 6: Check policies exist
  await test('Policies exist for enrollments', async () => {
    const { data, error } = await supabase
      .from('pg_policies')
      .select('policyname')
      .eq('tablename', 'enrollments');
    
    if (error) {
      // Try alternative query
      const { count } = await supabase
        .rpc('count_policies', { table_name: 'enrollments' });
      return (count || 0) > 0;
    }
    return (data?.length || 0) > 0;
  });

  // Summary
  console.log('\n=== Summary ===');
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  console.log(`${passed}/${total} tests passed`);
  
  if (passed < total) {
    console.log('\nFailed tests:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`  - ${r.name}${r.error ? `: ${r.error}` : ''}`);
    });
  }

  return passed === total;
}

// Alternative: Direct SQL test if RPC not available
async function runDirectTests() {
  console.log('\n=== Direct RLS Verification ===\n');

  // Check if tables have RLS enabled via information_schema
  const { data: rlsStatus, error } = await supabase.rpc('exec_sql', {
    sql: `
      SELECT tablename, rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename IN ('enrollments', 'applications', 'audit_logs', 'attendance_hours', 'partner_sites')
    `
  });

  if (error) {
    console.log('Could not query RLS status directly. Run migration to ensure RLS is enabled.');
    console.log('Migration file: supabase/migrations/001_barber_hvac_reference.sql');
    return;
  }

  console.log('RLS Status:');
  console.log(rlsStatus);
}

async function main() {
  try {
    const success = await runTests();
    if (!success) {
      await runDirectTests();
    }
  } catch (error) {
    console.error('Test execution failed:', error);
    console.log('\nTo verify RLS manually, run these SQL queries in Supabase:');
    console.log(`
-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('enrollments', 'applications', 'audit_logs');

-- List policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public';
    `);
  }
}

main();
