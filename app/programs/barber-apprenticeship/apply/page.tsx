'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, CreditCard, Calculator, Info } from 'lucide-react';

// Pricing constants
const PRICING = {
  totalHours: 2000,
  tuition: 4980,
  setupFee: 1743,
  remainingBalance: 3237,
};

function calculateWeeklyPayment(hoursPerWeek: number, transferHours: number = 0) {
  const remainingHours = PRICING.totalHours - transferHours;
  const weeks = Math.ceil(remainingHours / hoursPerWeek);
  const weekly = PRICING.remainingBalance / weeks;
  return { weekly: Math.round(weekly * 100) / 100, weeks, remainingHours };
}

export default function BarberApprenticeshipApplyPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Payment calculator state
  const [transferHours, setTransferHours] = useState(0);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hasHostShop: '',
    hostShopName: '',
  });

  const { weeks, remainingHours } = calculateWeeklyPayment(hoursPerWeek, transferHours);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayNow = async () => {
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Save application first
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          transferHours,
          program: 'Barber Apprenticeship',
          programSlug: 'barber-apprenticeship',
          fundingType: 'self-pay',
          source: 'program-page',
        }),
      });

      // Redirect to Stripe checkout
      const checkoutResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId: 'prog-barber',
          planType: 'full',
          successUrl: `${window.location.origin}/programs/barber-apprenticeship/apply/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/programs/barber-apprenticeship/apply`,
          customerEmail: formData.email,
          metadata: {
            customerName: `${formData.firstName} ${formData.lastName}`,
            customerPhone: formData.phone,
            program: 'barber-apprenticeship',
            transferHours: transferHours.toString(),
            hasHostShop: formData.hasHostShop,
            hostShopName: formData.hostShopName,
          },
        }),
      });

      const checkoutData = await checkoutResponse.json();

      if (checkoutResponse.ok && checkoutData.url) {
        window.location.href = checkoutData.url;
      } else {
        setError(checkoutData.error || 'Unable to create checkout. Please call (317) 314-3757.');
        setLoading(false);
      }
    } catch {
      setError('Unable to process. Please call (317) 314-3757.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Video Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/hero-images/barber-hero.jpg"
        >
          <source src="/videos/barber-hero-final.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
          <Link 
            href="/programs/barber-apprenticeship" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Program
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Enroll & Pay
          </h1>
          <p className="text-xl text-white/90 mt-2 drop-shadow-md">
            Barber Apprenticeship Program
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Left Column - Payment Calculator */}
          <div className="lg:col-span-2">
            <div className="bg-purple-600 rounded-2xl p-6 text-white sticky top-8">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6" />
                <h2 className="text-lg font-bold">Payment Calculator</h2>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Transfer Hours (if any)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1900"
                    step="50"
                    value={transferHours}
                    onChange={(e) => {
                      const val = Math.min(1900, Math.max(0, parseInt(e.target.value) || 0));
                      setTransferHours(val);
                    }}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50"
                    placeholder="0"
                  />
                  <p className="text-xs text-purple-200 mt-1">
                    Have documented hours from another program?
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Hours Per Week
                  </label>
                  <select
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white"
                  >
                    <option value="20">20 hrs/week</option>
                    <option value="25">25 hrs/week</option>
                    <option value="30">30 hrs/week</option>
                    <option value="35">35 hrs/week</option>
                    <option value="40">40 hrs/week</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              <div className="bg-white/10 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-purple-200 text-xs uppercase mb-1">Remaining Hours</div>
                    <div className="text-2xl font-black">{remainingHours.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-purple-200 text-xs uppercase mb-1">Est. Duration</div>
                    <div className="text-2xl font-black">~{weeks} weeks</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-purple-200 text-xs uppercase mb-1">Program Tuition</div>
                  <div className="text-3xl font-black">${PRICING.tuition.toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2">
                <Info className="w-4 h-4 text-purple-200 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-purple-200">
                  Tuition is the same regardless of transfer hours. Transfer hours reduce your time in program, not the cost.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form & Payment */}
          <div className="lg:col-span-3">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">{error}</p>
                <a 
                  href="tel:317-314-3757" 
                  className="inline-block mt-2 text-red-600 font-medium hover:underline"
                >
                  Call (317) 314-3757 for help
                </a>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>
              
              <div className="space-y-5">
                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="(317) 555-0123"
                  />
                </div>

                {/* Transfer Hours Question */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <label className="block text-sm font-medium text-amber-900 mb-2">
                    Do you have documented barber training hours to transfer?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="hasTransferHours"
                        checked={transferHours > 0}
                        onChange={() => setTransferHours(500)}
                        className="w-4 h-4 text-amber-600"
                      />
                      <span className="text-amber-800">Yes, I have hours to transfer</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="hasTransferHours"
                        checked={transferHours === 0}
                        onChange={() => setTransferHours(0)}
                        className="w-4 h-4 text-amber-600"
                      />
                      <span className="text-amber-800">No, I'm starting fresh</span>
                    </label>
                  </div>
                  {transferHours > 0 && (
                    <p className="text-xs text-amber-700 mt-2">
                      Adjust your transfer hours in the calculator on the left.
                    </p>
                  )}
                </div>

                {/* Host Shop Question */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you have a barbershop for your training hours?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="hasHostShop"
                        value="yes"
                        checked={formData.hasHostShop === 'yes'}
                        onChange={(e) => updateField('hasHostShop', e.target.value)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="text-gray-700">Yes, I have a shop</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="hasHostShop"
                        value="no"
                        checked={formData.hasHostShop === 'no'}
                        onChange={(e) => updateField('hasHostShop', e.target.value)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <span className="text-gray-700">No, I need help finding one</span>
                    </label>
                  </div>
                </div>

                {formData.hasHostShop === 'yes' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Shop Name (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.hostShopName}
                      onChange={(e) => updateField('hostShopName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Name of the barbershop"
                    />
                  </div>
                )}

                {/* Pay Button */}
                <button
                  onClick={handlePayNow}
                  disabled={loading || !formData.email || !formData.firstName || !formData.lastName || !formData.phone}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Pay ${PRICING.tuition.toLocaleString()} Now
                    </>
                  )}
                </button>

                {/* Buy Now Pay Later Options */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-center text-sm text-gray-600 mb-3">Or pay over time with</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <span className="font-bold text-blue-600">affirm</span>
                      <span className="text-xs text-gray-500 mt-1">0% APR available</span>
                    </div>
                    <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <span className="font-bold text-pink-500">Klarna</span>
                      <span className="text-xs text-gray-500 mt-1">Pay in 4</span>
                    </div>
                    <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg bg-gray-50">
                      <span className="font-bold text-teal-600">Afterpay</span>
                      <span className="text-xs text-gray-500 mt-1">Pay in 4</span>
                    </div>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-3">
                    Buy now, pay later options available at checkout
                  </p>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Secure payment via Stripe. You'll receive dashboard access immediately after payment.
                </p>
              </div>
            </div>

            {/* WRG Notice */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-green-800 text-sm">
                <strong>Looking for funded training?</strong> You may qualify for WRG funding.{' '}
                <Link href="/programs/barber-apprenticeship/eligibility" className="text-green-700 font-medium hover:underline">
                  Check your eligibility →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
