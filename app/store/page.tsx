import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, Shield, Play, Building2, Users, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'License Workforce Infrastructure | Elevate for Humanity',
  description: 'License workforce infrastructure that replaces admissions, eligibility screening, compliance reporting, credential issuance, and verification — without staffing overhead.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/store',
  },
};

const licenses = [
  {
    id: 'core',
    name: 'Core Workforce Infrastructure',
    price: 750,
    description: 'For solo operators, pilots, and small institutions replacing admissions and basic compliance staff.',
    audience: ['Solo operators', 'Small nonprofits', 'Pilot programs'],
    replaces: 'Admissions intake, eligibility screening, manual tracking, certificate handling.',
    capacity: ['Up to 100 active learners', 'Up to 3 programs', '1 organization'],
    features: [
      'Automated learner intake and eligibility screening',
      'Funded (WIOA / WRG / JRI) and self-pay enrollment paths',
      'Deterministic status tracking and notifications',
      'Course delivery and progress tracking',
      'Credential issuance and public verification',
      'Secure records and audit trail',
      'Role-based dashboards (learner + admin)',
    ],
    cta: 'Activate Core Infrastructure',
    href: '/store/checkout?license=core',
    demoHref: '/store/demo/core',
  },
  {
    id: 'institutional',
    name: 'Institutional Operator',
    price: 2500,
    popular: true,
    description: 'For schools, nonprofits, credentialing bodies, and multi-program training providers.',
    audience: ['Training providers', 'Schools', 'Credentialing bodies', 'Multi-program nonprofits'],
    replaces: 'Admissions staff, registrar coordination, compliance tracking, reporting prep.',
    capacity: ['Up to 1,000 active learners', 'Up to 25 programs', '1 institution'],
    features: [
      'Everything in Core, plus:',
      'Multi-program and cohort management',
      'Compliance-ready enrollment workflows',
      'Program holder and partner dashboards',
      'White-label branding',
      'Funding pathway governance',
      'Oversight-ready reporting views',
    ],
    cta: 'Activate Institutional License',
    href: '/store/checkout?license=institutional',
    demoHref: '/store/demo/institutional',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Workforce Infrastructure',
    price: 8500,
    description: 'For workforce boards, government agencies, regional systems, and large employers.',
    audience: ['Workforce boards', 'Government agencies', 'Regional operators', 'Large employers'],
    replaces: 'Entire workforce operations teams, compliance units, reporting analysts.',
    capacity: ['Up to 10,000 active learners', 'Unlimited programs', 'Multiple organizations / regions'],
    features: [
      'Everything above, plus:',
      'Employer and workforce board portals',
      'Multi-tenant and multi-region governance',
      'Advanced outcome and compliance reporting',
      'AI-guided avatars (staff replacement)',
      'API access and integrations',
      'Priority support and escalation',
    ],
    cta: 'Request Enterprise Access',
    href: '/contact?subject=Enterprise%20License',
    demoHref: '/store/demo/enterprise',
  },
];

const addOns = [
  {
    name: 'Institutional Onboarding & Configuration',
    price: '$15,000',
    type: 'one-time',
    features: ['Program and credential setup', 'Compliance mapping', 'Reporting alignment', 'Funding workflow configuration'],
  },
  {
    name: 'High-Volume Learner Expansion',
    price: '$1,000',
    type: '/month per additional 1,000 learners',
    features: ['Scale beyond tier capacity', 'Same compliance coverage', 'No performance limits'],
  },
];

const resources = [
  { name: 'Grant Readiness Guide', price: 29, href: '/store/resources/grant-readiness' },
  { name: 'Fund-Ready Mini Course', price: 149, href: '/store/resources/fund-ready-course' },
  { name: 'Start a Tax Business Toolkit', price: 49, href: '/store/resources/tax-business-toolkit' },
];

const whatThisReplaces = [
  { role: 'Admissions and intake staff', icon: Users },
  { role: 'Eligibility screening', icon: Shield },
  { role: 'Funding pathway management', icon: Briefcase },
  { role: 'Compliance tracking and reporting', icon: Building2 },
  { role: 'Credential issuance and verification', icon: Check },
  { role: 'Manual record keeping and spreadsheets', icon: Shield },
];

