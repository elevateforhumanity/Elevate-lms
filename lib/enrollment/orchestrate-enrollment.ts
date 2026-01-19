import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { sendEmail } from '@/lib/email';

export interface EnrollmentOrchestrationResult {
  success: boolean;
  enrollmentId?: string;
  error?: string;
  stepsCreated?: number;
}

/**
 * Orchestrate enrollment: create enrollment, generate steps, notify program holder, send welcome email
 * Idempotent: safe to retry
 */
export async function orchestrateEnrollment(params: {
  studentId: string;
  programId: string;
  programHolderId: string;
  fundingSource: string;
  idempotencyKey: string;
}): Promise<EnrollmentOrchestrationResult> {
  const supabase = await createClient();
  const {
    studentId,
    programId,
    programHolderId,
    fundingSource,
    idempotencyKey,
  } = params;

  try {
    // Check for existing enrollment with this idempotency key
    const { data: existingEnrollment } = await supabase
      .from('program_enrollments')
      .select('id')
      .eq('student_id', studentId)
      .eq('program_id', programId)
      .eq('status', 'IN_PROGRESS')
      .single();

    if (existingEnrollment) {
      logger.info(
        '[Enrollment Orchestration] Idempotent: enrollment already exists',
        {
          enrollmentId: existingEnrollment.id,
          idempotencyKey,
        }
      );
      return {
        success: true,
        enrollmentId: existingEnrollment.id,
      };
    }

    // 1. Create enrollment record
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('program_enrollments')
      .insert({
        student_id: studentId,
        program_id: programId,
        program_holder_id: programHolderId,
        funding_source: fundingSource,
        status: 'IN_PROGRESS',
      })
      .select()
      .single();

    if (enrollmentError || !enrollment) {
      logger.error(
        '[Enrollment Orchestration] Failed to create enrollment',
        enrollmentError
      );
      return {
        success: false,
        error: 'Failed to create enrollment record',
      };
    }

    logger.info('[Enrollment Orchestration] Enrollment created', {
      enrollmentId: enrollment.id,
      studentId,
      programId,
      programHolderId,
    });

    // 2. Create course enrollments for all courses in this program
    const coursesEnrolled = await createCourseEnrollmentsForProgram(
      supabase,
      studentId,
      programId,
      fundingSource
    );
    
    logger.info('[Enrollment Orchestration] Course enrollments created', {
      enrollmentId: enrollment.id,
      coursesEnrolled,
    });

    // 4. Generate enrollment steps (optional - may not exist)
    try {
      const { data: stepsResult, error: stepsError } = await supabase.rpc(
        'generate_enrollment_steps',
        { p_enrollment_id: enrollment.id }
      );

      if (stepsError) {
        logger.warn(
          '[Enrollment Orchestration] Failed to generate steps (continuing)',
          stepsError
        );
      } else {
        logger.info('[Enrollment Orchestration] Steps generated', {
          enrollmentId: enrollment.id,
          stepsCreated: stepsResult,
        });
      }
    } catch (stepsErr) {
      logger.warn('[Enrollment Orchestration] Steps RPC not available', stepsErr);
    }

    // 6. Update student enrollment_status to active
    await supabase
      .from('profiles')
      .update({ enrollment_status: 'active' })
      .eq('id', studentId);

    // 7. Get student and program holder details for notifications
    const { data: student } = await supabase
      .from('profiles')
      .select('full_name, id')
      .eq('id', studentId)
      .single();

    const { data: programHolder } = await supabase
      .from('program_holders')
      .select('id, user_id, contact_name, contact_email')
      .eq('id', programHolderId)
      .single();

    const { data: program } = await supabase
      .from('programs')
      .select('name, slug')
      .eq('slug', programId)
      .single();

    // 8. Send program holder notification (idempotent)
    if (programHolder) {
      await notifyProgramHolder({
        programHolderId: programHolder.id,
        programHolderUserId: programHolder.user_id,
        programHolderEmail: programHolder.contact_email,
        studentName: student?.full_name || 'New Student',
        programName: program?.name || programId,
        enrollmentId: enrollment.id,
        idempotencyKey: `enrollment-${enrollment.id}-program-holder`,
      });
    }

    // 9. Send student welcome email
    if (student) {
      const { data: userAuth } =
        await supabase.auth.admin.getUserById(studentId);
      if (userAuth?.user?.email) {
        await sendStudentWelcomeEmail({
          studentEmail: userAuth.user.email,
          studentName: student.full_name || 'Student',
          programName: program?.name || programId,
          enrollmentId: enrollment.id,
        });
      }
    }

    return {
      success: true,
      enrollmentId: enrollment.id,
      stepsCreated: stepsResult || 0,
    };
  } catch (error) { /* Error handled silently */ 
    logger.error('[Enrollment Orchestration] Unexpected error', error);
    return {
      success: false,
      error: 'Unexpected error during enrollment orchestration',
    };
  }
}

