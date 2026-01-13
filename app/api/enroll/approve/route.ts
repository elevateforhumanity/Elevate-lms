// @ts-nocheck
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

interface ApproveEnrollmentRequest {
  enrollment_id: string;
}

/**
 * SINGLE APPROVAL ENDPOINT
 *
 * This is the authoritative trigger point for enrollment activation.
 *
 * Flow:
 * 1. Verify caller is program holder or admin
 * 2. Flip enrollments.status: pending -> active
 * 3. Flip profiles.enrollment_status: pending -> active
 * 4. Call generate_enrollment_steps RPC
 * 5. Return proof of orchestration
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // CRITICAL: Only admin or super_admin may approve enrollments
    // Program holders are explicitly forbidden from approval authority
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const isAdmin =
      profile?.role === 'admin' || profile?.role === 'super_admin';

    if (!isAdmin) {
      return NextResponse.json(
        {
          error:
            'Forbidden - Only admin or super_admin may approve enrollments',
        },
        { status: 403 }
      );
    }

    // Parse request
    const body: ApproveEnrollmentRequest = await req.json();
    const { enrollment_id } = body;

    if (!enrollment_id) {
      return NextResponse.json(
        { error: 'Missing required field: enrollment_id' },
        { status: 400 }
      );
    }

    logger.info('Starting enrollment approval', {
      enrollment_id,
      approver_id: user.id,
      approver_role: profile?.role,
    });

    // Get enrollment details (using enrollments table)
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .select('id, user_id, program_id, status')
      .eq('id', enrollment_id)
      .single();

    if (enrollmentError || !enrollment) {
      logger.error('Enrollment not found', { enrollment_id, enrollmentError });
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      );
    }

    // Check if enrollment is in a pre-approval state
    if (enrollment.status !== 'pending') {
      return NextResponse.json(
        {
          error: `Enrollment status is ${enrollment.status}, expected pending`,
        },
        { status: 400 }
      );
    }

    // STEP 1: Activate enrollment (admin-only, no program holder checks needed)
    const { error: updateEnrollmentError } = await supabase
      .from('enrollments')
      .update({
        status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', enrollment_id);

    if (updateEnrollmentError) {
      logger.error('Failed to activate enrollment', updateEnrollmentError);
      return NextResponse.json(
        { error: 'Failed to activate enrollment' },
        { status: 500 }
      );
    }

    logger.info('Enrollment activated', { enrollment_id });

    // STEP 2: Activate profile enrollment_status
    const { error: updateProfileError } = await supabase
      .from('profiles')
      .update({
        enrollment_status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', enrollment.user_id);

    if (updateProfileError) {
      logger.error(
        'Failed to activate profile enrollment_status',
        updateProfileError
      );
      // Continue - enrollment is already active
    } else {
      logger.info('Profile enrollment_status activated', {
        user_id: enrollment.user_id,
      });
    }

    // STEP 3: Generate enrollment steps via RPC
    const { data: stepsResult, error: stepsError } = await supabase.rpc(
      'generate_enrollment_steps',
      { p_enrollment_id: enrollment_id }
    );

    if (stepsError) {
      logger.error('Failed to generate enrollment steps', {
        enrollment_id,
        error: stepsError,
      });
      // Continue - enrollment is active, steps can be generated manually
    } else {
      logger.info('Enrollment steps generated', {
        enrollment_id,
        steps_created: stepsResult,
      });
    }

    // STEP 4: Log approval action (safe - do not fail if audit log fails)
    try {
      await supabase.from('audit_logs').insert({
        actor_id: user.id,
        actor_role: profile?.role || 'unknown',
        action: 'enrollment_approved',
        entity: 'enrollment',
        entity_id: enrollment_id,
        metadata: {
          user_id: enrollment.user_id,
          program_id: enrollment.program_id,
          steps_generated: stepsResult || 0,
        },
      });
    } catch (err: any) {
      logger.warn('Failed to write audit log (non-critical)', auditError);
    }

    // STEP 5: Notify student of approval
    try {
      await supabase.from('notifications').insert({
        user_id: enrollment.user_id,
        type: 'system',
        title: 'Enrollment Approved',
        message:
          'Your enrollment has been approved. You now have access to the student portal.',
      });

      // Send email notification
      const { data: studentProfile } = await supabase
        .from('profiles')
        .select('email, full_name')
        .eq('id', enrollment.user_id)
        .single();

      if (studentProfile?.email) {
        const { sendEmail } = await import('@/lib/email/resend');
        await sendEmail({
          to: studentProfile.email,
          subject: 'Enrollment Approved - Access Granted',
          html: `
            <h2>Enrollment Approved</h2>
            <p>Hello ${studentProfile.full_name || 'Student'},</p>
            <p>Your enrollment has been approved. You now have access to the student portal.</p>
            <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/student/dashboard">Access Student Portal</a></p>
          `,
        });
        logger.info('Student notification email sent', {
          userId: enrollment.user_id,
        });
      }
    } catch (err: any) {
      logger.warn(
        'Failed to send student notification (non-critical)',
        notifError
      );
    }

    // STEP 6: Notify program holder if enrollment has program_holder_id
    try {
      if (enrollment.program_holder_id) {
        // Get program holder user directly from program_holders table
        const { data: programHolder } = await supabase
          .from('program_holders')
          .select('user_id, organization_name')
          .eq('id', enrollment.program_holder_id)
          .single();

        if (programHolder?.user_id) {
          const { data: phProfile } = await supabase
            .from('profiles')
            .select('id, email, full_name')
            .eq('id', programHolder.user_id)
            .single();

          if (phProfile) {
            await supabase.from('notifications').insert({
              user_id: phProfile.id,
              type: 'system',
              title: 'Student Enrollment Approved',
              message: `A student enrollment for ${programHolder.organization_name} has been approved.`,
            });

            if (phProfile.email) {
              const { sendEmail } = await import('@/lib/email/resend');
              await sendEmail({
                to: phProfile.email,
                subject: 'Student Enrollment Approved',
                html: `
                  <h2>Enrollment Approved</h2>
                  <p>Hello ${phProfile.full_name || 'Program Holder'},</p>
                  <p>A student enrollment for ${programHolder.organization_name} has been approved.</p>
                  <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/partner/dashboard">View Dashboard</a></p>
                `,
              });
              logger.info('Program holder notification sent', {
                programHolderId: enrollment.program_holder_id,
              });
            }
          }
        }
      }
    } catch (err: any) {
      logger.warn(
        'Failed to send program holder notification (non-critical)',
        phNotifError
      );
    }

    // Return proof
    return NextResponse.json({
      success: true,
      enrollmentId: enrollment_id,
      enrollment: {
        id: enrollment_id,
        status: 'active',
        user_id: enrollment.user_id,
        program_id: enrollment.program_id,
      },
      profileEnrollmentStatus: 'active',
      stepsGeneratedCount: stepsResult || 0,
      message: 'Enrollment approved and activated successfully',
    });
  } catch (err: any) {
    logger.err('Enrollment approval err', err);
    return NextResponse.json(
      {
        err:
          (err instanceof Error ? err.message : String(err)) ||
          'Internal server err',
      },
      { status: 500 }
    );
  }
}
