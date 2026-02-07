import { NextResponse } from 'next/server';
import { CourseCreateSchema } from '@/lib/validators/course';
import { createCourse, listCourses } from '@/lib/db/courses';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * GET /api/courses - List all courses
 */
export async function GET(request: Request) {
  // STRICT: Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { 
        error: 'Database not configured',
        data_source: 'none',
        config: {
          supabase_url_present: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          supabase_key_present: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        }
      },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const programId = searchParams.get('program_id') || undefined;

    const data = await listCourses({ status, programId });
    return NextResponse.json({ 
      data,
      data_source: 'supabase',
      count: data?.length || 0,
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message || 'Failed to list courses',
      data_source: 'supabase',
    }, { status: 500 });
  }
}

/**
 * POST /api/courses - Create a new course
 */
export async function POST(request: Request) {
  try {
    // Auth check
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || !['admin', 'super_admin', 'instructor'].includes(profile.role)) {
      return NextResponse.json({ error: 'Forbidden - Admin or Instructor required' }, { status: 403 });
    }

    // Validate input
    const body = await request.json().catch(() => null);
    const parsed = CourseCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Create course
    const data = await createCourse(parsed.data);
    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create course' }, { status: 500 });
  }
}
