import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Database, 
  Globe, 
  Server,
  ExternalLink
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'System Status | Activation Audit',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type RouteStatus = 'ACTIVE' | 'PARTIAL' | 'INACTIVE' | 'DEAD';

interface RouteAudit {
  path: string;
  name: string;
  category: string;
  status: RouteStatus;
  uiEntryPoint: string;
  dataWiring: {
    tables?: string[];
    storageBuckets?: string[];
    apiEndpoints?: string[];
  };
  blockers?: string[];
  verifiedAt: string;
  commitSha: string;
}

interface TableAudit {
  name: string;
  rowCount: number;
  hasRLS: boolean;
  status: 'ok' | 'empty' | 'error';
}

// Core routes to audit
const ROUTES_TO_AUDIT: Omit<RouteAudit, 'status' | 'verifiedAt' | 'commitSha'>[] = [
  // Auth
  { path: '/login', name: 'Login', category: 'Auth', uiEntryPoint: 'Header > Login button', dataWiring: { tables: ['profiles'], apiEndpoints: ['/api/auth'] } },
  { path: '/signup', name: 'Sign Up', category: 'Auth', uiEntryPoint: 'Header > Apply button', dataWiring: { tables: ['profiles'] } },
  { path: '/forgot-password', name: 'Forgot Password', category: 'Auth', uiEntryPoint: 'Login page link', dataWiring: { tables: ['profiles'] } },
  { path: '/admin/login', name: 'Admin Login', category: 'Auth', uiEntryPoint: 'Direct URL', dataWiring: { tables: ['profiles'] } },
  
  // Application Flow
  { path: '/apply', name: 'Apply Now', category: 'Application', uiEntryPoint: 'Header CTA, Footer', dataWiring: { tables: ['applications', 'profiles'], apiEndpoints: ['/api/apply'] } },
  { path: '/apply/student', name: 'Student Application', category: 'Application', uiEntryPoint: '/apply page', dataWiring: { tables: ['applications'] } },
  { path: '/apply/success', name: 'Application Success', category: 'Application', uiEntryPoint: 'Post-submission redirect', dataWiring: { tables: ['applications'] } },
  { path: '/enroll', name: 'Enrollment', category: 'Application', uiEntryPoint: 'Post-approval flow', dataWiring: { tables: ['enrollments', 'student_enrollments'], apiEndpoints: ['/api/enroll'] } },
  
  // Student Portal
  { path: '/student-portal', name: 'Student Portal Home', category: 'Student', uiEntryPoint: 'Footer, Header dropdown', dataWiring: { tables: ['profiles', 'enrollments'] } },
  { path: '/lms', name: 'LMS Landing', category: 'Student', uiEntryPoint: 'Footer', dataWiring: { tables: ['courses', 'enrollments'] } },
  { path: '/lms/dashboard', name: 'LMS Dashboard', category: 'Student', uiEntryPoint: 'Header after login', dataWiring: { tables: ['enrollments', 'lesson_progress'] } },
  { path: '/certificates', name: 'Certificates', category: 'Student', uiEntryPoint: 'Student nav', dataWiring: { tables: ['certificates'] } },
  
  // Partner Portal
  { path: '/partner', name: 'Partner Portal', category: 'Partner', uiEntryPoint: 'Footer', dataWiring: { tables: ['program_holders', 'partner_lms_enrollments'] } },
  { path: '/program-holder', name: 'Program Holder Portal', category: 'Partner', uiEntryPoint: 'MainNav dropdown', dataWiring: { tables: ['program_holders', 'program_holder_applications'] } },
  
  // Admin
  { path: '/admin', name: 'Admin Dashboard', category: 'Admin', uiEntryPoint: 'Footer, Direct URL', dataWiring: { tables: ['profiles', 'applications', 'enrollments'] } },
  { path: '/admin/students', name: 'Student Management', category: 'Admin', uiEntryPoint: 'Admin nav', dataWiring: { tables: ['profiles', 'enrollments'] } },
  { path: '/admin/applications', name: 'Applications', category: 'Admin', uiEntryPoint: 'Admin nav', dataWiring: { tables: ['applications'] } },
  { path: '/admin/enrollments', name: 'Enrollments', category: 'Admin', uiEntryPoint: 'Admin nav', dataWiring: { tables: ['enrollments', 'student_enrollments'] } },
  { path: '/admin/programs', name: 'Programs', category: 'Admin', uiEntryPoint: 'Admin nav', dataWiring: { tables: ['programs'] } },
  { path: '/admin/courses', name: 'Courses', category: 'Admin', uiEntryPoint: 'Admin nav', dataWiring: { tables: ['courses'] } },
  { path: '/admin/program-holders', name: 'Program Holders', category: 'Admin', uiEntryPoint: 'Admin nav', dataWiring: { tables: ['program_holders'] } },
  { path: '/admin/system-status', name: 'System Status', category: 'Admin', uiEntryPoint: 'Admin settings', dataWiring: { tables: ['profiles'] } },
  
  // Marketing/Public
  { path: '/', name: 'Homepage', category: 'Marketing', uiEntryPoint: 'Logo click', dataWiring: {} },
  { path: '/programs', name: 'Programs List', category: 'Marketing', uiEntryPoint: 'Main nav', dataWiring: { tables: ['programs'] } },
  { path: '/courses', name: 'Course Catalog', category: 'Marketing', uiEntryPoint: 'Footer', dataWiring: { tables: ['courses'] } },
  { path: '/funding', name: 'Funding Options', category: 'Marketing', uiEntryPoint: 'Main nav', dataWiring: {} },
  { path: '/about', name: 'About Us', category: 'Marketing', uiEntryPoint: 'Main nav', dataWiring: {} },
  { path: '/contact', name: 'Contact', category: 'Marketing', uiEntryPoint: 'Footer', dataWiring: {} },
  
  // Payments
  { path: '/checkout', name: 'Checkout', category: 'Payments', uiEntryPoint: 'Enrollment flow', dataWiring: { apiEndpoints: ['/api/create-checkout-session', '/api/enroll/checkout'] } },
  { path: '/donate', name: 'Donations', category: 'Payments', uiEntryPoint: 'Footer', dataWiring: { tables: ['donations'], apiEndpoints: ['/api/donations/webhook'] } },
];

