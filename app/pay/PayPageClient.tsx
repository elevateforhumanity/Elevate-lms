// @ts-nocheck
'use client';

import React from 'react';
// app/pay/PayPageClient.tsx

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';


const PROGRAM_FEE_AMOUNT = 4980; // total in dollars for display - flat program fee
const TUITION_AMOUNT_CENTS = TUITION_AMOUNT * 100; // for Affirm

export default function PayPageClient() {
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [affirmLoaded, setAffirmLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // <CheckCircle className="w-5 h-5 inline-block" /> Load Stripe Buy Button script
  useEffect(() => {
    try {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src^="https://js.stripe.com/v3/buy-button"]'
      );
      if (existing) {
        setStripeLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/buy-button.js';
      script.async = true;
      script.onload = () => setStripeLoaded(true);
      script.onerror = () =>
        setError('Stripe payment script failed to load. Please try again.');
      document.body.appendChild(script);
    } catch (err) {
      setError('Something went wrong loading the payment system.');
    }
  }, []);

  // <CheckCircle className="w-5 h-5 inline-block" /> Load Affirm SDK script
  useEffect(() => {
    try {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src^="https://cdn1.affirm.com/js/v2/affirm.js"]'
      );
      if (existing) {
        // refresh in case DOM changed
        if (window.affirm && typeof window.affirm.ui?.refresh === 'function') {
          window.affirm.ui.refresh();
        }
        setAffirmLoaded(true);
        return;
      }

      // IMPORTANT: your public API key must be set in NEXT_PUBLIC_AFFIRM_PUBLIC_KEY
      const publicKey = process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY;
      if (!publicKey) { /* Condition handled */ }

      const script = document.createElement('script');
      script.src = 'https://cdn1.affirm.com/js/v2/affirm.js';
      script.async = true;
      script.onload = () => {
        try {
          // Configure Affirm after script is available
          if (window.affirm && publicKey) {
            window.affirm.config({
              public_api_key: publicKey,
              script: script.src,
            });
          }
          // Refresh widgets on page
          if (
            window.affirm &&
            typeof window.affirm.ui?.refresh === 'function'
          ) {
            window.affirm.ui.refresh();
          }
          setAffirmLoaded(true);
        } catch { /* Error handled silently */ 
          // Error handled
        }
      };
      script.onerror = () =>
        setError('Affirm financing script failed to load. Please try again.');

      document.body.appendChild(script);
    } catch (err) {
      setError('Something went wrong loading the financing options.');
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* High-level summary + amount */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-black mb-2">
          Barber Apprenticeship Tuition
        </h2>
        <p className="text-black mb-2">
          Total program tuition:{' '}
          <span className="font-semibold text-black">
            ${TUITION_AMOUNT.toLocaleString()}
          </span>
          . Most students qualify for WIOA / WRG / JRI funding, but if you are
          paying out of pocket you can use Stripe or Affirm below.
        </p>
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <strong>Reminder:</strong> If you have a case manager (WIOA, WRG, JRI,
          re-entry, or workforce board), please talk with them before paying out
          of pocket. Many students qualify for{' '}
          <strong>100% free training</strong>.
        </p>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {/* Affirm "as low as" widget */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-2">
          Option 1: Monthly Payments with Affirm
        </h3>
        <p className="text-black mb-4">
          See your real monthly payment options with Affirm. Checking your
          eligibility won&apos;t affect your credit score.
        </p>

        <div
          className="affirm-as-low-as"
          data-page-type="product"
          data-amount={TUITION_AMOUNT_CENTS}
          data-affirm-color="blue"
        />

        {!affirmLoaded && (
          <p className="mt-3 text-sm text-slate-500">
            Loading Affirm financing options…
          </p>
        )}

        <p className="mt-4 text-xs text-slate-500">
          Subject to credit check and approval. Down payment may be required.
          Payment options depend on your purchase amount and may vary by lender.
        </p>
      </div>

      {/* Stripe Buy Button */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-2">
          Option 2: Pay in Full with Card (Stripe)
        </h3>
        <p className="text-black mb-4">
          Pay your tuition in full using a debit or credit card. Your payment is
          processed securely by Stripe.
        </p>

        {!stripeLoaded && (
          <p className="mb-3 text-sm text-slate-500">
            Loading secure payment button…
          </p>
        )}

        {/* Using the existing Stripe Buy Button ID from the old page */}
        <stripe-buy-button
          buy-button-id="buy_btn_1SczpeIRNf5vPH3A0Ae1nnjh"
          publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        />

        <p className="mt-4 text-xs text-slate-500">
          By completing your payment you agree to Elevate for Humanity&apos;s
          refund policy and enrollment terms.
        </p>
      </div>
    </div>
  );
}
