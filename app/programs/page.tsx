import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
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
    canonical: 'https://www.elevateforhumanity.org/programs',
  },
};

export default function ProgramsBioSitePage() {

  const links = [
    {
      title: 'Programs Catalog',
      description: 'Browse our complete catalog of training programs',
      href: '/programs-catalog',
      icon: BookOpen,
      image: '/images/programs-catalog-hero.jpg',
      color: 'orange',
    },
    {
      title: 'Program Finder',
      description: 'Take our quiz to find your perfect program match',
      href: '/program-finder',
      icon: Search,
      image: '/media/programs/cpr-group-training-hd.jpg',
      color: 'blue',
    },
    {
      title: 'Compare Programs',
      description: 'Side-by-side comparison of programs',
      href: '/compare-programs',
      icon: GitCompare,
      image: '/images/compare-programs-hero.jpg',
      color: 'green',
    },
    {
      title: 'Apprenticeships',
      description: 'Earn while you learn with paid apprenticeships',
      href: '/apprenticeships',
      icon: Briefcase,
      image: '/images/apprenticeships-card.jpg',
      color: 'purple',
    },
    {
      title: 'Individual Courses',
      description: 'Take single courses to build specific skills',
      href: '/courses',
      icon: BookOpen,
      image: '/images/homepage/funded-programs.jpg',
      color: 'pink',
    },
    {
      title: 'Micro Classes',
      description: 'Short 1-4 hour classes for quick skills',
      href: '/micro-classes',
      icon: Zap,
      image: '/images/micro-classes-hero.jpg',
      color: 'yellow',
    },
    {
      title: 'Career Pathways',
      description: 'Clear paths from training to employment',
      href: '/pathways',
      icon: TrendingUp,
      image: '/media/programs/workforce-readiness-hero.jpg',
      color: 'indigo',
    },
    {
      title: 'Industries',
      description: 'Explore programs by industry sector',
      href: '/industries',
      icon: Building2,
      image: '/images/industries-card.jpg',
      color: 'cyan',
    },
    {
      title: 'Credentials',
      description: "Industry-recognized certifications you'll earn",
      href: '/credentials',
      icon: Award,
      image: '/media/programs/efh-cna-hero.jpg',
      color: 'red',
    },
    {
      title: 'Certificates',
      description: 'Completion certificates and digital badges',
      href: '/certificates',
      icon: FileCheck,
      image: '/media/programs/efh-beauty-career-educator-hero.jpg',
      color: 'teal',
    },
    {
      title: 'Accreditation',
      description: 'Our accreditations and quality standards',
      href: '/accreditation',
      icon: CheckCircle,
      image: '/media/programs/cpr-certification-group-hd.jpg',
      color: 'emerald',
    },
    {
      title: 'Platform Features',
      description: 'LMS, mobile app, AI tutoring, and more',
      href: '/features',
      icon: Zap,
      image: '/media/programs/hvac-highlight-3.jpg',
      color: 'violet',
    },
    {
      title: 'Locations',
      description: 'Find training locations near you',
      href: '/locations',
      icon: MapPin,
      image: '/images/locations-card.jpg',
      color: 'rose',
    },
    {
      title: 'Class Schedule',
      description: 'View upcoming class start dates',
      href: '/schedule',
      icon: Calendar,
      image: '/images/schedule-card.jpg',
      color: 'amber',
    },
    {
      title: 'Calendar',
      description: 'Book a virtual team meeting',
      href: '/calendar',
      icon: CalendarDays,
      image: '/images/calendar-card.jpg',
      color: 'lime',
    },
  ];

  return (
    <div className="pb-20 md:pb-0">
      {/* Header Section - No Hero Banner */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wide">
              WIOA-Funded Career Training
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 text-gray-900">
            Free Career Training Programs
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl md:text-3xl mb-4 text-gray-800">
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
      </section>



      {/* Program Cards Grid - Square Cards */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-brand-orange-500 hover:scale-105 transform overflow-hidden aspect-square"
                >
                  {/* Image/Icon Section */}
                  <div className="relative h-2/3 w-full overflow-hidden">
                    {link.image ? (
                      <Image
                        src={link.image}
                        alt={link.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className={`w-full h-full bg-${link.color}-100 flex items-center justify-center`}>
                        <Icon className={`w-16 h-16 text-${link.color}-600`} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  {/* Text Section */}
                  <div className="p-4 h-1/3 flex flex-col justify-center">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 group-hover:text-brand-orange-600 transition-colors line-clamp-2">
                      {link.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{link.description}</p>
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
