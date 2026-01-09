import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';
import { ComplianceNotice } from '@/components/compliance/ComplianceNotice';
import { getPoliciesForFeature } from '@/lib/policies';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Enrollments | Admin Dashboard',
  description: 'Manage student enrollments',
};

export default async function AdminEnrollmentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Get all enrollments with student and program details
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(
      `
      *,
      student:profiles!enrollments_student_id_fkey(
        id,
        full_name,
        email,
        phone
      ),
      program:programs(
        id,
        name,
        slug
      )
    `
    )
    .order('created_at', { ascending: false })
    .limit(100);

  // Calculate stats
  const activeCount =
    enrollments?.filter((e) => e.status === 'active').length || 0;
  const completedCount =
    enrollments?.filter((e) => e.status === 'completed').length || 0;
  const withdrawnCount =
    enrollments?.filter((e) => e.status === 'withdrawn').length || 0;
  const totalCount = enrollments?.length || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Enrollments</h1>
              <p className="text-slate-600 mt-1">
                Manage student enrollments and progress
              </p>
            </div>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <ComplianceNotice
          policies={getPoliciesForFeature('enrollment')}
          context="Enrollment requires verification of:"
          variant="compact"
        />
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-brand-blue-600" />
              <span className="text-3xl font-bold text-slate-900">
                {totalCount}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase">
              Total Enrollments
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-brand-green-600" />
              <span className="text-3xl font-bold text-brand-green-600">
                {activeCount}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase">
              Active
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <span className="text-3xl font-bold text-purple-600">
                {completedCount}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase">
              Completed
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-8 h-8 text-brand-orange-600" />
              <span className="text-3xl font-bold text-brand-orange-600">
                {withdrawnCount}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase">
              Withdrawn
            </h3>
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-xl font-bold text-slate-900">
              All Enrollments
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Enrolled
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {enrollments && enrollments.length > 0 ? (
                  enrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-slate-900">
                            {enrollment.student?.full_name || 'Unknown'}
                          </div>
                          <div className="text-sm text-slate-600">
                            {enrollment.student?.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">
                          {enrollment.program?.name || 'Unknown Program'}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(
                          enrollment.enrolled_at || enrollment.created_at
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            enrollment.status === 'active'
                              ? 'bg-brand-green-100 text-green-800'
                              : enrollment.status === 'completed'
                                ? 'bg-purple-100 text-purple-800'
                                : enrollment.status === 'withdrawn'
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/students/${enrollment.student_id}`}
                          className="text-brand-blue-600 hover:text-brand-blue-700 font-semibold text-sm"
                        >
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      No enrollments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
