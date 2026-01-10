'use client';

import React from 'react';
// app/pay/PaymentOptionsClient.tsx

import { useEffect, useState } from 'react';


// Adjust this one number to change the displayed tuition
const TUITION_AMOUNT = 4890; // dollars
const AMOUNT_CENTS = TUITION_AMOUNT * 100; // Affirm requires cents

export default function PaymentOptionsClient() {
  const [affirmLoaded, setAffirmLoaded] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Affirm SDK once and refresh widgets
  useEffect(() => {
    // Set config before loading script
    const publicKey = 'aGax1GLWFexjLyW7PCf23rfznLl6YGyI';

    (window as unknown)._affirm_config = {
      public_api_key: publicKey,
      script: 'https://cdn1.affirm.com/js/v2/affirm.js',
      locale: 'en_US',
      country_code: 'USA',
    };

    try {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src^="https://cdn1.affirm.com/js/v2/affirm.js"]'
      );

      if (existing) {
        // Wait a bit for DOM to be ready, then refresh
        setTimeout(() => {
          if (window.affirm?.ui?.refresh) {
            window.affirm.ui.refresh();
          }
        }, 100);
        setAffirmLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn1.affirm.com/js/v2/affirm.js';
      script.async = true;
      script.onload = () => {
        try {
          // Wait for Affirm to fully initialize
          setTimeout(() => {
            if (window.affirm?.ui?.refresh) {
              window.affirm.ui.refresh();
            }
          }, 100);
          setAffirmLoaded(true);
        } catch (e) {
          setError('Affirm failed to initialize');
        }
      };
      script.onerror = (e) => {
        setError('Affirm script failed to load');
      };
      document.body.appendChild(script);
    } catch (e) {
      setError('Problem loading Affirm');
    }
  }, []);

  // Refresh Affirm widget when loaded
  useEffect(() => {
    if (affirmLoaded && window.affirm?.ui?.refresh) {
      // Give DOM time to render the widget div
      setTimeout(() => {
        window.affirm.ui.refresh();
      }, 200);
    }
  }, [affirmLoaded]);

  // Load Stripe Buy Button
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
      script.onload = () => {
        setStripeLoaded(true);
      };
      script.onerror = (e) => {
        setError('Stripe script failed to load.');
      };
      document.body.appendChild(script);
    } catch (e) {
      setError('Problem initializing Stripe.');
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Tuition summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          Tuition Summary
        </h2>
        <p className="text-slate-700">
          Typical tuition:{' '}
          <span className="font-semibold">
            ${TUITION_AMOUNT.toLocaleString()}
          </span>
          . If public funding isn't available in your county, choose one of the
          secure payment options below.
        </p>
        <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
          <strong>Tip:</strong> Talk with your WorkOne / workforce case manager
          first. Many students qualify for <strong>100% free training</strong>.
        </p>
      </div>

      {/* Stripe - Option 1 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Option 1: Pay in Full with Card
        </h3>
        <p className="text-sm text-slate-700 mb-4">
          Pay securely with debit or credit. Processed by Stripe.
        </p>
        {!stripeLoaded && (
          <p className="mb-3 text-sm text-slate-500">
            Loading secure payment button…
          </p>
        )}
        on type 'JSX.IntrinsicElements'.
        <stripe-buy-button
          buy-button-id="buy_btn_1SczpeIRNf5vPH3A0Ae1nnjh"
          publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        />
        <p className="mt-3 text-[11px] text-slate-500">
          By completing your payment you agree to Elevate for Humanity's refund
          policy and enrollment terms.
        </p>
      </div>

      {/* Affirm - Option 2 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Option 2: Monthly Payments with Affirm
        </h3>
        <p className="text-sm text-slate-700 mb-4">
          Pay over time with flexible monthly payments. See your options for
          tuition around{' '}
          <span className="font-semibold">
            ${TUITION_AMOUNT.toLocaleString()}
          </span>
          .
        </p>

        {affirmLoaded && (
          <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900 font-semibold mb-2">
              💳 Flexible Monthly Payments Available
            </p>
            <p className="text-xs text-blue-700">
              Starting as low as <span className="font-bold">$200/month</span>{' '}
              with approved credit. Click below to see your personalized payment
              options.
            </p>
          </div>
        )}

        {!affirmLoaded && !error && (
          <p className="mt-2 text-sm text-slate-500">Loading Affirm options…</p>
        )}

        {error && <p className="mt-2 text-sm text-brand-orange-600">{error}</p>}

        <button
          onClick={() => {
            if (window.affirm) {
              window.affirm.checkout({
                merchant: {
                  user_confirmation_url: `${window.location.origin}/payment/affirm/confirm`,
                  user_cancel_url: `${window.location.origin}/payment/affirm/cancel`,
                  user_confirmation_url_action: 'POST',
                  name: 'Elevate for Humanity',
                },
                items: [
                  {
                    display_name: 'Barber Apprenticeship Tuition',
                    sku: 'barber-tuition',
                    unit_price: AMOUNT_CENTS,
                    qty: 1,
                  },
                ],
                metadata: {
                  platform: 'elevate-for-humanity',
                },
                order_id: `EFH-${Date.now()}`,
                shipping_amount: 0,
                tax_amount: 0,
                total: AMOUNT_CENTS,
              });
              window.affirm.checkout.open();
            } else {
              alert(
                'Affirm is still loading. Please wait a moment and try again.'
              );
            }
          }}
          className="w-full mt-4 inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-brand-blue-600 rounded-lg hover:bg-brand-blue-700 transition shadow-lg"
        >
          Continue with Affirm
        </button>

        <p className="mt-3 text-[11px] text-slate-500">
          Subject to credit check and approval. Down payment may be required.
          Checking eligibility won't affect your credit score.
        </p>
      </div>

      {/* Stripe */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">
          Pay in Full with Card (Stripe)
        </h3>
        <p className="text-sm text-slate-700 mb-4">
          Pay securely with debit or credit. Processed by Stripe.
        </p>
        {!stripeLoaded && (
          <p className="mb-3 text-sm text-slate-500">
            Loading secure payment button…
          </p>
        )}
        on type 'JSX.IntrinsicElements'.
        <stripe-buy-button
          buy-button-id="buy_btn_1SczpeIRNf5vPH3A0Ae1nnjh"
          publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        />
        <p className="mt-3 text-[11px] text-slate-500">
          By completing your payment you agree to Elevate for Humanity's refund
          policy and enrollment terms.
        </p>
      </div>
    </div>
  );
}
