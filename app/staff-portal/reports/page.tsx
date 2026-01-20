'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Calendar, Users, TrendingUp, DollarSign, Filter, BarChart3 } from 'lucide-react';

const mockReports = [
  { id: 1, name: 'Monthly Enrollment Summary', type: 'enrollment', date: '2026-01-15', status: 'ready' },
  { id: 2, name: 'WIOA Quarterly Report Q4', type: 'compliance', date: '2026-01-10', status: 'ready' },
  { id: 3, name: 'Student Outcomes Report', type: 'outcomes', date: '2026-01-08', status: 'ready' },
  { id: 4, name: 'Attendance Summary - January', type: 'attendance', date: '2026-01-05', status: 'ready' },
  { id: 5, name: 'Financial Aid Disbursement', type: 'financial', date: '2026-01-01', status: 'ready' },
];

const reportTemplates = [
  { id: 'enrollment', name: 'Enrollment Report', icon: Users, description: 'Student enrollment by program and date range' },
  { id: 'attendance', name: 'Attendance Report', icon: Calendar, description: 'Daily/weekly attendance records' },
  { id: 'outcomes', name: 'Outcomes Report', icon: TrendingUp, description: 'Completion rates and job placement' },
  { id: 'financial', name: 'Financial Report', icon: DollarSign, description: 'Tuition, payments, and funding' },
  { id: 'compliance', name: 'Compliance Report', icon: FileText, description: 'WIOA and regulatory compliance' },
];

export default function StaffReportsPage() {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('all');

  const stats = [
    { label: 'Reports Generated', value: '47', change: '+12 this month' },
    { label: 'Pending Reviews', value: '3', change: 'Due this week' },
    { label: 'Compliance Score', value: '98%', change: 'All requirements met' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">Generate and download staff reports</p>
          </div>
          <Link href="/staff-portal" className="text-blue-600 hover:text-blue-700">← Back to Portal</Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border p-6">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-sm text-green-600 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Templates */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate New Report</h2>
              <div className="space-y-3">
                {reportTemplates.map((template) => (
                  <button
                    key={template.id}
                    className="w-full flex items-start gap-3 p-3 rounded-lg border hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <template.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{template.name}</p>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
                <div className="flex items-center gap-2">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 py-1.5 border rounded-lg text-sm"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                  </select>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="px-3 py-1.5 border rounded-lg text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="enrollment">Enrollment</option>
                    <option value="attendance">Attendance</option>
                    <option value="compliance">Compliance</option>
                  </select>
                </div>
              </div>

              <div className="divide-y">
                {mockReports.map((report) => (
                  <div key={report.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{report.name}</p>
                        <p className="text-sm text-gray-500">Generated {report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Ready</span>
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t text-center">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All Reports →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
