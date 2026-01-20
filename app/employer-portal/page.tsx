import { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Users, FileText, BarChart3, DollarSign, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Employer Portal | Elevate For Humanity',
  description: 'Manage apprentices, track training progress, and access employer tools.',
};

export default function EmployerPortalLanding() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-10 h-10" />
            <span className="text-green-200 font-medium">Employer Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Employer Partner Portal</h1>
          <p className="text-xl text-green-100 max-w-2xl mb-8">
            Manage your apprentices, track their training progress, and access employer resources.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/login?redirect=/employer-portal/dashboard" className="px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50">
              Sign In
            </Link>
            <Link href="/onboarding/employer" className="px-8 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400">
              Employer Onboarding
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Portal Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Apprentice Management</h3>
              <p className="text-slate-600">View and manage your apprentices and their progress.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Training Progress</h3>
              <p className="text-slate-600">Track training completion and skill development.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Documents</h3>
              <p className="text-slate-600">Access agreements, reports, and compliance documents.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Payroll</h3>
              <p className="text-slate-600">Manage apprentice wages and payroll information.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Job Postings</h3>
              <p className="text-slate-600">Post positions and find qualified candidates.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Company Profile</h3>
              <p className="text-slate-600">Manage your company information and settings.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Partner With Us</h2>
          <p className="text-lg text-slate-600 mb-8">Already a partner? Sign in. New employer? Start onboarding today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login?redirect=/employer-portal/dashboard" className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Sign In</Link>
            <Link href="/onboarding/employer" className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-lg hover:bg-slate-200">Employer Onboarding</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
