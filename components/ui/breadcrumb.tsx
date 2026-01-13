"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Map of path segments to readable labels
const pathLabels: Record<string, string> = {
  admin: 'Admin',
  dashboard: 'Dashboard',
  students: 'Students',
  courses: 'Courses',
  enrollments: 'Enrollments',
  applications: 'Applications',
  reports: 'Reports',
  settings: 'Settings',
  users: 'Users',
  analytics: 'Analytics',
  affiliates: 'Affiliates',
  wioa: 'WIOA Compliance',
  jobs: 'Job Postings',
  blog: 'Blog',
  programs: 'Programs',
  lms: 'Learning Portal',
  store: 'Store',
  cart: 'Cart',
  checkout: 'Checkout',
  profile: 'Profile',
  certificates: 'Certificates',
  grades: 'Grades',
  messages: 'Messages',
  notifications: 'Notifications',
  support: 'Support',
  help: 'Help',
  employers: 'Employers',
  partners: 'Partners',
  apprenticeships: 'Apprenticeships',
};

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbs: BreadcrumbItem[] = items || generateBreadcrumbs(pathname);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-sm ${className}`}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link 
            href="/" 
            className="text-gray-500 hover:text-gray-700 transition"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    
    // Skip dynamic segments like [id]
    if (segment.startsWith('[') && segment.endsWith(']')) {
      continue;
    }

    // Get label from map or capitalize segment
    const label = pathLabels[segment] || 
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  }

  return breadcrumbs;
}

export function BreadcrumbSeparator() {
  return <ChevronRight className="w-4 h-4 text-gray-400" />;
}
