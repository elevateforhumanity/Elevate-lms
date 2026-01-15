"use client";

import React from 'react';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface AffirmCheckoutProps {
  amount: number;
  courseId: string;
  courseName: string;
  userEmail?: string;
  userName?: string;
  userPhone?: string;
  onSuccess?: (transactionId: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

declare global {
  interface Window {
    affirm: {
      checkout: (data: any) => void;
      checkout_open: () => void;
      ui: {
        ready: (callback: () => void) => void;
        refresh: () => void;
      };
    };
    _affirm_config: {
      public_api_key: string;
      script: string;
      locale: string;
      country_code: string;
    };
  }
}

export default function AffirmCheckout({
  amount,
  courseId,
  courseName,
  userEmail,
  userName,
  userPhone,
  onSuccess,
  onError,
  className = '',
}: AffirmCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Initialize Affirm config BEFORE loading script
    window._affirm_config = {
      public_api_key: 'aGax1GLWFexjLyW7PCf23rfznLl6YGyI',
      script: 'https://cdn1.affirm.com/js/v2/affirm.js',
      locale: 'en_US',
      country_code: 'USA',
    };

    // Load Affirm script dynamically to avoid hydration issues
    const script = document.createElement('script');
    script.src = 'https://cdn1.affirm.com/js/v2/affirm.js';
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
      if (window.affirm) {
        window.affirm.ui.refresh();
      } else {
        // Error logged
      }
    };
    script.onerror = (e) => {
      // Error: $1
      setIsScriptLoaded(false);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleAffirmCheckout = async () => {
    if (!isScriptLoaded) {
      toast.error('Affirm is still loading. Please try again.');
      return;
    }

    setIsLoading(true);

    try {
      // Create checkout session on backend
      const response = await fetch('/api/affirm/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          courseId,
          courseName,
          userEmail,
          userName,
          userPhone,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create checkout');
      }

      const { checkout_token } = await response.json();

      // Convert amount to cents (Affirm requires cents)
      const amountInCents = Math.round(amount * 100);

      // Configure Affirm checkout
      const checkoutConfig = {
        merchant: {
          user_confirmation_url: `${window.location.origin}/payment/affirm/confirm`,
          user_cancel_url: `${window.location.origin}/payment/affirm/cancel`,
          user_confirmation_url_action: 'POST',
          name: 'Elevate for Humanity',
        },
        items: [
          {
            display_name: courseName,
            sku: courseId,
            unit_price: amountInCents, // Amount in cents
            qty: 1,
            item_image_url: `${window.location.origin}/images/courses/${courseId}-cover.jpg`,
            item_url: `${window.location.origin}/programs/${courseId}`,
          },
        ],
        billing: {
          name: {
            first: userName?.split(' ')[0] || 'Student',
            last: userName?.split(' ').slice(1).join(' ') || 'User',
          },
          email: userEmail || '',
          phone_number: userPhone || '',
        },
        shipping: {
          name: {
            first: userName?.split(' ')[0] || 'Student',
            last: userName?.split(' ').slice(1).join(' ') || 'User',
          },
          email: userEmail || '',
          phone_number: userPhone || '',
        },
        metadata: {
          course_id: courseId,
          platform: 'elevate-for-humanity',
        },
        order_id: `EFH-${Date.now()}-${courseId}`,
        shipping_amount: 0,
        tax_amount: 0,
        total: amountInCents, // Total amount in cents
      };

      window.affirm.checkout(checkoutConfig);

      // Open Affirm checkout modal
      window.affirm.checkout_open();

      // Handle checkout completion
      window.affirm.ui.ready(() => {
        // Checkout completed - token will be sent to confirmation URL
        setIsLoading(false);
      });

    } catch (error) { /* Error handled silently */ 
      // Error: $1
      const errorMessage = error instanceof Error ? error.message : 'Failed to start checkout';
      toast.error(errorMessage);
      if (onError) onError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAffirmCheckout}
        disabled={isLoading || !isScriptLoaded}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors ${className}`}
      >
        {isLoading ? (
          <>
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
          </>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Pay with Affirm
            <span className="text-sm font-normal">
              (${amount.toFixed(2)})
            </span>
          </>
        )}
      </button>

      {!isScriptLoaded && (
        <div className="mt-2 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500">
            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12"
r="10" stroke="currentColor" strokeWidth="4"
fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading Affirm payment system...
          </div>
        </div>
      )}
    </>
  );
}
