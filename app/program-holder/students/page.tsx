import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  GraduationCap,
  TrendingUp,
  Clock,
  Mail,
  Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Students | Program Holder Portal',
  description: 'Manage your enrolled students',
  alternates: {
    canonical: 'https://elevateforhumanity.org/program-holder/students',
  },
};

export default async function StudentsPage() {
  const supabase = await createClient();
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

  if (!profile || profile.role !== 'program_holder') {
    redirect('/');
  }

  // Get program holder record
  const { data: programHolder } = await supabase
    .from('program_holders')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!programHolder) {
    redirect('/program-holder/apply');
  }

  // Fetch students enrolled with this program holder
  const { data: students, count: totalStudents } = await supabase
    .from('program_holder_students')
    .select(
      `
      *,
      student:profiles!student_id(
        id,
        first_name,
        last_name,
        email,
        phone
      ),
      program:programs(
        name,
        slug
      )
    `,
      { count: 'exact' }
    )
    .eq('program_holder_id', programHolder.id)
    .order('enrolled_at', { ascending: false })
    .limit(50);

  // Get active students count
  const { count: activeStudents } = await supabase
    .from('program_holder_students')
    .select('*', { count: 'exact', head: true })
    .eq('program_holder_id', programHolder.id)
    .eq('status', 'active');

  // Get completed students count
  const { count: completedStudents } = await supabase
    .from('program_holder_students')
    .select('*', { count: 'exact', head: true })
    .eq('program_holder_id', programHolder.id)
    .eq('status', 'completed');

  // Get recent students (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const { count: recentStudents } = await supabase
    .from('program_holder_students')
    .select('*', { count: 'exact', head: true })
    .eq('program_holder_id', programHolder.id)
    .gte('enrolled_at', weekAgo.toISOString());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/hero/portal-hero.jpg"
          alt="Student Management"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Student Management
          </h1>
          <p className="text-lg text-gray-100">
            View and manage your enrolled students
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-8 w-8 text-brand-blue-600" />
                  <h3 className="text-sm font-medium text-gray-600">
                    Total Students
                  </h3>
                </div>
                <p className="text-3xl font-bold text-brand-blue-600">
                  {totalStudents || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="h-8 w-8 text-brand-green-600" />
                  <h3 className="text-sm font-medium text-gray-600">
                    Active Students
                  </h3>
                </div>
                <p className="text-3xl font-bold text-brand-green-600">
                  {activeStudents || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <h3 className="text-sm font-medium text-gray-600">
                    Completed
                  </h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  {completedStudents || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-8 w-8 text-brand-orange-600" />
                  <h3 className="text-sm font-medium text-gray-600">
                    Recent (7 days)
                  </h3>
                </div>
                <p className="text-3xl font-bold text-brand-orange-600">
                  {recentStudents || 0}
                </p>
              </div>
            </div>

            {/* Students List */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Enrolled Students
                </h2>
                <Link
                  href="/program-holder/students/pending"
                  className="text-brand-blue-600 hover:text-brand-blue-700 font-medium"
                >
                  View Pending →
                </Link>
              </div>

              {students && students.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">
                          Student
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">
                          Program
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">
                          Enrolled
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">
                          Contact
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((enrollment) => (
                        <tr
                          key={enrollment.id}
                          className="border-b hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium text-slate-900">
                              {enrollment.student?.first_name}{' '}
                              {enrollment.student?.last_name}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {enrollment.program?.name || 'N/A'}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 text-xs rounded ${
                                enrollment.status === 'active'
                                  ? 'bg-brand-green-100 text-green-800'
                                  : enrollment.status === 'completed'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {enrollment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {new Date(
                              enrollment.enrolled_at
                            ).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              {enrollment.student?.email && (
                                <a
                                  href={`mailto:${enrollment.student.email}`}
                                  className="text-brand-blue-600 hover:text-brand-blue-700"
                                  title="Email"
                                >
                                  <Mail className="h-4 w-4" />
                                </a>
                              )}
                              {enrollment.student?.phone && (
                                <a
                                  href={`tel:${enrollment.student.phone}`}
                                  className="text-brand-blue-600 hover:text-brand-blue-700"
                                  title="Phone"
                                >
                                  <Phone className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    No Students Yet
                  </h3>
                  <p className="text-slate-600 mb-6">
                    You haven't enrolled any students yet.
                  </p>
                  <Link
                    href="/program-holder/students/pending"
                    className="inline-flex items-center px-6 py-3 bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    View Pending Applications
                  </Link>
                </div>
              )}

              <div className="mt-6 flex justify-between items-center">
                <Link
                  href="/program-holder/dashboard"
                  className="text-brand-blue-600 hover:text-brand-blue-700 font-medium"
                >
                  ← Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
