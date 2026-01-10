import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  Eye,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Program Holder Verification | Admin',
  description: 'Review and verify program holder documents',
};

export default async function ProgramHolderVerificationPage() {
  const { user, profile } = await requireRole(['admin', 'super_admin']);
  const supabase = await createClient();

  // Get pending verifications
  const { data: pendingHolders } = await supabase
    .from('program_holders')
    .select(
      `
      *,
      user:profiles!user_id(
        id,
        email,
        first_name,
        last_name
      )
    `
    )
    .eq('verification_status', 'pending')
    .order('created_at', { ascending: false });

  // Get documents for each holder
  const holdersWithDocs = await Promise.all(
    (pendingHolders || []).map(async (holder) => {
      const { data: documents } = await supabase
        .from('program_holder_documents')
        .select('*')
        .eq('program_holder_id', holder.user_id)
        .order('uploaded_at', { ascending: false });

      const { data: banking } = await supabase
        .from('program_holder_banking')
        .select('*')
        .eq('program_holder_id', holder.user_id)
        .single();

      return {
        ...holder,
        documents: documents || [],
        banking,
      };
    })
  );

  // Get recently verified
  const { data: recentlyVerified } = await supabase
    .from('program_holders')
    .select(
      `
      *,
      user:profiles!user_id(
        id,
        email,
        first_name,
        last_name
      )
    `
    )
    .in('verification_status', ['verified', 'rejected'])
    .order('updated_at', { ascending: false })
    .limit(10);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Program Holder Verification
          </h1>
          <p className="text-gray-600 mt-2">
            Review and verify program holder documents and information
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-orange-600">
                  {holdersWithDocs.length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified Today</p>
                <p className="text-3xl font-bold text-green-600">
                  {
                    recentlyVerified?.filter(
                      (h) =>
                        h.verification_status === 'verified' &&
                        new Date(h.updated_at).toDateString() ===
                          new Date().toDateString()
                    ).length
                  }
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600">
                  {
                    recentlyVerified?.filter(
                      (h) => h.verification_status === 'rejected'
                    ).length
                  }
                </p>
              </div>
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>
        </div>

        {/* Pending Verifications */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              Pending Verifications
            </h2>
          </div>

          {holdersWithDocs.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-700">
              <Clock className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p>No pending verifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {holdersWithDocs.map((holder) => (
                <div key={holder.id} className="px-6 py-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {holder.user?.first_name} {holder.user?.last_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {holder.user?.email}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        Organization: {holder.organization_name || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Applied:{' '}
                        {new Date(holder.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                      Pending Review
                    </span>
                  </div>

                  {/* Documents */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Uploaded Documents
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {holder.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-600" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {doc.document_type
                                  .replace(/_/g, ' ')
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </p>
                              <p className="text-xs text-gray-700">
                                {doc.file_name}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={`/api/admin/documents/${doc.id}/view`}
                              target="_blank"
                              className="p-2 text-blue-600 hover:bg-gray-50 rounded"
                              rel="noreferrer"
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                            <a
                              href={`/api/admin/documents/${doc.id}/download`}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Banking Info */}
                  {holder.banking && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Banking Information
                      </h4>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Account Holder</p>
                            <p className="font-medium">
                              {holder.banking.account_holder_name}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Bank</p>
                            <p className="font-medium">
                              {holder.banking.bank_name}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Account Type</p>
                            <p className="font-medium capitalize">
                              {holder.banking.account_type}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Routing Number</p>
                            <p className="font-medium">
                              ****{holder.banking.routing_number?.slice(-4)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/program-holders/verification/${holder.id}/review`}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center font-medium"
                    >
                      Review & Verify
                    </Link>
                    <Link
                      href={`/admin/program-holders/${holder.id}`}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recently Verified */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              Recently Verified
            </h2>
          </div>

          {recentlyVerified && recentlyVerified.length > 0 ? (
            <div className="divide-y">
              {recentlyVerified.map((holder) => (
                <div
                  key={holder.id}
                  className="px-6 py-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {holder.user?.first_name} {holder.user?.last_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {holder.user?.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        holder.verification_status === 'verified'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {holder.verification_status === 'verified'
                        ? 'Verified'
                        : 'Rejected'}
                    </span>
                    <Link
                      href={`/admin/program-holders/${holder.id}`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center text-gray-700">
              <p>No recent verifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