// Critical tables
const CRITICAL_TABLES = [
  'profiles',
  'programs', 
  'courses',
  'applications',
  'enrollments',
  'student_enrollments',
  'certificates',
  'program_holders',
  'program_holder_applications',
  'donations',
  'partner_lms_enrollments',
  'lesson_progress',
  'marketing_contacts',
];

async function auditTables(supabase: ReturnType<typeof createClient> extends Promise<infer T> ? T : never): Promise<TableAudit[]> {
  const results: TableAudit[] = [];
  
  for (const table of CRITICAL_TABLES) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      results.push({
        name: table,
        rowCount: error ? -1 : (count || 0),
        hasRLS: true,
        status: error ? 'error' : (count && count > 0 ? 'ok' : 'empty'),
      });
    } catch {
      results.push({
        name: table,
        rowCount: -1,
        hasRLS: false,
        status: 'error',
      });
    }
  }
  
  return results;
}

function determineRouteStatus(route: typeof ROUTES_TO_AUDIT[0], tableAudits: TableAudit[]): RouteStatus {
  // Check if required tables have data
  const requiredTables = route.dataWiring.tables || [];
  if (requiredTables.length === 0) return 'ACTIVE'; // Static pages
  
  const tableStatuses = requiredTables.map(t => tableAudits.find(ta => ta.name === t));
  const hasErrors = tableStatuses.some(t => t?.status === 'error');
  const allEmpty = tableStatuses.every(t => t?.status === 'empty');
  const someEmpty = tableStatuses.some(t => t?.status === 'empty');
  
  if (hasErrors) return 'DEAD';
  if (allEmpty) return 'INACTIVE';
  if (someEmpty) return 'PARTIAL';
  return 'ACTIVE';
}

