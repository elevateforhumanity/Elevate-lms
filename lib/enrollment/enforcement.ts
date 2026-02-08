/**
 * Enrollment State Enforcement
 * 
 * Server-side enforcement middleware for all apprentice routes.
 * This is NOT optional. Every API must use this.
 * 
 * Usage:
 *   const enforcement = await enforceEnrollmentState(userId, 'timeclock');
 *   if (!enforcement.allowed) {
 *     return NextResponse.json(enforcement.error, { status: 403 });
 *   }
 */

import { createAdminClient } from '@/lib/supabase/admin';
import { 
  EnrollmentState, 
  deriveEnrollmentState, 
  isActionForbidden,
  PAYMENT_GRACE_PERIOD_DAYS,
  StateEnforcementError 
} from './state-machine';

export interface EnforcementResult {
  allowed: boolean;
  state: EnrollmentState;
  error?: {
    error: string;
    code: string;
    current_state: EnrollmentState;
    attempted_action: string;
    reason: string;
  };
  enrollment?: any;
  apprentice?: any;
  paymentStatus?: {
    current: boolean;
    days_past_due: number;
    grace_period: number;
  };
  partnerStatus?: {
    approved: boolean;
    partner_id?: string;
    partner_name?: string;
  };
  startDateStatus?: {
    started: boolean;
    start_date?: string;
    days_until_start?: number;
  };
}

/**
 * Actions that require specific enforcement checks
 */
export type EnforcedAction = 
  | 'portal_access'
  | 'timeclock'
  | 'clock_in'
  | 'hours_logging'
  | 'courses'
  | 'documents'
  | 'orientation'
  | 'milady_access'
  | 'state_board';

/**
 * Enforce enrollment state for a given user and action
 * 
 * This is the SINGLE source of truth for access control.
 * Call this at the START of every /apprentice/* API handler.
 */
