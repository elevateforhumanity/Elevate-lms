"use client";

import React from 'react';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface AffirmButtonProps {
  programId: string;
  programName: string;
  price: number;
  fullWidth?: boolean;
}

export default function AffirmButton({ programId, programName, price, fullWidth = false }: AffirmButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAffirmCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      // Initialize Affirm if not already loaded
      if (typeof window !== 'undefined' && !(window as any).affirm) {
        // Configure Affirm BEFORE loading script
        (window as any)._affirm_config = {
          public_api_key: 'aGax1GLWFexjLyW7PCf23rfznLl6YGyI', // Sandbox key
          script: 'https://cdn1-sandbox.affirm.com/js/v2/affirm.js'
        };

        // Load Affirm script
        const script = document.createElement('script');
        script.src = 'https://cdn1-sandbox.affirm.com/js/v2/affirm.js';
        script.async = true;
        document.head.appendChild(script);

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });

        // Wait for affirm object to be available
        await new Promise((resolve) => {
          const checkAffirm = setInterval(() => {
            if ((window as any).affirm && (window as any).affirm.checkout) {
              clearInterval(checkAffirm);
              resolve(true);
            }
          }, 100);
        });
      }

      // Create checkout data
      const checkoutData = {
        merchant: {
          user_confirmation_url: `${window.location.origin}/payment/affirm/confirm`,
          user_cancel_url: `${window.location.origin}/payment/affirm/cancel`,
          user_confirmation_url_action: 'POST',
          name: 'Elevate for Humanity',
        },
        items: [
          {
            display_name: programName,
            sku: programId,
            unit_price: Math.round(price * 100), // Convert to cents
            qty: 1,
            item_image_url: `${window.location.origin}/images/programs/default.jpg`,
            item_url: `${window.location.origin}/programs/${programId}`,
          },
        ],
        metadata: {
          program_id: programId,
          platform: 'elevate_for_humanity',
        },
        order_id: `EFH-${Date.now()}`,
        shipping_amount: 0,
        tax_amount: 0,
        total: Math.round(price * 100), // Convert to cents
      };

      // Open Affirm checkout
      const affirm = (window as any).affirm;
      if (affirm && affirm.checkout && affirm.checkout.open) {
        affirm.checkout(checkoutData);
        affirm.checkout.open();
      } else {
        // Error: $1
        throw new Error('Affirm checkout not available. Please refresh and try again.');
      }

    } catch (data: any) {
      // Error: $1
      setError(err.message || 'Failed to initialize Affirm. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAffirmCheckout}
        disabled={loading}
        className={`${fullWidth ? 'w-full' : ''} px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading Affirm...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            Pay with Affirm
          </>
        )}
      </button>
      {error && (
        <p className="text-sm text-brand-orange-600 mt-2">{error}</p>
      )}
    </div>
  );
}
