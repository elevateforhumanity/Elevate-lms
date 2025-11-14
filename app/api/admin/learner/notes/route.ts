import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

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
  const learner_id = url.searchParams.get('user_id');

  if (!learner_id) {
    return new Response('Missing user_id', { status: 400 });
  }

  // Get all notes for this learner
  const { data: notes, error } = await supabase
    .from('program_holder_notes')
    .select(`
      user_id,
      course_id,
      program_holder_id,
      status,
      note,
      created_at,
      created_by,
      course:course_id(title),
      program_holder:program_holder_id(name),
      creator:created_by(email)
    `)
    .eq('user_id', learner_id)
    .order('created_at', { ascending: false });

  if (error) return new Response(error.message, { status: 500 });

  const mapped = (notes || []).map((n: any) => ({
    user_id: n.user_id,
    course_id: n.course_id,
    course_title: n.course?.title || 'Unknown Course',
    program_holder: n.program_holder?.name || 'Unknown',
    status: n.status,
    note: n.note,
    created_at: n.created_at,
    created_by_email: n.creator?.email || 'Unknown'
  }));

  return Response.json(mapped);
}
