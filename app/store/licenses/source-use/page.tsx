import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, X, Shield, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Restricted Source-Use License | Elevate for Humanity',
  description: 'Enterprise-only restricted source-use license for organizations requiring code-level deployment. Starting at $75,000. Approval required.',
};

const DOES_NOT_INCLUDE = [
  'Ownership of the software',
  'Rebranding or white-label rights',
  'Resale or sublicensing rights',
  'Credential or ETPL authority',
  'Managed hosting or infrastructure',
  'The right to represent the platform as customer-owned',
  'Self-service checkout',
  'Automatic provisioning',
];

const REQUIREMENTS = [
  'Enterprise approval required before purchase',
  'Legal review of use case and deployment plan',
  'Signed restricted-use agreement',
  'Annual compliance attestation',
  'No public redistribution',
];

const MASTER_STATEMENT = `All platform products are licensed access to systems operated by Elevate for Humanity. Ownership of software, infrastructure, and intellectual property is not transferred.`;

export default function SourceUseLicensePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-600 text-white rounded-full text-sm font-bold mb-6">
            <AlertTriangle className="w-4 h-4" />
            ENTERPRISE ONLY
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            Restricted Source-Use License
          </h1>
          
          <p className="text-xl text-slate-300 mb-8">
            A restricted license granting internal use of source code only. This option exists for 
            organizations that require code-level deployment and are prepared to assume full 
            operational responsibility.
          </p>

          <div className="bg-amber-900/30 border border-amber-600/50 rounded-xl p-6 mb-8">
            <p className="text-amber-200 font-medium">
              This is NOT a self-service product. Enterprise review and approval is required 
              before any purchase can proceed.
            </p>
          </div>
        </div>
      </section>

      {/* What This License Does NOT Include */}
      <section className="py-16 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-red-400">
            This License Does NOT Include
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {DOES_NOT_INCLUDE.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">
            Requirements for Source-Use License
          </h2>
          <div className="space-y-4">
            {REQUIREMENTS.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Pricing</h2>
          <div className="text-5xl font-black text-white mb-4">
            Starting at $75,000
          </div>
          <p className="text-slate-400 mb-8">
            Final pricing determined after enterprise review based on use case, 
            deployment scope, and support requirements.
          </p>
          
          <Link
            href="/contact?topic=source-use-license"
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors"
          >
            Request Enterprise Review
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Alternative - Managed Platform */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-900/30 border border-blue-600/50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Looking for Managed Platform Access?</h3>
            <p className="text-slate-300 mb-6">
              Most organizations choose our Managed Enterprise LMS Platform. We handle hosting, 
              security, updates, and infrastructure. You focus on your learners.
            </p>
            <Link
              href="/store/licenses/managed"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              View Managed Platform
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Master Statement */}
      <section className="py-8 px-4 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-500 italic">
            {MASTER_STATEMENT}
          </p>
        </div>
      </section>
    </div>
  );
}
