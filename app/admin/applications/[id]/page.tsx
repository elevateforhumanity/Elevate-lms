import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Application Details | Elevate For Humanity',
  description: 'View application details',
};

type ApplicationState = 'started' | 'eligibility_complete' | 'documents_complete' | 'review_ready' | 'submitted' | 'rejected';

interface StateHistoryEntry {
  state: ApplicationState;
  timestamp: string;
  action: string;
  actor_id?: string;
  notes?: string;
}

interface CareerApplication {
  id: string;
  user_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  application_state: ApplicationState;
  status: string;
  submitted_at: string | null;
  last_transition_at: string;
  state_history: StateHistoryEntry[];
  created_at: string;
  date_of_birth: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  high_school: string | null;
  graduation_year: string | null;
  gpa: string | null;
  college: string | null;
  major: string | null;
  program_id: string | null;
  funding_type: string | null;
  employment_status: string | null;
  current_employer: string | null;
  years_experience: string | null;
}

const stateLabels: Record<ApplicationState, string> = {
  started: 'Started',
  eligibility_complete: 'Eligibility Complete',
  documents_complete: 'Documents Complete',
  review_ready: 'Ready for Review',
  submitted: 'Submitted',
  rejected: 'Rejected',
};

const stateColors: Record<ApplicationState, string> = {
  started: 'bg-gray-100 text-gray-800 border-gray-300',
  eligibility_complete: 'bg-blue-100 text-blue-800 border-blue-300',
  documents_complete: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  review_ready: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  submitted: 'bg-green-100 text-green-800 border-green-300',
  rejected: 'bg-red-100 text-red-800 border-red-300',
};

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  const { data: application, error } = await supabase
    .from('career_applications')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !application) {
    notFound();
  }

  // Fetch immutable state events (source of truth)
  const { data: stateEvents } = await supabase
    .from('application_state_events')
    .select('id, from_state, to_state, actor_id, actor_role, reason, created_at')
    .eq('application_id', id)
    .order('created_at', { ascending: true });

  const app = application as CareerApplication;
  
  // Use events table if available, fall back to JSONB for backward compat
  const stateHistory: StateHistoryEntry[] = stateEvents && stateEvents.length > 0
    ? stateEvents.map((e: { to_state: ApplicationState; created_at: string; reason: string | null; actor_role: string | null }) => ({
        state: e.to_state,
        timestamp: e.created_at,
        action: e.reason || 'transition',
        notes: e.actor_role ? `by ${e.actor_role}` : undefined,
      }))
    : (Array.isArray(app.state_history) ? app.state_history : []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumbs
          items={[
            { label: 'Admin', href: '/admin' },
            { label: 'Applications', href: '/admin/applications' },
            { label: `${app.first_name} ${app.last_name}` },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {app.first_name} {app.last_name}
            </h1>
            <p className="text-gray-600 mt-1">{app.email}</p>
          </div>
          <div className="flex gap-3">
            <span
              className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${stateColors[app.application_state]}`}
            >
              {stateLabels[app.application_state]}
            </span>
            <Link
              href="/admin/applications"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Back to List
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="text-sm text-gray-900">{app.first_name} {app.last_name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">{app.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900">{app.phone || 'Not provided'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="text-sm text-gray-900">
                    {app.date_of_birth ? new Date(app.date_of_birth).toLocaleDateString() : 'Not provided'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Address */}
            {(app.address || app.city || app.state || app.zip_code) && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Address</h2>
                <dl className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Street Address</dt>
                    <dd className="text-sm text-gray-900">{app.address || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">City</dt>
                    <dd className="text-sm text-gray-900">{app.city || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">State</dt>
                    <dd className="text-sm text-gray-900">{app.state || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">ZIP Code</dt>
                    <dd className="text-sm text-gray-900">{app.zip_code || 'Not provided'}</dd>
                  </div>
                </dl>
              </div>
            )}

            {/* Education */}
            {(app.high_school || app.college || app.gpa) && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">High School</dt>
                    <dd className="text-sm text-gray-900">{app.high_school || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Graduation Year</dt>
                    <dd className="text-sm text-gray-900">{app.graduation_year || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">GPA</dt>
                    <dd className="text-sm text-gray-900">{app.gpa || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">College</dt>
                    <dd className="text-sm text-gray-900">{app.college || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Major</dt>
                    <dd className="text-sm text-gray-900">{app.major || 'Not provided'}</dd>
                  </div>
                </dl>
              </div>
            )}

            {/* Employment */}
            {(app.employment_status || app.current_employer || app.years_experience) && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Employment</h2>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Employment Status</dt>
                    <dd className="text-sm text-gray-900">{app.employment_status || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Current Employer</dt>
                    <dd className="text-sm text-gray-900">{app.current_employer || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Years of Experience</dt>
                    <dd className="text-sm text-gray-900">{app.years_experience || 'Not provided'}</dd>
                  </div>
                </dl>
              </div>
            )}

            {/* Program & Funding */}
            {(app.program_id || app.funding_type) && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Program Details</h2>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Program ID</dt>
                    <dd className="text-sm text-gray-900">{app.program_id || 'Not selected'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Funding Type</dt>
                    <dd className="text-sm text-gray-900">{app.funding_type || 'Not selected'}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Current State</dt>
                  <dd className="mt-1">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${stateColors[app.application_state]}`}
                    >
                      {stateLabels[app.application_state]}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="text-sm text-gray-900">{app.status}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(app.created_at).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(app.last_transition_at).toLocaleString()}
                  </dd>
                </div>
                {app.submitted_at && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Submitted</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(app.submitted_at).toLocaleString()}
                    </dd>
                  </div>
                )}
                {app.user_id && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">User ID</dt>
                    <dd className="text-sm text-gray-900 font-mono text-xs break-all">
                      {app.user_id}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* State History */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">State History</h2>
              {stateHistory.length > 0 ? (
                <div className="space-y-4">
                  {stateHistory.map((entry, index) => (
                    <div
                      key={index}
                      className="relative pl-4 border-l-2 border-gray-200 pb-4 last:pb-0"
                    >
                      <div
                        className={`absolute -left-1.5 top-0 w-3 h-3 rounded-full ${
                          index === stateHistory.length - 1
                            ? 'bg-brand-blue-600'
                            : 'bg-gray-300'
                        }`}
                      />
                      <div className="text-sm">
                        <span
                          className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${stateColors[entry.state]}`}
                        >
                          {stateLabels[entry.state]}
                        </span>
                        <p className="text-gray-500 mt-1 text-xs">
                          {entry.action} - {new Date(entry.timestamp).toLocaleString()}
                        </p>
                        {entry.notes && (
                          <p className="text-gray-600 mt-1 text-xs">{entry.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No state history available.</p>
              )}
            </div>

            {/* Application ID */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Application ID</h2>
              <p className="text-xs font-mono text-gray-600 break-all">{app.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
