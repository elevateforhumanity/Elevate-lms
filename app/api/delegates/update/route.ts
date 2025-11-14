import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized',{status:401});
  
  const { data: prof } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();
  
  if (prof?.role !== 'admin') return new Response('Forbidden',{status:403});

  const { id, field, value } = await req.json();
  
  if (!id || !field) {
    return new Response('Missing fields',{status:400});
  }

  const { error } = await supabase
    .from('delegates')
    .update({ [field]: value })
    .eq('id', id);

  if (error) {
    return new Response(error.message, {status:500});
  }

  return Response.json({ ok:true });
}