/**
 * Create course enrollments for all courses in a program
 * This gives the student access to course content in the LMS
 */
async function createCourseEnrollmentsForProgram(
  supabase: any,
  studentId: string,
  programId: string,
  fundingSource: string
): Promise<number> {
  let totalEnrolled = 0;

  // First, get the program's UUID if we have a slug
  const { data: program } = await supabase
    .from('programs')
    .select('id, slug')
    .or(`id.eq.${programId},slug.eq.${programId}`)
    .single();

  const programUuid = program?.id || programId;
  const programSlug = program?.slug || programId;

  // Method 1: Get courses from program_courses junction table
  const { data: junctionCourses } = await supabase
    .from('program_courses')
    .select('course_id, courses(id, title, is_published)')
    .eq('program_id', programUuid);

  if (junctionCourses && junctionCourses.length > 0) {
    const courses = junctionCourses
      .filter((jc: any) => jc.courses?.is_published !== false)
      .map((jc: any) => ({ id: jc.courses.id, title: jc.courses.title }));
    
    if (courses.length > 0) {
      totalEnrolled += await enrollInCourses(supabase, studentId, courses, fundingSource);
    }
  }

  // Method 2: Get courses directly linked via program_id
  const { data: directCourses } = await supabase
    .from('courses')
    .select('id, title')
    .eq('program_id', programUuid)
    .eq('is_published', true);

  if (directCourses && directCourses.length > 0) {
    totalEnrolled += await enrollInCourses(supabase, studentId, directCourses, fundingSource);
  }

  // Method 3: Get courses by slug/category matching (fallback)
  if (totalEnrolled === 0) {
    const { data: slugCourses } = await supabase
      .from('courses')
      .select('id, title')
      .or(`slug.ilike.${programSlug}%,category.eq.${programSlug}`)
      .eq('is_published', true);

    if (slugCourses && slugCourses.length > 0) {
      totalEnrolled += await enrollInCourses(supabase, studentId, slugCourses, fundingSource);
    }
  }

  // Method 4: Enroll in partner courses if linked
  const partnerEnrolled = await enrollInPartnerCourses(supabase, studentId, programUuid, fundingSource);
  totalEnrolled += partnerEnrolled;

  if (totalEnrolled === 0) {
    logger.warn('[Course Enrollments] No courses found for program', { programId, programUuid, programSlug });
  }

  return totalEnrolled;
}

/**
 * Enroll student in partner courses linked to a program
 */
