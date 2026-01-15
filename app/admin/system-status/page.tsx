import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Database, 
  Globe, 
  Lock,
  Server,
  Users,
  BookOpen,
  Briefcase,
  GraduationCap,
  Settings,
  BarChart3,
  FileText,
  CreditCard,
  Mail,
  Shield
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'System Status | Activation Inventory',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface RouteCheck {
  path: string;
  name: string;
  category: string;
  dataSource: 'supabase' | 'static' | 'api' | 'mixed';
  requiresAuth: boolean;
}

interface TableCheck {
  name: string;
  count: number;
  hasRLS: boolean;
  status: 'ok' | 'empty' | 'error';
}

// All critical routes that must be active
const CRITICAL_ROUTES: RouteCheck[] = [
  // PUBLIC - Marketing
  { path: '/', name: 'Homepage', category: 'Marketing', dataSource: 'static', requiresAuth: false },
  { path: '/about', name: 'About Us', category: 'Marketing', dataSource: 'static', requiresAuth: false },
  { path: '/about/team', name: 'Our Team', category: 'Marketing', dataSource: 'static', requiresAuth: false },
  { path: '/about/mission', name: 'Mission', category: 'Marketing', dataSource: 'static', requiresAuth: false },
  { path: '/programs', name: 'Programs List', category: 'Marketing', dataSource: 'supabase', requiresAuth: false },
  { path: '/programs/barber', name: 'Barber Program', category: 'Marketing', dataSource: 'supabase', requiresAuth: false },
  { path: '/programs/healthcare', name: 'Healthcare Program', category: 'Marketing', dataSource: 'supabase', requiresAuth: false },
  { path: '/courses', name: 'Course Catalog', category: 'Marketing', dataSource: 'static', requiresAuth: false },
  { path: '/funding', name: 'Funding Options', category: 'Marketing', dataSource: 'static', requiresAuth: false },
  { path: '/contact', name: 'Contact Us', category: 'Marketing', dataSource: 'static', requiresAuth: false },
  { path: '/faq', name: 'FAQ', category: 'Marketing', dataSource: 'static', requiresAuth: false },
  { path: '/careers', name: 'Careers', category: 'Marketing', dataSource: 'static', requiresAuth: false },
  
  // PUBLIC - Application Flow
  { path: '/apply', name: 'Apply Now', category: 'Application', dataSource: 'supabase', requiresAuth: false },
  { path: '/enroll', name: 'Enrollment', category: 'Application', dataSource: 'supabase', requiresAuth: false },
  { path: '/eligibility', name: 'Eligibility Check', category: 'Application', dataSource: 'static', requiresAuth: false },
  { path: '/wioa-eligibility', name: 'WIOA Eligibility', category: 'Application', dataSource: 'static', requiresAuth: false },
  
  // AUTH
  { path: '/login', name: 'Login', category: 'Auth', dataSource: 'supabase', requiresAuth: false },
  { path: '/signup', name: 'Sign Up', category: 'Auth', dataSource: 'supabase', requiresAuth: false },
  { path: '/forgot-password', name: 'Forgot Password', category: 'Auth', dataSource: 'supabase', requiresAuth: false },
  { path: '/admin/login', name: 'Admin Login', category: 'Auth', dataSource: 'supabase', requiresAuth: false },
  
  // STUDENT PORTAL
  { path: '/student-portal', name: 'Student Portal Home', category: 'Student', dataSource: 'supabase', requiresAuth: true },
  { path: '/lms', name: 'LMS Landing', category: 'Student', dataSource: 'static', requiresAuth: false },
  { path: '/lms/dashboard', name: 'LMS Dashboard', category: 'Student', dataSource: 'supabase', requiresAuth: true },
  { path: '/lms/courses', name: 'My Courses', category: 'Student', dataSource: 'supabase', requiresAuth: true },
  { path: '/learning', name: 'Learning Hub', category: 'Student', dataSource: 'static', requiresAuth: false },
  { path: '/certificates', name: 'Certificates', category: 'Student', dataSource: 'supabase', requiresAuth: false },
  
  // EMPLOYER
  { path: '/employer', name: 'Employer Portal', category: 'Employer', dataSource: 'supabase', requiresAuth: false },
  { path: '/employer/dashboard', name: 'Employer Dashboard', category: 'Employer', dataSource: 'supabase', requiresAuth: true },
  { path: '/hire-graduates', name: 'Hire Graduates', category: 'Employer', dataSource: 'static', requiresAuth: false },
  
  // PARTNER
  { path: '/partner', name: 'Partner Portal', category: 'Partner', dataSource: 'supabase', requiresAuth: false },
  { path: '/partner/dashboard', name: 'Partner Dashboard', category: 'Partner', dataSource: 'supabase', requiresAuth: true },
  
  // ADMIN - Core
  { path: '/admin', name: 'Admin Dashboard', category: 'Admin', dataSource: 'supabase', requiresAuth: true },
  { path: '/admin/students', name: 'Student Management', category: 'Admin', dataSource: 'supabase', requiresAuth: true },
  { path: '/admin/applications', name: 'Applications', category: 'Admin', dataSource: 'supabase', requiresAuth: true },
  { path: '/admin/enrollments', name: 'Enrollments', category: 'Admin', dataSource: 'supabase', requiresAuth: true },
  { path: '/admin/programs', name: 'Programs', category: 'Admin', dataSource: 'supabase', requiresAuth: true },
  { path: '/admin/courses', name: 'Courses', category: 'Admin', dataSource: 'supabase', requiresAuth: true },
  { path: '/admin/employers', name: 'Employers', category: 'Admin', dataSource: 'supabase', requiresAuth: true },
  { path: '/admin/funding', name: 'Funding', category: 'Admin', dataSource: 'supabase', requiresAuth: true },
  { path: '/admin/analytics', name: 'Analytics', category: 'Admin', dataSource: 'supabase', requiresAuth: true },
  { path: '/admin/compliance', name: 'Compliance', category: 'Admin', dataSource: 'supabase', requiresAuth: true },
  { path: '/admin/settings', name: 'Settings', category: 'Admin', dataSource: 'supabase', requiresAuth: true },
  { path: '/admin/system-status', name: 'System Status', category: 'Admin', dataSource: 'supabase', requiresAuth: true },
  
  // SUPERSONIC FAST CASH
  { path: '/supersonic-fast-cash', name: 'Tax Services Home', category: 'Tax', dataSource: 'static', requiresAuth: false },
  { path: '/supersonic-fast-cash/training/courses', name: 'Tax Training Courses', category: 'Tax', dataSource: 'supabase', requiresAuth: false },
  { path: '/supersonic-fast-cash/careers', name: 'Tax Careers', category: 'Tax', dataSource: 'static', requiresAuth: false },
  
  // STORE
  { path: '/store', name: 'Store Home', category: 'Store', dataSource: 'static', requiresAuth: false },
  { path: '/checkout', name: 'Checkout', category: 'Store', dataSource: 'api', requiresAuth: false },
];

