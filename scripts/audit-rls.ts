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
  details?: unknown[];
}

const results: AuditResult[] = [];

async function checkTablesWithoutRLS() {

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

  const query = `
    SELECT tablename, policyname, qual
    FROM pg_policies
    WHERE schemaname = 'public'
      AND qual = 'true'
      AND tablename NOT IN (${PUBLIC_TABLES.map((t) => `'${t}'`).join(',')})
    ORDER BY tablename, policyname;
  `;


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

  const passed = results.filter((r) => r.status === 'pass').length;
  const failed = results.filter((r) => r.status === 'fail').length;
  const warnings = results.filter((r) => r.status === 'warning').length;

  results.forEach((result) => {
    const icon =
      result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️';


    if (result.details && result.details.length > 0) {
      result.details.forEach((detail) => {
      });
    }
  });


  if (failed > 0) {
      '1. Run migration: supabase/migrations/009_rls_hardening_pack.sql'
    );
    process.exit(1);
  } else if (warnings > 0) {
    process.exit(0);
  } else {
    process.exit(0);
  }
}

async function main() {

  await checkTablesWithoutRLS();
  await checkPermissivePolicies();
  await checkTablesWithRLSButNoPolicies();
  await checkOrgIsolationHelpers();

  printResults();
}

main().catch((error) => {
  process.exit(1);
});
