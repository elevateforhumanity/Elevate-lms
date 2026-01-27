import Link from 'next/link';
import Image from 'next/image';
import { PathwayBlock } from '@/components/PathwayBlock';
import PathwayDisclosure from '@/components/compliance/PathwayDisclosure';
import ProgramsHeroVideo from './ProgramsHeroVideo';
import PageAvatar from '@/components/PageAvatar';

interface ProgramCategory {
  title: string;
  description: string;
  href: string;
  image: string;
  count: number;
}

// Static categories for consistent display
const categories: ProgramCategory[] = [
  {
    title: 'Healthcare',
    description: 'CNA, Medical Assistant, Phlebotomy',
    href: '/programs/healthcare',
    image: '/images/healthcare/program-cna-training.jpg',
    count: 5,
  },
  {
    title: 'Skilled Trades',
    description: 'HVAC, Electrical, Welding, CDL',
    href: '/programs/skilled-trades',
    image: '/images/trades/hero-program-hvac.jpg',
    count: 8,
  },
  {
    title: 'Technology',
    description: 'IT Support, Cybersecurity, Web Development',
    href: '/programs/technology',
    image: '/images/technology/hero-programs-technology.jpg',
    count: 4,
  },
  {
    title: 'Business & Finance',
    description: 'Tax Preparation, Entrepreneurship',
    href: '/programs/business',
    image: '/images/business/tax-prep-certification.jpg',
    count: 3,
  },
  {
    title: 'Barber Apprenticeship',
    description: 'USDOL Registered Barber Training',
    href: '/programs/barber-apprenticeship',
    image: '/images/beauty/program-barber-training.jpg',
    count: 1,
  },
  {
    title: 'Cosmetology',
    description: 'Esthetician, Nail Tech, Hair Styling',
    href: '/programs/cosmetology-apprenticeship',
    image: '/images/beauty/hero-program-cosmetology.jpg',
    count: 3,
  },
  {
    title: 'Apprenticeships',
    description: 'USDOL Registered Programs',
    href: '/apprenticeships',
    image: '/images/trades/hero-program-welding.jpg',
    count: 5,
  },
];

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero - Clean video with just CTAs */}
      <section className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] flex items-end overflow-hidden bg-slate-900">
        <ProgramsHeroVideo />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/apply"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Start Eligibility & Choose a Career Path
            </Link>
            <Link 
              href="/wioa-eligibility"
              className="inline-flex items-center text-white text-lg border-b-2 border-white pb-1 hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
            >
              Learn About Eligibility
            </Link>
          </div>
          <p className="text-blue-200 text-sm mt-4 max-w-xl">
            All programs require eligibility screening before enrollment.
          </p>
        </div>
      </section>

      {/* Avatar Guide */}
      <PageAvatar 
        videoSrc="/videos/avatars/home-welcome.mp4" 
        title="Explore Programs" 
      />

      {/* Programs Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-slate-100"
              >
                <div 
                  className="relative h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                  role="img"
                  aria-label={category.title}
                >
                  {category.count > 0 && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {category.count} Programs
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <span className="text-blue-600 font-semibold group-hover:underline">
                    View Programs →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pathway Block */}
      <PathwayBlock variant="dark" />

      {/* Pathway Disclosure */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <PathwayDisclosure variant="full" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Link
            href="/apply"
            className="inline-block bg-white text-blue-600 px-8 py-3 font-semibold rounded-full hover:bg-blue-50 transition-colors"
          >
            Start Eligibility & Choose This Program
          </Link>
        </div>
      </section>
    </div>
  );
}
