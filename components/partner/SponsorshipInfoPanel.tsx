"use client";

import { Info } from 'lucide-react';

export function SponsorshipInfoPanel() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Program Sponsorship
          </h3>
          <div className="space-y-3 text-sm text-blue-800">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-blue-900">Sponsor</div>
                <div>Elevate for Humanity</div>
              </div>
              <div>
                <div className="font-medium text-blue-900">Curriculum</div>
                <div>Partner-provided + required online components</div>
              </div>
              <div>
                <div className="font-medium text-blue-900">Enrollment</div>
                <div>Managed by EFH</div>
              </div>
              <div>
                <div className="font-medium text-blue-900">Funding</div>
                <div>Coordinated through WorkOne</div>
              </div>
            </div>
            <div className="pt-3 border-t border-blue-200">
              <p className="text-xs text-blue-700">
                All programs operate under Elevate for Humanity sponsorship.
                Partners may use their own curriculum and program name, but EFH
                is listed as the official sponsor on all enrollment, funding,
                and completion documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SponsorshipTooltip() {
  return (
    <div className="max-w-sm">
      <div className="text-sm space-y-2">
        <p className="font-semibold">What does "Sponsored by EFH" mean?</p>
        <p>
          Elevate for Humanity is the official Program Sponsor responsible for:
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Workforce system alignment (WIOA, WRG, JRI)</li>
          <li>Enrollment processing and eligibility</li>
          <li>Compliance and reporting</li>
          <li>Payment coordination</li>
        </ul>
        <p className="text-xs text-slate-600 pt-2 border-t">
          You retain your program name and curriculum. EFH handles the funding
          and compliance.
        </p>
      </div>
    </div>
  );
}