export async function enforceEnrollmentState(
  userId: string,
  action: EnforcedAction,
  options?: {
    partnerId?: string;
    requireStartDate?: boolean;
  }
): Promise<EnforcementResult> {
  const supabase = createAdminClient();
  
  if (!supabase) {
    return {
      allowed: false,
      state: 'application_submitted',
      error: {
        error: 'Service unavailable',
        code: 'SERVICE_UNAVAILABLE',
        current_state: 'application_submitted',
        attempted_action: action,
        reason: 'Database not configured',
      },
    };
  }

  // 1. Get enrollment data
  const { data: enrollment } = await supabase
    .from('student_enrollments')
    .select(`
      id,
      student_id,
      status,
      enrollment_state,
      program_slug,
      orientation_completed_at,
      documents_submitted_at,
      program_start_date,
      milady_enrolled,
      created_at
    `)
    .eq('student_id', userId)
    .eq('program_slug', 'barber-apprenticeship')
    .maybeSingle();

  // Fallback to enrollments table
  const { data: enrollmentFallback } = !enrollment ? await supabase
    .from('enrollments')
    .select(`
      id,
      user_id,
      status,
      orientation_completed_at,
      documents_submitted_at,
      program_slug
    `)
    .eq('user_id', userId)
    .maybeSingle() : { data: null };

  const activeEnrollment = enrollment || enrollmentFallback;

  if (!activeEnrollment) {
    return {
      allowed: false,
      state: 'application_submitted',
      error: {
        error: 'No enrollment found',
        code: 'NO_ENROLLMENT',
        current_state: 'application_submitted',
        attempted_action: action,
        reason: 'You must complete enrollment before accessing this feature.',
      },
    };
  }

  // 2. Get apprentice record
  const { data: apprentice } = await supabase
    .from('apprentices')
    .select('id, user_id, status, start_date, total_hours')
    .eq('user_id', userId)
    .maybeSingle();

  // 3. Get payment status
  let paymentPastDueDays = 0;
  const { data: subscription } = await supabase
    .from('barber_subscriptions')
    .select('id, status, past_due_since')
    .eq('user_id', userId)
    .maybeSingle();

  if (subscription?.past_due_since) {
    paymentPastDueDays = Math.floor(
      (Date.now() - new Date(subscription.past_due_since).getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  // 4. Get partner status if needed
  let partnerApproved = true;
  let partnerInfo: { partner_id?: string; partner_name?: string } = {};
  
  if (options?.partnerId) {
    const { data: partner } = await supabase
      .from('partners')
      .select('id, status, name')
      .eq('id', options.partnerId)
      .single();

    partnerApproved = partner?.status === 'approved';
    partnerInfo = { partner_id: partner?.id, partner_name: partner?.name };
  }

  // 5. Derive current state
  const currentState = deriveEnrollmentState({
    status: activeEnrollment.status,
    enrollment_state: activeEnrollment.enrollment_state as EnrollmentState,
    orientation_completed_at: activeEnrollment.orientation_completed_at,
    documents_submitted_at: activeEnrollment.documents_submitted_at,
    program_start_date: enrollment?.program_start_date || apprentice?.start_date,
    payment_past_due_days: paymentPastDueDays,
    partner_approved: partnerApproved,
    total_hours: apprentice?.total_hours,
  });

  // 6. Check if action is forbidden in current state
  if (isActionForbidden(currentState, action)) {
    await logEnforcementFailure(supabase, userId, currentState, action);
    
    return {
      allowed: false,
      state: currentState,
      enrollment: activeEnrollment,
      apprentice,
      error: {
        error: getEnforcementErrorMessage(currentState, action),
        code: 'STATE_ENFORCEMENT_ERROR',
        current_state: currentState,
        attempted_action: action,
        reason: getEnforcementReason(currentState, action),
      },
      paymentStatus: {
        current: paymentPastDueDays <= PAYMENT_GRACE_PERIOD_DAYS,
        days_past_due: paymentPastDueDays,
        grace_period: PAYMENT_GRACE_PERIOD_DAYS,
      },
    };
  }

  // 7. Additional checks for timeclock/clock_in
  if (action === 'timeclock' || action === 'clock_in' || action === 'hours_logging') {
    // Check start date
    const startDate = enrollment?.program_start_date || apprentice?.start_date;
    if (startDate && new Date() < new Date(startDate)) {
      const daysUntilStart = Math.ceil(
        (new Date(startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      
      return {
        allowed: false,
        state: currentState,
        enrollment: activeEnrollment,
        apprentice,
        error: {
          error: `Training has not started yet. Your start date is ${new Date(startDate).toLocaleDateString()}.`,
          code: 'START_DATE_NOT_REACHED',
          current_state: currentState,
          attempted_action: action,
          reason: `Training begins in ${daysUntilStart} days.`,
        },
        startDateStatus: {
          started: false,
          start_date: startDate,
          days_until_start: daysUntilStart,
        },
      };
    }

    // Check payment
    if (paymentPastDueDays > PAYMENT_GRACE_PERIOD_DAYS) {
      return {
        allowed: false,
        state: 'payment_hold',
        enrollment: activeEnrollment,
        apprentice,
        error: {
          error: `Payment is ${paymentPastDueDays} days past due. Please update your payment method.`,
          code: 'PAYMENT_PAST_DUE',
          current_state: 'payment_hold',
          attempted_action: action,
          reason: `Payment grace period of ${PAYMENT_GRACE_PERIOD_DAYS} days exceeded.`,
        },
        paymentStatus: {
          current: false,
          days_past_due: paymentPastDueDays,
          grace_period: PAYMENT_GRACE_PERIOD_DAYS,
        },
      };
    }

    // Check partner approval
    if (options?.partnerId && !partnerApproved) {
      return {
        allowed: false,
        state: currentState,
        enrollment: activeEnrollment,
        apprentice,
        error: {
          error: 'This training site is not currently approved.',
          code: 'PARTNER_NOT_APPROVED',
          current_state: currentState,
          attempted_action: action,
          reason: 'Only approved partner shops can log training hours.',
        },
        partnerStatus: {
          approved: false,
          ...partnerInfo,
        },
      };
    }
  }

  // 8. All checks passed
  return {
    allowed: true,
    state: currentState,
    enrollment: activeEnrollment,
    apprentice,
    paymentStatus: {
      current: paymentPastDueDays <= PAYMENT_GRACE_PERIOD_DAYS,
      days_past_due: paymentPastDueDays,
      grace_period: PAYMENT_GRACE_PERIOD_DAYS,
    },
    partnerStatus: {
      approved: partnerApproved,
      ...partnerInfo,
    },
    startDateStatus: {
      started: true,
    },
  };
}

/**
 * Get user-friendly error message for enforcement failure
 */
function getEnforcementErrorMessage(state: EnrollmentState, action: string): string {
  switch (state) {
    case 'application_submitted':
      return 'Please complete your enrollment payment first.';
    case 'payment_pending':
      return 'Your payment is being processed. Please wait or try again.';
    case 'enrolled_pending_orientation':
      return 'Please complete orientation before accessing this feature.';
    case 'orientation_complete':
    case 'documents_pending':
      return 'Please upload required documents to activate your enrollment.';
    case 'payment_hold':
      return 'Your payment is past due. Please update your payment method.';
    case 'suspended':
      return 'Your enrollment is suspended. Please contact support.';
    case 'completed':
      return 'Your program is complete. This feature is no longer available.';
    default:
      return 'Access denied. Please contact support.';
  }
}

/**
 * Get detailed reason for enforcement failure
 */
function getEnforcementReason(state: EnrollmentState, action: string): string {
  switch (state) {
    case 'application_submitted':
      return 'Enrollment not created. Payment required.';
    case 'payment_pending':
      return 'Payment not confirmed. Waiting for Stripe webhook.';
    case 'enrolled_pending_orientation':
      return 'Orientation not completed. Required before portal access.';
    case 'orientation_complete':
    case 'documents_pending':
      return 'Documents not submitted. Required for active enrollment.';
    case 'payment_hold':
      return `Payment past due beyond ${PAYMENT_GRACE_PERIOD_DAYS}-day grace period.`;
    case 'suspended':
      return 'Enrollment suspended by administrator.';
    case 'completed':
      return 'Program completed. Feature disabled.';
    default:
      return 'Unknown state violation.';
  }
}

/**
 * Log enforcement failure for audit trail
 */
async function logEnforcementFailure(
  supabase: any,
  userId: string,
  state: EnrollmentState,
  action: string
) {
  try {
    await supabase.from('enrollment_state_audit').insert({
      user_id: userId,
      event_type: 'enforcement_failure',
      current_state: state,
      attempted_action: action,
      timestamp: new Date().toISOString(),
      details: {
        reason: getEnforcementReason(state, action),
      },
    });
  } catch (err) {
    // Don't fail the request if audit logging fails
    console.error('[Enforcement] Failed to log audit:', err);
  }
}

/**
 * Log successful state transition for audit trail
 */
export async function logStateTransition(
  userId: string,
  fromState: EnrollmentState,
  toState: EnrollmentState,
  reason: string,
  actorType: 'system' | 'user' | 'admin' | 'webhook',
  actorId?: string,
  metadata?: Record<string, any>
) {
  const supabase = createAdminClient();
  if (!supabase) return;

  try {
    await supabase.from('enrollment_state_audit').insert({
      user_id: userId,
      event_type: 'state_transition',
      from_state: fromState,
      to_state: toState,
      reason,
      actor_type: actorType,
      actor_id: actorId,
      timestamp: new Date().toISOString(),
      details: metadata,
    });
  } catch (err) {
    console.error('[Enforcement] Failed to log state transition:', err);
  }
}
