import { Metadata } from 'next';
import Link from 'next/link';
import { DollarSign, Phone, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Payment Cancelled | Elevate for Humanity',
  description: 'Your payment was cancelled. You can try again anytime.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/payment/cancel',
  },
};

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-zinc-900  to-white py-20">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-black" />
          </div>

          <h1 className="text-4xl font-bold text-black mb-4 text-2xl md:text-3xl lg:text-4xl">
            Payment Cancelled
          </h1>

          <p className="text-base md:text-lg text-black mb-8">
            Your payment was cancelled. No charges were made to your account.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-blue-900 mb-2">Need Help?</h2>
            <p className="text-blue-800 mb-4">
              We're here to help you get started. Here are some options:
            </p>
            <ul className="text-left text-blue-800 space-y-2">
              <li>
                <DollarSign className="w-5 h-5 inline-block" /> Check if you
                qualify for 100% FREE funding (WIOA, WRG, JRI)
              </li>
              <li>💳 Try a different payment method</li>
              <li>
                <Phone className="w-5 h-5 inline-block" /> Call us to discuss
                payment plans: 317-314-3757
              </li>
              <li>💬 Chat with our enrollment team</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-brand-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-orange-700 transition"
            >
              Try Again
            </Link>
            <Link
              href="/programs"
              className="bg-gray-200 text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              View Programs
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-black">
              Questions? Contact us at{' '}
              <a
                href="tel:317-314-3757"
                className="text-brand-orange-600 hover:underline"
              >
                317-314-3757
              </a>{' '}
              or{' '}
              <a
                href="mailto:info@elevateforhumanity.institute"
                className="text-brand-orange-600 hover:underline"
              >
                info@elevateforhumanity.institute
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