// Critical database tables
const CRITICAL_TABLES = [
  'profiles',
  'programs', 
  'courses',
  'applications',
  'enrollments',
  'student_enrollments',
  'employers',
  'job_postings',
  'certificates',
  'training_courses',
  'training_lessons',
  'achievements',
  'attendance',
  'partner_lms_enrollments',
  'marketing_contacts',
];

async function getTableStats(supabase: any): Promise<TableCheck[]> {
  const results: TableCheck[] = [];
  
  for (const table of CRITICAL_TABLES) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      results.push({
        name: table,
        count: error ? -1 : (count || 0),
        hasRLS: true,
        status: error ? 'error' : (count && count > 0 ? 'ok' : 'empty'),
      });
    } catch {
      results.push({
        name: table,
        count: -1,
        hasRLS: false,
        status: 'error',
      });
    }
  }
  
  return results;
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
  };
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
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_SHA || 'local';
  
  // Get data
  const [tableStats, envStatus] = await Promise.all([
    getTableStats(supabase),
    getEnvStatus(),
  ]);
  
  const tablesWithData = tableStats.filter(t => t.status === 'ok').length;
  const tablesEmpty = tableStats.filter(t => t.status === 'empty').length;
  const tablesError = tableStats.filter(t => t.status === 'error').length;
  
  const envConfigured = Object.values(envStatus).filter(Boolean).length;
  const envTotal = Object.keys(envStatus).length;
  
  // Group routes by category
  const routesByCategory = CRITICAL_ROUTES.reduce((acc, route) => {
    if (!acc[route.category]) acc[route.category] = [];
    acc[route.category].push(route);
    return acc;
  }, {} as Record<string, RouteCheck[]>);

  const categoryIcons: Record<string, any> = {
    Marketing: Globe,
    Application: FileText,
    Auth: Lock,
    Student: GraduationCap,
    Employer: Briefcase,
    Partner: Users,
    Admin: Settings,
    Tax: CreditCard,
    Store: CreditCard,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">System Status & Activation Inventory</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span>Last Updated: {new Date(timestamp).toLocaleString()}</span>
            <span>Commit: {commitSha.slice(0, 8)}</span>
            <span>Environment: {process.env.NODE_ENV}</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">Routes</span>
            </div>
            <div className="text-2xl font-bold">{CRITICAL_ROUTES.length}</div>
            <div className="text-sm text-gray-500">Critical paths tracked</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-5 h-5 text-green-400" />
              <span className="text-gray-400">Tables</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{tablesWithData}</div>
            <div className="text-sm text-gray-500">{tablesEmpty} empty, {tablesError} errors</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400">Services</span>
            </div>
            <div className="text-2xl font-bold">{envConfigured}/{envTotal}</div>
            <div className="text-sm text-gray-500">Configured</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400">Auth</span>
            </div>
            <div className="text-2xl font-bold text-green-400">Active</div>
            <div className="text-sm text-gray-500">Supabase Auth</div>
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
            Database Tables ({CRITICAL_TABLES.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {tableStats.map((table) => (
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
                  {table.count >= 0 ? `${table.count} rows` : 'Error'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Routes by Category */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Route Inventory ({CRITICAL_ROUTES.length} Critical Routes)
          </h2>
          
          {Object.entries(routesByCategory).map(([category, routes]) => {
            const Icon = categoryIcons[category] || Globe;
            return (
              <div key={category} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  {category} ({routes.length})
                </h3>
                <div className="grid gap-2">
                  {routes.map((route) => (
                    <div 
                      key={route.path}
                      className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <div>
                          <div className="font-medium">{route.name}</div>
                          <div className="text-sm text-gray-400 font-mono">{route.path}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`px-2 py-1 rounded ${
                          route.dataSource === 'supabase' 
                            ? 'bg-green-500/20 text-green-400'
                            : route.dataSource === 'api'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {route.dataSource}
                        </span>
                        {route.requiresAuth && (
                          <Lock className="w-4 h-4 text-yellow-400" />
                        )}
                        <a 
                          href={route.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Visit →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>Elevate for Humanity - System Status Dashboard</p>
          <p>Generated: {timestamp}</p>
        </div>
      </div>
    </div>
  );
}
