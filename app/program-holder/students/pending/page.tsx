import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { UserPlus, Mail, Phone, CheckCircle, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pending Applications | Program Holder Portal',
  description: 'Review pending student applications',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/program-holder/students/pending',
  },
};

export default async function PendingStudentsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'program_holder') redirect('/');

  // Get program holder record
  const { data: programHolder } = await supabase
    .from('program_holders')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!programHolder) {
    redirect('/program-holder/apply');
  }

  // Fetch pending applications
  // Note: This assumes there's an applications table or pending status in enrollments
  // For now, we'll check for enrollments with 'pending' status
  const { data: pendingApplications, count } = await supabase
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
    .eq('status', 'pending')
    .order('enrolled_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/hero/portal-hero.jpg"
          alt="Pending Applications"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <UserPlus className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Pending Applications
          </h1>
          <p className="text-lg text-gray-100">
            Review and accept student enrollment requests
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-2">
                  <UserPlus className="h-8 w-8 text-brand-orange-600" />
                  <h3 className="text-sm font-medium text-gray-600">
                    Pending Applications
                  </h3>
                </div>
                <p className="text-3xl font-bold text-brand-orange-600">
                  {count || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="h-8 w-8 text-brand-green-600" />
                  <h3 className="text-sm font-medium text-gray-600">
                    This Week
                  </h3>
                </div>
                <p className="text-3xl font-bold text-brand-green-600">
                  {pendingApplications?.filter((a) => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(a.enrolled_at) >= weekAgo;
                  }).length || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-2">
                  <XCircle className="h-8 w-8 text-slate-600" />
                  <h3 className="text-sm font-medium text-gray-600">
                    Awaiting Review
                  </h3>
                </div>
                <p className="text-3xl font-bold text-slate-600">
                  {count || 0}
                </p>
              </div>
            </div>

            {/* Applications List */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Applications to Review
                </h2>
                <Link
                  href="/program-holder/students"
                  className="text-brand-blue-600 hover:text-brand-blue-700 font-medium"
                >
                  View All Students →
                </Link>
              </div>

              {pendingApplications && pendingApplications.length > 0 ? (
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
                          Applied
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">
                          Contact
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingApplications.map((application) => (
                        <tr
                          key={application.id}
                          className="border-b hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium text-slate-900">
                              {application.student?.first_name}{' '}
                              {application.student?.last_name}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {application.program?.name || 'N/A'}
                          </td>
                          <td className="py-3 px-4 text-slate-600">
                            {new Date(
                              application.enrolled_at
                            ).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              {application.student?.email && (
                                <a
                                  href={`mailto:${application.student.email}`}
                                  className="text-brand-blue-600 hover:text-brand-blue-700"
                                  title="Email"
                                >
                                  <Mail className="h-4 w-4" />
                                </a>
                              )}
                              {application.student?.phone && (
                                <a
                                  href={`tel:${application.student.phone}`}
                                  className="text-brand-blue-600 hover:text-brand-blue-700"
                                  title="Phone"
                                >
                                  <Phone className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="px-3 py-1 bg-brand-green-600 hover:bg-brand-green-700 text-white text-sm font-medium rounded transition-colors">
                                Accept
                              </button>
                              <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors">
                                Decline
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <UserPlus className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">
                    No Pending Applications
                  </h3>
                  <p className="text-slate-600 mb-6">
                    There are no student applications waiting for review.
                  </p>
                  <Link
                    href="/program-holder/students"
                    className="inline-flex items-center px-6 py-3 bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    View All Students
                  </Link>
                </div>
              )}

              <div className="mt-6 flex justify-between items-center">
                <Link
                  href="/program-holder/students"
                  className="text-brand-blue-600 hover:text-brand-blue-700 font-medium"
                >
                  ← Back to All Students
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
