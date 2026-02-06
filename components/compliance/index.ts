/**
 * Compliance Components Index
 * 
 * Centralized exports for all compliance-related components.
 * Use these components to ensure consistent compliance language across the platform.
 */

// Core compliance notices
export { ComplianceNotice } from './ComplianceNotice';
export { default as PathwayDisclosure, PATHWAY_DISCLOSURE } from './PathwayDisclosure';
export { PolicyReference } from './PolicyReference';

// Guardrail components
export {
  NoGuaranteeDisclaimer,
  FundingDisclaimer,
  NotAdviceDisclaimer,
  VerificationDate,
  AccreditationNotice,
  TestimonialDisclaimer,
  SalaryDisclaimer,
  ApplicationConsent,
  ComplianceFooterLinks,
  ProgramComplianceBanner,
} from './ComplianceGuardrails';

// Program-specific compliance
export { default as BarberEnrollmentAcknowledgment } from './BarberEnrollmentAcknowledgment';
export { default as BeautyEnrollmentAcknowledgment } from './BeautyEnrollmentAcknowledgment';
export { default as HostShopRequirements } from './HostShopRequirements';
export { default as BarberProgramFAQ } from './BarberProgramFAQ';

// Privacy and consent
export { default as CookieConsentBanner } from './CookieConsentBanner';

// Training compliance
export { default as FERPATrainingDashboard } from './FERPATrainingDashboard';
export { default as FERPATrainingForm } from './FERPATrainingForm';
