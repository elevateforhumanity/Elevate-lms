"use client";

import React from 'react';

import { useState } from 'react';


interface SponsorshipAcknowledgmentProps {
  onComplete: (acknowledged: boolean) => void;
  required?: boolean;
}

export function SponsorshipAcknowledgment({
  onComplete,
  required = true,
}: SponsorshipAcknowledgmentProps) {
  const [acknowledgments, setAcknowledgments] = useState({
    sponsor: false,
    programName: false,
    curriculum: false,
    enrollment: false,
    compliance: false,
  });

  const allAcknowledged = Object.values(acknowledgments).every((v) => v);

  const handleToggle = (key: keyof typeof acknowledgments) => {
    const newAcknowledgments = {
      ...acknowledgments,
      [key]: !acknowledgments[key],
    };
    setAcknowledgments(newAcknowledgments);

    const allChecked = Object.values(newAcknowledgments).every((v) => v);
    onComplete(allChecked);
  };

  const items = [
    {
      key: 'sponsor' as const,
      label: 'I understand Elevate for Humanity is the Program Sponsor',
      description:
        'EFH is responsible for program approval, workforce alignment, compliance, and reporting.',
    },
    {
      key: 'programName' as const,
      label:
        'I understand my program may retain its name but is sponsored by EFH',
      description:
        'Your program name can be used for branding, but EFH is listed as the official sponsor on all documentation.',
    },
    {
      key: 'curriculum' as const,
      label:
        'I understand students must complete required online curriculum components',
      description:
        'Students must complete EFH-designated online curriculum for compliance and credentialing, in addition to your instruction.',
    },
    {
      key: 'enrollment' as const,
      label:
        'I understand all funded enrollments flow through Elevate for Humanity',
      description:
        'Partners do not independently enroll students into funded programs. All enrollments must be processed through EFH.',
    },
    {
      key: 'compliance' as const,
      label:
        'I agree to comply with onboarding, attendance, and reporting requirements',
      description:
        'Partners must track and submit attendance/hours on schedule, notify EFH of issues, and cooperate with audits.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Required Acknowledgments
        </h3>
        <p className="text-sm text-slate-600">
          Please read and acknowledge each statement below. All acknowledgments
          are required before program activation.
        </p>
      </div>

      {/* Acknowledgment Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => handleToggle(item.key)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              acknowledgments[item.key]
                ? 'border-green-500 bg-green-50'
                : 'border-slate-300 bg-white hover:border-slate-400'
            }`}
          >
            <div className="flex items-start gap-3">
              {acknowledgments[item.key] ? (
                
              ) : (
                <Circle className="w-6 h-6 text-slate-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <div
                  className={`font-medium mb-1 ${
                    acknowledgments[item.key]
                      ? 'text-green-900'
                      : 'text-slate-900'
                  }`}
                >
                  {item.label}
                </div>
                <div className="text-sm text-slate-600">{item.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Status Message */}
      {required && !allAcknowledged && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-sm text-amber-800">
            <strong>Action Required:</strong> You must acknowledge all
            statements above before proceeding to digital signature.
          </div>
        </div>
      )}

      {allAcknowledged && (
        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          
          <div className="flex-1 text-sm text-green-800">
            <strong>All acknowledgments complete.</strong> You may now proceed
            to digital signature.
          </div>
        </div>
      )}

      {/* Legal Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <p className="text-xs text-slate-600">
          <strong>Legal Notice:</strong> These acknowledgments are legally
          binding. By checking each box and signing, you agree to operate under
          Elevate for Humanity sponsorship and comply with all requirements
          outlined in the partner agreement.
        </p>
      </div>
    </div>
  );
}
