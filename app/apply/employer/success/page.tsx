import { Metadata } from 'next';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Application Submitted',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/apply/employer/success',
  },
};

export default function EmployerApplicationSuccess() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-700 mb-4">
          
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Application Submitted!
        </h1>
        <p className="text-lg text-slate-700 mb-6">
          Thank you for your interest in partnering with us. We'll review your
          application and contact you within 1-2 business days.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
          <h2 className="font-semibold text-slate-900 mb-2">What's Next?</h2>
          <ol className="space-y-2 text-sm text-slate-700">
            <li>1. Our team will verify your company information</li>
            <li>2. You'll receive an email with next steps</li>
            <li>
              3. Once approved, you'll get access to your employer dashboard
            </li>
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
