'use client';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const organizationTypes = [
  { value: 'workforce_board', label: 'Workforce Development Board' },
  { value: 'nonprofit', label: 'Nonprofit / Community Organization' },
  { value: 'training_provider', label: 'Training Provider / School' },
  { value: 'apprenticeship_sponsor', label: 'Apprenticeship Sponsor / Administrator' },
  { value: 'government', label: 'Government / Public Agency' },
  { value: 'employer', label: 'Employer' },
  { value: 'other', label: 'Other' },
];

const plans = [
  { id: 'core', name: 'Core', price: '$750/mo', learners: '100 learners' },
  { id: 'institutional', name: 'Institutional', price: '$2,500/mo', learners: '1,000 learners' },
  { id: 'enterprise', name: 'Enterprise', price: '$8,500/mo', learners: '10,000 learners' },
];

export default function TrialPage() {
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    contactName: '',
    contactEmail: '',
    phone: '',
    planId: 'institutional',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tenantInfo, setTenantInfo] = useState<{
    subdomain: string;
    dashboardUrl: string;
    trialEndsAt: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/provisioning/tenant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationName: formData.organizationName,
          organizationType: formData.organizationType,
          contactName: formData.contactName,
          contactEmail: formData.contactEmail,
          contactPhone: formData.phone,
          planId: formData.planId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create trial');
      }

      setTenantInfo({
        subdomain: data.tenant.subdomain,
        dashboardUrl: data.tenant.dashboardUrl,
        trialEndsAt: data.license.trialEndsAt,
      });
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && tenantInfo) {
    const trialEndDate = new Date(tenantInfo.trialEndsAt).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Your Trial is Ready!
            </h1>
            
            <p className="text-lg text-slate-600 mb-8">
              Your platform has been provisioned. You can start using it immediately.
            </p>

            {/* Access Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
              <h2 className="font-bold text-blue-900 mb-4">Your Platform Access</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-blue-700">Dashboard URL:</span>
                  <a 
                    href={tenantInfo.dashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 font-mono text-lg hover:underline"
                  >
                    {tenantInfo.dashboardUrl}
                  </a>
                </div>
                <div>
                  <span className="text-sm text-blue-700">Trial Expires:</span>
                  <p className="font-semibold text-blue-900">{trialEndDate}</p>
                </div>
              </div>
            </div>

            {/* What You Get */}
            <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
              <h2 className="font-bold text-slate-900 mb-4">What's Included in Your Trial</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <div>
                    <p className="font-medium text-slate-900">Full Admin Dashboard</p>
                    <p className="text-sm text-slate-600">Manage courses, students, and reports</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <div>
                    <p className="font-medium text-slate-900">Sample Data</p>
                    <p className="text-sm text-slate-600">Pre-loaded courses and demo students</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <div>
                    <p className="font-medium text-slate-900">Data Import Tools</p>
                    <p className="text-sm text-slate-600">Import your students, courses, and employers via CSV</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <div>
                    <p className="font-medium text-slate-900">All Automated Workflows</p>
                    <p className="text-sm text-slate-600">Enrollment, tracking, certificates, reports</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white border-2 border-slate-200 rounded-xl p-6 mb-8 text-left">
              <h2 className="font-bold text-slate-900 mb-4">Next Steps</h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="font-medium text-slate-900">Check your email</p>
                    <p className="text-sm text-slate-600">We sent login credentials to {formData.contactEmail}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="font-medium text-slate-900">Log in to your dashboard</p>
                    <p className="text-sm text-slate-600">Explore the admin panel and see the demo data</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="font-medium text-slate-900">Import your data (optional)</p>
                    <p className="text-sm text-slate-600">Go to Admin → Import to upload your students, courses, or employers</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</span>
                  <div>
                    <p className="font-medium text-slate-900">Test the workflows</p>
                    <p className="text-sm text-slate-600">Create a test enrollment, generate a certificate, run a report</p>
                  </div>
                </li>
              </ol>
            </div>

            <a
              href={tenantInfo.dashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
            >
              Go to Your Dashboard →
            </a>

            <p className="mt-6 text-sm text-slate-500">
              Questions? Contact us at <a href="mailto:support@elevateforhumanity.org" className="text-blue-600 hover:underline">support@elevateforhumanity.org</a> or call (317) 314-3757
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumbs items={[{ label: 'Store', href: '/store' }, { label: 'Start Free Trial' }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="relative h-[250px] overflow-hidden">
        <Image
          src="/images/heroes-hq/success-hero.jpg"
          alt="Start Your Free Trial"
          fill
          className="object-cover"
          priority
        />
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* What You Get */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Your 14-Day Free Trial Includes</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Full Platform Access</p>
                    <p className="text-sm text-slate-600">All features, no limitations</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Your Own Subdomain</p>
                    <p className="text-sm text-slate-600">yourorg.elevatelms.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Demo Data Included</p>
                    <p className="text-sm text-slate-600">Sample courses, students, and reports</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Multiple Import Options</p>
                    <p className="text-sm text-slate-600">CSV, Excel, Google Sheets, Salesforce, HubSpot, or API</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">No Credit Card Required</p>
                    <p className="text-sm text-slate-600">Trial expires automatically, no charges</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium text-slate-900 mb-3">After the trial:</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Choose a plan that fits your organization. Your data and configuration are preserved when you upgrade.
                </p>
                <Link href="/license/pricing" className="text-sm text-blue-600 hover:underline">
                  View pricing plans →
                </Link>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Start Your Free Trial</h1>
              <p className="text-slate-600 mb-6">
                Get instant access to your own platform. No credit card required.
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Plan Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Select Plan to Trial
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {plans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, planId: plan.id })}
                        className={`p-4 rounded-lg border-2 text-left transition-colors ${
                          formData.planId === plan.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <p className="font-bold text-slate-900">{plan.name}</p>
                        <p className="text-sm text-slate-600">{plan.learners}</p>
                        <p className="text-xs text-slate-500 mt-1">{plan.price} after trial</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Organization Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your Organization"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Organization Type *
                    </label>
                    <select
                      required
                      value={formData.organizationType}
                      onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select type...</option>
                      {organizationTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="you@organization.org"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 555-5555"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating Your Platform...' : 'Start Free 14-Day Trial'}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  By starting a trial, you agree to our{' '}
                  <Link href="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
