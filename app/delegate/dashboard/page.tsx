import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Users, TrendingUp, AlertCircle, Download, Search, Filter } from 'lucide-react';
import { getCurrentUser, requireDelegate } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/auth';

export const metadata = {
  title: 'Caseload Dashboard | Elevate for Humanity',
  description: 'Manage your student caseload',
};

export default async function DelegateDashboard() {
  await requireDelegate();
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  const supabase = await createServerSupabaseClient();

  // Get delegate info
  const { data: delegate } = await supabase
    .from('delegates')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get assigned students with their enrollment and progress data
  const { data: students } = await supabase
    .from('students')
    .select(`
      id,
      wioa_eligible,
      funding_type,
      case_manager_name,
      case_manager_email,
      county,
      profiles!inner (
        full_name,
        email,
        phone
      ),
      enrollments (
        id,
        status,
        progress,
        enrolled_at,
        completed_at,
        courses!inner (
          title,
          duration_weeks
        )
      )
    `)
    .or(`case_manager_email.eq.${user.email},case_manager_name.ilike.%${user.user_metadata?.full_name || ''}%`);

  // Get attendance data for all students
  const studentIds = students?.map(s => s.id) || [];
  const { data: attendanceData } = await supabase
    .from('contact_hours')
    .select('student_id, total_hours, week_start')
    .in('student_id', studentIds)
    .gte('week_start', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('week_start', { ascending: false });

  // Get last login for each student
  const { data: lastLogins } = await supabase
    .from('attendance_log')
    .select('student_id, login_time')
    .in('student_id', studentIds)
    .order('login_time', { ascending: false });

  // Process student data
  const processedStudents = students?.map(student => {
    const lastLogin = lastLogins?.find(l => l.student_id === student.id);
    const recentHours = attendanceData?.filter(a => a.student_id === student.id)
      .reduce((sum, a) => sum + a.total_hours, 0) || 0;
    
    const activeEnrollment = student.enrollments?.find(e => e.status === 'active');
    const daysSinceLogin = lastLogin 
      ? Math.floor((Date.now() - new Date(lastLogin.login_time).getTime()) / (1000 * 60 * 60 * 24))
      : null;

    // Type guards for nested relations
    const profile = Array.isArray(student.profiles) ? student.profiles[0] : student.profiles;
    const course = activeEnrollment && (Array.isArray(activeEnrollment.courses) ? activeEnrollment.courses[0] : activeEnrollment.courses);

    return {
      id: student.id,
      name: profile?.full_name || 'Unknown',
      email: profile?.email || '',
      phone: profile?.phone || '',
      fundingType: student.funding_type,
      county: student.county,
      course: course?.title || 'No active enrollment',
      progress: activeEnrollment?.progress || 0,
      status: activeEnrollment?.status || 'not_enrolled',
      enrolledAt: activeEnrollment?.enrolled_at,
      lastLogin: lastLogin?.login_time,
      daysSinceLogin,
      recentHours,
      isAtRisk: daysSinceLogin !== null && daysSinceLogin > 7,
    };
  }) || [];

  // Calculate stats
  const totalStudents = processedStudents.length;
  const activeStudents = processedStudents.filter(s => s.status === 'active').length;
  const atRiskStudents = processedStudents.filter(s => s.isAtRisk).length;
  const avgProgress = totalStudents > 0 
    ? Math.round(processedStudents.reduce((sum, s) => sum + s.progress, 0) / totalStudents)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link href="/delegate/dashboard" className="text-red-600 font-semibold">Dashboard</Link>
          <Link href="/delegate/reports" className="text-gray-700 hover:text-red-600 font-medium">Reports</Link>
          <Link href="/delegate/students" className="text-gray-700 hover:text-red-600 font-medium">Students</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="elevate-hero">
        <div className="elevate-hero-content">
          <div className="elevate-hero-kicker">Case Manager Portal</div>
          <h1 className="elevate-hero-title">Your Caseload</h1>
          <p className="elevate-hero-subtitle">
            Monitor student progress, attendance, and compliance for WRG/WIOA programs
          </p>
        </div>
      </section>

      <main className="elevate-container py-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Total Students</div>
                <div className="text-2xl font-bold mt-1">{totalStudents}</div>
              </div>
              <Users className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {delegate?.caseload_limit ? `of ${delegate.caseload_limit} max` : 'Assigned to you'}
            </p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Active Enrollments</div>
                <div className="text-2xl font-bold mt-1">{activeStudents}</div>
              </div>
              <TrendingUp className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Currently in training</p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">At Risk</div>
                <div className="text-2xl font-bold mt-1 text-red-600">{atRiskStudents}</div>
              </div>
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-xs text-slate-400 mt-2">No login in 7+ days</p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Avg Progress</div>
                <div className="text-2xl font-bold mt-1">{avgProgress}%</div>
              </div>
              <TrendingUp className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Across all students</p>
          </div>
        </div>

        {/* At Risk Students Alert */}
        {atRiskStudents > 0 && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900 mb-1">Students Need Attention</h3>
              <p className="text-sm text-red-800">
                {atRiskStudents} student{atRiskStudents > 1 ? 's have' : ' has'} not logged in for 7+ days. 
                Consider reaching out to check on their progress and address any barriers.
              </p>
            </div>
          </div>
        )}

        {/* Student List */}
        <div className="elevate-card">
          <div className="elevate-card-header">
            <h2 className="elevate-card-title">Student Caseload</h2>
            <div className="flex gap-2">
              <button className="elevate-btn-secondary text-xs flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <Link href="/delegate/reports/export" className="elevate-btn-primary text-xs flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Link>
            </div>
          </div>

          <div className="elevate-table-container">
            <table className="elevate-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Funding</th>
                  <th>Progress</th>
                  <th>Last Login</th>
                  <th>Recent Hours</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {processedStudents.length > 0 ? (
                  processedStudents.map((student) => (
                    <tr key={student.id} className={student.isAtRisk ? 'bg-red-50' : ''}>
                      <td>
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.email}</div>
                        </div>
                      </td>
                      <td className="font-medium">{student.course}</td>
                      <td>
                        <span className={`elevate-pill text-xs ${
                          student.fundingType === 'wioa' ? 'elevate-pill--info' :
                          student.fundingType === 'wrg' ? 'elevate-pill--success' :
                          student.fundingType === 'jri' ? 'elevate-pill--warning' :
                          'elevate-pill--default'
                        }`}>
                          {student.fundingType?.toUpperCase() || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-600 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{student.progress}%</span>
                        </div>
                      </td>
                      <td>
                        {student.lastLogin ? (
                          <div>
                            <div className="text-sm">
                              {new Date(student.lastLogin).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className={`text-xs ${student.isAtRisk ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                              {student.daysSinceLogin} days ago
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400">Never</span>
                        )}
                      </td>
                      <td className="font-semibold">{student.recentHours}h</td>
                      <td>
                        <span className={`elevate-pill text-xs ${
                          student.status === 'active' ? 'elevate-pill--success' :
                          student.status === 'completed' ? 'elevate-pill--info' :
                          student.status === 'pending' ? 'elevate-pill--warning' :
                          'elevate-pill--default'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td>
                        <Link 
                          href={`/delegate/students/${student.id}`}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center text-gray-500 py-8">
                      No students assigned to your caseload yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Link href="/delegate/reports" className="elevate-card hover:border-red-500/50 transition-all">
            <div className="elevate-card-header">
              <h3 className="elevate-card-title">Generate Reports</h3>
              <p className="elevate-card-subtitle mt-1">
                Create compliance reports for DWD, WorkOne, or EmployIndy
              </p>
            </div>
          </Link>

          <Link href="/delegate/students" className="elevate-card hover:border-orange-500/50 transition-all">
            <div className="elevate-card-header">
              <h3 className="elevate-card-title">Manage Students</h3>
              <p className="elevate-card-subtitle mt-1">
                View detailed student profiles and add notes
              </p>
            </div>
          </Link>

          <Link href="/delegate/messages" className="elevate-card hover:border-blue-500/50 transition-all">
            <div className="elevate-card-header">
              <h3 className="elevate-card-title">Send Messages</h3>
              <p className="elevate-card-subtitle mt-1">
                Communicate with students and program holders
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
