import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';
import { CheckCircle, Clock, XCircle, Eye } from 'lucide-react';

export const metadata = {
  title: 'Employer Onboarding Review | Admin',
};

export default async function EmployerOnboardingReview() {
  const supabase = createAdminClient();

  const { data: onboardings } = await supabase
    .from('employer_onboarding')
    .select('*')
    .order('created_at', { ascending: false });

  const statusColors: Record<string, string> = {
    submitted: 'bg-yellow-100 text-yellow-800',
    reviewed: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const statusIcons: Record<string, unknown> = {
    submitted: Clock,
    reviewed: Eye,
    approved: CheckCircle,
    rejected: XCircle,
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Employer Onboarding Review
          </h1>
          <p className="text-slate-600">
            Review and approve employer applications
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">
                    Business Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">
                    Submitted
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {onboardings?.map((onboarding) => {
                  const StatusIcon = statusIcons[onboarding.status] || Clock;
                  return (
                    <tr key={onboarding.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {onboarding.business_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {onboarding.contact_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {onboarding.contact_email}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {onboarding.contact_phone}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                            statusColors[onboarding.status] ||
                            'bg-slate-100 text-slate-800'
                          }`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {onboarding.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {new Date(onboarding.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/employers/onboarding/${onboarding.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Review →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!onboardings || onboardings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600">
                No employer onboarding submissions yet
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
