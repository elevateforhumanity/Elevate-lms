import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Building2, 
  Users, 
  Briefcase,
  GraduationCap,
  Route,
  ClipboardCheck,
  Handshake,
  Calendar,
  Zap
} from 'lucide-react';
import { 
  LICENSE_TIERS, 
  INTEGRATIONS, 
  ROUTES, 
  DISCLAIMERS,
  getStartingPrice 
} from '@/lib/pricing';

export default function LicensePage() {
  const startingPrice = getStartingPrice();

  return (
    <div>
      {/* HERO BANNER */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                License the Elevate LMS + Workforce Hub
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                A workforce-aligned learning platform built for funded training, employer pipelines, apprenticeships, and reentry learners — configurable for your organization.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={ROUTES.schedule}
                  className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition text-lg"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule a Demo
                </Link>
                <Link
                  href={ROUTES.demo}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition text-lg border border-white/20"
                >
                  View Demo Pages
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              <p className="text-slate-400 text-sm">
                White-label ready • Hybrid delivery • Earn-While-You-Learn support • Compliance-minded workflows
              </p>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500/20 to-slate-700/50 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="bg-slate-800 rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <GraduationCap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                      <p className="text-white font-semibold">Programs</p>
                      <p className="text-slate-400 text-sm">Configurable</p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-white font-semibold">Learners</p>
                      <p className="text-slate-400 text-sm">Unlimited</p>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <Building2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <p className="text-white font-semibold">Employers</p>
                      <p className="text-slate-400 text-sm">Pipeline Ready</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Built for</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 text-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Training Providers</h3>
              <p className="text-slate-600">Deliver workforce programs with built-in compliance tracking and learner management.</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 text-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Workforce & Reentry Organizations</h3>
              <p className="text-slate-600">Support justice-impacted and underserved populations with structured pathways to employment.</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-8 text-center hover:shadow-lg transition">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Employers & Apprenticeship Sponsors</h3>
              <p className="text-slate-600">Connect with trained candidates and manage apprenticeship programs efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Modules included</h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            A complete platform with everything you need to run workforce training programs.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, title: 'LMS Delivery', desc: 'Course management, progress tracking, certificates', color: 'orange' },
              { icon: Route, title: 'Programs & Pathways', desc: 'Career pathways, program catalogs, prerequisites', color: 'blue' },
              { icon: ClipboardCheck, title: 'Intake & Eligibility', desc: 'Screening workflows, eligibility checks, routing', color: 'green' },
              { icon: Handshake, title: 'Employer & Apprenticeship', desc: 'Partner portals, hiring pipelines, OJT tracking', color: 'purple' },
            ].map((module, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition">
                <div className={`h-32 bg-gradient-to-br from-${module.color}-500 to-${module.color}-600 flex items-center justify-center`}>
                  <module.icon className="w-16 h-16 text-white/80" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{module.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{module.desc}</p>
                  <Link href={ROUTES.licenseFeatures} className="text-orange-600 text-sm font-medium hover:text-orange-700 inline-flex items-center gap-1">
                    See details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS PREVIEW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Integrations</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {INTEGRATIONS.map((integration) => (
              <div key={integration.id} className="bg-slate-50 rounded-xl p-6 text-center">
                <Zap className="w-10 h-10 text-slate-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-900 mb-1">{integration.name}</h3>
                <p className="text-slate-500 text-sm">{integration.status}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={ROUTES.licenseIntegrations}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
            >
              See Integrations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Licensing</h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            {LICENSE_TIERS.slice(0, 3).map((tier) => (
              <div 
                key={tier.id} 
                className={`rounded-xl p-6 ${
                  tier.featured 
                    ? 'bg-orange-600 text-white relative' 
                    : tier.id === 'enterprise' 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-white border-2 border-slate-200'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-0.5 rounded-full text-xs font-bold">
                    POPULAR
                  </div>
                )}
                <h3 className={`text-lg font-bold mb-2 ${tier.featured ? 'mt-1' : ''}`}>{tier.name}</h3>
                <p className="text-3xl font-bold mb-3">{tier.price}</p>
                <p className={`text-sm mb-4 ${tier.featured ? 'text-orange-100' : tier.id === 'enterprise' ? 'text-slate-300' : 'text-slate-600'}`}>
                  {tier.description}
                </p>
                <ul className="space-y-2 text-sm">
                  {tier.includes.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${tier.featured ? 'text-white' : tier.id === 'enterprise' ? 'text-orange-400' : 'text-green-600'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm mb-8">
            Monthly option available at {LICENSE_TIERS[3].price}. {DISCLAIMERS.pricing}
          </p>

          <div className="text-center">
            <Link
              href={ROUTES.licensePricing}
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              View Full Pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See it live in a guided demo
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Walk through the platform with our team and see how it fits your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES.schedule}
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Demo
            </Link>
            <Link
              href={ROUTES.demo}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg font-semibold border-2 border-white hover:bg-white/10 transition"
            >
              Explore Demo Pages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
