'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';

interface Props {
  applicationId: string;
  currentStatus: string;
}

export default function ApplicationActions({ applicationId, currentStatus }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<string | null>(null);

  const handleAction = async (newStatus: string) => {
    setIsLoading(true);
    setAction(newStatus);

    try {
      const response = await fetch(`/api/admin/applications/${applicationId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      router.refresh();
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Failed to update application status');
    } finally {
      setIsLoading(false);
      setAction(null);
    }
  };

  if (currentStatus === 'approved' || currentStatus === 'rejected') {
    return (
      <div className="text-sm text-slate-500">
        Decision has been made
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleAction('approved')}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {isLoading && action === 'approved' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <CheckCircle className="w-4 h-4" />
        )}
        Approve
      </button>
      <button
        onClick={() => handleAction('rejected')}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
      >
        {isLoading && action === 'rejected' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <XCircle className="w-4 h-4" />
        )}
        Reject
      </button>
      {currentStatus === 'pending' && (
        <button
          onClick={() => handleAction('under_review')}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50"
        >
          {isLoading && action === 'under_review' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Clock className="w-4 h-4" />
          )}
          Mark Under Review
        </button>
      )}
    </div>
  );
}
