export const dynamic = 'force-dynamic';

import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';


export const metadata: Metadata = {
  title: 'Apprenticeship Programs | Elevate for Humanity',
  description: 'Manage apprenticeship programs',
};

export default async function EmployerApprenticeshipPage() {
  let user = null;

  try {
    const supabase = await createClient();
    const { data: authData } = await supabase.auth.getUser();
    user = authData.user;
  } catch { /* Error handled silently */ }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Apprenticeship Programs</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-black mb-4">
          Create and manage registered apprenticeship programs.
        </p>
        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold mb-2">Benefits:</h3>
            <ul className="list-disc list-inside text-black space-y-1">
              <li>Tax credits and incentives</li>
              <li>Develop skilled workforce</li>
              <li>Reduce turnover costs</li>
              <li>DOL registered programs</li>
            </ul>
          </div>
          <p className="text-slate-500 text-sm mt-4">
            Contact us to set up your apprenticeship program.
          </p>
        </div>
      </div>
    </div>
  );
}
