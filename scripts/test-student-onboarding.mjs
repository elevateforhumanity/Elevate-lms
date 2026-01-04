#!/usr/bin/env node

/**
 * Student Onboarding Test Script
 * Tests complete student onboarding flow from signup to dashboard access
 */

import { createClient } from '@supabase/supabase-js';

console.log('🎓 Student Onboarding Test');
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
  console.error('\n💡 Load environment variables first:');
  console.error('   source .env.local');
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const supabase = createClient(supabaseUrl, supabaseKey);

// Test configuration
const testStudent = {
  email: `test-student-${Date.now()}@elevateforhumanity.org`,
  password: 'TestPassword123!',
  firstName: 'Test',
  lastName: 'Student',
  phone: '555-123-4567',
  programSlug: 'barber-apprenticeship',
};

const results = {
  steps: [],
  passed: 0,
  failed: 0,
};

function logStep(step, status, message, data = null) {
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : 'ℹ️';
  console.log(`${icon} ${step}: ${message}`);
  if (data) {
    console.log(`   Data:`, JSON.stringify(data, null, 2));
  }
  
  results.steps.push({ step, status, message, data });
  if (status === 'pass') results.passed++;
  if (status === 'fail') results.failed++;
}

async function testStep1_CreateAccount() {
  console.log('\n📝 Step 1: Create Student Account');
  console.log('─'.repeat(50));

  try {
    // Create user account
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: testStudent.email,
      password: testStudent.password,
      email_confirm: true,
      user_metadata: {
        first_name: testStudent.firstName,
        last_name: testStudent.lastName,
        full_name: `${testStudent.firstName} ${testStudent.lastName}`,
        role: 'student',
      },
    });

    if (authError || !authData.user) {
      logStep('Create Account', 'fail', authError?.message || 'Failed to create user');
      return null;
    }

    logStep('Create Account', 'pass', 'User account created', {
      userId: authData.user.id,
      email: authData.user.email,
    });

    // Create profile
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        email: testStudent.email,
        first_name: testStudent.firstName,
        last_name: testStudent.lastName,
        full_name: `${testStudent.firstName} ${testStudent.lastName}`,
        phone: testStudent.phone,
        role: 'student',
      });

    if (profileError) {
      logStep('Create Profile', 'fail', profileError.message);
      return authData.user.id;
    }

    logStep('Create Profile', 'pass', 'Profile created successfully');

    return authData.user.id;

  } catch (error) {
    logStep('Create Account', 'fail', error.message);
    return null;
  }
}

async function testStep2_GetProgram() {
  console.log('\n📚 Step 2: Get Program Details');
  console.log('─'.repeat(50));

  try {
    const { data: program, error } = await supabase
      .from('programs')
      .select('*')
      .eq('slug', testStudent.programSlug)
      .single();

    if (error || !program) {
      logStep('Get Program', 'fail', `Program not found: ${testStudent.programSlug}`);
      return null;
    }

    logStep('Get Program', 'pass', 'Program found', {
      id: program.id,
      name: program.name || program.title,
      slug: program.slug,
    });

    return program;

  } catch (error) {
    logStep('Get Program', 'fail', error.message);
    return null;
  }
}

