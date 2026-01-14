// @ts-nocheck
import { Metadata } from 'next';
import Link from 'next/link';
import { requireAuth } from '@/lib/auth-guard';
import { requireRole } from '@/lib/rbac-guard';
import { BarChart, BookOpen, Users } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/staff-portal',
  },
  title: 'Staff Portal | Elevate For Humanity',
  description: 'Staff portal for managing students, courses, and operations.',
};

export default async function StaffPortalPage() {
  // Enforce authentication and role
  const session = await requireAuth();
  requireRole(session, ['admin', 'super_admin', 'advisor']);

  // Check if user has staff/admin access
  const allowedRoles = ['staff', 'admin', 'super_admin', 'instructor'];
  if (!profile || !allowedRoles.includes(profile.role)) {
    redirect('/unauthorized');
  }

  // Fetch dashboard data
  const { data: students, count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .eq('role', 'student')
    .order('created_at', { ascending: false })
    .limit(10);

  const { count: activeEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: totalCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true });

  const { data: recentEnrollments } = await supabase
    .from('enrollments')
    .select(
      `
      id,
      created_at,
      status,
      profiles (full_name, email),
      courses (title)
    `
    )
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black">
                Staff Portal
              </h1>
              <p className="text-black mt-1">
                Welcome back, {profile?.full_name || profile?.email}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/admin"
                className="px-4 py-2 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 transition"
              >
                Admin Dashboard
              </Link>
              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="px-4 py-2 border border-slate-300 text-black rounded-lg hover:bg-slate-50 transition"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black mb-1">Total Students</p>
                <p className="text-3xl font-bold text-black">
                  {totalStudents || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">
                  <Users className="w-5 h-5 inline-block" />
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black mb-1">
                  Active Enrollments
                </p>
                <p className="text-3xl font-bold text-brand-green-600">
                  {activeEnrollments || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-brand-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">
                  <BookOpen className="w-5 h-5 inline-block" />
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black mb-1">Total Courses</p>
                <p className="text-3xl font-bold text-brand-orange-600">
                  {totalCourses || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">
                  <BarChart className="w-5 h-5 inline-block" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-black mb-4">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/staff-portal/students"
              className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-gray-50 transition text-center"
            >
              <div className="text-3xl mb-2">
                <Users className="w-5 h-5 inline-block" />
              </div>
              <div className="font-semibold text-black">
                Manage Students
              </div>
              <div className="text-sm text-black mt-1">
                {totalStudents || 0} students
              </div>
            </Link>
            <Link
              href="/staff-portal/courses"
              className="p-4 border-2 border-slate-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-center"
            >
              <div className="text-3xl mb-2">
                <BookOpen className="w-5 h-5 inline-block" />
              </div>
              <div className="font-semibold text-black">View Courses</div>
              <div className="text-sm text-black mt-1">
                {totalCourses || 0} courses
              </div>
            </Link>
            <Link
              href="/staff-portal/dashboard"
              className="p-4 border-2 border-slate-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition text-center"
            >
              <div className="text-3xl mb-2">
                <BarChart className="w-5 h-5 inline-block" />
              </div>
              <div className="font-semibold text-black">Reports</div>
              <div className="text-sm text-black mt-1">View analytics</div>
            </Link>
            <Link
              href="/contact"
              className="p-4 border-2 border-slate-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center"
            >
              <div className="text-3xl mb-2">💬</div>
              <div className="font-semibold text-black">Support</div>
              <div className="text-sm text-black mt-1">Get help</div>
            </Link>
          </div>
        </div>

        {/* Recent Students */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black">
              Recent Students
            </h2>
            <Link
              href="/staff-portal/students"
              className="text-brand-blue-600 hover:text-brand-blue-700 font-semibold text-sm"
            >
              View All →
            </Link>
          </div>
          {students && students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-black">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-black">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-black">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-black">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student: any) => (
                    <tr
                      key={student.id}
                      className="border-b border-slate-100 hover:bg-slate-50"
                    >
                      <td className="py-3 px-4 text-sm text-black">
                        {student.full_name || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        {student.email}
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        {student.phone || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm text-black">
                        {new Date(student.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-black text-center py-8">No students found</p>
          )}
        </div>

        {/* Recent Enrollments */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-black mb-4">
            Recent Enrollments
          </h2>
          {recentEnrollments && recentEnrollments.length > 0 ? (
            <div className="space-y-4">
              {recentEnrollments.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-black">
                      {item.profiles?.full_name ||
                        item.profiles?.email ||
                        'Unknown'}
                    </p>
                    <p className="text-sm text-black">
                      {item.courses?.title || 'Unknown Course'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'active'
                          ? 'bg-brand-green-100 text-green-800'
                          : item.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-black'
                      }`}
                    >
                      {item.status}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-black text-center py-8">
              No recent enrollments
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
