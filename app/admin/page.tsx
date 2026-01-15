import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Admin Mega Dashboard | Elevate For Humanity',
  description: 'Complete admin control center with all 106 features',
};

export default async function MegaAdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login?redirect=/admin');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
    redirect('/admin/login?redirect=/admin&error=unauthorized');
  }

  // Fetch key metrics (with null safety)
  const { count: totalStudents } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');
  const { count: totalEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true });
  const { count: activeEnrollments } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');
  const { count: totalPrograms } = await supabase
    .from('programs')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);
  const { count: totalCourses } = await supabase
    .from('courses')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true);
  const { count: pendingApplications } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  // Ensure counts are numbers (not null/undefined)
  const safeStudents = totalStudents ?? 0;
  const safeEnrollments = totalEnrollments ?? 0;
  const safeActiveEnrollments = activeEnrollments ?? 0;
  const safePrograms = totalPrograms ?? 0;
  const safeCourses = totalCourses ?? 0;
  const safePendingApps = pendingApplications ?? 0;

  const allFeatures = [
    // STUDENT MANAGEMENT (15 features)
    {
      category: 'Student Management',
      name: 'Students',
      href: '/admin/students',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'Applicants',
      href: '/admin/applicants',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'Applicants Live',
      href: '/admin/applicants-live',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'Applications',
      href: '/admin/applications',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'Enrollment',
      href: '/admin/enrollment',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'Enrollments',
      href: '/admin/enrollments',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'HSI Enrollments',
      href: '/admin/hsi-enrollments',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'Partner Enrollments',
      href: '/admin/partner-enrollments',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'Barriers',
      href: '/admin/barriers',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'Progress',
      href: '/admin/progress',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'External Progress',
      href: '/admin/external-progress',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'Retention',
      href: '/admin/retention',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'Outcomes',
      href: '/admin/outcomes',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'Success',
      href: '/admin/success',
      color: 'blue',
    },
    {
      category: 'Student Management',
      name: 'Transfer Hours',
      href: '/admin/transfer-hours',
      color: 'blue',
    },

    // COURSE/PROGRAM MANAGEMENT (18 features)
    {
      category: 'Courses & Programs',
      name: 'Programs',
      href: '/admin/programs',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Courses',
      href: '/admin/courses',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Curriculum',
      href: '/admin/curriculum',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Modules',
      href: '/admin/modules',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'External Modules',
      href: '/admin/external-modules',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Course Builder',
      href: '/admin/course-builder',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Course Authoring',
      href: '/admin/course-authoring',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Course Generator',
      href: '/admin/course-generator',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Course Import',
      href: '/admin/course-import',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Course Studio',
      href: '/admin/course-studio',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Course Studio AI',
      href: '/admin/course-studio-ai',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Course Studio Simple',
      href: '/admin/course-studio-simple',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Course Templates',
      href: '/admin/course-templates',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Program Generator',
      href: '/admin/program-generator',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Syllabus Generator',
      href: '/admin/syllabus-generator',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Quiz Builder',
      href: '/admin/quiz-builder',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Editor',
      href: '/admin/editor',
      color: 'green',
    },
    {
      category: 'Courses & Programs',
      name: 'Apprenticeships',
      href: '/admin/apprenticeships',
      color: 'green',
    },

    // ANALYTICS & REPORTS (10 features)
    {
      category: 'Analytics & Reports',
      name: 'Analytics',
      href: '/admin/analytics',
      color: 'purple',
    },
    {
      category: 'Analytics & Reports',
      name: 'Dashboard',
      href: '/admin/dashboard',
      color: 'purple',
    },
    {
      category: 'Analytics & Reports',
      name: 'Dashboard Enhanced',
      href: '/admin/dashboard-enhanced',
      color: 'purple',
    },
    {
      category: 'Analytics & Reports',
      name: 'Master Dashboard',
      href: '/admin/master-dashboard',
      color: 'purple',
    },
    {
      category: 'Analytics & Reports',
      name: 'LMS Dashboard',
      href: '/admin/lms-dashboard',
      color: 'purple',
    },
    {
      category: 'Analytics & Reports',
      name: 'Reports',
      href: '/admin/reports',
      color: 'purple',
    },
    {
      category: 'Analytics & Reports',
      name: 'Reporting',
      href: '/admin/reporting',
      color: 'purple',
    },
    {
      category: 'Analytics & Reports',
      name: 'Completions',
      href: '/admin/completions',
      color: 'purple',
    },
    {
      category: 'Analytics & Reports',
      name: 'Impact',
      href: '/admin/impact',
      color: 'purple',
    },
    {
      category: 'Analytics & Reports',
      name: 'Site Health',
      href: '/admin/site-health',
      color: 'purple',
    },

    // COMPLIANCE & CERTIFICATION (7 features)
    {
      category: 'Compliance & Certs',
      name: 'Compliance',
      href: '/admin/compliance',
      color: 'orange',
    },
    {
      category: 'Compliance & Certs',
      name: 'Compliance Dashboard',
      href: '/admin/compliance-dashboard',
      color: 'orange',
    },
    {
      category: 'Compliance & Certs',
      name: 'Certificates',
      href: '/admin/certificates',
      color: 'orange',
    },
    {
      category: 'Compliance & Certs',
      name: 'Certifications',
      href: '/admin/certifications',
      color: 'orange',
    },
    {
      category: 'Compliance & Certs',
      name: 'Audit Logs',
      href: '/admin/audit-logs',
      color: 'orange',
    },
    {
      category: 'Compliance & Certs',
      name: 'ETPL Alignment',
      href: '/admin/etpl-alignment',
      color: 'orange',
    },
    {
      category: 'Compliance & Certs',
      name: 'License',
      href: '/admin/license',
      color: 'orange',
    },

    // COMMUNICATION (6 features)
    {
      category: 'Communication',
      name: 'Email Marketing',
      href: '/admin/email-marketing',
      color: 'indigo',
    },
    {
      category: 'Communication',
      name: 'Notifications',
      href: '/admin/notifications',
      color: 'indigo',
    },
    {
      category: 'Communication',
      name: 'Live Chat',
      href: '/admin/live-chat',
      color: 'indigo',
    },
    {
      category: 'Communication',
      name: 'Contacts',
      href: '/admin/contacts',
      color: 'indigo',
    },
    {
      category: 'Communication',
      name: 'Social Media',
      href: '/admin/social-media',
      color: 'indigo',
    },
    {
      category: 'Communication',
      name: 'Signatures',
      href: '/admin/signatures',
      color: 'indigo',
    },

    // HR & STAFF (5 features)
    { category: 'HR & Staff', name: 'HR', href: '/admin/hr', color: 'teal' },
    {
      category: 'HR & Staff',
      name: 'Instructors',
      href: '/admin/instructors',
      color: 'teal',
    },
    {
      category: 'HR & Staff',
      name: 'Delegates',
      href: '/admin/delegates',
      color: 'teal',
    },
    {
      category: 'HR & Staff',
      name: 'Payroll',
      href: '/admin/payroll',
      color: 'teal',
    },
    {
      category: 'HR & Staff',
      name: 'Payroll Cards',
      href: '/admin/payroll-cards',
      color: 'teal',
    },

    // FUNDING & GRANTS (6 features)
    {
      category: 'Funding & Grants',
      name: 'Funding',
      href: '/admin/funding',
      color: 'emerald',
    },
    {
      category: 'Funding & Grants',
      name: 'Funding Playbook',
      href: '/admin/funding-playbook',
      color: 'emerald',
    },
    {
      category: 'Funding & Grants',
      name: 'Grants',
      href: '/admin/grants',
      color: 'emerald',
    },
    {
      category: 'Funding & Grants',
      name: 'JRI',
      href: '/admin/jri',
      color: 'emerald',
    },
    {
      category: 'Funding & Grants',
      name: 'Cash Advances',
      href: '/admin/cash-advances',
      color: 'emerald',
    },
    {
      category: 'Funding & Grants',
      name: 'Tax Filing',
      href: '/admin/tax-filing',
      color: 'emerald',
    },

    // PARTNERSHIPS (7 features)
    {
      category: 'Partnerships',
      name: 'Employers',
      href: '/admin/employers',
      color: 'sky',
    },
    {
      category: 'Partnerships',
      name: 'Employers Playbook',
      href: '/admin/employers-playbook',
      color: 'sky',
    },
    {
      category: 'Partnerships',
      name: 'Partners',
      href: '/admin/partners',
      color: 'sky',
    },
    {
      category: 'Partnerships',
      name: 'Program Holders',
      href: '/admin/program-holders',
      color: 'sky',
    },
    {
      category: 'Partnerships',
      name: 'Program Holder Acknowledgements',
      href: '/admin/program-holder-acknowledgements',
      color: 'sky',
    },
    {
      category: 'Partnerships',
      name: 'Integrations',
      href: '/admin/integrations',
      color: 'sky',
    },
    { category: 'Partnerships', name: 'MOU', href: '/admin/mou', color: 'sky' },

    // AI & AUTOMATION (7 features)
    {
      category: 'AI & Automation',
      name: 'AI Console',
      href: '/admin/ai-console',
      color: 'violet',
    },
    {
      category: 'AI & Automation',
      name: 'AI Course Builder',
      href: '/admin/course-studio-ai',
      color: 'violet',
    },
    {
      category: 'AI & Automation',
      name: 'Copilot',
      href: '/admin/copilot',
      color: 'violet',
    },
    {
      category: 'AI & Automation',
      name: 'Autopilot',
      href: '/admin/autopilot',
      color: 'violet',
    },
    {
      category: 'AI & Automation',
      name: 'Autopilots',
      href: '/admin/autopilots',
      color: 'violet',
    },
    {
      category: 'AI & Automation',
      name: 'Workflows',
      href: '/admin/workflows',
      color: 'violet',
    },
    {
      category: 'AI & Automation',
      name: 'Data Processor',
      href: '/admin/data-processor',
      color: 'violet',
    },

    // OPERATIONS (8 features)
    {
      category: 'Operations',
      name: 'Operations',
      href: '/admin/operations',
      color: 'amber',
    },
    {
      category: 'Operations',
      name: 'Console',
      href: '/admin/ai-console',
      color: 'amber',
    },
    {
      category: 'Operations',
      name: 'Admin Console',
      href: '/admin/ai-console',
      color: 'amber',
    },
    {
      category: 'Operations',
      name: 'Control Center',
      href: '/admin/master-dashboard',
      color: 'amber',
    },
    {
      category: 'Operations',
      name: 'Master Control',
      href: '/admin/master-dashboard',
      color: 'amber',
    },
    {
      category: 'Operations',
      name: 'System Health',
      href: '/admin/system-health',
      color: 'amber',
    },
    {
      category: 'Operations',
      name: 'Migrations',
      href: '/admin/migrations',
      color: 'amber',
    },
    {
      category: 'Operations',
      name: 'Mobile Sync',
      href: '/admin/mobile-sync',
      color: 'amber',
    },

    // CONTENT & LIBRARY (10 features)
    {
      category: 'Content & Library',
      name: 'Documents',
      href: '/admin/documents',
      color: 'cyan',
    },
    {
      category: 'Content & Library',
      name: 'Document Center',
      href: '/admin/document-center',
      color: 'cyan',
    },
    {
      category: 'Content & Library',
      name: 'Files',
      href: '/admin/files',
      color: 'cyan',
    },
    {
      category: 'Content & Library',
      name: 'Docs',
      href: '/admin/docs',
      color: 'cyan',
    },
    {
      category: 'Content & Library',
      name: 'Internal Docs',
      href: '/admin/internal-docs',
      color: 'cyan',
    },
    {
      category: 'Content & Library',
      name: 'Videos',
      href: '/admin/videos',
      color: 'cyan',
    },
    {
      category: 'Content & Library',
      name: 'Video Manager',
      href: '/admin/video-manager',
      color: 'cyan',
    },
    {
      category: 'Content & Library',
      name: 'Media Studio',
      href: '/admin/media-studio',
      color: 'cyan',
    },
    {
      category: 'Content & Library',
      name: 'Store',
      href: '/admin/store',
      color: 'cyan',
    },
    {
      category: 'Content & Library',
      name: 'Portal Map',
      href: '/admin/portal-map',
      color: 'cyan',
    },

    // SETTINGS & ADMIN (7 features)
    {
      category: 'Settings & Admin',
      name: 'Settings',
      href: '/admin/settings',
      color: 'slate',
    },
    {
      category: 'Settings & Admin',
      name: 'Users',
      href: '/admin/users',
      color: 'slate',
    },
    {
      category: 'Settings & Admin',
      name: 'Security',
      href: '/admin/security',
      color: 'slate',
    },
    {
      category: 'Settings & Admin',
      name: 'Login',
      href: '/admin/login',
      color: 'slate',
    },
    {
      category: 'Settings & Admin',
      name: 'Learner',
      href: '/admin/learner',
      color: 'slate',
    },
    {
      category: 'Settings & Admin',
      name: 'Tenants',
      href: '/admin/tenants',
      color: 'slate',
    },
    {
      category: 'Settings & Admin',
      name: 'Dev Studio',
      href: '/admin/dev-studio',
      color: 'slate',
    },
  ];

  const categories = Array.from(new Set(allFeatures.map((f) => f.category)));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-brand-blue-600 text-white py-6 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Mega Dashboard</h1>
              <p className="text-sm text-blue-100">
                All 106 Features • {profile?.full_name || user.email}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-blue-200">Role</div>
              <div className="text-sm font-bold">
                {profile?.role || 'admin'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics - Compact */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <div className="bg-white rounded-lg shadow-sm border p-3 text-center">
            <div className="text-xs text-black">Students</div>
            <div className="text-base font-bold text-brand-blue-600">
              {totalStudents || 0}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-3 text-center">
            <div className="text-xs text-black">Enrollments</div>
            <div className="text-base font-bold text-brand-green-600">
              {totalEnrollments || 0}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-3 text-center">
            <div className="text-xs text-black">Active</div>
            <div className="text-base font-bold text-brand-orange-600">
              {activeEnrollments || 0}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-3 text-center">
            <div className="text-xs text-black">Programs</div>
            <div className="text-base font-bold text-purple-600">
              {totalPrograms || 0}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-3 text-center">
            <div className="text-xs text-black">Courses</div>
            <div className="text-base font-bold text-indigo-600">
              {totalCourses || 0}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-3 text-center">
            <div className="text-xs text-black">Pending</div>
            <div className="text-base font-bold text-brand-orange-600">
              {pendingApplications || 0}
            </div>
          </div>
        </div>
      </section>

      {/* All Features by Category */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        {categories.map((category) => {
          const features = allFeatures.filter((f) => f.category === category);
          const color = features[0]?.color || 'slate';

          return (
            <div key={category} className="mb-6">
              <h2 className={`text-lg font-bold mb-3 text-${color}-700`}>
                {category} ({features.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {features.map((feature) => (
                  <Link
                    key={feature.href}
                    href={feature.href}
                    className={`bg-white hover:bg-${color}-50 border border-${color}-200 rounded-lg p-3 text-center transition-all hover:shadow-md`}
                  >
                    <div className={`text-sm font-semibold text-${color}-700`}>
                      {feature.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Quick Stats Footer */}
      <section className="bg-slate-800 text-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            <strong>106 Total Features</strong> • 12 Categories • Unified
            Dashboard
          </p>
        </div>
      </section>
    </div>
  );
}
