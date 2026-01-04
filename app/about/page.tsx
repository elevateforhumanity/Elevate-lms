import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { CheckCircle, ArrowRight, Star, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Elevate for Humanity',
  description:
    'A workforce development ecosystem helping individuals access training, funding, and employment pathways.',
};

export default function AboutPage() {
  // Internal navigation for About subpages
  const navLinks = [
    { label: 'Our Founder', href: '/founder' },
    { label: 'Our Team', href: '/team' },
    { label: 'Philanthropy', href: '/philanthropy' },
    { label: 'Blog', href: '/blog' },
    { label: 'Credentials', href: '/credentials' },
    { label: 'Certificates', href: '/certificates' },
  ];

  const values = [
    {
      image: '/media/programs/cpr-group-training-hd.jpg',
      title: 'People First',
      description:
        'Every decision we make starts with how it impacts the people we serve.',
    },
    {
      image: '/media/programs/workforce-readiness-hero.jpg',
      title: 'Results Driven',
      description:
        '85% job placement rate. We measure success by student outcomes.',
    },
    {
      image: '/media/programs/cna-hd.jpg',
      title: 'Barrier Removal',
      description:
        'We eliminate obstacles that prevent people from succeeding in training.',
    },
    {
      image: '/media/programs/cpr-certification-group-hd.jpg',
      title: 'Community Impact',
      description:
        'Transforming lives strengthens families, neighborhoods, and our entire community.',
    },
  ];

  const aboutPages = [
    {
      title: 'Our Founder',
      description:
        'Meet Elizabeth Greene, founder and CEO of Elevate for Humanity.',
      href: '/founder',
      image: '/media/programs/medical-esthetics-training-hd.jpg',
      color: 'purple',
      featured: true,
    },
    {
      title: 'Our Team',
      description: 'Meet the dedicated people behind Elevate for Humanity.',
      href: '/team',
      image: '/media/programs/cpr-certification-group-hd.jpg',
      color: 'blue',
      featured: true,
    },
    {
      title: 'Philanthropy',
      description: 'Our charitable giving and community impact initiatives.',
      href: '/philanthropy',
      image: '/media/programs/cpr-group-training-hd.jpg',
      color: 'red',
      featured: false,
    },
    {
      title: 'Blog',
      description: 'Stories, updates, and insights from our team.',
      href: '/blog',
      image: '/media/programs/beauty.jpg',
      color: 'teal',
      featured: false,
    },
    {
      title: 'Credentials',
      description:
        'Industry-recognized certifications and licenses our graduates earn.',
      href: '/credentials',
      image: '/media/programs/workforce-readiness-hero.jpg',
      color: 'emerald',
      featured: false,
    },
    {
      title: 'Certificates',
      description:
        'Completion certificates and digital badges for achievements.',
      href: '/certificates',
      image: '/media/programs/cpr-individual-practice-hd.jpg',
      color: 'violet',
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Internal Navigation */}
      <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-orange-400 hover:bg-gray-800 rounded-lg transition whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section - Dark & Elegant */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-gray-900">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                <Heart className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-semibold">About Us</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                Transforming Lives Through Workforce Development
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We're a workforce development ecosystem designed to help
                individuals access training, funding, employment pathways, and
                support services—especially when traditional systems feel
                impossible to navigate.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-3xl font-black text-orange-400 mb-1">
                    5,000+
                  </div>
                  <div className="text-xs text-gray-400">Students Served</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-3xl font-black text-green-400 mb-1">
                    85%
                  </div>
                  <div className="text-xs text-gray-400">Job Placement</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-3xl font-black text-blue-400 mb-1">
                    50+
                  </div>
                  <div className="text-xs text-gray-400">Programs</div>
                </div>
              </div>

              <Link
                href="/apply"
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                <span>Join Us</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
              <Image
                src="/images/heroes/hero-homepage.jpg"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 hover:border-brand-orange-500 hover:shadow-xl transition-all group"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={value.image}
                      alt={value.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-white text-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Our Mission
            </h2>
            <p className="text-2xl text-gray-300 leading-relaxed">
              To create pathways to meaningful careers by removing barriers,
              providing training, and connecting people to opportunities that
              transform lives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-5xl font-black text-orange-400 mb-3">
                100%
              </div>
              <div className="text-gray-300">Free Training</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-green-400 mb-3">$0</div>
              <div className="text-gray-300">Student Debt</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-blue-400 mb-3">∞</div>
              <div className="text-gray-300">Opportunities</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="what-we-do" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              What We Do
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than a training provider—we're a complete support
              system
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-brand-blue-100 group hover:border-brand-blue-500 transition-all">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="/media/programs/workforce-readiness-hero.jpg"
                  alt="Training"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Training
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  ETPL-approved programs in healthcare, skilled trades,
                  business, and beauty services. All 100% free through WIOA and
                  Workforce Ready Grant funding.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Industry certifications</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Hands-on learning</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Flexible schedules</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-green-100 group hover:border-green-500 transition-all">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="/media/programs/cpr-individual-practice-hd.jpg"
                  alt="Support"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Support
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We remove barriers that prevent success—transportation,
                  childcare, financial challenges.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Career counseling</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Financial literacy</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Emergency assistance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-brand-purple-100 group hover:border-brand-purple-500 transition-all">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="/media/programs/hvac-highlight-3.jpg"
                  alt="Placement"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Placement
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Direct connections to employers. 85% of graduates are employed
                  within 6 months.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Job matching</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Interview prep</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Ongoing support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="impact" className="py-20 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Impact</h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Real results. Real lives transformed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl font-black mb-3">11</div>
              <div className="text-lg text-orange-100">
                ETPL-Approved Programs
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black mb-3">100%</div>
              <div className="text-lg text-orange-100">
                Free Training (WIOA/WRG Funded)
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black mb-3">$0</div>
              <div className="text-lg text-orange-100">Student Debt</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured About Pages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              Get to Know Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our leadership, team, transparency, and opportunities
            </p>
          </div>

          {/* Featured Pages - Larger Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {aboutPages
              .filter((page) => page.featured)
              .map((page) => {
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-brand-orange-500 hover:-translate-y-2 transform"
                  >
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={page.image}
                        alt={page.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    </div>
                    <div className="p-10">
                      <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-brand-orange-600 transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                        {page.description}
                      </p>
                      <div className="flex items-center gap-2 text-brand-orange-600 font-bold group-hover:gap-3 transition-all">
                        <span>Learn More</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>

          {/* Additional Pages - Smaller Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {aboutPages
              .filter((page) => !page.featured)
              .map((page) => {
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-brand-orange-500 hover:-translate-y-1 transform"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={page.image}
                        alt={page.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-orange-600 transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {page.description}
                      </p>
                      <div className="flex items-center gap-2 text-brand-orange-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white text-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join 5,000+ students who chose Elevate for Humanity
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 bg-white text-white px-12 py-6 rounded-xl text-xl font-black shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="text-gray-400 mt-6">
            Takes 5 minutes • 100% free • No commitment
          </p>
        </div>
      </section>
    </div>
  );
}
