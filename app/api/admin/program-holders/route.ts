import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return new Response('Unauthorized', { status: 401 });
  
  const { data: prof } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();
  
  if (prof?.role !== 'admin') {
    return new Response('Forbidden', { status: 403 });
  }

  // Get all program holders with application details
  const { data: holders, error } = await supabase
    .from('program_holders')
    .select(`
      id,
      name,
      owner_user_id,
      status,
      payout_share,
      mou_status,
      mou_signed_at,
      mou_holder_signed_at,
      mou_final_pdf_url,
      created_at,
      owner:owner_user_id(email),
      application:program_holder_applications(
        contact_name,
        contact_email,
        phone,
        training_focus,
        funding_sources
      )
    `)
    .order('created_at', { ascending: false });

  if (error) return new Response(error.message, { status: 500 });

  const mapped = (holders || []).map((h: any) => ({
    id: h.id,
    name: h.name,
    owner_email: h.owner?.email || 'Unknown',
    status: h.status,
    payout_share: h.payout_share,
    mou_status: h.mou_status,
    mou_signed_at: h.mou_signed_at,
    mou_holder_signed_at: h.mou_holder_signed_at,
    mou_final_pdf_url: h.mou_final_pdf_url,
    created_at: h.created_at,
    contact_name: h.application?.[0]?.contact_name || null,
    contact_email: h.application?.[0]?.contact_email || null,
    phone: h.application?.[0]?.phone || null,
    training_focus: h.application?.[0]?.training_focus || null,
    funding_sources: h.application?.[0]?.funding_sources || null,
  }));

  return Response.json(mapped);
}
