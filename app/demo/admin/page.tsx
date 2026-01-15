'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Info, Settings, Users, GraduationCap, BarChart3, Calendar, ArrowRight,
  CheckCircle, AlertCircle, Download, Clock, Plus, Search, Filter,
  ChevronRight, Building2, FileText, Bell
} from 'lucide-react';
import { adminStats, programs, pipeline, recentActivity, alerts, students, cohorts, reportTypes } from './data';

export default function AdminDemoPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Demo Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm">
        <Info className="w-4 h-4 inline mr-2" />
        Demo Mode — This is a fully interactive admin dashboard demo
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/demo" className="text-slate-600 hover:text-orange-600 transition">
                ← Back to Demo Hub
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-600 hover:text-slate-900">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition"
              >
                <Calendar className="w-4 h-4" />
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Settings className="w-8 h-8 text-green-600" />
              Program Manager Dashboard
            </h1>
            <p className="text-slate-600 mt-1">Manage programs, track enrollments, and generate reports</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          {['overview', 'students', 'programs', 'reports'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize transition border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                  <span className="text-sm text-slate-500">Active Programs</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{adminStats.activePrograms}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-green-600" />
                  <span className="text-sm text-slate-500">Active Students</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{adminStats.activeStudents}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                  <span className="text-sm text-slate-500">Completion Rate</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{adminStats.completionRate}%</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-6 h-6 text-orange-600" />
                  <span className="text-sm text-slate-500">Active Partners</span>
                </div>
                <p className="text-3xl font-bold text-slate-900">{adminStats.activePartners}</p>
              </div>
            </div>

            {/* Pipeline */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Enrollment Pipeline</h2>
              <div className="flex flex-wrap items-center gap-2">
                {pipeline.map((stage, idx) => (
                  <div key={stage.stage} className="flex items-center">
                    <div className={`${stage.color} text-white px-4 py-3 rounded-lg text-center min-w-[100px]`}>
                      <p className="font-bold text-lg">{stage.count}</p>
                      <p className="text-xs opacity-90">{stage.stage}</p>
                    </div>
                    {idx < pipeline.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-slate-300 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{activity.action}</p>
                        <p className="text-sm text-slate-500">{activity.detail}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" /> {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Alerts</h3>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3 rounded-lg ${
                        alert.type === 'warning' ? 'bg-amber-50 border border-amber-200' :
                        alert.type === 'success' ? 'bg-green-50 border border-green-200' :
                        'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      <p className={`text-sm ${
                        alert.type === 'warning' ? 'text-amber-800' :
                        alert.type === 'success' ? 'text-green-800' :
                        'text-blue-800'
                      }`}>
                        {alert.type === 'warning' && <AlertCircle className="w-4 h-4 inline mr-2" />}
                        {alert.type === 'success' && <CheckCircle className="w-4 h-4 inline mr-2" />}
                        {alert.type === 'info' && <Info className="w-4 h-4 inline mr-2" />}
                        {alert.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition">
                <Plus className="w-5 h-5" /> Add Student
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Student</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Program</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Progress</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Enrolled</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={student.avatar}
                            alt={student.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-slate-900">{student.name}</p>
                            <p className="text-sm text-slate-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{student.program}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{student.enrolled}</td>
                      <td className="px-6 py-4">
                        <button className="text-orange-600 hover:text-orange-700">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">All Programs</h2>
              <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition">
                <Plus className="w-5 h-5" /> Add Program
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {programs.map((program) => (
                <div key={program.id} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      program.category === 'Healthcare' ? 'bg-blue-100 text-blue-700' :
                      program.category === 'Skilled Trades' ? 'bg-orange-100 text-orange-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {program.category}
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      {program.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{program.name}</h3>
                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    <p>{program.format} • {program.duration}</p>
                    <p>{program.modules} modules</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-2xl font-bold text-slate-900">{program.enrolled}</p>
                      <p className="text-xs text-slate-500">Enrolled</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{program.completed}</p>
                      <p className="text-xs text-slate-500">Completed</p>
                    </div>
                    <button className="text-orange-600 hover:text-orange-700">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Reports & Exports</h2>
              <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition">
                <Download className="w-5 h-5" /> Export All Data
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  onClick={() => alert(`Generating ${report.name}...`)}
                  className="bg-white rounded-xl border border-slate-200 p-6 text-left hover:shadow-lg hover:border-orange-200 transition"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{report.name}</h3>
                  <p className="text-sm text-slate-500">{report.description}</p>
                </button>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800">
                <AlertCircle className="w-4 h-4 inline mr-2" />
                Reporting requirements vary by funding source and region. Contact your compliance officer for specific requirements.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CTA Footer */}
      <section className="bg-slate-900 py-12 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want to see the full admin experience?
          </h2>
          <p className="text-slate-300 mb-6">
            Schedule a live demo to explore program management, reporting, and compliance tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Live Demo
            </Link>
            <Link
              href="/demo/employer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              View Employer Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
