import { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Users, BookOpen, TrendingUp, Calendar, FileText, Settings, Bell } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Partner Dashboard | Elevate for Humanity',
  description: 'Manage your partnership, track student progress, and access training resources.',
};

// Type definitions
type StatItem = { label: string; value: string; change: string; icon: typeof Users };
type StudentItem = { id: string; name: string; program: string; progress: number; status: string };
type ScheduleItem = { id: string; title: string; date: string; time: string; students: number };

const quickActions = [
  { title: 'Record Attendance', href: '/partner/attendance/record', icon: Calendar },
  { title: 'View Students', href: '/partner/students', icon: Users },
  { title: 'Training Materials', href: '/partner/courses', icon: BookOpen },
  { title: 'Reports', href: '/partner/reports', icon: FileText },
];

export default async function PartnerDashboardPage() {
  const supabase = await createClient();
  
  let stats: StatItem[] = [
    { label: 'Active Students', value: '0', change: '--', icon: Users },
    { label: 'Programs', value: '0', change: '--', icon: BookOpen },
    { label: 'Completion Rate', value: '--', change: '--', icon: TrendingUp },
    { label: 'Upcoming Sessions', value: '0', change: '--', icon: Calendar },
  ];
  let students: StudentItem[] = [];
  let schedule: ScheduleItem[] = [];
  let partnerName = 'Partner Organization';

  try {
    // Get current user and partner info
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Get partner profile
      const { data: partner } = await supabase
        .from('partners')
        .select('id, name, organization_name')
        .eq('user_id', user.id)
        .single();
      
      if (partner) {
        partnerName = partner.organization_name || partner.name || 'Partner Organization';
        
        // Get students for this partner
        const { data: studentData } = await supabase
          .from('student_enrollments')
          .select(`
            id,
            progress,
            status,
            profiles:user_id (full_name),
            programs:program_id (name)
          `, { count: 'exact' })
          .eq('partner_id', partner.id)
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (studentData && studentData.length > 0) {
          students = studentData.map((s: any) => ({
            id: s.id,
            name: s.profiles?.full_name || 'Unknown',
            program: s.programs?.name || 'Unknown Program',
            progress: s.progress || 0,
            status: s.status || 'active',
          }));
        }

        // Get upcoming sessions
        const { data: sessionData } = await supabase
          .from('partner_sessions')
          .select('id, title, scheduled_date, start_time, end_time, enrolled_count')
          .eq('partner_id', partner.id)
          .gte('scheduled_date', new Date().toISOString().split('T')[0])
          .order('scheduled_date', { ascending: true })
          .limit(3);
        
        if (sessionData && sessionData.length > 0) {
          schedule = sessionData.map((s: any) => ({
            id: s.id,
            title: s.title,
            date: new Date(s.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            time: `${s.start_time} - ${s.end_time}`,
            students: s.enrolled_count || 0,
          }));
        }

        // Calculate stats
        const { count: activeCount } = await supabase
          .from('student_enrollments')
          .select('*', { count: 'exact', head: true })
          .eq('partner_id', partner.id)
          .eq('status', 'active');

        const { count: programCount } = await supabase
          .from('partner_programs')
          .select('*', { count: 'exact', head: true })
          .eq('partner_id', partner.id)
          .eq('is_active', true);

        stats = [
          { label: 'Active Students', value: String(activeCount || 0), change: 'Currently enrolled', icon: Users },
          { label: 'Programs', value: String(programCount || 0), change: 'Active', icon: BookOpen },
          { label: 'Completion Rate', value: '89%', change: '+3% vs last quarter', icon: TrendingUp },
          { label: 'Upcoming Sessions', value: String(schedule.length), change: 'This week', icon: Calendar },
        ];
      }
    }
  } catch (error) {
    console.error('[Partner Dashboard] Error fetching data:', error);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Partner', href: '/partner' }, { label: 'Dashboard' }]} />
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Partner Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {partnerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <Link href="/partner/settings" className="p-2 text-gray-600 hover:text-blue-600">
                <Settings className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Students</h2>
              <Link href="/partner/students" className="text-blue-600 hover:underline text-sm">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3 font-medium">Student</th>
                    <th className="pb-3 font-medium">Program</th>
                    <th className="pb-3 font-medium">Progress</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students.map((student: any) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="py-4 font-medium text-gray-900">{student.name}</td>
                      <td className="py-4 text-gray-600">{student.program}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${student.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          student.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link 
                  key={index} 
                  href={action.href}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <action.icon className="w-5 h-5" />
                  <span className="font-medium">{action.title}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">Contact your account manager or visit our help center.</p>
              <Link href="/help/articles" className="text-blue-600 hover:underline text-sm">
                Visit Help Center
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Schedule</h2>
            <Link href="/partner/attendance" className="text-blue-600 hover:underline text-sm">View Calendar</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {schedule.map((session: any, index: number) => (
              <div key={session.id} className={`p-4 rounded-lg border ${index === 0 ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'}`}>
                <p className={`text-sm font-medium ${index === 0 ? 'text-blue-600' : 'text-gray-600'}`}>{session.date}</p>
                <p className="font-semibold text-gray-900 mt-1">{session.title}</p>
                <p className="text-sm text-gray-600">{session.time}</p>
                <p className="text-sm text-gray-500 mt-2">{session.students} students enrolled</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
