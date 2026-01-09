import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Enroll Now',
  description: 'Start your career training journey. Enroll in free workforce development programs with WIOA funding in Indianapolis.',
  path: '/enroll',
});

import Link from 'next/link';
import ProgramHowItWorks from '@/components/program/ProgramHowItWorks';
import ProgramFAQ from '@/components/program/ProgramFAQ';

export default function EnrollPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative h-[300px] w-full overflow-hidden bg-slate-900">
        <img
          src="https://static.vecteezy.com/system/resources/previews/026/829/465/non_2x/business-professional-discussing-ideas-in-office-meeting-room-free-photo.jpg"
          alt="Enroll"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </section>

      {/* Enrollment Form */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4">
          {/* FREE Training Only */}
          <div className="bg-white rounded-lg border-2 border-green-500 p-8">
            <div className="text-3xl font-bold text-green-700 mb-4 text-center">
              Apply for FREE Training
            </div>
            <p className="text-lg text-slate-700 mb-4 text-center">
              Most students qualify for 100% free training through:
            </p>
            <ul className="space-y-2 mb-6 text-slate-700 max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-brand-green-600 font-bold">✓</span>
                <span>
                  <strong>WRG</strong> - Workforce Ready Grant
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green-600 font-bold">✓</span>
                <span>
                  <strong>WIOA</strong> - Workforce Innovation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-green-600 font-bold">✓</span>
                <span>
                  <strong>JRI</strong> - Justice Reinvestment
                </span>
              </li>
            </ul>
            <p className="text-sm text-slate-600 mb-6 text-center">
              No tuition. No debt. We help you apply and handle all paperwork.
            </p>
            <Link
              href="/contact"
              className="block w-full text-center px-6 py-4 bg-brand-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all"
            >
              Apply for Free Training
            </Link>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-2">Questions?</p>
            <a
              href="tel:3173143757"
              className="text-2xl font-bold text-brand-orange-600 hover:text-brand-orange-700"
            >
              Call 317-314-3757
            </a>
          </div>

          {/* How It Works Section */}
          <div className="mt-12">
            <ProgramHowItWorks programName="Enrollment" />
          </div>

          {/* FAQ Section */}
          <div className="mt-8">
            <ProgramFAQ />
          </div>
        </div>
      </section>
    </div>
  );
}
