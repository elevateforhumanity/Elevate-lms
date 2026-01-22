'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  HelpCircle,
  Building2,
  GraduationCap,
  Users,
  FileText,
  Shield,
  CreditCard,
  Zap,
} from 'lucide-react';
import { PLANS, TRIAL_DAYS, PlanDefinition } from '@/lib/license/types';
import PageGuide from '@/components/PageGuide';

const platformFeatures = [
  'Eligibility → Training/OJT → Internship pathway engine',
  'Funded vs self-pay program logic',
  'Apprenticeship administration framework',
  'Applicant intake and routing workflows',
  'Admin dashboard and reporting exports',
  'Government-credible disclosures and UX patterns',
];



const idealFor = [
  { name: 'Workforce development boards', icon: Building2 },
  { name: 'Training and education providers', icon: GraduationCap },
  { name: 'Apprenticeship sponsors', icon: Users },
  { name: 'Nonprofits operating funded programs', icon: FileText },
  { name: 'Public-private workforce initiatives', icon: Shield },
];

const faqs = [
  {
    question: 'What happens after the trial ends?',
    answer: 'Your card is automatically charged for the plan you selected. You can cancel anytime before the trial ends to avoid charges.',
  },
  {
    question: 'Can I switch between plans?',
    answer: 'Yes. You can upgrade or downgrade anytime from your billing settings.',
  },
  {
    question: 'What\'s the difference between self-serve and enterprise?',
    answer: 'Self-serve plans are billed via credit card with instant access. Enterprise licenses include source code, dedicated support, and are invoiced with contracts.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. Cancel anytime from your account settings. You\'ll retain access until the end of your current billing period.',
  },
  {
    question: 'Is this multi-tenant?',
    answer: 'Self-serve plans are hosted. Enterprise licenses are single-tenant deployments you control.',
  },
];

