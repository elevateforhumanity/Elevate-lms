import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import QuickApplyForm from './QuickApplyForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Quick Apply | Elevate for Humanity',
  description: 'Fast-track your application for workforce training programs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/apply/quick',
  },
};

export default async function QuickApplyPage() {
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
  
  // Fetch quick apply programs
  const { data: programs } = await supabase
    .from('programs')
    .select('id, name, slug')
    .eq('quick_apply_enabled', true);
  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumbs
        items={[
          { label: 'Apply', href: '/apply' },
          { label: 'Quick Apply' },
        ]}
      />
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <p className="text-xs font-semibold tracking-widest text-emerald-700 uppercase mb-2">
            Quick Application
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-3">
            Apply for Training Programs
          </h1>
          <p className="text-base sm:text-lg text-black max-w-2xl">
            Complete this quick form to get started. We'll review your
            information and contact you within 1-2 business days.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <QuickApplyForm />
      </section>
    </div>
  );
}
