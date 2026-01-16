import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import StudentApplicationForm from './StudentApplicationForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Student Application | Elevate for Humanity',
  description: 'Apply for workforce training and career development programs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/apply/student',
  },
};

export default async function StudentApplicationPage() {
  const supabase = await createClient();
  
  // Fetch available programs for application
  const { data: programs } = await supabase
    .from('programs')
    .select('id, name, slug')
    .eq('accepting_applications', true);
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase mb-2">
            Student Application
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-3">
            Start Your Career Journey
          </h1>
          <p className="text-base sm:text-lg text-black max-w-3xl">
            Take the first step toward a better future. This application helps
            us understand your goals and match you with the right training
            program.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <StudentApplicationForm />
      </section>
    </div>
  );
}
