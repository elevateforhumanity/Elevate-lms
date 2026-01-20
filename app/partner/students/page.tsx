'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, Search, Filter, Download, Eye, GraduationCap, TrendingUp } from 'lucide-react';

const mockStudents = [
  { id: 1, name: 'Marcus Johnson', program: 'CNA Certification', status: 'active', progress: 75, startDate: '2025-11-15', fundingSource: 'WIOA Adult' },
  { id: 2, name: 'Sarah Williams', program: 'Phlebotomy', status: 'active', progress: 60, startDate: '2025-12-01', fundingSource: 'WIOA Youth' },
  { id: 3, name: 'David Chen', program: 'HVAC Technician', status: 'active', progress: 45, startDate: '2025-12-10', fundingSource: 'WIOA DW' },
  { id: 4, name: 'Emily Rodriguez', program: 'IT Support', status: 'completed', progress: 100, startDate: '2025-09-01', fundingSource: 'WIOA Adult' },
  { id: 5, name: 'James Wilson', program: 'CDL Training', status: 'active', progress: 30, startDate: '2026-01-05', fundingSource: 'WIOA Adult' },
  { id: 6, name: 'Ashley Brown', program: 'Medical Assistant', status: 'on-hold', progress: 50, startDate: '2025-10-15', fundingSource: 'WIOA Youth' },
];

export default function PartnerStudentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.program.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Referred', value: '156', icon: Users },
    { label: 'Currently Active', value: '42', icon: GraduationCap },
    { label: 'Completed', value: '98', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Referred Students</h1>
            <p className="text-gray-600">Track students you've referred to training programs</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" /> Export
            </button>
            <Link href="/partner" className="text-blue-600 hover:text-blue-700">← Back</Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Student</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Program</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Funding</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Progress</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">Started {student.startDate}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{student.program}</td>
                    <td className="px-4 py-3 text-gray-600">{student.fundingSource}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${student.progress}%` }} />
                        </div>
                        <span className="text-sm text-gray-600">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        student.status === 'active' ? 'bg-green-100 text-green-700' :
                        student.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
