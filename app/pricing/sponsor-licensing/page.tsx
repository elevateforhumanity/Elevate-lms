import Link from 'next/link';
import {
  Check,
  Building2,
  Users,
  Globe,
  Shield,
  TrendingUp,
  Phone,
  Mail,
} from 'lucide-react';

export const metadata = {
  title: 'Sponsor-in-a-Box Licensing | Elevate for Humanity',
  description:
    'License our apprenticeship sponsorship infrastructure. WIOA/WRG-safe, audit-defensible, and ready to deploy.',
};

export default function SponsorLicensingPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-zinc-900   text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-6">
              Sponsor-in-a-Box Licensing
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              License Our Apprenticeship Infrastructure
            </h1>
            <p className="text-2xl text-white/90 mb-8 leading-relaxed">
              Operate compliant, funded apprenticeship programs without building
              systems from scratch.
            </p>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
              <p className="text-lg italic">
                "We license the infrastructure that allows organizations to
                operate compliant, funded apprenticeship programs — without
                becoming a school or building systems from scratch."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Choose Your Tier
            </h2>
            <p className="text-xl text-slate-600">
              WIOA/WRG-safe, audit-defensible, ready to deploy
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-200 p-8 hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Starter</h3>
                  <p className="text-sm text-slate-600">Local / Pilot</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  $750<span className="text-xl text-slate-600">/month</span>
                </div>
                <div className="text-sm text-slate-600">+ $1,500 setup fee</div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-slate-700 font-medium mb-4">
                  Best for: Single region, small nonprofit, small workforce org
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Sponsor dashboard (referrals, employers, apprentices)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    RAPIDS lifecycle tracking
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    WIOA/WRG compatibility
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Employer onboarding + MOU workflow
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Audit logs + exports
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-bold text-slate-900 mb-2">
                  Includes:
                </p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Up to 5 employers</li>
                  <li>• Up to 25 apprentices</li>
                </ul>
              </div>

              <Link
                href="/checkout?plan=starter"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-4 rounded-xl font-bold transition"
              >
                Get Started
              </Link>
            </div>

            {/* Professional */}
            <div className="bg-zinc-900   rounded-3xl shadow-2xl border-4 border-indigo-400 p-8 relative transform lg:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Professional
                  </h3>
                  <p className="text-sm text-white/80">Regional Authority</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-white mb-2">
                  $2,500<span className="text-xl text-white/80">/month</span>
                </div>
                <div className="text-sm text-white/80">+ $5,000 setup fee</div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-white/90 font-medium mb-4">
                  Best for: Multi-county regions, workforce boards, large
                  nonprofits
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">
                    Everything in Starter
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">
                    White-label branding (logo, domain, email)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">
                    Multi-trade programs
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">
                    WOTC + OJT tracking
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">
                    ETPL performance dashboards
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white">
                    WorkOne read-only oversight views
                  </span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
                <p className="text-sm font-bold text-white mb-2">Includes:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Up to 25 employers</li>
                  <li>• Up to 250 apprentices</li>
                </ul>
              </div>

              <Link
                href="/checkout?plan=pro"
                className="block w-full bg-white text-indigo-600 hover:bg-slate-100 text-center px-6 py-4 rounded-xl font-bold transition"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-200 p-8 hover:shadow-2xl transition">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Enterprise
                  </h3>
                  <p className="text-sm text-slate-600">
                    State / Tribal / National
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  Custom
                </div>
                <div className="text-sm text-slate-600">
                  $7,500–$15,000/month
                  <br />+ $25,000–$50,000 setup
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-slate-700 font-medium mb-4">
                  Best for: State agencies, tribal nations, national
                  intermediaries
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Everything in Professional
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Multi-state rules engine
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Tenant licensing enforcement
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    SOC-style audit controls
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Monitoring response bundles
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    Dedicated onboarding + training
                  </span>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <p className="text-sm font-bold text-slate-900 mb-2">
                  Includes:
                </p>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Unlimited employers & apprentices</li>
                  <li>• Custom contract terms</li>
                </ul>
              </div>

              <Link
                href="/contact?topic=licensing-enterprise"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center px-6 py-4 rounded-xl font-bold transition"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Optional Add-Ons
            </h2>
            <p className="text-xl text-slate-600">À la carte services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'State Launch Kit',
                price: '$3,500/state',
                description: 'Rules + templates for new state',
              },
              {
                title: 'Employer Billing',
                price: '$1,500 setup',
                description: 'Stripe Connect integration',
              },
              {
                title: 'Custom Reports',
                price: '$1,000 each',
                description: 'Dashboards tailored to your needs',
              },
              {
                title: 'RAPIDS API Adapter',
                price: 'Scoped',
                description: 'When permitted by state',
              },
            ].map((addon, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200"
              >
                <h3 className="font-bold text-slate-900 mb-2">{addon.title}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {addon.price}
                </div>
                <p className="text-sm text-slate-600">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer Fees */}
      <section className="py-20 bg-zinc-900  ">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">
              Allowed & Safe
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Employer Fees
            </h2>
            <p className="text-lg text-slate-600">
              Paid by employer — never grant funds
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-green-200">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  $250–$750
                </div>
                <div className="text-sm text-slate-600">
                  Onboarding/admin fee
                  <br />
                  (one-time)
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  $50–$150
                </div>
                <div className="text-sm text-slate-600">
                  Per-apprentice platform fee
                  <br />
                  (monthly)
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  Bundled
                </div>
                <div className="text-sm text-slate-600">
                  Compliance/reporting
                  <br />
                  services
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm text-slate-700">
                <strong className="text-slate-900">Rule:</strong> Never bill
                training, wages, kits, or grant-funded costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              What You Get
            </h2>
            <p className="text-xl text-slate-600">
              State-grade workforce infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Compliance Built-In',
                description:
                  'RAPIDS tracking, WIOA/WRG compatibility, audit logs, SOC-style controls',
              },
              {
                icon: TrendingUp,
                title: 'Performance Dashboards',
                description:
                  'ETPL metrics, retention rates, completion tracking, real-time reporting',
              },
              {
                icon: Users,
                title: 'Role-Based Access',
                description:
                  'Sponsor, employer, WorkOne views with appropriate permissions',
              },
              {
                icon: Globe,
                title: 'Multi-State Ready',
                description:
                  'State rules engine, tenant licensing, white-label branding',
              },
              {
                icon: Building2,
                title: 'Employer Tools',
                description:
                  'Onboarding workflows, MOU templates, WOTC tracking, billing integration',
              },
              {
                icon: Check,
                title: 'Audit-Ready',
                description:
                  'One-click exports, monitoring bundles, immutable audit logs',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-zinc-900   text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to License?
          </h2>
          <p className="text-2xl mb-10 text-white/90">
            Let's discuss which tier fits your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13173143757"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-slate-100 px-10 py-5 rounded-xl font-bold text-lg transition shadow-2xl"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg transition"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
