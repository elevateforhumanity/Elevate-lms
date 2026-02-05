/**
 * Evidence Processor Pipeline
 * Handles document classification, extraction, validation, and automated decisions
 */

import { createClient } from '@supabase/supabase-js';
import { extractTextFromImage, extractStructuredData, COMMON_PATTERNS } from '@/lib/ocr/tesseract-ocr';

// Types
export interface DocumentExtraction {
  id: string;
  document_id: string;
  doc_type: string;
  extracted: Record<string, any>;
  raw_text: string;
  confidence: number;
  status: 'pending' | 'passed' | 'failed' | 'needs_review';
  validation_errors: string[];
  ruleset_version: string;
}

export interface AutomatedDecision {
  id: string;
  subject_type: string;
  subject_id: string;
  decision: 'approved' | 'rejected' | 'needs_review' | 'recommended' | 'assigned' | 'flagged';
  reason_codes: string[];
  input_snapshot: Record<string, any>;
  ruleset_version: string;
  actor: string;
}

export interface ProcessingResult {
  success: boolean;
  extraction?: DocumentExtraction;
  decision?: AutomatedDecision;
  reviewQueueId?: string;
  error?: string;
}

// Document type patterns for classification
const DOC_TYPE_PATTERNS: Record<string, RegExp[]> = {
  transcript: [
    /transcript/i,
    /academic\s*record/i,
    /hours?\s*completed/i,
    /credit\s*hours/i,
    /barber\s*(school|college|academy)/i,
    /cosmetology/i,
  ],
  license: [
    /license\s*(number|no\.?|#)/i,
    /professional\s*license/i,
    /barber\s*license/i,
    /cosmetology\s*license/i,
    /expir(es?|ation)/i,
  ],
  insurance: [
    /insurance/i,
    /policy\s*(number|no\.?|#)/i,
    /coverage/i,
    /liability/i,
    /certificate\s*of\s*insurance/i,
  ],
  mou: [
    /memorandum\s*of\s*understanding/i,
    /agreement/i,
    /partner\s*agreement/i,
    /program\s*holder/i,
  ],
  id: [
    /driver'?s?\s*license/i,
    /state\s*id/i,
    /identification/i,
    /date\s*of\s*birth/i,
    /dob/i,
  ],
  w2: [
    /w-?2/i,
    /wage\s*and\s*tax/i,
    /employer\s*identification/i,
    /ein/i,
  ],
};

// Extraction patterns by document type
const EXTRACTION_PATTERNS: Record<string, Record<string, RegExp>> = {
  transcript: {
    school_name: /(?:school|college|academy|institute)[:\s]*([^\n]+)/i,
    total_hours: /(?:total|completed|clock)\s*hours?[:\s]*(\d+(?:\.\d+)?)/i,
    completion_date: /(?:date|completed|issued)[:\s]*(\d{1,2}[/\-]\d{1,2}[/\-]\d{2,4})/i,
    student_name: /(?:student|name)[:\s]*([^\n]+)/i,
    state: /(?:state)[:\s]*([A-Z]{2})/i,
  },
  license: {
    license_number: /(?:license|lic\.?)\s*(?:number|no\.?|#)?[:\s]*([A-Z0-9-]+)/i,
    expiration_date: /(?:expir(?:es?|ation)|exp\.?)[:\s]*(\d{1,2}[/\-]\d{1,2}[/\-]\d{2,4})/i,
    holder_name: /(?:name|holder)[:\s]*([^\n]+)/i,
    state: /(?:state)[:\s]*([A-Z]{2})/i,
    license_type: /(?:type|class)[:\s]*([^\n]+)/i,
  },
  insurance: {
    policy_number: /(?:policy)\s*(?:number|no\.?|#)?[:\s]*([A-Z0-9-]+)/i,
    expiration_date: /(?:expir(?:es?|ation)|exp\.?)[:\s]*(\d{1,2}[/\-]\d{1,2}[/\-]\d{2,4})/i,
    coverage_amount: /(?:coverage|limit)[:\s]*\$?([\d,]+)/i,
    insured_name: /(?:insured|name)[:\s]*([^\n]+)/i,
  },
};

// Validation rules by document type
const VALIDATION_RULES: Record<string, (extracted: Record<string, any>, ruleset: any) => string[]> = {
  transcript: (extracted, ruleset) => {
    const errors: string[] = [];
    if (ruleset.require_school_name && !extracted.school_name) {
      errors.push('MISSING_SCHOOL_NAME');
    }
    if (ruleset.require_hours && !extracted.total_hours) {
      errors.push('MISSING_HOURS');
    }
    if (ruleset.require_date && !extracted.completion_date) {
      errors.push('MISSING_DATE');
    }
    if (extracted.total_hours && parseFloat(extracted.total_hours) > ruleset.max_transfer_hours) {
      errors.push('HOURS_EXCEED_MAX');
    }
    if (extracted.state && !ruleset.approved_states.includes(extracted.state)) {
      errors.push('OUT_OF_STATE');
    }
    return errors;
  },
  license: (extracted, ruleset) => {
    const errors: string[] = [];
    if (!extracted.license_number) {
      errors.push('MISSING_LICENSE_NUMBER');
    }
    if (ruleset.license_must_be_valid && extracted.expiration_date) {
      const expDate = new Date(extracted.expiration_date);
      if (expDate < new Date()) {
        errors.push('LICENSE_EXPIRED');
      }
    }
    return errors;
  },
  insurance: (extracted, ruleset) => {
    const errors: string[] = [];
    if (!extracted.policy_number) {
      errors.push('MISSING_POLICY_NUMBER');
    }
    if (extracted.expiration_date) {
      const expDate = new Date(extracted.expiration_date);
      if (expDate < new Date()) {
        errors.push('INSURANCE_EXPIRED');
      }
    }
    return errors;
  },
};

/**
 * Get Supabase admin client
 */
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase credentials');
  return createClient(url, key);
}

/**
 * Classify document type based on content
 */
export function classifyDocument(text: string): { docType: string; confidence: number } {
  const scores: Record<string, number> = {};
  
  for (const [docType, patterns] of Object.entries(DOC_TYPE_PATTERNS)) {
    scores[docType] = 0;
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        scores[docType] += 1;
      }
    }
    scores[docType] = scores[docType] / patterns.length;
  }
  
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [topType, topScore] = sorted[0];
  
  return {
    docType: topScore > 0.2 ? topType : 'unknown',
    confidence: topScore,
  };
}

/**
 * Extract fields from document based on type
 */
export async function extractFields(
  documentId: string,
  fileUrl: string,
  docType: string
): Promise<{ extracted: Record<string, any>; rawText: string; confidence: number }> {
  const supabase = getSupabaseAdmin();
  
  // Fetch the file
  const response = await fetch(fileUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  
  // Run OCR
  const patterns = EXTRACTION_PATTERNS[docType] || {};
  const result = await extractStructuredData(buffer, patterns);
  
  return {
    extracted: result.extracted,
    rawText: result.raw,
    confidence: result.confidence,
  };
}

/**
 * Validate extracted fields against ruleset
 */
export async function validateAgainstRules(
  docType: string,
  extracted: Record<string, any>,
  context: Record<string, any> = {}
): Promise<{ status: 'passed' | 'failed' | 'needs_review'; errors: string[]; ruleset: any }> {
  const supabase = getSupabaseAdmin();
  
  // Get active ruleset
  const { data: ruleset } = await supabase
    .from('automation_rulesets')
    .select('*')
    .eq('rule_type', `${docType}_approval`)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  const rules = ruleset?.rules || {};
  const validator = VALIDATION_RULES[docType];
  
  if (!validator) {
    return { status: 'needs_review', errors: ['NO_VALIDATOR'], ruleset: rules };
  }
  
  const errors = validator(extracted, rules);
  
  // Determine status
  let status: 'passed' | 'failed' | 'needs_review';
  if (errors.length === 0) {
    status = 'passed';
  } else if (errors.some(e => e.includes('EXPIRED') || e.includes('OUT_OF_STATE'))) {
    status = 'failed';
  } else {
    status = 'needs_review';
  }
  
  return { status, errors, ruleset: rules };
}

/**
 * Main processing pipeline
 */
export async function processDocument(documentId: string): Promise<ProcessingResult> {
  const supabase = getSupabaseAdmin();
  
  try {
    // 1. Get document
    const { data: doc, error: docError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .single();
    
    if (docError || !doc) {
      return { success: false, error: 'Document not found' };
    }
    
    // 2. Run OCR and classify
    const response = await fetch(doc.file_url);
    const buffer = Buffer.from(await response.arrayBuffer());
    const ocrResult = await extractTextFromImage(buffer);
    
    const { docType, confidence: classifyConfidence } = classifyDocument(ocrResult.text);
    
    // 3. Extract fields
    const patterns = EXTRACTION_PATTERNS[docType] || {};
    const extractResult = await extractStructuredData(buffer, patterns);
    
    // 4. Validate
    const { status, errors, ruleset } = await validateAgainstRules(docType, extractResult.extracted);
    
    // 5. Store extraction
    const { data: extraction, error: extError } = await supabase
      .from('documents_extractions')
      .insert({
        document_id: documentId,
        doc_type: docType,
        extracted: extractResult.extracted,
        raw_text: extractResult.raw,
        confidence: extractResult.confidence,
        status,
        validation_errors: errors,
        ruleset_version: ruleset.version || '1.0.0',
        processed_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (extError) {
      return { success: false, error: `Failed to store extraction: ${extError.message}` };
    }
    
    // 6. Create automated decision
    const decision = status === 'passed' ? 'approved' : status === 'failed' ? 'rejected' : 'needs_review';
    
    const { data: decisionRecord, error: decError } = await supabase
      .from('automated_decisions')
      .insert({
        subject_type: 'document',
        subject_id: documentId,
        decision,
        reason_codes: errors.length > 0 ? errors : ['VALIDATION_PASSED'],
        input_snapshot: {
          doc_type: docType,
          extracted: extractResult.extracted,
          confidence: extractResult.confidence,
          classify_confidence: classifyConfidence,
        },
        ruleset_version: ruleset.version || '1.0.0',
        actor: 'system',
      })
      .select()
      .single();
    
    // 7. Update document status if auto-approved
    if (decision === 'approved') {
      await supabase
        .from('documents')
        .update({ status: 'approved', reviewed_at: new Date().toISOString() })
        .eq('id', documentId);
    }
    
    // 8. Add to review queue if needs review
    let reviewQueueId: string | undefined;
    if (decision === 'needs_review') {
      const { data: queueItem } = await supabase
        .from('review_queue')
        .insert({
          queue_type: 'document_review',
          subject_type: 'document',
          subject_id: documentId,
          priority: errors.includes('OUT_OF_STATE') ? 3 : 5,
          reasons: errors,
          metadata: {
            doc_type: docType,
            confidence: extractResult.confidence,
          },
        })
        .select()
        .single();
      
      reviewQueueId = queueItem?.id;
    }
    
    // 9. Log to audit
    await supabase.from('audit_logs').insert({
      actor_id: null,
      event_type: 'document_processed',
      resource_type: 'document',
      resource_id: documentId,
      metadata: {
        doc_type: docType,
        decision,
        reason_codes: errors,
        confidence: extractResult.confidence,
      },
    });
    
    return {
      success: true,
      extraction: extraction as DocumentExtraction,
      decision: decisionRecord as AutomatedDecision,
      reviewQueueId,
    };
  } catch (error) {
    console.error('Document processing error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Process transfer hours from transcript
 */
export async function processTransferHours(
  userId: string,
  documentId: string,
  applicationId?: string,
  enrollmentId?: string
): Promise<ProcessingResult> {
  const supabase = getSupabaseAdmin();
  
  try {
    // 1. Process the document first
    const docResult = await processDocument(documentId);
    if (!docResult.success || !docResult.extraction) {
      return docResult;
    }
    
    const extraction = docResult.extraction;
    
    // 2. Check if it's a transcript
    if (extraction.doc_type !== 'transcript') {
      return { success: false, error: 'Document is not a transcript' };
    }
    
    // 3. Get ruleset
    const { data: ruleset } = await supabase
      .from('automation_rulesets')
      .select('rules')
      .eq('rule_type', 'transcript_approval')
      .eq('is_active', true)
      .single();
    
    const rules = ruleset?.rules || {};
    
    // 4. Determine if auto-approve
    const extracted = extraction.extracted;
    const isInState = rules.approved_states?.includes(extracted.state);
    const hoursValid = extracted.total_hours && parseFloat(extracted.total_hours) <= (rules.max_transfer_hours || 1000);
    const confidenceOk = extraction.confidence >= (rules.min_confidence || 0.85);
    
    const canAutoApprove = isInState && hoursValid && confidenceOk && extraction.status === 'passed';
    
    // 5. Create transfer hours record
    const { data: transferRecord, error: thError } = await supabase
      .from('transfer_hours')
      .insert({
        user_id: userId,
        application_id: applicationId,
        enrollment_id: enrollmentId,
        source_institution: extracted.school_name || 'Unknown',
        source_state: extracted.state || 'Unknown',
        total_hours: parseFloat(extracted.total_hours) || 0,
        approved_hours: canAutoApprove ? parseFloat(extracted.total_hours) : null,
        document_id: documentId,
        extraction_id: extraction.id,
        status: canAutoApprove ? 'approved' : 'needs_review',
        auto_approved: canAutoApprove,
        decision_id: docResult.decision?.id,
      })
      .select()
      .single();
    
    if (thError) {
      return { success: false, error: `Failed to create transfer hours: ${thError.message}` };
    }
    
    // 6. Add to review queue if not auto-approved
    if (!canAutoApprove) {
      await supabase.from('review_queue').insert({
        queue_type: 'transcript_review',
        subject_type: 'transfer_hours',
        subject_id: transferRecord.id,
        priority: isInState ? 5 : 3, // Out of state = higher priority
        reasons: extraction.validation_errors,
        metadata: {
          user_id: userId,
          hours: extracted.total_hours,
          state: extracted.state,
          confidence: extraction.confidence,
        },
      });
    }
    
    return {
      success: true,
      extraction,
      decision: docResult.decision,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