export default function StorePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-400 font-semibold mb-4 tracking-wide">WORKFORCE INFRASTRUCTURE LICENSING</p>
          <h1 className="text-4xl sm:text-5xl font-black mb-6">
            License Workforce Infrastructure — Monthly
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Replace admissions, eligibility screening, compliance reporting, credential issuance, 
            and verification without staffing overhead.
          </p>
          <p className="text-slate-400 mt-6 text-sm">
            Licenses grant access to institutional capabilities. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Licenses */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center mb-4">Workforce Platform Licenses</h2>
          <p className="text-center text-gray-600 mb-12">Monthly infrastructure licensing • Capacity enforced automatically</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {licenses.map((license) => (
              <div
                key={license.id}
                className={`relative bg-white rounded-2xl border-2 ${
                  license.popular ? 'border-blue-600 shadow-xl' : 'border-gray-200'
                }`}
              >
                {license.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full">
                      MOST COMMON
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-2">{license.name}</h3>
                  <p className="text-sm text-gray-600 mb-6">{license.description}</p>

                  <div className="mb-6">
                    <span className="text-5xl font-black">${license.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-lg"> / month</span>
                  </div>

                  {/* Demo Link */}
                  <Link
                    href={license.demoHref}
                    className="flex items-center justify-center gap-2 w-full py-3 mb-4 border-2 border-slate-200 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Watch Demo
                  </Link>

                  <div className="bg-slate-100 p-4 rounded-lg mb-6">
                    <p className="text-sm font-semibold text-slate-700 mb-1">What this replaces:</p>
                    <p className="text-sm text-slate-600">{license.replaces}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Capacity</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {license.capacity.map((cap, i) => (
                        <li key={i}>• {cap}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8">
                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Includes</p>
                    <ul className="space-y-2">
                      {license.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={license.href}
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-lg font-bold transition-colors ${
                      license.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {license.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Automated Self-Service Operations Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-4">Automated, Self-Service Operations</h2>
          <p className="text-lg text-slate-300 text-center mb-8 max-w-3xl mx-auto">
            This platform operates as a self-service workforce system. Enrollment triggers automated workflows for eligibility, course assignment, progress tracking, compliance logging, credential issuance, and reporting. Staff intervention is required only for exceptions—not daily operations.
          </p>
          <div className="max-w-2xl mx-auto mb-12">
            <ul className="space-y-4">
              <li className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200 text-lg">Automated enrollment orchestration</span>
              </li>
              <li className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200 text-lg">Rules-based progress and hour tracking</span>
              </li>
              <li className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200 text-lg">Automated nudges and interventions</span>
              </li>
              <li className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200 text-lg">Auto-generated compliance and outcome reports</span>
              </li>
              <li className="flex items-start gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-200 text-lg">Credential issuance with public verification</span>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-bold text-center mb-6">What This Platform Replaces</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {whatThisReplaces.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3 bg-slate-800 p-4 rounded-lg">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-sm">{item.role}</span>
                </div>
              );
            })}
          </div>
          <p className="text-center text-slate-400 mt-8">
            Result: lower overhead, fewer errors, faster execution, audit-ready records.
          </p>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-4">Optional Add-Ons</h2>
          <p className="text-center text-gray-600 mb-10">Sold separately — not bundled</p>
          <div className="grid md:grid-cols-2 gap-6">
            {addOns.map((addon) => (
              <div key={addon.name} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-2">{addon.name}</h3>
                <p className="text-2xl font-black text-gray-900 mb-1">{addon.price}</p>
                <p className="text-sm text-gray-500 mb-4">{addon.type}</p>
                <ul className="space-y-2">
                  {addon.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-4">Resources & Tools</h2>
          <p className="text-center text-gray-600 mb-10">Educational materials — no platform access included</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div key={resource.name} className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                <h3 className="font-semibold mb-2">{resource.name}</h3>
                <p className="text-2xl font-bold mb-4">${resource.price}</p>
                <Link
                  href={resource.href}
                  className="inline-block w-full py-2 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Get Resource
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Disclaimer */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-slate-600">
                <p className="font-semibold text-slate-900 mb-1">Important</p>
                <p>
                  Licenses grant access to platform functionality. Funding eligibility, credential issuance, 
                  and compliance obligations remain subject to applicable state and federal rules. 
                  Elevate for Humanity provides automated workflows and records, not legal guarantees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-bold text-gray-900 mb-2">Is this just an LMS?</h3>
              <p className="text-gray-600">No. This is workforce operations infrastructure with built-in automation, compliance tracking, credentialing, and reporting. It replaces staff functions, not just course delivery.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-bold text-gray-900 mb-2">Does this require internal staff to operate?</h3>
              <p className="text-gray-600">Core workflows are automated. Staff involvement is limited to oversight and exception handling. Standard program operations do not require day-to-day administrative staff.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-bold text-gray-900 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes. Monthly licenses can be canceled anytime. You retain access until the end of your current billing period.</p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="font-bold text-gray-900 mb-2">What happens to my data if I cancel?</h3>
              <p className="text-gray-600">Your data remains accessible for export for 30 days after cancellation. Compliance records are retained per regulatory requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to License Infrastructure?</h2>
          <p className="text-blue-100 mb-8">
            Monthly infrastructure license. Cancel anytime. Compliance records logged on every action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/store/checkout?license=institutional"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Activate Institutional License
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact?subject=Enterprise%20License"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Request Enterprise Access
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
