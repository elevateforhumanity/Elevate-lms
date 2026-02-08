/**
 * Compliance Enforcement Module
 * 
 * Provides client-side enforcement of:
 * - Agreement acceptance requirements
 * - Onboarding completion
 * - Handbook acknowledgment
 * 
 * Used for WIOA, apprenticeship, and enterprise compliance.
 */

import { createClient } from '@/lib/supabase/client';

export interface ComplianceStatus {
  canAccess: boolean;
  onboardingComplete: boolean;
  agreementsComplete: boolean;
  handbookComplete: boolean;
  missingAgreements: string[];
  redirectTo: string | null;
}

export interface AgreementAcceptance {
  id: string;
  user_id: string;
  agreement_type: string;
  document_version: string;
  signer_name: string;
  signer_email: string;
  signature_method: 'checkbox' | 'typed' | 'drawn';
  accepted_at: string;
  ip_address: string;
  user_agent: string;
}

// Required agreements by user context
export const REQUIRED_AGREEMENTS = {
  student: ['enrollment', 'participation', 'ferpa', 'handbook'],
  partner: ['mou', 'nda'],
  employer: ['employer'],
  licensee: ['license', 'eula', 'tos', 'aup'],
  default: ['tos', 'aup'],
} as const;

/**
 * Check compliance status for a user (client-side)
 */
export async function checkComplianceStatus(
  userId: string,
  context: keyof typeof REQUIRED_AGREEMENTS = 'student'
): Promise<ComplianceStatus> {
  const supabase = createClient();
  
  // Call the database function
  const { data, error } = await supabase.rpc('can_access_lms', {
    p_user_id: userId,
  });

  if (error) {
    console.error('Compliance check error:', error);
    // Fail closed - deny access on error
    return {
      canAccess: false,
      onboardingComplete: false,
      agreementsComplete: false,
      handbookComplete: false,
      missingAgreements: ['unknown'],
      redirectTo: '/student-portal/onboarding',
    };
  }

  return {
    canAccess: data?.can_access ?? false,
    onboardingComplete: data?.onboarding_complete ?? false,
    agreementsComplete: data?.agreements_complete ?? false,
    handbookComplete: data?.handbook_complete ?? false,
    missingAgreements: data?.missing_agreements ?? [],
    redirectTo: data?.redirect_to ?? null,
  };
}

/**
 * Check compliance status (server-side) - use from server components only
 * Import createClient from '@/lib/supabase/server' in your server component
 */
export async function checkComplianceStatusWithClient(
  supabase: any,
  userId: string,
  context: keyof typeof REQUIRED_AGREEMENTS = 'student'
): Promise<ComplianceStatus> {
  const { data, error } = await supabase.rpc('can_access_lms', {
    p_user_id: userId,
  });

  if (error) {
    console.error('Compliance check error:', error);
    return {
      canAccess: false,
      onboardingComplete: false,
      agreementsComplete: false,
      handbookComplete: false,
      missingAgreements: ['unknown'],
      redirectTo: '/student-portal/onboarding',
    };
  }

  return {
    canAccess: data?.can_access ?? false,
    onboardingComplete: data?.onboarding_complete ?? false,
    agreementsComplete: data?.agreements_complete ?? false,
    handbookComplete: data?.handbook_complete ?? false,
    missingAgreements: data?.missing_agreements ?? [],
    redirectTo: data?.redirect_to ?? null,
  };
}

/**
 * Record agreement acceptance with full audit trail
 */
