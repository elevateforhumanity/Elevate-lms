import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

/**
 * Check if a program holder has a fully executed MOU
 * @param programHolderId - The program holder ID to check
 * @returns Boolean indicating if MOU is fully executed
 */
export async function hasMOUFullyExecuted(programHolderId: string): Promise<boolean> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('program_holders')
    .select('mou_status')
    .eq('id', programHolderId)
    .single();

  if (error || !data) {
    return false;
  }

  return data.mou_status === 'fully_executed';
}

/**
 * Get MOU status for a program holder
 * @param programHolderId - The program holder ID
 * @returns MOU status object with details
 */
export async function getMOUStatus(programHolderId: string) {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('program_holders')
    .select(`
      mou_status,
      mou_holder_signed_at,
      mou_admin_signed_at,
      mou_final_pdf_url
    `)
    .eq('id', programHolderId)
    .single();

  if (error || !data) {
    return {
      status: 'unknown',
      isFullyExecuted: false,
      holderSigned: false,
      adminSigned: false,
      hasPDF: false
    };
  }

  return {
    status: data.mou_status,
    isFullyExecuted: data.mou_status === 'fully_executed',
    holderSigned: !!data.mou_holder_signed_at,
    adminSigned: !!data.mou_admin_signed_at,
    hasPDF: !!data.mou_final_pdf_url
  };
}

/**
 * Server-side check for MOU status (for API routes)
 */
export async function checkMOUStatusServer(supabase: any, programHolderId: string) {
  const { data, error } = await supabase
    .from('program_holders')
    .select('mou_status')
    .eq('id', programHolderId)
    .single();

  if (error || !data) {
    return { isValid: false, status: 'unknown' };
  }

  return {
    isValid: data.mou_status === 'fully_executed',
    status: data.mou_status
  };
}
