/**
 * Canonical Barber Apprenticeship Enrollment State Machine
 * 
 * This is the authoritative backbone for the entire platform.
 * Every API, page, and background job MUST respect this or refuse to run.
 * 
 * ENFORCEMENT RULES:
 * - Every /apprentice/* API must check state server-side
 * - UI guards do NOT count as enforcement
 * - Stripe is the ONLY creator of enrollment records
 * - Timeclock APIs must check: enrollment state, payment state, start date, shop approval
 * - If ANY check fails → 403 with reason logged
 */

// Canonical states
export type EnrollmentState = 
  | 'application_submitted'
  | 'payment_pending'
  | 'enrolled_pending_orientation'
  | 'orientation_complete'
  | 'documents_pending'
  | 'active_enrolled'
  | 'active_in_good_standing'
  | 'payment_hold'
  | 'suspended'
  | 'completed';

// Legacy state mapping for backwards compatibility
export type LegacyEnrollmentState = 
  | 'applied'
  | 'approved'
  | 'confirmed'
  | 'orientation_complete'
  | 'documents_complete'
  | 'active';

export type NextRequiredAction =
  | 'AWAIT_APPROVAL'
  | 'COMPLETE_PAYMENT'
  | 'ORIENTATION'
  | 'DOCUMENTS'
  | 'START_TRAINING'
  | 'CONTINUE_TRAINING'
  | 'UPDATE_PAYMENT'
  | 'CONTACT_ADMIN'
  | 'STATE_BOARD_PREP';

/**
 * Payment grace period in days before timeclock is locked
 */
export const PAYMENT_GRACE_PERIOD_DAYS = 7;

/**
 * Allowed state transitions - the ONLY valid paths through the system
 */
export const ALLOWED_TRANSITIONS: Record<EnrollmentState, EnrollmentState[]> = {
  application_submitted: ['payment_pending'],
  payment_pending: ['enrolled_pending_orientation', 'application_submitted'],
  enrolled_pending_orientation: ['orientation_complete'],
  orientation_complete: ['documents_pending', 'active_enrolled'],
  documents_pending: ['active_enrolled'],
  active_enrolled: ['active_in_good_standing', 'payment_hold', 'suspended', 'completed'],
  active_in_good_standing: ['payment_hold', 'suspended', 'completed', 'active_enrolled'],
  payment_hold: ['active_enrolled', 'active_in_good_standing', 'suspended'],
  suspended: ['active_enrolled', 'active_in_good_standing'],
  completed: [],
};

/**
 * What each state allows and forbids - used for enforcement
 */
export const STATE_PERMISSIONS: Record<EnrollmentState, {
  allowed: string[];
  forbidden: string[];
}> = {
  application_submitted: {
    allowed: ['inquiry_followups', 'staff_review', 'payment_initiation'],
    forbidden: ['enrollment_creation', 'portal_access', 'timeclock', 'milady_provisioning', 'courses'],
  },
  payment_pending: {
    allowed: ['payment_completion', 'abandoned_checkout_recovery'],
    forbidden: ['enrollment_records', 'user_portal', 'orientation', 'document_upload', 'timeclock'],
  },
  enrolled_pending_orientation: {
    allowed: ['enrollment_success_page', 'orientation_access'],
    forbidden: ['document_upload', 'portal', 'timeclock', 'courses', 'hours_logging'],
  },
  orientation_complete: {
    allowed: ['document_upload', 'agreement_generation', 'training_plan_generation'],
    forbidden: ['timeclock', 'hours_logging', 'pwa_checkin', 'courses'],
  },
  documents_pending: {
    allowed: ['upload_documents', 'replace_documents'],
    forbidden: ['portal_access_beyond_documents', 'courses', 'timeclock', 'hours_logging'],
  },
  active_enrolled: {
    allowed: ['apprentice_dashboard', 'courses', 'timeclock_after_start_date', 'milady_access'],
    forbidden: ['clock_in_before_start_date'],
  },
  active_in_good_standing: {
    allowed: ['clock_in', 'pwa_checkin', 'hours_logging', 'full_portal', 'courses', 'milady_access'],
    forbidden: [],
  },
  payment_hold: {
    allowed: ['portal_read_only', 'payment_update', 'view_progress'],
    forbidden: ['timeclock', 'hours_logging', 'new_courses', 'clock_in'],
  },
  suspended: {
    allowed: ['view_only_access', 'admin_remediation', 'contact_support'],
    forbidden: ['timeclock', 'hours_logging', 'courses', 'documents', 'clock_in'],
  },
  completed: {
    allowed: ['state_board_packet', 'transcript_export', 'certificate_download', 'alumni_access'],
    forbidden: ['timeclock', 'new_enrollments', 'hours_logging'],
  },
};

