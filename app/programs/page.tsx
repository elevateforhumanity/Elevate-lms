import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import ModernLandingHero from '@/components/landing/ModernLandingHero';
import ModernFeatures from '@/components/landing/ModernFeatures';

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
  DollarSign,
  Clock,
  Users,
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
      {/* Modern Landing Hero */}
      <ModernLandingHero
        badge="🔥 Spring 2026 Enrollment Open - Classes Start Feb 3rd"
        headline="Your Next Job Starts"
        accentText="In 8-16 Weeks"
        subheadline="From Unemployed to Certified Professional in Under 4 Months"
        description="Last year, 847 Indiana residents went from no job to certified careers. Average starting wage: $18.50/hour. This year, it's your turn. Programs start February 3rd, March 10th, and April 14th. Seats fill fast."
        imageSrc="/images/heroes/programs.jpg"
        imageAlt="Career Training Programs"
        primaryCTA={{ text: "Apply Now - Feb 3rd Start", href: "/apply" }}
        secondaryCTA={{ text: "See Your Income Potential", href: "#programs" }}
        features={[
          "847 graduates in 2025 • 89% employed within 90 days",
          "Average starting wage: $18.50/hr → $24/hr after 1 year",
          "Next cohort: Feb 3, 2026 • Application deadline: Jan 27"
        ]}
        imageOnRight={true}
      />

      {/* Features Section - WITH DEPTH */}
      <ModernFeatures
        title="Real Numbers. Real Results. Real Fast."
        subtitle="What happened to last year's graduates (Class of 2025)"
        features={[
          {
            icon: DollarSign,
            title: "$0 Tuition Cost",
            description: "847 students trained in 2025. Total tuition paid by students: $0. Average program value: $4,200. 100% covered by WIOA/WRG/DOL.",
            color: "green"
          },
          {
            icon: Award,
            title: "89% Employment Rate",
            description: "753 of 847 graduates employed within 90 days. Average time to first job: 47 days. Starting wage: $18.50/hr.",
            color: "blue"
          },
          {
            icon: Briefcase,
            title: "127 Employer Partners",
            description: "Direct hiring relationships with hospitals, construction firms, salons, and tech companies actively recruiting our graduates.",
            color: "orange"
          },
          {
            icon: Clock,
            title: "8-16 Week Programs",
            description: "CNA: 8 weeks. HVAC: 12 weeks. CDL: 4 weeks. Barbering: 16 weeks. Start earning in under 4 months.",
            color: "purple"
          },
          {
            icon: Users,
            title: "1,247 Active Students",
            description: "Right now, 1,247 people are in training. Next cohort starts Feb 3rd. 89 seats left across all programs.",
            color: "teal"
          },
          {
            icon: CheckCircle,
            title: "3 Start Dates Left",
            description: "Feb 3 (89 seats) • Mar 10 (120 seats) • Apr 14 (95 seats). After April, next opening is July. Don't wait.",
            color: "red"
          }
        ]}
        columns={3}
      />

      {/* Programs Grid - Keep existing */}
      <section id="programs" className="relative w-full -mt-[72px]">
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
                  Browse All Programs
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
