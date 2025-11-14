import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { generateMOUText } from '@/lib/mou-template';

export async function GET(req: NextRequest) {
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

  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  
  if (!id) {
    return new Response('Missing program holder id', { status: 400 });
  }

  // Get program holder details
  const { data: holder, error } = await supabase
    .from('program_holders')
    .select(`
      id,
      name,
      payout_share,
      mou_status,
      application:program_holder_applications(
        contact_name,
        contact_email
      )
    `)
    .eq('id', id)
    .single();

  if (error || !holder) {
    return new Response('Program holder not found', { status: 404 });
  }

  // Generate MOU text
  const mouText = generateMOUText({
    programHolderName: holder.name,
    payoutShare: holder.payout_share || 0.333,
    contactName: holder.application?.[0]?.contact_name,
    contactEmail: holder.application?.[0]?.contact_email,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  });

  // Update MOU status to 'sent' if not already
  if (holder.mou_status === 'not_sent') {
    await supabase
      .from('program_holders')
      .update({ mou_status: 'sent' })
      .eq('id', id);
  }

  // Return as downloadable text file
  const filename = `EFH_MOU_${holder.name.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
  
  return new Response(mouText, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`
    }
  });
}
