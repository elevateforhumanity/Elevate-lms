import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';
import { Server, Code, ArrowRight, Shield, Building2, CheckCircle, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise Workforce Operating System | Elevate for Humanity',
  description: 'Licensed access to a proprietary, compliance-ready platform used to operate funded training, apprenticeships, and workforce programs.',
};

const MASTER_STATEMENT = `All platform products are licensed access to systems operated by Elevate for Humanity. Ownership of software, infrastructure, and intellectual property is not transferred.`;

export default function StoreLicensesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Store", href: "/store" }, { label: "Licenses" }]} />
      </div>

      {/* Header - Enterprise Positioning */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Enterprise Workforce Operating System
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Licensed access to a proprietary, compliance-ready platform used to operate 
            funded training, apprenticeships, and workforce programs.
          </p>
          <div className="inline-flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg text-sm text-slate-400">
            <Lock className="w-4 h-4" />
            This is not a downloadable product. This is a managed, governed operating system.
          </div>
        </div>
      </section>

      {/* What You're Licensing */}
      <section className="py-12 px-4 bg-white border-b">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-slate-700">
            Elevate for Humanity licenses managed access to a proprietary Workforce Operating System.
            The platform is operated, secured, and maintained by Elevate for Humanity.
            Access is licensed, governed, and subject to audit controls.
          </p>
        </div>
      </section>

      {/* Three-Tier License Structure */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Tier 1: Managed Platform */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-blue-500">
              <div className="bg-blue-600 text-white p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Server className="w-8 h-8" />
                  <span className="text-sm font-bold bg-blue-500 px-2 py-1 rounded">RECOMMENDED</span>
                </div>
                <h2 className="text-2xl font-black">Managed Platform</h2>
                <p className="text-blue-100 mt-2">We operate everything. You manage your organization.</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="text-3xl font-black text-slate-900">
                    $1,500–$3,500<span className="text-lg font-normal text-slate-500">/month</span>
                  </div>
                  <div className="text-slate-600">+ $7,500–$15,000 setup</div>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  For training providers, nonprofits, and workforce partners.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    Full platform functionality
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    Enrollment + LMS + reporting
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    Compliance workflows
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    Managed hosting & security
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    Automatic updates
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

            {/* Tier 2: Enterprise Operations */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-slate-300">
              <div className="bg-slate-800 text-white p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-8 h-8" />
                  <span className="text-sm font-bold bg-slate-700 px-2 py-1 rounded">ENTERPRISE</span>
                </div>
                <h2 className="text-2xl font-black">Enterprise Operations</h2>
                <p className="text-slate-300 mt-2">Admin access with operational controls.</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="text-3xl font-black text-slate-900">
                    $4,500–$8,000<span className="text-lg font-normal text-slate-500">/month</span>
                  </div>
                  <div className="text-slate-600">+ $15,000–$25,000 setup</div>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  For workforce boards, large nonprofits, and enterprises.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    Everything in Managed Platform
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    Operations Console access
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    Configuration controls
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    Audit logs and exports
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                    Read-only system inspection
                  </li>
                </ul>
                <Link
                  href="/contact?topic=enterprise"
                  className="block w-full text-center bg-slate-800 text-white py-4 rounded-lg font-bold text-lg hover:bg-slate-900 transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </div>

            {/* Tier 3: Restricted Source + Ops */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-amber-700 text-white p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Code className="w-8 h-8" />
                  <span className="text-sm font-bold bg-amber-600 px-2 py-1 rounded">STRATEGIC</span>
                </div>
                <h2 className="text-2xl font-black">Restricted Source + Ops</h2>
                <p className="text-amber-100 mt-2">Controlled code access. Governed execution.</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="text-3xl font-black text-slate-900">
                    $75,000–$150,000
                  </div>
                  <div className="text-slate-600">+ $25,000–$60,000/year platform fee</div>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  For states, strategic partners, and enterprise contracts only.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    Everything in Enterprise Operations
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    Limited execution access
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    Scoped code editing
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    Governed git workflow
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    Mandatory audit logging
                  </li>
                </ul>
                <div className="text-xs text-slate-500 mb-4 p-3 bg-slate-50 rounded-lg">
                  <strong>Contractual restrictions:</strong> No resale, no rehosting, no derivative distribution.
                </div>
                <Link
                  href="/store/licenses/source-use"
                  className="block w-full text-center bg-slate-200 text-slate-700 py-4 rounded-lg font-bold text-lg hover:bg-slate-300 transition-colors"
                >
                  Request Enterprise Review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4 bg-white border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
            Why Organizations Choose Elevate
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-slate-900 mb-2">Reduced Vendor Lock-in Anxiety</h3>
              <p className="text-slate-700">"We can see how it works."</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-slate-900 mb-2">Operational Transparency</h3>
              <p className="text-slate-700">"We can inspect and adjust without waiting on tickets."</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-slate-900 mb-2">Compliance Survivability</h3>
              <p className="text-slate-700">"If you disappeared, we still have continuity."</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-slate-900 mb-2">Faster Iteration Under Governance</h3>
              <p className="text-slate-700">"Changes are logged, scoped, and reversible."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 bg-slate-50 border-t">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <Link href="/store/demo" className="p-6 rounded-xl hover:bg-white transition-colors">
              <h3 className="font-bold text-slate-900 mb-2">Demo Center</h3>
              <p className="text-slate-700 text-sm">Explore platform features</p>
            </Link>
            <Link href="/store/guides/licensing" className="p-6 rounded-xl hover:bg-white transition-colors">
              <h3 className="font-bold text-slate-900 mb-2">Licensing Guide</h3>
              <p className="text-slate-700 text-sm">Step-by-step walkthrough</p>
            </Link>
            <Link href="/contact?topic=licensing" className="p-6 rounded-xl hover:bg-white transition-colors">
              <h3 className="font-bold text-slate-900 mb-2">Questions?</h3>
              <p className="text-slate-700 text-sm">Contact our team</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Master Statement */}
      <section className="py-8 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-400">{MASTER_STATEMENT}</p>
        </div>
      </section>
    </div>
  );
}
