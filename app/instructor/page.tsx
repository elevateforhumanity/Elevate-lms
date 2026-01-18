import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Users, Calendar, BarChart, FileText, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Instructor Dashboard | Elevate For Humanity',
  description: 'Manage your courses, students, and teaching materials.',
};

export const dynamic = 'force-dynamic';

export default async function InstructorPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login?redirect=/instructor');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: courses } = await supabase
    .from('courses')
    .select('id, title')
    .eq('instructor_id', user.id)
    .limit(5);

  const { count: studentCount } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .in('course_id', courses?.map(c => c.id) || []);

  const links = [
    { href: '/instructor/courses', icon: BookOpen, label: 'My Courses', desc: 'Manage your course content' },
    { href: '/instructor/students', icon: Users, label: 'Students', desc: 'View enrolled students' },
    { href: '/instructor/schedule', icon: Calendar, label: 'Schedule', desc: 'Manage class schedules' },
    { href: '/instructor/analytics', icon: BarChart, label: 'Analytics', desc: 'Track student progress' },
    { href: '/instructor/materials', icon: FileText, label: 'Materials', desc: 'Upload teaching resources' },
    { href: '/instructor/settings', icon: Settings, label: 'Settings', desc: 'Account preferences' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <p className="text-purple-100">Welcome back, {profile?.full_name || 'Instructor'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
            <div className="text-2xl font-bold">{courses?.length || 0}</div>
            <div className="text-gray-600 text-sm">Active Courses</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <div className="text-2xl font-bold">{studentCount || 0}</div>
            <div className="text-gray-600 text-sm">Total Students</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <Calendar className="w-8 h-8 text-green-600 mb-2" />
            <div className="text-2xl font-bold">0</div>
            <div className="text-gray-600 text-sm">Upcoming Classes</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition">
              <link.icon className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900">{link.label}</h3>
              <p className="text-sm text-gray-600">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
