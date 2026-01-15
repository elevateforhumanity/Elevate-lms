/**
 * TUITION CONFIGURATION
 * 
 * This file defines the locked-down payment structure for non-funded students.
 * 
 * THREE PAYMENT TIERS (in order of preference):
 * 1. Third-Party Financing (Affirm/Klarna) - Student approved by provider, we get paid upfront
 * 2. Employer Sponsorship - Employer pays, requires signed agreement
 * 3. Internal Payment Plan - Deposit + 6-month autopay max, strict enforcement
 * 
 * RULES:
 * - No custom terms
 * - No verbal negotiations
 * - No exceptions without Executive Director written approval
 */

// =============================================================================
// PROGRAM TUITION AMOUNTS
// =============================================================================

export interface ProgramTuition {
  programId: string;
  programName: string;
  tuitionAmount: number;
  registrationFee: number; // Non-refundable, included in tuition
  
  // Internal payment plan structure (Tier 3)
  internalPlan: {
    minDownPayment: number;
    downPaymentPercent: number;
    maxTermMonths: number;
    monthlyPayment: number;
  };
}

export const PROGRAM_TUITION: ProgramTuition[] = [
  {
    programId: 'prog-cna',
    programName: 'CNA Training Program',
    tuitionAmount: 2200,
    registrationFee: 150,
    internalPlan: {
      minDownPayment: 500,
      downPaymentPercent: 23,
      maxTermMonths: 4,
      monthlyPayment: 425, // ($2200 - $500) / 4
    },
  },
  {
    programId: 'prog-hvac',
    programName: 'HVAC Technician Program',
    tuitionAmount: 4800,
    registrationFee: 150,
    internalPlan: {
      minDownPayment: 1000,
      downPaymentPercent: 21,
      maxTermMonths: 6,
      monthlyPayment: 633, // ($4800 - $1000) / 6
    },
  },
  {
    programId: 'prog-cdl',
    programName: 'CDL Training Program',
    tuitionAmount: 5200,
    registrationFee: 150,
    internalPlan: {
      minDownPayment: 1000,
      downPaymentPercent: 19,
      maxTermMonths: 6,
      monthlyPayment: 700, // ($5200 - $1000) / 6
    },
  },
  {
    programId: 'prog-business-apprentice',
    programName: 'Business Support Apprenticeship',
    tuitionAmount: 3500,
    registrationFee: 150,
    internalPlan: {
      minDownPayment: 700,
      downPaymentPercent: 20,
      maxTermMonths: 6,
      monthlyPayment: 467, // ($3500 - $700) / 6
    },
  },
  {
    programId: 'prog-esthetics-apprentice',
    programName: 'Esthetics Apprenticeship',
    tuitionAmount: 4200,
    registrationFee: 150,
    internalPlan: {
      minDownPayment: 850,
      downPaymentPercent: 20,
      maxTermMonths: 6,
      monthlyPayment: 558, // ($4200 - $850) / 6
    },
  },
];

// =============================================================================
// PAYMENT TIER CONFIGURATION
// =============================================================================

/**
 * TIER 1: THIRD-PARTY FINANCING
 * Student applies through Affirm/Klarna at checkout.
 * If approved, provider pays us upfront. Provider carries default risk.
 */
export const TIER1_THIRD_PARTY_FINANCING = {
  name: 'Pay Over Time',
  providers: ['affirm', 'klarna'] as const,
  enabled: true,
  
  // Stripe payment method types to enable
  stripePaymentMethods: ['affirm', 'klarna', 'afterpay_clearpay'] as const,
  
  // Terms (set by providers, not us)
  typicalTerms: {
    minAmount: 50,
    maxAmount: 30000,
    termMonths: { min: 3, max: 24 },
    apr: { min: 0, max: 36 }, // Varies by provider and customer
  },
  
  // What we tell students
  studentMessage: 'Pay over time with Affirm or Klarna. Get approved in minutes. Subject to approval.',
  declinedMessage: 'No problem—you can use our school payment plan instead (deposit + monthly autopay).',
};

/**
 * TIER 2: EMPLOYER SPONSORSHIP
 * Employer agrees to pay tuition. Requires signed agreement before enrollment.
 */
export const TIER2_EMPLOYER_SPONSORSHIP = {
  name: 'Employer-Sponsored',
  enabled: true,
  
  requirements: [
    'Employer must be approved partner',
    'Signed employer agreement required BEFORE enrollment',
    'Agreement must specify payment schedule',
  ],
  
  // Typical structure
  typicalTerms: {
    paymentSchedule: 'monthly_post_hire',
    maxTermMonths: 12,
  },
  
  // What we tell students
  studentMessage: 'Your employer can pay your tuition directly or through payroll deduction.',
  
  // Required documents
  requiredDocuments: [
    'employer_sponsorship_agreement',
    'employer_payment_authorization',
  ],
};

/**
 * TIER 3: INTERNAL PAYMENT PLAN
 * School-managed plan. Use ONLY when Tier 1 and Tier 2 are not viable.
 * STRICT TERMS - NO EXCEPTIONS.
 */
