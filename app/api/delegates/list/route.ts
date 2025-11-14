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

  // Get delegates with program holder and user info
  const { data: delegates, error } = await supabase
    .from('delegates')
    .select(`
      id,
      can_view_reports,
      can_view_learners,
      can_edit_courses,
      can_view_financials,
      program_holder:program_holder_id(name),
      user:user_id(email)
    `)
    .order('created_at',{ascending:false});
  
  if (error) return new Response(error.message,{status:500});

  const mapped = (delegates||[]).map((r:any)=>({
    id: r.id,
    ph_name: r.program_holder?.name || 'Unknown',
    email: r.user?.email || 'Unknown',
    can_view_reports: r.can_view_reports,
    can_view_learners: r.can_view_learners,
    can_edit_courses: r.can_edit_courses,
    can_view_financials: r.can_view_financials
  }));
  
  return Response.json(mapped);
}
