import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { supabaseServer } from '@/lib/supabase-server';
import { withAuth } from '@/lib/with-auth';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export const POST = withAuth(
  async (request: Request, user) => {

  try {
    const course = await request.json();
    const supabase = supabaseServer();

    // Insert course
    const { data: courseData, error: courseError } = await supabase
      .from('courses')
      .insert({
        title: course.title,
        description: course.description,
        slug: course.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        status: 'draft',
      })
      .select()
      .single();

    if (courseError) {
      logger.error('Error creating course:', courseError);
      return NextResponse.json({ error: courseError.message }, { status: 500 });
    }

    // Insert modules
    for (const [moduleIndex, module] of course.modules.entries()) {
      const { data: moduleData, error: moduleError } = await supabase
        .from('modules')
        .insert({
          course_id: courseData.id,
          title: module.title,
          description: module.description,
          order: moduleIndex,
        })
        .select()
        .single();

      if (moduleError) {
        logger.error('Error creating module:', moduleError);
        continue;
      }

      // Insert lessons
      for (const [lessonIndex, lesson] of module.lessons.entries()) {
        const { error: lessonError } = await supabase
          .from('lessons')
          .insert({
            module_id: moduleData.id,
            title: lesson.title,
            description: lesson.description,
            content: JSON.stringify(lesson.blocks),
            order: lessonIndex,
          });

        if (lessonError) {
          logger.error('Error creating lesson:', lessonError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      course: courseData,
    });
  } catch { /* Error handled silently */ 
    logger.error('Error in course creation:', toError(error));
    return NextResponse.json(
      { error: toErrorMessage(error) || 'Failed to create course' },
      { status: 500 }
    );
  }

  },
  { roles: ['admin', 'super_admin'] }
);

export const GET = withAuth(
  async (request: Request, user) => {

  try {
    const supabase = supabaseServer();

    const { data: courses, error } = await supabase
      .from('courses')
      .select(`
        *,
        modules (
          *,
          lessons (*)
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
    }

    return NextResponse.json({ courses });
  } catch { /* Error handled silently */ 
    return NextResponse.json(
      { error: toErrorMessage(error) || 'Failed to fetch courses' },
      { status: 500 }
    );
  }

  },
  { roles: ['admin', 'super_admin'] }
);