export const TIER3_INTERNAL_PLAN = {
  name: 'School Payment Plan',
  enabled: true,
  
  // HARD LIMITS - DO NOT CHANGE WITHOUT EXECUTIVE APPROVAL
  rules: {
    minDownPaymentPercent: 20,
    minDownPaymentAmount: 500,
    maxTermMonths: 6, // HARD LIMIT
    paymentMethod: 'autopay_only' as const, // No manual payments
    lateFee: 50,
    gracePeriodDays: 7,
  },
  
  // ENFORCEMENT - AUTOMATIC, NO EXCEPTIONS
  enforcement: {
    missedPaymentAction: 'academic_pause' as const,
    missedPaymentsBeforeTermination: 2,
    credentialHoldUntilPaid: true,
    noManualPaymentOption: true,
  },
  
  // What we tell students
  studentMessage: 'Pay a deposit now, then fixed monthly payments via autopay. No credit check.',
  
  // Required documents
  requiredDocuments: [
    'enrollment_agreement',
    'payment_plan_agreement',
    'autopay_authorization',
    'refund_policy_acknowledgment',
  ],
};

// =============================================================================
// REFUND POLICY
// =============================================================================

export const REFUND_POLICY = {
  registrationFee: 150, // Non-refundable
  
  beforeProgramStart: {
    refundType: 'full_minus_fee' as const,
    processingDays: 10,
  },
  
  afterProgramStart: {
    refundType: 'prorated' as const,
    noRefundAfterPercent: 50,
    calculation: '(AmountPaid - RegistrationFee) × (1 - CompletionPercent)',
  },
  
  nonRefundableItems: [
    'Registration fee ($150)',
    'Materials/supplies already issued',
    'Certification exam fees already paid to third parties',
  ],
};

// =============================================================================
// DECISION LOGIC
// =============================================================================

export type PaymentEligibility = 
  | 'funded' // WIOA, Pell, etc. - not covered by this config
  | 'pay_in_full'
  | 'third_party_financing'
  | 'employer_sponsored'
  | 'internal_plan'
  | 'not_ready'; // Cannot meet any payment option

export interface PaymentDecision {
  eligibility: PaymentEligibility;
  reason: string;
  nextStep: string;
}

/**
 * Determine payment eligibility based on student situation.
 * This implements the decision flowchart from the policy.
 */
export function determinePaymentEligibility(params: {
  isFundingEligible: boolean;
  canPayInFull: boolean;
  bnplApproved: boolean | null; // null = not yet checked
  hasEmployerSponsor: boolean;
  canPayDeposit: boolean;
}): PaymentDecision {
  const { isFundingEligible, canPayInFull, bnplApproved, hasEmployerSponsor, canPayDeposit } = params;
  
  // Step 1: Check funding eligibility
  if (isFundingEligible) {
    return {
      eligibility: 'funded',
      reason: 'Student is eligible for WIOA, Pell, or other grant funding.',
      nextStep: 'Process through funded enrollment pathway.',
    };
  }
  
  // Step 2: Can pay in full?
  if (canPayInFull) {
    return {
      eligibility: 'pay_in_full',
      reason: 'Student can pay full tuition at enrollment.',
      nextStep: 'Process pay-in-full checkout.',
    };
  }
  
  // Step 3: Third-party financing
  if (bnplApproved === true) {
    return {
      eligibility: 'third_party_financing',
      reason: 'Student approved for Affirm/Klarna financing.',
      nextStep: 'Complete checkout with BNPL payment method.',
    };
  }
  
  // Step 4: Employer sponsorship
  if (hasEmployerSponsor) {
    return {
      eligibility: 'employer_sponsored',
      reason: 'Student has employer willing to sponsor tuition.',
      nextStep: 'Obtain signed employer agreement, then process enrollment.',
    };
  }
  
  // Step 5: Internal payment plan
  if (canPayDeposit) {
    return {
      eligibility: 'internal_plan',
      reason: 'Student can pay deposit and commit to autopay.',
      nextStep: 'Process deposit checkout and create subscription.',
    };
  }
  
  // Step 6: Not enrollment-ready
  return {
    eligibility: 'not_ready',
    reason: 'Student cannot meet any payment option at this time.',
    nextStep: 'Provide information about funding options. Invite to return when ready.',
  };
}

// =============================================================================
// HELPERS
// =============================================================================

export function getProgramTuition(programId: string): ProgramTuition | undefined {
  return PROGRAM_TUITION.find(p => p.programId === programId);
}

export function calculateRefund(
  amountPaid: number,
  completionPercent: number,
  hasStarted: boolean
): number {
  if (!hasStarted) {
    return Math.max(0, amountPaid - REFUND_POLICY.registrationFee);
  }
  
  if (completionPercent >= REFUND_POLICY.afterProgramStart.noRefundAfterPercent) {
    return 0;
  }
  
  const refundableAmount = amountPaid - REFUND_POLICY.registrationFee;
  return Math.max(0, Math.round(refundableAmount * (1 - completionPercent / 100)));
}
