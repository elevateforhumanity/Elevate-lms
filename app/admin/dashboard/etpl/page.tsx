import {
  getEtplMetrics,
  getFundingMetrics,
  getEmployerMetrics,
  getRapidsMetrics,
  getWotcMetrics,
} from '@/lib/metrics';
import Link from 'next/link';
import {
  Users,
  DollarSign,
  Briefcase,
  Award,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Download,
} from 'lucide-react';

export const metadata = {
  title: 'ETPL Performance Dashboard | Admin',
};

export default async function EtplDashboard() {
  const etpl = await getEtplMetrics();
  const funding = await getFundingMetrics();
  const employers = await getEmployerMetrics();
  const rapids = await getRapidsMetrics();
  const wotc = await getWotcMetrics();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              ETPL Performance Dashboard
            </h1>
            <p className="text-slate-600">
              Real-time metrics for DWD and WorkOne reporting
            </p>
          </div>
          <Link
            href="/api/audit/export"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            <Download className="w-5 h-5" />
            Export Audit CSV
          </Link>
        </div>

        {/* ETPL Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Apprentice Enrollment & Outcomes
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">
                    {etpl.total}
                  </div>
                  <div className="text-sm text-slate-600">
                    Total Enrollments
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">
                    {etpl.active}
                  </div>
                  <div className="text-sm text-slate-600">Active</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">
                    {etpl.completed}
                  </div>
                  <div className="text-sm text-slate-600">Completed</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">
                    {etpl.retention}%
                  </div>
                  <div className="text-sm text-slate-600">Retention Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Funding Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Funding & ITA Status
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {funding.totalCases}
                  </div>
                  <div className="text-sm text-slate-600">Total Cases</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {funding.approved}
              </div>
              <div className="text-sm text-slate-600">Approved</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {funding.pending}
              </div>
              <div className="text-sm text-slate-600">Pending</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-slate-900 mb-1">
                ${funding.totalApproved.toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Total Approved</div>
            </div>
          </div>

          <div className="mt-4 bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-slate-900 mb-3">By Funding Source</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {Object.entries(funding.bySource).map(([source, count]: any) => (
                <div key={source} className="bg-slate-50 rounded-lg p-4">
                  <div className="text-xl font-bold text-slate-900">
                    {count as number}
                  </div>
                  <div className="text-sm text-slate-600">{source}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Employer & RAPIDS Metrics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Employer Onboarding
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Submissions</span>
                <span className="font-bold text-slate-900">
                  {employers.total}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Approved</span>
                <span className="font-bold text-green-600">
                  {employers.approved}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Pending Review</span>
                <span className="font-bold text-yellow-600">
                  {employers.pending}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-slate-900">
                RAPIDS Tracking
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Tracked</span>
                <span className="font-bold text-slate-900">{rapids.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Registered</span>
                <span className="font-bold text-blue-600">
                  {rapids.registered}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Active</span>
                <span className="font-bold text-green-600">
                  {rapids.active}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Completed</span>
                <span className="font-bold text-purple-600">
                  {rapids.completed}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* WOTC Alerts */}
        {wotc.urgent > 0 && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-brand-orange-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-2">
                  WOTC Deadline Alert
                </h3>
                <p className="text-red-800 mb-4">
                  <strong>{wotc.urgent}</strong> apprentice(s) have WOTC
                  deadlines within 5 days. Submit forms immediately to preserve
                  tax credits.
                </p>
                <Link
                  href="/admin/wotc"
                  className="inline-flex items-center gap-2 bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  View WOTC Dashboard →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/admin/employers/onboarding"
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
          >
            <h3 className="font-bold text-slate-900 mb-2">
              Review Employer Applications
            </h3>
            <p className="text-sm text-slate-600">
              {employers.pending} pending review
            </p>
          </Link>

          <Link
            href="/admin/funding"
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
          >
            <h3 className="font-bold text-slate-900 mb-2">Funding Cases</h3>
            <p className="text-sm text-slate-600">
              {funding.pending} pending approval
            </p>
          </Link>

          <Link
            href="/admin/rapids"
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
          >
            <h3 className="font-bold text-slate-900 mb-2">RAPIDS Tracking</h3>
            <p className="text-sm text-slate-600">
              {rapids.total} apprentices tracked
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
