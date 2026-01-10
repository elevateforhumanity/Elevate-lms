import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Payment Cancelled | Elevate for Humanity',
  description: 'Payment was cancelled',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/payment/affirm/cancel',
  },
};

export const dynamic = 'force-dynamic';
import { XCircle } from 'lucide-react';

export default function AffirmCancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <XCircle className="w-16 h-16 text-brand-orange-600 mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          You cancelled the payment process. No charges were made to your
          account.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Need help?</strong> Our team is here to assist you with any
            questions about payment options or enrollment.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/programs"
            className="inline-block px-6 py-3 bg-brand-blue-600 text-white font-semibold rounded-lg hover:bg-brand-blue-700 transition-colors"
          >
            Browse Programs
          </Link>

          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Contact Us
          </Link>

          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-700">
            Remember: Most of our programs are 100% FREE through WIOA, WRG, or
            JRI funding.
          </p>
          <Link
            href="/financial-aid"
            className="text-sm text-brand-blue-600 hover:text-brand-blue-700 font-semibold"
          >
            Learn about free training options →
          </Link>
        </div>
      </div>
    </div>
  );
}
