import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import VideoHeroBanner from '@/components/home/VideoHeroBanner';
import { ProgramFitNavigator } from '@/components/chatbot/ProgramFitNavigator';
import { programs } from '@/app/data/programs';

import {
  ArrowRight,
  Clock,
  DollarSign,
  Award,
  Users,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Career Training Programs in Indiana | Indiana Career Connect',
  description:
    'Find your path to a better career. 100% free training programs in healthcare, skilled trades, and business. Funded by Indiana Career Connect and WIOA. Start today.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs',
  },
  openGraph: {
    title: 'Free Career Training Programs in Indiana',
    description: '100% free training programs in healthcare, skilled trades, and business. Funded by WIOA.',
    url: 'https://www.elevateforhumanity.org/programs',
    siteName: 'Elevate for Humanity',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Career Training Programs' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Career Training Programs in Indiana',
    description: '100% free training programs in healthcare, skilled trades, and business.',
    images: ['/og-default.jpg'],
  },
};

// Category definitions
const categories = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    description: 'CNA, Medical Assistant, Phlebotomy, Home Health Aide',
    href: '/programs/healthcare',
    image: '/hero-images/healthcare-category.jpg',
    programCount: 5,
  },
  {
    id: 'skilled-trades',
    title: 'Skilled Trades',
    description: 'HVAC, Building Maintenance, Construction',
    href: '/programs/skilled-trades',
    image: '/hero-images/skilled-trades-category.jpg',
    programCount: 2,
  },
  {
    id: 'beauty',
    title: 'Barber & Beauty',
    description: 'Barbering, Cosmetology, Esthetics',
    href: '/programs/beauty',
    image: '/hero-images/barber-beauty-category.jpg',
    programCount: 3,
  },
  {
    id: 'technology',
    title: 'Technology',
    description: 'IT Support, Cybersecurity, Web Development',
    href: '/programs/technology',
    image: '/hero-images/technology-category.jpg',
    programCount: 2,
  },
  {
    id: 'business',
    title: 'Business & Finance',
    description: 'Tax Preparation, Entrepreneurship, Marketing',
    href: '/programs/business',
    image: '/hero-images/business-category.jpg',
    programCount: 2,
  },
  {
    id: 'cdl',
    title: 'CDL & Transportation',
    description: 'Commercial Driving License training',
    href: '/programs/cdl-transportation',
    image: '/hero-images/cdl-transportation-category.jpg',
    programCount: 1,
  },
];

export default function ProgramsPage() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Video Hero Banner */}
      <VideoHeroBanner
        videoSrc="https://cms-artifacts.artlist.io/content/generated-video-v1/video__4/generated-video-9491ff2d-bd5a-4570-83e7-05d99663557f.mp4?Expires=2083815524&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=QrhRT-F1esgs7xBiA0V1HdpuLcyOjHOEUqzMq1fHh4Iw5aSjKZaJ3jLIk24K0YTtDZ7bpfV0eSDfR2NVj5MxkspUBgM3hiYbKaqf-rjhwHgzr-7HSccYB~Bc~Xnx~ThA3qLiUjwDkQnsOZrRBkHA7qLUdW~rCcWxdPC9v4gmODoUA9~Py0nHAIApwN8EGUHvCKuLLIO8kALgdCZfGFyCkqX8inUNi5JLb3IpAgjyeln~y3UvS~M~OJ729cO12JFcI98baFH90uayae4~TVAPpkgRl3IjHJ40b86gPOUfvOvw6vkM8nxLivsa7nzpe5Uz6tWlKaiL~hFu4SK3WiTTPw__"
        headline="Career Training Programs"
        subheadline={`${programs.length}+ Free Programs in Healthcare, Skilled Trades, Business & More`}
        primaryCTA={{ text: 'Apply Now', href: '/apply' }}
        secondaryCTA={{ text: 'Browse Programs', href: '#all-programs' }}
      />

      {/* Program Fit Navigator */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProgramFitNavigator variant="inline" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-brand-blue-600 to-brand-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">{programs.length}+</div>
              <div className="text-white/80">Training Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-white/80">Free with Funding</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4-24</div>
              <div className="text-white/80">Weeks to Complete</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">90%+</div>
              <div className="text-white/80">Job Placement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Programs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Why Choose Our Programs</h2>
            <p className="text-xl text-black">Real training, real credentials, real careers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <DollarSign className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">100% Free Training</h3>
              <p className="text-black">No tuition costs with WIOA, WRG, or DOL funding. Training is completely free for eligible students.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">Industry Credentials</h3>
              <p className="text-black">Earn certifications and licenses that employers recognize and value in the job market.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">Job Placement Support</h3>
              <p className="text-black">Connect with employers hiring our graduates. We help you find work after program completion.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Clock className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">Fast-Track Programs</h3>
              <p className="text-black">Complete programs in weeks or months, not years. Get certified and start earning sooner.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">Career Support Services</h3>
              <p className="text-black">Resume building, interview prep, job search assistance, and ongoing career counseling.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-black mb-3">Multiple Start Dates</h3>
              <p className="text-black">Rolling enrollment throughout the year. Apply now to secure your spot in the next cohort.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Browse by Category</h2>
            <p className="text-xl text-black">Find the right career path for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-brand-orange-500 overflow-hidden"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                    <p className="text-white/90 text-sm">{category.description}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">{category.programCount} programs</span>
                  <ArrowRight className="w-5 h-5 text-brand-orange-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Programs Grid */}
      <section id="all-programs" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">All Programs</h2>
            <p className="text-xl text-black">{programs.length} career training programs available</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group block bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 hover:border-brand-orange-500 overflow-hidden"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={program.heroImage || '/hero-images/default-program.jpg'}
                    alt={program.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-2 rounded">
                      Free with Funding
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-brand-orange-600 transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {program.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-2 rounded">
                      <Clock className="w-3 h-3" />
                      {program.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-2 rounded">
                      <Award className="w-3 h-3" />
                      {program.credential.split(';')[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-orange-600">Learn More</span>
                    <ArrowRight className="w-5 h-5 text-brand-orange-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="py-16 bg-gradient-to-br from-brand-blue-600 to-brand-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8">
            Apply now - takes just 5 minutes. Our team will help you find the right program and funding options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">
            Questions? Contact us at{' '}
            <a
              href="mailto:elevate4humanityedu@gmail.com"
              className="text-brand-orange-600 hover:underline"
            >
              elevate4humanityedu@gmail.com
            </a>
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
