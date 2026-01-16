import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Clock, Award, DollarSign, BookOpen, Users, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Course Catalog | Elevate For Humanity',
  description: 'Browse our catalog of professional certification courses and training programs.',
};

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const supabase = await createClient();

  // Get all active courses
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .eq('is_active', true)
    .order('title', { ascending: true });

  // Get course categories
  const { data: categories } = await supabase
    .from('course_categories')
    .select('*')
    .order('name', { ascending: true });

  // Get enrollment counts per course
  const { data: enrollmentCounts } = await supabase
    .from('enrollments')
    .select('course_id')
    .eq('status', 'active');

  const courseEnrollments = enrollmentCounts?.reduce((acc: Record<string, number>, e: any) => {
    acc[e.course_id] = (acc[e.course_id] || 0) + 1;
    return acc;
  }, {}) || {};

  // Get total stats
  const { count: totalCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  const { count: totalEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Course Catalog</h1>
          <p className="text-xl text-blue-100 max-w-2xl mb-8">
            Professional certifications and training programs to advance your career.
          </p>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{totalCourses || 0}</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{totalEnrollments || 0}+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{categories?.length || 0}</div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories Filter */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/courses"
              className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium"
            >
              All Courses
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/courses?category=${cat.slug}`}
                className="px-4 py-2 bg-white border rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Course Grid */}
        {courses && courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition"
              >
                <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 relative">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-blue-400" />
                    </div>
                  )}
                  {course.is_featured && (
                    <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    {course.category && (
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{course.category}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    {course.duration_hours && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration_hours}h
                      </span>
                    )}
                    {course.certification_name && (
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Certified
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {courseEnrollments[course.id] || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="font-bold text-lg">
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                      </span>
                    </div>
                    <Link
                      href={`/courses/${course.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold mb-2">No courses available</h2>
            <p className="text-gray-600 mb-6">Check back soon for new courses.</p>
            <Link href="/programs" className="text-blue-600 font-medium hover:underline">
              Browse Training Programs
            </Link>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Enroll in a course today and take the next step in your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100"
            >
              Apply Now
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center bg-blue-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-400 border-2 border-white"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
