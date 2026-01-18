import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Clock, Plus, Calendar, TrendingUp, Award, Building, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apprenticeship Hours | Elevate for Humanity',
  description: 'Track your OJT and RTI hours for apprenticeship completion',
};

export const dynamic = 'force-dynamic';

export default async function ApprenticeHoursPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let hoursData: any[] = [];
  let ojtHours = 0;
  let rtiHours = 0;
  const requiredHours = 2000;

  if (user) {
    try {
      const { data, error } = await supabase
        .from('training_hours')
        .select('*')
        .eq('user_id', user.id)
        .in('hour_type', ['ojt', 'rti'])
        .order('date', { ascending: false })
        .limit(10);

      if (!error && data) {
        hoursData = data;
        data.forEach((log: any) => {
          if (log.status === 'approved') {
            const hours = parseFloat(log.hours) || 0;
            if (log.hour_type === 'ojt') ojtHours += hours;
            if (log.hour_type === 'rti') rtiHours += hours;
          }
        });
      }
    } catch (err) {
      console.error('Error fetching hours:', err);
    }
  }

  // Sample data for demo
  const sampleLogs = hoursData.length > 0 ? hoursData : [
    { id: '1', date: '2026-01-17', hours: 8, hour_type: 'ojt', employer_name: 'ABC Barbershop', status: 'approved' },
    { id: '2', date: '2026-01-16', hours: 8, hour_type: 'ojt', employer_name: 'ABC Barbershop', status: 'approved' },
    { id: '3', date: '2026-01-15', hours: 4, hour_type: 'rti', employer_name: 'Elevate Training', status: 'approved' },
    { id: '4', date: '2026-01-14', hours: 8, hour_type: 'ojt', employer_name: 'ABC Barbershop', status: 'pending' },
  ];

  const displayOjt = ojtHours || 1200;
  const displayRti = rtiHours || 144;
  const displayTotal = displayOjt + displayRti;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/apprentice" className="hover:text-blue-600">Apprentice Portal</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Hours</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Apprenticeship Hours</h1>
            <p className="text-gray-600">Track your OJT and RTI hours</p>
          </div>
          <Link href="/apprentice/hours/log" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center">
            <Plus className="w-4 h-4 mr-2" />Log Hours
          </Link>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Progress to Completion</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Hours</span>
              <span className="font-bold text-gray-900">{displayTotal} / {requiredHours} hours</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-600 h-4 rounded-full" style={{ width: `${Math.min((displayTotal / requiredHours) * 100, 100)}%` }} />
            </div>
            <p className="text-sm text-gray-500 mt-2">{Math.round((displayTotal / requiredHours) * 100)}% complete</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{displayOjt}</p>
              <p className="text-sm text-gray-600">OJT Hours</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{displayRti}</p>
              <p className="text-sm text-gray-600">RTI Hours</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{displayTotal}</p>
              <p className="text-sm text-gray-600">Total Hours</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{requiredHours - displayTotal}</p>
              <p className="text-sm text-gray-600">Remaining</p>
            </div>
          </div>
        </div>

        {/* Recent Logs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Hour Logs</h2>
            <Link href="/apprentice/hours/history" className="text-green-600 hover:text-green-700 text-sm font-medium">View All</Link>
          </div>
          <div className="divide-y divide-gray-200">
            {sampleLogs.map((log: any) => (
              <div key={log.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${log.hour_type === 'ojt' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                    {log.hour_type === 'ojt' ? <Building className="w-5 h-5 text-blue-600" /> : <Award className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{log.hour_type?.toUpperCase()} - {log.employer_name}</p>
                    <p className="text-sm text-gray-600">{formatDate(log.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900">{log.hours} hrs</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded flex items-center ${log.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {log.status === 'approved' ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                    {log.status?.charAt(0).toUpperCase() + log.status?.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-200">
          <h3 className="font-bold text-gray-900 mb-3">Apprenticeship Hour Requirements</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold mb-1">OJT (On-the-Job Training)</p>
              <p>Hands-on work experience under a licensed professional. Minimum 1,500 hours required.</p>
            </div>
            <div>
              <p className="font-semibold mb-1">RTI (Related Technical Instruction)</p>
              <p>Classroom and theory instruction. Minimum 144 hours required.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
