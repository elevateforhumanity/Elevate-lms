/**
 * ENROLLMENT_ACTIONS - Canonical Action Enum
 * 
 * This is the ONLY list of actions that can be performed.
 * If an action isn't defined here, it does not exist.
 * 
 * DO NOT add actions without updating the enforcement rules.
 * DO NOT pass arbitrary strings - use these enums.
 */

export enum EnrollmentAction {
  // ═══════════════════════════════════════════════════════════════════════
  // ONBOARDING ACTIONS
  // ═══════════════════════════════════════════════════════════════════════
  
  /** View application status */
  VIEW_APPLICATION = 'VIEW_APPLICATION',
  
  /** Access orientation content */
  ACCESS_ORIENTATION = 'ACCESS_ORIENTATION',
  
  /** Complete orientation (submit acknowledgment) */
  COMPLETE_ORIENTATION = 'COMPLETE_ORIENTATION',
  
  /** Upload a document */
  UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT',
  
  /** Submit all documents (finalize onboarding) */
  SUBMIT_DOCUMENTS = 'SUBMIT_DOCUMENTS',

  // ═══════════════════════════════════════════════════════════════════════
  // PORTAL ACTIONS
  // ═══════════════════════════════════════════════════════════════════════
  
  /** Access apprentice dashboard */
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',
  
  /** View progress and hours summary */
  VIEW_PROGRESS = 'VIEW_PROGRESS',
  
  /** Access course content */
  ACCESS_COURSES = 'ACCESS_COURSES',
  
  /** Access Milady training */
  ACCESS_MILADY = 'ACCESS_MILADY',
  
  /** View handbook */
  VIEW_HANDBOOK = 'VIEW_HANDBOOK',
  
  /** Access state board prep */
  ACCESS_STATE_BOARD = 'ACCESS_STATE_BOARD',

  // ═══════════════════════════════════════════════════════════════════════
  // TIMECLOCK ACTIONS (Legally Sensitive)
  // ═══════════════════════════════════════════════════════════════════════
  
  /** View timeclock context (eligibility check, does not perform action) */
  VIEW_TIMECLOCK_CONTEXT = 'VIEW_TIMECLOCK_CONTEXT',
  
  /** Clock in to start shift */
  CLOCK_IN = 'CLOCK_IN',
  
  /** Clock out to end shift */
  CLOCK_OUT = 'CLOCK_OUT',
  
  /** Start lunch break */
  START_LUNCH = 'START_LUNCH',
  
  /** End lunch break */
  END_LUNCH = 'END_LUNCH',
  
  /** PWA check-in with code */
  PWA_CHECKIN = 'PWA_CHECKIN',
  
  /** PWA check-out */
  PWA_CHECKOUT = 'PWA_CHECKOUT',
  
  /** Log hours manually */
  LOG_HOURS = 'LOG_HOURS',

  // ═══════════════════════════════════════════════════════════════════════
  // COMPLETION ACTIONS
  // ═══════════════════════════════════════════════════════════════════════
  
  /** Generate completion packet */
  GENERATE_COMPLETION_PACKET = 'GENERATE_COMPLETION_PACKET',
  
  /** Download transcript */
  DOWNLOAD_TRANSCRIPT = 'DOWNLOAD_TRANSCRIPT',
  
  /** Access alumni features */
  ACCESS_ALUMNI = 'ACCESS_ALUMNI',

  // ═══════════════════════════════════════════════════════════════════════
  // PAYMENT ACTIONS
  // ═══════════════════════════════════════════════════════════════════════
  
  /** Update payment method */
  UPDATE_PAYMENT = 'UPDATE_PAYMENT',
  
  /** View billing history */
  VIEW_BILLING = 'VIEW_BILLING',
}

/**
 * Denial reason codes - specific, auditable reasons for access denial
 */
export enum DenialReason {
  // Enrollment state issues
  NO_ENROLLMENT = 'NO_ENROLLMENT',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  ORIENTATION_REQUIRED = 'ORIENTATION_REQUIRED',
  ORIENTATION_INCOMPLETE = 'ORIENTATION_INCOMPLETE',
  DOCUMENTS_REQUIRED = 'DOCUMENTS_REQUIRED',
  DOCUMENTS_MISSING = 'DOCUMENTS_MISSING',
  
