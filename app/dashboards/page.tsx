import Link from 'next/link';
import { LayoutDashboard, Users, GraduationCap, Briefcase, Building2, FileText, DollarSign, BarChart3 } from 'lucide-react';

const dashboards = [
  { name: 'Admin Dashboard', desc: 'Full platform administration', href: '/admin', icon: LayoutDashboard, color: 'orange' },
  { name: 'Student Dashboard', desc: 'Learning progress and courses', href: '/lms/dashboard', icon: GraduationCap, color: 'blue' },
  { name: 'Instructor Dashboard', desc: 'Course and student management', href: '/instructor', icon: Users, color: 'purple' },
  { name: 'Employer Dashboard', desc: 'Hiring and workforce solutions', href: '/employer-portal', icon: Briefcase, color: 'green' },
  { name: 'Partner Dashboard', desc: 'Referrals and outcomes', href: '/partner', icon: Building2, color: 'teal' },
  { name: 'Program Holder', desc: 'Program administration', href: '/program-holder', icon: FileText, color: 'red' },
  { name: 'Financial Dashboard', desc: 'Revenue and payments', href: '/admin/finance', icon: DollarSign, color: 'emerald' },
  { name: 'Analytics Dashboard', desc: 'Platform metrics and reports', href: '/admin/analytics', icon: BarChart3, color: 'indigo' },
];

export default function DashboardsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboards</h1>
          <p className="text-xl text-gray-600">Access all platform dashboards from one place</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboards.map((dash, i) => (
            <Link key={i} href={dash.href} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md hover:border-blue-300 transition-all group">
              <div className={`w-12 h-12 bg-${dash.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <dash.icon className={`w-6 h-6 text-${dash.color}-600`} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{dash.name}</h3>
              <p className="text-sm text-gray-500">{dash.desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Need a custom dashboard?</h2>
          <p className="text-gray-600 mb-4">Contact us to create a dashboard tailored to your specific needs.</p>
          <Link href="/contact" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
