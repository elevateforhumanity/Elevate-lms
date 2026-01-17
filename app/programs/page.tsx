import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Programs | Elevate for Humanity',
  description: 'Free career training programs in healthcare, skilled trades, technology, and business.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs',
  },
};

const programs = [
  {
    title: 'Healthcare',
    description: 'CNA, Medical Assistant, Phlebotomy',
    href: '/programs/healthcare',
    image: '/images/healthcare/cna-training.jpg',
  },
  {
    title: 'Skilled Trades',
    description: 'HVAC, CDL, Electrical',
    href: '/programs/skilled-trades',
    image: '/images/trades/hero-program-hvac.jpg',
  },
  {
    title: 'Technology',
    description: 'CompTIA, Cybersecurity, IT Support',
    href: '/programs/technology',
    image: '/images/technology/hero-program-it-support.jpg',
  },
  {
    title: 'Business',
    description: 'Tax Preparation, Financial Services',
    href: '/programs/business',
    image: '/images/business/collaboration-1.jpg',
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Training Programs
          </h1>
          <p className="text-lg text-gray-600">
            Free for eligible Indiana residents
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid sm:grid-cols-2">
                  <div className="relative h-48 sm:h-full">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      quality={85}
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {program.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <span className="text-blue-600 font-semibold group-hover:underline">
                      View Programs →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <h3 className="font-bold text-gray-900">Apply</h3>
                <p className="text-sm text-gray-600">Check eligibility online</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <h3 className="font-bold text-gray-900">Train</h3>
                <p className="text-sm text-gray-600">Earn your credentials</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <h3 className="font-bold text-gray-900">Work</h3>
                <p className="text-sm text-gray-600">Get job placement support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to Start?
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
