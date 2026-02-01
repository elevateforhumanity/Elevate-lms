import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.elevateforhumanity.org/workforce-board/employment' },
  title: 'Employment Tracking | Elevate For Humanity',
  description: 'Track employment outcomes and job placements.',
};

export default async function EmploymentPage() {
  const supabase = await createClient();
  if (!supabase) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1></div></div>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: placements, count } = await supabase.from('job_placements').select('*, profiles!inner(full_name), employers!inner(name)', { count: 'exact' }).order('placement_date', { ascending: false }).limit(20);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <nav className="text-sm mb-4"><ol className="flex items-center space-x-2 text-gray-500"><li><Link href="/workforce-board" className="hover:text-primary">Workforce Board</Link></li><li>/</li><li className="text-gray-900 font-medium">Employment</li></ol></nav>
          <div className="flex justify-between items-center">
            <div><h1 className="text-3xl font-bold text-gray-900">Employment Tracking</h1><p className="text-gray-600 mt-2">Monitor job placements and outcomes</p></div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Record Placement</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6"><h3 className="text-sm font-medium text-gray-500">Total Placements</h3><p className="text-3xl font-bold text-green-600 mt-2">{count || 0}</p></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><h3 className="text-sm font-medium text-gray-500">This Month</h3><p className="text-3xl font-bold text-blue-600 mt-2">24</p></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><h3 className="text-sm font-medium text-gray-500">Avg. Wage</h3><p className="text-3xl font-bold text-purple-600 mt-2">$18.50/hr</p></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><h3 className="text-sm font-medium text-gray-500">Retention Rate</h3><p className="text-3xl font-bold text-orange-600 mt-2">82%</p></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b"><h2 className="font-semibold">Recent Placements</h2></div>
          <div className="divide-y">
            {placements && placements.length > 0 ? placements.map((p: any) => (
              <div key={p.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div><p className="font-medium">{p.profiles?.full_name || 'Participant'}</p><p className="text-sm text-gray-500">{p.employers?.name || 'Employer'} • {p.job_title}</p></div>
                <div className="text-right"><p className="font-medium">${p.hourly_wage}/hr</p><p className="text-sm text-gray-500">{p.placement_date ? new Date(p.placement_date).toLocaleDateString() : 'N/A'}</p></div>
              </div>
            )) : <div className="p-8 text-center text-gray-500">No placements recorded</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
