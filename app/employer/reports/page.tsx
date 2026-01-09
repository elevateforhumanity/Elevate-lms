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
        
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Hiring Pipeline</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">New Applications</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Under Review</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Interviews Scheduled</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Offers Extended</span>
                <span className="font-semibold">0</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Time to Hire</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Average Days</span>
                <span className="font-semibold">-</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Fastest Hire</span>
                <span className="font-semibold">-</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Application Response Rate</span>
                <span className="font-semibold">-</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Interview Show Rate</span>
                <span className="font-semibold">-</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Candidate Sources</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Direct Applications</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Referrals</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Training Programs</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Job Boards</span>
                <span className="font-semibold">0</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Retention Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">30-Day Retention</span>
                <span className="font-semibold">-</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">90-Day Retention</span>
                <span className="font-semibold">-</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">1-Year Retention</span>
                <span className="font-semibold">-</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Avg. Tenure</span>
                <span className="font-semibold">-</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Export Report
          </button>
          <button className="border border-slate-300 px-6 py-2 rounded-lg hover:bg-slate-50">
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  );
}
