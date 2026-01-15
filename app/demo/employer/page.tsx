import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Briefcase,
  Calendar,
  ArrowRight,
  CheckCircle,
  Info,
  Clock,
  Award
} from 'lucide-react';
import { demoEmployer } from '@/lib/demoData';
import { ROUTES, DISCLAIMERS } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Employer Demo | Elevate LMS',
  description: 'Experience the employer partner portal with candidate pipelines, hiring incentives, and apprenticeship tools.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/demo/employer',
  },
};

export default function EmployerDemoPage() {
  const employer = demoEmployer;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Demo Mode Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm">
        <Info className="w-4 h-4 inline mr-2" />
        Demo Mode (Sample Data) — This shows an example employer partner portal
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
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-slate-900">
                Employer Partner Portal (Demo)
              </h1>
            </div>
            <p className="text-slate-600">
              {employer.company} — {employer.industry}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Candidate Pipeline */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Candidate Pipeline
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Candidate</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Program</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Match</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {employer.candidates.map((candidate, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <p className="font-medium text-slate-900">{candidate.name}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{candidate.program}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              candidate.status === 'Interview Scheduled' 
                                ? 'bg-green-100 text-green-700' 
                                : candidate.status === 'Application Review'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-slate-100 text-slate-700'
                            }`}>
                              {candidate.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-purple-500 rounded-full"
                                  style={{ width: `${candidate.match}%` }}
                                />
                              </div>
                              <span className="text-sm text-slate-600">{candidate.match}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Open Roles */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                  Open Roles
                </h2>
                <div className="space-y-3">
                  {employer.openRoles.map((role, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">{role.title}</p>
                        <p className="text-sm text-slate-500">{role.location}</p>
                      </div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        role.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {role.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apprenticeship + OJT */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Apprenticeship + OJT
                </h2>
                
                {employer.apprenticeship.active ? (
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm text-purple-600 mb-1">Registered With</p>
                      <p className="font-semibold text-purple-900">{employer.apprenticeship.registeredWith}</p>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-sm text-slate-500 mb-1">Current Apprentices</p>
                        <p className="text-2xl font-bold text-slate-900">{employer.apprenticeship.currentApprentices}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-sm text-slate-500 mb-1">Training Structure</p>
                        <p className="text-sm font-medium text-slate-900">{employer.apprenticeship.structure}</p>
                      </div>
                    </div>

                    <div className="text-sm text-slate-600">
                      <p className="font-medium mb-2">Apprenticeship Features:</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          OJT hour tracking and documentation
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Wage progression records
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Competency-based advancement
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-600">No active apprenticeship program.</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Hiring Support */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Hiring Support
                </h3>
                
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-green-600 mb-1">Potential Incentive</p>
                  <p className="font-semibold text-green-900">{employer.hiringSupport.incentive}</p>
                  <p className="text-sm text-green-700 mt-1">{employer.hiringSupport.maxTotal}</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <p className="text-xs text-amber-800">
                    <Info className="w-3 h-3 inline mr-1" />
                    {employer.hiringSupport.disclaimer}
                  </p>
                </div>

                <h4 className="text-sm font-semibold text-slate-900 mb-2">Available Programs:</h4>
                <ul className="space-y-2">
                  {employer.hiringSupport.programs.map((program, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {program}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
                    + Post New Role
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
                    View All Candidates
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
                    Download Reports
                  </button>
                </div>
              </div>

              {/* Learn More */}
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="font-semibold text-purple-900 mb-2">How it works</h3>
                <p className="text-sm text-purple-700 mb-4">
                  Learn more about employer partnerships and hiring support programs.
                </p>
                <Link
                  href={ROUTES.licenseFeatures}
                  className="text-purple-600 font-semibold text-sm hover:text-purple-700 inline-flex items-center gap-1"
                >
                  View Features <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Footer */}
      <section className="bg-slate-900 py-12 mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want to see the full employer experience?
          </h2>
          <p className="text-slate-300 mb-6">
            Schedule a live demo to explore employer partnerships, hiring pipelines, and apprenticeship tools.
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
              href="/demo"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              Back to Demo Hub
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
