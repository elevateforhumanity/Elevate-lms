'use client';

import React from 'react';

import { useState } from 'react';
import { AffirmPaymentButton } from '@/components/payments/AffirmPaymentButton';

const PROGRAMS = [
  {
    id: 'barber',
    label: 'Barber Apprenticeship',
    slug: 'barber-apprentice',
    price: 4980,
  },
  {
    id: 'dsp',
    label: 'Direct Support Professional (DSP)',
    slug: 'direct-support-professional',
    price: 4325,
  },
  {
    id: 'hvac',
    label: 'HVAC Technician',
    slug: 'hvac-technician',
    price: 5000,
  },
  {
    id: 'cpr',
    label: 'CPR Certification',
    slug: 'cpr-certification',
    price: 575,
  },
  {
    id: 'ehst',
    label: 'Emergency Health & Safety Tech',
    slug: 'emergency-health-safety',
    price: 4950,
  },
  {
    id: 'esth',
    label: 'Professional Esthetician',
    slug: 'professional-esthetician',
    price: 4575,
  },
  {
    id: 'prc',
    label: 'Peer Recovery Coach',
    slug: 'peer-recovery-coach',
    price: 4750,
  },
  {
    id: 'tax',
    label: 'Tax Prep & Financial Services',
    slug: 'tax-prep-financial',
    price: 4950,
  },
  {
    id: 'biz',
    label: 'Business Startup & Marketing',
    slug: 'business-startup-marketing',
    price: 4550,
  },
];

export function PayNowSection() {
  const [selectedProgramId, setSelectedProgramId] = useState(PROGRAMS[0].id);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedProgram =
    PROGRAMS.find((p) => p.id === selectedProgramId) ?? PROGRAMS[0];

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(selectedProgram.price);

  const handlePayNow = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programName: selectedProgram.label,
          programSlug: selectedProgram.slug,
          price: selectedProgram.price,
          paymentType: 'full',
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error: ' + (data.error || 'Unable to start checkout'));
        setIsProcessing(false);
      }
    } catch (error) { /* Error handled silently */ 
      alert('Error connecting to payment system. Call 317-314-3757');
      setIsProcessing(false);
    }
  };

  return (
    <section className="rounded-2xl border-2 border-blue-500 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">
        Pay Now &amp; Start
      </h2>
      <p className="text-lg text-black mb-6">
        Choose your program and complete your payment to start right away.
      </p>

      {/* Program select */}
      <div className="mb-6">
        <label
          htmlFor="program"
          className="block text-sm font-bold text-black mb-2"
        >
          Select Program:
        </label>
        <select
          id="program"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedProgramId}
          onChange={(e) => setSelectedProgramId(e.target.value)}
        >
          {PROGRAMS.map((program: any) => (
            <option key={program.id} value={program.id}>
              {program.label} -{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(program.price)}
            </option>
          ))}
        </select>
      </div>

      {/* Payment options copy */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-sm font-semibold text-blue-900 mb-2">
          💳 Payment Options:
        </p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Pay over time with Affirm, Klarna, Afterpay</li>
          <li>• PayPal, Venmo, Cash App Pay</li>
          <li>• Credit/debit cards or ACH transfer</li>
        </ul>
      </div>

      {/* Price + button */}
      <div className="mb-6">
        <div className="text-2xl font-bold text-black mb-2">
          {formattedPrice}
        </div>
        <p className="text-sm text-black">
          Includes all materials, certifications, and support
        </p>
      </div>

      {/* Payment Buttons */}
      <div className="space-y-4">
        {/* Affirm Payment Button */}
        <AffirmPaymentButton
          amount={selectedProgram.price}
          programName={selectedProgram.label}
          programSlug={selectedProgram.slug}
          onError={(error) => alert(error)}
        />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">or</span>
          </div>
        </div>

        {/* Stripe Payment Button */}
        <button
          onClick={handlePayNow}
          disabled={isProcessing}
          className="block w-full text-center px-6 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Loading...' : 'Pay with Card/Klarna/Afterpay'}
        </button>
      </div>

      {/* Payment info */}
      <p className="mt-4 text-xs text-center text-slate-500">
        Secure payment processing. Your information is protected.
      </p>
    </section>
  );
}
// Build timestamp: 1765418737
