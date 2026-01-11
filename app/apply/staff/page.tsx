import { Metadata } from 'next';
import StaffApplicationForm from './StaffApplicationForm';

export const metadata: Metadata = {
  title: 'Staff / Instructor Application | Elevate for Humanity',
  description:
    'Join our team to support student success and workforce development.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/apply/staff',
  },
};

export default function StaffApplicationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <p className="text-xs font-semibold tracking-widest text-purple-700 uppercase mb-2">
            Staff / Instructor Application
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-3">
            Join Our Team
          </h1>
          <p className="text-base sm:text-lg text-black max-w-3xl">
            Support student success and workforce development as part of our
            team.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <StaffApplicationForm />
      </section>
    </div>
  );
}
