import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
import {
  GraduationCap,
  Search,
  GitCompare,
  Briefcase,
  BookOpen,
  Zap,
  TrendingUp,
  Building2,
  Award,
  FileCheck,
  CheckCircle,
  MapPin,
  Calendar,
  CalendarDays,
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
      icon: GraduationCap,
      image: '/media/programs/efh-cna-hero.jpg',
    },
    {
      title: 'Skilled Trades',
      description: 'HVAC, Electrical, Plumbing, Construction',
      href: '/programs/skilled-trades',
      icon: Briefcase,
      image: '/media/programs/efh-building-tech-hero.jpg',
    },
    {
      title: 'Barber & Beauty',
      description: 'Barbering, Cosmetology, Esthetics',
      href: '/programs/barber-apprenticeship',
      icon: Award,
      image: '/media/programs/efh-barber-hero.jpg',
    },
    {
      title: 'Technology',
      description: 'IT Support, Cybersecurity, Web Development',
      href: '/programs/technology',
      icon: BookOpen,
      image: '/media/programs/efh-building-tech-card.jpg',
    },
    {
      title: 'Business',
      description: 'Accounting, Management, Entrepreneurship',
      href: '/programs/business',
      icon: Building2,
      image: '/media/programs/workforce-readiness-hero.jpg',
    },
    {
      title: 'CDL & Transportation',
      description: 'Commercial Driving License training',
      href: '/programs/cdl-transportation',
      icon: TrendingUp,
      image: '/media/programs/cdl-hero.jpg',
    },
  ];

  return (
    <div className="pb-20 md:pb-0">
      {/* Video Hero Section */}
      <section className="relative w-full -mt-[72px]">
        <div className="relative min-h-[100vh] sm:min-h-[70vh] md:min-h-[75vh] w-full overflow-hidden">
          <img
            src="/images/efh/hero/hero-main.jpg"
            alt="Programs Overview"
            className="absolute inset-0 h-full w-full object-cover"
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full mb-6">
                <GraduationCap className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wide">
                  WIOA-Funded Career Training
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
                Free Career Training Programs
              </h1>

              {/* Subheadline */}
              <p className="text-xl sm:text-2xl md:text-3xl mb-4">
                100% Free • No Tuition • No Debt
              </p>

              {/* Body */}
              <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                Browse our complete catalog of training programs in healthcare,
                skilled trades, and business
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row justify-center">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-bold bg-white text-orange-600 hover:bg-gray-100 transition shadow-lg"
                >
                  Apply Now
                </Link>
                <Link
                  href="#programs"
                  className="inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-bold border-2 border-white text-white hover:bg-white/10 transition"
                >
                  Browse Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Program Cards Grid - Uniform Layout */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group block bg-white rounded-lg shadow hover:shadow-lg transition-all border border-gray-200 hover:border-gray-900 overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={link.image}
                      alt={link.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Text Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {link.title}
                    </h3>
                    <p className="text-gray-600">{link.description}</p>
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
    </div>
  );
}
