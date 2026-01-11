import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import ModernLandingHero from '@/components/landing/ModernLandingHero';
import ModernFeatures from '@/components/landing/ModernFeatures';

import {
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Career Training Programs in Indiana | Indiana Career Connect',
  description:
    'Find your path to a better career. 100% free training programs in healthcare, skilled trades, and business. Funded by Indiana Career Connect and WIOA. Start today.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/programs',
  },
};

export default function ProgramsBioSitePage() {

  const links = [
    {
      title: 'Healthcare',
      description: 'CNA, Medical Assistant, Home Health Aide',
      href: '/programs/healthcare',
      image: '/hero-images/healthcare-category.jpg',
    },
    {
      title: 'Skilled Trades',
      description: 'HVAC, Electrical, Plumbing, Construction',
      href: '/programs/skilled-trades',
      image: '/hero-images/skilled-trades-category.jpg',
    },
    {
      title: 'Barber & Beauty',
      description: 'Barbering, Cosmetology, Esthetics',
      href: '/programs/barber-apprenticeship',
      image: '/hero-images/barber-beauty-category.jpg',
    },
    {
      title: 'Technology',
      description: 'IT Support, Cybersecurity, Web Development',
      href: '/programs/technology',
      image: '/hero-images/technology-category.jpg',
    },
    {
      title: 'Business',
      description: 'Accounting, Management, Entrepreneurship',
      href: '/programs/business',
      image: '/hero-images/business-category.jpg',
    },
    {
      title: 'CDL & Transportation',
      description: 'Commercial Driving License training',
      href: '/programs/cdl-transportation',
      image: '/hero-images/cdl-transportation-category.jpg',
    },
  ];

  return (
    <div className="pb-20 md:pb-0">
      {/* Modern Landing Hero */}
      <ModernLandingHero
        badge="Spring 2026 Enrollment Open"
        headline="Career Training Programs"
        accentText="Start Your Future"
        subheadline="Healthcare • Skilled Trades • Technology • Business"
        description="Explore 20+ career training programs across multiple industries. 100% funded through WIOA, WRG, and DOL programs. No tuition. No debt. Earn industry-recognized credentials and connect with employers."
        imageSrc="/hero-images/apprenticeships-hero.jpg"
        imageAlt="Career Training Programs - Students Learning"
        primaryCTA={{ text: "Browse Programs", href: "#programs" }}
        secondaryCTA={{ text: "Apply Now", href: "/apply" }}
        features={[
          "20+ programs in high-demand industries",
          "100% free training with WIOA, WRG, or DOL funding",
          "Industry credentials and job placement support"
        ]}
        imageOnRight={true}
      />

      {/* Features Section with Images */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">Why Choose Our Programs</h2>
            <p className="text-xl text-black">Real training, real credentials, real careers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 mb-4">
                <Image src="/images/icons/dollar.png" alt="Free Training" width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">100% Free Training</h3>
              <p className="text-black">No tuition costs with WIOA, WRG, or DOL funding. Training is completely free for eligible students.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 mb-4">
                <Image src="/images/icons/award.png" alt="Industry Credentials" width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Industry Credentials</h3>
              <p className="text-black">Earn certifications and licenses that employers recognize and value in the job market.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 mb-4">
                <Image src="/images/icons/users.png" alt="Job Placement" width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Job Placement Support</h3>
              <p className="text-black">Connect with employers hiring our graduates. We help you find work after program completion.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 mb-4">
                <Image src="/images/icons/clock.png" alt="Fast Track" width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Fast-Track Programs</h3>
              <p className="text-black">Complete programs in weeks or months, not years. Get certified and start earning sooner.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 mb-4">
                <Image src="/images/icons/check-circle.png" alt="Career Support" width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Career Support Services</h3>
              <p className="text-black">Resume building, interview prep, job search assistance, and ongoing career counseling.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-16 h-16 mb-4">
                <Image src="/images/icons/trending-up.png" alt="Multiple Start Dates" width={64} height={64} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Multiple Start Dates</h3>
              <p className="text-black">Rolling enrollment throughout the year. Apply now to secure your spot in the next cohort.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Cards Grid */}
      <main id="main-content">
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {links.map((link) => {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group block bg-white rounded-lg shadow hover:shadow-lg transition-all border border-gray-200 hover:border-gray-900 overflow-hidden"
                >
                  {/* Image Section - Square */}
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={link.image}
                      alt={link.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Text Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-2">
                      {link.title}
                    </h3>
                    <p className="text-black">{link.description}</p>
                  </div>
                </Link>
              );
            })}

          </div>
          
          {/* Apply CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/apply"
              className="inline-block bg-gradient-to-br from-brand-blue-600 to-brand-purple-600 rounded-2xl px-8 py-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 transform"
            >
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                Ready to Get Started?
              </h3>
              <p className="text-white/90 mb-4">
                Apply now - takes just 5 minutes
              </p>
              <div className="inline-flex items-center gap-2 text-white font-bold">
                <span>Apply Now</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="pb-12 px-4">
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
            © 2025 Elevate for Humanity. All rights reserved.
          </p>
        </div>
      </section>
      </main>
    </div>
  );
}
