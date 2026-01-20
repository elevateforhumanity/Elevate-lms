'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, TrendingUp, Users, DollarSign, GraduationCap, Download, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

const metrics = [
  { label: 'Total Enrollments', value: '1,247', change: '+12%', up: true, icon: Users },
  { label: 'Completion Rate', value: '78%', change: '+5%', up: true, icon: GraduationCap },
  { label: 'Revenue', value: '$124,500', change: '+18%', up: true, icon: DollarSign },
  { label: 'Active Students', value: '892', change: '-3%', up: false, icon: TrendingUp },
];

const coursePerformance = [
  { name: 'Web Development Bootcamp', enrollments: 342, completion: 82, revenue: 45600 },
  { name: 'Data Science Fundamentals', enrollments: 256, completion: 75, revenue: 32000 },
  { name: 'UX Design Certificate', enrollments: 189, completion: 88, revenue: 23625 },
  { name: 'Digital Marketing', enrollments: 167, completion: 71, revenue: 12525 },
  { name: 'Project Management', enrollments: 143, completion: 79, revenue: 10725 },
];

export default function ProgramHolderAnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/program-holder" className="hover:text-orange-600">Program Holder</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Analytics</span>
        </nav>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Track program performance and student outcomes</p>
          </div>
          <div className="flex items-center gap-3">
            <select value={dateRange} onChange={e => setDateRange(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-white">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {metrics.map(metric => (
            <div key={metric.label} className="bg-white rounded-xl border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <metric.icon className="w-5 h-5 text-orange-600" />
                </div>
                <span className={`flex items-center gap-1 text-sm ${metric.up ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.up ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-sm text-gray-500">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Chart Placeholder */}
          <div className="md:col-span-2 bg-white rounded-xl border p-6">
            <h2 className="font-semibold mb-4">Enrollment Trends</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization</p>
                <p className="text-sm text-gray-400">Enrollment data over time</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg. Course Rating</span>
                <span className="font-semibold">4.7/5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Student Satisfaction</span>
                <span className="font-semibold">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Job Placement Rate</span>
                <span className="font-semibold">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg. Time to Complete</span>
                <span className="font-semibold">4.2 months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Support Tickets</span>
                <span className="font-semibold">23 open</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Performance Table */}
        <div className="bg-white rounded-xl border mt-6 overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Course Performance</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Course</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Enrollments</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Completion Rate</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {coursePerformance.map(course => (
                <tr key={course.name} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium">{course.name}</td>
                  <td className="px-4 py-4">{course.enrollments}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${course.completion}%` }} />
                      </div>
                      <span className="text-sm">{course.completion}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">${course.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
