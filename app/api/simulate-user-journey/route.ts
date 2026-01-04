import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const maxDuration = 60;
import { NextResponse } from 'next/server';

/**
 * Simulate Complete User Journey
 * POST /api/simulate-user-journey
 *
 * Simulates a complete user journey from application to completion
 */
export async function POST(request: Request) {
  try {
    const { role } = await request.json();

    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const results: any = {
      timestamp: new Date().toISOString(),
      role: role || 'student',
      journey: [],
      data_created: [],
    };

    // Simulate based on role
    if (role === 'student' || !role) {
      // Step 1: Create application
      const { data: application, error: appError } = await supabase
        .from('student_applications')
        .insert({
          first_name: 'Simulated',
          last_name: 'Student',
          email: `sim-student-${Date.now()}@test.com`,
          phone: '555-0100',
          date_of_birth: '1995-01-01',
          status: 'pending',
          tenant_id: '00000000-0000-0000-0000-000000000001',
        })
        .select()
        .single();

      results.journey.push({
        step: 1,
        action: 'Submit student application',
        status: appError ? 'failed' : 'success',
        data: application,
        error: appError?.message,
      });

      if (application) {
        results.data_created.push({
          type: 'student_application',
          id: application.id,
          tracking_number: application.tracking_number,
        });

        // Step 2: Approve application (simulate admin action)
        const { error: approveError } = await supabase
          .from('student_applications')
          .update({
            status: 'approved',
            reviewed_by: '00000000-0000-0000-0000-000000000001',
            review_notes: 'Approved by autopilot simulation',
            status_updated_at: new Date().toISOString(),
          })
          .eq('id', application.id);

        results.journey.push({
          step: 2,
          action: 'Admin approves application',
          status: approveError ? 'failed' : 'success',
          error: approveError?.message,
        });

        // Step 3: Create enrollment
        const { data: enrollment, error: enrollError } = await supabase
          .from('enrollments')
          .insert({
            student_id: '00000000-0000-0000-0000-000000000001',
            program_id: '00000000-0000-0000-0000-000000000001',
            enrollment_date: new Date().toISOString(),
            status: 'active',
            tenant_id: '00000000-0000-0000-0000-000000000001',
          })
          .select()
          .single();

        results.journey.push({
          step: 3,
          action: 'Create enrollment',
          status: enrollError ? 'failed' : 'success',
          data: enrollment,
          error: enrollError?.message,
        });

        if (enrollment) {
          results.data_created.push({
            type: 'enrollment',
            id: enrollment.id,
          });

          // Step 4: Track progress
          results.journey.push({
            step: 4,
            action: 'Student accesses course',
            status: 'simulated',
            note: 'Student can now access LMS dashboard and course content',
          });

          // Step 5: Complete course (simulate)
          const { error: completeError } = await supabase
            .from('enrollments')
            .update({
              completion_date: new Date().toISOString(),
              status: 'completed',
            })
            .eq('id', enrollment.id);

          results.journey.push({
            step: 5,
            action: 'Complete course',
            status: completeError ? 'failed' : 'success',
            error: completeError?.message,
          });

          // Step 6: Issue credential
          const { data: credential, error: credError } = await supabase
            .from('credential_verification')
            .insert({
              student_id: '00000000-0000-0000-0000-000000000001',
              enrollment_id: enrollment.id,
              credential_type: 'Certificate of Completion',
              credential_name: 'Simulated Program Certificate',
              issuing_organization: 'Elevate for Humanity',
              issue_date: new Date().toISOString(),
              verification_status: 'verified',
            })
            .select()
            .single();

          results.journey.push({
            step: 6,
            action: 'Issue credential',
            status: credError ? 'failed' : 'success',
            data: credential,
            error: credError?.message,
          });

          if (credential) {
            results.data_created.push({
              type: 'credential',
              id: credential.id,
            });
          }

          // Step 7: Track employment
          const { data: employment, error: empError } = await supabase
            .from('employment_tracking')
            .insert({
              student_id: '00000000-0000-0000-0000-000000000001',
              enrollment_id: enrollment.id,
              employer_name: 'Simulated Employer Inc',
              job_title: 'Entry Level Position',
              employment_start_date: new Date().toISOString(),
              hourly_wage: 18.5,
              hours_per_week: 40,
              verified_2nd_quarter: true,
              wage_2nd_quarter: 18.5,
            })
            .select()
            .single();

          results.journey.push({
            step: 7,
            action: 'Track employment outcome',
            status: empError ? 'failed' : 'success',
            data: employment,
            error: empError?.message,
          });

          if (employment) {
            results.data_created.push({
              type: 'employment_tracking',
              id: employment.id,
            });
          }
        }
      }
    }

    // Calculate success
    const successfulSteps = results.journey.filter(
      (j: any) => j.status === 'success' || j.status === 'simulated'
    ).length;
    const totalSteps = results.journey.length;

    results.summary = {
      total_steps: totalSteps,
      successful_steps: successfulSteps,
      failed_steps: totalSteps - successfulSteps,
      success_rate: ((successfulSteps / totalSteps) * 100).toFixed(1) + '%',
      journey_complete: successfulSteps === totalSteps,
    };

    results.production_ready = results.summary.journey_complete;

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to show available journeys
 */
export async function GET() {
  return NextResponse.json({
    available_journeys: [
      {
        role: 'student',
        steps: [
          'Submit application',
          'Application approved',
          'Enroll in program',
          'Access course content',
          'Complete course',
          'Receive credential',
          'Employment tracked',
        ],
      },
      {
        role: 'program_holder',
        steps: [
          'Submit application',
          'Upload documents',
          'Sign MOU',
          'Application approved',
          'Access dashboard',
          'Manage students',
        ],
      },
      {
        role: 'employer',
        steps: [
          'Submit application',
          'Application approved',
          'Post job openings',
          'Review candidates',
          'Hire students',
        ],
      },
    ],
    usage: {
      endpoint: 'POST /api/simulate-user-journey',
      body: { role: 'student' },
      description: 'Simulates complete user journey and creates test data',
    },
  });
}
