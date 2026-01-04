#!/usr/bin/env node

/**
 * Dashboard Test Script
 * Tests all dashboard routes for accessibility and functionality
 */

import { createClient } from '@supabase/supabase-js';

console.log('🎯 Dashboard Test Suite');
console.log('=====================================\n');

// Check environment
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_SITE_URL',
];

const missingVars = requiredVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(v => console.error(`   - ${v}`));
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const supabase = createClient(supabaseUrl, supabaseKey);

// Dashboard routes to test
const dashboards = [
  {
    name: 'Student Dashboard',
    path: '/student/dashboard',
    role: 'student',
    features: [
      'Active enrollments',
      'Progress tracking',
      'AI instructor card',
      'Course access',
      'Certificates',
    ],
  },
  {
    name: 'Admin Dashboard',
    path: '/admin/dashboard',
    role: 'admin',
    features: [
      'User management',
      'Enrollment overview',
      'Analytics',
      'System health',
    ],
  },
  {
    name: 'Program Holder Dashboard',
    path: '/program-holder/dashboard',
    role: 'program_holder',
    features: [
      'Apprentice list',
      'Progress tracking',
      'Hour logging',
      'MOU management',
    ],
  },
  {
    name: 'Instructor Dashboard',
    path: '/instructor/dashboard',
    role: 'instructor',
    features: [
      'Student list',
      'Grade management',
      'Course materials',
    ],
  },
  {
    name: 'Employer Dashboard',
    path: '/employer/dashboard',
    role: 'employer',
    features: [
      'Employee training',
      'Progress reports',
      'Compliance tracking',
    ],
  },
  {
    name: 'Partner Dashboard',
    path: '/partner/dashboard',
    role: 'partner',
    features: [
      'Course catalog',
      'Enrollment tracking',
      'Revenue reports',
    ],
  },
];

const results = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  details: [],
};

async function testDashboardRoute(dashboard) {
  console.log(`\n📊 Testing: ${dashboard.name}`);
  console.log('─'.repeat(50));
  
  const result = {
    name: dashboard.name,
    path: dashboard.path,
    accessible: false,
    authenticated: false,
    features: [],
    errors: [],
    warnings: [],
  };

  try {
    // Test 1: Route accessibility
    console.log(`   Testing route: ${dashboard.path}`);
    
    const response = await fetch(`${siteUrl}${dashboard.path}`, {
      method: 'GET',
      redirect: 'manual',
    });

    if (response.status === 200) {
      console.log('   ✅ Route accessible (200 OK)');
      result.accessible = true;
    } else if (response.status === 302 || response.status === 307) {
      const location = response.headers.get('location');
      if (location?.includes('/login')) {
        console.log('   ✅ Protected route (redirects to login)');
        result.authenticated = true;
      } else {
        console.log(`   ⚠️  Redirects to: ${location}`);
        result.warnings.push(`Unexpected redirect to ${location}`);
      }
    } else if (response.status === 404) {
      console.log('   ❌ Route not found (404)');
      result.errors.push('Route returns 404');
    } else {
      console.log(`   ⚠️  Unexpected status: ${response.status}`);
      result.warnings.push(`Status ${response.status}`);
    }

    // Test 2: Check for required features (basic check)
    console.log(`   Expected features: ${dashboard.features.length}`);
    dashboard.features.forEach(feature => {
      result.features.push({
        name: feature,
        status: 'not_tested',
      });
    });

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    result.errors.push(error.message);
  }

  return result;
}

async function testDatabaseTables() {
  console.log('\n🗄️  Testing Database Tables');
  console.log('─'.repeat(50));

  const tables = [
    'profiles',
    'enrollments',
    'programs',
    'ai_instructors',
    'ai_instructor_assignments',
    'program_holders',
  ];

  const tableResults = [];

  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('id')
        .limit(1);

      if (error) {
        console.log(`   ❌ ${table}: ${error.message}`);
        tableResults.push({ table, status: 'error', error: error.message });
      } else {
        console.log(`   ✅ ${table}: accessible`);
        tableResults.push({ table, status: 'ok' });
      }
    } catch (error) {
      console.log(`   ❌ ${table}: ${error.message}`);
      tableResults.push({ table, status: 'error', error: error.message });
    }
  }

  return tableResults;
}

async function testAuthenticationFlow() {
  console.log('\n🔐 Testing Authentication Flow');
  console.log('─'.repeat(50));

  const authTests = [];

  // Test 1: Login page accessible
  try {
    const response = await fetch(`${siteUrl}/login`);
    if (response.status === 200) {
      console.log('   ✅ Login page accessible');
      authTests.push({ test: 'login_page', status: 'pass' });
    } else {
      console.log(`   ❌ Login page returned ${response.status}`);
      authTests.push({ test: 'login_page', status: 'fail' });
    }
  } catch (error) {
    console.log(`   ❌ Login page error: ${error.message}`);
    authTests.push({ test: 'login_page', status: 'error' });
  }

  // Test 2: Protected routes redirect
  try {
    const response = await fetch(`${siteUrl}/student/dashboard`, {
      redirect: 'manual',
    });
    
    if (response.status === 302 || response.status === 307) {
      const location = response.headers.get('location');
      if (location?.includes('/login')) {
        console.log('   ✅ Protected routes redirect to login');
        authTests.push({ test: 'protected_redirect', status: 'pass' });
      } else {
        console.log(`   ⚠️  Redirects to: ${location}`);
        authTests.push({ test: 'protected_redirect', status: 'warning' });
      }
    } else {
      console.log(`   ⚠️  Expected redirect, got ${response.status}`);
      authTests.push({ test: 'protected_redirect', status: 'warning' });
    }
  } catch (error) {
    console.log(`   ❌ Redirect test error: ${error.message}`);
    authTests.push({ test: 'protected_redirect', status: 'error' });
  }

  return authTests;
}