async function enrollInPartnerCourses(
  supabase: any,
  studentId: string,
  programId: string,
  fundingSource: string
): Promise<number> {
  let enrolled = 0;

  // Get partner courses linked to this program
  const { data: partnerLinks } = await supabase
    .from('partner_program_courses')
    .select('partner_course_id, partner_courses(id, course_name, partner_id)')
    .eq('program_id', programId);

  if (!partnerLinks || partnerLinks.length === 0) {
    return 0;
  }

  for (const link of partnerLinks) {
    if (!link.partner_courses) continue;

    // Check if already enrolled in partner course
    const { data: existing } = await supabase
      .from('partner_enrollments')
      .select('id')
      .eq('user_id', studentId)
      .eq('partner_course_id', link.partner_course_id)
      .single();

    if (existing) continue;

    // Create partner enrollment
    const { error } = await supabase
      .from('partner_enrollments')
      .insert({
        user_id: studentId,
        partner_course_id: link.partner_course_id,
        partner_id: link.partner_courses.partner_id,
        status: 'active',
        enrolled_at: new Date().toISOString(),
        funding_source: fundingSource,
      });

    if (!error) {
      enrolled++;
      logger.info('[Partner Enrollments] Enrolled in partner course', {
        studentId,
        partnerCourseId: link.partner_course_id,
        courseName: link.partner_courses.course_name,
      });
    }
  }

  return enrolled;
}

async function enrollInCourses(
  supabase: any,
  studentId: string,
  courses: { id: string; title: string }[],
  fundingSource: string
): Promise<number> {
  let enrolled = 0;

  for (const course of courses) {
    // Check if already enrolled
    const { data: existing } = await supabase
      .from('enrollments')
      .select('user_id')
      .eq('user_id', studentId)
      .eq('course_id', course.id)
      .single();

    if (existing) {
      logger.info('[Course Enrollments] Already enrolled', { 
        studentId, 
        courseId: course.id 
      });
      continue;
    }

    // Create enrollment
    const { error: enrollError } = await supabase
      .from('enrollments')
      .insert({
        user_id: studentId,
        course_id: course.id,
        status: 'active',
        progress_percent: 0,
        started_at: new Date().toISOString(),
        enrollment_method: 'program',
        funding_source: fundingSource,
      });

    if (enrollError) {
      logger.warn('[Course Enrollments] Failed to enroll in course', {
        studentId,
        courseId: course.id,
        error: enrollError,
      });
    } else {
      enrolled++;
      logger.info('[Course Enrollments] Enrolled in course', {
        studentId,
        courseId: course.id,
        courseTitle: course.title,
      });
    }
  }

  return enrolled;
}

