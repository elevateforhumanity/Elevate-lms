import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  
  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Check role
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (!profile || !['admin', 'partner'].includes(profile.role)) {
    return new Response('Forbidden', { status: 403 });
  }

  // Get query parameters
  const url = new URL(req.url);
  const program = url.searchParams.get('program') || 'ALL';
  const searchQuery = (url.searchParams.get('q') || '').toLowerCase();

  // Call the SQL function
  const { data, error } = await supabase.rpc('admin_list_applications', {
    pcode: program === 'ALL' ? null : program,
  });

  if (error) {
    console.error('Error fetching applications:', error);
    return new Response(error.message, { status: 500 });
  }

  // Filter by search query
  const filtered = (data || []).filter((row: any) => {
    if (!searchQuery) return true;
    return (
      (row.learner_email || '').toLowerCase().includes(searchQuery) ||
      (row.course_title || '').toLowerCase().includes(searchQuery)
    );
  });

  return Response.json(filtered);
}