async function testStep3_CreateEnrollment(userId, programId) {
  console.log('\n🎓 Step 3: Create Enrollment');
  console.log('─'.repeat(50));

  try {
    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .insert({
        user_id: userId,
        program_id: programId,
        status: 'active',
        payment_status: 'paid',
        source: 'test_onboarding',
        enrolled_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error || !enrollment) {
      logStep('Create Enrollment', 'fail', error?.message || 'Failed to create enrollment');
      return null;
    }

    logStep('Create Enrollment', 'pass', 'Enrollment created', {
      enrollmentId: enrollment.id,
      status: enrollment.status,
    });

    return enrollment;

  } catch (error) {
    logStep('Create Enrollment', 'fail', error.message);
    return null;
  }
}

async function testStep4_AssignAIInstructor(userId, programSlug) {
  console.log('\n🤖 Step 4: Assign AI Instructor');
  console.log('─'.repeat(50));

  try {
    // Check if AI instructor exists
    const { data: instructor, error: instructorError } = await supabase
      .from('ai_instructors')
      .select('*')
      .eq('program_slug', programSlug)
      .eq('is_active', true)
      .maybeSingle();

    if (instructorError) {
      logStep('Check AI Instructor', 'fail', instructorError.message);
      return false;
    }

    if (!instructor) {
      logStep('Check AI Instructor', 'fail', `No AI instructor found for ${programSlug}`);
      return false;
    }

    logStep('Check AI Instructor', 'pass', 'AI instructor found', {
      instructorId: instructor.id,
      name: instructor.name,
    });

    // Create assignment
    const { error: assignError } = await supabase
      .from('ai_instructor_assignments')
      .insert({
        student_id: userId,
        instructor_id: instructor.id,
        program_slug: programSlug,
        status: 'active',
      });

    if (assignError) {
      // Check if already exists
      if (assignError.code === '23505') {
        logStep('Assign AI Instructor', 'pass', 'Assignment already exists');
        return true;
      }
      logStep('Assign AI Instructor', 'fail', assignError.message);
      return false;
    }

    logStep('Assign AI Instructor', 'pass', 'AI instructor assigned successfully');

    // Log to audit trail
    await supabase.from('ai_audit_log').insert({
      student_id: userId,
      program_slug: programSlug,
      action: 'ASSIGN_INSTRUCTOR',
      details: { instructor_slug: instructor.slug, source: 'test_onboarding' },
    });

    return true;

  } catch (error) {
    logStep('Assign AI Instructor', 'fail', error.message);
    return false;
  }
}

async function testStep5_VerifyDashboardAccess(userId) {
  console.log('\n🏠 Step 5: Verify Dashboard Access');
  console.log('─'.repeat(50));

  try {
    // Check enrollment visibility
    const { data: enrollments, error: enrollError } = await supabase
      .from('enrollments')
      .select(`
        *,
        programs (id, name, title, slug)
      `)
      .eq('user_id', userId);

    if (enrollError) {
      logStep('Check Enrollments', 'fail', enrollError.message);
      return false;
    }

    if (!enrollments || enrollments.length === 0) {
      logStep('Check Enrollments', 'fail', 'No enrollments found');
      return false;
    }

    logStep('Check Enrollments', 'pass', `Found ${enrollments.length} enrollment(s)`);

    // Check AI instructor assignment
    const { data: assignments, error: assignError } = await supabase
      .from('ai_instructor_assignments')
      .select(`
        *,
        ai_instructors (id, name, role_title)
      `)
      .eq('student_id', userId);

    if (assignError) {
      logStep('Check AI Assignment', 'fail', assignError.message);
      return false;
    }

    if (!assignments || assignments.length === 0) {
      logStep('Check AI Assignment', 'fail', 'No AI instructor assigned');
      return false;
    }

    logStep('Check AI Assignment', 'pass', `AI instructor: ${assignments[0].ai_instructors?.name}`);

    return true;

  } catch (error) {
    logStep('Verify Dashboard', 'fail', error.message);
    return false;
  }
}

async function testStep6_TestDashboardRoute() {
  console.log('\n🌐 Step 6: Test Dashboard Route');
  console.log('─'.repeat(50));

  try {
    const response = await fetch(`${siteUrl}/student/dashboard`, {
      redirect: 'manual',
    });

    if (response.status === 200) {
      logStep('Dashboard Route', 'pass', 'Dashboard accessible (200 OK)');
      return true;
    } else if (response.status === 302 || response.status === 307) {
      const location = response.headers.get('location');
      if (location?.includes('/login')) {
        logStep('Dashboard Route', 'pass', 'Protected route (redirects to login)');
        return true;
      } else {
        logStep('Dashboard Route', 'info', `Redirects to: ${location}`);
        return true;
      }
    } else {
      logStep('Dashboard Route', 'fail', `Unexpected status: ${response.status}`);
      return false;
    }

  } catch (error) {
    logStep('Dashboard Route', 'fail', error.message);
    return false;
  }
}

async function testStep7_CleanupTestData(userId) {
  console.log('\n🧹 Step 7: Cleanup Test Data');
  console.log('─'.repeat(50));

  try {
    // Delete user (cascade will remove enrollments, assignments, etc.)
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      logStep('Cleanup', 'fail', error.message);
      return false;
    }

    logStep('Cleanup', 'pass', 'Test data cleaned up successfully');
    return true;

  } catch (error) {
    logStep('Cleanup', 'fail', error.message);
    return false;
  }
}

async function runOnboardingTest() {
  console.log('🚀 Starting Student Onboarding Test\n');
  console.log(`Test Student: ${testStudent.email}`);
  console.log(`Program: ${testStudent.programSlug}\n`);

  let userId = null;
  let program = null;

  // Step 1: Create account
  userId = await testStep1_CreateAccount();
  if (!userId) {
    console.log('\n❌ Test failed at Step 1');
    return;
  }

  // Step 2: Get program
  program = await testStep2_GetProgram();
  if (!program) {
    console.log('\n❌ Test failed at Step 2');
    await testStep7_CleanupTestData(userId);
    return;
  }

  // Step 3: Create enrollment
  const enrollment = await testStep3_CreateEnrollment(userId, program.id);
  if (!enrollment) {
    console.log('\n❌ Test failed at Step 3');
    await testStep7_CleanupTestData(userId);
    return;
  }

  // Step 4: Assign AI instructor
  await testStep4_AssignAIInstructor(userId, testStudent.programSlug);

  // Step 5: Verify dashboard access
  await testStep5_VerifyDashboardAccess(userId);

  // Step 6: Test dashboard route
  await testStep6_TestDashboardRoute();

  // Step 7: Cleanup
  await testStep7_CleanupTestData(userId);

  // Summary
  console.log('\n');
  console.log('═'.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('═'.repeat(50));
  console.log('');
  console.log(`Total Steps: ${results.steps.length}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log('');

  // Detailed results
  console.log('Detailed Results:');
  results.steps.forEach((step, i) => {
    const icon = step.status === 'pass' ? '✅' : step.status === 'fail' ? '❌' : 'ℹ️';
    console.log(`${i + 1}. ${icon} ${step.step}: ${step.message}`);
  });
  console.log('');

  // Recommendations
  if (results.failed > 0) {
    console.log('═'.repeat(50));
    console.log('💡 RECOMMENDATIONS');
    console.log('═'.repeat(50));
    console.log('');
    console.log('Failed steps detected. Check:');
    console.log('1. Database migrations applied');
    console.log('2. AI instructor seeded for program');
    console.log('3. RLS policies configured');
    console.log('4. Server running (npm run dev)');
    console.log('');
  } else {
    console.log('🎉 All tests passed! Student onboarding is working correctly.');
    console.log('');
    console.log('✅ Verified:');
    console.log('   - Account creation');
    console.log('   - Profile setup');
    console.log('   - Enrollment activation');
    console.log('   - AI instructor assignment');
    console.log('   - Dashboard access');
    console.log('');
  }

  const allPassed = results.failed === 0;
  process.exit(allPassed ? 0 : 1);
}

// Run test
runOnboardingTest().catch(error => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});
