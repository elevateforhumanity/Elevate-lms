import React from 'react';
import Link from 'next/link';
import { Shield, FileText } from 'lucide-react';

export default function AuditsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auditTypes = [
    { name: 'Applications', href: '/admin/audits/applications' },
    { name: 'Enrollments', href: '/admin/audits/enrollments' },
    { name: 'Progress', href: '/admin/audits/progress' },
    { name: 'Certificates', href: '/admin/audits/certificates' },
    { name: 'Forums', href: '/admin/audits/forums' },
    { name: 'AI Tutor', href: '/admin/audits/ai-tutor' },
    { name: 'Contact', href: '/admin/audits/contact' },
    { name: 'Grants', href: '/admin/audits/grants' },
    { name: 'Blog', href: '/admin/audits/blog' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-black">Audit Dashboards</h1>
          </div>
          <nav role="navigation" aria-label="Main navigation" className="flex gap-4 overflow-x-auto">
            {auditTypes.map((audit) => (
              <Link
                key={audit.href}
                href={audit.href}
                className="px-4 py-2 text-sm font-medium text-black hover:text-orange-600 hover:bg-orange-50 rounded-lg whitespace-nowrap"
              >
                {audit.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