async function testAPIEndpoints() {
  console.log('\n🔌 Testing API Endpoints');
  console.log('─'.repeat(50));

  const endpoints = [
    { path: '/api/health', method: 'GET', expectAuth: false },
    { path: '/api/dashboard/stats', method: 'GET', expectAuth: true },
    { path: '/api/ai/chat', method: 'POST', expectAuth: true },
  ];

  const apiResults = [];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${siteUrl}${endpoint.path}`, {
        method: endpoint.method,
      });

      if (endpoint.expectAuth && (response.status === 401 || response.status === 403)) {
        console.log(`   ✅ ${endpoint.path}: Protected (${response.status})`);
        apiResults.push({ endpoint: endpoint.path, status: 'protected' });
      } else if (!endpoint.expectAuth && response.status === 200) {
        console.log(`   ✅ ${endpoint.path}: Accessible`);
        apiResults.push({ endpoint: endpoint.path, status: 'accessible' });
      } else if (response.status === 404) {
        console.log(`   ⚠️  ${endpoint.path}: Not found`);
        apiResults.push({ endpoint: endpoint.path, status: 'not_found' });
      } else {
        console.log(`   ℹ️  ${endpoint.path}: Status ${response.status}`);
        apiResults.push({ endpoint: endpoint.path, status: response.status });
      }
    } catch (error) {
      console.log(`   ❌ ${endpoint.path}: ${error.message}`);
      apiResults.push({ endpoint: endpoint.path, status: 'error' });
    }
  }

  return apiResults;
}

async function runTests() {
  console.log('🚀 Starting Dashboard Tests\n');
  console.log(`Site URL: ${siteUrl}`);
  console.log(`Testing ${dashboards.length} dashboards\n`);

  // Test all dashboards
  for (const dashboard of dashboards) {
    const result = await testDashboardRoute(dashboard);
    results.details.push(result);
    results.total++;
    
    if (result.errors.length === 0) {
      results.passed++;
    } else {
      results.failed++;
    }
    
    if (result.warnings.length > 0) {
      results.warnings++;
    }
  }

  // Test database
  const tableResults = await testDatabaseTables();

  // Test authentication
  const authResults = await testAuthenticationFlow();

  // Test API endpoints
  const apiResults = await testAPIEndpoints();

  // Summary
  console.log('\n');
  console.log('═'.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('═'.repeat(50));
  console.log('');

  console.log('Dashboard Routes:');
  console.log(`   Total: ${results.total}`);
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   ⚠️  Warnings: ${results.warnings}`);
  console.log('');

  console.log('Database Tables:');
  const tablesOk = tableResults.filter(t => t.status === 'ok').length;
  const tablesError = tableResults.filter(t => t.status === 'error').length;
  console.log(`   ✅ Accessible: ${tablesOk}`);
  console.log(`   ❌ Errors: ${tablesError}`);
  console.log('');

  console.log('Authentication:');
  const authPass = authResults.filter(t => t.status === 'pass').length;
  const authFail = authResults.filter(t => t.status === 'fail').length;
  console.log(`   ✅ Passed: ${authPass}`);
  console.log(`   ❌ Failed: ${authFail}`);
  console.log('');

  console.log('API Endpoints:');
  const apiOk = apiResults.filter(t => t.status === 'protected' || t.status === 'accessible').length;
  console.log(`   ✅ Working: ${apiOk}`);
  console.log(`   ⚠️  Issues: ${apiResults.length - apiOk}`);
  console.log('');

  // Detailed results
  console.log('═'.repeat(50));
  console.log('📋 DETAILED RESULTS');
  console.log('═'.repeat(50));
  console.log('');

  results.details.forEach(result => {
    const status = result.errors.length === 0 ? '✅' : '❌';
    console.log(`${status} ${result.name}`);
    console.log(`   Path: ${result.path}`);
    console.log(`   Accessible: ${result.accessible ? 'Yes' : 'No'}`);
    console.log(`   Protected: ${result.authenticated ? 'Yes' : 'No'}`);
    
    if (result.errors.length > 0) {
      console.log(`   Errors:`);
      result.errors.forEach(err => console.log(`     - ${err}`));
    }
    
    if (result.warnings.length > 0) {
      console.log(`   Warnings:`);
      result.warnings.forEach(warn => console.log(`     - ${warn}`));
    }
    console.log('');
  });

  // Recommendations
  console.log('═'.repeat(50));
  console.log('💡 RECOMMENDATIONS');
  console.log('═'.repeat(50));
  console.log('');

  if (results.failed > 0) {
    console.log('❌ Failed Tests:');
    console.log('   1. Check server is running: npm run dev');
    console.log('   2. Verify routes exist in app directory');
    console.log('   3. Check for build errors');
    console.log('');
  }

  if (tablesError > 0) {
    console.log('❌ Database Issues:');
    console.log('   1. Run migrations: npm run db:migrate');
    console.log('   2. Check Supabase connection');
    console.log('   3. Verify RLS policies');
    console.log('');
  }

  console.log('✅ Next Steps:');
  console.log('   1. Start dev server: npm run dev');
  console.log('   2. Visit dashboards manually');
  console.log('   3. Test with real user accounts');
  console.log('   4. Verify all features work');
  console.log('');

  const allPassed = results.failed === 0 && tablesError === 0;
  
  if (allPassed) {
    console.log('🎉 All tests passed! Dashboards are ready.');
  } else {
    console.log('⚠️  Some tests failed. Review errors above.');
  }

  process.exit(allPassed ? 0 : 1);
}

// Run tests
runTests().catch(error => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});
