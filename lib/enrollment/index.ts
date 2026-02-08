/**
 * Enrollment Enforcement System
 * 
 * This module provides the canonical enforcement layer for the platform.
 * All protected routes MUST use this system.
 * 
 * Usage:
 * 
 * // In API routes:
 * import { withEnrollmentEnforcement, EnrollmentAction } from '@/lib/enrollment';
 * 
 * export const POST = withEnrollmentEnforcement(
 *   EnrollmentAction.CLOCK_IN,
 *   async (request, { user, permission }) => {
 *     // Handler code
 *   }
 * );
 * 
 * // In server components/actions:
 * import { checkEnrollmentPermission, EnrollmentAction } from '@/lib/enrollment';
 * 
 * const result = await checkEnrollmentPermission(userId, EnrollmentAction.VIEW_DASHBOARD);
 * if (!result.allowed) {
 *   redirect('/access-denied');
 * }
 */

// Existing exports
export { createEnrollmentFromPayment } from './create-enrollment';

// Actions enum
export { 
  EnrollmentAction, 
  DenialReason,
  isTimeclockAction,
  isAllowedDuringPaymentHold,
  isAllowedWhenSuspended,
  isAllowedWhenCompleted,
  TIMECLOCK_ACTIONS,
  PAYMENT_HOLD_ALLOWED,
  SUSPENDED_ALLOWED,
  COMPLETED_ALLOWED,
} from './actions';

// State machine
export {
  type EnrollmentState,
  ALLOWED_TRANSITIONS,
  STATE_PERMISSIONS,
  PAYMENT_GRACE_PERIOD_DAYS,
  canTransition,
  isActionAllowed,
  isActionForbidden,
  deriveEnrollmentState,
  getNextRequiredAction,
  getActionRoute,
  getActionCTA,
  getActionDescription,
  StateEnforcementError,
} from './state-machine';

// Permission assertion
export {
  assertEnrollmentPermission,
  assertEnrollmentPermissionWithOverride,
  logPermissionCheck,
  type PermissionContext,
  type PermissionResult,
} from './assert-permission';

// Middleware wrapper
export {
  withEnrollmentEnforcement,
  checkEnrollmentPermission,
  requireEnrollmentPermission,
  EnrollmentPermissionError,
  type EnforcementContext,
  type EnforcedHandler,
  type EnforcementOptions,
} from './middleware';

// Legacy enforcement (for backwards compatibility during migration)
export { enforceEnrollmentState } from './enforcement';
