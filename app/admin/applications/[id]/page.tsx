import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  MessageSquare,
} from 'lucide-react';
import ApplicationActions from './ApplicationActions';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Application Details | Admin | Elevate for Humanity',
    robots: { index: false, follow: false },
  };
}

export default async function ApplicationDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (adminProfile?.role !== 'admin' && adminProfile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Fetch application
  const { data: application, error } = await supabase
    .from('applications')
    .select(`
      *,
      programs (id, name),
      profiles (id, first_name, last_name, email, phone)
    `)
    .eq('id', id)
    .single();

  if (error || !application) {
    notFound();
  }

  // Fetch application notes/comments
  const { data: notes } = await supabase
    .from('application_notes')
    .select(`
      *,
      profiles (first_name, last_name)
    `)
    .eq('application_id', id)
    .order('created_at', { ascending: false });

  // Fetch documents
  const { data: documents } = await supabase
    .from('application_documents')
    .select('*')
    .eq('application_id', id);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    under_review: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    waitlisted: 'bg-purple-100 text-purple-800',
  };

  const statusIcons: Record<string, React.ReactNode> = {
    pending: <Clock className="w-4 h-4" />,
    under_review: <AlertCircle className="w-4 h-4" />,
    approved: <CheckCircle className="w-4 h-4" />,
    rejected: <XCircle className="w-4 h-4" />,
    waitlisted: <Clock className="w-4 h-4" />,
  };

  const applicant = application.profiles as { id: string; first_name: string; last_name: string; email: string; phone: string } | null;
  const program = application.programs as { id: string; name: string } | null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/applications"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-900">
                Application #{application.id.slice(0, 8)}
              </h1>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[application.status] || 'bg-gray-100 text-gray-800'
              }`}>
                {statusIcons[application.status]}
                {application.status?.replace('_', ' ')}
              </span>
            </div>
            <p className="text-slate-600">
              Submitted {new Date(application.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </p>
          </div>
          <ApplicationActions applicationId={id} currentStatus={application.status} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Applicant Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Full Name</p>
                  <p className="font-medium text-slate-900">
                    {applicant ? `${applicant.first_name} ${applicant.last_name}` : application.applicant_name || 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="font-medium text-slate-900">
                    {applicant?.email || application.email || 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <p className="font-medium text-slate-900">
                    {applicant?.phone || application.phone || 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Program</p>
                  <p className="font-medium text-slate-900">
                    {program?.name || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Application Details</h2>
            <div className="space-y-4">
              {application.motivation && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Motivation / Why Apply</p>
                  <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{application.motivation}</p>
                </div>
              )}
              {application.experience && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Relevant Experience</p>
                  <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{application.experience}</p>
                </div>
              )}
              {application.goals && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Career Goals</p>
                  <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{application.goals}</p>
                </div>
              )}
              {application.additional_info && (
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Additional Information</p>
                  <p className="text-slate-900 bg-slate-50 p-3 rounded-lg">{application.additional_info}</p>
                </div>
              )}
            </div>
          </div>

          {/* Documents */}
          {documents && documents.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Uploaded Documents</h2>
              <div className="space-y-2">
                {documents.map((doc: any) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-900">{doc.name}</p>
                        <p className="text-xs text-slate-500">{doc.type}</p>
                      </div>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Application Submitted</p>
                  <p className="text-sm text-slate-500">
                    {new Date(application.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              {application.reviewed_at && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Under Review</p>
                    <p className="text-sm text-slate-500">
                      {new Date(application.reviewed_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              {application.decided_at && (
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    application.status === 'approved' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {application.status === 'approved' ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      {application.status === 'approved' ? 'Approved' : 'Decision Made'}
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(application.decided_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Internal Notes</h2>
            {notes && notes.length > 0 ? (
              <div className="space-y-3">
                {notes.map((note: any) => (
                  <div key={note.id} className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-900">{note.content}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      {note.profiles?.first_name} {note.profiles?.last_name} • {new Date(note.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No notes yet</p>
            )}
            <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm">
              <MessageSquare className="w-4 h-4" />
              Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
