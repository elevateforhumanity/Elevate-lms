import { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Settings, Building2, ArrowRight, Calendar, Info } from 'lucide-react';
import { ROUTES } from '@/lib/pricing';

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
      {/* Demo Mode Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm">
        <Info className="w-4 h-4 inline mr-2" />
        Demo Mode (Sample Data) — This environment shows example workflows and data
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
                href={ROUTES.schedule}
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition"
              >
                <Calendar className="w-4 h-4" />
                Schedule Demo
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
              Choose Your Demo Track
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore the platform from different perspectives. Each demo shows realistic workflows with sample data.
            </p>
          </div>

          {/* Demo Track Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Learner Experience */}
            <Link
              href={ROUTES.demoLearner}
              className="group bg-white rounded-2xl border-2 border-slate-200 p-8 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition">
                <GraduationCap className="w-8 h-8 text-blue-600 group-hover:text-white transition" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Learner Experience</h2>
              <p className="text-slate-600 mb-6">
                See how participants navigate programs, track progress, and access support resources.
              </p>
              <ul className="text-sm text-slate-500 space-y-2 mb-6">
                <li>• Program dashboard</li>
                <li>• Progress tracking</li>
                <li>• Funding pathway info</li>
                <li>• Support resources</li>
              </ul>
              <span className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                Explore Learner View <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Admin Dashboard */}
            <Link
              href={ROUTES.demoAdmin}
              className="group bg-white rounded-2xl border-2 border-slate-200 p-8 hover:border-green-500 hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition">
                <Settings className="w-8 h-8 text-green-600 group-hover:text-white transition" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Admin / Program Manager</h2>
              <p className="text-slate-600 mb-6">
                Manage programs, track enrollments, and generate compliance reports.
              </p>
              <ul className="text-sm text-slate-500 space-y-2 mb-6">
                <li>• Program management</li>
                <li>• Enrollment pipeline</li>
                <li>• Reporting tools</li>
                <li>• Compliance tracking</li>
              </ul>
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                Explore Admin View <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Employer Portal */}
            <Link
              href={ROUTES.demoEmployer}
              className="group bg-white rounded-2xl border-2 border-slate-200 p-8 hover:border-purple-500 hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition">
                <Building2 className="w-8 h-8 text-purple-600 group-hover:text-white transition" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Employer / Partner</h2>
              <p className="text-slate-600 mb-6">
                Connect with candidates, manage hiring pipelines, and access apprenticeship tools.
              </p>
              <ul className="text-sm text-slate-500 space-y-2 mb-6">
                <li>• Candidate pipeline</li>
                <li>• Hiring incentives</li>
                <li>• Apprenticeship tools</li>
                <li>• Partner dashboard</li>
              </ul>
              <span className="inline-flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                Explore Employer View <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* CTA Section */}
          <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Want a guided walkthrough?
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              We host live demos via Google Meet so we can tailor the walkthrough to your use case.
            </p>
            <Link
              href={ROUTES.schedule}
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition text-lg"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Live Demo
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
