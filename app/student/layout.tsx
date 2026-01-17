import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { BookOpen, Award, Trophy, Shield, Home, Settings } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Student Portal | Elevate for Humanity',
  description: 'Access your courses, track progress, and earn achievements.',
};

const navItems = [
  { href: '/student/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/student/badges', icon: Award, label: 'Badges' },
  { href: '/student/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { href: '/student/privacy', icon: Shield, label: 'Privacy' },
];

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/student');
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top navigation bar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/student/dashboard" className="font-bold text-blue-600">
                Student Portal
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main>{children}</main>
    </div>
  );
}
