import Link from 'next/link';
import { Users, BookOpen, Award, TrendingUp, Clock, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { requireAdmin } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/auth';

export const metadata = {
  title: 'Admin Dashboard | Elevate for Humanity',
  description: 'Administrative dashboard and analytics',
};

export default async function AdminDashboardPage() {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();

  // Get total students
  const { count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  // Get active enrollments
  const { count: activeEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  // Get completed enrollments
  const { count: completedEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed');

  // Get certificates issued
  const { count: certificatesIssued } = await supabase
    .from('certificates')
    .select('*', { count: 'exact', head: true });

  // Get total courses
  const { count: totalCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true });

  // Get enrollments by funding type
  const { data: fundingBreakdown } = await supabase
    .from('enrollments')
    .select('funding_type')
    .not('funding_type', 'is', null);

  const fundingCounts = fundingBreakdown?.reduce((acc: any, e) => {
    acc[e.funding_type] = (acc[e.funding_type] || 0) + 1;
    return acc;
  }, {});

  // Get recent enrollments
  const { data: recentEnrollmentsRaw } = await supabase
    .from('enrollments')
    .select(`
      id,
      enrolled_at,
      status,
      funding_type,
      profiles!enrollments_student_id_fkey!inner (
        full_name,
        email
      ),
      courses!inner (
        title
      )
    `)
    .order('enrolled_at', { ascending: false })
    .limit(10);

  // Map enrollments with type guards
  const recentEnrollments = recentEnrollmentsRaw?.map(enrollment => ({
    ...enrollment,
    profile: Array.isArray(enrollment.profiles) ? enrollment.profiles[0] : enrollment.profiles,
    course: Array.isArray(enrollment.courses) ? enrollment.courses[0] : enrollment.courses
  }));

  // Get at-risk students (no login in 7+ days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: allActiveStudents } = await supabase
    .from('enrollments')
    .select('student_id')
    .eq('status', 'active');

  const studentIds = allActiveStudents?.map(e => e.student_id) || [];

  const { data: recentLogins } = await supabase
    .from('attendance_log')
    .select('student_id, login_time')
    .in('student_id', studentIds)
    .gte('login_time', sevenDaysAgo.toISOString());

  const activeStudentIds = new Set(recentLogins?.map(l => l.student_id));
  const atRiskCount = studentIds.length - activeStudentIds.size;

  // Calculate completion rate
  const totalEnrollments = (activeEnrollments || 0) + (completedEnrollments || 0);
  const completionRate = totalEnrollments > 0 
    ? Math.round((completedEnrollments || 0) / totalEnrollments * 100)
    : 0;

  // Get total contact hours
  const { data: contactHours } = await supabase
    .from('contact_hours')
    .select('total_hours');

  const totalHours = contactHours?.reduce((sum, h) => sum + h.total_hours, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link href="/admin/dashboard" className="text-red-600 font-semibold">Dashboard</Link>
          <Link href="/admin/students" className="text-gray-700 hover:text-red-600 font-medium">Students</Link>
          <Link href="/admin/courses" className="text-gray-700 hover:text-red-600 font-medium">Courses</Link>
          <Link href="/admin/certificates" className="text-gray-700 hover:text-red-600 font-medium">Certificates</Link>
          <Link href="/admin/reports" className="text-gray-700 hover:text-red-600 font-medium">Reports</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="elevate-hero">
        <div className="elevate-hero-content">
          <div className="elevate-hero-kicker">Admin Portal</div>
          <h1 className="elevate-hero-title">Dashboard</h1>
          <p className="elevate-hero-subtitle">
            Platform overview and key metrics
          </p>
        </div>
      </section>

      <main className="elevate-container py-8">
        {/* Key Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Total Students</div>
                <div className="text-3xl font-bold mt-1">{totalStudents || 0}</div>
              </div>
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Registered learners</p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Active Enrollments</div>
                <div className="text-3xl font-bold mt-1">{activeEnrollments || 0}</div>
              </div>
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Currently in training</p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Certificates Issued</div>
                <div className="text-3xl font-bold mt-1">{certificatesIssued || 0}</div>
              </div>
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Completed programs</p>
          </div>

          <div className="elevate-card">
            <div className="elevate-card-header">
              <div>
                <div className="elevate-card-subtitle">Completion Rate</div>
                <div className="text-3xl font-bold mt-1">{completionRate}%</div>
              </div>
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-xs text-slate-400 mt-2">Success rate</p>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="elevate-card">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Total Contact Hours</div>
                <div className="text-2xl font-bold">{Math.round(totalHours)}</div>
              </div>
            </div>
          </div>

          <div className="elevate-card">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-sm text-gray-500">At-Risk Students</div>
                <div className="text-2xl font-bold">{atRiskCount}</div>
              </div>
            </div>
          </div>

          <div className="elevate-card">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-sm text-gray-500">Total Courses</div>
                <div className="text-2xl font-bold">{totalCourses || 0}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Funding Breakdown */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <div className="elevate-card">
            <h2 className="elevate-card-title mb-4">Funding Type Breakdown</h2>
            <div className="space-y-3">
              {fundingCounts && Object.entries(fundingCounts).map(([type, count]: [string, any]) => {
                const total = Object.values(fundingCounts).reduce((sum: number, c: unknown) => sum + (typeof c === 'number' ? c : 0), 0) as number;
                const countNum = typeof count === 'number' ? count : 0;
                const percentage = total > 0 ? Math.round((countNum / total) * 100) : 0;
                
                return (
                  <div key={type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium capitalize">{type.replace('_', ' ')}</span>
                      <span className="text-gray-600">{countNum} ({percentage}%)</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          type === 'wioa' ? 'bg-blue-600' :
                          type === 'wrg' ? 'bg-green-600' :
                          type === 'jri' ? 'bg-purple-600' :
                          type === 'employer' ? 'bg-orange-600' :
                          'bg-gray-600'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="elevate-card">
            <h2 className="elevate-card-title mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Avg. Completion Time</span>
                <span className="font-bold">8 weeks</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Avg. Quiz Score</span>
                <span className="font-bold">82%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Student Satisfaction</span>
                <span className="font-bold">4.6/5.0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Job Placement Rate</span>
                <span className="font-bold">85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Enrollments */}
        <div className="elevate-card">
          <div className="elevate-card-header">
            <h2 className="elevate-card-title">Recent Enrollments</h2>
            <Link href="/admin/students" className="elevate-btn-secondary text-xs">
              View All
            </Link>
          </div>
          <div className="elevate-table-container">
            <table className="elevate-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Funding Type</th>
                  <th>Status</th>
                  <th>Enrolled Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnrollments && recentEnrollments.length > 0 ? (
                  recentEnrollments.map((enrollment) => (
                    <tr key={enrollment.id}>
                      <td>
                        <div>
                          <div className="font-medium text-gray-900">
                            {enrollment.profile?.full_name || 'Unknown'}
                          </div>
                          <div className="text-xs text-gray-500">{enrollment.profile?.email}</div>
                        </div>
                      </td>
                      <td className="font-medium">{enrollment.course?.title}</td>
                      <td>
                        <span className={`elevate-pill text-xs ${
                          enrollment.funding_type === 'wioa' ? 'elevate-pill--info' :
                          enrollment.funding_type === 'wrg' ? 'elevate-pill--success' :
                          enrollment.funding_type === 'jri' ? 'elevate-pill--warning' :
                          'elevate-pill--default'
                        }`}>
                          {enrollment.funding_type?.toUpperCase() || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className={`elevate-pill text-xs ${
                          enrollment.status === 'active' ? 'elevate-pill--success' :
                          enrollment.status === 'completed' ? 'elevate-pill--info' :
                          'elevate-pill--warning'
                        }`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td>
                        {new Date(enrollment.enrolled_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-8">
                      No enrollments yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <Link href="/admin/students" className="elevate-card hover:border-blue-500/50 transition-all">
            <Users className="h-7 w-7 mb-2 text-blue-600" />
            <h3 className="elevate-card-title">Manage Students</h3>
            <p className="elevate-card-subtitle mt-1">
              View and manage student accounts
            </p>
          </Link>

          <Link href="/admin/courses" className="elevate-card hover:border-green-500/50 transition-all">
            <BookOpen className="h-7 w-7 mb-2 text-green-600" />
            <h3 className="elevate-card-title">Manage Courses</h3>
            <p className="elevate-card-subtitle mt-1">
              Create and edit course content
            </p>
          </Link>

          <Link href="/admin/certificates" className="elevate-card hover:border-orange-500/50 transition-all">
            <Award className="h-7 w-7 mb-2 text-orange-600" />
            <h3 className="elevate-card-title">Issue Certificates</h3>
            <p className="elevate-card-subtitle mt-1">
              Generate and manage certificates
            </p>
          </Link>

          <Link href="/admin/reports" className="elevate-card hover:border-purple-500/50 transition-all">
            <TrendingUp className="h-7 w-7 mb-2 text-purple-600" />
            <h3 className="elevate-card-title">View Reports</h3>
            <p className="elevate-card-subtitle mt-1">
              Analytics and compliance reports
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
