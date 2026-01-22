import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Users, Search, Filter, Download, Mail, Eye } from 'lucide-react';

export const metadata: Metadata = { title: 'Students | Program Holder Portal' };

export const dynamic = 'force-dynamic';

export default async function ProgramHolderStudentsPage() {
  const supabase = await createClient();
  
  if (!supabase) redirect('/login');

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?redirect=/program-holder/students');

  // Get program holder's programs
  const { data: programHolder } = await supabase
    .from('program_holders')
    .select('id')
    .eq('user_id', user.id)
    .single();

  let students: any[] = [];

  if (programHolder) {
    // Get programs owned by this program holder
    const { data: programs } = await supabase
      .from('programs')
      .select('id, name')
      .eq('program_holder_id', programHolder.id);

    if (programs && programs.length > 0) {
      const programIds = programs.map(p => p.id);
      const programMap = Object.fromEntries(programs.map(p => [p.id, p.name]));

      // Get enrollments for these programs
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select(`
          id,
          user_id,
          program_id,
          progress,
          status,
          created_at,
          profiles!enrollments_user_id_fkey(full_name, email)
        `)
        .in('program_id', programIds)
        .order('created_at', { ascending: false });

      if (enrollments) {
        students = enrollments.map((e: any) => ({
          id: e.id,
          name: e.profiles?.full_name || 'Student',
          email: e.profiles?.email || '',
          program: programMap[e.program_id] || 'Program',
          progress: e.progress || 0,
          enrolled: new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          status: e.progress >= 100 ? 'completed' : e.status || 'active',
        }));
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/program-holder/dashboard" className="hover:text-purple-600">Dashboard</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Students</span>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search students..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              <Download className="w-5 h-5" /> Export
            </button>
          </div>
        </div>

        {students.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Student</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Program</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Progress</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Enrolled</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{student.program}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${student.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${student.progress}%` }}></div>
                        </div>
                        <span className="text-sm text-gray-600">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{student.enrolled}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${student.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"><Eye className="w-4 h-4" /></button>
                        <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded"><Mail className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No students yet</h3>
            <p className="text-gray-600">Students will appear here once they enroll in your programs.</p>
          </div>
        )}
      </div>
    </div>
  );
}