  // Active enrollment issues - start date
  START_DATE_NOT_REACHED = 'START_DATE_NOT_REACHED',  // Date exists but is in the future
  START_DATE_MISSING = 'START_DATE_MISSING',          // Date is null/not set
  START_DATE_INVALID = 'START_DATE_INVALID',          // Date exists but is malformed/unparseable
  
  // Active enrollment issues - payment
  PAYMENT_PAST_DUE = 'PAYMENT_PAST_DUE',
  PAYMENT_HOLD = 'PAYMENT_HOLD',
  
  // Partner/shop issues
  PARTNER_NOT_APPROVED = 'PARTNER_NOT_APPROVED',
  SHOP_NOT_APPROVED = 'SHOP_NOT_APPROVED',
  
  // Status issues
  ENROLLMENT_SUSPENDED = 'ENROLLMENT_SUSPENDED',
  ENROLLMENT_COMPLETED = 'ENROLLMENT_COMPLETED',
  
  // Generic
  ACTION_NOT_ALLOWED = 'ACTION_NOT_ALLOWED',
  STATE_VIOLATION = 'STATE_VIOLATION',
  
  // Program type restrictions
  PROGRAM_TYPE_HOURS_BLOCKED = 'PROGRAM_TYPE_HOURS_BLOCKED',
  PROGRAM_TYPE_PLACEMENT_BLOCKED = 'PROGRAM_TYPE_PLACEMENT_BLOCKED',
  
  // CNA-specific
  CNA_BACKGROUND_CHECK_REQUIRED = 'CNA_BACKGROUND_CHECK_REQUIRED',
  CNA_TB_TEST_REQUIRED = 'CNA_TB_TEST_REQUIRED',
  CNA_CLINICAL_CLEARANCE_REQUIRED = 'CNA_CLINICAL_CLEARANCE_REQUIRED',
}

/**
 * Actions that require timeclock-level enforcement
 * These get extra validation (start date, payment, shop approval)
 */
export const TIMECLOCK_ACTIONS: EnrollmentAction[] = [
  EnrollmentAction.CLOCK_IN,
  EnrollmentAction.CLOCK_OUT,
  EnrollmentAction.START_LUNCH,
  EnrollmentAction.END_LUNCH,
  EnrollmentAction.PWA_CHECKIN,
  EnrollmentAction.PWA_CHECKOUT,
  EnrollmentAction.LOG_HOURS,
];

/**
 * Actions allowed during payment hold (read-only)
 */
export const PAYMENT_HOLD_ALLOWED: EnrollmentAction[] = [
  EnrollmentAction.VIEW_DASHBOARD,
  EnrollmentAction.VIEW_PROGRESS,
  EnrollmentAction.VIEW_BILLING,
  EnrollmentAction.UPDATE_PAYMENT,
  EnrollmentAction.VIEW_HANDBOOK,
  EnrollmentAction.VIEW_TIMECLOCK_CONTEXT, // Can view context to see why blocked
];

/**
 * Actions allowed when suspended (minimal)
 */
export const SUSPENDED_ALLOWED: EnrollmentAction[] = [
  EnrollmentAction.VIEW_PROGRESS,
  EnrollmentAction.VIEW_BILLING,
  EnrollmentAction.VIEW_TIMECLOCK_CONTEXT, // Can view context to see why blocked
];

/**
 * Actions allowed when completed
 */
export const COMPLETED_ALLOWED: EnrollmentAction[] = [
  EnrollmentAction.VIEW_DASHBOARD,
  EnrollmentAction.VIEW_PROGRESS,
  EnrollmentAction.GENERATE_COMPLETION_PACKET,
  EnrollmentAction.DOWNLOAD_TRANSCRIPT,
  EnrollmentAction.ACCESS_ALUMNI,
  EnrollmentAction.ACCESS_STATE_BOARD,
];

/**
 * Check if an action is a timeclock action
 */
export function isTimeclockAction(action: EnrollmentAction): boolean {
  return TIMECLOCK_ACTIONS.includes(action);
}

/**
 * Check if an action is allowed during payment hold
 */
export function isAllowedDuringPaymentHold(action: EnrollmentAction): boolean {
  return PAYMENT_HOLD_ALLOWED.includes(action);
}

/**
 * Check if an action is allowed when suspended
 */
export function isAllowedWhenSuspended(action: EnrollmentAction): boolean {
  return SUSPENDED_ALLOWED.includes(action);
}

/**
 * Check if an action is allowed when completed
 */
export function isAllowedWhenCompleted(action: EnrollmentAction): boolean {
  return COMPLETED_ALLOWED.includes(action);
}
