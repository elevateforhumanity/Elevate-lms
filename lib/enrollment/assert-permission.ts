/**
 * assertEnrollmentPermission - Single Source of Truth
 * 
 * This is the ONLY function that decides if a user can perform an action.
 * All protected routes MUST call this before doing anything.
 * 
 * NO UI LOGIC. NO ROUTE-LEVEL "IFS". ALL JUDGMENT LIVES HERE.
 */

import { createAdminClient } from '@/lib/supabase/admin';
import { 
  EnrollmentAction, 
  DenialReason,
  isTimeclockAction,
  isAllowedDuringPaymentHold,
  isAllowedWhenSuspended,
  isAllowedWhenCompleted,
} from './actions';
import { 
  EnrollmentState, 
  deriveEnrollmentState,
  PAYMENT_GRACE_PERIOD_DAYS,
} from './state-machine';

/**
 * Context for permission check
 */
export interface PermissionContext {
  /** Partner organization ID for timeclock actions */
  partnerId?: string;
  /** Shop/site ID for timeclock actions (checked separately from partner) */
  shopId?: string;
  /** Program slug (defaults to barber-apprenticeship) */
  programSlug?: string;
  /** Additional metadata */
  metadata?: Record<string, any>;
}

/**
 * Permission result - either allowed or denied with reason
 */
export interface PermissionResult {
  allowed: boolean;
  reason?: DenialReason;
  message?: string;
  state?: EnrollmentState;
  /** Additional data for the caller */
  data?: {
    enrollment?: any;
    apprentice?: any;
    paymentStatus?: {
      current: boolean;
      daysPastDue: number;
    };
    startDate?: {
      reached: boolean;
      date?: string;
      daysUntil?: number;
    };
    partner?: {
      approved: boolean;
      name?: string;
    };
    // Override fields (when override is applied)
    override_applied?: boolean;
    override_id?: string;
    override_expires?: string;
    override_reason?: string;
    // Additional context fields
    [key: string]: any;
  };
}

/**
 * Denial messages for each reason code
 */
const DENIAL_MESSAGES: Record<DenialReason, string> = {
  [DenialReason.NO_ENROLLMENT]: 'No enrollment found. Please complete enrollment first.',
  [DenialReason.PAYMENT_REQUIRED]: 'Payment required to continue.',
  [DenialReason.PAYMENT_PENDING]: 'Payment is being processed. Please wait.',
  [DenialReason.ORIENTATION_REQUIRED]: 'Please complete orientation first.',
  [DenialReason.ORIENTATION_INCOMPLETE]: 'Orientation not completed.',
  [DenialReason.DOCUMENTS_REQUIRED]: 'Please upload required documents.',
  [DenialReason.DOCUMENTS_MISSING]: 'Required documents not submitted.',
  [DenialReason.START_DATE_NOT_REACHED]: 'Training has not started yet.',
  [DenialReason.START_DATE_MISSING]: 'Program start date not set. Please contact support.',
  [DenialReason.START_DATE_INVALID]: 'Invalid program start date. Please contact support.',
  [DenialReason.PAYMENT_PAST_DUE]: 'Payment is past due. Please update your payment method.',
  [DenialReason.PAYMENT_HOLD]: 'Account on payment hold.',
  [DenialReason.PARTNER_NOT_APPROVED]: 'Training partner is not active.',
  [DenialReason.SHOP_NOT_APPROVED]: 'Training site not approved.',
  [DenialReason.ENROLLMENT_SUSPENDED]: 'Enrollment is suspended. Please contact support.',
  [DenialReason.ENROLLMENT_COMPLETED]: 'Program is complete. This action is no longer available.',
  [DenialReason.ACTION_NOT_ALLOWED]: 'This action is not allowed in your current state.',
  [DenialReason.STATE_VIOLATION]: 'State violation. Action not permitted.',
};

/**
 * Assert that a user has permission to perform an action.
 * 
 * This is the SINGLE SOURCE OF TRUTH for all permission checks.
 * 
 * @param userId - The user ID to check
 * @param action - The action being attempted (from EnrollmentAction enum)
 * @param context - Additional context (partnerId, programSlug, etc.)
 * @returns PermissionResult with allowed/denied and reason
 */
