import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HomeHeroVideo from './HomeHeroVideo';

export const metadata: Metadata = {
  title: 'Free Career Training | Elevate for Humanity',
  description: 'Launch your new career in 8-16 weeks with 100% free WIOA-funded training. Healthcare, Skilled Trades, Technology programs in Indiana.',
};

const programCategories = [
  {
    title: 'Healthcare',
    description: 'CNA, Medical Assistant, Phlebotomy',
    href: '/programs/healthcare',
    image: '/images/healthcare/hero-programs-healthcare.jpg',
  },
  {
    title: 'Skilled Trades',
    description: 'HVAC, Electrical, Welding, CDL',
    href: '/programs/skilled-trades',
    image: '/images/trades/hero-program-hvac.jpg',
  },
  {
    title: 'Technology',
    description: 'IT Support, Cybersecurity, Web Dev',
    href: '/programs/technology',
    image: '/images/technology/hero-programs-technology.jpg',
  },
  {
    title: 'Barber Apprenticeship',
    description: 'USDOL Registered Program',
    href: '/programs/barber-apprenticeship',
    image: '/images/beauty/program-barber-training.jpg',
  },
  {
    title: 'Business & Finance',
    description: 'Tax Prep, Entrepreneurship',
    href: '/programs/business',
    image: '/images/business/tax-prep-certification.jpg',
  },
  {
    title: 'Cosmetology',
    description: 'Esthetician, Nail Tech',
    href: '/programs/cosmetology-apprenticeship',
    image: '/images/beauty/hero-program-cosmetology.jpg',
  },
];

const fundingOptions = [
  {
    title: 'WIOA Funding',
    description: 'Federal program that pays for job training, books, supplies, and support services.',
    image: '/images/funding/funding-dol-program-v2.jpg',
    href: '/wioa-eligibility',
  },
  {
    title: 'Apprenticeships',
    description: 'Earn while you learn with USDOL-registered apprenticeship programs.',
    image: '/images/funding/funding-dol-program.jpg',
    href: '/apprenticeships',
  },
  {
    title: 'JRI Funding',
    description: '100% free training for justice-involved individuals with career support.',
    image: '/images/funding/funding-jri-program-v2.jpg',
    href: '/jri',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero - Video only, no text overlay */}
      <section className="relative w-full h-[60vh] min-h-[400px] overflow-hidden bg-slate-900">
        <HomeHeroVideo />
      </section>

      {/* Programs Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Training Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programCategories.map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                    {program.title}
                  </h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Funding Options */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How Training Can Be Free
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {fundingOptions.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={option.image}
                    alt={option.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                    {option.title}
                  </h3>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Your New Career
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100"
            >
              Apply Now - It's Free
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
