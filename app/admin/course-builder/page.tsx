import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Plus, Edit, Trash2, GripVertical, Video, FileText, CheckSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Course Builder | Admin | Elevate For Humanity',
  description: 'Build and manage course content.',
};

const statusColors: Record<string, string> = {
  true: 'bg-green-100 text-green-800',
  false: 'bg-gray-100 text-gray-800',
};

const categoryColors: Record<string, string> = {
  Healthcare: 'from-blue-500 to-cyan-500',
  'Skilled Trades': 'from-orange-500 to-amber-500',
  Technology: 'from-purple-500 to-indigo-500',
  Business: 'from-green-500 to-emerald-500',
};

export default async function AdminCourseBuilderPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/admin/course-builder');
  }

  // Fetch courses from database
  let courses: any[] | null = null;
  let error: any = null;
  let totalCourses = 0;
  let publishedCourses = 0;
  let totalModules = 0;
  let totalLessons = 0;

  try {
    const result = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    courses = result.data;
    error = result.error;

    if (!error) {
      const { count: total } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true });
      totalCourses = total || 0;

      const { count: published } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);
      publishedCourses = published || 0;
    }
  } catch (e) {
    error = { message: 'Table not found. Please run the migration.' };
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Builder</h1>
            <p className="text-gray-600 mt-1">Create and manage course content</p>
          </div>
          <Link 
            href="/admin/course-builder/new"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Course
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalCourses || 0}</p>
                <p className="text-sm text-gray-500">Total Courses</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{publishedCourses || 0}</p>
                <p className="text-sm text-gray-500">Published</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalModules || 0}</p>
                <p className="text-sm text-gray-500">Modules</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalLessons || 0}</p>
                <p className="text-sm text-gray-500">Lessons</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Courses</h2>
          </div>
          
          {error ? (
            <div className="p-8 text-center">
              <div className="text-red-600 mb-4">Database table not found</div>
              <p className="text-gray-600 mb-4">
                Run the migration in Supabase Dashboard SQL Editor:
              </p>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                supabase/migrations/20260125_admin_tables.sql
              </code>
            </div>
          ) : !courses || courses.length === 0 ? (
            <div className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-500 mb-4">Create your first course to get started</p>
              <Link
                href="/admin/course-builder/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
                Create Course
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {courses.map((course) => {
                return (
                  <div key={course.id} className="px-6 py-4 hover:bg-gray-50 flex items-center gap-4">
                    <button className="cursor-grab hover:bg-gray-100 p-1 rounded">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                    </button>
                    <div className="w-16 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <Link href={`/admin/course-builder/${course.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                        {course.course_name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {course.course_code}
                        {course.duration_hours && ` • ${course.duration_hours} hours`}
                        {course.price && ` • $${course.price}`}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {course.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/admin/course-builder/${course.id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-gray-500" />
                      </Link>
                      <button className="p-2 hover:bg-red-50 rounded-lg" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            href="/admin/course-builder/templates"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-blue-300 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">Course Templates</h3>
            <p className="text-sm text-gray-500 mt-1">Start from pre-built templates</p>
          </Link>
          <Link 
            href="/admin/course-builder/media"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-blue-300 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">Media Library</h3>
            <p className="text-sm text-gray-500 mt-1">Manage videos and images</p>
          </Link>
          <Link 
            href="/admin/course-builder/assessments"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-blue-300 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">Assessment Bank</h3>
            <p className="text-sm text-gray-500 mt-1">Create and manage quizzes</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
