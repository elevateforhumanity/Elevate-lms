import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ProgramHolderForm from './ProgramHolderForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Program Holder Application | Elevate for Humanity',
  description:
    'Partner with us to offer training programs to your community or organization.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/apply/program-holder',
  },
};

export default async function ProgramHolderApplicationPage() {
  const supabase = await createClient();
  
  // Fetch application settings
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .eq('key', 'program_holder_applications')
    .single();
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <p className="text-xs font-semibold tracking-widest text-blue-700 uppercase mb-2">
            Program Holder Application
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-3">
            Partner With Us
          </h1>
          <p className="text-base sm:text-lg text-black max-w-3xl">
            Offer training programs to your community or organization through
            our platform.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <ProgramHolderForm />
      </section>
    </div>
  );
}
