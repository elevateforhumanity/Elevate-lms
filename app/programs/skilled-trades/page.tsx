import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Skilled Trades Programs | Elevate for Humanity',
  description: 'HVAC, CDL, Electrical training. Free for eligible Indiana residents.',
};

const programs = [
  {
    title: 'HVAC Technician',
    duration: '12-16 weeks',
    href: '/programs/hvac',
    image: '/images/trades/hero-program-hvac.jpg',
  },
  {
    title: 'CDL Commercial Driving',
    duration: '4-8 weeks',
    href: '/programs/cdl',
    image: '/images/trades/hero-program-cdl.jpg',
  },
  {
    title: 'Electrical Fundamentals',
    duration: '12 weeks',
    href: '/programs/skilled-trades',
    image: '/images/trades/hero-program-electrical.jpg',
  },
];

export default function SkilledTradesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <Link href="/programs" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block">
            ← Programs
          </Link>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Skilled Trades Programs
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                HVAC, CDL, and Electrical training.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/apply"
                  className="bg-blue-600 text-white px-6 py-3 font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-gray-300 text-gray-900 px-6 py-3 font-semibold rounded-lg hover:border-gray-400 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="relative h-72 lg:h-80 rounded-xl overflow-hidden">
              <Image
                src="/images/trades/hero-program-hvac.jpg"
                alt="Skilled trades training"
                fill
                className="object-cover"
                priority
                quality={90}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Programs</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {programs.map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={85}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{program.title}</h3>
                  <p className="text-sm text-gray-500">{program.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Hands-on technical skills</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Safety protocols & OSHA</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Blueprint reading</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Industry certifications</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Start Your Trades Career
          </h2>
          <Link
            href="/apply"
            className="inline-block bg-white text-blue-600 px-8 py-3 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </>
  );
}
