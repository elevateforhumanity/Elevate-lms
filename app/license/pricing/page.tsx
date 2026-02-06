import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Plans & Pricing | Elevate LMS',
  description: 'Choose your license plan. Core Platform $750/month, Institutional $2,500/month, Enterprise $8,500/month. Start with a 14-day free trial.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/license/pricing',
  },
};

const plans = [
  {
    id: 'core',
    name: 'Core Workforce Infrastructure',
    price: 750,
    priceDisplay: '$750',
    interval: 'month',
    description: 'For solo operators, small nonprofits, and pilot programs getting started with workforce training.',
    features: [
      'Automated learner intake and eligibility screening',
      'Funded (WIOA / WRG / JRI) and self-pay enrollment paths',
      'Deterministic status tracking and notifications',
      'Course delivery and progress tracking',
      'Credential issuance and public verification',
      'Secure records and audit trail',
      'Role-based dashboards (learner + admin)',
    ],
    limits: {
      learners: '100 learners',
      admins: '3 admin users',
      programs: '3 programs',
    },
    replaces: 'Admissions intake, eligibility screening, manual tracking, certificate handling.',
    idealFor: ['Solo operators', 'Small nonprofits', 'Pilot programs'],
    checkoutUrl: '/license/checkout?plan=core',
    trialUrl: '/store/trial',
    image: '/images/programs-hq/students-learning.jpg',
  },
  {
    id: 'institutional',
    name: 'Institutional Operator',
    price: 2500,
    priceDisplay: '$2,500',
    interval: 'month',
    description: 'For schools, training providers, and nonprofits running multiple programs with compliance requirements.',
    features: [
      'Everything in Core, plus:',
      'Multi-program and cohort management',
      'Compliance-ready enrollment workflows',
      'Program holder and partner dashboards',
      'White-label branding',
      'Funding pathway governance',
      'Oversight-ready reporting views',
    ],
    limits: {
      learners: '1,000 learners',
      admins: '25 admin users',
      programs: '25 programs',
    },
    replaces: 'Admissions staff, registrar coordination, compliance tracking, reporting prep.',
    idealFor: ['Training providers', 'Schools', 'Credentialing bodies', 'Multi-program nonprofits'],
    highlighted: true,
    checkoutUrl: '/license/checkout?plan=institutional',
    trialUrl: '/store/trial',
    image: '/images/programs-hq/business-office.jpg',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Workforce Infrastructure',
    price: 8500,
    priceDisplay: '$8,500',
    interval: 'month',
    description: 'For workforce boards, government agencies, and regional operators managing large-scale workforce systems.',
    features: [
      'Everything above, plus:',
      'Employer and workforce board portals',
      'Multi-tenant and multi-region governance',
      'Advanced outcome and compliance reporting',
      'AI-guided avatars (staff replacement)',
      'API access and integrations',
      'Priority support and escalation',
    ],
    limits: {
      learners: '10,000 learners',
      admins: 'Unlimited admins',
      programs: 'Unlimited programs',
    },
    replaces: 'Entire workforce operations teams, compliance units, reporting analysts.',
    idealFor: ['Workforce boards', 'Government agencies', 'Regional operators', 'Large employers'],
    checkoutUrl: '/license/checkout?plan=enterprise',
    trialUrl: '/store/trial',
    image: '/images/heroes-hq/employer-hero.jpg',
  },
];

const faqs = [
  {
    question: 'What happens during the 14-day free trial?',
    answer: 'You get full access to all features in your selected plan. We set up a demo environment with sample data so you can test every workflow. No credit card required to start. At the end of the trial, you can purchase or your access simply expires.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes. You can upgrade at any time and we will prorate the difference. Downgrades take effect at the end of your current billing period.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, ACH bank transfers, and can invoice for annual payments. Government and nonprofit organizations can request NET-30 terms.',
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No setup fee for Core and Institutional plans when you self-onboard. Enterprise plans include dedicated onboarding support. Optional professional onboarding services are available for $15,000 if you want hands-on configuration assistance.',
  },
  {
    question: 'What if I need more learners than my plan allows?',
    answer: 'You can add capacity at $1,000/month per additional 1,000 learners. Or upgrade to the next tier for better value if you are approaching the limit.',
  },
  {
    question: 'Do you offer annual billing discounts?',
    answer: 'Yes. Pay annually and get 2 months free (17% discount). Contact us for annual pricing.',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'License', href: '/license' }, { label: 'Plans & Pricing' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[300px] overflow-hidden">
        <Image
          src="/images/heroes-hq/how-it-works-hero.jpg"
          alt="Plans and Pricing"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Header */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Plans & Pricing</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Self-operating workforce infrastructure that replaces manual processes with automation. 
            Choose the plan that fits your organization size. All plans include a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl overflow-hidden ${
                  plan.highlighted
                    ? 'border-2 border-blue-500 shadow-xl relative'
                    : 'border-2 border-slate-200 shadow-sm'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-b-lg">
                    Most Popular
                  </div>
                )}

                {/* Plan Image */}
                <div className="relative h-40">
                  <Image
                    src={plan.image}
                    alt={plan.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h2>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-slate-900">{plan.priceDisplay}</span>
                    <span className="text-slate-500">/{plan.interval}</span>
                  </div>

                  <p className="text-slate-600 mb-6">{plan.description}</p>

                  {/* Limits */}
                  <div className="bg-slate-50 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div>
                        <div className="font-bold text-slate-900">{plan.limits.learners}</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{plan.limits.admins}</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{plan.limits.programs}</div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* What it replaces */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-green-800">
                      <span className="font-bold">Replaces:</span> {plan.replaces}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Link
                      href={plan.trialUrl}
                      className={`block w-full text-center py-3 rounded-lg font-bold transition-colors ${
                        plan.highlighted
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      Start 14-Day Free Trial
                    </Link>
                    <Link
                      href={plan.checkoutUrl}
                      className="block w-full text-center py-3 rounded-lg font-bold border-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Buy Now - {plan.priceDisplay}/mo
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Discount Banner */}
      <section className="py-8 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Save 17% with Annual Billing</h2>
          <p className="text-slate-600 mb-4">
            Pay annually and get 2 months free. Contact us for annual pricing options.
          </p>
          <Link
            href="/contact?subject=Annual%20Billing"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Get Annual Pricing
          </Link>
        </div>
      </section>

      {/* What's Included in All Plans */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Included in All Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/technology/hero-program-data-analytics.jpg"
                  alt="Automated Workflows"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Workflows</h3>
              <p className="text-slate-600 text-sm">
                Enrollment processing, progress tracking, certificate generation, and notifications 
                all happen automatically without staff intervention.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6">
              <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/technology/cybersecurity-hero.jpg"
                  alt="Compliance Ready"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Compliance Ready</h3>
              <p className="text-slate-600 text-sm">
                WIOA-compliant data collection, audit trails, and reporting built in. 
                Generate quarterly and annual reports with one click.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-6">
              <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/images/store/ai-tutor.jpg"
                  alt="Support Included"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Support Included</h3>
              <p className="text-slate-600 text-sm">
                Email support, documentation, and video tutorials included with all plans. 
                Priority support and dedicated account managers available on higher tiers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-sm border group">
                <summary className="p-6 cursor-pointer flex items-center justify-between font-semibold list-none">
                  {faq.question}
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-6 pb-6 text-slate-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Automate Your Workforce Operations?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Start your 14-day free trial today. No credit card required. 
            Full access to all features in your selected plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/store/trial"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
