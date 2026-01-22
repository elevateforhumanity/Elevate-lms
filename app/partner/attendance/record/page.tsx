import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';
import AttendanceRecordForm from './AttendanceRecordForm';

export const metadata: Metadata = {
  title: 'Record Attendance | Partner Portal',
};

export const dynamic = 'force-dynamic';

export default async function RecordAttendancePage() {
  const supabase = await createClient();
  
  if (!supabase) redirect('/login');

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?redirect=/partner/attendance/record');

  // Get partner info
  const { data: partner } = await supabase
    .from('partners')
    .select('id')
    .eq('user_id', user.id)
    .single();

  let students: any[] = [];
  let courses: any[] = [];

  if (partner) {
    // Get students enrolled with this partner
    const { data: enrollmentData } = await supabase
      .from('enrollments')
      .select(`
        id,
        user_id,
        profiles!enrollments_user_id_fkey(id, full_name)
      `)
      .eq('partner_id', partner.id)
      .eq('status', 'active');

    if (enrollmentData) {
      students = enrollmentData.map((e: any) => ({
        id: e.profiles?.id || e.user_id,
        name: e.profiles?.full_name || 'Student',
        present: true,
      }));
    }

    // Get courses for this partner
    const { data: courseData } = await supabase
      .from('courses')
      .select('id, title')
      .eq('partner_id', partner.id)
      .eq('is_active', true);

    if (courseData) {
      courses = courseData;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/partner/dashboard" className="hover:text-blue-600">Partner Portal</Link>
            <span className="mx-2">/</span>
            <Link href="/partner/attendance" className="hover:text-blue-600">Attendance</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Record</span>
          </nav>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/partner/attendance" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />Back to Attendance
        </Link>
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Record Attendance</h1>
          
          {students.length > 0 ? (
            <AttendanceRecordForm students={students} courses={courses} />
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Students Found</h3>
              <p className="text-gray-600">No active students are enrolled with your organization.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