export async function recordAgreementAcceptance(params: {
  userId: string;
  agreementType: string;
  documentVersion: string;
  signerName: string;
  signerEmail: string;
  authEmail: string;
  signatureMethod: 'checkbox' | 'typed' | 'drawn';
  signatureData?: string; // Base64 for drawn signatures
  signatureTyped?: string;
  acceptanceContext?: string;
  programId?: string;
  tenantId?: string;
  organizationId?: string;
}): Promise<{ success: boolean; error?: string; id?: string }> {
  const supabase = createClient();

  // Validate email match
  if (params.signerEmail.toLowerCase() !== params.authEmail.toLowerCase()) {
    return {
      success: false,
      error: 'Signer email must match authenticated user email',
    };
  }

  // Get client metadata
  const ipAddress = await getClientIP();
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'server';

  const { data, error } = await supabase
    .from('license_agreement_acceptances')
    .insert({
      user_id: params.userId,
      agreement_type: params.agreementType,
      document_version: params.documentVersion,
      signer_name: params.signerName,
      signer_email: params.signerEmail,
      auth_email: params.authEmail,
      signature_method: params.signatureMethod,
      signature_data: params.signatureData,
      signature_typed: params.signatureTyped,
      acceptance_context: params.acceptanceContext,
      program_id: params.programId,
      tenant_id: params.tenantId,
      organization_id: params.organizationId,
      ip_address: ipAddress,
      user_agent: userAgent,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Agreement acceptance error:', error);
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    id: data.id,
  };
}

/**
 * Record handbook acknowledgment
 */
export async function recordHandbookAcknowledgment(params: {
  userId: string;
  handbookVersion: string;
  tenantId?: string;
  acknowledgments: {
    attendancePolicy: boolean;
    dressCode: boolean;
    conductPolicy: boolean;
    safetyPolicy: boolean;
    grievancePolicy: boolean;
  };
}): Promise<{ success: boolean; error?: string; id?: string }> {
  const supabase = createClient();

  const ipAddress = await getClientIP();
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'server';

  const { data, error } = await supabase
    .from('handbook_acknowledgments')
    .insert({
      user_id: params.userId,
      handbook_version: params.handbookVersion,
      tenant_id: params.tenantId,
      attendance_policy_ack: params.acknowledgments.attendancePolicy,
      dress_code_ack: params.acknowledgments.dressCode,
      conduct_policy_ack: params.acknowledgments.conductPolicy,
      safety_policy_ack: params.acknowledgments.safetyPolicy,
      grievance_policy_ack: params.acknowledgments.grievancePolicy,
      ip_address: ipAddress,
      user_agent: userAgent,
    })
    .select('id')
    .single();

  if (error) {
    console.error('Handbook acknowledgment error:', error);
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    id: data.id,
  };
}

/**
 * Update onboarding progress
 */
export async function updateOnboardingProgress(
  userId: string,
  step: 'profile' | 'agreements' | 'handbook' | 'documents',
  completed: boolean
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const updateData: Record<string, any> = {
    [`${step}_completed`]: completed,
    [`${step}_completed_at`]: completed ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  // Check if all steps are complete
  const { data: progress } = await supabase
    .from('onboarding_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (progress) {
    const allComplete =
      (step === 'profile' ? completed : progress.profile_completed) &&
      (step === 'agreements' ? completed : progress.agreements_completed) &&
      (step === 'handbook' ? completed : progress.handbook_acknowledged) &&
      (step === 'documents' ? completed : progress.documents_uploaded);

    if (allComplete) {
      updateData.status = 'completed';
      updateData.completed_at = new Date().toISOString();
    } else {
      updateData.status = 'in_progress';
    }
  }

  const { error } = await supabase
    .from('onboarding_progress')
    .upsert({
      user_id: userId,
      ...updateData,
    });

  if (error) {
    console.error('Onboarding progress error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Get user's agreement acceptances
 */
export async function getUserAgreements(userId: string): Promise<AgreementAcceptance[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('license_agreement_acceptances')
    .select('*')
    .eq('user_id', userId)
    .order('accepted_at', { ascending: false });

  if (error) {
    console.error('Get agreements error:', error);
    return [];
  }

  return data || [];
}

/**
 * Get current agreement versions
 */
export async function getCurrentAgreementVersions(): Promise<
  Record<string, { version: string; url: string; effectiveDate: string }>
> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('agreement_versions')
    .select('*')
    .is('expiry_date', null);

  if (error) {
    console.error('Get versions error:', error);
    return {};
  }

  const versions: Record<string, { version: string; url: string; effectiveDate: string }> = {};
  for (const v of data || []) {
    versions[v.agreement_type] = {
      version: v.version,
      url: v.document_url,
      effectiveDate: v.effective_date,
    };
  }

  return versions;
}

/**
 * Helper to get client IP address
 */
async function getClientIP(): Promise<string> {
  try {
    // In browser, call our API endpoint
    if (typeof window !== 'undefined') {
      const response = await fetch('/api/client-info');
      const data = await response.json();
      return data.ip || '0.0.0.0';
    }
    return '0.0.0.0';
  } catch {
    return '0.0.0.0';
  }
}

/**
 * Log compliance event to audit trail
 */
export async function logComplianceEvent(params: {
  eventType: string;
  userId?: string;
  userEmail?: string;
  targetTable?: string;
  targetId?: string;
  tenantId?: string;
  details?: Record<string, any>;
}): Promise<void> {
  const supabase = createClient();

  const ipAddress = await getClientIP();
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'server';

  await supabase.from('compliance_audit_log').insert({
    event_type: params.eventType,
    user_id: params.userId,
    user_email: params.userEmail,
    target_table: params.targetTable,
    target_id: params.targetId,
    tenant_id: params.tenantId,
    details: params.details || {},
    ip_address: ipAddress,
    user_agent: userAgent,
    request_path: typeof window !== 'undefined' ? window.location.pathname : null,
  });
}
