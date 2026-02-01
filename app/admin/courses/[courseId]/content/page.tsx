import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Course Content | Elevate For Humanity',
  description: 'Manage course content, lessons, and materials.',
};

export default async function CourseContentPage({ params }: { params: { courseId: string } }) {
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Fetch course details
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', params.courseId)
    .single();

  // Fetch course lessons
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', params.courseId)
    .order('order_index');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm mb-4">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li><Link href="/admin" className="hover:text-primary">Admin</Link></li>
              <li>/</li>
              <li><Link href="/admin/courses" className="hover:text-primary">Courses</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">Content</li>
            </ol>
          </nav>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{course?.title || 'Course Content'}</h1>
              <p className="text-gray-600 mt-2">Manage lessons, videos, and materials</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add Lesson
            </button>
          </div>
        </div>

        {/* Content Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <p className="text-sm text-gray-500">Total Lessons</p>
            <p className="text-2xl font-bold">{lessons?.length || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <p className="text-sm text-gray-500">Videos</p>
            <p className="text-2xl font-bold">{lessons?.filter((l: any) => l.type === 'video').length || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <p className="text-sm text-gray-500">Quizzes</p>
            <p className="text-2xl font-bold">{lessons?.filter((l: any) => l.type === 'quiz').length || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-2xl font-bold">{course?.duration || '0h'}</p>
          </div>
        </div>

        {/* Lessons List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Course Lessons</h2>
            <p className="text-sm text-gray-500">Drag to reorder lessons</p>
          </div>
          <div className="divide-y">
            {lessons && lessons.length > 0 ? (
              lessons.map((lesson: any, index: number) => (
                <div key={lesson.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                  <div className="cursor-move text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                  </div>
                  <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-sm text-gray-500">{lesson.type} • {lesson.duration || '0 min'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No lessons yet</p>
                <button className="mt-2 text-blue-600 hover:text-blue-800">Add your first lesson</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
