import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'License Suspended | Elevate for Humanity',
  robots: 'noindex',
};

export default function LicenseSuspendedPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          License Suspended
        </h1>
        
        <p className="text-gray-600 mb-6">
          Access to this platform has been suspended due to a billing issue. 
          Please contact your organization administrator or update your payment information to restore access.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please contact support.
          </p>
          
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Powered by Elevate for Humanity
          </p>
        </div>
      </div>
    </div>
  );
}
