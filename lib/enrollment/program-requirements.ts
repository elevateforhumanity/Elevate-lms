/**
 * Program Requirements - Reads from config/program-requirements.json
 * 
 * This module provides type-safe access to program-specific requirements.
 * All enforcement logic should use these functions instead of hardcoding.
 */

import programRequirementsJson from '@/config/program-requirements.json';

export type ProgramType = 'internal_apprenticeship' | 'external_lms_wrapped' | 'internal_clock_program';

export interface ProgramTypeConfig {
  description: string;
  requires_hours: boolean;
  requires_placement: boolean;
  requires_documents: string[];
  completion_criteria: string;
  timeclock_enabled: boolean;
  lms_provider: string | null;
  hours_required: number | null;
}

export interface ProgramOverride {
  program_type?: ProgramType;
  requires_documents?: string[];
  hours_required?: number;
  clinical_hours_required?: number;
  completion_criteria?: string;
  lms_provider?: string;
  lms_course_id?: string;
}

/**
 * Get configuration for a program type
 */
export function getProgramTypeConfig(programType: ProgramType): ProgramTypeConfig {
  const config = programRequirementsJson.program_types[programType];
  if (!config) {
    // Default to internal_clock_program if unknown
    return programRequirementsJson.program_types.internal_clock_program as ProgramTypeConfig;
  }
  return config as ProgramTypeConfig;
}

/**
 * Get program-specific overrides by slug
 */
export function getProgramOverride(programSlug: string): ProgramOverride | null {
  const overrides = programRequirementsJson.program_overrides as Record<string, ProgramOverride>;
  return overrides[programSlug] || null;
}

/**
 * Get required documents for a program
 * Merges program type defaults with program-specific overrides
 */
export function getRequiredDocuments(programSlug: string, programType: ProgramType): string[] {
  const typeConfig = getProgramTypeConfig(programType);
  const override = getProgramOverride(programSlug);
  
  // Override takes precedence if specified
  if (override?.requires_documents) {
    return override.requires_documents;
  }
  
  return typeConfig.requires_documents;
}

/**
 * Check if a program allows hours logging
 */
export function programAllowsHours(programType: ProgramType): boolean {
  const config = getProgramTypeConfig(programType);
  return config.requires_hours && config.timeclock_enabled;
}

/**
 * Check if a program allows placements
 */
export function programAllowsPlacements(programType: ProgramType): boolean {
  const config = getProgramTypeConfig(programType);
  return config.requires_placement;
}

/**
 * Get hours required for a program
 */
export function getHoursRequired(programSlug: string, programType: ProgramType): number | null {
  const override = getProgramOverride(programSlug);
  if (override?.hours_required !== undefined) {
    return override.hours_required;
  }
  
  const config = getProgramTypeConfig(programType);
  return config.hours_required;
}

/**
 * Check if all required documents are submitted for a program
 */
export async function checkRequiredDocuments(
  enrollmentId: string,
  programSlug: string,
  programType: ProgramType,
  supabase: any
): Promise<{ complete: boolean; missing: string[] }> {
  const required = getRequiredDocuments(programSlug, programType);
  
  if (required.length === 0) {
    return { complete: true, missing: [] };
  }
  
  // Get submitted documents
  const { data: documents } = await supabase
    .from('documents')
    .select('document_type, verified')
    .eq('enrollment_id', enrollmentId);
  
  const submittedTypes = new Set(
    (documents || [])
      .filter((d: any) => d.verified !== false) // Include unverified but submitted
      .map((d: any) => d.document_type)
  );
  
  const missing = required.filter(docType => !submittedTypes.has(docType));
  
  return {
    complete: missing.length === 0,
    missing,
  };
}

/**
 * Get CNA-specific document status
 */
export function getCNADocumentStatus(documents: any[]): {
  backgroundCheck: boolean;
  tbTest: boolean;
  clinicalClearance: boolean;
  canStartClinical: boolean;
} {
  const docTypes = new Set(documents.map(d => d.document_type));
  
  const backgroundCheck = docTypes.has('background_check');
  const tbTest = docTypes.has('tb_test');
  const clinicalClearance = docTypes.has('clinical_clearance');
  
  // Can start clinical only if background check and TB test are complete
  const canStartClinical = backgroundCheck && tbTest;
  
  return {
    backgroundCheck,
    tbTest,
    clinicalClearance,
    canStartClinical,
  };
}

/**
 * Determine completion criteria for a program
 */
export function getCompletionCriteria(programSlug: string, programType: ProgramType): string {
  const override = getProgramOverride(programSlug);
  if (override?.completion_criteria) {
    return override.completion_criteria;
  }
  
  const config = getProgramTypeConfig(programType);
  return config.completion_criteria;
}

/**
 * Check if program completion requirements are met
 */
export async function checkCompletionRequirements(
  enrollmentId: string,
  programSlug: string,
  programType: ProgramType,
  supabase: any
): Promise<{ complete: boolean; reason?: string }> {
  const criteria = getCompletionCriteria(programSlug, programType);
  
  switch (criteria) {
    case 'credential_verification': {
      // HVAC: Just need credential certificate verified
      const { data: credential } = await supabase
        .from('documents')
        .select('id, verified')
        .eq('enrollment_id', enrollmentId)
        .eq('document_type', 'credential_certificate')
        .eq('verified', true)
        .maybeSingle();
      
      return {
        complete: !!credential,
        reason: credential ? undefined : 'Credential certificate not verified',
      };
    }
    
    case 'hours_and_documents': {
      // Standard: Hours complete + documents submitted
      const hoursRequired = getHoursRequired(programSlug, programType);
      
      const { data: enrollment } = await supabase
        .from('student_enrollments')
        .select('total_hours, documents_submitted_at')
        .eq('id', enrollmentId)
        .single();
      
      if (!enrollment) {
        return { complete: false, reason: 'Enrollment not found' };
      }
      
      const hoursComplete = !hoursRequired || (enrollment.total_hours || 0) >= hoursRequired;
      const docsComplete = !!enrollment.documents_submitted_at;
      
      if (!hoursComplete) {
        return { complete: false, reason: `Hours incomplete (${enrollment.total_hours || 0}/${hoursRequired})` };
      }
      if (!docsComplete) {
        return { complete: false, reason: 'Documents not submitted' };
      }
      
      return { complete: true };
    }
    
    case 'hours_and_documents_and_clinical': {
      // CNA: Hours + documents + clinical clearance
      const { complete: docsComplete, missing } = await checkRequiredDocuments(
        enrollmentId, programSlug, programType, supabase
      );
      
      if (!docsComplete) {
        return { complete: false, reason: `Missing documents: ${missing.join(', ')}` };
      }
      
      // Check clinical hours if required
      const override = getProgramOverride(programSlug);
      if (override?.clinical_hours_required) {
        const { data: clinicalHours } = await supabase
          .from('attendance_hours')
          .select('hours_logged')
          .eq('enrollment_id', enrollmentId)
          .eq('hour_type', 'clinical');
        
        const totalClinical = (clinicalHours || []).reduce(
          (sum: number, h: any) => sum + (h.hours_logged || 0), 0
        );
        
        if (totalClinical < override.clinical_hours_required) {
          return { 
            complete: false, 
            reason: `Clinical hours incomplete (${totalClinical}/${override.clinical_hours_required})` 
          };
        }
      }
      
      return { complete: true };
    }
    
    default:
      return { complete: false, reason: `Unknown completion criteria: ${criteria}` };
  }
}
