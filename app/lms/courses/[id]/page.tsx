import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BookOpen, Clock, Award, PlayCircle, CheckCircle, Lock, ArrowLeft } from 'lucide-react';
import { getCurrentUser, requireStudent } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/auth';
import AttendanceTracker from '@/components/lms/AttendanceTracker';

export const metadata = {
  title: 'Course | Elevate LMS',
  description: 'Course content and lessons',
};

interface Props {
  params: {
    id: string;
  };
}

export default async function CoursePage({ params }: Props) {
  await requireStudent();
  const user = await getCurrentUser();
  const supabase = await createServerSupabaseClient();

  // Fetch course details
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select(`
      id,
      title,
      description,
      duration_weeks,
      price,
      programs!inner (
        id,
        name,
        slug
      )
    `)
    .eq('id', params.id)
    .single();

  if (courseError || !course) {
    redirect('/lms/courses');
  }

  // Type guard: Extract program from array
  const program = Array.isArray(course.programs) ? course.programs[0] : course.programs;

  // Check enrollment
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('id, status, progress, enrolled_at')
    .eq('student_id', user.id)
    .eq('course_id', params.id)
    .single();

  if (!enrollment) {
    redirect('/lms/courses');
  }

  // Fetch modules with lessons
  const { data: modules } = await supabase
    .from('modules')
    .select(`
      id,
      title,
      description,
      order_index,
      lessons (
        id,
        title,
        description,
        content_type,
        duration_minutes,
        order_index,
        is_required
      )
    `)
    .eq('course_id', params.id)
    .order('order_index', { ascending: true });

  // Fetch lesson progress
  const lessonIds = modules?.flatMap(m => m.lessons.map((l: any) => l.id)) || [];
  const { data: progressData } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed, completed_at, time_spent_minutes')
    .eq('student_id', user.id)
    .in('lesson_id', lessonIds);

  // Create progress map
  const progressMap = new Map(progressData?.map(p => [p.lesson_id, p]) || []);

  // Calculate stats
  const totalLessons = lessonIds.length;
  const completedLessons = progressData?.filter(p => p.completed).length || 0;
  const totalMinutes = modules?.reduce((sum, m) => 
    sum + m.lessons.reduce((lSum: number, l: any) => lSum + (l.duration_minutes || 0), 0), 0
  ) || 0;
  const completedMinutes = progressData?.reduce((sum, p) => sum + (p.time_spent_minutes || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <AttendanceTracker courseId={parseInt(params.id)} activityType="course_view" />
      
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <Link href="/lms/courses" className="text-gray-700 hover:text-red-600 font-medium flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Link>
      </header>

      {/* Course Header */}
      <section className="bg-gradient-to-br from-red-600 via-orange-500 to-blue-600 text-white py-12">
        <div className="elevate-container">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold mb-2 opacity-90">{program?.name}</div>
            <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-lg opacity-90 mb-6">{course.description}</p>
            
            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full h-3 overflow-hidden mb-3">
              <div
                className="bg-white h-full rounded-full transition-all"
                style={{ width: `${enrollment.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>{completedLessons} of {totalLessons} lessons completed</span>
              <span className="font-bold">{enrollment.progress}%</span>
            </div>
          </div>
        </div>
      </section>

      <main className="elevate-container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="elevate-card">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="text-sm text-gray-500">Modules</div>
                    <div className="text-xl font-bold">{modules?.length || 0}</div>
                  </div>
                </div>
              </div>
              <div className="elevate-card">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="text-xl font-bold">{Math.round(totalMinutes / 60)}h</div>
                  </div>
                </div>
              </div>
              <div className="elevate-card">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Progress</div>
                    <div className="text-xl font-bold">{enrollment.progress}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modules & Lessons */}
            <div className="space-y-4">
              {modules && modules.length > 0 ? (
                modules.map((module, moduleIndex) => {
                  const moduleLessons = module.lessons || [];
                  const moduleCompleted = moduleLessons.filter((l: any) => 
                    progressMap.get(l.id)?.completed
                  ).length;
                  const moduleProgress = moduleLessons.length > 0 
                    ? Math.round((moduleCompleted / moduleLessons.length) * 100)
                    : 0;

                  return (
                    <div key={module.id} className="elevate-card">
                      {/* Module Header */}
                      <div className="elevate-card-header border-b border-gray-200 pb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-bold text-gray-500">
                              Module {moduleIndex + 1}
                            </span>
                            <span className="elevate-pill elevate-pill--info text-xs">
                              {moduleCompleted}/{moduleLessons.length} completed
                            </span>
                          </div>
                          <h2 className="elevate-card-title">{module.title}</h2>
                          {module.description && (
                            <p className="elevate-card-subtitle mt-1">{module.description}</p>
                          )}
                        </div>
                        {/* Module Progress */}
                        <div className="w-24">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-600 rounded-full"
                              style={{ width: `${moduleProgress}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 text-center mt-1">
                            {moduleProgress}%
                          </div>
                        </div>
                      </div>

                      {/* Lessons List */}
                      <div className="space-y-2 pt-4">
                        {moduleLessons.map((lesson: any, lessonIndex: number) => {
                          const progress = progressMap.get(lesson.id);
                          const isCompleted = progress?.completed || false;
                          const isLocked = lessonIndex > 0 && !progressMap.get(moduleLessons[lessonIndex - 1].id)?.completed;

                          return (
                            <Link
                              key={lesson.id}
                              href={isLocked ? '#' : `/lms/courses/${params.id}/lessons/${lesson.id}`}
                              className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                                isLocked
                                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                                  : isCompleted
                                  ? 'border-green-200 bg-green-50 hover:border-green-300'
                                  : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                              }`}
                            >
                              {/* Icon */}
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isLocked
                                  ? 'bg-gray-200'
                                  : isCompleted
                                  ? 'bg-green-500'
                                  : 'bg-red-600'
                              }`}>
                                {isLocked ? (
                                  <Lock className="h-5 w-5 text-gray-500" />
                                ) : isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-white" />
                                ) : (
                                  <PlayCircle className="h-5 w-5 text-white" />
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-900">
                                    {lessonIndex + 1}. {lesson.title}
                                  </h3>
                                  {lesson.is_required && (
                                    <span className="elevate-pill elevate-pill--danger text-xs">
                                      Required
                                    </span>
                                  )}
                                </div>
                                {lesson.description && (
                                  <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                                )}
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {lesson.duration_minutes} min
                                  </span>
                                  <span className="capitalize">{lesson.content_type}</span>
                                  {isCompleted && progress?.completed_at && (
                                    <span className="text-green-600 font-medium">
                                      Completed {new Date(progress.completed_at).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Arrow */}
                              {!isLocked && (
                                <div className="text-gray-400">
                                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="elevate-card text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">No Content Yet</h3>
                  <p className="text-gray-600">
                    Course content is being prepared. Check back soon!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <div className="elevate-card">
              <h3 className="font-bold text-gray-900 mb-4">Course Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`elevate-pill text-xs ${
                    enrollment.status === 'active' ? 'elevate-pill--success' :
                    enrollment.status === 'completed' ? 'elevate-pill--info' :
                    'elevate-pill--warning'
                  }`}>
                    {enrollment.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Enrolled</span>
                  <span className="font-medium">
                    {new Date(enrollment.enrolled_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{course.duration_weeks} weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Lessons</span>
                  <span className="font-medium">{totalLessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium">{completedLessons}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="elevate-card">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/lms/attendance" className="elevate-btn-secondary w-full text-center block">
                  View Attendance
                </Link>
                <Link href="/lms/progress" className="elevate-btn-secondary w-full text-center block">
                  Track Progress
                </Link>
                <Link href="/lms/certificates" className="elevate-btn-secondary w-full text-center block">
                  My Certificates
                </Link>
              </div>
            </div>

            {/* Help */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-sm text-blue-800 mb-3">
                Having trouble with a lesson? Contact your instructor or case manager for support.
              </p>
              <Link href="/lms/messages" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Send Message →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