export async function assertEnrollmentPermission(
  userId: string,
  action: EnrollmentAction,
  context: PermissionContext = {}
): Promise<PermissionResult> {
  const supabase = createAdminClient();
  
  if (!supabase) {
    return deny(DenialReason.ACTION_NOT_ALLOWED, 'Service unavailable');
  }

  const programSlug = context.programSlug || 'barber-apprenticeship';

  // ═══════════════════════════════════════════════════════════════════════
  // STEP 1: Load enrollment data with program_type
  // ═══════════════════════════════════════════════════════════════════════
  
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
      created_at,
      program_id,
      programs:program_id (
        id,
        program_type
      )
    `)
    .eq('student_id', userId)
    .eq('program_slug', programSlug)
    .maybeSingle();

  // Fallback to enrollments table
  const { data: enrollmentFallback } = !enrollment ? await supabase
    .from('enrollments')
    .select(`
      id,
      user_id,
      status,
      enrollment_state,
      orientation_completed_at,
      documents_submitted_at,
      program_slug
    `)
    .eq('user_id', userId)
    .maybeSingle() : { data: null };

  const activeEnrollment = enrollment || enrollmentFallback;

  // ═══════════════════════════════════════════════════════════════════════
  // STEP 2: No enrollment = deny most actions
  // ═══════════════════════════════════════════════════════════════════════
  
  if (!activeEnrollment) {
    // Only VIEW_APPLICATION is allowed without enrollment
    if (action === EnrollmentAction.VIEW_APPLICATION) {
      return allow();
    }
    return deny(DenialReason.NO_ENROLLMENT);
  }

  // ═══════════════════════════════════════════════════════════════════════
  // STEP 2.5: Program type enforcement (HARD GATE)
  // external_lms_wrapped programs CANNOT use timeclock/hours/placements
  // ═══════════════════════════════════════════════════════════════════════
  
  const programType = (enrollment as any)?.programs?.program_type || 'internal_apprenticeship';
  
  if (programType === 'external_lms_wrapped') {
    // HVAC and similar programs - NO hours, NO timeclock, NO placements
    if (isTimeclockAction(action)) {
      return deny(
        DenialReason.ACTION_NOT_ALLOWED,
        'Hours logging is not available for this program type. Complete your coursework through the external LMS.',
        undefined,
        { program_type: programType, blocked_reason: 'external_lms_wrapped' }
      );
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // STEP 3: Load apprentice record
  // ═══════════════════════════════════════════════════════════════════════
  
  const { data: apprentice } = await supabase
    .from('apprentices')
    .select('id, user_id, status, start_date, total_hours')
    .eq('user_id', userId)
    .maybeSingle();

  // ═══════════════════════════════════════════════════════════════════════
  // STEP 4: Load payment status
  // ═══════════════════════════════════════════════════════════════════════
  
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

  const paymentCurrent = paymentPastDueDays <= PAYMENT_GRACE_PERIOD_DAYS;

  // ═══════════════════════════════════════════════════════════════════════
  // STEP 5: Load partner/shop approval status (for timeclock actions)
  // Schema notes:
  //   - partners.status: 'active' | 'inactive' | 'suspended' (active = operational, NOT approval)
  //   - barber_shops.is_approved: boolean (explicit approval flag)
  // ═══════════════════════════════════════════════════════════════════════
  
  let partnerApproved = true;
  let shopApproved = true;
  let partnerName: string | undefined;
  let shopName: string | undefined;
  
  if (context.partnerId && isTimeclockAction(action)) {
    // Check partners table - must be 'active' (not suspended/inactive)
    const { data: partner } = await supabase
      .from('partners')
      .select('id, status, name')
      .eq('id', context.partnerId)
      .maybeSingle();

    if (partner) {
      // Partner must be active (not suspended/inactive) to allow timeclock
      partnerApproved = partner.status === 'active';
      partnerName = partner.name;
    } else {
      // partnerId not found in partners table - data integrity issue
      partnerApproved = false;
      console.error(`[enforcement] Partner not found: ${context.partnerId}`);
    }
  }

  // Check shop approval separately (if shopId provided)
  if (context.shopId && isTimeclockAction(action)) {
    const { data: shop } = await supabase
      .from('barber_shops')
      .select('id, is_approved, name')
      .eq('id', context.shopId)
      .maybeSingle();

    if (shop) {
      // Shop must be explicitly approved (is_approved = true)
      shopApproved = shop.is_approved === true;
      shopName = shop.name;
    } else {
      // shopId not found - data integrity issue
      shopApproved = false;
      console.error(`[enforcement] Shop not found: ${context.shopId}`);
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // STEP 6: Derive current state
  // ═══════════════════════════════════════════════════════════════════════
  
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

  // ═══════════════════════════════════════════════════════════════════════
  // STEP 7: Check start date (for timeclock actions)
  // ═══════════════════════════════════════════════════════════════════════
  
  const startDate = enrollment?.program_start_date || apprentice?.start_date;
  let startDateReached = true;
  let daysUntilStart = 0;
  let startDateValid = true;
  let startDateError: string | undefined;

  let startDateReasonCode: DenialReason = DenialReason.START_DATE_NOT_REACHED;
  
  if (isTimeclockAction(action) || action === EnrollmentAction.VIEW_TIMECLOCK_CONTEXT) {
    if (!startDate) {
      // Start date is missing - data integrity issue
      startDateValid = false;
      startDateReached = false;
      startDateReasonCode = DenialReason.START_DATE_MISSING;
      startDateError = DENIAL_MESSAGES[DenialReason.START_DATE_MISSING];
      console.error(`[enforcement] Missing start_date for user: ${userId}`);
    } else {
      const start = new Date(startDate);
      
      // Validate the date is parseable
      if (isNaN(start.getTime())) {
        startDateValid = false;
        startDateReached = false;
        startDateReasonCode = DenialReason.START_DATE_INVALID;
        startDateError = DENIAL_MESSAGES[DenialReason.START_DATE_INVALID];
        console.error(`[enforcement] Invalid start_date format: ${startDate} for user: ${userId}`);
      } else {
        const now = new Date();
        startDateReached = now >= start;
        
        if (!startDateReached) {
          const diff = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          daysUntilStart = diff;
          startDateReasonCode = DenialReason.START_DATE_NOT_REACHED;
        }
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  // STEP 8: Build result data
  // ═══════════════════════════════════════════════════════════════════════
  
  const resultData = {
    enrollment: activeEnrollment,
    apprentice,
    paymentStatus: {
      current: paymentCurrent,
      daysPastDue: paymentPastDueDays,
    },
    startDate: {
      reached: startDateReached,
      date: startDate,
      daysUntil: daysUntilStart,
    },
    partner: {
      approved: partnerApproved,
      name: partnerName,
    },
  };

  // ═══════════════════════════════════════════════════════════════════════
  // STEP 9: Apply enforcement rules based on state
  // ═══════════════════════════════════════════════════════════════════════

  // --- SUSPENDED STATE ---
  // TODO: Add separate has_open_violation or hold_reason field to handle multiple
  // simultaneous holds. Currently relies on enrollment_state='suspended' only.
  // Future: Check suspension_flags table or has_violation boolean field.
  if (currentState === 'suspended') {
    if (isAllowedWhenSuspended(action)) {
      return allow(currentState, resultData);
    }
    return deny(DenialReason.ENROLLMENT_SUSPENDED, undefined, currentState, resultData);
  }

  // --- COMPLETED STATE ---
  if (currentState === 'completed') {
    if (isAllowedWhenCompleted(action)) {
      return allow(currentState, resultData);
    }
    return deny(DenialReason.ENROLLMENT_COMPLETED, undefined, currentState, resultData);
  }

  // --- PAYMENT HOLD STATE ---
  if (currentState === 'payment_hold') {
    // POLICY: Allow clock_out if session is open (don't trap mid-shift)
    if (action === EnrollmentAction.CLOCK_OUT || action === EnrollmentAction.PWA_CHECKOUT) {
      // Check if there's an open session
      const { data: openSession } = await supabase
        .from('progress_entries')
        .select('id')
        .eq('apprentice_id', resultData.apprentice?.id)
        .is('clock_out', null)
        .maybeSingle();
      
      if (openSession) {
        return allow(currentState, { ...resultData, payment_hold_clock_out: true });
      }
    }
    
    if (isAllowedDuringPaymentHold(action)) {
      return allow(currentState, resultData);
    }
    return deny(
      DenialReason.PAYMENT_HOLD, 
      `Payment is ${paymentPastDueDays} days past due. Please update your payment method.`,
      currentState,
      resultData
    );
  }

  // --- APPLICATION SUBMITTED ---
  if (currentState === 'application_submitted') {
    if (action === EnrollmentAction.VIEW_APPLICATION) {
      return allow(currentState, resultData);
    }
    return deny(DenialReason.PAYMENT_REQUIRED, undefined, currentState, resultData);
  }

  // --- PAYMENT PENDING ---
  if (currentState === 'payment_pending') {
    if (action === EnrollmentAction.VIEW_APPLICATION || action === EnrollmentAction.UPDATE_PAYMENT) {
      return allow(currentState, resultData);
    }
    return deny(DenialReason.PAYMENT_PENDING, undefined, currentState, resultData);
  }

  // --- ENROLLED PENDING ORIENTATION ---
  if (currentState === 'enrolled_pending_orientation') {
    if (action === EnrollmentAction.ACCESS_ORIENTATION || 
        action === EnrollmentAction.COMPLETE_ORIENTATION ||
        action === EnrollmentAction.VIEW_APPLICATION) {
      return allow(currentState, resultData);
    }
    return deny(DenialReason.ORIENTATION_REQUIRED, undefined, currentState, resultData);
  }

  // --- ORIENTATION COMPLETE / DOCUMENTS PENDING ---
  if (currentState === 'orientation_complete' || currentState === 'documents_pending') {
    if (action === EnrollmentAction.UPLOAD_DOCUMENT ||
        action === EnrollmentAction.SUBMIT_DOCUMENTS ||
        action === EnrollmentAction.VIEW_APPLICATION ||
        action === EnrollmentAction.VIEW_PROGRESS) {
      return allow(currentState, resultData);
    }
    return deny(DenialReason.DOCUMENTS_REQUIRED, undefined, currentState, resultData);
  }

  // --- ACTIVE ENROLLED / ACTIVE IN GOOD STANDING ---
  if (currentState === 'active_enrolled' || currentState === 'active_in_good_standing') {
    
    // Timeclock actions need extra checks
    if (isTimeclockAction(action)) {
      // Check start date validity and whether it's reached
      if (!startDateValid) {
        // Invalid or missing start date - data integrity issue
        return deny(
          startDateReasonCode, // START_DATE_MISSING or START_DATE_INVALID
          startDateError || 'Program start date issue. Please contact support.',
          currentState,
          resultData
        );
      }
      
      if (!startDateReached) {
        return deny(
          DenialReason.START_DATE_NOT_REACHED, // Date exists but is in the future
          `Training starts on ${new Date(startDate!).toLocaleDateString()}. ${daysUntilStart} days remaining.`,
          currentState,
          resultData
        );
      }

      // Check payment
      if (!paymentCurrent) {
        return deny(
          DenialReason.PAYMENT_PAST_DUE,
          `Payment is ${paymentPastDueDays} days past due.`,
          currentState,
          resultData
        );
      }

      // Check partner approval (partner organization must be active)
      if (context.partnerId && !partnerApproved) {
        // POLICY: Allow clock_out if session is open (don't trap mid-shift)
        if (action === EnrollmentAction.CLOCK_OUT || action === EnrollmentAction.PWA_CHECKOUT) {
          const { data: openSession } = await supabase
            .from('progress_entries')
            .select('id, partner_id')
            .eq('apprentice_id', resultData.apprentice?.id)
            .eq('partner_id', context.partnerId)
            .is('clock_out', null)
            .maybeSingle();
          
          if (openSession) {
            return allow(currentState, { 
              ...resultData, 
              partner_deactivated_clock_out: true,
              warning: 'Partner status changed - contact coordinator for future shifts'
            });
          }
        }
        
        return deny(
          DenialReason.PARTNER_NOT_APPROVED,
          `Training partner "${partnerName || 'Unknown'}" is not active.`,
          currentState,
          resultData
        );
      }

      // Check shop approval separately (shop must be explicitly approved)
      if (context.shopId && !shopApproved) {
        // POLICY: Allow clock_out if session is open (don't trap mid-shift)
        if (action === EnrollmentAction.CLOCK_OUT || action === EnrollmentAction.PWA_CHECKOUT) {
          const { data: openSession } = await supabase
            .from('progress_entries')
            .select('id')
            .eq('apprentice_id', resultData.apprentice?.id)
            .is('clock_out', null)
            .maybeSingle();
          
          if (openSession) {
            return allow(currentState, { 
              ...resultData, 
              shop_deactivated_clock_out: true,
              warning: 'Shop approval status changed - contact coordinator for future shifts'
            });
          }
        }
        
        return deny(
          DenialReason.SHOP_NOT_APPROVED,
          `Training site "${shopName || 'Unknown'}" is not approved for apprenticeship hours.`,
          currentState,
          resultData
        );
      }
    }

    // All other actions allowed in active state
    return allow(currentState, resultData);
  }

  // --- DEFAULT: Deny unknown states ---
  return deny(DenialReason.STATE_VIOLATION, `Unknown state: ${currentState}`, currentState, resultData);
}

/**
 * Check if there's an active override for this user and action
 */
async function checkOverride(
  supabase: any,
  userId: string,
  action: EnrollmentAction
): Promise<{ hasOverride: boolean; override?: any }> {
  try {
    const { data: override } = await supabase
      .from('enrollment_overrides')
      .select('*')
      .eq('user_id', userId)
      .eq('action', action)
      .eq('active', true)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    return {
      hasOverride: !!override,
      override,
    };
  } catch {
    return { hasOverride: false };
  }
}

/**
 * Assert permission with override support
 * Overrides are checked AFTER core compliance checks (not before)
 * Overrides CANNOT bypass: start date, shop approval, orientation, documents
 */
export async function assertEnrollmentPermissionWithOverride(
  userId: string,
  action: EnrollmentAction,
  context: PermissionContext = {}
): Promise<PermissionResult> {
  // First, run the standard permission check
  const result = await assertEnrollmentPermission(userId, action, context);

  // If allowed, no need to check override
  if (result.allowed) {
    return result;
  }

  // Check if the denial reason can be overridden
  const NON_OVERRIDABLE_REASONS = [
    DenialReason.START_DATE_NOT_REACHED,
    DenialReason.PARTNER_NOT_APPROVED,
    DenialReason.SHOP_NOT_APPROVED,
    DenialReason.ORIENTATION_REQUIRED,
    DenialReason.ORIENTATION_INCOMPLETE,
    DenialReason.DOCUMENTS_REQUIRED,
    DenialReason.DOCUMENTS_MISSING,
  ];

  if (result.reason && NON_OVERRIDABLE_REASONS.includes(result.reason)) {
    // Cannot override compliance-critical denials
    return result;
  }

  // Check for active override
  const supabase = createAdminClient();
  if (!supabase) return result;

  const { hasOverride, override } = await checkOverride(supabase, userId, action);

  if (hasOverride && override) {
    // Override found - allow the action
    return {
      allowed: true,
      state: result.state,
      data: {
        ...result.data,
        override_applied: true,
        override_id: override.id,
        override_expires: override.expires_at,
        override_reason: override.reason,
      },
    };
  }

  // No override - return original denial
  return result;
}

/**
 * Helper to create an allow result
 */
function allow(state?: EnrollmentState, data?: any): PermissionResult {
  return {
    allowed: true,
    state,
    data,
  };
}

/**
 * Helper to create a deny result
 */
function deny(
  reason: DenialReason, 
  customMessage?: string,
  state?: EnrollmentState,
  data?: any
): PermissionResult {
  return {
    allowed: false,
    reason,
    message: customMessage || DENIAL_MESSAGES[reason],
    state,
    data,
  };
}

/**
 * Log a permission check for audit trail
 */
export async function logPermissionCheck(
  userId: string,
  action: EnrollmentAction,
  result: PermissionResult,
  context?: PermissionContext
) {
  const supabase = createAdminClient();
  if (!supabase) return;

  try {
    await supabase.from('enrollment_state_audit').insert({
      user_id: userId,
      event_type: result.allowed ? 'permission_granted' : 'permission_denied',
      current_state: result.state,
      attempted_action: action,
      timestamp: new Date().toISOString(),
      details: {
        allowed: result.allowed,
        reason: result.reason,
        message: result.message,
        // Program type for multi-program audit trail
        program_type: result.data?.program_type,
        program_slug: context?.programSlug,
        // Additional context
        partner_id: context?.partnerId,
        shop_id: context?.shopId,
        context,
      },
    });
  } catch (err) {
    console.error('[Permission Audit] Failed to log:', err);
  }
}
