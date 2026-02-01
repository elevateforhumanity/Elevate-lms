import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.elevateforhumanity.org/workforce-board/reports' },
  title: 'Workforce Reports | Elevate For Humanity',
  description: 'Access workforce development reports and analytics.',
};

export default async function ReportsPage() {
  const supabase = await createClient();
  if (!supabase) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1></div></div>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const reports = [
    { name: 'Performance Report', description: 'Program performance metrics', href: '/workforce-board/reports/performance' },
    { name: 'Enrollment Report', description: 'Participant enrollment data', href: '/workforce-board/reports/enrollment' },
    { name: 'Outcome Report', description: 'Employment and credential outcomes', href: '/workforce-board/reports/outcomes' },
    { name: 'Financial Report', description: 'Funding utilization', href: '/workforce-board/reports/financial' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <nav className="text-sm mb-4"><ol className="flex items-center space-x-2 text-gray-500"><li><Link href="/workforce-board" className="hover:text-primary">Workforce Board</Link></li><li>/</li><li className="text-gray-900 font-medium">Reports</li></ol></nav>
          <h1 className="text-3xl font-bold text-gray-900">Workforce Reports</h1>
          <p className="text-gray-600 mt-2">Access reports and analytics</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <Link key={report.href} href={report.href} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md">
              <h3 className="font-semibold mb-2">{report.name}</h3>
              <p className="text-sm text-gray-500">{report.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
