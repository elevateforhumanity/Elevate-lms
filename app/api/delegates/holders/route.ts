import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response('Unauthorized',{status:401});
  
  const { data: prof } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();
  
  if (prof?.role !== 'admin') return new Response('Forbidden',{status:403});

  const { data, error } = await supabase
    .from('program_holders')
    .select('id,name')
    .order('name');
  
  if (error) return new Response(error.message,{status:500});
  return Response.json(data||[]);
}
