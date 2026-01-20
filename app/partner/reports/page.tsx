'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Calendar, TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';

const mockReports = [
  { id: 1, name: 'Q4 2025 Referral Summary', period: 'Oct - Dec 2025', students: 45, completions: 32, placement: '89%' },
  { id: 2, name: 'Q3 2025 Referral Summary', period: 'Jul - Sep 2025', students: 38, completions: 28, placement: '85%' },
  { id: 3, name: 'Q2 2025 Referral Summary', period: 'Apr - Jun 2025', students: 42, completions: 35, placement: '91%' },
  { id: 4, name: 'Q1 2025 Referral Summary', period: 'Jan - Mar 2025', students: 31, completions: 24, placement: '82%' },
];

export default function PartnerReportsPage() {
  const [year, setYear] = useState('2025');

  const stats = [
    { label: 'Total Referrals YTD', value: '156', icon: Users, color: 'blue' },
    { label: 'Completions YTD', value: '119', icon: TrendingUp, color: 'green' },
    { label: 'Avg Placement Rate', value: '87%', icon: BarChart3, color: 'purple' },
    { label: 'Training Value', value: '$485K', icon: DollarSign, color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Partner Reports</h1>
            <p className="text-gray-600">View referral outcomes and performance metrics</p>
          </div>
          <Link href="/partner" className="text-blue-600 hover:text-blue-700">← Back to Portal</Link>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border p-6">
              <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Quarterly Reports</h2>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="px-4 py-2 border rounded-lg">
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div className="divide-y">
            {mockReports.map((report) => (
              <div key={report.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-sm text-gray-500">{report.period}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{report.students}</p>
                    <p className="text-xs text-gray-500">Referrals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{report.completions}</p>
                    <p className="text-xs text-gray-500">Completions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-green-600">{report.placement}</p>
                    <p className="text-xs text-gray-500">Placement</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Generate Custom Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" className="px-4 py-2 border rounded-lg" />
                  <input type="date" className="px-4 py-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <select className="w-full px-4 py-2 border rounded-lg">
                  <option>Referral Summary</option>
                  <option>Outcomes Report</option>
                  <option>Funding Utilization</option>
                </select>
              </div>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Generate Report
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Scheduled Reports</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Monthly Summary</p>
                  <p className="text-sm text-gray-500">Sent 1st of each month</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Quarterly Outcomes</p>
                  <p className="text-sm text-gray-500">Sent end of quarter</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
