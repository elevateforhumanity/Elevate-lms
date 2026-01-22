import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Clock, ChevronLeft, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hours History | Student Portal',
  description: 'View your complete hours log history.',
};

export const dynamic = 'force-dynamic';

export default async function HoursHistoryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login?next=/student/hours/history');

  // Fetch all hours logs from database
  const { data: hoursData, error } = await supabase
    .from('hours_logs')
    .select(`
      id,
      date,
      hours,
      description,
      status,
      created_at,
      programs (name)
    `)
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching hours:', error.message);
  }

  const logs = hoursData || [];
  const totalHours = logs.reduce((sum, log: any) => sum + (log.hours || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/student/hours" className="p-2 hover:bg-gray-200 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Hours History</h1>
            <p className="text-gray-600 mt-1">Complete log of all your training hours</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        <div className="bg-white rounded-xl border p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Hours Logged</span>
            <span className="text-2xl font-bold text-gray-900">{totalHours} hours</span>
          </div>
        </div>

        {logs.length > 0 ? (
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {logs.map((log: any) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {new Date(log.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {log.description || log.programs?.name || 'Training'}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{log.hours}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.status === 'approved' 
                          ? 'bg-green-100 text-green-700'
                          : log.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {log.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl border p-12 text-center">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No hours logged yet</h2>
            <p className="text-gray-600 mb-6">Your hours history will appear here once you start logging.</p>
            <Link 
              href="/student/hours/log"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Log Hours
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
