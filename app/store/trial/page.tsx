'use client';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Clock, Shield } from 'lucide-react';

const trialFeatures = [
  '14-day evaluation access',
  'Full platform functionality',
  'Demo data included',
  'No credit card required',
  'Some admin actions limited',
];

const organizationTypes = [
  { value: 'workforce_board', label: 'Workforce Development Board' },
  { value: 'nonprofit', label: 'Nonprofit / Community Organization' },
  { value: 'training_provider', label: 'Training Provider / School' },
  { value: 'apprenticeship_sponsor', label: 'Apprenticeship Sponsor / Administrator' },
  { value: 'government', label: 'Government / Public Agency' },
  { value: 'other', label: 'Other' },
];

const roles = [
  { value: 'executive', label: 'Executive / Director' },
  { value: 'program_manager', label: 'Program Manager' },
  { value: 'it_lead', label: 'IT / Technical Lead' },
  { value: 'procurement', label: 'Procurement / Purchasing' },
  { value: 'other', label: 'Other' },
];

export default function TrialPage() {
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    contactName: '',
    contactEmail: '',
    role: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In production, this would create a trial tenant/flagged state
    // For now, simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4">
            Trial Access Requested
          </h1>
          <p className="text-gray-600 mb-8">
            We're setting up your trial environment. You'll receive an email at{' '}
            <strong>{formData.contactEmail}</strong> with access instructions within 1 business day.
          </p>
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="font-bold text-gray-900 mb-4">What happens next?</h2>
            <ol className="text-left space-y-3 text-gray-600">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">1</span>
                <span>We'll provision your trial environment with demo data</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">2</span>
                <span>You'll receive login credentials via email</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">3</span>
                <span>Explore the platform for 14 days</span>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">4</span>
                <span>Request a license when ready to go live</span>
              </li>
            </ol>
          </div>
          <Link
            href="/store"
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            ← Back to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Store", href: "/store" }, { label: "Trial" }]} />
      </div>
<div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-4">
            Start Your Platform Trial
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Evaluate the Elevate Workforce Platform for 14 days. No credit card required.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trial Info */}
          <div className="bg-white rounded-xl p-8 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              What's included in your trial
            </h2>
            <ul className="space-y-4 mb-8">
              {trialFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="border-t pt-6">
              <h3 className="font-bold text-gray-900 mb-4">Trial limitations</h3>
              <p className="text-sm text-gray-600 mb-4">
                During the trial, some administrative actions are restricted to protect platform integrity:
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• No production data exports</li>
                <li>• No bulk imports</li>
                <li>• No email/SMS sending</li>
                <li>• No certificate issuance</li>
                <li>• No external integrations</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                These features unlock with a full license.
              </p>
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4" />
                <span>Trial expires automatically after 14 days</span>
              </div>
            </div>
          </div>

          {/* Trial Form */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Request trial access
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Central Indiana Workforce Board"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization Type *
                </label>
                <select
                  required
                  value={formData.organizationType}
                  onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select type...</option>
                  {organizationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="you@organization.org"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Role *
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select role...</option>
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    Start 14-Day Trial
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 pt-2">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  No credit card required
                </div>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t text-center">
              <p className="text-sm text-gray-600">
                Already evaluated?{' '}
                <Link href="/store/request-license" className="text-green-600 font-medium hover:underline">
                  Request a license directly
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
