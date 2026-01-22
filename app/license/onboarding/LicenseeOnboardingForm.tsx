'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

interface Props {
  userId: string;
  organizationId?: string;
  requiredAgreements: string[];
  acceptedAgreements: string[];
}

export default function LicenseeOnboardingForm({ 
  userId, 
  organizationId,
  requiredAgreements, 
  acceptedAgreements 
}: Props) {
  const router = useRouter();
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState<string[]>(acceptedAgreements);
  const [error, setError] = useState('');

  const pendingAgreements = requiredAgreements.filter(a => !accepted.includes(a));
  const allAccepted = pendingAgreements.length === 0;

  const handleAcceptAll = async () => {
    setAccepting(true);
    setError('');

    try {
      const response = await fetch('/api/legal/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agreements: pendingAgreements,
          context: 'first_login',
          organization_id: organizationId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to accept agreements');
      }

      setAccepted(requiredAgreements);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAccepting(false);
    }
  };

  if (allAccepted) {
    return (
      <div className="text-center py-6">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <p className="text-green-600 font-medium">All agreements accepted</p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <p className="text-amber-800 text-sm">
          By clicking "Accept All Agreements" below, you confirm that you have read and agree to all the agreements listed above. This acceptance is legally binding.
        </p>
      </div>

      <label className="flex items-start gap-3 mb-6 cursor-pointer">
        <input 
          type="checkbox" 
          className="mt-1 w-5 h-5 text-green-600 rounded"
          required
        />
        <span className="text-gray-700">
          I have read and agree to the End User License Agreement, Terms of Service, Acceptable Use Policy, Disclosures, and Software License Agreement. I understand that this is a software license, not a partnership, and that I am responsible for implementation, compliance, and outcomes.
        </span>
      </label>

      <button
        onClick={handleAcceptAll}
        disabled={accepting}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-400 transition"
      >
        {accepting ? 'Processing...' : `Accept All Agreements (${pendingAgreements.length})`}
      </button>
    </div>
  );
}
