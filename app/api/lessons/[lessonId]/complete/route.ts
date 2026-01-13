export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId } = await params;
    const body = await request.json().catch(() => ({}));
    const { timeSpentSeconds } = body;

    const supabase = await createClient();

    // Get lesson to find course_id
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('id, course_id, title')
      .eq('id', lessonId)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Check if user is enrolled in the course
    const { data: enrollment } = await supabase
      .from('enrollments')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('course_id', lesson.course_id)
      .single();

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Not enrolled in this course' },
        { status: 403 }
      );
    }

    // Mark lesson as complete
    const { data: progress, error: progressError } = await supabase
      .from('lesson_progress')
      .upsert(
        {
          user_id: user.id,
          lesson_id: lessonId,
          course_id: lesson.course_id,
          completed: true,
          completed_at: new Date().toISOString(),
          time_spent_seconds: timeSpentSeconds || 0,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,lesson_id',
        }
      )
      .select()
      .single();

    if (progressError) {
      console.error('Lesson completion error:', progressError);
      return NextResponse.json(
        { error: 'Failed to mark lesson complete' },
        { status: 500 }
      );
    }

    // Get updated course progress
    const { data: allLessons } = await supabase
      .from('lessons')
      .select('id')
      .eq('course_id', lesson.course_id);

    const { data: completedLessons } = await supabase
      .from('lesson_progress')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', lesson.course_id)
      .eq('completed', true);

    const totalLessons = allLessons?.length || 0;
    const completedCount = completedLessons?.length || 0;
    const progressPercent = totalLessons > 0 
      ? Math.round((completedCount / totalLessons) * 100) 
      : 0;

    // Check if course is now complete
    const courseCompleted = progressPercent === 100;

    // Get certificate if course completed
    let certificate = null;
    if (courseCompleted) {
      const { data: cert } = await supabase
        .from('certificates')
        .select('id, certificate_number, issued_at')
        .eq('user_id', user.id)
        .eq('course_id', lesson.course_id)
        .single();
      certificate = cert;
    }

    return NextResponse.json({
      success: true,
      lessonId,
      lessonTitle: lesson.title,
      completed: true,
      completedAt: progress.completed_at,
      courseProgress: {
        completedLessons: completedCount,
        totalLessons,
        progressPercent,
        courseCompleted,
      },
      certificate,
    });
  } catch (error) {
    console.error('Lesson complete API error:', error);
    return NextResponse.json(
      { error: 'Failed to complete lesson' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId } = await params;
    const supabase = await createClient();

    // Mark lesson as incomplete
    const { error } = await supabase
      .from('lesson_progress')
      .update({
        completed: false,
        completed_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .eq('lesson_id', lessonId);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to mark lesson incomplete' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lessonId,
      completed: false,
    });
  } catch (error) {
    console.error('Lesson uncomplete API error:', error);
    return NextResponse.json(
      { error: 'Failed to uncomplete lesson' },
      { status: 500 }
    );
  }
}
