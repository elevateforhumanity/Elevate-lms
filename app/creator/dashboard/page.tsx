import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  Users,
  TrendingUp,
  DollarSign,
  Video,
  FileText,
} from 'lucide-react';

/**
 * CREATOR DASHBOARD
 *
 * For content creators who build and sell courses on the platform.
 * Part of the Skool-like community learning system.
 */
export default async function CreatorDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/creator/dashboard');
  }

  // Get creator profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'creator') {
    redirect('/dashboard');
  }

  // Get creator profile with stats
  const { data: creatorProfile } = await supabase
    .from('creator_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get creator's courses with enrollment counts
  const { data: courses } = await supabase
    .from('creator_courses')
    .select(
      `
      *,
      creator_enrollments(count)
    `
    )
    .eq('creator_id', user.id)
    .order('created_at', { ascending: false });

  // Get total stats
  const totalCourses = courses?.length || 0;
  const totalStudents = creatorProfile?.total_students || 0;
  const totalRevenue = creatorProfile?.total_revenue || 0;

  // Calculate engagement (students who completed at least one lesson)
  const { data: activeEnrollments } = await supabase
    .from('creator_enrollments')
    .select('id')
    .in('course_id', courses?.map((c) => c.id) || [])
    .gt('completed_lessons', 0);

  const engagementRate =
    totalStudents > 0
      ? Math.round(((activeEnrollments?.length || 0) / totalStudents) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Creator Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your courses and community
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalCourses}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalStudents}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Engagement</p>
                <p className="text-2xl font-bold text-gray-900">
                  {engagementRate}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/creator/courses/new"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <Video className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Create Course
            </h3>
            <p className="text-sm text-gray-600">
              Build a new course for your community
            </p>
          </Link>

          <Link
            href="/creator/community"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <Users className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage Community
            </h3>
            <p className="text-sm text-gray-600">Engage with your students</p>
          </Link>

          <Link
            href="/creator/analytics"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <TrendingUp className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              View Analytics
            </h3>
            <p className="text-sm text-gray-600">Track your performance</p>
          </Link>
        </div>

        {/* Courses List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Courses
            </h2>
          </div>
          <div className="p-6">
            {courses && courses.length > 0 ? (
              <div className="space-y-4">
                {courses.map((course: any) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {course.description}
                      </p>
                      <p className="text-sm text-gray-700 mt-2">
                        {course.enrollments?.[0]?.count || 0} students enrolled
                      </p>
                    </div>
                    <Link
                      href={`/creator/courses/${course.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Manage
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No courses yet</p>
                <Link
                  href="/creator/courses/new"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Course
                </Link>
              </div>
            )}

            {/* Creator Tools */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Creator Tools</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Link href="/creator/products" aria-label="Link" className="p-3 bg-white border rounded-lg hover:border-blue-500 hover:shadow text-sm">My Products</Link>
                <Link href="/creator/dashboard" aria-label="Link" className="p-3 bg-white border rounded-lg hover:border-blue-500 hover:shadow text-sm">Dashboard</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