export default async function SystemStatusPage() {
  const supabase = await createClient();
  
  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/admin/login?redirect=/admin/system-status');
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
    
  if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
    redirect('/admin/login?error=unauthorized');
  }

  const timestamp = new Date().toISOString();
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_SHA || 'local-dev';
  
  // Audit tables
  const tableAudits = await auditTables(supabase);
  
  // Audit routes
  const routeAudits: RouteAudit[] = ROUTES_TO_AUDIT.map(route => ({
    ...route,
    status: determineRouteStatus(route, tableAudits),
    verifiedAt: timestamp,
    commitSha: commitSha.slice(0, 8),
  }));
  
  // Environment check
  const envStatus = {
    SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    STRIPE_SECRET: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
    OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
  };
  
  // Summary stats
  const activeRoutes = routeAudits.filter(r => r.status === 'ACTIVE').length;
  const partialRoutes = routeAudits.filter(r => r.status === 'PARTIAL').length;
  const inactiveRoutes = routeAudits.filter(r => r.status === 'INACTIVE').length;
  const deadRoutes = routeAudits.filter(r => r.status === 'DEAD').length;
  
  const tablesOk = tableAudits.filter(t => t.status === 'ok').length;
  const tablesEmpty = tableAudits.filter(t => t.status === 'empty').length;
  const tablesError = tableAudits.filter(t => t.status === 'error').length;
  
  // Group routes by category
  const routesByCategory = routeAudits.reduce((acc, route) => {
    if (!acc[route.category]) acc[route.category] = [];
    acc[route.category].push(route);
    return acc;
  }, {} as Record<string, RouteAudit[]>);

  const statusColors: Record<RouteStatus, string> = {
    ACTIVE: 'bg-green-500/20 text-green-400 border-green-500/30',
    PARTIAL: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    INACTIVE: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    DEAD: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const statusIcons: Record<RouteStatus, typeof CheckCircle> = {
    ACTIVE: CheckCircle,
    PARTIAL: AlertTriangle,
    INACTIVE: XCircle,
    DEAD: XCircle,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">System Status - Activation Audit</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span>Last Verified: {new Date(timestamp).toLocaleString()}</span>
            <span>Commit: {commitSha.slice(0, 8)}</span>
            <span>Environment: {process.env.NODE_ENV}</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{activeRoutes}</div>
            <div className="text-sm text-gray-400">ACTIVE</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">{partialRoutes}</div>
            <div className="text-sm text-gray-400">PARTIAL</div>
          </div>
          <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-400">{inactiveRoutes}</div>
            <div className="text-sm text-gray-400">INACTIVE</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">{deadRoutes}</div>
            <div className="text-sm text-gray-400">DEAD</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{tablesOk}/{CRITICAL_TABLES.length}</div>
            <div className="text-sm text-gray-400">Tables OK</div>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Server className="w-5 h-5" />
            Environment Configuration
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(envStatus).map(([key, configured]) => (
              <div key={key} className="flex items-center gap-2">
                {configured ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                <span className={configured ? 'text-green-400' : 'text-red-400'}>
                  {key.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Database Tables */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Database Tables ({tablesOk} active, {tablesEmpty} empty, {tablesError} errors)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {tableAudits.map((table) => (
              <div 
                key={table.name}
                className={`p-3 rounded-lg border ${
                  table.status === 'ok' 
                    ? 'border-green-500/30 bg-green-500/10' 
                    : table.status === 'empty'
                    ? 'border-yellow-500/30 bg-yellow-500/10'
                    : 'border-red-500/30 bg-red-500/10'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {table.status === 'ok' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : table.status === 'empty' ? (
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span className="font-mono text-sm truncate">{table.name}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {table.rowCount >= 0 ? `${table.rowCount} rows` : 'Error'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Routes by Category */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Route Inventory ({routeAudits.length} routes audited)
          </h2>
          
          {Object.entries(routesByCategory).map(([category, routes]) => (
            <div key={category} className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4">{category} ({routes.length})</h3>
              <div className="space-y-3">
                {routes.map((route) => {
                  const StatusIcon = statusIcons[route.status];
                  return (
                    <div 
                      key={route.path}
                      className={`p-4 rounded-lg border ${statusColors[route.status]}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <StatusIcon className="w-4 h-4" />
                            <span className="font-medium">{route.name}</span>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${statusColors[route.status]}`}>
                              {route.status}
                            </span>
                          </div>
                          <div className="text-sm font-mono text-gray-400 mb-2">{route.path}</div>
                          <div className="text-xs text-gray-500">
                            <span className="mr-4">UI: {route.uiEntryPoint}</span>
                            {route.dataWiring.tables && route.dataWiring.tables.length > 0 && (
                              <span>Tables: {route.dataWiring.tables.join(', ')}</span>
                            )}
                          </div>
                        </div>
                        <a 
                          href={route.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Visit <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* JSON Export Link */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <a 
            href="/system-status.json" 
            className="text-blue-400 hover:text-blue-300"
          >
            Download JSON Export →
          </a>
          <p className="text-gray-500 text-sm mt-2">
            Generated: {timestamp} | Commit: {commitSha.slice(0, 8)}
          </p>
        </div>
      </div>
    </div>
  );
}
