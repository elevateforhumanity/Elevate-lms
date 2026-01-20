import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ApplicationForm from './ApplicationForm';

export const metadata: Metadata = {
  title: 'Full Application | Elevate For Humanity',
  description: 'Complete your program application.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function FullApplicationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch available programs
  const { data: programs } = await supabase
    .from('programs')
    .select('id, name, slug, description, funding_types, price_self_pay, duration_weeks')
    .eq('is_active', true)
    .order('name');

  // Funding type options
  const fundingTypes = [
    { value: 'wrg', label: 'Workforce Ready Grant (WRG)' },
    { value: 'wioa', label: 'WIOA' },
    { value: 'jri', label: 'Justice Reinvestment Initiative (JRI)' },
    { value: 'employindy', label: 'EmployIndy' },
    { value: 'self_pay', label: 'Self Pay' },
    { value: 'employer_sponsored', label: 'Employer Sponsored' },
  ];

  // Get existing profile data if logged in
  let existingProfile = null;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    existingProfile = profile;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/apply" className="hover:text-orange-600">Apply</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Full Application</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Program Application</h1>
        <p className="text-gray-600 mb-8">Complete all steps to submit your application</p>

        <ApplicationForm 
          programs={programs || []}
          fundingTypes={fundingTypes}
          existingProfile={existingProfile}
          userId={user?.id}
        />
      </div>
    </div>
  );
}
