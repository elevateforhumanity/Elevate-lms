import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/admin/applications',
  },
  title: 'Applications | Elevate For Humanity',
  description: 'Manage career applications',
};

type ApplicationState = 'started' | 'eligibility_complete' | 'documents_complete' | 'review_ready' | 'submitted' | 'rejected';

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
  created_at: string;
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
  started: 'bg-gray-100 text-gray-800',
  eligibility_complete: 'bg-blue-100 text-blue-800',
  documents_complete: 'bg-indigo-100 text-indigo-800',
  review_ready: 'bg-yellow-100 text-yellow-800',
  submitted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string; search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Applications" }]} />
        </div>
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

  // Build query for career_applications
  let query = supabase
    .from('career_applications')
    .select('id, user_id, first_name, last_name, email, phone, application_state, status, submitted_at, last_transition_at, created_at', { count: 'exact' })
    .order('created_at', { ascending: false });

  // Filter by state if provided
  const stateFilter = params.state;
  if (stateFilter && stateFilter !== 'all') {
    query = query.eq('application_state', stateFilter);
  }

  // Search by name or email
  const searchTerm = params.search;
  if (searchTerm) {
    query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);
  }

  // Pagination
  const page = parseInt(params.page || '1', 10);
  const pageSize = 25;
  const offset = (page - 1) * pageSize;
  query = query.range(offset, offset + pageSize - 1);

  const { data: applications, count: totalCount, error } = await query;

  // Get counts by state using independent aggregate queries (not affected by pagination/filters)
  const stateCountPromises = (['started', 'eligibility_complete', 'documents_complete', 'review_ready', 'submitted', 'rejected'] as ApplicationState[]).map(
    async (state) => {
      const { count } = await supabase
        .from('career_applications')
        .select('*', { count: 'exact', head: true })
        .eq('application_state', state);
      return { state, count: count || 0 };
    }
  );
  
  const stateCountResults = await Promise.all(stateCountPromises);
  const stateCounts: Record<string, number> = {};
  stateCountResults.forEach(({ state, count }) => {
    stateCounts[state] = count;
  });

  // Get total count independently (not affected by filters)
  const { count: totalApplications } = await supabase
    .from('career_applications')
    .select('*', { count: 'exact', head: true });

  const totalPages = Math.ceil((totalCount || 0) / pageSize);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Applications" }]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Career Applications</h1>
          <Link
            href="/admin/dashboard"
            className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <h3 className="text-xs font-medium text-gray-500 uppercase">Total</h3>
            <p className="text-2xl font-bold text-gray-900">{totalApplications || 0}</p>
          </div>
          {(['started', 'eligibility_complete', 'documents_complete', 'review_ready', 'submitted', 'rejected'] as ApplicationState[]).map((state) => (
            <div key={state} className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase">{stateLabels[state]}</h3>
              <p className="text-2xl font-bold text-gray-900">{stateCounts?.[state] || 0}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <form method="GET" className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                name="search"
                defaultValue={searchTerm || ''}
                placeholder="Name or email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500"
              />
            </div>
            <div className="w-48">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                id="state"
                name="state"
                defaultValue={stateFilter || 'all'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500"
              >
                <option value="all">All States</option>
                {(['started', 'eligibility_complete', 'documents_complete', 'review_ready', 'submitted', 'rejected'] as ApplicationState[]).map((state) => (
                  <option key={state} value={state}>{stateLabels[state]}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 transition-colors"
            >
              Filter
            </button>
            <Link
              href="/admin/applications"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear
            </Link>
          </form>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {error ? (
            <div className="p-8 text-center text-red-600">
              Error loading applications: {error.message}
            </div>
          ) : applications && applications.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        State
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {applications.map((app: CareerApplication) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {app.first_name} {app.last_name}
                          </div>
                          {app.phone && (
                            <div className="text-sm text-gray-500">{app.phone}</div>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                          {app.email}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${stateColors[app.application_state]}`}>
                            {stateLabels[app.application_state]}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                          {app.status}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(app.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(app.last_transition_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <Link
                            href={`/admin/applications/${app.id}`}
                            className="text-brand-blue-600 hover:text-brand-blue-800 text-sm font-medium"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing {offset + 1} to {Math.min(offset + pageSize, totalCount || 0)} of {totalCount} applications
                  </div>
                  <div className="flex gap-2">
                    {page > 1 && (
                      <Link
                        href={`/admin/applications?page=${page - 1}${stateFilter ? `&state=${stateFilter}` : ''}${searchTerm ? `&search=${searchTerm}` : ''}`}
                        className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                      >
                        Previous
                      </Link>
                    )}
                    <span className="px-3 py-1 text-sm text-gray-600">
                      Page {page} of {totalPages}
                    </span>
                    {page < totalPages && (
                      <Link
                        href={`/admin/applications?page=${page + 1}${stateFilter ? `&state=${stateFilter}` : ''}${searchTerm ? `&search=${searchTerm}` : ''}`}
                        className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No applications found{searchTerm || stateFilter ? ' matching your filters' : ''}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
