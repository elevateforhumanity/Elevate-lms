import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import Link from 'next/link';
import { Settings, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Demo | Elevate LMS Platform',
  description: 'Explore the administrator experience in the Elevate LMS platform.',
};

const DEMO_SECTIONS = [
  { title: 'Organization Dashboard', description: 'Overview of metrics, active users, and recent activity.', demoUrl: '/admin/dashboard' },
  { title: 'User Management', description: 'Add, edit, and manage users. Assign roles and permissions.', demoUrl: '/admin/users' },
  { title: 'Enrollment Management', description: 'Track student applications, enrollments, and progress.', demoUrl: '/admin/enrollments' },
  { title: 'Reports & Analytics', description: 'Generate compliance reports, track outcomes, and export data.', demoUrl: '/admin/reports' },
  { title: 'System Settings', description: 'Configure branding, integrations, and platform settings.', demoUrl: '/admin/settings' },
];

export default function AdminDemoPage() {
  return (
    <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Store", href: "/store" }, { label: "Admin" }]} />
      </div>
<section className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/store/demo" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Demo Center
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center">
              <Settings className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black">Admin Demo</h1>
              <p className="text-blue-200">Explore the administrator experience</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {DEMO_SECTIONS.map((section, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{section.title}</h2>
                <p className="text-slate-600">{section.description}</p>
              </div>
              <Link href={section.demoUrl} target="_blank" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
                Open <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          ))}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <p className="text-amber-800 text-sm"><strong>Note:</strong> This demo uses sample data. Some features require authentication. Full access available after platform setup.</p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 bg-white border-t text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to set up your platform?</h2>
        <Link href="/store/licenses/managed" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
          Start License Setup <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
