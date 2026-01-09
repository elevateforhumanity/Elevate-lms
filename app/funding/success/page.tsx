import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Funding Approved | Elevate for Humanity',
  description: 'Your funding has been approved and processed',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/funding/success',
  },
};

export const dynamic = 'force-dynamic';


export default function FundingSuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-green-600 rounded-full mb-6">
          
        </div>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">
           Funding Approved &
          Processed!
        </h1>

        <p className="text-base md:text-lg text-slate-700 mb-8">
          Student enrollment has been automatically activated
        </p>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            What Happens Next:
          </h2>

          <div className="text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  Enrollment Activated
                </p>
                <p className="text-slate-600 text-sm">
                  Student is now enrolled and active in the program
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <div>
                <p className="font-semibold text-slate-900">
                  Milady RISE Access
                </p>
                <p className="text-slate-600 text-sm">
                  Student has been auto-enrolled in required courses
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-brand-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <div>
                <p className="font-semibold text-slate-900">Dashboard Access</p>
                <p className="text-slate-600 text-sm">
                  Student can login and start learning immediately
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/admin/enrollments"
            className="px-6 py-3 bg-brand-blue-600 text-white rounded-lg hover:bg-brand-blue-700 font-bold transition-all shadow-lg"
          >
            View Enrollments
          </Link>
          <Link
            href="/admin/dashboard"
            className="px-6 py-3 bg-white text-brand-blue-600 border-2 border-brand-blue-600 rounded-lg hover:bg-blue-50 font-bold transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
