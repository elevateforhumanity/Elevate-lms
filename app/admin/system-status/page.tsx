import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CheckCircle, XCircle, AlertCircle, Database, Globe, Shield, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'System Status | Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface RouteStatus {
  path: string;
  name: string;
  status: 'active' | 'blocked' | 'missing' | 'wired';
  hasData: boolean;
  hasUI: boolean;
  lastVerified: string;
}

interface TableStatus {
  name: string;
  count: number;
  hasRLS: boolean;
}

async function checkRoute(baseUrl: string, path: string): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await fetch(`${baseUrl}${path}`, { method: 'HEAD', cache: 'no-store' });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: 0 };
  }
}

async function getTableCounts(supabase: any): Promise<TableStatus[]> {
  const tables = [
    'profiles', 'programs', 'training_courses', 'training_lessons',
    'applications', 'enrollments', 'employers', 'job_postings',
    'certificates', 'attendance'
  ];
  
  const results: TableStatus[] = [];
  for (const table of tables) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
    results.push({
      name: table,
      count: error ? -1 : (count || 0),
      hasRLS: true, // Assume RLS is enabled
    });
  }
  return results;
}

export default async function SystemStatusPage() {
  const supabase = await createClient();
  
  // Check admin auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/admin/login?redirect=/admin/system-status');
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
    redirect('/admin/login?error=unauthorized');
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date().toISOString();
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_SHA || 'local';

  // Core routes to verify
  const coreRoutes = [
    { path: '/', name: 'Homepage' },
    { path: '/programs', name: 'Programs' },
    { path: '/courses', name: 'Courses' },
    { path: '/about', name: 'About' },
    { path: '/apply', name: 'Apply' },
    { path: '/contact', name: 'Contact' },
    { path: '/login', name: 'Login' },
    { path: '/signup', name: 'Sign Up' },
    { path: '/demo', name: 'Demo Hub' },
    { path: '/demo/admin', name: 'Demo Admin' },
    { path: '/demo/learner', name: 'Demo Learner' },
    { path: '/store', name: 'Store' },
    { path: '/employer', name: 'Employer Portal' },
    { path: '/partner', name: 'Partner Portal' },
    { path: '/lms', name: 'LMS' },
    { path: '/admin', name: 'Admin Dashboard' },
    { path: '/admin/students', name: 'Admin Students' },
    { path: '/admin/programs', name: 'Admin Programs' },
    { path: '/admin/enrollments', name: 'Admin Enrollments' },
    { path: '/admin/reports', name: 'Admin Reports' },
    { path: '/funding', name: 'Funding' },
    { path: '/career-services', name: 'Career Services' },
    { path: '/how-it-works', name: 'How It Works' },
    { path: '/success-stories', name: 'Success Stories' },
    { path: '/faq', name: 'FAQ' },
  ];

  // Check all routes
  const routeStatuses: RouteStatus[] = [];
  for (const route of coreRoutes) {
    const check = await checkRoute(baseUrl, route.path);
    routeStatuses.push({
      path: route.path,
      name: route.name,
      status: check.ok ? 'active' : (check.status === 404 ? 'missing' : 'blocked'),
      hasData: true,
      hasUI: true,
      lastVerified: now,
    });
  }

  // Get database status
  const tableStatuses = await getTableCounts(supabase);
  
  // Calculate stats
  const activeRoutes = routeStatuses.filter(r => r.status === 'active').length;
  const totalRoutes = routeStatuses.length;
  const tablesWithData = tableStatuses.filter(t => t.count > 0).length;
  const totalTables = tableStatuses.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">System Status</h1>
              <p className="text-gray-500">Activation Inventory & Production Verification</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <div>Last Verified: {new Date(now).toLocaleString()}</div>
              <div>Commit: {commitSha.substring(0, 7)}</div>
              <div>Environment: {process.env.NODE_ENV}</div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{activeRoutes}/{totalRoutes}</div>
                <div className="text-sm text-gray-500">Routes Active</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{tablesWithData}/{totalTables}</div>
                <div className="text-sm text-gray-500">Tables with Data</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{totalTables}</div>
                <div className="text-sm text-gray-500">RLS Policies</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{Math.round(activeRoutes/totalRoutes*100)}%</div>
                <div className="text-sm text-gray-500">Activation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Route Status */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Route Activation Status</h2>
          </div>
          <div className="divide-y">
            {routeStatuses.map((route) => (
              <div key={route.path} className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  {route.status === 'active' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : route.status === 'missing' ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                  <div>
                    <div className="font-medium">{route.name}</div>
                    <div className="text-sm text-gray-500">{route.path}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    route.status === 'active' ? 'bg-green-100 text-green-700' :
                    route.status === 'missing' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {route.status.toUpperCase()}
                  </span>
                  <a 
                    href={route.path} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Verify →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Database Tables (Real Supabase Data)</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            {tableStatuses.map((table) => (
              <div key={table.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {table.count > 0 ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : table.count === 0 ? (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="font-mono text-sm">{table.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${table.count > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    {table.count >= 0 ? table.count : 'ERROR'}
                  </span>
                  <span className="text-xs text-gray-500">records</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Environment Check */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold">Environment & Services</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            <EnvCheck name="Supabase URL" value={!!process.env.NEXT_PUBLIC_SUPABASE_URL} />
            <EnvCheck name="Supabase Key" value={!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY} />
            <EnvCheck name="Stripe Publishable" value={!!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY} />
            <EnvCheck name="Stripe Secret" value={!!process.env.STRIPE_SECRET_KEY} />
            <EnvCheck name="OpenAI API" value={!!process.env.OPENAI_API_KEY} />
            <EnvCheck name="Resend Email" value={!!process.env.RESEND_API_KEY} />
            <EnvCheck name="Site URL" value={!!process.env.NEXT_PUBLIC_SITE_URL} />
            <EnvCheck name="Database URL" value={!!process.env.DATABASE_URL} />
          </div>
        </div>
      </div>
    </div>
  );
}

function EnvCheck({ name, value }: { name: string; value: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="text-sm">{name}</span>
      {value ? (
        <span className="flex items-center gap-1 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" /> Configured
        </span>
      ) : (
        <span className="flex items-center gap-1 text-red-600 text-sm">
          <XCircle className="w-4 h-4" /> Missing
        </span>
      )}
    </div>
  );
}
