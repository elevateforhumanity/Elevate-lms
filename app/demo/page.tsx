import { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Settings, Building2, ArrowRight, Calendar, Info } from 'lucide-react';
import { ROUTES } from '@/lib/pricing';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Demo Environment | Elevate LMS',
  description: 'Explore the Elevate LMS through guided demo experiences for learners, administrators, and employer partners.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/demo',
  },
};

export default function DemoHubPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Demo' }]} />
        </div>
      </div>

      {/* Live Platform Banner */}
      <div className="bg-green-600 text-white py-2 px-4 text-center text-sm">
        <Info className="w-4 h-4 inline mr-2" />
        Live Platform Preview — Explore the actual LMS, admin dashboards, and marketing pages
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-lg font-bold text-slate-900 hover:text-orange-600 transition">
              Elevate for Humanity
            </Link>
            <div className="flex items-center gap-4">
              <Link href={ROUTES.license} className="text-slate-600 hover:text-orange-600 transition text-sm">
                Licensing Info
              </Link>
              <Link
                href="/demo/admin"
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition"
              >
                <ArrowRight className="w-4 h-4" />
                Preview Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Explore the Platform
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Browse live pages across the platform, portals, and dashboards.
            </p>
          </div>

          {/* Demo Track Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Learner Experience */}
            <Link
              href="/demo/learner"
              className="group bg-white rounded-2xl border-2 border-slate-200 p-8 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition">
                <GraduationCap className="w-8 h-8 text-blue-600 group-hover:text-white transition" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Student LMS</h2>
              <p className="text-slate-600 mb-6">
                Full student portal with courses, progress tracking, OJT hours logging, and certificates.
              </p>
              <ul className="text-sm text-slate-500 space-y-2 mb-6">
                <li>• Course player & lessons</li>
                <li>• OJT hours tracking</li>
                <li>• Progress dashboard</li>
                <li>• Certificate management</li>
              </ul>
              <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                Open Student Portal <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Admin Dashboard */}
            <Link
              href="/demo/admin"
              className="group bg-white rounded-2xl border-2 border-slate-200 p-8 hover:border-green-500 hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition">
                <Settings className="w-8 h-8 text-green-600 group-hover:text-white transition" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Admin Dashboard</h2>
              <p className="text-slate-600 mb-6">
                Complete admin control center with student management, enrollments, and reporting.
              </p>
              <ul className="text-sm text-slate-500 space-y-2 mb-6">
                <li>• Student management</li>
                <li>• Enrollment pipeline</li>
                <li>• Program analytics</li>
                <li>• WIOA compliance reports</li>
              </ul>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                Open Admin Dashboard <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Employer Portal */}
            <Link
              href="/demo/employer"
              className="group bg-white rounded-2xl border-2 border-slate-200 p-8 hover:border-purple-500 hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition">
                <Building2 className="w-8 h-8 text-purple-600 group-hover:text-white transition" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Employer Portal</h2>
              <p className="text-slate-600 mb-6">
                Hiring pipeline, candidate matching, apprenticeship management, and incentive tracking.
              </p>
              <ul className="text-sm text-slate-500 space-y-2 mb-6">
                <li>• Candidate pipeline</li>
                <li>• Hiring incentives</li>
                <li>• Apprenticeship tracking</li>
                <li>• Wage progression</li>
              </ul>
              <span className="inline-flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                Open Employer Portal <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* CTA Section */}
          <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Interested in licensing?
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Schedule a call to discuss how the platform can work for your organization.
            </p>
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition text-lg"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Call
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href={ROUTES.license} className="text-slate-500 text-sm hover:text-orange-600 transition">Licensing</Link>
              <Link href="/contact" className="text-slate-500 text-sm hover:text-orange-600 transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
