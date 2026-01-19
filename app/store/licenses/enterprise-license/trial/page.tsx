'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  CreditCard,
  Shield,
  Clock,
  Calendar,
  Zap,
} from 'lucide-react';

const LICENSE = {
  name: 'Elevate LMS Enterprise License',
  slug: 'enterprise-clone-license',
  price: 5000,
  trialDays: 14,
  features: [
    'Unlimited site deployments',
    'White-label rights',
    'Dedicated support channel',
    'Custom feature development',
    'All platform modules included',
    'AI tutor integration',
    'Employer portal',
    'Compliance reporting',
  ],
};

export default function EnterpriseTrialPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + LICENSE.trialDays);

  const handleStartTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    window.location.href = `/api/checkout/trial?license=${LICENSE.slug}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&company=${encodeURIComponent(company)}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-bold mb-4">
            <Zap className="w-4 h-4" />
            Enterprise
          </div>
          <h1 className="text-3xl font-black text-white mb-3">
            Start Your {LICENSE.trialDays}-Day Free Trial
          </h1>
          <p className="text-lg text-slate-400">
            Full access to {LICENSE.name}. Cancel anytime before trial ends.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trial Info */}
          <div className="bg-slate-800 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">How it works</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Start free today</h3>
                  <p className="text-slate-400 text-sm">
                    Enter payment info. You won't be charged until trial ends.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Full platform access</h3>
                  <p className="text-slate-400 text-sm">
                    Deploy unlimited sites, use all enterprise features, get dedicated support.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-amber-400 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">Keep or cancel</h3>
                  <p className="text-slate-400 text-sm">
                    After {LICENSE.trialDays} days, pay ${LICENSE.price.toLocaleString()} to continue. Cancel anytime before.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-amber-400 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-300">
                    Trial ends {trialEndDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-sm text-amber-400/70">
                    We'll email you 3 days before charging.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <h3 className="font-bold text-white mb-4">Everything included:</h3>
              <ul className="space-y-2">
                {LICENSE.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-300">
                    <Check className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Start your trial</h2>
              <div className="text-right">
                <div className="text-2xl font-black text-slate-800">${LICENSE.price.toLocaleString()}</div>
                <div className="text-sm text-gray-500">after {LICENSE.trialDays} days</div>
              </div>
            </div>

            <form onSubmit={handleStartTrial} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Acme Workforce Board"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    'Loading...'
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Continue to Payment
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Enter payment details next. No charge for {LICENSE.trialDays} days.
              </p>
            </form>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Secure
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Cancel anytime
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Skip trial?{' '}
                <Link href={`/store/licenses/checkout/${LICENSE.slug}`} className="text-amber-600 font-medium hover:underline">
                  Buy now for ${LICENSE.price.toLocaleString()}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