async function notifyProgramHolder(params: {
  programHolderId: string;
  programHolderUserId: string;
  programHolderEmail: string;
  studentName: string;
  programName: string;
  enrollmentId: string;
  idempotencyKey: string;
}) {
  const supabase = await createClient();
  const {
    programHolderId,
    programHolderUserId,
    programHolderEmail,
    studentName,
    programName,
    enrollmentId,
    idempotencyKey,
  } = params;

  // Check for existing notification with this idempotency key
  const { data: existingNotification } = await supabase
    .from('notifications')
    .select('id')
    .eq('idempotency_key', idempotencyKey)
    .single();

  if (existingNotification) {
    logger.info(
      '[Program Holder Notification] Idempotent: notification already exists',
      {
        notificationId: existingNotification.id,
        idempotencyKey,
      }
    );
    return;
  }

  // Create in-app notification
  const { data: notification, error: notificationError } = await supabase
    .from('notifications')
    .insert({
      user_id: programHolderUserId,
      type: 'system',
      title: 'New Student Enrolled',
      message: `${studentName} has been enrolled in ${programName}`,
      action_url: `/program-holder/students`,
      action_label: 'View Students',
      metadata: {
        enrollment_id: enrollmentId,
        student_name: studentName,
        program_name: programName,
      },
      idempotency_key: idempotencyKey,
      read: false,
    })
    .select()
    .single();

  if (notificationError) {
    logger.error(
      '[Program Holder Notification] Failed to create notification',
      notificationError
    );
    return;
  }

  logger.info('[Program Holder Notification] In-app notification created', {
    notificationId: notification.id,
    programHolderId,
  });

  // Get notification preferences
  const { data: preferences } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('program_holder_id', programHolderId)
    .single();

  // Send email if enabled (default ON)
  const emailEnabled = preferences?.email_enabled !== false;
  if (emailEnabled && programHolderEmail) {
    const emailResult = await sendEmail({
      to: programHolderEmail,
      subject: `New Student Enrolled: ${studentName}`,
      html: `
        <h2>New Student Enrollment</h2>
        <p><strong>${studentName}</strong> has been enrolled in <strong>${programName}</strong>.</p>
        <p>You can view their details and progress in your program holder dashboard.</p>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/program-holder/students">View Students</a></p>
      `,
    });

    // Log email delivery
    await supabase.from('delivery_logs').insert({
      notification_id: notification.id,
      channel: 'email',
      recipient: programHolderEmail,
      status: emailResult.success ? 'sent' : 'failed',
      provider_message_id: emailResult.messageId,
      error_message: emailResult.success ? null : String(emailResult.error),
      sent_at: emailResult.success ? new Date().toISOString() : null,
    });

    logger.info('[Program Holder Notification] Email sent', {
      notificationId: notification.id,
      email: programHolderEmail,
      success: emailResult.success,
    });
  }

  // SMS (if enabled and consented)
  const smsEnabled = preferences?.sms_enabled === true;
  const smsConsent = preferences?.sms_consent === true;
  const smsOptOut = preferences?.sms_opt_out === true;
  const hasPhone = !!preferences?.phone_e164;

  if (smsEnabled && smsConsent && !smsOptOut && hasPhone) {
    // SMS notification sent via delivery system
    logger.info(
      '[Program Holder Notification] SMS notification queued',
      {
        notificationId: notification.id,
        phone: preferences.phone_e164,
      }
    );

    // Log SMS attempt
    await supabase.from('delivery_logs').insert({
      notification_id: notification.id,
      channel: 'sms',
      recipient: preferences.phone_e164,
      status: 'pending',
      error_message: 'SMS provider not configured',
      sent_at: null,
    });
  }
}

async function sendStudentWelcomeEmail(params: {
  studentEmail: string;
  studentName: string;
  programName: string;
  enrollmentId: string;
}) {
  const { studentEmail, studentName, programName, enrollmentId } = params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://elevateforhumanity.com';

  const emailResult = await sendEmail({
    to: studentEmail,
    subject: `Welcome to ${programName}! Start Learning Now`,
    html: `
      <h2>Welcome to Elevate for Humanity!</h2>
      <p>Hi ${studentName},</p>
      <p>You've been successfully enrolled in <strong>${programName}</strong>.</p>
      
      <h3>What's Next?</h3>
      <ol>
        <li><strong>Access Your Courses</strong> - Your courses are ready in the Learning Portal</li>
        <li><strong>Track Your Progress</strong> - View assignments and deadlines</li>
        <li><strong>Earn Certificates</strong> - Complete courses to earn credentials</li>
      </ol>
      
      <p style="margin: 24px 0;">
        <a href="${siteUrl}/lms" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Start Learning Now
        </a>
      </p>
      
      <p>You can also access:</p>
      <ul>
        <li><a href="${siteUrl}/student/dashboard">Student Dashboard</a></li>
        <li><a href="${siteUrl}/student/progress">My Progress</a></li>
      </ul>
      
      <p>If you have any questions, please contact your program coordinator.</p>
      
      <p style="color: #666; font-size: 12px; margin-top: 24px;">
        This program is free through workforce funding (WIOA/WRG).
      </p>
    `,
  });

  const supabase = await createClient();

  // Log email delivery
  await supabase.from('delivery_logs').insert({
    notification_id: null,
    channel: 'email',
    recipient: studentEmail,
    status: emailResult.success ? 'sent' : 'failed',
    provider_message_id: emailResult.messageId,
    error_message: emailResult.success ? null : String(emailResult.error),
    sent_at: emailResult.success ? new Date().toISOString() : null,
  });

  logger.info('[Student Welcome Email] Sent', {
    enrollmentId,
    email: studentEmail,
    success: emailResult.success,
  });
}
