import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronRight,
  Clock,
  Calendar,
  Download,
  Filter,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hours History | Student Portal',
  description: 'View your training hours history.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface HoursEntry {
  id: string;
  date: string;
  hours: number;
  type: 'classroom' | 'practical' | 'online' | 'externship';
  description: string;
  status: 'approved' | 'pending' | 'rejected';
  approved_by?: string;
}

export default async function HoursHistoryPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Database connection failed.</p>
        </div>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/student/hours/history');

  // Sample hours data
  const hoursEntries: HoursEntry[] = [
    {
      id: '1',
      date: '2026-01-18',
      hours: 4,
      type: 'classroom',
      description: 'Barbering Fundamentals - Module 14',
      status: 'approved',
      approved_by: 'Marcus Thompson',
    },
    {
      id: '2',
      date: '2026-01-17',
      hours: 3,
      type: 'practical',
      description: 'Hands-on cutting practice',
      status: 'approved',
      approved_by: 'Marcus Thompson',
    },
    {
      id: '3',
      date: '2026-01-16',
      hours: 2,
      type: 'online',
      description: 'Business Management course',
      status: 'approved',
    },
    {
      id: '4',
      date: '2026-01-15',
      hours: 4,
      type: 'classroom',
      description: 'Barbering Fundamentals - Module 13',
      status: 'approved',
      approved_by: 'Marcus Thompson',
    },
    {
      id: '5',
      date: '2026-01-14',
      hours: 3,
      type: 'practical',
      description: 'Client service practice',
      status: 'pending',
    },
  ];

  const totalHours = hoursEntries.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.hours, 0);
  const pendingHours = hoursEntries.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.hours, 0);
  const requiredHours = 1500; // Example requirement
  const progressPercent = Math.round((totalHours / requiredHours) * 100);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      classroom: 'bg-blue-100 text-blue-700',
      practical: 'bg-green-100 text-green-700',
      online: 'bg-purple-100 text-purple-700',
      externship: 'bg-orange-100 text-orange-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'approved') return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (status === 'pending') return <Clock className="w-4 h-4 text-yellow-600" />;
    return <AlertCircle className="w-4 h-4 text-red-600" />;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/student" className="hover:text-gray-700">Student Portal</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/student/hours" className="hover:text-gray-700">Hours</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">History</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hours History</h1>
              <p className="text-gray-600 mt-1">Track your training hours</p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Hours Progress</h2>
            <span className="text-2xl font-bold text-blue-600">{progressPercent}%</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
              <p className="text-sm text-gray-500">Approved Hours</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{pendingHours}</p>
              <p className="text-sm text-gray-500">Pending Hours</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-400">{requiredHours - totalHours}</p>
              <p className="text-sm text-gray-500">Remaining</p>
            </div>
          </div>
        </div>

        {/* Hours by Type */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {['classroom', 'practical', 'online', 'externship'].map((type) => {
            const typeHours = hoursEntries
              .filter(e => e.type === type && e.status === 'approved')
              .reduce((sum, e) => sum + e.hours, 0);
            return (
              <div key={type} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(type)} mb-2`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                <p className="text-2xl font-bold text-gray-900">{typeHours}</p>
                <p className="text-sm text-gray-500">hours</p>
              </div>
            );
          })}
        </div>

        {/* Hours Log */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Hours Log</h2>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {hoursEntries.map((entry) => (
              <div key={entry.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 text-center">
                      <p className="text-lg font-bold text-gray-900">{entry.hours}</p>
                      <p className="text-xs text-gray-500">hours</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(entry.type)}`}>
                          {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                          {getStatusIcon(entry.status)}
                          <span className={
                            entry.status === 'approved' ? 'text-green-600' :
                            entry.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }>
                            {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                          </span>
                        </span>
                      </div>
                      <p className="font-medium text-gray-900">{entry.description}</p>
                      {entry.approved_by && (
                        <p className="text-sm text-gray-500 mt-1">
                          Approved by {entry.approved_by}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(entry.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800">Hours Requirement</h3>
              <p className="text-sm text-blue-700 mt-1">
                Your program requires {requiredHours} total hours to complete. Keep logging your 
                hours regularly to track your progress toward graduation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
