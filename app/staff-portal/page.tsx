import { Metadata } from 'next';
import Link from 'next/link';
import { Users, ClipboardList, BarChart3, Calendar, Settings, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Staff Portal | Elevate For Humanity',
  description: 'Manage students, track enrollments, and access administrative tools.',
};

export default function StaffPortalLanding() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-10 h-10" />
            <span className="text-purple-200 font-medium">Staff Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Staff Management Portal</h1>
          <p className="text-xl text-purple-100 max-w-2xl mb-8">
            Manage students, track enrollments, monitor progress, and access administrative tools.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/login?redirect=/staff-portal/dashboard" className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50">
              Sign In
            </Link>
            <Link href="/onboarding/staff" className="px-8 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400">
              Staff Onboarding
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Portal Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Student Management</h3>
              <p className="text-slate-600">View and manage student records and enrollments.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ClipboardList className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Attendance</h3>
              <p className="text-slate-600">Track and record student attendance.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Reports</h3>
              <p className="text-slate-600">Generate and view performance reports.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Scheduling</h3>
              <p className="text-slate-600">Manage class schedules and appointments.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Documents</h3>
              <p className="text-slate-600">Access and manage important documents.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Settings</h3>
              <p className="text-slate-600">Configure portal preferences and settings.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Access Your Portal</h2>
          <p className="text-lg text-slate-600 mb-8">Sign in to access staff tools or complete onboarding if you are new.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login?redirect=/staff-portal/dashboard" className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700">Sign In</Link>
            <Link href="/onboarding/staff" className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-lg hover:bg-slate-200">Staff Onboarding</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
