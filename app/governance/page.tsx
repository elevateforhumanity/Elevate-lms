import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Shield, Scale, BookOpen, CreditCard, Receipt, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Authoritative Documentation Index | Elevate for Humanity',
  description: 'Platform governance and operations documentation. Single source of truth for security, compliance, LMS, store, tax services, and onboarding.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/governance',
  },
};

const DOCUMENTS = [
  {
    number: 1,
    title: 'Platform Overview & Governance',
    slug: 'platform-overview',
    icon: FileText,
    covers: 'Entire ecosystem',
    useWhen: 'What the platform is, how components relate, who owns decisions, and how governance is enforced.',
    governs: [
      'Public positioning',
      'Platform components and roles',
      'Change management and review cadence',
    ],
  },
  {
    number: 2,
    title: 'Security & Data Protection Statement',
    slug: 'security',
    icon: Shield,
    covers: 'All data handling and security practices',
    useWhen: 'How data is collected, protected, accessed, retained, and how incidents are handled.',
    governs: [
      'Security and privacy language',
      'Data handling across website, LMS, Store, and tax services',
    ],
  },
  {
    number: 3,
    title: 'Compliance & Disclosure Framework',
    slug: 'compliance',
    icon: Scale,
    covers: 'Legal, financial, eligibility, and claims discipline',
    useWhen: 'How disclosures are presented, how claims are supported, and how compliance alignment is maintained.',
    governs: [
      'Eligibility statements',
      'Pricing and fee disclosures',
      'Outcome and capability claims',
    ],
  },
  {
    number: 4,
    title: 'LMS Governance & Course Standards',
    slug: 'lms-standards',
    icon: BookOpen,
    covers: 'Learning Management System operations',
    useWhen: 'How courses are owned, structured, audited, and maintained.',
    governs: [
      'Course completeness requirements',
      'Instructor and ownership rules',
      'Assessments, completion, and audits',
    ],
  },
  {
    number: 5,
    title: 'Store, Payments & Licensing Framework',
    slug: 'store-payments',
    icon: CreditCard,
    covers: 'Store products and payments',
    useWhen: 'How products are sold, priced, paid for, and supported after purchase.',
    governs: [
      'Checkout behavior',
      'Stripe configuration and metadata discipline',
      'Refunds, disputes, and post-purchase obligations',
    ],
  },
  {
    number: 6,
    title: 'Tax Preparation & Refund Advance Operations',
    slug: 'tax-operations',
    icon: Receipt,
    covers: 'Supersonic Fast Cash LLC services',
    useWhen: 'How tax preparation works and how optional refund-based advances are positioned and controlled.',
    governs: [
      'Tax filing workflow',
      'Refund advance eligibility and opt-in',
      'Repayment mechanics and disclosures',
    ],
  },
  {
    number: 7,
    title: 'Onboarding & User Experience Standards',
    slug: 'onboarding-standards',
    icon: Users,
    covers: 'All onboarding flows',
    useWhen: 'How users are guided from entry to completion across roles.',
    governs: [
      'Student, instructor, admin, and tax user onboarding',
      'Required disclosures by stage',
      'Completion and exit criteria',
    ],
  },
];

export default function GovernancePage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Authoritative Documentation Index
          </h1>
          <p className="text-slate-300 text-lg">
            Platform Governance & Operations
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
            <span>Version: 1.0</span>
            <span>•</span>
            <span>Last Reviewed: {currentDate}</span>
            <span>•</span>
            <span>Owner: Platform Governance</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Purpose */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Purpose</h2>
          <p className="text-slate-700 leading-relaxed">
            This index identifies the single authoritative documents that govern the operation of the platform, 
            including the public website, LMS, Store, and Supersonic Fast Cash tax services. These documents 
            are designed to stand alone during buyer review, regulatory review, payment processor review, or 
            internal audit.
          </p>
          <p className="text-slate-700 leading-relaxed mt-4">
            If a topic is not covered by a document listed below, it is not considered an authoritative policy 
            or operational rule.
          </p>
        </section>

        {/* How to Use */}
        <section className="mb-12 bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">How to Use This Index</h2>
          <ul className="space-y-3 text-slate-700">
            <li>
              <strong>Users:</strong> Reference these documents to understand how services work and how data, 
              payments, and onboarding are handled.
            </li>
            <li>
              <strong>Partners & Buyers:</strong> Use this index to quickly locate governing materials for diligence.
            </li>
            <li>
              <strong>Auditors & Reviewers:</strong> Each document includes scope, controls, and versioning.
            </li>
            <li>
              <strong>Internal Teams:</strong> Product copy, features, templates, and workflows must align with 
              these documents.
            </li>
          </ul>
          <p className="mt-4 text-slate-600 italic">
            Website pages summarize. These documents govern.
          </p>
        </section>

        {/* Document Set */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Authoritative Document Set</h2>
          <div className="space-y-6">
            {DOCUMENTS.map((doc) => (
              <div key={doc.slug} className="border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <doc.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-500">Document {doc.number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      <Link href={`/governance/${doc.slug}`} className="hover:text-blue-600 transition-colors">
                        {doc.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      <strong>Covers:</strong> {doc.covers}
                    </p>
                    <p className="text-slate-700 mb-4">
                      <strong>Use when you need to understand:</strong> {doc.useWhen}
                    </p>
                    <div>
                      <p className="text-sm font-medium text-slate-900 mb-2">Governs:</p>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        {doc.governs.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <Link 
                        href={`/governance/${doc.slug}`}
                        className="text-blue-600 text-sm font-medium hover:text-blue-700"
                      >
                        View Full Document →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Versioning */}
        <section className="mb-12 bg-amber-50 rounded-xl p-6 border border-amber-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Versioning & Authority</h2>
          <ul className="space-y-2 text-slate-700">
            <li>• Each document listed above includes its own version number and review date.</li>
            <li>• Superseded versions are archived.</li>
            <li>• In the event of conflict, the most recently reviewed version of the relevant document prevails.</li>
            <li>• No other page, template, or artifact overrides these documents.</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="text-center py-8 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Contact & Questions</h2>
          <p className="text-slate-700 mb-4">
            Questions regarding interpretation or application of these documents should be directed through 
            official support channels.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Contact Support
          </Link>
        </section>
      </div>
    </div>
  );
}
