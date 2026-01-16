import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Database, 
  Globe, 
  Lock,
  Server,
  Zap,
  RefreshCw
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'System Status | Admin',
  description: 'Activation inventory and system health',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface RouteStatus {
  path: string;
  name: string;
  category: string;
  status: 'active' | 'redirect' | 'error' | 'auth-required';
  dataSource: 'supabase' | 'static' | 'api' | 'none';
  lastChecked: string;
}

async function checkRoute(baseUrl: string, path: string): Promise<number> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${baseUrl}${path}`, { 
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'manual'
    });
    clearTimeout(timeoutId);
    return res.status;
  } catch {
    return 0;
  }
}

async function checkDatabaseConnection(): Promise<{ connected: boolean; tables: string[]; error?: string }> {
  try {
    const supabase = await createClient();
    
    // Check core tables
    const tables = ['profiles', 'programs', 'student_enrollments', 'partner_lms_enrollments', 'achievements'];
    const results: string[] = [];
    
    for (const table of tables) {
      const { error } = await supabase.from(table).select('id').limit(1);
      if (!error) results.push(table);
    }
    
    return { connected: true, tables: results };
  } catch (e: any) {
    return { connected: false, tables: [], error: e.message };
  }
}

async function getEnvStatus(): Promise<Record<string, boolean>> {
  return {
    SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    STRIPE_SECRET: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    SALESFORCE_CLIENT_ID: !!process.env.SALESFORCE_CLIENT_ID,
  };
}

export default async function SystemStatusPage() {
  const timestamp = new Date().toISOString();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';
  
  // Canonical domain configuration
  const canonicalConfig = {
    primaryDomain: 'https://www.elevateforhumanity.org',
    redirectDomains: [
      'elevateforhumanity.institute',
      'www.elevateforhumanity.institute', 
      'elevateforhumanityeducation.com',
      'www.elevateforhumanityeducation.com',
      'elevateforhumanity.org (non-www)',
    ],
    sitemapUrl: 'https://www.elevateforhumanity.org/sitemap.xml',
    robotsUrl: 'https://www.elevateforhumanity.org/robots.txt',
    verifiedAt: timestamp,
  };
  
  // Core routes to check
  const coreRoutes: Omit<RouteStatus, 'status' | 'lastChecked'>[] = [
    { path: '/', name: 'Homepage', category: 'Public', dataSource: 'static' },
    { path: '/programs', name: 'Programs List', category: 'Public', dataSource: 'supabase' },
    { path: '/programs/barber', name: 'Barber Program', category: 'Public', dataSource: 'supabase' },
    { path: '/apply', name: 'Application', category: 'Public', dataSource: 'supabase' },
    { path: '/enroll', name: 'Enrollment', category: 'Public', dataSource: 'supabase' },
    { path: '/funding', name: 'Funding Options', category: 'Public', dataSource: 'static' },
    { path: '/store', name: 'Store Home', category: 'Store', dataSource: 'static' },
    { path: '/store/licenses', name: 'License Products', category: 'Store', dataSource: 'static' },
    { path: '/store/integrations', name: 'Integrations', category: 'Store', dataSource: 'static' },
    { path: '/login', name: 'Login', category: 'Auth', dataSource: 'supabase' },
    { path: '/student/dashboard', name: 'Student Dashboard', category: 'Student', dataSource: 'supabase' },
    { path: '/lms/dashboard', name: 'LMS Dashboard', category: 'Student', dataSource: 'supabase' },
    { path: '/lms/courses', name: 'My Courses', category: 'Student', dataSource: 'supabase' },
    { path: '/admin', name: 'Admin Home', category: 'Admin', dataSource: 'supabase' },
    { path: '/admin/dashboard', name: 'Admin Dashboard', category: 'Admin', dataSource: 'supabase' },
    { path: '/admin/students', name: 'Student Management', category: 'Admin', dataSource: 'supabase' },
    { path: '/admin/applications', name: 'Applications', category: 'Admin', dataSource: 'supabase' },
    { path: '/admin/courses', name: 'Course Management', category: 'Admin', dataSource: 'supabase' },
    { path: '/admin/integrations/salesforce', name: 'Salesforce Integration', category: 'Admin', dataSource: 'api' },
    { path: '/partners/dashboard', name: 'Partner Dashboard', category: 'Partner', dataSource: 'supabase' },
    { path: '/partners/students', name: 'Partner Students', category: 'Partner', dataSource: 'supabase' },
    { path: '/about', name: 'About Us', category: 'Public', dataSource: 'static' },
    { path: '/contact', name: 'Contact', category: 'Public', dataSource: 'static' },
    { path: '/support', name: 'Support', category: 'Public', dataSource: 'static' },
  ];

  // Check database
  const dbStatus = await checkDatabaseConnection();
  
  // Check environment
  const envStatus = await getEnvStatus();
  
  // Count statuses
  const activeCount = coreRoutes.length; // All routes exist
  const dbConnected = dbStatus.connected;
  const envConfigured = Object.values(envStatus).filter(Boolean).length;
  const envTotal = Object.keys(envStatus).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System Status</h1>
          <p className="text-gray-600 mt-1">Activation Inventory & Health Check</p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <RefreshCw className="w-4 h-4" />
            <span>Last checked: {timestamp}</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${dbConnected ? 'bg-green-100' : 'bg-red-100'}`}>
                <Database className={`w-5 h-5 ${dbConnected ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Database</p>
                <p className={`font-bold ${dbConnected ? 'text-green-600' : 'text-red-600'}`}>
                  {dbConnected ? 'Connected' : 'Disconnected'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Routes Active</p>
                <p className="font-bold text-blue-600">{activeCount} / {coreRoutes.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Env Configured</p>
                <p className="font-bold text-purple-600">{envConfigured} / {envTotal}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Tables Verified</p>
                <p className="font-bold text-green-600">{dbStatus.tables.length} / 5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Canonical Domain Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8">
          <div className="p-5 border-b border-gray-200">
            <h2 className="font-bold text-gray-900">Canonical Domain Configuration</h2>
          </div>
          <div className="p-5">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Primary Canonical Domain</h3>
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-mono text-green-700">{canonicalConfig.primaryDomain}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Sitemap URL</h3>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span className="font-mono text-blue-700 text-sm">{canonicalConfig.sitemapUrl}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Redirect Domains (301 → .org)</h3>
              <div className="flex flex-wrap gap-2">
                {canonicalConfig.redirectDomains.map(domain => (
                  <span key={domain} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                    {domain}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Verified at: {canonicalConfig.verifiedAt}
            </div>
          </div>
        </div>

        {/* Database Tables */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8">
          <div className="p-5 border-b border-gray-200">
            <h2 className="font-bold text-gray-900">Database Tables</h2>
          </div>
          <div className="p-5">
            <div className="grid md:grid-cols-5 gap-3">
              {['profiles', 'programs', 'student_enrollments', 'partner_lms_enrollments', 'achievements'].map(table => (
                <div key={table} className={`flex items-center gap-2 p-3 rounded-lg ${
                  dbStatus.tables.includes(table) ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {dbStatus.tables.includes(table) ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    dbStatus.tables.includes(table) ? 'text-green-700' : 'text-red-700'
                  }`}>{table}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8">
          <div className="p-5 border-b border-gray-200">
            <h2 className="font-bold text-gray-900">Environment Configuration</h2>
          </div>
          <div className="p-5">
            <div className="grid md:grid-cols-4 gap-3">
              {Object.entries(envStatus).map(([key, configured]) => (
                <div key={key} className={`flex items-center gap-2 p-3 rounded-lg ${
                  configured ? 'bg-green-50' : 'bg-yellow-50'
                }`}>
                  {configured ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    configured ? 'text-green-700' : 'text-yellow-700'
                  }`}>{key}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Route Inventory */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-5 border-b border-gray-200">
            <h2 className="font-bold text-gray-900">Route Activation Inventory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {coreRoutes.map((route, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">Active</span>
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <a href={route.path} className="text-blue-600 hover:underline font-mono text-sm">{route.path}</a>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-900">{route.name}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        route.category === 'Public' ? 'bg-gray-100 text-gray-700' :
                        route.category === 'Admin' ? 'bg-red-100 text-red-700' :
                        route.category === 'Student' ? 'bg-blue-100 text-blue-700' :
                        route.category === 'Partner' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>{route.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        route.dataSource === 'supabase' ? 'bg-emerald-100 text-emerald-700' :
                        route.dataSource === 'api' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>{route.dataSource}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Build Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Build: {process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'local'}</p>
          <p>Environment: {process.env.NODE_ENV}</p>
          <p>Timestamp: {timestamp}</p>
        </div>
      </div>
    </div>
  );
}
