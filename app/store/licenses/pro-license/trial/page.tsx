'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  CreditCard,
  Shield,
  Clock,
  Calendar,
} from 'lucide-react';

const LICENSE = {
  name: 'Elevate LMS Pro License',
  slug: 'pro-license',
  price: 999,
  trialDays: 14,
  features: [
    'Complete Next.js codebase',
    'Multi-site deployment',
    'Lifetime updates',
    'Priority support',
    'Dev Studio included',
    'API documentation',
  ],
};

export default function ProTrialPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + LICENSE.trialDays);

  const handleStartTrial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    window.location.href = `/api/checkout/trial?license=${LICENSE.slug}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-4">
            Most Popular
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">
            Start Your {LICENSE.trialDays}-Day Free Trial
          </h1>
          <p className="text-lg text-gray-600">
            Try {LICENSE.name} free for {LICENSE.trialDays} days. Cancel anytime before the trial ends.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trial Info */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">How it works</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Start free today</h3>
                  <p className="text-gray-600 text-sm">
                    Get instant access to the full platform. No charge until trial ends.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Deploy multiple sites</h3>
                  <p className="text-gray-600 text-sm">
                    Test multi-site deployment, use Dev Studio, explore all Pro features.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Keep using or cancel</h3>
                  <p className="text-gray-600 text-sm">
                    After {LICENSE.trialDays} days, you'll be charged ${LICENSE.price} to continue. Cancel anytime before.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-900">
                    Trial ends {trialEndDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-sm text-amber-700">
                    We'll remind you 3 days before your trial ends.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-bold text-gray-900 mb-4">What's included:</h3>
              <ul className="space-y-2">
                {LICENSE.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-purple-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Start your trial</h2>
              <div className="text-right">
                <div className="text-2xl font-black text-purple-600">${LICENSE.price}</div>
                <div className="text-sm text-gray-500">after trial</div>
              </div>
            </div>

            <form onSubmit={handleStartTrial} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company / Organization (optional)
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Acme Training Inc."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
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
                You'll enter payment details on the next page. You won't be charged until your trial ends.
              </p>
            </form>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Secure checkout
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Cancel anytime
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't want a trial?{' '}
                <Link href={`/store/licenses/checkout/${LICENSE.slug}`} className="text-purple-600 font-medium hover:underline">
                  Purchase now for ${LICENSE.price}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
