/**
 * RAPIDS Registration Configuration
 * 
 * Centralized source of truth for USDOL Registered Apprenticeship data.
 * This file is the authoritative reference for all RAPIDS-related information.
 */

export const RAPIDS_CONFIG = {
  // Sponsor Information
  sponsorOfRecord: 'Elevate for Humanity',
  sponsorLegalEntity: '2Exclusive llc', // DBA Elevate for Humanity
  
  // Registration Details
  registrationId: process.env.RAPIDS_REGISTRATION_ID || '2025-IN-132301',
  programNumber: process.env.NEXT_PUBLIC_RAPIDS_PROGRAM_NUMBER || '2025-IN-132301',
  
  // Program Details
  programs: {
    barber: {
      slug: 'barber-apprenticeship',
      name: 'Barber Apprenticeship',
      occupation: 'Barber',
      occupationCode: '330.371-010', // DOT code
      state: 'IN',
      totalHours: 2000,
      relatedInstructionHours: 144,
      fundingType: 'self_pay',
      tuition: 4980,
    },
  },
  
  // State Information
  state: 'Indiana',
  stateCode: 'IN',
  licensingAgency: 'Indiana Professional Licensing Agency',
  
  // Compliance Flags
  isStateFunded: false,
  wagesGuaranteed: false,
  employmentGuaranteed: false,
} as const;

/**
 * Get RAPIDS metadata for Stripe checkout sessions
 */
export function getRAPIDSMetadata(programSlug: string) {
  const program = Object.values(RAPIDS_CONFIG.programs).find(
    p => p.slug === programSlug
  );
  
  if (!program) return null;
  
  return {
    rapids_sponsor: RAPIDS_CONFIG.sponsorOfRecord,
    rapids_program: program.name,
    rapids_state: RAPIDS_CONFIG.stateCode,
    rapids_registration_id: RAPIDS_CONFIG.registrationId,
    rapids_occupation_code: program.occupationCode,
    funding_type: program.fundingType,
  };
}

/**
 * Get RAPIDS enrollment data for database records
 */
export function getRAPIDSEnrollmentData(programSlug: string) {
  const program = Object.values(RAPIDS_CONFIG.programs).find(
    p => p.slug === programSlug
  );
  
  if (!program) return null;
  
  return {
    rapids_sponsor: RAPIDS_CONFIG.sponsorOfRecord,
    rapids_program: program.name,
    rapids_state: RAPIDS_CONFIG.stateCode,
    rapids_registration_on_file: true,
    rapids_occupation_code: program.occupationCode,
    total_hours_required: program.totalHours,
    related_instruction_hours: program.relatedInstructionHours,
  };
}

/**
 * Check if a program is RAPIDS-registered
 */
export function isRAPIDSProgram(programSlug: string): boolean {
  return Object.values(RAPIDS_CONFIG.programs).some(
    p => p.slug === programSlug
  );
}

/**
 * Get public-safe registration details (no sensitive IDs)
 */
export function getPublicRegistrationDetails() {
  return {
    sponsorOfRecord: RAPIDS_CONFIG.sponsorOfRecord,
    state: RAPIDS_CONFIG.state,
    isStateFunded: RAPIDS_CONFIG.isStateFunded,
    licensingAgency: RAPIDS_CONFIG.licensingAgency,
    registrationAvailable: 'upon request',
  };
}
