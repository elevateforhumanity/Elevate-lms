import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Application Submitted',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/apply/staff/success',
  },
};

export default function StaffApplicationSuccess() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-700 mb-4">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Application Submitted!
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          Thank you for your interest in joining our team. We'll review your
          application and contact you if we'd like to move forward.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
          <h2 className="font-semibold text-slate-900 mb-2">What's Next?</h2>
          <ol className="space-y-2 text-sm text-slate-700">
            <li>1. Our team will review your qualifications</li>
            <li>2. If selected, we'll contact you to schedule an interview</li>
            <li>3. After approval, you'll receive onboarding instructions</li>
          </ol>
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
