// @ts-nocheck
import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { safeFormatDate } from '@/lib/format-utils';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/staff-portal/dashboard',
  },
  title: 'Staff Dashboard | Elevate For Humanity',
  description: 'Staff portal for managing students, enrollments, and support tasks.',
};

export default async function StaffDashboard() {
  const { user, profile } = await requireRole(['staff', 'admin', 'super_admin']);
  const supabase = await createClient();

  // Get student counts
  const { count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  // Get active enrollments
  const { count: activeEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  // Get at-risk students
  const { count: atRiskCount } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('at_risk', true);

  // Get pending enrollments
  const { count: pendingEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  // Get recent enrollments
  const { data: recentEnrollments } = await supabase
    .from('enrollments')
    .select(`
      id,
      status,
      created_at,
      profiles!enrollments_user_id_fkey (full_name, email),
      programs (name)
    `)
    .order('created_at', { ascending: false })
    .limit(10);

  const quickActions = [
    {
      image: '/hero-images/healthcare-cat-new.jpg',
      title: 'Manage Students',
      description: `${totalStudents || 0} total students`,
      href: '/staff-portal/students',
    },
    {
      image: '/hero-images/skilled-trades-cat-new.jpg',
      title: 'Course Management',
      description: 'Manage courses and curriculum',
      href: '/staff-portal/courses',
    },
    {
      image: '/hero-images/technology-cat-new.jpg',
      title: 'Training Resources',
      description: 'Staff training and guides',
      href: '/staff-portal/training',
    },
    {
      image: '/hero-images/business-hero.jpg',
      title: 'Customer Service',
      description: 'Support tools and templates',
      href: '/staff-portal/customer-service',
    },
    {
      image: '/hero-images/cdl-cat-new.jpg',
      title: 'QA Checklist',
      description: 'Quality assurance tools',
      href: '/staff-portal/qa-checklist',
    },
    {
      image: '/hero-images/barber-beauty-cat-new.jpg',
      title: 'Reports',
      description: 'Generate reports and analytics',
      href: '/admin/reports',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Hero */}
      <section className="relative h-[250px] md:h-[300px] flex items-center justify-center text-white overflow-hidden">
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Staff Dashboard</h1>
          <p className="text-lg text-white/90">
            Welcome back, {profile.full_name || profile.email}
          </p>
        </div>
      </section>

      {/* Stats Cards with Images */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/hero-images/healthcare-category.jpg"
                alt="Total Students"
                width={400}
                height={200}
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-3xl font-bold">{totalStudents || 0}</p>
                <p className="text-sm">Total Students</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/hero-images/skilled-trades-category.jpg"
                alt="Active Enrollments"
                width={400}
                height={200}
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-3xl font-bold">{activeEnrollments || 0}</p>
                <p className="text-sm">Active Enrollments</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/hero-images/technology-category.jpg"
                alt="At-Risk Students"
                width={400}
                height={200}
                className="w-full h-36 object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${(atRiskCount || 0) > 0 ? 'from-yellow-900/90' : 'from-gray-900/90'} to-transparent`} />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-3xl font-bold">{atRiskCount || 0}</p>
                <p className="text-sm">At-Risk Students</p>
              </div>
              {(atRiskCount || 0) > 0 && (
                <span className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                  Needs Attention
                </span>
              )}
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/hero-images/business-category.jpg"
                alt="Pending Enrollments"
                width={400}
                height={200}
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-3xl font-bold">{pendingEnrollments || 0}</p>
                <p className="text-sm">Pending Enrollments</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
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
                  <p className="text-slate-500 text-xs">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            {recentEnrollments && recentEnrollments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Program</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentEnrollments.map((enrollment: any) => (
                      <tr key={enrollment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-600 font-semibold">
                                {(enrollment.profiles?.full_name || enrollment.profiles?.email || '?')[0].toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">
                                {enrollment.profiles?.full_name || 'No Name'}
                              </p>
                              <p className="text-slate-500 text-sm">{enrollment.profiles?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {enrollment.programs?.name || 'Not Assigned'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            enrollment.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : enrollment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : enrollment.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {enrollment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-sm">
                          {safeFormatDate(enrollment.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/enrollments/${enrollment.id}`}
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
                  src="/hero-images/how-it-works-hero.jpg"
                  alt="No activity"
                  width={200}
                  height={150}
                  className="mx-auto rounded-lg mb-4 opacity-50"
                />
                <p className="text-slate-500">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
