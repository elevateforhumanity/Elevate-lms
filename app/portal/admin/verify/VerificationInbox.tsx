'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Building2,
  FileText,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  ChevronRight,
  Filter,
  Search,
  AlertTriangle,
  Square,
  CheckSquare,
  Loader2,
} from 'lucide-react';

interface Document {
  id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  status: string;
  uploaded_at: string;
  user_id: string;
  owner_type: string;
  owner_id: string;
  rejection_reason: string | null;
  profiles: {
    id: string;
    full_name: string;
    email: string;
  } | null;
}

interface EntityDocStatus {
  document_type: string;
  label: string;
  required: boolean;
  status: 'missing' | 'pending' | 'verified' | 'rejected';
  document?: Document;
}

interface EntityStatus {
  intake_complete: boolean;
  agreement_accepted: boolean;
  docs_verified: boolean;
  ready: boolean;
}

interface Counts {
  apprentices: number;
  hostShops: number;
  transfers: number;
  ce: number;
}

interface Props {
  documents: Document[];
  counts: Counts;
  adminId: string;
}

const DOC_TYPE_LABELS: Record<string, string> = {
  photo_id: 'Photo ID',
  shop_license: 'Shop License',
  barber_license: 'Barber License',
  school_transcript: 'School Transcript',
  certificate: 'Certificate',
  out_of_state_license: 'Out-of-State License',
  ce_certificate: 'CE Certificate',
  employment_verification: 'Employment Verification',
};

const DOC_TYPE_CATEGORY: Record<string, string> = {
  photo_id: 'apprentice',
  shop_license: 'host_shop',
  barber_license: 'host_shop',
  school_transcript: 'transfer',
  certificate: 'transfer',
  out_of_state_license: 'transfer',
  ce_certificate: 'ce',
  employment_verification: 'transfer',
};

// Required docs per entity type
const REQUIRED_DOCS: Record<string, { type: string; label: string; required: boolean }[]> = {
  apprentice: [
    { type: 'photo_id', label: 'Photo ID', required: true },
  ],
  host_shop: [
    { type: 'shop_license', label: 'Shop License', required: true },
    { type: 'barber_license', label: 'Barber License', required: true },
  ],
  transfer: [
    { type: 'school_transcript', label: 'School Transcript', required: false },
    { type: 'certificate', label: 'Certificate', required: false },
    { type: 'out_of_state_license', label: 'Out-of-State License', required: false },
  ],
  ce: [
    { type: 'ce_certificate', label: 'CE Certificate', required: true },
  ],
};

const REJECTION_REASONS = [
  'Unreadable',
  'Expired',
  'Wrong document',
  'Does not match applicant/shop',
  'Other',
];

