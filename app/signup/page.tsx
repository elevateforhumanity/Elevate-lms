import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import SignupForm from './SignupForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/signup',
  },
  title: 'Create Account',
  description:
    'Create your account to apply, track progress, upload documents, and manage your training pathway.',
};

export default async function SignupPage() {
  const supabase = await createClient();
  
  // Check if signups are enabled
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .eq('key', 'signup_enabled')
    .single();
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold text-black">
          Create your Elevate account
        </h1>
        <p className="mt-2 text-black">
          Use one account to apply, track training, and manage documents. After
          you apply, a real advisor follows up.
        </p>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-black">What you get</h2>
          <ul className="mt-3 list-disc pl-5 text-black space-y-2">
            <li>Program access (training, apprenticeships, credentials)</li>
            <li>Progress tracking and reporting</li>
            <li>Secure document upload for funding and onboarding</li>
          </ul>
        </div>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <SignupForm />
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-black">
          <Link
            href="/login"
            aria-label="Link"
            className="underline hover:text-brand-blue-600"
          >
            Already have an account? Log in
          </Link>
          <Link
            href="/apply"
            aria-label="Link"
            className="underline hover:text-brand-blue-600"
          >
            Not ready to create an account? Apply first
          </Link>
          <Link
            href="/privacy"
            aria-label="Link"
            className="underline hover:text-brand-blue-600"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
