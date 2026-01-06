import { Metadata } from 'next';
import ProgramHolderForm from './ProgramHolderForm';

export const metadata: Metadata = {
  title: 'Program Holder Application | Elevate for Humanity',
  description:
    'Partner with us to offer training programs to your community or organization.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/apply/program-holder',
  },
};

export default function ProgramHolderApplicationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <p className="text-xs font-semibold tracking-widest text-blue-700 uppercase mb-2">
            Program Holder Application
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Partner With Us
          </h1>
          <p className="text-base sm:text-lg text-slate-700 max-w-3xl">
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
