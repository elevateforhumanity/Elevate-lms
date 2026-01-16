import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, Calendar, FileText, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Staff Portal | Elevate For Humanity',
  description: 'Staff dashboard for managing students, schedules, and administrative tasks.',
};

export const dynamic = 'force-dynamic';

export default async function StaffPortalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login?redirect=/staff-portal');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (!profile || !['staff', 'instructor', 'admin', 'super_admin'].includes(profile.role)) {
    redirect('/');
  }

  const { count: studentCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  const { count: todayAttendance } = await supabase
    .from('attendance')
    .select('*', { count: 'exact', head: true })
    .eq('date', new Date().toISOString().split('T')[0]);

  const { count: pendingTasks } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('assigned_to', user.id)
    .eq('status', 'pending');

  const quickLinks = [
    { href: '/staff-portal/students', icon: Users, label: 'Students', count: studentCount },
    { href: '/staff-portal/attendance', icon: Calendar, label: 'Attendance', count: todayAttendance },
    { href: '/staff-portal/documents', icon: FileText, label: 'Documents' },
    { href: '/staff-portal/messages', icon: MessageSquare, label: 'Messages' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Welcome, {profile.full_name || 'Staff'}</h1>
          <p className="text-blue-100">Staff Portal Dashboard</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition">
              <link.icon className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900">{link.label}</h3>
              {link.count !== undefined && <p className="text-2xl font-bold text-blue-600">{link.count || 0}</p>}
            </Link>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Today's Tasks</h2>
            <div className="text-center py-8 text-gray-500">
              {pendingTasks ? `${pendingTasks} pending tasks` : 'No pending tasks'}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/staff-portal/attendance/record" className="block p-3 bg-gray-50 rounded hover:bg-gray-100">Record Attendance</Link>
              <Link href="/staff-portal/students/add" className="block p-3 bg-gray-50 rounded hover:bg-gray-100">Add Student</Link>
              <Link href="/staff-portal/reports" className="block p-3 bg-gray-50 rounded hover:bg-gray-100">Generate Report</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