export default function VerificationInbox({ documents, counts, adminId }: Props) {
  const router = useRouter();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [entityDocs, setEntityDocs] = useState<EntityDocStatus[]>([]);
  const [entityStatus, setEntityStatus] = useState<EntityStatus | null>(null);
  const [loadingEntity, setLoadingEntity] = useState(false);

  const totalPending = counts.apprentices + counts.hostShops + counts.transfers + counts.ce;

  // Fetch entity-level doc status when a document is selected
  useEffect(() => {
    if (!selectedDoc) {
      setEntityDocs([]);
      setEntityStatus(null);
      return;
    }

    const fetchEntityDocs = async () => {
      setLoadingEntity(true);
      try {
        const category = DOC_TYPE_CATEGORY[selectedDoc.document_type];
        const requiredDocs = REQUIRED_DOCS[category] || [];
        
        // Fetch all docs for this user
        const response = await fetch(`/api/admin/entity-docs?userId=${selectedDoc.user_id}&category=${category}`);
        
        if (response.ok) {
          const data = await response.json();
          
          // Build entity doc status
          const docStatuses: EntityDocStatus[] = requiredDocs.map((req) => {
            const doc = data.documents?.find((d: Document) => d.document_type === req.type);
            return {
              document_type: req.type,
              label: req.label,
              required: req.required,
              status: doc ? (doc.status as 'pending' | 'verified' | 'rejected') : 'missing',
              document: doc,
            };
          });
          
          setEntityDocs(docStatuses);
          setEntityStatus(data.entityStatus || null);
        }
      } catch (error) {
        console.error('Failed to fetch entity docs:', error);
      } finally {
        setLoadingEntity(false);
      }
    };

    fetchEntityDocs();
  }, [selectedDoc?.user_id, selectedDoc?.document_type]);

  const filteredDocs = documents.filter((doc) => {
    // Filter by category
    if (filter !== 'all') {
      const category = DOC_TYPE_CATEGORY[doc.document_type];
      if (category !== filter) return false;
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      const name = doc.profiles?.full_name?.toLowerCase() || '';
      const email = doc.profiles?.email?.toLowerCase() || '';
      if (!name.includes(searchLower) && !email.includes(searchLower)) {
        return false;
      }
    }

    return true;
  });

  const handleVerify = async () => {
    if (!selectedDoc) return;

    setVerifying(true);
    try {
      const response = await fetch('/api/documents/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: selectedDoc.id,
          action: 'approve',
        }),
      });

      if (response.ok) {
        // Auto-advance to next item
        const currentIndex = filteredDocs.findIndex((d) => d.id === selectedDoc.id);
        const nextDoc = filteredDocs[currentIndex + 1];
        setSelectedDoc(nextDoc || null);
        router.refresh();
      }
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setVerifying(false);
    }
  };

  const handleReject = async () => {
    if (!selectedDoc || !rejectReason) return;

    setRejecting(true);
    try {
      const response = await fetch('/api/documents/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: selectedDoc.id,
          action: 'reject',
          rejectionReason: rejectReason,
        }),
      });

      if (response.ok) {
        setShowRejectModal(false);
        setRejectReason('');
        // Auto-advance to next item
        const currentIndex = filteredDocs.findIndex((d) => d.id === selectedDoc.id);
        const nextDoc = filteredDocs[currentIndex + 1];
        setSelectedDoc(nextDoc || null);
        router.refresh();
      }
    } catch (error) {
      console.error('Rejection failed:', error);
    } finally {
      setRejecting(false);
    }
  };

  const getTimeSince = (date: string) => {
    const now = new Date();
    const uploaded = new Date(date);
    const diffMs = now.getTime() - uploaded.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  const getCategoryIcon = (docType: string) => {
    const category = DOC_TYPE_CATEGORY[docType];
    switch (category) {
      case 'apprentice':
        return <User className="w-4 h-4" />;
      case 'host_shop':
        return <Building2 className="w-4 h-4" />;
      case 'transfer':
        return <FileText className="w-4 h-4" />;
      case 'ce':
        return <Award className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex gap-6">
      {/* Left Panel - Queue */}
      <div className="flex-1">
        {/* Summary Chips */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            All ({totalPending})
          </button>
          <button
            onClick={() => setFilter('apprentice')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
              filter === 'apprentice'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <User className="w-4 h-4" />
            Apprentices ({counts.apprentices})
          </button>
          <button
            onClick={() => setFilter('host_shop')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
              filter === 'host_shop'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Host Shops ({counts.hostShops})
          </button>
          <button
            onClick={() => setFilter('transfer')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
              filter === 'transfer'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            Transfers ({counts.transfers})
          </button>
          <button
            onClick={() => setFilter('ce')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-2 ${
              filter === 'ce'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Award className="w-4 h-4" />
            CE ({counts.ce})
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Queue Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {filteredDocs.length === 0 ? (
            <div className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
              <p className="text-gray-500 mt-1">No documents pending verification</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Document
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Age
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`cursor-pointer hover:bg-gray-50 transition ${
                      selectedDoc?.id === doc.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        {getCategoryIcon(doc.document_type)}
                        <span className="text-sm capitalize">
                          {DOC_TYPE_CATEGORY[doc.document_type]?.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">
                          {doc.profiles?.full_name || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {doc.profiles?.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">
                        {DOC_TYPE_LABELS[doc.document_type] || doc.document_type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {getTimeSince(doc.uploaded_at)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Right Panel - Detail Drawer */}
      <div className="w-96 flex-shrink-0">
        {selectedDoc ? (
          <div className="bg-white rounded-xl shadow-sm border sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedDoc.profiles?.full_name || 'Unknown'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedDoc.profiles?.email}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 capitalize">
                    {DOC_TYPE_CATEGORY[selectedDoc.document_type]?.replace('_', ' ')}
                  </p>
                </div>
                {entityStatus?.ready ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    Ready
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                    Blocked
                  </span>
                )}
              </div>

              {/* Status chips */}
              <div className="flex flex-wrap gap-2 mt-3">
                {entityStatus ? (
                  <>
                    <span className={`px-2 py-1 text-xs rounded ${
                      entityStatus.intake_complete 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      Intake: {entityStatus.intake_complete ? 'Complete' : 'Incomplete'}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      entityStatus.agreement_accepted 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      Agreement: {entityStatus.agreement_accepted ? 'Accepted' : 'Pending'}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      entityStatus.docs_verified 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      Docs: {entityStatus.docs_verified ? 'Verified' : 'Pending'}
                    </span>
                  </>
                ) : (
                  <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Automation blocked until docs verified
                  </span>
                )}
              </div>
            </div>

            {/* Required Documents Checklist */}
            <div className="p-4 border-b">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Required Documents
              </h4>
              {loadingEntity ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              ) : entityDocs.length > 0 ? (
                <div className="space-y-2">
                  {entityDocs.map((doc) => (
                    <div
                      key={doc.document_type}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        doc.document?.id === selectedDoc.id ? 'bg-blue-50 border border-blue-200' : ''
                      }`}
                    >
                      {doc.status === 'verified' ? (
                        <CheckSquare className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : doc.status === 'pending' ? (
                        <Square className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      ) : doc.status === 'rejected' ? (
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{doc.label}</span>
                          {doc.required && (
                            <span className="text-xs text-red-500">*</span>
                          )}
                        </div>
                        {doc.document ? (
                          <p className="text-xs text-gray-500 truncate">
                            {doc.document.file_name}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-400">Not uploaded</p>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        doc.status === 'verified' ? 'bg-green-100 text-green-700' :
                        doc.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        doc.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {doc.status === 'missing' ? 'Missing' : doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No requirements defined</p>
              )}
            </div>

            {/* Current Document Details */}
            <div className="p-4 border-b">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Selected Document
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-gray-500">Type</span>
                  <p className="text-sm font-medium">
                    {DOC_TYPE_LABELS[selectedDoc.document_type] ||
                      selectedDoc.document_type}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">File</span>
                  <p className="text-sm font-medium truncate">
                    {selectedDoc.file_name}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Uploaded</span>
                  <p className="text-sm">
                    {new Date(selectedDoc.uploaded_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Actions */}
            <div className="p-4 border-b">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
              <div className="flex gap-2">
                {selectedDoc.file_url && (
                  <>
                    <a
                      href={selectedDoc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </a>
                    <a
                      href={selectedDoc.file_url}
                      download
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 space-y-3">
              {/* Document verification actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleVerify}
                  disabled={verifying}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  {verifying ? 'Verifying...' : 'Verify'}
                </button>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>

              {/* Entity approval action - disabled until all docs verified */}
              {entityStatus && (
                <div className="pt-3 border-t">
                  <button
                    disabled={!entityStatus.ready}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition ${
                      entityStatus.ready
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (entityStatus.ready) {
                        // Navigate to approval page based on category
                        const category = DOC_TYPE_CATEGORY[selectedDoc.document_type];
                        if (category === 'apprentice') {
                          window.location.href = `/admin/students?approve=${selectedDoc.user_id}`;
                        } else if (category === 'host_shop') {
                          window.location.href = `/admin/shops?approve=${selectedDoc.owner_id}`;
                        }
                      }
                    }}
                  >
                    {entityStatus.ready ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Ready for Approval
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4" />
                        Approval Blocked
                      </>
                    )}
                  </button>
                  {!entityStatus.ready && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Complete intake, agreement, and verify all required docs to enable approval
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Select a document to review</p>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Reject Document
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Select a reason for rejection. The user will be notified and asked
              to re-upload.
            </p>

            <div className="space-y-2 mb-4">
              {REJECTION_REASONS.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
                    rejectReason === reason
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="rejectReason"
                    value={reason}
                    checked={rejectReason === reason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-4 h-4 text-red-600"
                  />
                  <span className="text-sm">{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                }}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason || rejecting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
              >
                {rejecting ? 'Rejecting...' : 'Confirm Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
