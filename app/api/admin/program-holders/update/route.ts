import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(req: NextRequest) {
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

  const { id, status, mou_status } = await req.json();
  
  if (!id) {
    return new Response('Missing id', { status: 400 });
  }

  const updates: any = {};
  
  if (status) {
    updates.status = status;
  }
  
  if (mou_status) {
    updates.mou_status = mou_status;
    if (mou_status === 'signed') {
      updates.mou_signed_at = new Date().toISOString();
    }
  }

  const { error } = await supabase
    .from('program_holders')
    .update(updates)
    .eq('id', id);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return Response.json({ ok: true });
}
