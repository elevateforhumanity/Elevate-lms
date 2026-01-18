// @ts-nocheck
import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Play,
  Award,
  Clock,
  BarChart3,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  ChevronRight,
  CheckCircle,
  Target,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Dashboard | Elevate for Humanity',
  description: 'Access your courses, track progress, and continue learning.',
};

export const dynamic = 'force-dynamic';

export default async function LMSPage() {
  const supabase = await createClient();
  if (!supabase) { redirect("/login"); }
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/lms');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get enrolled courses with progress
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      id,
      progress,
      status,
      enrolled_at,
      last_accessed,
      course:courses(
        id,
        title,
        description,
        thumbnail_url,
        duration_hours,
        lesson_count
      )
    `)
    .eq('user_id', user.id)
    .order('last_accessed', { ascending: false });

  // Get recent activity
  const { data: recentActivity } = await supabase
    .from('lesson_progress')
    .select(`
      id,
      completed_at,
      lesson:lessons(title, course_id)
    `)
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })
    .limit(5);

  // Get upcoming assignments
  const { data: assignments } = await supabase
    .from('assignments')
    .select('*')
    .in('course_id', enrollments?.map((e: any) => e.course?.id).filter(Boolean) || [])
    .gte('due_date', new Date().toISOString())
    .order('due_date', { ascending: true })
    .limit(5);

  // Get certificates earned
  const { data: certificates } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', user.id)
    .order('issued_at', { ascending: false })
    .limit(3);

  // Get unread notifications
  const { count: notificationCount } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_read', false);

  // Calculate overall progress
  const totalProgress = enrollments?.length 
    ? Math.round(enrollments.reduce((sum: number, e: any) => sum + (e.progress || 0), 0) / enrollments.length)
    : 0;

  const completedCourses = enrollments?.filter((e: any) => e.progress === 100).length || 0;

  // Find course to continue (most recently accessed, not completed)
  const continueCourse = enrollments?.find((e: any) => e.progress > 0 && e.progress < 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {profile?.full_name || 'Learner'}</h1>
              <p className="text-blue-200">Continue your learning journey</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/lms/notifications" className="relative p-2 bg-blue-800 rounded-lg hover:bg-blue-700">
                <Bell className="w-5 h-5" />
                {notificationCount && notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </Link>
              <Link href="/lms/settings" className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700">
                <Settings className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Continue Learning Banner */}
        {continueCourse && (
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-14 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                  {continueCourse.course?.thumbnail_url ? (
                    <Image src={continueCourse.course.thumbnail_url} alt="" fill className="object-cover" sizes="80px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Continue where you left off</p>
                  <h2 className="font-semibold text-lg">{continueCourse.course?.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-900 rounded-full" 
                        style={{ width: `${continueCourse.progress}%` }} 
                      />
                    </div>
                    <span className="text-sm text-gray-500">{continueCourse.progress}% complete</span>
                  </div>
                </div>
              </div>
              <Link 
                href={`/lms/courses/${continueCourse.course?.id}`}
                className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-700"
              >
                <Play className="w-4 h-4" /> Continue
              </Link>
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <BookOpen className="w-7 h-7 text-blue-900 mb-2" />
            <div className="text-2xl font-bold">{enrollments?.length || 0}</div>
            <div className="text-gray-600 text-sm">Enrolled Courses</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <CheckCircle className="w-7 h-7 text-green-600 mb-2" />
            <div className="text-2xl font-bold">{completedCourses}</div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <Award className="w-7 h-7 text-yellow-500 mb-2" />
            <div className="text-2xl font-bold">{certificates?.length || 0}</div>
            <div className="text-gray-600 text-sm">Certificates</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <Target className="w-7 h-7 text-red-600 mb-2" />
            <div className="text-2xl font-bold">{totalProgress}%</div>
            <div className="text-gray-600 text-sm">Overall Progress</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Courses */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">My Courses</h2>
                <Link href="/lms/courses" className="text-blue-900 text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              {enrollments && enrollments.length > 0 ? (
                <div className="space-y-4">
                  {enrollments.slice(0, 4).map((enrollment: any) => (
                    <Link 
                      key={enrollment.id} 
                      href={`/lms/courses/${enrollment.course?.id}`}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="w-16 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative">
                        {enrollment.course?.thumbnail_url ? (
                          <Image src={enrollment.course.thumbnail_url} alt="" fill className="object-cover" sizes="64px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{enrollment.course?.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex-1 max-w-[120px] h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-900 rounded-full" 
                              style={{ width: `${enrollment.progress || 0}%` }} 
                            />
                          </div>
                          <span className="text-xs text-gray-500">{enrollment.progress || 0}%</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-gray-500 mb-3">No courses enrolled yet</p>
                  <Link href="/programs" className="text-blue-900 font-medium hover:underline">
                    Browse Available Programs
                  </Link>
                </div>
              )}
            </div>

            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Upcoming Assignments</h2>
                <Link href="/lms/assignments" className="text-blue-900 text-sm font-medium hover:underline">
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
                        <p className="text-sm font-medium text-red-600">
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
                  <p>No upcoming assignments</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              {recentActivity && recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((activity: any) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">{activity.lesson?.title}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(activity.completed_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No recent activity</p>
              )}
            </div>

            {/* Certificates */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Certificates</h2>
                <Link href="/lms/certificates" className="text-blue-900 text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              {certificates && certificates.length > 0 ? (
                <div className="space-y-3">
                  {certificates.map((cert: any) => (
                    <div key={cert.id} className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                      <Award className="w-5 h-5 text-yellow-600" />
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
                <div className="text-center py-4">
                  <Award className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm text-gray-500">Complete courses to earn certificates</p>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <Link href="/lms/schedule" className="flex items-center gap-2 text-blue-900 hover:underline">
                  <Calendar className="w-4 h-4" /> Class Schedule
                </Link>
                <Link href="/lms/messages" className="flex items-center gap-2 text-blue-900 hover:underline">
                  <MessageSquare className="w-4 h-4" /> Messages
                </Link>
                <Link href="/lms/analytics" className="flex items-center gap-2 text-blue-900 hover:underline">
                  <BarChart3 className="w-4 h-4" /> Learning Analytics
                </Link>
                <Link href="/support" className="flex items-center gap-2 text-blue-900 hover:underline">
                  <Clock className="w-4 h-4" /> Get Help
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
