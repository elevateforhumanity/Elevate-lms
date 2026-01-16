import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Clock, Plus, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Log Hours | Apprentice Portal',
  description: 'Track and log your apprenticeship hours.',
};

export const dynamic = 'force-dynamic';

export default async function ApprenticeHoursPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/apprentice/hours');
  }

  // Get apprentice profile
  const { data: apprentice } = await supabase
    .from('apprentices')
    .select('*, program:program_id(name, required_hours)')
    .eq('user_id', user.id)
    .single();

  // Get hour logs
  const { data: hourLogs } = await supabase
    .from('apprentice_hours')
    .select('*')
    .eq('apprentice_id', apprentice?.id)
    .order('date', { ascending: false })
    .limit(20);

  // Calculate totals
  const totalHours = hourLogs?.reduce((sum: number, log: any) => sum + (log.hours || 0), 0) || 0;
  const requiredHours = apprentice?.program?.required_hours || 2000;
  const progressPercent = Math.min((totalHours / requiredHours) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Apprenticeship Hours</h1>
            <p className="text-gray-600">Track and log your training hours</p>
          </div>
          <Link
            href="/apprentice/hours/log"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            Log Hours
          </Link>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Progress Overview</h2>
            <span className="text-2xl font-bold text-blue-600">
              {totalHours.toLocaleString()} / {requiredHours.toLocaleString()} hours
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">
            {progressPercent.toFixed(1)}% complete • {(requiredHours - totalHours).toLocaleString()} hours remaining
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <Clock className="w-8 h-8 text-blue-500 mb-3" />
            <div className="text-2xl font-bold">{totalHours}</div>
            <div className="text-gray-600">Total Hours Logged</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <Calendar className="w-8 h-8 text-green-500 mb-3" />
            <div className="text-2xl font-bold">{hourLogs?.length || 0}</div>
            <div className="text-gray-600">Log Entries</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <CheckCircle className="w-8 h-8 text-purple-500 mb-3" />
            <div className="text-2xl font-bold">{requiredHours - totalHours}</div>
            <div className="text-gray-600">Hours Remaining</div>
          </div>
        </div>

        {/* Hour Logs */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Hour Logs</h2>
          </div>
          {hourLogs && hourLogs.length > 0 ? (
            <div className="divide-y">
              {hourLogs.map((log: any) => (
                <div key={log.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{log.activity || 'Training'}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(log.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-lg">{log.hours} hours</div>
                      <div className="text-sm text-gray-500">{log.supervisor || 'Supervisor'}</div>
                    </div>
                    {log.verified ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hours logged yet</p>
              <Link
                href="/apprentice/hours/log"
                className="inline-block mt-4 text-blue-600 font-medium hover:underline"
              >
                Log your first hours
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
