"use client";

import React from 'react';

import { useState } from 'react';

interface PayNowButtonProps {
  programName: string;
  programSlug: string;
  price: number;
  className?: string;
  children: React.ReactNode;
}

export function PayNowButton({ programName, programSlug, price, className, children }: PayNowButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (isProcessing) return;

    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programName,
          programSlug,
          price,
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
    } catch (error: any) {
      alert('Error connecting to payment system. Call 317-314-3757');
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isProcessing}
      className={className}
    >
      {isProcessing ? 'Loading...' : children}
    </button>
  );
}
