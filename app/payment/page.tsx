import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/payment',
  },
  title: 'Payment Options | Elevate For Humanity',
  description:
    'Explore payment options for your training programs including financing and payment plans.',
};

export default async function PaymentPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
  
  // Fetch payment options
  const { data: options } = await supabase
    .from('payment_options')
    .select('*')
    .order('order_index');
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Payment Options
            </h1>
            <p className="text-lg text-blue-100">
              Flexible payment solutions to help you invest in your future.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Full Payment */}
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold mb-4">Pay in Full</h2>
                <p className="text-gray-600 mb-6">
                  Pay the full tuition amount upfront and get started
                  immediately.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-brand-green-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Instant enrollment
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-brand-green-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    No additional fees
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-brand-green-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Credit/debit cards accepted
                  </li>
                </ul>
                <Link
                  href="/checkout"
                  className="block w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Pay Now
                </Link>
              </div>

              {/* Affirm Financing */}
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <h2 className="text-2xl font-bold mb-4">Affirm Financing</h2>
                <p className="text-gray-600 mb-6">
                  Split your payment into manageable monthly installments with
                  Affirm.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-brand-green-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Low monthly payments
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-brand-green-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Quick approval process
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-brand-green-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Flexible terms available
                  </li>
                </ul>
                <Link
                  href="/payment/affirm"
                  className="block w-full bg-brand-orange-600 hover:bg-brand-orange-700 text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Apply with Affirm
                </Link>
              </div>
            </div>

            {/* Funding Options */}
            <div className="mt-12 bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Additional Funding Options
              </h2>
              <p className="text-gray-600 text-center mb-8">
                You may qualify for free or reduced-cost training through
                workforce development programs.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/funding"
                  className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold mb-2">WIOA Funding</h3>
                  <p className="text-sm text-gray-600">
                    Workforce Innovation and Opportunity Act
                  </p>
                </Link>
                <Link
                  href="/grants"
                  className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Grants</h3>
                  <p className="text-sm text-gray-600">
                    Available grants and scholarships
                  </p>
                </Link>
                <Link
                  href="/eligibility"
                  className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold mb-2">Check Eligibility</h3>
                  <p className="text-sm text-gray-600">
                    See if you qualify for free training
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Our team is here to help you find the best payment option for your
              situation.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
