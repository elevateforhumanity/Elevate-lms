"use client";

import React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export function HandbookAcknowledgeButton({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAcknowledge = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/student/acknowledge-handbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert('Failed to acknowledge handbook. Please try again.');
      }
    } catch (error: unknown) {
      // Error: $1
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAcknowledge}
      disabled={loading}
      className="px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      <CheckCircle className="w-5 h-5" />
      {loading ? 'Processing...' : 'I Acknowledge'}
    </button>
  );
}
