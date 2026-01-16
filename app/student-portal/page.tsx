import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  FileText,
  Users,
  Award,
  Clock,
  MessageSquare,
  Briefcase,
  GraduationCap,
  BarChart3,
  Bell,
  Settings,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Student Portal | Elevate For Humanity',
  description: 'Access your courses, track progress, view grades, and manage your schedule.',
};

export const dynamic = 'force-dynamic';

export default async function StudentPortalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/student-portal');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      id,
      status,
      progress,
      enrolled_at,
      course:courses(id, title, thumbnail_url)
    `)
    .eq('user_id', user.id)
    .order('enrolled_at', { ascending: false })
    .limit(4);

  const { data: assignments } = await supabase
    .from('assignments')
    .select('*')
    .in('course_id', enrollments?.map((e: any) => e.course?.id).filter(Boolean) || [])
    .gte('due_date', new Date().toISOString())
    .order('due_date', { ascending: true })
    .limit(5);

  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(3);

  const { data: certificates } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', user.id)
    .order('issued_at', { ascending: false })
    .limit(3);

  const { count: messageCount } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('recipient_id', user.id)
    .eq('is_read', false);

  const quickLinks = [
    { icon: BookOpen, title: 'My Courses', href: '/student-portal/courses', color: 'blue' },
    { icon: Calendar, title: 'Schedule', href: '/student-portal/schedule', color: 'green' },
    { icon: BarChart3, title: 'Grades', href: '/student-portal/grades', color: 'purple' },
    { icon: Users, title: 'Instructors', href: '/student-portal/instructors', color: 'orange' },
    { icon: Briefcase, title: 'Career Services', href: '/career-services', color: 'teal' },
    { icon: FileText, title: 'Documents', href: '/student-portal/documents', color: 'indigo' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || 'Student'}</h1>
              <p className="text-blue-100 mt-1">Your learning dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/student-portal/messages" className="relative p-2 bg-blue-500 rounded-lg hover:bg-blue-400">
                <MessageSquare className="w-5 h-5" />
                {messageCount && messageCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {messageCount}
                  </span>
                )}
              </Link>
              <Link href="/student-portal/settings" className="p-2 bg-blue-500 rounded-lg hover:bg-blue-400">
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-white rounded-xl border p-4 hover:shadow-md transition flex items-center gap-3"
                >
                  <div className={`w-10 h-10 bg-${link.color}-100 rounded-lg flex items-center justify-center`}>
                    <link.icon className={`w-5 h-5 text-${link.color}-600`} />
                  </div>
                  <span className="font-medium">{link.title}</span>
                </Link>
              ))}
            </div>

            {/* My Courses */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">My Courses</h2>
                <Link href="/student-portal/courses" className="text-blue-600 text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              {enrollments && enrollments.length > 0 ? (
                <div className="space-y-4">
                  {enrollments.map((enrollment: any) => (
                    <div key={enrollment.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        {enrollment.course?.thumbnail_url ? (
                          <img src={enrollment.course.thumbnail_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{enrollment.course?.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${enrollment.progress || 0}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-500">{enrollment.progress || 0}%</span>
                        </div>
                      </div>
                      <Link href={`/lms/courses/${enrollment.course?.id}`} className="text-blue-600 text-sm font-medium">
                        Continue
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <p>No courses enrolled yet</p>
                  <Link href="/programs" className="text-blue-600 font-medium hover:underline">
                    Browse Programs
                  </Link>
                </div>
              )}
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
                <Link href="/student-portal/assignments" className="text-blue-600 text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              {assignments && assignments.length > 0 ? (
                <div className="space-y-3">
                  {assignments.map((assignment: any) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{assignment.title}</h3>
                        <p className="text-sm text-gray-500">{assignment.course_title}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-orange-600">
                          {new Date(assignment.due_date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">Due</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <p>No upcoming deadlines</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Announcements */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Announcements</h2>
              </div>
              {announcements && announcements.length > 0 ? (
                <div className="space-y-4">
                  {announcements.map((announcement: any) => (
                    <div key={announcement.id} className="border-l-4 border-blue-500 pl-3">
                      <h3 className="font-medium text-sm">{announcement.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No announcements</p>
              )}
            </div>

            {/* Certificates */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold">Certificates</h2>
              </div>
              {certificates && certificates.length > 0 ? (
                <div className="space-y-3">
                  {certificates.map((cert: any) => (
                    <div key={cert.id} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-yellow-600" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{cert.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(cert.issued_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Award className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Complete courses to earn certificates</p>
                </div>
              )}
            </div>

            {/* Quick Help */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm">
                <Link href="/student-portal/handbook" className="block text-blue-600 hover:underline">
                  Student Handbook
                </Link>
                <Link href="/faq" className="block text-blue-600 hover:underline">
                  FAQs
                </Link>
                <Link href="/support" className="block text-blue-600 hover:underline">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
