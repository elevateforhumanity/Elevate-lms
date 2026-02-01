'use client';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export default function BarberApprenticeshipApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: 'IN',
    hasHostShop: '',
    hostShopName: '',
    howDidYouHear: '',
    agreeToTerms: false,
  });

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      setError('Please agree to the terms to continue.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // First save the application
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          program: 'Barber Apprenticeship',
          programSlug: 'barber-apprenticeship',
          fundingType: 'self-pay',
          source: 'program-page',
        }),
      });

      // Then redirect to Stripe checkout
      const checkoutResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId: 'prog-barber',
          planType: 'payment-plan',
          successUrl: `${window.location.origin}/programs/barber-apprenticeship/apply/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/programs/barber-apprenticeship/apply`,
          customerEmail: formData.email,
          metadata: {
            customerName: `${formData.firstName} ${formData.lastName}`,
            customerPhone: formData.phone,
            program: 'barber-apprenticeship',
            hasHostShop: formData.hasHostShop,
            hostShopName: formData.hostShopName,
          },
        }),
      });

      const checkoutData = await checkoutResponse.json();

      if (checkoutResponse.ok && checkoutData.url) {
        window.location.href = checkoutData.url;
      } else {
        setError(checkoutData.error || 'Unable to create checkout session. Please try again or call (317) 314-3757.');
        setLoading(false);
      }
    } catch {
      setError('Unable to submit. Please call (317) 314-3757 for assistance.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Programs", href: "/programs" }, { label: "Apply" }]} />
      </div>
{/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link 
            href="/programs/barber-apprenticeship" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Program Details
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Apply for the Barber Apprenticeship
          </h1>
          <p className="text-gray-300 text-lg">
            2,000-hour apprenticeship program leading to Indiana state barber licensure.
          </p>
        </div>
      </section>

      {/* Self-Pay Notice */}
      <section className="bg-green-50 border-b border-green-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-900 font-medium">Enroll & Pay Today</p>
              <p className="text-sm text-green-800 mb-2">
                Complete your enrollment and payment in one step. 
                Payment plans available starting at $415/month.
              </p>
              <p className="text-sm text-green-800">
                <strong>Looking for funded training?</strong>{' '}
                <a href="/programs/barber-apprenticeship/eligibility" className="text-blue-600 hover:underline font-medium">
                  Check your eligibility for WIOA/WRG funding first →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium mb-2">{error}</p>
              <div className="flex flex-col sm:flex-row gap-2 mt-3">
                <a 
                  href="tel:317-314-3757" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                >
                  📞 Call (317) 314-3757
                </a>
                <a 
                  href="sms:317-314-3757" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  💬 Text Us
                </a>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              {/* Contact */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="your.email@gmail.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="(317) 555-0123"
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-900 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Indianapolis"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-900 mb-2">
                    State *
                  </label>
                  <select
                    id="state"
                    required
                    value={formData.state}
                    onChange={(e) => updateField('state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="IN">Indiana</option>
                    <option value="IL">Illinois</option>
                    <option value="OH">Ohio</option>
                    <option value="KY">Kentucky</option>
                    <option value="MI">Michigan</option>
                  </select>
                </div>
              </div>

              {/* Host Shop Question */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Do you have a barbershop where you can complete your 2,000 hours? *
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="hasHostShop"
                      value="yes"
                      required
                      checked={formData.hasHostShop === 'yes'}
                      onChange={(e) => updateField('hasHostShop', e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="text-gray-700">Yes, I have a shop lined up</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="hasHostShop"
                      value="no"
                      checked={formData.hasHostShop === 'no'}
                      onChange={(e) => updateField('hasHostShop', e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="text-gray-700">No, I need help finding one</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="hasHostShop"
                      value="exploring"
                      checked={formData.hasHostShop === 'exploring'}
                      onChange={(e) => updateField('hasHostShop', e.target.value)}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span className="text-gray-700">I'm still exploring options</span>
                  </label>
                </div>
              </div>

              {formData.hasHostShop === 'yes' && (
                <div>
                  <label htmlFor="hostShopName" className="block text-sm font-medium text-gray-900 mb-2">
                    Shop Name (optional)
                  </label>
                  <input
                    type="text"
                    id="hostShopName"
                    value={formData.hostShopName}
                    onChange={(e) => updateField('hostShopName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Name of the barbershop"
                  />
                </div>
              )}

              {/* How did you hear */}
              <div>
                <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-900 mb-2">
                  How did you hear about us? (optional)
                </label>
                <select
                  id="howDidYouHear"
                  value={formData.howDidYouHear}
                  onChange={(e) => updateField('howDidYouHear', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select an option</option>
                  <option value="google">Google Search</option>
                  <option value="social">Social Media</option>
                  <option value="friend">Friend or Family</option>
                  <option value="barbershop">Local Barbershop</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Terms */}
              <div className="pt-4 border-t border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => updateField('agreeToTerms', e.target.checked)}
                    className="w-5 h-5 mt-0.5 text-orange-500 rounded"
                  />
                  <span className="text-sm text-gray-600">
                    I understand this is a self-pay program and agree to be contacted by Elevate for Humanity 
                    regarding my application, including program fees and payment options.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Continue to Payment
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-3">
                You'll be redirected to our secure payment processor (Stripe)
              </p>
            </div>
          </form>

          {/* What happens next */}
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">What Happens After Payment?</h2>
            <div className="space-y-4">
              {[
                'You receive immediate access to your student dashboard',
                'Milady sends you login credentials for related instruction',
                'We contact you to finalize host shop placement',
                'You begin logging your 2,000 apprenticeship hours',
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                    {i + 1}
                  </div>
                  <p className="text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <p className="text-center text-gray-500 mt-8">
            Questions? Call us at{' '}
            <a href="tel:317-314-3757" className="text-orange-600 hover:text-orange-700 font-medium">
              (317) 314-3757
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
