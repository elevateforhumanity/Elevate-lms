import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  Users,
  FileText,
  Book,
  LifeBuoy,
  LayoutDashboard,
} from 'lucide-react';

export default async function ProgramHolderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If not logged in, just render children (for public landing page)
  // Dashboard pages will handle their own auth
  if (!user) {
    return <>{children}</>;
  }

  // Get user profile to check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  // If not a program holder, just render children (for public landing page)
  if (!profile || profile.role !== 'program_holder') {
    return <>{children}</>;
  }

  const navItems = [
    {
      href: '/program-holder/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/program-holder/verification',
      label: 'Verification',
      icon: Shield,
    },
    {
      href: '/program-holder/students',
      label: 'Students',
      icon: Users,
    },
    {
      href: '/program-holder/reports',
      label: 'Reports',
      icon: FileText,
    },
    {
      href: '/program-holder/compliance',
      label: 'Compliance',
      icon: Shield,
    },
    {
      href: '/program-holder/documentation',
      label: 'Documentation',
      icon: Book,
    },
    {
      href: '/program-holder/support',
      label: 'Support',
      icon: LifeBuoy,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav role="navigation" aria-label="Main navigation" className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link
                  href="/program-holder/dashboard"
                  className="text-xl font-bold text-brand-orange-600"
                >
                  Program Holder Portal
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item: any) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-700 hover:text-gray-700 hover:border-gray-300"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center">
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-sm font-medium text-gray-700 hover:text-gray-700"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item: any) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
