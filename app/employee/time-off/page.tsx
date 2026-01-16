import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Plus, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Time Off | Employee Portal',
  description: 'Request and manage your time off.',
};

export const dynamic = 'force-dynamic';

export default async function TimeOffPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/employee/time-off');
  }

  // Get time off requests
  const { data: requests } = await supabase
    .from('time_off_requests')
    .select('*')
    .eq('user_id', user.id)
    .order('start_date', { ascending: false });

  // Get time off balances
  const { data: balances } = await supabase
    .from('time_off_balances')
    .select('*')
    .eq('user_id', user.id);

  const defaultBalances = [
    { type: 'Vacation', available: 10, used: 5, total: 15 },
    { type: 'Sick Leave', available: 5, used: 2, total: 7 },
    { type: 'Personal', available: 3, used: 0, total: 3 },
  ];

  const displayBalances = balances && balances.length > 0 ? balances : defaultBalances;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'denied':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'denied':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Time Off</h1>
            <p className="text-gray-600">Request and manage your time off</p>
          </div>
          <Link
            href="/employee/time-off/request"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            Request Time Off
          </Link>
        </div>

        {/* Balances */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {displayBalances.map((balance: any, index: number) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-600 mb-2">{balance.type}</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {balance.available} <span className="text-lg text-gray-400">days</span>
              </div>
              <div className="text-sm text-gray-500">
                {balance.used} used of {balance.total} total
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(balance.used / balance.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Requests */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Time Off Requests</h2>
          </div>
          {requests && requests.length > 0 ? (
            <div className="divide-y">
              {requests.map((request: any) => (
                <div key={request.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Calendar className="w-10 h-10 text-blue-500" />
                    <div>
                      <h3 className="font-medium">{request.type}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(request.start_date).toLocaleDateString()} - {new Date(request.end_date).toLocaleDateString()}
                      </p>
                      {request.notes && (
                        <p className="text-sm text-gray-600 mt-1">{request.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    {getStatusIcon(request.status)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No time off requests</p>
              <Link
                href="/employee/time-off/request"
                className="inline-block mt-4 text-blue-600 font-medium hover:underline"
              >
                Request time off
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
