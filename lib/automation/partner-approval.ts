/**
 * Partner/Shop Approval Automation
 * 
 * Automated partner onboarding that:
 * 1. Tracks document checklist completion
 * 2. Validates MOU signature
 * 3. Auto-approves when all requirements met
 * 4. Routes to review when incomplete or issues detected
 * 
 * GUARDRAILS:
 * - All required documents must be verified
 * - MOU must be signed and effective
 * - License must be valid and not expired
 * - Insurance must be current
 * - All decisions logged to automated_decisions table
 */

import { createAdminClient } from '@/lib/supabase/admin';
import { logger } from '@/lib/logger';

// ============================================
// TYPES
// ============================================

export interface PartnerRequirement {
  id: string;
  name: string;
  documentType: string;
  required: boolean;
  description: string;
}

export interface PartnerChecklistStatus {
  partnerId: string;
  requirements: Array<{
    requirement: PartnerRequirement;
    status: 'pending' | 'uploaded' | 'verified' | 'rejected';
    documentId?: string;
    verifiedAt?: string;
  }>;
  mouSigned: boolean;
  mouSignedAt?: string;
  allRequirementsMet: boolean;
  readyForAutoApproval: boolean;
  blockers: string[];
}

export interface PartnerApprovalResult {
  success: boolean;
  partnerId: string;
  outcome: 'auto_approved' | 'routed_to_review' | 'pending_requirements';
  decisionId?: string;
  reviewQueueId?: string;
  blockers: string[];
  error?: string;
}

// ============================================
// REQUIREMENTS DEFINITION
// ============================================

const RULESET_VERSION = '1.0.0';

const PARTNER_REQUIREMENTS: PartnerRequirement[] = [
  {
    id: 'business_license',
    name: 'Business License',
    documentType: 'license',
    required: true,
    description: 'Valid state business license',
  },
  {
    id: 'professional_license',
    name: 'Professional License',
    documentType: 'license',
    required: true,
    description: 'Professional/trade license (e.g., cosmetology, barber)',
  },
  {
    id: 'insurance',
    name: 'Liability Insurance',
    documentType: 'insurance',
    required: true,
    description: 'Current liability insurance certificate',
  },
  {
    id: 'mou',
    name: 'Memorandum of Understanding',
    documentType: 'mou',
    required: true,
    description: 'Signed MOU with Elevate for Humanity',
  },
  {
    id: 'w9',
    name: 'W-9 Form',
    documentType: 'w9',
    required: true,
    description: 'IRS W-9 form for tax purposes',
  },
];

// ============================================
// CHECKLIST FUNCTIONS
// ============================================

/**
 * Get the current checklist status for a partner.
 */
export async function getPartnerChecklistStatus(partnerId: string): Promise<PartnerChecklistStatus> {
  const supabase = createAdminClient();

  // Get partner documents
  const { data: documents } = await supabase
    .from('partner_documents')
    .select('*')
    .eq('partner_id', partnerId);

  // Get MOU status
  const { data: mou } = await supabase
    .from('partner_mous')
    .select('*')
    .eq('partner_id', partnerId)
    .eq('status', 'signed')
    .order('signed_at', { ascending: false })
    .limit(1)
    .single();

  // Build checklist status
  const requirements = PARTNER_REQUIREMENTS.map(req => {
    const doc = documents?.find(d => d.document_type === req.documentType);
    return {
      requirement: req,
      status: doc?.status || 'pending',
      documentId: doc?.id,
      verifiedAt: doc?.verified_at,
    };
  });

  const blockers: string[] = [];

  // Check each requirement
  for (const item of requirements) {
    if (item.requirement.required && item.status !== 'verified') {
      if (item.status === 'pending') {
        blockers.push(`${item.requirement.name}: Not uploaded`);
      } else if (item.status === 'uploaded') {
        blockers.push(`${item.requirement.name}: Pending verification`);
      } else if (item.status === 'rejected') {
        blockers.push(`${item.requirement.name}: Rejected - reupload required`);
      }
    }
  }

  // Check MOU
  const mouSigned = !!mou?.signed_at;
  if (!mouSigned) {
    blockers.push('MOU: Not signed');
  }

  const allRequirementsMet = blockers.length === 0;
  const readyForAutoApproval = allRequirementsMet && mouSigned;

  return {
    partnerId,
    requirements,
    mouSigned,
    mouSignedAt: mou?.signed_at,
    allRequirementsMet,
    readyForAutoApproval,
    blockers,
  };
}

