import { createClient } from '@/lib/supabase/server';

export type AuditAction = 
  | 'user.login'
  | 'user.logout'
  | 'user.register'
  | 'user.password_reset'
  | 'user.profile_update'
  | 'enrollment.create'
  | 'enrollment.update'
  | 'enrollment.cancel'
  | 'enrollment.complete'
  | 'payment.initiated'
  | 'payment.completed'
  | 'payment.failed'
  | 'payment.refunded'
  | 'document.upload'
  | 'document.delete'
  | 'document.approve'
  | 'document.reject'
  | 'certificate.issued'
  | 'certificate.revoked'
  | 'course.started'
  | 'course.completed'
  | 'lesson.completed'
  | 'quiz.submitted'
  | 'quiz.graded'
  | 'assignment.submitted'
  | 'assignment.graded'
  | 'admin.user_role_change'
  | 'admin.user_suspend'
  | 'admin.user_activate'
  | 'admin.program_update'
  | 'admin.cohort_create'
  | 'admin.cohort_update'
  | 'partner.agreement_signed'
  | 'partner.enrollment_approved'
  | 'partner.enrollment_rejected';

export interface AuditLogEntry {
  action: AuditAction;
  user_id: string;
  target_type?: string;
  target_id?: string;
  metadata?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
}

/**
 * Log an audit event to the database
 */
export async function logAuditEvent(entry: AuditLogEntry): Promise<void> {
  try {
    const supabase = await createClient();
    
    await supabase.from('audit_logs').insert({
      action: entry.action,
      user_id: entry.user_id,
      target_type: entry.target_type,
      target_id: entry.target_id,
      metadata: entry.metadata || {},
      ip_address: entry.ip_address,
      user_agent: entry.user_agent,
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    // Log to console but don't throw - audit logging should not break the app
    console.error('[Audit] Failed to log event:', error);
  }
}

/**
 * Log enrollment-related events
 */
export async function logEnrollmentEvent(
  action: 'enrollment.create' | 'enrollment.update' | 'enrollment.cancel' | 'enrollment.complete',
  userId: string,
  enrollmentId: string,
  metadata?: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    action,
    user_id: userId,
    target_type: 'enrollment',
    target_id: enrollmentId,
    metadata,
  });
}

/**
 * Log payment-related events
 */
export async function logPaymentEvent(
  action: 'payment.initiated' | 'payment.completed' | 'payment.failed' | 'payment.refunded',
  userId: string,
  paymentId: string,
  metadata?: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    action,
    user_id: userId,
    target_type: 'payment',
    target_id: paymentId,
    metadata,
  });
}

/**
 * Log document-related events
 */
export async function logDocumentEvent(
  action: 'document.upload' | 'document.delete' | 'document.approve' | 'document.reject',
  userId: string,
  documentId: string,
  metadata?: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    action,
    user_id: userId,
    target_type: 'document',
    target_id: documentId,
    metadata,
  });
}

/**
 * Log certificate-related events
 */
export async function logCertificateEvent(
  action: 'certificate.issued' | 'certificate.revoked',
  userId: string,
  certificateId: string,
  metadata?: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    action,
    user_id: userId,
    target_type: 'certificate',
    target_id: certificateId,
    metadata,
  });
}

/**
 * Log course progress events
 */
export async function logCourseProgressEvent(
  action: 'course.started' | 'course.completed' | 'lesson.completed',
  userId: string,
  targetId: string,
  metadata?: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    action,
    user_id: userId,
    target_type: action.startsWith('course') ? 'course' : 'lesson',
    target_id: targetId,
    metadata,
  });
}

/**
 * Log admin actions
 */
export async function logAdminAction(
  action: 'admin.user_role_change' | 'admin.user_suspend' | 'admin.user_activate' | 'admin.program_update' | 'admin.cohort_create' | 'admin.cohort_update',
  adminUserId: string,
  targetType: string,
  targetId: string,
  metadata?: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    action,
    user_id: adminUserId,
    target_type: targetType,
    target_id: targetId,
    metadata,
  });
}
