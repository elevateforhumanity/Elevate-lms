/**
 * Milady Automatic Payment Handler
 * Processes Milady enrollment and payment automatically after Stripe payment
 */

import { createAdminClient } from '@/lib/supabase/admin';
import { provisionMiladyAccess } from './milady-provisioning';

const MILADY_COST = 295; // $295 per enrollment

interface MiladyPaymentParams {
  enrollmentId: string;
  studentId: string;
  programId: string;
  programSlug?: string;
  amount?: number;
}

/**
 * Process Milady payment and enrollment
 * Called automatically from Stripe webhook after payment succeeds
 * 
 * Flow:
 * 1. Get student profile info
 * 2. Provision Milady access (API, license code, or manual queue)
 * 3. Record vendor payment
 * 4. Update enrollment with Milady status
 */
export async function processMiladyPayment(params: MiladyPaymentParams) {
  const supabase = createAdminClient();
  const amount = params.amount || MILADY_COST;
  const programSlug = params.programSlug || params.programId || 'barber-apprenticeship';

  if (!supabase) {
    console.error('[Milady Payment] Supabase admin client not configured');
    return {
      success: false,
      error: 'Database not configured',
    };
  }

  try {
    // STEP 1: Get student profile for provisioning
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, full_name, first_name, last_name, phone')
      .eq('id', params.studentId)
      .single();

    if (profileError || !profile) {
      throw new Error(`Student profile not found: ${params.studentId}`);
    }

    // STEP 2: Provision Milady access
    const provisionResult = await provisionMiladyAccess(
      {
        id: profile.id,
        email: profile.email,
        firstName: profile.first_name || profile.full_name?.split(' ')[0] || 'Student',
        lastName: profile.last_name || profile.full_name?.split(' ').slice(1).join(' ') || '',
        phone: profile.phone,
      },
      programSlug
    );

    // STEP 3: Record vendor payment in database
    const { error: paymentError } = await supabase
      .from('vendor_payments')
      .insert({
        enrollment_id: params.enrollmentId,
        vendor_name: 'milady',
        amount: amount,
        status: provisionResult.success ? 'paid' : 'pending',
        payment_method: provisionResult.method || 'automatic',
        paid_at: provisionResult.success ? new Date().toISOString() : null,
        created_at: new Date().toISOString(),
        metadata: {
          provisioning_method: provisionResult.method,
          access_url: provisionResult.accessUrl,
          license_code: provisionResult.licenseCode,
          requires_manual_setup: provisionResult.requiresManualSetup,
        },
      });

    if (paymentError) {
      console.error('[Milady Payment] Failed to record vendor payment:', paymentError);
    }

    // STEP 4: Update enrollment with Milady status (both tables for consistency)
    const miladyEnrolledAt = provisionResult.success ? new Date().toISOString() : null;
    
    // Update student_enrollments
    await supabase
      .from('student_enrollments')
      .update({
        milady_enrolled: provisionResult.success,
        milady_enrolled_at: miladyEnrolledAt,
        milady_access_url: provisionResult.accessUrl,
        milady_provisioning_method: provisionResult.method,
      })
      .eq('id', params.enrollmentId);

    // Also update by student_id for cases where enrollment_id doesn't match
    await supabase
      .from('student_enrollments')
      .update({
        milady_enrolled: provisionResult.success,
        milady_enrolled_at: miladyEnrolledAt,
        milady_access_url: provisionResult.accessUrl,
      })
      .eq('student_id', params.studentId)
      .eq('program_slug', programSlug);

    // Update enrollments table for portal compatibility
    await supabase
      .from('enrollments')
      .update({
        milady_enrolled: provisionResult.success,
        milady_enrolled_at: miladyEnrolledAt,
      })
      .eq('user_id', params.studentId);

    // STEP 5: Log to audit trail
    await supabase.from('ai_audit_log').insert({
      student_id: params.studentId,
      program_slug: programSlug,
      action: provisionResult.success ? 'MILADY_PROVISIONED' : 'MILADY_PROVISIONING_QUEUED',
      details: {
        enrollment_id: params.enrollmentId,
        amount: amount,
        method: provisionResult.method,
        access_url: provisionResult.accessUrl,
        requires_manual_setup: provisionResult.requiresManualSetup,
      },
    });

    return {
      success: provisionResult.success,
      amount: amount,
      method: provisionResult.method,
      accessUrl: provisionResult.accessUrl,
      licenseCode: provisionResult.licenseCode,
      requiresManualSetup: provisionResult.requiresManualSetup,
      message: provisionResult.success 
        ? 'Milady access provisioned successfully'
        : 'Milady access queued for manual provisioning',
    };
  } catch (error) {
    console.error('[Milady Payment] Error:', error);

    // Log error but don't fail enrollment
    await supabase.from('ai_audit_log').insert({
      student_id: params.studentId,
      program_slug: programSlug,
      action: 'MILADY_PAYMENT_ERROR',
      details: {
        enrollment_id: params.enrollmentId,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Mark Milady payment as paid (when invoice is paid)
 */
export async function markMiladyPaymentPaid(
  enrollmentId: string,
  invoiceId: string
) {
  const supabase = createAdminClient();

  if (!supabase) {
    return { success: false, error: 'Database not configured' };
  }

  const { error } = await supabase
    .from('vendor_payments')
    .update({
      status: 'paid',
      paid_at: new Date().toISOString(),
      invoice_id: invoiceId,
    })
    .eq('enrollment_id', enrollmentId)
    .eq('vendor_name', 'milady');

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Get pending Milady payments (for monthly invoice reconciliation)
 */
export async function getPendingMiladyPayments() {
  const supabase = createAdminClient();

  if (!supabase) {
    return { success: false, error: 'Database not configured', payments: [] };
  }

  const { data, error }: any = await supabase
    .from('vendor_payments')
    .select(
      `
      *,
      enrollments (
        id,
        user_id,
        program_id,
        created_at
      )
    `
    )
    .eq('vendor_name', 'milady')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    return { success: false, error: error.message, payments: [] };
  }

  return {
    success: true,
    payments: data,
    total: data.reduce((sum: number, p: any) => sum + Number(p.amount), 0),
    count: data.length,
  };
}
