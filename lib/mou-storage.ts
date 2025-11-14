import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

/**
 * Get a signed URL for downloading a signed MOU from storage
 * @param filename - The filename stored in program_holders.signed_mou_url
 * @returns Public URL for downloading the signed MOU
 */
export async function getSignedMOUUrl(filename: string): Promise<string | null> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase.storage
    .from('mous')
    .createSignedUrl(filename, 3600); // 1 hour expiry

  if (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }

  return data.signedUrl;
}

/**
 * Download a signed MOU file
 * @param filename - The filename stored in program_holders.signed_mou_url
 * @returns Blob of the PDF file
 */
export async function downloadSignedMOU(filename: string): Promise<Blob | null> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase.storage
    .from('mous')
    .download(filename);

  if (error) {
    console.error('Error downloading MOU:', error);
    return null;
  }

  return data;
}

/**
 * Check if a signed MOU exists in storage
 * @param filename - The filename to check
 * @returns Boolean indicating if file exists
 */
export async function signedMOUExists(filename: string): Promise<boolean> {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase.storage
    .from('mous')
    .list('', {
      search: filename
    });

  if (error) {
    console.error('Error checking MOU existence:', error);
    return false;
  }

  return data.length > 0;
}
