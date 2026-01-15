import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Settings, 
  Users, 
  GraduationCap, 
  BarChart3,
  Calendar,
  ArrowRight,
  CheckCircle,
  Info,
  AlertCircle,
  Download,
  Clock
} from 'lucide-react';
import { demoAdminDashboard, demoPrograms } from '@/lib/demoData';
import { LICENSING_ROUTES } from '@/lib/licensing-constants';

export const metadata: Metadata = {
  title: 'Admin Demo | Elevate LMS',
  description: 'Experience the admin dashboard with program management, enrollment pipeline, and reporting tools.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/demo/admin',
  },
};

export default function AdminDemoPage() {
  const dashboard = demoAdminDashboard;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Demo Mode Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm">
        <Info className="w-4 h-4 inline mr-2" />
        Demo Mode (Sample Data) — This shows an example admin dashboard
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
            <Link
              href="/store"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition"
            >
              <Calendar className="w-4 h-4" />
              View Store
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <Settings className="w-8 h-8 text-green-600" />
                Program Manager Dashboard
              </h1>
              <p className="text-slate-600">
                Manage programs, track enrollments, and generate reports
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <span className="text-sm text-slate-500">Active Programs</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">{dashboard.summary.activePrograms}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-green-600" />
                <span className="text-sm text-slate-500">Enrollments</span>
              </div>
              <p className="text-lg font-bold text-slate-900">{dashboard.summary.totalEnrollments}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                <span className="text-sm text-slate-500">Completion Rate</span>
              </div>
              <p className="text-lg font-bold text-slate-900">{dashboard.summary.completionRate}</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-orange-600" />
                <span className="text-sm text-slate-500">Active Partners</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">{dashboard.summary.activePartners}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Programs Table */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900">Programs</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Program</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Format</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Duration</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {demoPrograms.map((program) => (
                        <tr key={program.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <p className="font-medium text-slate-900">{program.name}</p>
                            <p className="text-sm text-slate-500">{program.modules} modules</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{program.format}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{program.duration}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              program.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {program.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Enrollment Pipeline */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Enrollment Pipeline</h2>
                <div className="flex flex-wrap gap-2">
                  {dashboard.enrollmentPipeline.map((stage, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className={`${stage.color} text-white px-4 py-2 rounded-lg text-center min-w-[120px]`}>
                        <p className="font-semibold text-sm">{stage.stage}</p>
                        <p className="text-xs opacity-90">{stage.count}</p>
                      </div>
                      {idx < dashboard.enrollmentPipeline.length - 1 && (
                        <ArrowRight className="w-5 h-5 text-slate-300 mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reporting Snapshot */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-slate-900">Reporting</h2>
                  <button className="inline-flex items-center gap-2 text-sm text-orange-600 font-semibold hover:text-orange-700">
                    <Download className="w-4 h-4" />
                    Export Data
                  </button>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {dashboard.compliance.exports.map((report, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-slate-600" />
                      <span className="text-sm text-slate-700">{report}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <AlertCircle className="w-4 h-4 inline mr-2" />
                    {dashboard.compliance.note}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {dashboard.recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                        <p className="text-xs text-slate-500">{activity.detail}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Alerts</h3>
                <div className="space-y-3">
                  {dashboard.alerts.map((alert, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-lg ${
                        alert.type === 'success' 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      <p className={`text-sm ${
                        alert.type === 'success' ? 'text-green-800' : 'text-blue-800'
                      }`}>
                        {alert.type === 'success' ? (
                          <CheckCircle className="w-4 h-4 inline mr-2" />
                        ) : (
                          <Info className="w-4 h-4 inline mr-2" />
                        )}
                        {alert.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
                    + Add New Program
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
                    + Create Cohort
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
              href="/store"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              <Calendar className="w-5 h-5" />
              View Store & Licensing
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
