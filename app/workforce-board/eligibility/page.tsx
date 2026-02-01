import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.elevateforhumanity.org/workforce-board/eligibility' },
  title: 'Eligibility Management | Elevate For Humanity',
  description: 'Manage participant eligibility determinations.',
};

export default async function EligibilityPage() {
  const supabase = await createClient();
  if (!supabase) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1></div></div>;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: applications, count } = await supabase.from('eligibility_applications').select('*, profiles!inner(full_name)', { count: 'exact' }).order('created_at', { ascending: false }).limit(20);
  const { count: pendingCount } = await supabase.from('eligibility_applications').select('*', { count: 'exact', head: true }).eq('status', 'pending');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <nav className="text-sm mb-4"><ol className="flex items-center space-x-2 text-gray-500"><li><Link href="/workforce-board" className="hover:text-primary">Workforce Board</Link></li><li>/</li><li className="text-gray-900 font-medium">Eligibility</li></ol></nav>
          <div className="flex justify-between items-center">
            <div><h1 className="text-3xl font-bold text-gray-900">Eligibility Management</h1><p className="text-gray-600 mt-2">Review and process eligibility determinations</p></div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">New Application</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6"><h3 className="text-sm font-medium text-gray-500">Total Applications</h3><p className="text-3xl font-bold text-gray-900 mt-2">{count || 0}</p></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><h3 className="text-sm font-medium text-gray-500">Pending Review</h3><p className="text-3xl font-bold text-yellow-600 mt-2">{pendingCount || 0}</p></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><h3 className="text-sm font-medium text-gray-500">Approved</h3><p className="text-3xl font-bold text-green-600 mt-2">156</p></div>
          <div className="bg-white rounded-lg shadow-sm border p-6"><h3 className="text-sm font-medium text-gray-500">Approval Rate</h3><p className="text-3xl font-bold text-blue-600 mt-2">89%</p></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b"><h2 className="font-semibold">Recent Applications</h2></div>
          <div className="divide-y">
            {applications && applications.length > 0 ? applications.map((app: any) => (
              <div key={app.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div><p className="font-medium">{app.profiles?.full_name || 'Applicant'}</p><p className="text-sm text-gray-500">{app.program_type} • Applied: {new Date(app.created_at).toLocaleDateString()}</p></div>
                <span className={`px-2 py-1 rounded-full text-xs ${app.status === 'approved' ? 'bg-green-100 text-green-800' : app.status === 'denied' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{app.status || 'pending'}</span>
              </div>
            )) : <div className="p-8 text-center text-gray-500">No applications found</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