/**
 * Check if a state transition is allowed
 */
export function canTransition(from: EnrollmentState, to: EnrollmentState): boolean {
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
}

/**
 * Check if an action is allowed in the current state
 */
export function isActionAllowed(state: EnrollmentState, action: string): boolean {
  const permissions = STATE_PERMISSIONS[state];
  if (!permissions) return false;
  if (permissions.forbidden.includes(action)) return false;
  return permissions.allowed.includes(action) || permissions.allowed.includes('full_portal');
}

/**
 * Check if an action is explicitly forbidden in the current state
 */
export function isActionForbidden(state: EnrollmentState, action: string): boolean {
  const permissions = STATE_PERMISSIONS[state];
  if (!permissions) return true;
  return permissions.forbidden.includes(action);
}

/**
 * Derive the effective enrollment state from enrollment data
 */
export function deriveEnrollmentState(data: {
  status?: string;
  enrollment_state?: EnrollmentState;
  orientation_completed_at?: string | null;
  documents_submitted_at?: string | null;
  program_start_date?: string | null;
  payment_past_due_days?: number;
  partner_approved?: boolean;
  total_hours?: number;
  coursework_complete?: boolean;
}): EnrollmentState {
  // Use explicit state if set
  if (data.enrollment_state && Object.keys(ALLOWED_TRANSITIONS).includes(data.enrollment_state)) {
    return data.enrollment_state;
  }

  // Derive from data
  if (data.status === 'completed' || 
      (data.total_hours && data.total_hours >= 2000 && data.coursework_complete)) {
    return 'completed';
  }

  if (data.status === 'suspended') {
    return 'suspended';
  }

  if (data.payment_past_due_days && data.payment_past_due_days > PAYMENT_GRACE_PERIOD_DAYS) {
    return 'payment_hold';
  }

  if ((data.status === 'active' || data.status === 'active_enrolled') && data.documents_submitted_at) {
    if (data.partner_approved !== false && 
        (!data.payment_past_due_days || data.payment_past_due_days <= PAYMENT_GRACE_PERIOD_DAYS)) {
      return 'active_in_good_standing';
    }
    return 'active_enrolled';
  }

  if (data.orientation_completed_at && !data.documents_submitted_at) {
    return 'documents_pending';
  }

  if (data.orientation_completed_at) {
    return 'orientation_complete';
  }

  if (data.status === 'enrolled' || data.status === 'confirmed' || data.status === 'enrolled_pending_orientation') {
    return 'enrolled_pending_orientation';
  }

  if (data.status === 'payment_pending') {
    return 'payment_pending';
  }

  return 'application_submitted';
}

/**
 * Get the next required action for a given state
 */
export function getNextRequiredAction(state: EnrollmentState): NextRequiredAction {
  switch (state) {
    case 'application_submitted':
      return 'COMPLETE_PAYMENT';
    case 'payment_pending':
      return 'COMPLETE_PAYMENT';
    case 'enrolled_pending_orientation':
      return 'ORIENTATION';
    case 'orientation_complete':
    case 'documents_pending':
      return 'DOCUMENTS';
    case 'active_enrolled':
    case 'active_in_good_standing':
      return 'CONTINUE_TRAINING';
    case 'payment_hold':
      return 'UPDATE_PAYMENT';
    case 'suspended':
      return 'CONTACT_ADMIN';
    case 'completed':
      return 'STATE_BOARD_PREP';
    default:
      return 'CONTACT_ADMIN';
  }
}

