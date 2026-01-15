import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { safeFormatDate } from '@/lib/format-utils';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/staff-portal/students',
  },
  title: 'Student Management | Staff Portal',
  description: 'Manage students, track progress, and monitor enrollments.',
};

export default async function StudentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch students with enrollments
  const { data: students, count } = await supabase
    .from('profiles')
    .select('*, enrollments(*, programs(name))', { count: 'exact' })
    .eq('role', 'student')
    .order('created_at', { ascending: false })
    .limit(50);

  // Get counts
  const activeCount = students?.filter(s => 
    s.enrollments?.some((e: any) => e.status === 'active')
  ).length || 0;

  const recentCount = students?.filter(s => {
    const created = new Date(s.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return created > weekAgo;
  }).length || 0;

  const quickActions = [
    {
      image: '/images/artlist/hero-training-1.jpg',
      title: 'Add New Student',
      description: 'Register a new student in the system',
      href: '/admin/students/new',
    },
    {
      image: '/images/artlist/hero-training-2.jpg',
      title: 'Bulk Import',
      description: 'Import multiple students from CSV',
      href: '/admin/students/import',
    },
    {
      image: '/images/artlist/hero-training-3.jpg',
      title: 'Export Data',
      description: 'Download student data for reporting',
      href: '/admin/students/export',
    },
    {
      image: '/images/artlist/hero-training-4.jpg',
      title: 'Send Message',
      description: 'Communicate with students',
      href: '/staff-portal/campaigns',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Hero */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/artlist/hero-training-1.jpg"
        >
          <source src="/videos/staff-portal-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 to-purple-800/75" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Management</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Track student progress, manage enrollments, and support student success
          </p>
        </div>
      </section>

      {/* Stats Cards with Images */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/artlist/hero-training-5.jpg"
                alt="Total Students"
                width={400}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-4xl font-bold">{count || 0}</p>
                <p className="text-sm">Total Students</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/artlist/hero-training-6.jpg"
                alt="Active Students"
                width={400}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-4xl font-bold">{activeCount}</p>
                <p className="text-sm">Active Enrollments</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/artlist/hero-training-7.jpg"
                alt="New This Week"
                width={400}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-4xl font-bold">{recentCount}</p>
                <p className="text-sm">New This Week</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-24 overflow-hidden">
                  <Image
                    src={action.image}
                    alt={action.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-slate-900 text-sm">{action.title}</h3>
                  <p className="text-slate-600 text-xs">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Student List */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">All Students</h2>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {students && students.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Program</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Joined</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {students.map((student: any) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-600 font-semibold">
                                {(student.full_name || student.email || '?')[0].toUpperCase()}
                              </span>
                            </div>
                            <span className="font-medium text-slate-900">
                              {student.full_name || 'No Name'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{student.email}</td>
                        <td className="px-6 py-4 text-slate-600">
                          {student.enrollments?.[0]?.programs?.name || 'Not Enrolled'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.enrollments?.some((e: any) => e.status === 'active')
                              ? 'bg-green-100 text-green-800'
                              : student.enrollments?.some((e: any) => e.status === 'pending')
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {student.enrollments?.some((e: any) => e.status === 'active')
                              ? 'Active'
                              : student.enrollments?.some((e: any) => e.status === 'pending')
                              ? 'Pending'
                              : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-sm">
                          {safeFormatDate(student.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/students/${student.id}`}
                            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center gap-1"
                          >
                            View <ArrowRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Image
                  src="/images/artlist/hero-training-8.jpg"
                  alt="No students"
                  width={200}
                  height={150}
                  className="mx-auto rounded-lg mb-4 opacity-50"
                />
                <p className="text-slate-500">No students found</p>
                <Link
                  href="/admin/students/new"
                  className="inline-flex items-center gap-2 mt-4 text-indigo-600 font-medium"
                >
                  Add your first student <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
