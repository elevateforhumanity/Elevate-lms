import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Changed from 'edge' to support email sending
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { createServerSupabaseClient, getCurrentUser } from '@/lib/auth';
import { toError, toErrorMessage } from '@/lib/safe';
import { sendCourseEnrollmentEmail } from '@/lib/email-course-notifications';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createServerSupabaseClient();
    const { data: enrollments, error } = await supabase
      .from('enrollments')
      .select(
        `
        id,
        student_id,
        course_id,
        status,
        progress_percentage,
        enrolled_at,
        completed_at,
        courses (
          id,
          title,
          description,
          duration_hours
        )
      `
      )
      .eq('student_id', user.id)
      .order('enrolled_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
    }

    return NextResponse.json({ enrollments });
  } catch { /* Error handled silently */ 
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await parseBody<Record<string, any>>(request);
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: 'Missing courseId' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    // Check if already enrolled
    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', user.id)
      .eq('course_id', courseId)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Create enrollment
    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .insert({
        student_id: user.id,
        course_id: courseId,
        status: 'active',
        progress_percentage: 0,
        enrolled_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
    }

    return NextResponse.json(enrollment, { status: 201 });
  } catch { /* Error handled silently */ 
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
