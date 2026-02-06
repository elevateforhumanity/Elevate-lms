import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { BookOpen, Clock, CheckCircle, Play } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Courses | Student Portal',
  description: 'View and continue your enrolled courses.',
};

export const dynamic = 'force-dynamic';

export default async function StudentCoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login?next=/student-portal/courses');

  // Fetch enrollments with course data
  const { data: enrollments, error } = await supabase
    .from('enrollments')
    .select(`
      id,
      progress,
      status,
      enrolled_at,
      completed_at,
      programs (
        id,
        name,
        description,
        duration_weeks,
        image_url
      )
    `)
    .eq('user_id', user.id)
    .order('enrolled_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses:', error.message);
  }

  const courses = (enrollments || []).map((e: any) => ({
    id: e.id,
    programId: e.programs?.id,
    name: e.programs?.name || 'Course',
    description: e.programs?.description || '',
    progress: e.progress || 0,
    status: e.status || 'active',
    enrolledAt: e.enrolled_at,
    completedAt: e.completed_at,
    durationWeeks: e.programs?.duration_weeks || 0,
    imageUrl: e.programs?.image_url,
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-1">Continue your learning journey</p>
        </div>

        {courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition">
                <div className="h-32 bg-slate-700 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white/80" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {course.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                    {course.durationWeeks > 0 && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.durationWeeks} weeks
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{course.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{course.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          course.status === 'completed' ? 'bg-green-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/lms/courses/${course.programId}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {course.status === 'completed' ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Review Course
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Continue
                      </>
                    )}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h2>
            <p className="text-gray-600 mb-6">Explore our programs and start learning today.</p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Programs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