/**
 * Get the route for a given action
 */
export function getActionRoute(action: NextRequiredAction, programSlug?: string): string {
  switch (action) {
    case 'AWAIT_APPROVAL':
      return '/apply/status';
    case 'COMPLETE_PAYMENT':
      return `/programs/${programSlug || 'barber-apprenticeship'}/apply`;
    case 'ORIENTATION':
      return `/programs/${programSlug || 'barber-apprenticeship'}/orientation`;
    case 'DOCUMENTS':
      return `/programs/${programSlug || 'barber-apprenticeship'}/documents`;
    case 'START_TRAINING':
    case 'CONTINUE_TRAINING':
      return '/apprentice';
    case 'UPDATE_PAYMENT':
      return '/apprentice/settings/billing';
    case 'CONTACT_ADMIN':
      return '/contact';
    case 'STATE_BOARD_PREP':
      return '/apprentice/state-board';
    default:
      return '/apprentice';
  }
}

/**
 * Get CTA text for a given action
 */
export function getActionCTA(action: NextRequiredAction): string {
  switch (action) {
    case 'AWAIT_APPROVAL':
      return 'View Status';
    case 'COMPLETE_PAYMENT':
      return 'Complete Enrollment';
    case 'ORIENTATION':
      return 'Start Orientation';
    case 'DOCUMENTS':
      return 'Upload Documents';
    case 'START_TRAINING':
      return 'Start Training';
    case 'CONTINUE_TRAINING':
      return 'Continue Training';
    case 'UPDATE_PAYMENT':
      return 'Update Payment';
    case 'CONTACT_ADMIN':
      return 'Contact Support';
    case 'STATE_BOARD_PREP':
      return 'Prepare for State Board';
    default:
      return 'Continue';
  }
}

/**
 * Get description for a given action
 */
export function getActionDescription(action: NextRequiredAction): string {
  switch (action) {
    case 'AWAIT_APPROVAL':
      return 'Your application is being reviewed.';
    case 'COMPLETE_PAYMENT':
      return 'Complete payment to secure your enrollment.';
    case 'ORIENTATION':
      return 'Complete orientation to unlock your enrollment.';
    case 'DOCUMENTS':
      return 'Upload required documents to activate your enrollment.';
    case 'START_TRAINING':
      return 'Begin your apprenticeship training.';
    case 'CONTINUE_TRAINING':
      return 'Continue your apprenticeship journey.';
    case 'UPDATE_PAYMENT':
      return 'Your payment is past due. Update to continue training.';
    case 'CONTACT_ADMIN':
      return 'Your enrollment requires attention. Contact support.';
    case 'STATE_BOARD_PREP':
      return 'Prepare for your state licensing exam.';
    default:
      return 'Continue with your enrollment.';
  }
}

/**
 * State enforcement error - thrown when state rules are violated
 */
export class StateEnforcementError extends Error {
  public readonly code = 'STATE_ENFORCEMENT_ERROR';
  public readonly httpStatus = 403;
  
  constructor(
    public readonly currentState: EnrollmentState,
    public readonly attemptedAction: string,
    public readonly reason: string
  ) {
    super(`State enforcement failed: ${reason}`);
    this.name = 'StateEnforcementError';
  }

  toJSON() {
    return {
      error: this.message,
      code: this.code,
      current_state: this.currentState,
      attempted_action: this.attemptedAction,
      reason: this.reason,
    };
  }
}

/**
 * State transition record for audit logging
 */
export interface StateTransition {
  enrollment_id: string;
  from_state: EnrollmentState;
  to_state: EnrollmentState;
  reason: string;
  actor_id?: string;
  actor_type: 'system' | 'user' | 'admin' | 'webhook';
  timestamp: string;
  metadata?: Record<string, any>;
}
