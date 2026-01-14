import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Calendar, HelpCircle } from 'lucide-react';
import { LICENSE_TIERS, DISCLAIMERS, ROUTES, PLATFORM_FEATURES } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Platform Licensing Pricing | Elevate LMS',
  description: 'Platform licensing pricing for the Elevate LMS. Core Platform $4,999, School License $15,000, Enterprise $50,000. Monthly option available.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/license/pricing',
  },
};

export default function PricingPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Platform Licensing</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the license that fits your organization's needs.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {LICENSE_TIERS.slice(0, 3).map((tier) => (
              <div 
                key={tier.id}
                className={`rounded-2xl p-8 ${
                  tier.featured 
                    ? 'bg-orange-600 text-white relative' 
                    : tier.id === 'enterprise' 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-white border-2 border-slate-200'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}
                
                <h2 className={`text-xl font-bold mb-2 ${tier.featured ? 'mt-2' : ''}`}>
                  {tier.name}
                </h2>
                <p className={`text-sm mb-6 ${
                  tier.featured ? 'text-orange-100' : tier.id === 'enterprise' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {tier.description}
                </p>
                
                <div className="mb-8">
                  <p className={`text-sm mb-1 ${
                    tier.featured ? 'text-orange-200' : tier.id === 'enterprise' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {tier.billingType === 'one-time' ? 'One-time license' : 'Per month'}
                  </p>
                  <p className="text-4xl font-bold">{tier.price}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                        tier.featured ? 'text-white' : tier.id === 'enterprise' ? 'text-orange-400' : 'text-green-600'
                      }`} />
                      <span className={tier.featured ? 'text-orange-50' : tier.id === 'enterprise' ? 'text-slate-200' : 'text-slate-700'}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={ROUTES.schedule}
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition ${
                    tier.featured 
                      ? 'bg-white text-orange-600 hover:bg-orange-50' 
                      : tier.id === 'enterprise'
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {tier.id === 'enterprise' ? 'Request Quote' : 'Schedule Demo'}
                </Link>

                {tier.idealFor && (
                  <div className={`mt-6 pt-6 border-t ${
                    tier.featured ? 'border-orange-500' : tier.id === 'enterprise' ? 'border-slate-700' : 'border-slate-200'
                  }`}>
                    <p className={`text-xs font-semibold mb-2 ${
                      tier.featured ? 'text-orange-200' : tier.id === 'enterprise' ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      IDEAL FOR
                    </p>
                    <ul className="space-y-1">
                      {tier.idealFor.map((item, idx) => (
                        <li key={idx} className={`text-xs ${
                          tier.featured ? 'text-orange-100' : tier.id === 'enterprise' ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Monthly Option */}
          <div className="mt-8 bg-slate-100 rounded-xl p-6 text-center">
            <p className="text-slate-600 mb-2">
              Need flexibility? We also offer a <strong>monthly subscription at {LICENSE_TIERS[3].price}</strong> for up to 100 students.
            </p>
            <Link href={ROUTES.schedule} className="text-orange-600 font-semibold hover:text-orange-700">
              Ask about monthly options →
            </Link>
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">{DISCLAIMERS.pricing}</p>
        </div>
      </section>

      {/* What's Included vs Implementation */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">What's Included</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-lg font-bold text-green-900 mb-4">Included with License</h3>
              <ul className="space-y-3">
                {PLATFORM_FEATURES.map((feature) => (
                  <li key={feature.id} className="flex items-start gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature.name}: {feature.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-100 rounded-xl p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Implementation-Dependent</h3>
              <ul className="space-y-3">
                {[
                  'Custom integrations beyond standard connectors',
                  'Data migration from existing systems',
                  'Custom development or feature requests',
                  'Ongoing managed services',
                  'Training and onboarding (available separately)',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <HelpCircle className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 mt-4">{DISCLAIMERS.implementation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to discuss licensing?</h2>
          <p className="text-orange-100 mb-8">
            Schedule a demo to see the platform and discuss pricing for your organization.
          </p>
          <Link
            href={ROUTES.schedule}
            className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition"
          >
            <Calendar className="w-5 h-5" />
            Schedule a Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
