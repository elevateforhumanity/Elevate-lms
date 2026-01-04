"use client";

import React from 'react';

import { useState } from 'react';
import { CreditCard, DollarSign, CheckCircle } from 'lucide-react';

interface ProgramPaymentOptionsProps {
  programName: string;
  programSlug: string;
  price: number;
  duration: string;
}

export default function ProgramPaymentOptions({
  programName,
  programSlug,
  price,
  duration,
}: ProgramPaymentOptionsProps) {
  const [paymentMethod, setPaymentMethod] = useState<
    'full' | 'stripe' | 'affirm'
  >('full');

  // Calculate payment plan options
  const stripeMonthly = Math.ceil(price / 12);
  const affirmMonthly = Math.ceil(price / 6);

  const handlePayment = async (method: string) => {
    try {
      const response = await fetch('/api/programs/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programSlug,
          programName,
          price,
          paymentMethod: method,
        }),
      });

      const { sessionId, affirmUrl } = await response.json();

      if (method === 'affirm' && affirmUrl) {
        window.location.href = affirmUrl;
      } else if (sessionId) {
        const stripe = await import('@stripe/stripe-js').then((m) =>
          m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')
        );
        const stripeInstance = await stripe;
        if (stripeInstance) {
          await stripeInstance.redirectToCheckout({ sessionId });
        }
      }
    } catch (error: unknown) {
      alert('Payment failed. Please call 317-314-3757 for assistance.');
    }
  };

  return (
    <div className="bg-white border-2 border-orange-600 rounded-xl p-8 shadow-xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">
          Don't Qualify for Free Funding?
        </h3>
        <p className="text-gray-600">
          Self-pay options available with flexible payment plans
        </p>
      </div>

      {/* Funding Priority Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-900 font-semibold mb-2">
          ✅ Check Free Funding First!
        </p>
        <p className="text-sm text-gray-700">
          Most students qualify for 100% FREE training through WIOA, WRG, or
          JRI.
          <a href="/apply" className="text-blue-600 underline font-bold ml-1">
            Apply here to check eligibility
          </a>
        </p>
      </div>

      {/* Price Display */}
      <div className="text-center mb-8">
        <div className="text-5xl font-bold text-orange-600 mb-2">
          ${price.toLocaleString()}
        </div>
        <p className="text-gray-600">One-time payment for {duration}</p>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4 mb-8">
        {/* Full Payment */}
        <button
          onClick={() => setPaymentMethod('full')}
          className={`w-full text-left p-6 rounded-lg border-2 transition ${
            paymentMethod === 'full'
              ? 'border-green-600 bg-green-50'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg mb-1">Pay in Full</h4>
                <p className="text-sm text-gray-600 mb-2">
                  One-time payment - Start immediately
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${price.toLocaleString()}
                </p>
              </div>
            </div>
            {paymentMethod === 'full' && (
              <CheckCircle className="w-6 h-6 text-green-600" />
            )}
          </div>
        </button>

        {/* Stripe Payment Plan */}
        <button
          onClick={() => setPaymentMethod('stripe')}
          className={`w-full text-left p-6 rounded-lg border-2 transition ${
            paymentMethod === 'stripe'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <CreditCard className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg mb-1">Stripe Payment Plan</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Break up payments over 12 months
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  ${stripeMonthly}/month
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  12 monthly payments • Low interest rates
                </p>
              </div>
            </div>
            {paymentMethod === 'stripe' && (
              <CheckCircle className="w-6 h-6 text-blue-600" />
            )}
          </div>
        </button>

        {/* Affirm Financing */}
        <button
          onClick={() => setPaymentMethod('affirm')}
          className={`w-full text-left p-6 rounded-lg border-2 transition ${
            paymentMethod === 'affirm'
              ? 'border-purple-600 bg-purple-50'
              : 'border-gray-300 hover:border-purple-400'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <CreditCard className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg mb-1">Affirm Financing</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Get approved instantly - Pay over 6 months
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  ${affirmMonthly}/month
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  6 monthly payments • Fixed rates • Instant approval
                </p>
              </div>
            </div>
            {paymentMethod === 'affirm' && (
              <CheckCircle className="w-6 h-6 text-purple-600" />
            )}
          </div>
        </button>
      </div>

      {/* Payment Button */}
      <button
        onClick={() => handlePayment(paymentMethod)}
        className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition"
      >
        {paymentMethod === 'full' && `Pay $${price.toLocaleString()} Now`}
        {paymentMethod === 'stripe' &&
          `Set Up Payment Plan - $${stripeMonthly}/mo`}
        {paymentMethod === 'affirm' &&
          `Apply with Affirm - $${affirmMonthly}/mo`}
      </button>

      {/* Additional Info */}
      <div className="mt-6 space-y-3 text-sm text-gray-600">
        <p className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
          <span>Secure payment processing via Stripe</span>
        </p>
        <p className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
          <span>Start training immediately after payment</span>
        </p>
        <p className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
          <span>All materials and certifications included</span>
        </p>
        <p className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
          <span>Job placement assistance included</span>
        </p>
      </div>

      {/* Contact */}
      <div className="mt-6 pt-6 border-t text-center">
        <p className="text-sm text-gray-600 mb-2">
          Questions about payment options?
        </p>
        <a
          href="tel:3173143757"
          className="text-orange-600 font-bold underline"
        >
          Call 317-314-3757
        </a>
      </div>
    </div>
  );
}
