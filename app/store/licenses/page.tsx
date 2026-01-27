import { Metadata } from 'next';
import Link from 'next/link';
import { Server, Code, ArrowRight, Shield, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Platform Licensing | Elevate for Humanity',
  description: 'License the Elevate LMS platform. Choose managed platform access or enterprise source-use licensing.',
};

const MASTER_STATEMENT = `All platform products are licensed access to systems operated by Elevate for Humanity. Ownership of software, infrastructure, and intellectual property is not transferred.`;

export default function StoreLicensesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Platform Licensing</h1>
          <p className="text-xl text-slate-300">
            Choose the licensing model that fits your organization.
          </p>
        </div>
      </section>

      {/* License Options */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Managed Platform */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-blue-500">
            <div className="bg-blue-600 text-white p-6">
              <div className="flex items-center gap-3 mb-2">
                <Server className="w-8 h-8" />
                <span className="text-sm font-bold bg-blue-500 px-2 py-1 rounded">RECOMMENDED</span>
              </div>
              <h2 className="text-2xl font-black">Managed Platform</h2>
              <p className="text-blue-100 mt-2">We operate. You manage your organization.</p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="text-3xl font-black text-slate-900">
                  $1,500–$3,500<span className="text-lg font-normal text-slate-500">/month</span>
                </div>
                <div className="text-slate-500">+ $7,500–$15,000 setup</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-slate-600">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  Fully managed hosting & security
                </li>
                <li className="flex items-start gap-2 text-slate-600">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  Automatic updates & maintenance
                </li>
                <li className="flex items-start gap-2 text-slate-600">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  Self-service checkout
                </li>
                <li className="flex items-start gap-2 text-slate-600">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  Custom domain support
                </li>
              </ul>
              <Link
                href="/store/licenses/managed"
                className="block w-full text-center bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Start License Setup
                <ArrowRight className="w-5 h-5 inline ml-2" />
              </Link>
            </div>
          </div>

          {/* Source-Use */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            <div className="bg-slate-800 text-white p-6">
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-8 h-8" />
                <span className="text-sm font-bold bg-amber-600 px-2 py-1 rounded">ENTERPRISE ONLY</span>
              </div>
              <h2 className="text-2xl font-black">Source-Use License</h2>
              <p className="text-slate-300 mt-2">Restricted code access. You operate.</p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="text-3xl font-black text-slate-900">
                  Starting at $75,000
                </div>
                <div className="text-slate-500">Enterprise approval required</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-slate-600">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  Internal use only
                </li>
                <li className="flex items-start gap-2 text-slate-600">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  No resale or sublicensing
                </li>
                <li className="flex items-start gap-2 text-slate-600">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  No ownership transfer
                </li>
                <li className="flex items-start gap-2 text-slate-600">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  You assume all operational responsibility
                </li>
              </ul>
              <Link
                href="/store/licenses/source-use"
                className="block w-full text-center bg-slate-200 text-slate-700 py-4 rounded-lg font-bold text-lg hover:bg-slate-300 transition-colors"
              >
                Request Enterprise Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 bg-white border-t">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <Link href="/store/demo" className="p-6 rounded-xl hover:bg-slate-50 transition-colors">
              <h3 className="font-bold text-slate-900 mb-2">Demo Center</h3>
              <p className="text-slate-600 text-sm">Explore platform features</p>
            </Link>
            <Link href="/store/guides/licensing" className="p-6 rounded-xl hover:bg-slate-50 transition-colors">
              <h3 className="font-bold text-slate-900 mb-2">Licensing Guide</h3>
              <p className="text-slate-600 text-sm">Step-by-step walkthrough</p>
            </Link>
            <Link href="/contact?topic=licensing" className="p-6 rounded-xl hover:bg-slate-50 transition-colors">
              <h3 className="font-bold text-slate-900 mb-2">Questions?</h3>
              <p className="text-slate-600 text-sm">Contact our team</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Master Statement */}
      <section className="py-8 px-4 bg-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-600 italic">{MASTER_STATEMENT}</p>
        </div>
      </section>
    </div>
  );
}
