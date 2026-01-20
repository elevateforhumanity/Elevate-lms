import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import CoursePlayer from './CoursePlayer';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}): Promise<Metadata> {
  const supabase = await createClient();
  
  if (!supabase) {
    return {
      title: 'Learn | Elevate For Humanity',
    };
  }

  const { data: course } = await supabase
    .from('courses')
    .select('title, description')
    .eq('id', params.courseId)
    .single();

  return {
    title: course ? `${course.title} | Learn | Elevate For Humanity` : 'Learn | Elevate For Humanity',
    description: course?.description || 'Access your course content and start learning.',
    alternates: {
      canonical: `https://www.elevateforhumanity.org/courses/${params.courseId}/learn`,
    },
  };
}

export default async function LearnPage({ params }: { params: { courseId: string } }) {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect(`/login?redirect=/courses/${params.courseId}/learn`);
  }

  // Check enrollment
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', params.courseId)
    .single();

  if (!enrollment) {
    redirect(`/courses/${params.courseId}/enroll`);
  }

  // Fetch course with lessons
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', params.courseId)
    .single();

  if (courseError || !course) {
    notFound();
  }

  // Fetch lessons ordered by order_index
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', params.courseId)
    .order('order_index', { ascending: true });

  // Fetch user's lesson progress
  const { data: progressData } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed, completed_at')
    .eq('user_id', user.id)
    .eq('course_id', params.courseId);

  // Map progress to lessons
  const progressMap = new Map(
    progressData?.map((p) => [p.lesson_id, p.completed]) || []
  );

  const lessonsWithProgress = (lessons || []).map((lesson, index) => ({
    id: lesson.id,
    title: lesson.title,
    order: lesson.order_index || index + 1,
    duration: lesson.duration_minutes ? lesson.duration_minutes * 60 : undefined,
    completed: progressMap.get(lesson.id) || false,
    video_url: lesson.video_url,
    content: lesson.content,
  }));

  return (
    <CoursePlayer
      courseId={params.courseId}
      courseTitle={course.title}
      lessons={lessonsWithProgress}
    />
  );
}
