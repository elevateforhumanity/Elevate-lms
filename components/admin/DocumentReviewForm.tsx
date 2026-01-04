'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  XCircle,
  FileText,
  User,
  Calendar,
  AlertCircle,
} from 'lucide-react';

interface Props {
  document: any;
  adminId: string;
}

export function DocumentReviewForm({ document, adminId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!action) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/documents/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: document.id,
          action,
          rejectionReason: action === 'reject' ? rejectionReason : null,
          adminId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to review document');
      }

      router.push('/admin/documents/review?success=true');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to review document');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border-2 border-red-600 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-red-900">Error</h3>
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Document Info */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-4">Document Information</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm text-slate-600">File Name</p>
              <p className="font-semibold text-slate-900">
                {document.file_name}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm text-slate-600">Document Type</p>
              <p className="font-semibold text-slate-900">
                {document.document_type
                  .replace(/_/g, ' ')
                  .replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm text-slate-600">Uploaded By</p>
              <p className="font-semibold text-slate-900">
                {document.profiles?.full_name || 'Unknown User'}
              </p>
              <p className="text-sm text-slate-600">
                {document.profiles?.email} • {document.profiles?.role}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm text-slate-600">Upload Date</p>
              <p className="font-semibold text-slate-900">
                {new Date(document.created_at).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-sm text-slate-600">File Size</p>
              <p className="font-semibold text-slate-900">
                {(document.file_size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Document Preview */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-4">Document Preview</h2>
        <div className="border rounded-lg overflow-hidden">
          {document.mime_type === 'application/pdf' ? (
            <iframe
              src={document.file_url}
              className="w-full h-[600px]"
              title="Document Preview"
            />
          ) : (
            <img
              src={document.file_url}
              alt="Document"
              className="w-full h-auto"
            />
          )}
        </div>
        <div className="mt-4">
          <a
            href={document.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            Open in New Tab →
          </a>
        </div>
      </div>

      {/* Review Actions */}
      {document.status === 'pending' && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Review Decision</h2>

          <div className="space-y-4 mb-6">
            <button
              type="button"
              onClick={() => setAction('approve')}
              className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition ${
                action === 'approve'
                  ? 'border-green-600 bg-green-50'
                  : 'border-slate-300 hover:border-green-600'
              }`}
            >
              <CheckCircle
                className={`w-6 h-6 ${action === 'approve' ? 'text-green-600' : 'text-slate-400'}`}
              />
              <div className="text-left">
                <p
                  className={`font-bold ${action === 'approve' ? 'text-green-900' : 'text-slate-900'}`}
                >
                  Approve Document
                </p>
                <p
                  className={`text-sm ${action === 'approve' ? 'text-green-700' : 'text-slate-600'}`}
                >
                  Document meets requirements and is approved
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setAction('reject')}
              className={`w-full p-4 border-2 rounded-lg flex items-center gap-3 transition ${
                action === 'reject'
                  ? 'border-red-600 bg-red-50'
                  : 'border-slate-300 hover:border-red-600'
              }`}
            >
              <XCircle
                className={`w-6 h-6 ${action === 'reject' ? 'text-red-600' : 'text-slate-400'}`}
              />
              <div className="text-left">
                <p
                  className={`font-bold ${action === 'reject' ? 'text-red-900' : 'text-slate-900'}`}
                >
                  Reject Document
                </p>
                <p
                  className={`text-sm ${action === 'reject' ? 'text-red-700' : 'text-slate-600'}`}
                >
                  Document does not meet requirements
                </p>
              </div>
            </button>
          </div>

          {action === 'reject' && (
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Rejection Reason *
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                required
                rows={4}
                placeholder="Explain why this document is being rejected..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                loading || !action || (action === 'reject' && !rejectionReason)
              }
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      )}

      {document.status !== 'pending' && (
        <div
          className={`p-6 rounded-lg border-2 ${
            document.status === 'approved'
              ? 'bg-green-50 border-green-600'
              : 'bg-red-50 border-red-600'
          }`}
        >
          <h2 className="text-xl font-bold mb-2">
            {document.status === 'approved'
              ? 'Document Approved'
              : 'Document Rejected'}
          </h2>
          <p className="text-sm mb-4">
            Reviewed on {new Date(document.reviewed_at).toLocaleString()}
          </p>
          {document.rejection_reason && (
            <div className="p-4 bg-white rounded-lg border">
              <p className="text-sm font-semibold mb-1">Rejection Reason:</p>
              <p className="text-sm">{document.rejection_reason}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
