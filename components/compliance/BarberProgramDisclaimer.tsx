"use client";

import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Barber Program Disclaimer Component
 * 
 * REQUIRED on all pages referencing the barber apprenticeship program.
 * This disclaimer must be visible to comply with DOL and state regulations.
 */

interface BarberProgramDisclaimerProps {
  variant?: 'banner' | 'inline' | 'footer';
  className?: string;
}

export function BarberProgramDisclaimer({ 
  variant = 'banner',
  className = '' 
}: BarberProgramDisclaimerProps) {
  const disclaimerText = "This program is not a barber school and does not issue state licensure hours. Enrollment requires concurrent or subsequent participation in a licensed barber school for state licensure eligibility.";

  if (variant === 'banner') {
    return (
      <div className={`bg-amber-50 border-y-4 border-amber-400 py-6 ${className}`}>
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-amber-900 mb-2">Important Notice</h2>
              <p className="text-amber-900 font-medium">{disclaimerText}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`bg-amber-50 border border-amber-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900">{disclaimerText}</p>
        </div>
      </div>
    );
  }

  // Footer variant
  return (
    <div className={`bg-slate-100 py-8 ${className}`}>
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-sm text-slate-600 text-center">
          <strong>Disclaimer:</strong> {disclaimerText} The program fee of $4,980 is a flat rate regardless of transferred hours.
        </p>
      </div>
    </div>
  );
}

export default BarberProgramDisclaimer;
