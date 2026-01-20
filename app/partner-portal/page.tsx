import { Metadata } from 'next';
import Link from 'next/link';
import { Handshake, Users, BookOpen, BarChart3, FileText, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partner Portal | Elevate For Humanity',
  description: 'Manage training programs, track students, and access partner resources.',
};

export default function PartnerPortalLanding() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-orange-600 to-orange-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <Handshake className="w-10 h-10" />
            <span className="text-orange-200 font-medium">Partner Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Training Partner Portal</h1>
          <p className="text-xl text-orange-100 max-w-2xl mb-8">
            Manage your training programs, track student progress, and access partner resources.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/login?redirect=/partner-portal/dashboard" className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50">
              Sign In
            </Link>
            <Link href="/onboarding/partner" className="px-8 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-400">
              Partner Onboarding
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Portal Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Program Management</h3>
              <p className="text-slate-600">Create and manage your training programs.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Student Tracking</h3>
              <p className="text-slate-600">Monitor enrolled students and their progress.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Reports</h3>
              <p className="text-slate-600">Access performance and enrollment reports.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Agreements</h3>
              <p className="text-slate-600">View and manage partnership agreements.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Handshake className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Referrals</h3>
              <p className="text-slate-600">Track and manage student referrals.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Settings</h3>
              <p className="text-slate-600">Configure your partner account settings.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Become a Partner</h2>
          <p className="text-lg text-slate-600 mb-8">Already a partner? Sign in. Want to partner with us? Start onboarding.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login?redirect=/partner-portal/dashboard" className="px-8 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700">Sign In</Link>
            <Link href="/onboarding/partner" className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-lg hover:bg-slate-200">Partner Onboarding</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
