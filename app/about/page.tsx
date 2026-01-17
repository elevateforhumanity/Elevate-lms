import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About | Elevate for Humanity',
  description: 'Free career training and job placement for Indiana residents.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/about',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              About us
            </h1>
            <p className="text-xl text-gray-600">
              We provide free career training and job placement support for Indiana residents. 
              No tuition, real credentials, real careers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We connect Indiana residents to free career training through WIOA, WRG, and DOL funding programs. 
                Our goal is simple: help people get the credentials they need to start rewarding careers.
              </p>
              <p className="text-lg text-gray-600">
                We work with workforce partners, employers, and training providers to create clear pathways 
                from enrollment to employment.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/artlist/hero-training-1.jpg"
                alt="Students in training"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-gray-900">500+</p>
              <p className="text-gray-600">Students Served</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">15+</p>
              <p className="text-gray-600">Programs</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">50+</p>
              <p className="text-gray-600">Employer Partners</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">85%</p>
              <p className="text-gray-600">Placement Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            What we do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Training</h3>
              <p className="text-gray-600">
                Industry-recognized credentials in healthcare, skilled trades, technology, and business.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Support</h3>
              <p className="text-gray-600">
                Career counseling, resume help, interview prep, and job search assistance.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Placement</h3>
              <p className="text-gray-600">
                Direct connections to employers hiring our graduates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gray-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Free training for eligible Indiana residents.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 text-base font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-base font-medium rounded-full hover:bg-white hover:text-gray-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
