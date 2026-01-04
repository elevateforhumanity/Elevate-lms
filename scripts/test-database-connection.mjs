#!/usr/bin/env node

/**
 * Database Connection Test Script
 * Tests if database is accessible and working
 */

import { createClient } from '@supabase/supabase-js';

const PRODUCTION_URL = 'https://elevateforhumanity.org';

console.log('🔍 Testing Database Connection...\n');

// Test 1: Environment Variables
console.log('Test 1: Checking environment variables...');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ FAIL: Environment variables not set');
  console.log('   Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}
console.log('✅ PASS: Environment variables set\n');

// Test 2: Create Client
console.log('Test 2: Creating Supabase client...');
let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ PASS: Client created\n');
} catch (error) {
  console.log('❌ FAIL: Could not create client');
  console.log('   Error:', error.message);
  process.exit(1);
}

// Test 3: Database Connection
console.log('Test 3: Testing database connection...');
try {
  const { data, error } = await supabase
    .from('profiles')
    .select('count')
    .limit(1);
  
  if (error) {
    console.log('❌ FAIL: Database query failed');
    console.log('   Error:', error.message);
    process.exit(1);
  }
  console.log('✅ PASS: Database connection works\n');
} catch (error) {
  console.log('❌ FAIL: Database connection error');
  console.log('   Error:', error.message);
  process.exit(1);
}

// Test 4: Check Critical Tables
console.log('Test 4: Checking critical tables exist...');
const criticalTables = [
  'profiles',
  'applications',
  'enrollments',
  'courses',
  'programs',
  'tenants',
  'licenses'
];

let allTablesExist = true;
for (const table of criticalTables) {
  try {
    const { error } = await supabase
      .from(table)
      .select('count')
      .limit(1);
    
    if (error) {
      console.log(`   ❌ Table '${table}' not accessible: ${error.message}`);
      allTablesExist = false;
    } else {
      console.log(`   ✅ Table '${table}' exists`);
    }
  } catch (error) {
    console.log(`   ❌ Table '${table}' error: ${error.message}`);
    allTablesExist = false;
  }
}

if (!allTablesExist) {
  console.log('\n❌ FAIL: Some tables missing or not accessible');
  process.exit(1);
}
console.log('✅ PASS: All critical tables exist\n');

// Test 5: Test RLS Policies (public access)
console.log('Test 5: Testing RLS policies (public access)...');
try {
  const { data, error } = await supabase
    .from('programs')
    .select('id, name, slug')
    .limit(5);
  
  if (error) {
    console.log('❌ FAIL: Cannot read public data');
    console.log('   Error:', error.message);
    console.log('   This might be an RLS policy issue');
    process.exit(1);
  }
  
  if (!data || data.length === 0) {
    console.log('⚠️  WARNING: Programs table is empty');
    console.log('   Database works but needs seeding');
  } else {
    console.log(`✅ PASS: Can read public data (${data.length} programs found)`);
  }
} catch (error) {
  console.log('❌ FAIL: RLS policy test failed');
  console.log('   Error:', error.message);
  process.exit(1);
}

console.log('\n═══════════════════════════════════');
console.log('✅ ALL DATABASE TESTS PASSED');
console.log('═══════════════════════════════════\n');

console.log('Database Status:');
console.log('  • Connection: ✅ Working');
console.log('  • Tables: ✅ All exist');
console.log('  • RLS: ✅ Public access works');
console.log('  • Ready: ✅ Yes\n');

console.log('Next Steps:');
console.log('  1. Test user signup on production');
console.log('  2. Test application submission');
console.log('  3. Test dashboard data loading\n');

process.exit(0);
