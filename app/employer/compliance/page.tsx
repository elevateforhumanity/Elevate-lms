export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Compliance | Elevate for Humanity',
  description: 'Employer compliance and reporting',
};

export default async function EmployerCompliancePage() {
  let user = null;

  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    user = authData.user;
  } catch (error) {
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Compliance & Reporting</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-black mb-4">
          Stay compliant with workforce development requirements.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">WIOA Reporting</h3>
            <p className="text-sm text-black">Track workforce outcomes and compliance</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Tax Credits</h3>
            <p className="text-sm text-black">WOTC and other hiring incentives</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Equal Opportunity</h3>
            <p className="text-sm text-black">EEO compliance and reporting</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-black">Required forms and records</p>
          </div>
        </div>
      </div>
    </div>
  );
}
