'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  DollarSign,
  UserCheck,
  BookOpen,
  Shield,
  Building2,
  ClipboardList,
  BarChart3,
  Settings,
  Mail,
  Share2,
  Sparkles,
  Bell,
  MessageCircle,
  Video,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'AI Studio', href: '/ai-studio', icon: Video },
  {
    name: 'Marketing',
    icon: Sparkles,
    children: [
      { name: 'Email Marketing', href: '/admin/email-marketing' },
      { name: 'Social Media', href: '/admin/social-media' },
      { name: 'Automation', href: '/admin/email-marketing/automation' },
    ],
  },
  {
    name: 'Communications',
    icon: MessageCircle,
    children: [
      { name: 'Push Notifications', href: '/admin/notifications' },
      { name: 'Live Chat', href: '/admin/live-chat' },
    ],
  },
  {
    name: 'HR & Payroll',
    icon: DollarSign,
    children: [
      { name: 'Employees', href: '/admin/hr/employees' },
      { name: 'Payroll', href: '/admin/hr/payroll' },
    ],
  },
  {
    name: 'Programs',
    icon: BookOpen,
    children: [
      { name: 'All Programs', href: '/admin/programs' },
      { name: 'Courses', href: '/admin/courses' },
    ],
  },
  {
    name: 'Students',
    icon: GraduationCap,
    children: [
      { name: 'All Students', href: '/admin/students' },
      { name: 'Onboarding', href: '/onboarding' },
      { name: 'Attendance', href: '/lms/(app)/attendance' },
      { name: 'Progress Tracking', href: '/admin/analytics/learning' },
    ],
  },
  {
    name: 'Staff Management',
    icon: UserCheck,
    children: [
      { name: 'Staff Directory', href: '/admin/hr/employees' },
      { name: 'Staff Onboarding', href: '/onboarding/staff' },
      { name: 'Performance', href: '/admin/instructors/performance' },
    ],
  },
  {
    name: 'Program Holders',
    icon: Building2,
    children: [
      { name: 'All Partners', href: '/admin/program-holders' },
      { name: 'MOUs', href: '/admin/docs/mou' },
      { name: 'Partner Portal', href: '/partners/portal' },
    ],
  },
  {
    name: 'Documents',
    icon: FileText,
    children: [
      { name: 'MOUs', href: '/admin/docs/mou' },
      { name: 'Handbooks', href: '/onboarding/handbook' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Employee Handbook', href: '/onboarding/handbook' },
    ],
  },
  {
    name: 'Analytics',
    icon: BarChart3,
    children: [
      { name: 'Overview', href: '/admin/analytics' },
      { name: 'Student Engagement', href: '/admin/analytics/engagement' },
      { name: 'Retention', href: '/admin/retention' },
      { name: 'Outcomes', href: '/admin/outcomes' },
    ],
  },
  {
    name: 'Compliance',
    icon: Shield,
    children: [
      { name: 'WIOA Dashboard', href: '/admin/compliance-dashboard' },
      { name: 'Reports', href: '/admin/reports' },
    ],
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="w-64 bg-gray-900 text-white min-h-screen p-4 overflow-y-auto"
    >
      <div className="mb-8">
        <Link href="/" aria-label="Link" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg   ">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-bold">Elevate</div>
            <div className="text-xs text-gray-400 -mt-1">Admin Portal</div>
          </div>
        </Link>
      </div>

      <div className="space-y-1">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <div key={item.name} className="mb-4">
                <div className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </div>
                <div className="ml-4 space-y-1">
                  {item.children.map((child) => {
                    const isActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        {child.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-800">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </nav>
  );
}
