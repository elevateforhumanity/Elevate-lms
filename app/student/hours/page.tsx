import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Clock, Plus, Calendar, TrendingUp } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Hours Log | Student Portal',
  description: 'Track and log your training hours.',
};

export const dynamic = 'force-dynamic';

export default async function StudentHoursPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect('/login?next=/student/hours');

  // Fetch hours logs from database
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
    .order('date', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching hours:', error.message);
  }

  const logs = hoursData || [];
  const totalHours = logs.reduce((sum, log: any) => sum + (log.hours || 0), 0);
  const approvedHours = logs
    .filter((log: any) => log.status === 'approved')
    .reduce((sum, log: any) => sum + (log.hours || 0), 0);
  const pendingHours = logs
    .filter((log: any) => log.status === 'pending')
    .reduce((sum, log: any) => sum + (log.hours || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Student', href: '/student' }, { label: 'Hours' }]} />
        </div>
      </div>

      <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hours Log</h1>
            <p className="text-gray-600 mt-1">Track your training and work hours</p>
          </div>
          <Link
            href="/student/hours/log"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Log Hours
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
                <p className="text-sm text-gray-500">Total Hours</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{approvedHours}</p>
                <p className="text-sm text-gray-500">Approved</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingHours}</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hours List */}
        {logs.length > 0 ? (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="font-semibold text-gray-900">Recent Entries</h2>
            </div>
            <div className="divide-y">
              {logs.map((log: any) => (
                <div key={log.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(log.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-gray-500">{log.description || log.programs?.name || 'Training'}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-900">{log.hours} hrs</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.status === 'approved' 
                        ? 'bg-green-100 text-green-700'
                        : log.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {log.status || 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t bg-gray-50">
              <Link href="/student/hours/history" className="text-blue-600 hover:underline text-sm">
                View all entries →
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border p-12 text-center">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No hours logged</h2>
            <p className="text-gray-600 mb-6">Start tracking your training hours.</p>
            <Link 
              href="/student/hours/log"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Log Your First Hours
            </Link>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