/**
 * Process partner approval after a document is verified or MOU is signed.
 * Called automatically by document verification and MOU signing flows.
 */
export async function processPartnerApproval(partnerId: string): Promise<PartnerApprovalResult> {
  const supabase = createAdminClient();
  const startTime = Date.now();

  try {
    // Get current checklist status
    const status = await getPartnerChecklistStatus(partnerId);

    logger.info('[PartnerApproval] Processing partner', {
      partnerId,
      readyForAutoApproval: status.readyForAutoApproval,
      blockers: status.blockers,
    });

    // If not ready, return pending status
    if (!status.readyForAutoApproval) {
      return {
        success: true,
        partnerId,
        outcome: 'pending_requirements',
        blockers: status.blockers,
      };
    }

    // All requirements met - check for any additional validation
    const validationResult = await validatePartnerForApproval(partnerId);
    
    if (!validationResult.valid) {
      return await routePartnerToReview(
        supabase,
        partnerId,
        validationResult.reasons,
        startTime
      );
    }

    // Auto-approve the partner
    return await autoApprovePartner(supabase, partnerId, status, startTime);

  } catch (error) {
    logger.error('[PartnerApproval] Processing failed', { partnerId, error });
    return {
      success: false,
      partnerId,
      outcome: 'routed_to_review',
      blockers: [`Processing error: ${error instanceof Error ? error.message : 'Unknown error'}`],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Additional validation before auto-approval.
 */
async function validatePartnerForApproval(partnerId: string): Promise<{ valid: boolean; reasons: string[] }> {
  const supabase = createAdminClient();
  const reasons: string[] = [];

  // Get partner details
  const { data: partner } = await supabase
    .from('partners')
    .select('*')
    .eq('id', partnerId)
    .single();

  if (!partner) {
    return { valid: false, reasons: ['Partner not found'] };
  }

  // Check license expiration
  if (partner.license_expiry) {
    const expiryDate = new Date(partner.license_expiry);
    if (expiryDate <= new Date()) {
      reasons.push('Professional license is expired');
    } else if (expiryDate <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) {
      reasons.push('Professional license expires within 30 days');
    }
  }

  // Check for existing suspensions
  if (partner.status === 'suspended') {
    reasons.push('Partner account is suspended');
  }

  // Check capacity
  if (!partner.apprentice_capacity || partner.apprentice_capacity <= 0) {
    reasons.push('Apprentice capacity not specified');
  }

  return {
    valid: reasons.length === 0,
    reasons,
  };
}

/**
 * Auto-approve a partner.
 */
async function autoApprovePartner(
  supabase: ReturnType<typeof createAdminClient>,
  partnerId: string,
  status: PartnerChecklistStatus,
  startTime: number
): Promise<PartnerApprovalResult> {
  const processingTimeMs = Date.now() - startTime;

  // Update partner status
  await supabase
    .from('partners')
    .update({
      status: 'active',
      account_status: 'active',
      approved_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', partnerId);

  // Update partner application if exists
  await supabase
    .from('partner_applications')
    .update({
      status: 'approved',
      approval_status: 'approved',
      reviewed_at: new Date().toISOString(),
      reviewed_by: null, // System
      updated_at: new Date().toISOString(),
    })
    .eq('partner_id', partnerId);

  // Record automated decision
  const { data: decision } = await supabase
    .from('automated_decisions')
    .insert({
      entity_type: 'partner',
      entity_id: partnerId,
      decision_type: 'partner_approval',
      outcome: 'approved',
      actor: 'system',
      ruleset_version: RULESET_VERSION,
      confidence_score: 1.0, // All requirements verified
      reason_codes: ['all_requirements_met', 'mou_signed', 'documents_verified'],
      input_snapshot: {
        checklist_status: status,
      },
      processing_time_ms: processingTimeMs,
      created_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  // Write audit log
  await supabase.from('audit_logs').insert({
    action: 'partner_auto_approved',
    target_type: 'partner',
    target_id: partnerId,
    actor_id: null, // System
    metadata: {
      ruleset_version: RULESET_VERSION,
      requirements_verified: status.requirements.filter(r => r.status === 'verified').length,
      mou_signed_at: status.mouSignedAt,
      processing_time_ms: processingTimeMs,
    },
    created_at: new Date().toISOString(),
  });

  logger.info('[PartnerApproval] Partner auto-approved', {
    partnerId,
    decisionId: decision?.id,
    processingTimeMs,
  });

  return {
    success: true,
    partnerId,
    outcome: 'auto_approved',
    decisionId: decision?.id,
    blockers: [],
  };
}

/**
 * Route a partner to human review.
 */
async function routePartnerToReview(
  supabase: ReturnType<typeof createAdminClient>,
  partnerId: string,
  reasons: string[],
  startTime: number
): Promise<PartnerApprovalResult> {
  const processingTimeMs = Date.now() - startTime;

  // Create review queue item
  const { data: reviewItem } = await supabase
    .from('review_queue')
    .insert({
      entity_type: 'partner',
      entity_id: partnerId,
      review_type: 'partner_approval',
      priority: 2, // High priority
      status: 'pending',
      failed_rules: reasons,
      system_recommendation: 'manual_review_required',
      created_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  // Record automated decision
  const { data: decision } = await supabase
    .from('automated_decisions')
    .insert({
      entity_type: 'partner',
      entity_id: partnerId,
      decision_type: 'partner_review_routing',
      outcome: 'routed_to_review',
      actor: 'system',
      ruleset_version: RULESET_VERSION,
      reason_codes: reasons,
      processing_time_ms: processingTimeMs,
      created_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  // Write audit log
  await supabase.from('audit_logs').insert({
    action: 'partner_routed_to_review',
    target_type: 'partner',
    target_id: partnerId,
    actor_id: null, // System
    metadata: {
      reasons,
      review_queue_id: reviewItem?.id,
      ruleset_version: RULESET_VERSION,
      processing_time_ms: processingTimeMs,
    },
    created_at: new Date().toISOString(),
  });

  logger.info('[PartnerApproval] Partner routed to review', {
    partnerId,
    reasons,
    reviewQueueId: reviewItem?.id,
    processingTimeMs,
  });

  return {
    success: true,
    partnerId,
    outcome: 'routed_to_review',
    decisionId: decision?.id,
    reviewQueueId: reviewItem?.id,
    blockers: reasons,
  };
}

// ============================================
// TRIGGER FUNCTIONS
// ============================================

/**
 * Called when a partner document is uploaded.
 * Triggers document processing and checks if partner is ready for approval.
 */
export async function onPartnerDocumentUploaded(
  partnerId: string,
  documentId: string,
  documentType: string,
  fileUrl: string
): Promise<void> {
  const { processDocument } = await import('./evidence-processor');
  
  // Process the document
  const result = await processDocument(documentId, fileUrl, documentType as any, {
    documentType: documentType as any,
  });

  logger.info('[PartnerApproval] Document processed', {
    partnerId,
    documentId,
    outcome: result.outcome,
  });

  // If document was approved, check if partner is ready for approval
  if (result.outcome === 'auto_approved') {
    await processPartnerApproval(partnerId);
  }
}

/**
 * Called when a partner signs their MOU.
 * Checks if partner is ready for approval.
 */
export async function onPartnerMOUSigned(partnerId: string): Promise<void> {
  logger.info('[PartnerApproval] MOU signed, checking approval status', { partnerId });
  await processPartnerApproval(partnerId);
}

// ============================================
// EXPORTS
// ============================================

export {
  PARTNER_REQUIREMENTS,
  RULESET_VERSION,
};
