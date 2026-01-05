import { Metadata } from 'next';
import EmployerApplicationForm from './EmployerApplicationForm';

export const metadata: Metadata = {
  title: 'Employer Application | Elevate for Humanity',
  description:
    'Partner with us to find qualified candidates and build your workforce.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/apply/employer',
  },
};

export default function EmployerApplicationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <p className="text-xs font-semibold tracking-widest text-orange-700 uppercase mb-2">
            Employer Application
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Partner With Us
          </h1>
          <p className="text-base sm:text-lg text-slate-700 max-w-3xl">
            Find qualified candidates, post job openings, and participate in
            apprenticeship programs.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <EmployerApplicationForm />
      </section>
    </div>
  );
}
