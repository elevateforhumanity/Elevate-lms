import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth/require-role';

export const metadata: Metadata = {
  title: 'Employer Verification | Elevate for Humanity',
  description: 'Verify your employer account',
};

export default async function EmployerVerificationPage() {
  await requireRole(['employer']);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Employer Verification</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-slate-600 mb-4">
          Complete your employer verification to access all features.
        </p>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold mb-2">Required Documents:</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
              <li>Business license or registration</li>
              <li>Tax ID (EIN)</li>
              <li>Proof of business address</li>
            </ul>
          </div>
          <p className="text-slate-500 text-sm">
            Contact support@elevateforhumanity.institute to complete verification.
          </p>
        </div>
      </div>
    </div>
  );
}
