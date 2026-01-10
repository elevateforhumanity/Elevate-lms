import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'HSI Enrollments | Admin Dashboard',
  description: 'Manage HSI (Health & Safety Institute) partner enrollments',
};

export default async function HSIEnrollmentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Get HSI enrollments from partner courses
  const { data: hsiEnrollments, count } = await supabase
    .from('partner_course_enrollments')
    .select(
      `
      *,
      student:profiles!partner_course_enrollments_student_id_fkey(
        id,
        full_name,
        email
      ),
      course:partner_lms_courses(
        id,
        course_name,
        provider:partner_lms_providers(
          provider_name,
          provider_type
        )
      )
    `,
      { count: 'exact' }
    )
    .eq('course.provider.provider_type', 'HSI')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">HSI Enrollments</h1>
          <p className="mt-2 text-gray-600">
            Health & Safety Institute partner course enrollments
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Total Enrollments: {count || 0}
                </h2>
              </div>
              <Link
                href="/admin/courses/partners"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Manage Partner Courses
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Enrolled
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hsiEnrollments?.map((enrollment: any) => (
                  <tr key={enrollment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {enrollment.student?.full_name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-700">
                        {enrollment.student?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {enrollment.course?.course_name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          enrollment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : enrollment.status === 'active'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {enrollment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {enrollment.progress_percentage || 0}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(enrollment.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(!hsiEnrollments || hsiEnrollments.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-700">No HSI enrollments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
