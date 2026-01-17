import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'For Employers | Elevate for Humanity',
  description: 'Hire trained workers. No recruiting fees. Build your workforce pipeline.',
};

export default function EmployerPage() {
  return (
    <>
      {/* Hero - pt accounts for fixed header */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Hire trained,{' '}
                <span className="italic">job-ready</span> workers.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Access candidates with industry credentials. No recruiting fees.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-base font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  Partner With Us
                </Link>
                <Link
                  href="/hire-graduates"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-900 text-base font-medium rounded-full hover:border-gray-900 transition-colors"
                >
                  View Candidates
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/artlist/hero-training-3.jpg"
                alt="Employer partnership"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            Why partner with us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No Fees</h3>
              <p className="text-gray-600">
                Access our talent pipeline at no cost. We're funded by workforce development grants.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trained Workers</h3>
              <p className="text-gray-600">
                Candidates come with industry certifications and hands-on training.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ongoing Support</h3>
              <p className="text-gray-600">
                We provide retention support and can help build apprenticeship programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            Industries we serve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-gray-50 rounded-2xl text-center">
              <p className="font-semibold text-gray-900">Healthcare</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl text-center">
              <p className="font-semibold text-gray-900">Skilled Trades</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl text-center">
              <p className="font-semibold text-gray-900">Technology</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl text-center">
              <p className="font-semibold text-gray-900">Business</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-gray-900">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect</h3>
              <p className="text-gray-600">
                Tell us about your hiring needs and timeline
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-gray-900">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Match</h3>
              <p className="text-gray-600">
                We send you qualified, pre-screened candidates
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-gray-900">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hire</h3>
              <p className="text-gray-600">
                Interview and hire with ongoing support from our team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to build your workforce?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            No fees. Trained candidates. Ongoing support.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 text-base font-medium rounded-full hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