export default function StorePage() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('annual');
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleStartTrial = async (planId: string) => {
    setIsLoading(planId);
    
    try {
      const response = await fetch('/api/license/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          organizationName: 'Pending',
          organizationType: 'other',
          contactName: 'Pending',
          contactEmail: 'pending@checkout.com',
        }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to start checkout');
        setIsLoading(null);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
      setIsLoading(null);
    }
  };

  // Get plans for display
  const starterPlan = billingInterval === 'monthly' ? PLANS.starter_monthly : PLANS.starter_annual;
  const professionalPlan = billingInterval === 'monthly' ? PLANS.professional_monthly : PLANS.professional_annual;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-6">
            License the Elevate Workforce Platform
          </h1>
          <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto">
            Deploy a proven eligibility-to-placement workforce system. 
            Choose self-serve for instant access or enterprise for full control.
          </p>
          <p className="text-sm text-slate-400">
            Built for workforce boards, training providers, and public-private partnerships.
          </p>
        </div>
      </section>

      {/* Self-Serve Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Instant Access
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Self-Serve Plans
            </h2>
            <p className="text-gray-600 mb-8">
              Start with a {TRIAL_DAYS}-day free trial. Card required. Cancel anytime.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm border">
              <button
                onClick={() => setBillingInterval('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  billingInterval === 'monthly'
                    ? 'bg-slate-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingInterval('annual')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  billingInterval === 'annual'
                    ? 'bg-slate-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annual
                <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Save 25%
                </span>
              </button>
            </div>
          </div>

          {/* Self-Serve Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 mb-6">For small training providers and pilots</p>
              
              <div className="mb-6">
                <span className="text-4xl font-black text-gray-900">
                  {starterPlan.priceDisplay}
                </span>
                <span className="text-gray-500">/{starterPlan.interval}</span>
                {starterPlan.savings && (
                  <span className="ml-2 text-sm text-green-600 font-medium">
                    {starterPlan.savings}
                  </span>
                )}
              </div>

              <button
                onClick={() => handleStartTrial(starterPlan.id)}
                disabled={isLoading === starterPlan.id}
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 mb-6"
              >
                {isLoading === starterPlan.id ? 'Loading...' : `Start ${TRIAL_DAYS}-Day Free Trial`}
              </button>

              <ul className="space-y-3">
                {starterPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-green-500 p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                Most Popular
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
              <p className="text-gray-600 mb-6">For growing organizations</p>
              
              <div className="mb-6">
                <span className="text-4xl font-black text-gray-900">
                  {professionalPlan.priceDisplay}
                </span>
                <span className="text-gray-500">/{professionalPlan.interval}</span>
                {professionalPlan.savings && (
                  <span className="ml-2 text-sm text-green-600 font-medium">
                    {professionalPlan.savings}
                  </span>
                )}
              </div>

              <button
                onClick={() => handleStartTrial(professionalPlan.id)}
                disabled={isLoading === professionalPlan.id}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 mb-6"
              >
                {isLoading === professionalPlan.id ? 'Loading...' : `Start ${TRIAL_DAYS}-Day Free Trial`}
              </button>

              <ul className="space-y-3">
                {professionalPlan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            <CreditCard className="w-4 h-4 inline mr-1" />
            Card required. Your trial converts automatically. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Enterprise Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" />
              Full Control
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Enterprise Licenses
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Single-tenant deployment with source code access. 
              For workforce boards, government agencies, and large organizations.
            </p>
          </div>

          {/* Enterprise Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Implementation */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {PLANS.implementation.name}
              </h3>
              <p className="text-gray-600 text-sm mb-6">One-time license fee</p>
              
              <div className="mb-6">
                <span className="text-2xl font-black text-gray-900">
                  {PLANS.implementation.priceDisplay}
                </span>
                <p className="text-sm text-gray-500 mt-1">one-time</p>
              </div>

              <Link
                href="/store/request-license?tier=implementation"
                className="block w-full text-center bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors mb-6"
              >
                Request License
              </Link>

              <ul className="space-y-2">
                {PLANS.implementation.features.slice(0, 5).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Implementation + Annual */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                Recommended
              </div>
              
              <h3 className="text-xl font-bold mb-2">
                {PLANS.implementation_plus_annual.name}
              </h3>
              <p className="text-slate-400 text-sm mb-6">Implementation + ongoing support</p>
              
              <div className="mb-6">
                <span className="text-2xl font-black">
                  {PLANS.implementation_plus_annual.priceDisplay}
                </span>
                <p className="text-sm text-slate-400 mt-1">Year 1</p>
              </div>

              <Link
                href="/store/request-license?tier=implementation_plus_annual"
                className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors mb-6"
              >
                Request License
              </Link>

              <ul className="space-y-2">
                {PLANS.implementation_plus_annual.features.slice(0, 5).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Annual Renewal */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {PLANS.annual_renewal.name}
              </h3>
              <p className="text-gray-600 text-sm mb-6">For existing licensees</p>
              
              <div className="mb-6">
                <span className="text-2xl font-black text-gray-900">
                  {PLANS.annual_renewal.priceDisplay}
                </span>
                <p className="text-sm text-gray-500 mt-1">per year</p>
              </div>

              <Link
                href="/store/request-license?tier=annual_renewal"
                className="block w-full text-center bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors mb-6"
              >
                Renew License
              </Link>

              <ul className="space-y-2">
                {PLANS.annual_renewal.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
            What's Included in the Platform
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {platformFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-900 text-sm">
              <strong>Important:</strong> This license provides platform infrastructure. 
              Outcomes, funding approvals, and compliance execution remain the responsibility of the licensee.
            </p>
          </div>
        </div>
      </section>



      {/* Ideal For */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
            Built For
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {idealFor.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <Icon className="w-6 h-6 text-slate-700" />
                  <span className="text-gray-700 font-medium">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-slate-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 ml-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-300 mb-8">
            Start with a free trial or contact us for enterprise licensing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleStartTrial(billingInterval === 'monthly' ? 'professional_monthly' : 'professional_annual')}
              disabled={isLoading !== null}
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              href="/store/request-license"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Contact for Enterprise
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
