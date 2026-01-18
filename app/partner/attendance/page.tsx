'use client';

import Link from 'next/link';
import { Users, Calendar, CheckCircle, Clock, Plus, Download } from 'lucide-react';

export default function PartnerAttendancePage() {
  const sessions = [
    { id: '1', date: 'Jan 17, 2026', course: 'HVAC Fundamentals', students: 12, present: 11, absent: 1 },
    { id: '2', date: 'Jan 16, 2026', course: 'HVAC Fundamentals', students: 12, present: 12, absent: 0 },
    { id: '3', date: 'Jan 15, 2026', course: 'Medical Assistant Training', students: 15, present: 14, absent: 1 },
    { id: '4', date: 'Jan 14, 2026', course: 'Barber Apprenticeship', students: 8, present: 8, absent: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/partner-portal" className="hover:text-blue-600">Partner Portal</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Attendance</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance Tracking</h1>
            <p className="text-gray-600">Record and manage student attendance</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition flex items-center">
              <Download className="w-4 h-4 mr-2" />Export
            </button>
            <Link href="/partner/attendance/record" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center">
              <Plus className="w-4 h-4 mr-2" />Record Attendance
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Users className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">47</p>
            <p className="text-gray-600 text-sm">Total Students</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">95%</p>
            <p className="text-gray-600 text-sm">Avg Attendance</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Calendar className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-gray-600 text-sm">Sessions This Month</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <Clock className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">4</p>
            <p className="text-gray-600 text-sm">Active Courses</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold text-gray-900">Recent Sessions</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Course</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Present</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Absent</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Rate</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{session.date}</td>
                  <td className="px-6 py-4 text-gray-900">{session.course}</td>
                  <td className="px-6 py-4 text-center text-green-600 font-medium">{session.present}</td>
                  <td className="px-6 py-4 text-center text-red-600 font-medium">{session.absent}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${session.present/session.students >= 0.9 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {Math.round((session.present/session.students)*100)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">View Details</button>
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
