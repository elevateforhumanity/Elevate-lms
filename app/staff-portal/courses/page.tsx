import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { safeFormatDate } from '@/lib/format-utils';

export const metadata: Metadata = {
  title: 'Course Management | Staff Portal',
  description: 'Manage courses, schedules, and curriculum.',
};

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: courses, count } = await supabase
    .from('courses')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(50);

  const activeCount = courses?.filter(c => c.status === 'active' || c.status === 'published').length || 0;
  const draftCount = courses?.filter(c => c.status === 'draft').length || 0;

  const quickActions = [
    {
      image: '/images/artlist/hero-training-1.jpg',
      title: 'Create Course',
      description: 'Add a new course to the catalog',
      href: '/admin/courses/new',
    },
    {
      image: '/images/artlist/hero-training-2.jpg',
      title: 'Manage Schedule',
      description: 'Set up class schedules and sessions',
      href: '/staff-portal/dashboard',
    },
    {
      image: '/images/artlist/hero-training-3.jpg',
      title: 'Upload Materials',
      description: 'Add course content and resources',
      href: '/creator/dashboard',
    },
    {
      image: '/images/artlist/hero-training-4.jpg',
      title: 'View Analytics',
      description: 'Track course performance metrics',
      href: '/admin/reports',
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
          poster="/images/artlist/hero-training-2.jpg"
        >
          <source src="/videos/staff-portal-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/85 to-purple-800/75" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Course Management</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Create, manage, and track courses for your training programs
          </p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/artlist/hero-training-5.jpg"
                alt="Total Courses"
                width={400}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-4xl font-bold">{count || 0}</p>
                <p className="text-sm">Total Courses</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/artlist/hero-training-6.jpg"
                alt="Active Courses"
                width={400}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-4xl font-bold">{activeCount}</p>
                <p className="text-sm">Active Courses</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/artlist/hero-training-7.jpg"
                alt="Draft Courses"
                width={400}
                height={200}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-4xl font-bold">{draftCount}</p>
                <p className="text-sm">Draft Courses</p>
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

          {/* Course List */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">All Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses && courses.length > 0 ? (
              courses.map((course: any) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
                >
                  <div className="relative h-40">
                    <Image
                      src={course.thumbnail_url || '/images/artlist/hero-training-1.jpg'}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === 'active' || course.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : course.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {course.status || 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 mb-2">{course.title}</h3>
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                      {course.description || 'No description'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {safeFormatDate(course.created_at)}
                      </span>
                      <Link
                        href={`/admin/courses/${course.id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center gap-1"
                      >
                        Edit <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
                <Image
                  src="/images/artlist/hero-training-8.jpg"
                  alt="No courses"
                  width={200}
                  height={150}
                  className="mx-auto rounded-lg mb-4 opacity-50"
                />
                <p className="text-slate-500">No courses found</p>
                <Link
                  href="/admin/courses/new"
                  className="inline-flex items-center gap-2 mt-4 text-indigo-600 font-medium"
                >
                  Create your first course <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
