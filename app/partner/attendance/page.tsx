import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Attendance Tracking | Partner Portal',
  description: 'Track and manage student attendance for your training programs.',
};

export const dynamic = 'force-dynamic';

export default async function PartnerAttendancePage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login?redirect=/partner/attendance');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, organization_id')
    .eq('id', user.id)
    .single();

  if (!profile || !['partner', 'program_holder', 'admin', 'super_admin'].includes(profile.role)) {
    redirect('/');
  }

  // Get attendance records
  const { data: attendance } = await supabase
    .from('attendance')
    .select(`
      id,
      student_id,
      date,
      status,
      check_in_time,
      check_out_time,
      hours,
      notes,
      profiles:student_id (full_name, email)
    `)
    .order('date', { ascending: false })
    .limit(100);

  // Get today's attendance
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance?.filter(a => a.date === today) || [];
  
  // Calculate stats
  const totalRecords = attendance?.length || 0;
  const presentCount = attendance?.filter(a => a.status === 'present').length || 0;
  const absentCount = attendance?.filter(a => a.status === 'absent').length || 0;
  const lateCount = attendance?.filter(a => a.status === 'late').length || 0;

  // Get unique students
  const uniqueStudents = new Set(attendance?.map(a => a.student_id)).size;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
              <p className="text-gray-600">Monitor and manage student attendance</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/partner/dashboard"
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                ← Dashboard
              </Link>
              <Link
                href="/partner/attendance/record"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Record Attendance
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{uniqueStudents}</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{totalRecords}</div>
                <div className="text-sm text-gray-600">Total Records</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{presentCount}</div>
                <div className="text-sm text-gray-600">Present</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{absentCount}</div>
                <div className="text-sm text-gray-600">Absent</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{lateCount}</div>
                <div className="text-sm text-gray-600">Late</div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Attendance */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Today's Attendance ({today})</h2>
          {todayAttendance.length > 0 ? (
            <div className="grid gap-3">
              {todayAttendance.map((record: any) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      record.status === 'present' ? 'bg-green-500' :
                      record.status === 'absent' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`} />
                    <div>
                      <div className="font-medium">{record.profiles?.full_name || 'Student'}</div>
                      <div className="text-sm text-gray-500">
                        {record.check_in_time && `In: ${record.check_in_time}`}
                        {record.check_out_time && ` | Out: ${record.check_out_time}`}
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    record.status === 'present' ? 'bg-green-100 text-green-800' :
                    record.status === 'absent' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No attendance recorded today</p>
          )}
        </div>

        {/* Recent Attendance */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Recent Attendance Records</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {attendance && attendance.length > 0 ? (
                  attendance.slice(0, 20).map((record: any) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium">{record.profiles?.full_name || 'Student'}</div>
                        <div className="text-sm text-gray-500">{record.profiles?.email}</div>
                      </td>
                      <td className="px-4 py-3 text-sm">{record.date}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          record.status === 'present' ? 'bg-green-100 text-green-800' :
                          record.status === 'absent' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{record.check_in_time || '-'}</td>
                      <td className="px-4 py-3 text-sm">{record.check_out_time || '-'}</td>
                      <td className="px-4 py-3 text-sm">{record.hours || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                      No attendance records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
