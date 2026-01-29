import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AvatarVideoOverlay from '@/components/AvatarVideoOverlay';
import {
  BookOpen,
  Play,
  Award,
  Bell,
  Settings,
  ChevronRight,
  CheckCircle,
  Target,
  Calendar,
  MessageSquare,
  BarChart3,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Dashboard | Elevate for Humanity',
  description: 'Access your courses, track progress, and continue learning.',
};

export const dynamic = 'force-dynamic';

interface Course {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  duration_hours: number | null;
  lesson_count: number | null;
}

interface Enrollment {
  id: string;
  progress: number | null;
  status: string;
  enrolled_at: string;
  last_accessed: string | null;
  course: Course | null;
}

interface Lesson {
  title: string;
  course_id: string;
}

interface Activity {
  id: string;
  completed_at: string;
  lesson: Lesson | null;
}

interface Assignment {
  id: string;
  title: string;
  course_title: string;
  due_date: string;
  course_id: string;
}

interface Certificate {
  id: string;
  title: string;
  issued_at: string;
}

interface Profile {
  id: string;
  full_name: string | null;
}

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

  const typedProfile = profile as Profile | null;

  // Get enrolled courses with progress (from enrollments table)
  const { data: courseEnrollments } = await supabase
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

  // Also get program enrollments (workforce programs)
  const { data: programEnrollments } = await supabase
    .from('program_enrollments')
    .select(`
      id,
      status,
      created_at,
      program:programs(
        id,
        name,
        description,
        slug,
        duration_weeks
      )
    `)
    .eq('student_id', user.id)
    .in('status', ['IN_PROGRESS', 'active']);

  // Also check student_enrollments (apprenticeship programs)
  const { data: studentEnrollments } = await supabase
    .from('student_enrollments')
    .select(`
      id,
      status,
      started_at,
      program_slug
    `)
    .eq('student_id', user.id)
    .eq('status', 'active');

  // Combine all enrollments for display
  const typedEnrollments = (courseEnrollments || []) as Enrollment[];
  const typedProgramEnrollments = programEnrollments || [];
  const typedStudentEnrollments = studentEnrollments || [];

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

  const typedActivity = (recentActivity || []) as Activity[];

  // Get upcoming assignments
  const courseIds = typedEnrollments.map(e => e.course?.id).filter(Boolean) as string[];
  const { data: assignments } = courseIds.length > 0 
    ? await supabase
        .from('assignments')
        .select('*')
        .in('course_id', courseIds)
        .gte('due_date', new Date().toISOString())
        .order('due_date', { ascending: true })
        .limit(5)
    : { data: [] };

  const typedAssignments = (assignments || []) as Assignment[];

  // Get certificates earned
  const { data: certificates } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', user.id)
    .order('issued_at', { ascending: false })
    .limit(3);

  const typedCertificates = (certificates || []) as Certificate[];

  // Get unread notifications
  const { count: notificationCount } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_read', false);

  // Calculate overall progress
  const totalProgress = typedEnrollments.length 
    ? Math.round(typedEnrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / typedEnrollments.length)
    : 0;

  const completedCourses = typedEnrollments.filter(e => e.progress === 100).length;

  // Find course to continue (most recently accessed, not completed)
  const continueCourse = typedEnrollments.find(e => (e.progress || 0) > 0 && (e.progress || 0) < 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Avatar Guide */}
      <AvatarVideoOverlay 
        videoSrc="/videos/avatars/ai-tutor.mp4"
        avatarName="AI Tutor"
        position="bottom-right"
        autoPlay={true}
        showOnLoad={true}
      />
      
      {/* Header */}
      <div className="bg-blue-900 text-white py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold truncate">Welcome back, {typedProfile?.full_name || 'Learner'}</h1>
              <p className="text-blue-200 text-sm sm:text-base">Continue your learning journey</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Link href="/lms/notifications" className="relative p-2 bg-blue-800 rounded-lg hover:bg-blue-700">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {notificationCount && notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </Link>
              <Link href="/lms/settings" className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Continue Learning Banner */}
        {continueCourse && (
          <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6 mb-4 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-14 h-10 sm:w-20 sm:h-14 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                  {continueCourse.course?.thumbnail_url ? (
                    <Image src={continueCourse.course.thumbnail_url} alt="" fill className="object-cover" sizes="80px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-500">Continue where you left off</p>
                  <h2 className="font-semibold text-sm sm:text-lg truncate">{continueCourse.course?.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-20 sm:w-32 h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-900 rounded-full" 
                        style={{ width: `${continueCourse.progress}%` }} 
                      />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">{continueCourse.progress}%</span>
                  </div>
                </div>
              </div>
              <Link 
                href={`/lms/courses/${continueCourse.course?.id}`}
                className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium hover:bg-red-700 text-sm sm:text-base"
              >
                <Play className="w-4 h-4" /> Continue
              </Link>
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-3 sm:p-5">
            <BookOpen className="w-5 h-5 sm:w-7 sm:h-7 text-blue-900 mb-1 sm:mb-2" />
            <div className="text-xl sm:text-2xl font-bold">{typedEnrollments.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Enrolled</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-3 sm:p-5">
            <CheckCircle className="w-5 h-5 sm:w-7 sm:h-7 text-green-600 mb-1 sm:mb-2" />
            <div className="text-xl sm:text-2xl font-bold">{completedCourses}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-3 sm:p-5">
            <Award className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-500 mb-1 sm:mb-2" />
            <div className="text-xl sm:text-2xl font-bold">{typedCertificates.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Certificates</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-3 sm:p-5">
            <Target className="w-5 h-5 sm:w-7 sm:h-7 text-red-600 mb-1 sm:mb-2" />
            <div className="text-xl sm:text-2xl font-bold">{totalProgress}%</div>
            <div className="text-gray-600 text-xs sm:text-sm">Progress</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* My Courses */}
            <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-semibold">My Courses</h2>
                <Link href="/lms/courses" className="text-blue-900 text-xs sm:text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              {typedEnrollments.length > 0 ? (
                <div className="space-y-2 sm:space-y-4">
                  {typedEnrollments.slice(0, 4).map((enrollment) => (
                    <Link 
                      key={enrollment.id} 
                      href={`/lms/courses/${enrollment.course?.id}`}
                      className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="w-12 h-9 sm:w-16 sm:h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0 relative">
                        {enrollment.course?.thumbnail_url ? (
                          <Image src={enrollment.course.thumbnail_url} alt="" fill className="object-cover" sizes="64px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate text-sm sm:text-base">{enrollment.course?.title}</h3>
                        <div className="flex items-center gap-2 sm:gap-3 mt-1">
                          <div className="flex-1 max-w-[80px] sm:max-w-[120px] h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-900 rounded-full" 
                              style={{ width: `${enrollment.progress || 0}%` }} 
                            />
                          </div>
                          <span className="text-[10px] sm:text-xs text-gray-500">{enrollment.progress || 0}%</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
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

            {/* Program Enrollments (Workforce Programs) */}
            {(typedProgramEnrollments.length > 0 || typedStudentEnrollments.length > 0) && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">My Programs</h2>
                  <Link href="/student/dashboard" className="text-blue-900 text-sm font-medium hover:underline">
                    View Dashboard
                  </Link>
                </div>
                <div className="space-y-4">
                  {typedProgramEnrollments.map((enrollment: any) => (
                    <Link 
                      key={enrollment.id} 
                      href={`/programs/${enrollment.program?.slug || enrollment.program?.id}`}
                      className="flex items-center gap-4 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition"
                    >
                      <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-green-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{enrollment.program?.name || 'Program'}</h3>
                        <p className="text-sm text-gray-500">
                          {enrollment.status === 'IN_PROGRESS' ? 'In Progress' : enrollment.status}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-200 text-green-800 text-xs font-medium rounded">
                        Workforce
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  ))}
                  {typedStudentEnrollments.map((enrollment: any) => (
                    <Link 
                      key={enrollment.id} 
                      href={`/apprentice`}
                      className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                    >
                      <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-purple-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{enrollment.program_slug || 'Apprenticeship'}</h3>
                        <p className="text-sm text-gray-500">Active Apprenticeship</p>
                      </div>
                      <span className="px-2 py-1 bg-purple-200 text-purple-800 text-xs font-medium rounded">
                        Apprentice
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Assignments */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Upcoming Assignments</h2>
                <Link href="/lms/assignments" className="text-blue-900 text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              {typedAssignments.length > 0 ? (
                <div className="space-y-3">
                  {typedAssignments.map((assignment) => (
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
              {typedActivity.length > 0 ? (
                <div className="space-y-3">
                  {typedActivity.map((activity) => (
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
              {typedCertificates.length > 0 ? (
                <div className="space-y-3">
                  {typedCertificates.map((cert) => (
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
