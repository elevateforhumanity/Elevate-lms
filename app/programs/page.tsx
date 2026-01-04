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
    canonical: 'https://elevateforhumanity.org/programs',
  },
};

export default function ProgramsBioSitePage() {
  // Internal navigation for Programs subpages
  const navLinks = [
    { label: 'Programs Catalog', href: '/programs-catalog' },
    { label: 'Program Finder', href: '/program-finder' },
    { label: 'Compare Programs', href: '/compare-programs' },
    { label: 'Apprenticeships', href: '/apprenticeships' },
    { label: 'Courses', href: '/courses' },
    { label: 'Pathways', href: '/pathways' },
    { label: 'Credentials', href: '/credentials' },
    { label: 'Certificates', href: '/certificates' },
    { label: 'Accreditation', href: '/accreditation' },
    { label: 'Features', href: '/features' },
  ];

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
      image: '/images/certificates-hero.jpg',
      color: 'red',
    },
    {
      title: 'Certificates',
      description: 'Completion certificates and digital badges',
      href: '/certificates',
      icon: FileCheck,
      image: '/images/certificates-hero.jpg',
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
      image: null,
      color: 'lime',
    },
  ];

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero Banner with Image */}
      <section className="relative w-full -mt-[72px]">
        <div className="relative min-h-[70vh] w-full overflow-hidden">
          <Image
            src="/media/programs/workforce-readiness-hero.jpg"
            alt="Free Career Training Programs"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 to-orange-700/90" />
          
          <div className="relative z-10 flex items-center justify-center min-h-[70vh]">
            <div className="max-w-4xl mx-auto px-6 text-center text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
                <GraduationCap className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wide">
                  WIOA-Funded Career Training
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
                Free Career Training Programs
              </h1>

              {/* Subheadline */}
              <p className="text-2xl md:text-3xl mb-4">
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

      {/* Internal Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <div className="flex overflow-x-auto gap-1 py-2 md:py-3 scrollbar-hide">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rich-nav-link px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      <section id="programs" className="pt-16 pb-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo/Icon */}
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <GraduationCap className="w-12 h-12 text-gray-900" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Free Career Training Programs
          </h1>

          {/* Tagline */}
          <p className="text-xl text-gray-600 mb-8">
            Programs in Healthcare, Skilled Trades & Business
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div>
              <div className="text-3xl font-black text-brand-orange-600">
                100%
              </div>
              <div className="text-sm text-gray-600">Free</div>
            </div>
            <div>
              <div className="text-3xl font-black text-brand-green-600">
                WIOA
              </div>
              <div className="text-sm text-gray-600">Funded</div>
            </div>
            <div>
              <div className="text-3xl font-black text-brand-blue-600">
                ETPL
              </div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Links Section */}
      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group block bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-brand-orange-500 hover:scale-105 transform"
              >
                <div className="flex items-center gap-4">
                  {link.image ? (
                    <div className="w-16 h-16 relative rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Image
                        src={link.image}
                        alt={link.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 bg-${link.color}-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className={`w-6 h-6 text-${link.color}-600`} />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-brand-orange-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand-orange-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </Link>
            );
          })}

          {/* Apply CTA */}
          <Link
            href="/apply"
            className="block bg-gradient-to-br from-brand-blue-600 to-brand-purple-600 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all hover:scale-105 transform text-center"
          >
            <h3 className="text-2xl font-black text-white mb-2">
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
