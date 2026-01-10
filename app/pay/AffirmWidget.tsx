'use client';

import React from 'react';
// app/pay/AffirmWidget.tsx

import { useEffect, useState } from 'react';


const TUITION_AMOUNT = 4890; // in dollars
const TUITION_AMOUNT_CENTS = TUITION_AMOUNT * 100; // Affirm needs cents

export default function AffirmWidget() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://cdn1.affirm.com/js/v2/affirm.js"]'
    );

    const publicKey = process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY;

    // If script already exists, just refresh widgets
    if (existing) {
      if (window.affirm?.ui?.refresh) {
        window.affirm.ui.refresh();
      }
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn1.affirm.com/js/v2/affirm.js';
    script.async = true;
    script.onload = () => {
      try {
        if (window.affirm && publicKey) {
          window.affirm.config({
            public_api_key: publicKey,
            script: script.src,
          });
        }
        if (window.affirm?.ui?.refresh) {
          window.affirm.ui.refresh();
        }
        setLoaded(true);
      } catch (error: unknown) {
        // Error handled
      }
    };
    script.onerror = () => {};

    document.body.appendChild(script);
  }, []);

  return (
    <div className="space-y-2">
      <div
        className="affirm-as-low-as"
        data-page-type="product"
        data-amount={TUITION_AMOUNT_CENTS}
        data-affirm-color="blue"
      />

      {!loaded && (
        <p className="text-xs text-slate-500">
          Loading Affirm financing options…
        </p>
      )}

      <p className="text-[11px] text-slate-500">
        Subject to credit check and approval. Down payment may be required.
        Payment options depend on your purchase amount and may vary by lender.
      </p>
    </div>
  );
}
