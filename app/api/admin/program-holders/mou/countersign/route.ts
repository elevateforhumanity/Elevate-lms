import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    return new Response('Forbidden', { status: 403 });
  }

  const body = await req.json();
  const { programHolderId, name, signatureDataUrl } = body || {};
  
  if (!programHolderId || !name || !signatureDataUrl) {
    return new Response('Missing required fields', { status: 400 });
  }

  // Decode data URL
  const matches = signatureDataUrl.match(/^data:image\/png;base64,(.+)$/);
  if (!matches) {
    return new Response('Invalid signature format', { status: 400 });
  }
  
  const base64 = matches[1];
  const buffer = Buffer.from(base64, 'base64');

  // Use service client for Storage (server-side)
  const serviceClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const path = `program_holders/${programHolderId}/admin_signature.png`;
  const { error: uploadError } = await serviceClient.storage
    .from('agreements')
    .upload(path, buffer, { contentType: 'image/png', upsert: true });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return new Response(uploadError.message, { status: 500 });
  }

  const sigUrl = path;
  const now = new Date().toISOString();

  const { data: updated, error } = await supabase
    .from('program_holders')
    .update({
      mou_status: 'fully_executed',
      mou_admin_name: name,
      mou_admin_signed_at: now,
      mou_admin_sig_url: sigUrl
    })
    .eq('id', programHolderId)
    .select(`
      id,
      name,
      payout_share,
      mou_status,
      mou_holder_name,
      mou_holder_signed_at,
      mou_holder_sig_url,
      mou_admin_name,
      mou_admin_signed_at,
      mou_admin_sig_url,
      mou_final_pdf_url
    `)
    .single();

  if (error) {
    console.error('Update error:', error);
    return new Response(error.message, { status: 500 });
  }

  return Response.json(updated);
}
