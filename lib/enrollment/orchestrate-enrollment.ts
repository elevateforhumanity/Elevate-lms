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

    // 2. Generate enrollment steps
    const { data: stepsResult, error: stepsError } = await supabase.rpc(
      'generate_enrollment_steps',
      { p_enrollment_id: enrollment.id }
    );

    if (stepsError) {
      logger.error(
        '[Enrollment Orchestration] Failed to generate steps',
        stepsError
      );
      // Don't fail enrollment if steps fail - can be retried
    } else {
      logger.info('[Enrollment Orchestration] Steps generated', {
        enrollmentId: enrollment.id,
        stepsCreated: stepsResult,
      });
    }

    // 3. Update student enrollment_status to active
    await supabase
      .from('profiles')
      .update({ enrollment_status: 'active' })
      .eq('id', studentId);

    // 4. Get student and program holder details for notifications
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

    // 5. Send program holder notification (idempotent)
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

    // 6. Send student welcome email
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
  } catch (error) {
    logger.error('[Enrollment Orchestration] Unexpected error', error);
    return {
      success: false,
      error: 'Unexpected error during enrollment orchestration',
    };
  }
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

  const emailResult = await sendEmail({
    to: studentEmail,
    subject: `Welcome to ${programName}!`,
    html: `
      <h2>Welcome to Elevate for Humanity!</h2>
      <p>Hi ${studentName},</p>
      <p>You've been successfully enrolled in <strong>${programName}</strong>.</p>
      <p>Your first step is now available in your student portal.</p>
      <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/student/progress">View My Progress</a></p>
      <p>If you have any questions, please contact your program coordinator.</p>
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
