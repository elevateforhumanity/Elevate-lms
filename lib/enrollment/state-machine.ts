/**
 * Enrollment State Machine
 * 
 * States: applied → approved → confirmed → orientation_complete → documents_complete → active
 * 
 * Self-pay: auto-approved on application
 * Funded: requires manual approval
 */

export type EnrollmentState = 
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
  | 'START_COURSE_1'
  | 'CONTINUE_LEARNING'
  | 'AWAIT_PLACEMENT';

export const ALLOWED_TRANSITIONS: Record<EnrollmentState, EnrollmentState[]> = {
  applied: ['approved'],
  approved: ['confirmed'],
  confirmed: ['orientation_complete'],
  orientation_complete: ['documents_complete'],
  documents_complete: ['active'],
  active: [],
};

export function canTransition(from: EnrollmentState, to: EnrollmentState): boolean {
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
}

export function getNextRequiredAction(state: EnrollmentState): NextRequiredAction {
  switch (state) {
    case 'applied':
      return 'AWAIT_APPROVAL';
    case 'approved':
      return 'COMPLETE_PAYMENT';
    case 'confirmed':
      return 'ORIENTATION';
    case 'orientation_complete':
      return 'DOCUMENTS';
    case 'documents_complete':
      return 'START_COURSE_1';
    case 'active':
      return 'CONTINUE_LEARNING';
    default:
      return 'AWAIT_APPROVAL';
  }
}

export function getActionRoute(action: NextRequiredAction, programSlug?: string): string {
  switch (action) {
    case 'AWAIT_APPROVAL':
      return '/enrollment/pending';
    case 'COMPLETE_PAYMENT':
      return `/programs/${programSlug}/enroll`;
    case 'ORIENTATION':
      return '/enrollment/orientation';
    case 'DOCUMENTS':
      return '/enrollment/documents';
    case 'START_COURSE_1':
      return '/dashboard';
    case 'CONTINUE_LEARNING':
      return '/dashboard';
    case 'AWAIT_PLACEMENT':
      return '/enrollment/placement';
    default:
      return '/dashboard';
  }
}

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
    case 'START_COURSE_1':
      return 'Start Course 1';
    case 'CONTINUE_LEARNING':
      return 'Continue Learning';
    case 'AWAIT_PLACEMENT':
      return 'View Status';
    default:
      return 'Continue';
  }
}

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
    case 'START_COURSE_1':
      return 'Start Course 1 to begin your program.';
    case 'CONTINUE_LEARNING':
      return 'Continue your learning journey.';
    case 'AWAIT_PLACEMENT':
      return 'Your placement is in progress. You\'ll be notified when it\'s confirmed.';
    default:
      return 'Continue with your enrollment.';
  }
}
