import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
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
    canonical: 'https://www.elevateforhumanity.org/services',
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
      image: '/images/heroes/hero-homepage.jpg',
    },
    {
      title: 'VITA Tax Prep',
      description:
        'Free IRS-certified tax preparation for qualifying individuals',
      href: '/vita',
      icon: Heart,
      image: '/images/heroes/hero-homepage.jpg',
    },
    {
      title: 'Career Services',
      description: 'Resume building, interview prep, and job search support',
      href: '/career-services',
      icon: Briefcase,
      image: '/images/heroes/hero-homepage.jpg',
    },
    {
      title: 'Career Center',
      description: 'Job boards, employer connections, and placement assistance',
      href: '/career-center',
      icon: TrendingUp,
      image: '/images/heroes/hero-homepage.jpg',
    },
    {
      title: 'Career Fairs',
      description: 'Meet employers hiring our graduates at regular events',
      href: '/career-fair',
      icon: Users,
      image: '/images/heroes/hero-homepage.jpg',
    },
    {
      title: 'Academic Advising',
      description: 'One-on-one guidance to help you succeed in your program',
      href: '/advising',
      icon: GraduationCap,
      image: '/images/heroes/hero-homepage.jpg',
    },
    {
      title: 'Mentorship Program',
      description: 'Connect with industry professionals for guidance',
      href: '/mentorship',
      icon: Lightbulb,
      image: '/images/heroes/hero-homepage.jpg',
    },
    {
      title: 'Support Services',
      description: 'Transportation, childcare, and barrier removal services',
      href: '/support',
      icon: Shield,
      image: '/images/heroes/hero-homepage.jpg',
    },
    {
      title: 'Help Center',
      description: 'FAQs, guides, and support resources',
      href: '/help',
      icon: Phone,
      image: '/images/heroes/hero-homepage.jpg',
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

      {/* Video Hero Banner - Wix Style */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/services-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-6xl w-full rich-animate">
            {/* Logo */}
            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={200}
                height={80}
                className="mx-auto brightness-0 invert"
              />
            </div>

            {/* Badge */}
            <div className="rich-badge mb-8 bg-teal-500/20 border-teal-500/30 text-teal-100">
              <Heart className="w-5 h-5" />
              <span>Comprehensive Support Services</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 leading-tight">
              WE SUPPORT YOUR SUCCESS
            </h1>

            {/* Subheadline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
              More Than Just Training
            </h2>

            {/* Body */}
            <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Tax services, career counseling, job placement, and comprehensive
              support to help you succeed
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/apply"
                className="rich-button-primary uppercase inline-flex items-center gap-3"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#services"
                className="rich-button-secondary text-white border-white hover:bg-white hover:text-teal-600 uppercase inline-flex items-center gap-3"
              >
                <span>View Services</span>
                <Zap className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Services Grid - Wix Style with Large Images */}
      <section id="services" className="rich-section bg-white">
        <div className="rich-container">
          <div className="text-center mb-16">
            <h2 className="rich-headline text-gray-900 mb-6">
              All Services & Support
            </h2>
            <p className="rich-body max-w-3xl mx-auto">
              Click any service to learn more and get started
            </p>
          </div>

          <div className="rich-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.href} href={service.href} className="group">
                  <div className="rich-card">
                    <div className="rich-image-container h-64 mb-6">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="rich-image object-cover"
                      />
                      <div className="rich-overlay">
                        <div className="rich-icon-container">
                          <Icon className="w-8 h-8 text-gray-900" />
                        </div>
                      </div>
                    </div>
                    <h3 className="rich-subheadline text-gray-900 group-hover:text-teal-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="rich-body mb-4">{service.description}</p>
                    <div className="flex items-center gap-2 text-teal-600 font-bold">
                      <span>Learn More</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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
