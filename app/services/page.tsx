import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import ServiceHero from '@/components/ServiceHero';
import {
  DollarSign,
  Briefcase,
  Users,
  Heart,
  TrendingUp,
  Calendar,
  GraduationCap,
  Lightbulb,
  Shield,
  Phone,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support Services | Elevate for Humanity',
  description:
    'Tax services, career counseling, job placement, and comprehensive support. We help you succeed every step of the way.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/services',
  },
};

export default function ServicesPage() {
  // Internal navigation for Services subpages
  const navLinks = [
    { label: 'Tax Services', href: '/tax-services' },
    { label: 'VITA Tax Prep', href: '/vita' },
    { label: 'Career Services', href: '/career-services' },
    { label: 'Career Center', href: '/career-center' },
    { label: 'Career Fairs', href: '/career-fair' },
    { label: 'Advising', href: '/advising' },
    { label: 'Mentorship', href: '/mentorship' },
    { label: 'Support Services', href: '/support' },
    { label: 'Help Center', href: '/help' },
  ];

  const services = [
    {
      title: 'Tax Services & Supersonic Fast Cash',
      description:
        'Professional tax preparation, refund advances, IRS representation, and maximum refund guarantee',
      href: '/tax-services',
      icon: DollarSign,
      image: '/images/heroes/cash-bills.jpg',
    },
    {
      title: 'VITA Tax Prep',
      description:
        'Free IRS-certified tax preparation for qualifying individuals',
      href: '/vita',
      icon: Heart,
      image: '/images/heroes/cash-bills.jpg',
    },
    {
      title: 'Career Services',
      description: 'Resume building, interview prep, and job search support',
      href: '/career-services',
      icon: Briefcase,
      image: '/images/efh/hero/hero-main-clean.jpg',
    },
    {
      title: 'Career Center',
      description: 'Job boards, employer connections, and placement assistance',
      href: '/career-center',
      icon: TrendingUp,
      image: '/images/business/collaboration-1.jpg',
    },
    {
      title: 'Career Fairs',
      description: 'Meet employers hiring our graduates at regular events',
      href: '/career-fair',
      icon: Users,
      image: '/images/pathways/business-hero.jpg',
    },
    {
      title: 'Academic Advising',
      description: 'One-on-one guidance to help you succeed in your program',
      href: '/advising',
      icon: GraduationCap,
      image: '/images/business/professional-1.jpg',
    },
    {
      title: 'Mentorship Program',
      description: 'Connect with industry professionals for guidance',
      href: '/mentorship',
      icon: Lightbulb,
      image: '/images/business/team-1.jpg',
    },
    {
      title: 'Support Services',
      description: 'Transportation, childcare, and barrier removal services',
      href: '/support',
      icon: Shield,
      image: '/images/business/team-2.jpg',
    },
    {
      title: 'Help Center',
      description: 'FAQs, guides, and support resources',
      href: '/help',
      icon: Phone,
      image: '/images/business/team-3.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Internal Navigation - Mobile Optimized */}
      <nav className="rich-nav bg-white border-b border-gray-200 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-3 -mx-4 px-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rich-nav-link px-4 py-2 text-sm font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition whitespace-nowrap flex-shrink-0 snap-start"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Banner - LEFT ALIGNED, ASYMMETRIC */}
      <section className="relative min-h-[70vh] w-full overflow-hidden bg-black">
        <Image src="/images/pathways/business-hero.jpg" alt="Our Services" width={800} height={600} className="absolute inset-0 w-full h-full object-cover opacity-40" quality={85} />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            {/* Administrative Header */}
            <div className="mb-6 text-xs uppercase tracking-wider text-gray-400 font-mono">
              STUDENT SUPPORT SERVICES / UPDATED JAN 2026
            </div>

            {/* Headline - LEFT ALIGNED, AGGRESSIVE */}
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[0.9] tracking-tight">
              Support<br/>Services
            </h1>

            {/* Body - TIGHTER, MORE DIRECT */}
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
              Tax preparation, career counseling, job placement assistance, and barrier removal services for enrolled students.
            </p>

            {/* Buttons - SHARP, NO ROUNDED */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/apply"
                className="bg-white text-black px-8 py-4 font-bold uppercase text-sm tracking-wide hover:bg-gray-200 transition-colors inline-flex items-center gap-3"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#services"
                className="border-2 border-white text-white px-8 py-4 font-bold uppercase text-sm tracking-wide hover:bg-white hover:text-black transition-colors inline-flex items-center gap-3"
              >
                <span>View All</span>
                <Zap className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENT-STYLE LEGITIMACY BLOCK */}
      <section className="bg-white border-y-4 border-black py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gray-50 border-l-4 border-black p-8">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-4 font-mono">
              ELIGIBILITY NOTICE / EFFECTIVE JANUARY 2026
            </div>
            <h3 className="text-2xl font-bold text-black mb-4 leading-tight">
              Services Available to Enrolled Students Only
            </h3>
            <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
              <p className="mb-3">
                Support services including tax preparation, career counseling, and job placement assistance are provided at no cost to students enrolled in approved training programs through WIOA, WRG, or DOL funding.
              </p>
              <p className="mb-3">
                <strong>Eligibility Requirements:</strong> Active enrollment in a credentialed program, compliance with attendance policies, and completion of intake documentation.
              </p>
              <p className="text-sm text-gray-600 mb-0">
                For questions regarding eligibility or service access, contact Student Services at (317) 314-3757 or visit the Help Center.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Grid - ASYMMETRIC */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">
              Available Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Click any service for details and access requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.href} href={service.href} className="group block">
                  <div className="bg-white border-2 border-gray-200 hover:border-black transition-colors overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        quality={85}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-5 h-5 text-black" />
                        <h3 className="text-xl font-bold text-black">{service.title}</h3>
                      </div>
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{service.description}</p>
                      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-black">
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial - Wix Style */}
      <section className="rich-section-alt">
        <div className="rich-container-narrow">
          <div className="rich-testimonial">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-8 h-8 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-relaxed text-center">
              "The career services team helped me land a job before I even
              graduated. The resume help and interview prep made all the
              difference."
            </blockquote>
            <p className="text-xl text-gray-600 text-center">
              — Marcus Thompson, HVAC Graduate
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA - Wix Style */}
      <section className="rich-hero relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="rich-container-narrow">
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={200}
                height={80}
                className="mx-auto brightness-0 invert"
              />
            </div>

            <h2 className="rich-headline text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="rich-body text-white/90 mb-10">
              Apply now and get access to all our support services
            </p>
            <Link
              href="/apply"
              className="rich-button-primary bg-orange-500 hover:bg-brand-orange-600 inline-flex items-center gap-3 text-xl"
            >
              <span>Apply Now - 100% Free</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="text-white/80 mt-6">
              Takes 5 minutes • No commitment required
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-100 text-center border-t border-gray-200">
        <p className="text-sm text-gray-600">
          © 2025 Elevate for Humanity. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
