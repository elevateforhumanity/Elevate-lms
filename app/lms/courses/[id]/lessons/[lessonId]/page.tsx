'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, FileText, Video, BookOpen } from 'lucide-react';
import AttendanceTracker from '@/components/lms/AttendanceTracker';

interface Props {
  params: {
    id: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [nextLesson, setNextLesson] = useState<any>(null);
  const [startTime] = useState(new Date());

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    loadLesson();
  }, [params.lessonId]);

  const loadLesson = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch lesson details
      const { data: lessonData } = await supabase
        .from('lessons')
        .select(`
          id,
          title,
          description,
          content,
          content_type,
          duration_minutes,
          order_index,
          is_required,
          modules!inner (
            id,
            title,
            course_id
          )
        `)
        .eq('id', params.lessonId)
        .single();

      if (!lessonData) {
        router.push(`/lms/courses/${params.id}`);
        return;
      }

      // Type guard: Extract module from array
      const module = Array.isArray(lessonData.modules) ? lessonData.modules[0] : lessonData.modules;

      setLesson(lessonData);

      // Fetch progress
      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('student_id', user.id)
        .eq('lesson_id', params.lessonId)
        .single();

      setProgress(progressData);

      // Find next lesson
      const { data: allLessons } = await supabase
        .from('lessons')
        .select('id, title, order_index')
        .eq('module_id', module?.id)
        .order('order_index', { ascending: true });

      const currentIndex = allLessons?.findIndex(l => l.id === parseInt(params.lessonId));
      if (currentIndex !== undefined && currentIndex !== -1 && allLessons && currentIndex < allLessons.length - 1) {
        setNextLesson(allLessons[currentIndex + 1]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error loading lesson:', error);
      setLoading(false);
    }
  };

  const markComplete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const now = new Date();
      const timeSpent = Math.round((now.getTime() - startTime.getTime()) / 60000);

      if (progress) {
        // Update existing progress
        await supabase
          .from('lesson_progress')
          .update({
            completed: true,
            completed_at: now.toISOString(),
            time_spent_minutes: (progress.time_spent_minutes || 0) + timeSpent,
          })
          .eq('id', progress.id);
      } else {
        // Create new progress
        await supabase
          .from('lesson_progress')
          .insert({
            student_id: user.id,
            lesson_id: parseInt(params.lessonId),
            completed: true,
            completed_at: now.toISOString(),
            time_spent_minutes: timeSpent,
          });
      }

      // Update enrollment progress
      await updateEnrollmentProgress(user.id);

      // Reload progress
      await loadLesson();

      // Navigate to next lesson or back to course
      if (nextLesson) {
        router.push(`/lms/courses/${params.id}/lessons/${nextLesson.id}`);
      } else {
        router.push(`/lms/courses/${params.id}`);
      }
    } catch (error) {
      console.error('Error marking complete:', error);
    }
  };

  const updateEnrollmentProgress = async (userId: string) => {
    try {
      // Get all lessons for this course
      const { data: modules } = await supabase
        .from('modules')
        .select('id')
        .eq('course_id', params.id);

      const moduleIds = modules?.map(m => m.id) || [];

      const { data: allLessons } = await supabase
        .from('lessons')
        .select('id')
        .in('module_id', moduleIds);

      const totalLessons = allLessons?.length || 0;

      // Get completed lessons
      const lessonIds = allLessons?.map(l => l.id) || [];
      const { data: completedProgress } = await supabase
        .from('lesson_progress')
        .select('id')
        .eq('student_id', userId)
        .in('lesson_id', lessonIds)
        .eq('completed', true);

      const completedCount = completedProgress?.length || 0;
      const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

      // Update enrollment
      await supabase
        .from('enrollments')
        .update({ progress: progressPercent })
        .eq('student_id', userId)
        .eq('course_id', params.id);

    } catch (error) {
      console.error('Error updating enrollment progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Lesson Not Found</h1>
          <Link href={`/lms/courses/${params.id}`} className="text-red-600 hover:text-red-700">
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  const getContentIcon = () => {
    switch (lesson.content_type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AttendanceTracker courseId={parseInt(params.id)} activityType="lesson" />
      
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <Link href={`/lms/courses/${params.id}`} className="text-gray-700 hover:text-red-600 font-medium flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>
      </header>

      <main className="elevate-container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Lesson Header */}
          <div className="elevate-card mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="elevate-pill elevate-pill--info text-xs">
                    {lesson.modules.title}
                  </span>
                  {lesson.is_required && (
                    <span className="elevate-pill elevate-pill--danger text-xs">
                      Required
                    </span>
                  )}
                  {progress?.completed && (
                    <span className="elevate-pill elevate-pill--success text-xs flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Completed
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                {lesson.description && (
                  <p className="text-gray-600">{lesson.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                {getContentIcon()}
                <span className="capitalize">{lesson.content_type}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{lesson.duration_minutes} minutes</span>
              </div>
              {progress?.time_spent_minutes && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Time spent: {progress.time_spent_minutes} min</span>
                </div>
              )}
            </div>
          </div>

          {/* Lesson Content */}
          <div className="elevate-card mb-6">
            <div className="prose max-w-none">
              {lesson.content_type === 'video' && lesson.content && (
                <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm opacity-75">Video player will be integrated here</p>
                    <p className="text-xs opacity-50 mt-2">Video URL: {lesson.content}</p>
                  </div>
                </div>
              )}

              {lesson.content_type === 'document' && lesson.content && (
                <div className="p-6 bg-gray-50 rounded-lg mb-6">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-center text-gray-600 mb-4">Document content</p>
                  <a 
                    href={lesson.content} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="elevate-btn-primary mx-auto block w-fit"
                  >
                    Open Document
                  </a>
                </div>
              )}

              {lesson.content_type === 'text' && lesson.content && (
                <div 
                  className="lesson-content"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
              )}

              {!lesson.content && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Lesson content is being prepared.</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link 
              href={`/lms/courses/${params.id}`}
              className="elevate-btn-secondary flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Course
            </Link>

            {!progress?.completed ? (
              <button
                onClick={markComplete}
                className="elevate-btn-primary flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Mark as Complete
              </button>
            ) : nextLesson ? (
              <Link
                href={`/lms/courses/${params.id}/lessons/${nextLesson.id}`}
                className="elevate-btn-primary flex items-center gap-2"
              >
                Next Lesson
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href={`/lms/courses/${params.id}`}
                className="elevate-btn-primary flex items-center gap-2"
              >
                Back to Course
                <CheckCircle className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
