import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { LayoutDashboard, Users, GraduationCap, Briefcase, Building2, FileText, DollarSign, BarChart3, Shield, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboards | Elevate For Humanity',
  description: 'Access all available dashboards and portals.',
};

export const dynamic = 'force-dynamic';

export default async function DashboardsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let userRole = 'guest';
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    userRole = profile?.role || 'student';
  }

  const dashboards = [
    { 
      name: 'Admin Dashboard', 
      description: 'Full platform administration and management',
      href: '/admin', 
      icon: Shield, 
      color: 'bg-red-100 text-red-600',
      roles: ['admin', 'super_admin']
    },
    { 
      name: 'Student Dashboard', 
      description: 'Track your learning progress and courses',
      href: '/portal/student/dashboard', 
      icon: GraduationCap, 
      color: 'bg-blue-100 text-blue-600',
      roles: ['student', 'admin', 'super_admin']
    },
    { 
      name: 'Staff Portal', 
      description: 'Manage students, attendance, and reports',
      href: '/staff-portal', 
      icon: Users, 
      color: 'bg-green-100 text-green-600',
      roles: ['staff', 'instructor', 'admin', 'super_admin']
    },
    { 
      name: 'Partner Portal', 
      description: 'Track referrals and partnership metrics',
      href: '/partner', 
      icon: Briefcase, 
      color: 'bg-purple-100 text-purple-600',
      roles: ['delegate', 'program_holder', 'admin', 'super_admin']
    },
    { 
      name: 'Program Holder', 
      description: 'Manage your programs and analytics',
      href: '/program-holder', 
      icon: Building2, 
      color: 'bg-orange-100 text-orange-600',
      roles: ['program_holder', 'admin', 'super_admin']
    },
    { 
      name: 'Creator Studio', 
      description: 'Create and manage course content',
      href: '/creator', 
      icon: FileText, 
      color: 'bg-pink-100 text-pink-600',
      roles: ['instructor', 'admin', 'super_admin']
    },
    { 
      name: 'VITA Tax Services', 
      description: 'Free tax preparation services',
      href: '/vita', 
      icon: DollarSign, 
      color: 'bg-emerald-100 text-emerald-600',
      roles: ['student', 'staff', 'admin', 'super_admin']
    },
    { 
      name: 'Workforce Board', 
      description: 'Workforce development tracking',
      href: '/workforce-board', 
      icon: BarChart3, 
      color: 'bg-indigo-100 text-indigo-600',
      roles: ['staff', 'admin', 'super_admin']
    },
    { 
      name: 'RISE Foundation', 
      description: 'Scholarships and support programs',
      href: '/rise-foundation', 
      icon: Heart, 
      color: 'bg-rose-100 text-rose-600',
      roles: ['student', 'staff', 'admin', 'super_admin']
    },
  ];

  // Filter dashboards based on user role
  const accessibleDashboards = dashboards.filter(d => 
    d.roles.includes(userRole) || userRole === 'super_admin'
  );

  const publicDashboards = dashboards.filter(d => 
    d.roles.includes('student') || d.roles.includes('guest')
  );

  const displayDashboards = user ? accessibleDashboards : publicDashboards;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboards & Portals</h1>
          <p className="text-gray-600">
            {user 
              ? 'Access your available dashboards and tools'
              : 'Sign in to access all available dashboards'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayDashboards.map(dashboard => (
            <Link key={dashboard.href} href={dashboard.href}
              className="bg-white rounded-xl border p-6 hover:shadow-lg transition group">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${dashboard.color}`}>
                <dashboard.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-orange-600 transition">
                {dashboard.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{dashboard.description}</p>
            </Link>
          ))}
        </div>

        {!user && (
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Sign in to access more dashboards</p>
            <Link href="/login" className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
