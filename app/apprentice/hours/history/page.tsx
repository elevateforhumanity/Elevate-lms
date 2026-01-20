'use client';

import Link from 'next/link';
import { ChevronRight, Clock, Calendar, CheckCircle, TrendingUp } from 'lucide-react';

const hoursHistory = [
  { id: 1, date: '2024-01-15', hours: 8, type: 'On-the-job', supervisor: 'John Smith', status: 'approved' },
  { id: 2, date: '2024-01-14', hours: 4, type: 'Classroom', supervisor: 'Jane Doe', status: 'approved' },
  { id: 3, date: '2024-01-12', hours: 8, type: 'On-the-job', supervisor: 'John Smith', status: 'approved' },
  { id: 4, date: '2024-01-11', hours: 6, type: 'On-the-job', supervisor: 'John Smith', status: 'pending' },
  { id: 5, date: '2024-01-10', hours: 8, type: 'On-the-job', supervisor: 'John Smith', status: 'approved' },
];

export default function HoursHistoryPage() {
  const totalHours = hoursHistory.reduce((sum, h) => sum + h.hours, 0);
  const requiredHours = 2000;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/apprentice" className="hover:text-orange-600">Apprentice</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Hours History</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Hours Tracking</h1>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border">
            <Clock className="w-8 h-8 text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{totalHours}</p>
            <p className="text-gray-600">Total Hours Logged</p>
          </div>
          <div className="bg-white rounded-xl p-6 border">
            <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
            <p className="text-2xl font-bold">{Math.round((totalHours / requiredHours) * 100)}%</p>
            <p className="text-gray-600">Progress to Goal</p>
          </div>
          <div className="bg-white rounded-xl p-6 border">
            <Calendar className="w-8 h-8 text-orange-500 mb-2" />
            <p className="text-2xl font-bold">{requiredHours - totalHours}</p>
            <p className="text-gray-600">Hours Remaining</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Recent Hours</h2>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm">Log Hours</button>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Hours</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Supervisor</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {hoursHistory.map(entry => (
                <tr key={entry.id}>
                  <td className="px-4 py-3 text-sm">{entry.date}</td>
                  <td className="px-4 py-3 text-sm font-medium">{entry.hours}h</td>
                  <td className="px-4 py-3 text-sm">{entry.type}</td>
                  <td className="px-4 py-3 text-sm">{entry.supervisor}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      entry.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {entry.status === 'approved' && <CheckCircle className="w-3 h-3" />}
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
