import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, TrendingUp, Download, ArrowLeft } from 'lucide-react';
import { getCurrentUser, requireStudent } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/auth';

export const metadata = {
  title: 'Attendance & Hours | Elevate LMS',
  description: 'Track your attendance and contact hours',
};

export default async function AttendancePage() {
  await requireStudent();
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  const supabase = await createServerSupabaseClient();

  // Fetch attendance logs
  const { data: attendanceLogsRaw } = await supabase
    .from('attendance_log')
    .select(`
      id,
      login_time,
      logout_time,
      duration_minutes,
      activity_type,
      notes,
      courses!inner (
        title
      )
    `)
    .eq('student_id', user.id)
    .order('login_time', { ascending: false })
    .limit(50);

  // Map logs with type guards
  const attendanceLogs = attendanceLogsRaw?.map(log => ({
    ...log,
    course: Array.isArray(log.courses) ? log.courses[0] : log.courses
  }));

  // Fetch weekly contact hours summary
  const { data: weeklyHours } = await supabase
    .from('contact_hours')
    .select('*')
    .eq('student_id', user.id)
    .order('week_start', { ascending: false })
    .limit(12);

  // Calculate totals
  const totalHours = attendanceLogs?.reduce((sum, log) => sum + (log.duration_minutes || 0), 0) || 0;
  const totalSessions = attendanceLogs?.length || 0;
  const avgSessionMinutes = totalSessions > 0 ? Math.round(totalHours / totalSessions) : 0;

  // Get current week hours
  const currentWeekHours = weeklyHours?.[0]?.total_hours || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link href="/lms/dashboard" className="text-gray-700 hover:text-red-600 font-medium">Dashboard</Link>
          <Link href="/lms/courses" className="text-gray-700 hover:text-red-600 font-medium">Courses</Link>
          <Link href="/lms/attendance" className="text-red-600 font-semibold">Attendance</Link>
          <Link href="/lms/certificates" className="text-gray-700 hover:text-red-600 font-medium">Certificates</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="elevate-hero">
        <div className="elevate-hero-content">
          <div className="elevate-hero-kicker">Attendance Tracking</div>
          <h1 className="elevate-hero-title">Your Contact Hours</h1>
          <p className="elevate-hero-subtitle">
            Track your learning time for WRG/WIOA compliance and program completion
          </p>
        </div>
      </section>

      <main className="elevate-container py-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Total Hours</div>
                <div className="text-2xl font-bold mt-1">{Math.round(totalHours / 60)}</div>
              </div>
              <Clock className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">All-time learning hours</p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">This Week</div>
                <div className="text-2xl font-bold mt-1">{currentWeekHours}</div>
              </div>
              <TrendingUp className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Hours logged this week</p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Total Sessions</div>
                <div className="text-2xl font-bold mt-1">{totalSessions}</div>
              </div>
              <Calendar className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Learning sessions completed</p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Avg Session</div>
                <div className="text-2xl font-bold mt-1">{avgSessionMinutes}m</div>
              </div>
              <Clock className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Average session length</p>
          </div>
        </div>

        {/* Weekly Hours Chart */}
        <div className="elevate-card mb-8">
          <div className="elevate-card-header">
            <h2 className="elevate-card-title">Weekly Contact Hours</h2>
            <button className="elevate-btn-secondary text-xs flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
          <div className="space-y-3">
            {weeklyHours && weeklyHours.length > 0 ? (
              weeklyHours.map((week) => {
                const weekStart = new Date(week.week_start);
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekEnd.getDate() + 6);
                
                return (
                  <div key={week.id} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-gray-600">
                      {weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex-1">
                      <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-end pr-3 text-white text-sm font-semibold"
                          style={{ width: `${Math.min((week.total_hours / 40) * 100, 100)}%` }}
                        >
                          {week.total_hours > 0 && `${week.total_hours}h`}
                        </div>
                      </div>
                    </div>
                    <div className="w-24 text-right">
                      <span className="elevate-pill elevate-pill--success text-xs">
                        {week.sessions_count} sessions
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-8">No attendance data yet. Start learning to track your hours!</p>
            )}
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="elevate-card">
          <div className="elevate-card-header">
            <h2 className="elevate-card-title">Recent Activity</h2>
          </div>
          <div className="elevate-table-container">
            <table className="elevate-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Course</th>
                  <th>Activity</th>
                  <th>Login Time</th>
                  <th>Logout Time</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {attendanceLogs && attendanceLogs.length > 0 ? (
                  attendanceLogs.map((log) => {
                    const loginTime = new Date(log.login_time);
                    const logoutTime = log.logout_time ? new Date(log.logout_time) : null;
                    const hours = Math.floor((log.duration_minutes || 0) / 60);
                    const minutes = (log.duration_minutes || 0) % 60;

                    return (
                      <tr key={log.id}>
                        <td>{loginTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                        <td className="font-medium">{log.course?.title || 'N/A'}</td>
                        <td>
                          <span className="elevate-pill elevate-pill--info text-xs">
                            {log.activity_type || 'Learning'}
                          </span>
                        </td>
                        <td>{loginTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                        <td>{logoutTime ? logoutTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'In Progress'}</td>
                        <td className="font-semibold">
                          {hours > 0 && `${hours}h `}{minutes}m
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-500 py-8">
                      No attendance records found. Your learning sessions will appear here automatically.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-2">About Contact Hours</h3>
          <p className="text-sm text-blue-800">
            Contact hours are automatically tracked when you're actively learning in the platform. 
            For WRG and WIOA programs, you must complete a minimum number of contact hours per week to maintain eligibility. 
            Your case manager can view and export these reports for compliance documentation.
          </p>
        </div>
      </main>
    </div>
  );
}
