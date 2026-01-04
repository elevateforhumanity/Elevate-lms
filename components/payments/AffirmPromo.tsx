"use client";

import React from 'react';

import { useState } from 'react';

interface AffirmPromoProps {
  amount: number;
  className?: string;
}

export default function AffirmPromo({
  amount,
  className = '',
}: AffirmPromoProps) {
  const [selectedPlan, setSelectedPlan] = useState<'4' | '6' | '12' | '24'>(
    '12'
  );

  const plans = {
    '4': {
      label: 'Pay in 4',
      payment: (amount / 4).toFixed(2),
      frequency: 'every 2 weeks',
      duration: '8 weeks',
      apr: '0%',
      interest: '$0',
      total: amount.toFixed(2),
    },
    '6': {
      label: '6 months',
      payment: (amount / 6).toFixed(2),
      frequency: 'per month',
      duration: '6 months',
      apr: '0%',
      interest: '$0',
      total: amount.toFixed(2),
    },
    '12': {
      label: '12 months',
      payment: (amount / 12).toFixed(2),
      frequency: 'per month',
      duration: '12 months',
      apr: '0%',
      interest: '$0',
      total: amount.toFixed(2),
    },
    '24': {
      label: '24 months',
      payment: (amount / 24).toFixed(2),
      frequency: 'per month',
      duration: '24 months',
      apr: '0%',
      interest: '$0',
      total: amount.toFixed(2),
    },
  };

  const currentPlan = plans[selectedPlan];

  return (
    <div
      className={`bg-white border-2 border-blue-200 rounded-xl p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path
              fillRule="evenodd"
              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="text-lg font-bold text-gray-900">
            Make easy monthly payments
          </h3>
        </div>
        <div className="flex items-center gap-1 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          PREMIUM
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4">
        Checking your eligibility won't affect your credit
      </p>

      {/* Plan Selector */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {(Object.keys(plans) as Array<keyof typeof plans>).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedPlan(key)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              selectedPlan === key
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {plans[key].label}
          </button>
        ))}
      </div>

      {/* Payment Display */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-gray-900 mb-1 text-2xl md:text-3xl lg:text-4xl">
            ${currentPlan.payment}
            <span className="text-lg text-gray-600 font-normal">
              /{currentPlan.frequency.split(' ')[1] || 'payment'}
            </span>
          </div>
          <div className="text-sm text-gray-600">{currentPlan.duration}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-200 pt-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">APR</div>
            <div className="text-lg font-bold text-green-600">
              {currentPlan.apr}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Interest</div>
            <div className="text-lg font-bold text-green-600">
              {currentPlan.interest}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Total</div>
            <div className="text-lg font-bold text-gray-900">
              ${currentPlan.total}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-sm text-gray-700 mb-3">
          Just select <strong className="text-blue-600">Affirm</strong> at
          checkout.
        </p>
        <p className="text-xs text-gray-600">
          Get a real-time decision with just 5 pieces of info.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          Rates from 0%-36% APR. Payment options through Affirm are subject to
          an eligibility check and are provided by these lending partners:{' '}
          <a
            href="https://www.affirm.com/lenders"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            affirm.com/lenders
          </a>
          . Options depend on your purchase amount, and a down payment may be
          required.
        </p>
      </div>
    </div>
  );
}
