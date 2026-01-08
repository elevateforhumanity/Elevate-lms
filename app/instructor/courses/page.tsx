import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Courses | Elevate for Humanity',
  description: 'Manage your courses',
};

export default async function InstructorCoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let courses = null;
  
  if (user) {
    try {
      const { data } = await supabase
        .from('courses')
        .select('*, enrollments(count)')
        .eq('instructor_id', user.id)
        .order('created_at', { ascending: false });
      courses = data;
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Courses</h1>
      </div>

      {!user ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-900 mb-4">
            Please log in to view your courses.
          </p>
          <a
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log In
          </a>
        </div>
      ) : !courses || courses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <p className="text-slate-600 mb-4">No courses assigned yet.</p>
          <p className="text-slate-500 text-sm">
            Contact your program coordinator to get assigned to courses.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/instructor/courses/${course.id}`}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{course.course_name || course.title}</h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="text-sm text-slate-500">
                Students: {course.enrollments?.[0]?.count || 0}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
