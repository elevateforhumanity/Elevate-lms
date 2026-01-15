// @ts-nocheck
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock,
  AlertCircle,
  X,
  Eye,
  Trash2,
  Loader2,
  Shield,
  AlertTriangle,
} from 'lucide-react';

interface DocumentType {
  id: string;
  document_type: string;
  name: string;
  description: string;
  required: boolean;
  required_for: string;
  accepted_formats: string[];
  max_file_size_mb: number;
}

interface UploadedDocument {
  id: string;
  document_type_id: string;
  file_name: string;
  file_url: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  uploaded_at: string;
  rejection_reason?: string;
}

export default function ApprenticeDocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
  const [programSlug, setProgramSlug] = useState('barber-apprenticeship');
  const [error, setError] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetchDocuments();
  }, [programSlug]);

  async function fetchDocuments() {
    setLoading(true);
    try {
      const res = await fetch(`/api/apprentice/documents?program=${programSlug}`);
      if (res.ok) {
        const data = await res.json();
        setDocumentTypes(data.documentTypes || []);
        setUploadedDocs(data.uploadedDocuments || []);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(docType: DocumentType, file: File) {
    setError(null);
    
    // Validate file size
    if (file.size > docType.max_file_size_mb * 1024 * 1024) {
      setError(`File too large. Maximum size is ${docType.max_file_size_mb}MB.`);
      return;
    }

    // Validate file type
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!docType.accepted_formats.includes(ext || '')) {
      setError(`Invalid file type. Accepted formats: ${docType.accepted_formats.join(', ')}`);
      return;
    }

    setUploading(docType.id);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentTypeId', docType.id);
      formData.append('programSlug', programSlug);

      const res = await fetch('/api/apprentice/documents', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        await fetchDocuments();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to upload document');
      }
    } catch (error) {
      setError('Failed to upload document. Please try again.');
    } finally {
      setUploading(null);
    }
  }

  async function deleteDocument(docId: string) {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      const res = await fetch(`/api/apprentice/documents?id=${docId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await fetchDocuments();
      }
    } catch (error) {
      setError('Failed to delete document');
    }
  }

  function getDocumentForType(typeId: string): UploadedDocument | undefined {
    return uploadedDocs.find(d => d.document_type_id === typeId);
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'expired':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      default:
        return <Clock className="w-5 h-5 text-blue-600" />;
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-2 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-2 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Rejected</span>;
      case 'expired':
        return <span className="px-2 py-2 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Expired</span>;
      default:
        return <span className="px-2 py-2 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Under Review</span>;
    }
  }

  const requiredDocs = documentTypes.filter(d => d.required);
  const optionalDocs = documentTypes.filter(d => !d.required);
  const completedRequired = requiredDocs.filter(d => {
    const uploaded = getDocumentForType(d.id);
    return uploaded && (uploaded.status === 'approved' || uploaded.status === 'pending');
  }).length;
  const progress = requiredDocs.length > 0 ? (completedRequired / requiredDocs.length) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-600" />
              Required Documents
            </h1>
            <p className="text-slate-600 mt-1">
              Upload documents required for your apprenticeship file
            </p>
          </div>
          <Link
            href="/lms/dashboard"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Progress Card */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Document Completion</h2>
              <p className="text-purple-100">
                {completedRequired} of {requiredDocs.length} required documents uploaded
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black">{Math.round(progress)}%</div>
              <div className="text-purple-100">Complete</div>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div
              className="bg-white h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-800 font-semibold">Your documents are secure</p>
            <p className="text-blue-700 text-sm">
              All documents are encrypted and stored securely. They are only accessible to authorized 
              program administrators for compliance verification purposes.
            </p>
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-red-50">
            <h3 className="font-bold text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Required Documents
            </h3>
            <p className="text-red-700 text-sm">These documents must be uploaded to complete enrollment</p>
          </div>
          <div className="divide-y divide-slate-100">
            {requiredDocs.map((docType) => {
              const uploaded = getDocumentForType(docType.id);
              const isUploading = uploading === docType.id;

              return (
                <div key={docType.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {uploaded ? getStatusIcon(uploaded.status) : <Circle className="w-5 h-5 text-slate-300" />}
                        <h4 className="font-semibold text-black">{docType.name}</h4>
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                          Required
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 ml-7">{docType.description}</p>
                      <p className="text-xs text-slate-400 ml-7 mt-1">
                        Accepted: {docType.accepted_formats.join(', ').toUpperCase()} • Max {docType.max_file_size_mb}MB
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {uploaded ? (
                        <>
                          {getStatusBadge(uploaded.status)}
                          <a
                            href={uploaded.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-500 hover:text-slate-700"
                            title="View document"
                          >
                            <Eye className="w-5 h-5" />
                          </a>
                          {uploaded.status !== 'approved' && (
                            <button
                              onClick={() => deleteDocument(uploaded.id)}
                              className="p-2 text-red-500 hover:text-red-700"
                              title="Delete and re-upload"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          <input
                            type="file"
                            ref={(el) => (fileInputRefs.current[docType.id] = el)}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(docType, file);
                            }}
                            accept={docType.accepted_formats.map(f => `.${f}`).join(',')}
                            className="hidden"
                          />
                          <button
                            onClick={() => fileInputRefs.current[docType.id]?.click()}
                            disabled={isUploading}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
                          >
                            {isUploading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            Upload
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Rejection reason */}
                  {uploaded?.status === 'rejected' && uploaded.rejection_reason && (
                    <div className="mt-3 ml-7 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Rejection reason:</strong> {uploaded.rejection_reason}
                      </p>
                      <p className="text-sm text-red-700 mt-1">
                        Please delete and upload a new document that meets the requirements.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Optional Documents */}
        {optionalDocs.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <h3 className="font-bold text-slate-700">Optional Documents</h3>
              <p className="text-slate-500 text-sm">These documents may be required depending on your situation</p>
            </div>
            <div className="divide-y divide-slate-100">
              {optionalDocs.map((docType) => {
                const uploaded = getDocumentForType(docType.id);
                const isUploading = uploading === docType.id;

                return (
                  <div key={docType.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {uploaded ? getStatusIcon(uploaded.status) : <Circle className="w-5 h-5 text-slate-300" />}
                          <h4 className="font-semibold text-black">{docType.name}</h4>
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded">
                            Optional
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 ml-7">{docType.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {uploaded ? (
                          <>
                            {getStatusBadge(uploaded.status)}
                            <a
                              href={uploaded.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-slate-500 hover:text-slate-700"
                            >
                              <Eye className="w-5 h-5" />
                            </a>
                          </>
                        ) : (
                          <>
                            <input
                              type="file"
                              ref={(el) => (fileInputRefs.current[docType.id] = el)}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(docType, file);
                              }}
                              accept={docType.accepted_formats.map(f => `.${f}`).join(',')}
                              className="hidden"
                            />
                            <button
                              onClick={() => fileInputRefs.current[docType.id]?.click()}
                              disabled={isUploading}
                              className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 disabled:opacity-50"
                            >
                              {isUploading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Upload className="w-4 h-4" />
                              )}
                              Upload
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completion Status */}
        {progress === 100 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-800 mb-2">All Required Documents Uploaded!</h3>
            <p className="text-green-700 mb-4">
              Your documents are being reviewed. You'll be notified once they're approved.
            </p>
            <Link
              href="/lms/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
            >
              Continue to Dashboard →
            </Link>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="font-bold text-black mb-3">Need Help?</h3>
          <p className="text-slate-600 mb-4">
            If you have questions about document requirements or need assistance uploading, contact us:
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="tel:317-314-3757"
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              Call: 317-314-3757
            </a>
            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
