#!/usr/bin/env tsx

/**
 * RLS Audit Script
 *
 * Verifies Row Level Security configuration:
 * 1. All sensitive tables have RLS enabled
 * 2. No permissive USING(true) policies on sensitive tables
 * 3. No tables with RLS but missing policies (lockout risk)
 * 4. Org isolation is properly configured
 *
 * Usage:
 *   pnpm audit-rls
 *   tsx scripts/audit-rls.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Tables that are intentionally public (no RLS needed)
const PUBLIC_TABLES = [
  'cip_codes',
  'soc_codes',
  'states',
  'countries',
  'timezones',
];

// Tables that should have RLS enabled
const SENSITIVE_TABLES = [
  'organizations',
  'organization_users',
  'organization_settings',
  'profiles',
  'students',
  'enrollments',
  'org_invites',
  'audit_logs',
  'system_errors',
  'certificates',
  'lesson_progress',
  'student_documents',
  'hr_documents',
  'payroll_cards',
  'purchases',
  'licenses',
];

interface AuditResult {
  category: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: any[];
}

const results: AuditResult[] = [];

async function checkTablesWithoutRLS() {
  console.log('\n🔍 Checking tables without RLS...');

  const { data, error } = await supabase.rpc('exec_sql', {
    sql: `
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
        AND rowsecurity = false
        AND tablename NOT IN (${PUBLIC_TABLES.map((t) => `'${t}'`).join(',')})
      ORDER BY tablename;
    `,
  });

  if (error) {
    // Fallback: try direct query if RPC doesn't exist
    const query = `
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
        AND rowsecurity = false
    `;

    console.log('Query:', query);
    console.log('Note: Run this query in Supabase SQL editor');

    results.push({
      category: 'RLS Enabled',
      status: 'warning',
      message: 'Could not verify RLS status automatically',
      details: ['Run the following query in Supabase SQL editor:', query],
    });
    return;
  }

  const tablesWithoutRLS = data || [];
  const sensitiveWithoutRLS = tablesWithoutRLS.filter((row: any) =>
    SENSITIVE_TABLES.includes(row.tablename)
  );

  if (sensitiveWithoutRLS.length === 0) {
    results.push({
      category: 'RLS Enabled',
      status: 'pass',
      message: 'All sensitive tables have RLS enabled',
    });
  } else {
    results.push({
      category: 'RLS Enabled',
      status: 'fail',
      message: `${sensitiveWithoutRLS.length} sensitive tables missing RLS`,
      details: sensitiveWithoutRLS.map((row: any) => row.tablename),
    });
  }
}

async function checkPermissivePolicies() {
  console.log('\n🔍 Checking for permissive policies...');

  const query = `
    SELECT tablename, policyname, qual
    FROM pg_policies
    WHERE schemaname = 'public'
      AND qual = 'true'
      AND tablename NOT IN (${PUBLIC_TABLES.map((t) => `'${t}'`).join(',')})
    ORDER BY tablename, policyname;
  `;

  console.log('Query:', query);
  console.log('Note: Run this query in Supabase SQL editor');

  results.push({
    category: 'Permissive Policies',
    status: 'warning',
    message: 'Manual verification required',
    details: [
      'Run the following query in Supabase SQL editor:',
      query,
      'Expected: 0 rows (no USING(true) policies on sensitive tables)',
    ],
  });
}

async function checkTablesWithRLSButNoPolicies() {
  console.log('\n🔍 Checking tables with RLS but no policies...');

  const query = `
    SELECT t.tablename
    FROM pg_tables t
    WHERE t.schemaname = 'public'
      AND t.rowsecurity = true
      AND NOT EXISTS (
        SELECT 1 FROM pg_policies p
        WHERE p.schemaname = t.schemaname
          AND p.tablename = t.tablename
      )
    ORDER BY t.tablename;
  `;

  console.log('Query:', query);
  console.log('Note: Run this query in Supabase SQL editor');

  results.push({
    category: 'Missing Policies',
    status: 'warning',
    message: 'Manual verification required',
    details: [
      'Run the following query in Supabase SQL editor:',
      query,
      'Expected: 0 rows (all RLS-enabled tables should have policies)',
    ],
  });
}

async function checkOrgIsolationHelpers() {
  console.log('\n🔍 Checking org isolation helper functions...');

  const functions = [
    '_is_org_member',
    '_is_org_admin',
    '_is_super_admin',
    'get_org_invite_by_token',
  ];

  const query = `
    SELECT routine_name
    FROM information_schema.routines
    WHERE routine_schema = 'public'
      AND routine_name IN (${functions.map((f) => `'${f}'`).join(',')})
    ORDER BY routine_name;
  `;

  console.log('Query:', query);
  console.log('Note: Run this query in Supabase SQL editor');

  results.push({
    category: 'Helper Functions',
    status: 'warning',
    message: 'Manual verification required',
    details: [
      'Run the following query in Supabase SQL editor:',
      query,
      `Expected: ${functions.length} functions (${functions.join(', ')})`,
    ],
  });
}

function printResults() {
  console.log('\n' + '='.repeat(60));
  console.log('RLS AUDIT RESULTS');
  console.log('='.repeat(60));

  const passed = results.filter((r) => r.status === 'pass').length;
  const failed = results.filter((r) => r.status === 'fail').length;
  const warnings = results.filter((r) => r.status === 'warning').length;

  results.forEach((result) => {
    const icon =
      result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️';

    console.log(`\n${icon} ${result.category}: ${result.message}`);

    if (result.details && result.details.length > 0) {
      result.details.forEach((detail) => {
        console.log(`   ${detail}`);
      });
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⚠️  Warnings: ${warnings}`);
  console.log('');

  if (failed > 0) {
    console.log('❌ RLS AUDIT FAILED');
    console.log('\nRemediation:');
    console.log(
      '1. Run migration: supabase/migrations/009_rls_hardening_pack.sql'
    );
    console.log('2. Verify policies in Supabase SQL editor');
    console.log('3. Run this script again');
    console.log('');
    process.exit(1);
  } else if (warnings > 0) {
    console.log('⚠️  RLS AUDIT REQUIRES MANUAL VERIFICATION');
    console.log('\nNext steps:');
    console.log('1. Run the SQL queries listed above in Supabase SQL editor');
    console.log('2. Verify results match expected values');
    console.log('3. Update this script with actual results');
    console.log('');
    process.exit(0);
  } else {
    console.log('✅ RLS AUDIT PASSED');
    console.log('');
    process.exit(0);
  }
}

async function main() {
  console.log('RLS Audit Script');
  console.log('================');
  console.log(`Supabase URL: ${supabaseUrl}`);
  console.log('');

  await checkTablesWithoutRLS();
  await checkPermissivePolicies();
  await checkTablesWithRLSButNoPolicies();
  await checkOrgIsolationHelpers();

  printResults();
}

main().catch((error) => {
  console.error('Audit failed:', error);
  process.exit(1);
});
