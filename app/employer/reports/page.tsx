export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';


export const metadata: Metadata = {
  title: 'Reports | Elevate for Humanity',
  description: 'Employer reports and analytics',
};

export default async function EmployerReportsPage() {
  let user = null;

  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    user = authData.user;
  } catch (error) {
    console.error('Error in EmployerReportsPage:', error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-slate-600 mb-6">
          View hiring metrics and workforce analytics.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-sm text-slate-600">Active Postings</div>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-sm text-slate-600">Applications</div>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
            <div className="text-sm text-slate-600">Hires</div>
          </div>
        </div>
        <p className="text-slate-500 text-sm mt-6">
          Detailed analytics coming soon.
        </p>
      </div>
    </div>
  );
}
