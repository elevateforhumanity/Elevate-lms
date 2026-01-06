import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Users, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://elevateforhumanity.institute/team',
  },
  title: 'Our Team | Elevate For Humanity',
  description:
    'People behind the work. Meet the team powering workforce development and community impact.',
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="Our Team"
          fill
          className="object-cover brightness-50"
          quality={100}
          priority
          sizes="100vw"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            People behind the work
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Elevate for Humanity is led by Elizabeth Greene, who manages all
              aspects of workforce development, compliance, partnerships, and
              operations.
            </p>

            <div className="bg-blue-50 border-l-4 border-brand-blue-600 p-6 my-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                As a solo founder, Elizabeth handles program delivery,
                regulatory compliance, partner coordination, and student
                support—ensuring every individual receives the guidance they
                need to succeed.
              </p>
            </div>

            <blockquote className="text-xl font-semibold text-gray-900 italic border-l-4 border-brand-blue-600 pl-6 my-8">
              Systems should work for people. That's what drives this work every
              day.
            </blockquote>
          </div>

          {/* Founder */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-96 md:h-auto">
                  <Image
                    src="/images/team/founder/elizabeth-greene-founder-hero-01.jpg"
                    alt="Elizabeth Greene - Founder & CEO"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Elizabeth Greene
                  </h2>
                  <p className="text-brand-orange-600 font-semibold text-xl mb-6">
                    Founder & CEO
                  </p>
                  <div className="space-y-4 text-gray-700">
                    <p className="leading-relaxed">
                      Elizabeth founded and operates Elevate for Humanity
                      (2EXCLUSIVE LLC-S), managing all aspects of workforce
                      development, compliance, partnerships, and operations.
                    </p>
                    <p className="leading-relaxed">
                      She handles program delivery, regulatory compliance,
                      partner coordination, employer relationships, and student
                      support—ensuring every individual receives the guidance
                      they need to succeed.
                    </p>
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-3">
                        Areas of Focus:
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">
                            Workforce development program design
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">
                            Government contracting & compliance
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">
                            Strategic partnerships
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-brand-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">
                            Community-centered systems design
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work With Us</h2>
          <p className="text-xl text-blue-100 mb-8">
            Interested in partnering or joining our team?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partners"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Partner With Us
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 text-white rounded-lg text-lg font-bold hover:bg-blue-600 border-2 border-white transition-colors"
            >
              Contact Our Team
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
