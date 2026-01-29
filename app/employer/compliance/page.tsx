export const dynamic = 'force-dynamic';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

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

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
    const { data: authData } = await supabase.auth.getUser();
    user = authData.user;
  } catch (error) { /* Error handled silently */ }

  return (
    <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumbs items={[{ label: "Employer", href: "/employer" }, { label: "Compliance" }]} />
      </div>
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
