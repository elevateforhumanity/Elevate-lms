"use client";

import React from 'react';
import { sanitizeHtml } from '@/lib/sanitize';

import { useState, useEffect } from 'react';
import Script from 'next/script';

interface AffirmPaymentButtonProps {
  amount: number;
  programName: string;
  programSlug: string;
  userEmail?: string;
  userName?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function AffirmPaymentButton({
  amount,
  programName,
  programSlug,
  userEmail = 'guest@elevateforhumanity.institute',
  userName = 'Guest User',
  onSuccess,
  onError,
}: AffirmPaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [affirmLoaded, setAffirmLoaded] = useState(false);

  useEffect(() => {
    // Check if Affirm is already loaded
    if (window.affirm) {
      setAffirmLoaded(true);
      window.affirm.ui.ready(() => {
        window.affirm.ui.refresh();
      });
    }
  }, []);

  const handleAffirmPayment = async () => {
    setLoading(true);

    try {
      // Create checkout via API
      const response = await fetch('/api/affirm/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          courseId: programSlug,
          courseName: programName,
          userEmail,
          userName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Affirm checkout');
      }

      const data = await response.json();

      if (data.checkout_token) {
        // Use Affirm.js to open checkout
        if (window.affirm && window.affirm.checkout) {
          window.affirm.checkout({
            checkout_token: data.checkout_token,
          });

          if (onSuccess) {
            onSuccess();
          }
        } else {
          // Fallback: redirect to Affirm
          window.location.href = data.redirect_url;
        }
      } else {
        throw new Error('No checkout token received');
      }
    } catch (error: unknown) {
      // Error: $1
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Payment error. Please try again.';

      if (onError) {
        onError(errorMessage);
      } else {
        alert(errorMessage);
      }

      setLoading(false);
    }
  };

  const monthlyPayment = Math.round(amount / 12);

  return (
    <>
      {/* Load Affirm.js */}
      <Script
        id="affirm-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            _affirm_config = {
              public_api_key: "${process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY || 'aGax1GLWFexjLyW7PCf23rfznLl6YGyI'}",
              script: "https://cdn1.affirm.com/js/v2/affirm.js"
            };
          `,
        }}
      />
      <Script
        src="https://cdn1.affirm.com/js/v2/affirm.js"
        strategy="afterInteractive"
        onLoad={() => {
          setAffirmLoaded(true);
          if (window.affirm && window.affirm.ui) {
            window.affirm.ui.ready(() => {
              window.affirm.ui.refresh();
            });
          }
        }}
      />

      {/* Affirm Payment Button */}
      <button
        onClick={handleAffirmPayment}
        disabled={loading || !affirmLoaded}
        className="w-full bg-white text-white py-4 px-6 rounded-lg font-bold text-lg hover: hover: disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          <span className="flex flex-col items-center">
            <span className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Pay with Affirm
            </span>
            <span className="text-sm font-normal mt-1">
              As low as ${monthlyPayment}/month
            </span>
          </span>
        )}
      </button>

      {/* Affirm Promotional Message */}
      {affirmLoaded && (
        <div className="mt-3 text-center">
          <p
            className="affirm-as-low-as text-sm text-slate-600"
            data-amount={amount * 100}
            data-affirm-type="logo"
            data-affirm-color="blue"
          >
            Or pay as low as{' '}
            <span className="affirm-ala-price font-semibold" />/mo with{' '}
            <b>Affirm</b>
          </p>
        </div>
      )}
    </>
  );
}
