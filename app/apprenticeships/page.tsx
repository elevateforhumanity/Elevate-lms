'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Briefcase,
  Clock,
  DollarSign,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  TrendingUp,
  FileText,
  Calendar,
  Building2,
  Menu,
  X,
} from 'lucide-react';
import PathwayDisclosure from '@/components/PathwayDisclosure';

export default function ApprenticeshipsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);
  const apprenticeships = [
    {
      title: 'Barber Apprenticeship',
      slug: 'barber-apprenticeship',
      duration: '1,500 hours (12-18 months)',
      wage: 'Earn while you learn',
      image: '/hero-images/barber-hero.jpg',
      description:
        'Learn professional barbering skills in a licensed shop environment with experienced mentors. Master cutting, styling, shaving, and client relations while earning income.',
      requirements: [
        '18+ years old',
        'High school diploma or GED',
        'Valid ID',
        'Professional attitude',
      ],
      benefits: [
        'Paid training from day one',
        'State licensure pathway',
        'One-on-one mentorship',
        'Build your client portfolio',
      ],
      locations: ['Indianapolis, IN'],
    },
    {
      title: 'HVAC Technician Apprenticeship',
      slug: 'hvac-apprenticeship',
      duration: '3-4 years',
      wage: '$15-$25/hour',
      image: '/hero-images/skilled-trades-category.jpg',
      description:
        'Hands-on training in heating, ventilation, air conditioning, and refrigeration systems. Work alongside certified technicians on real installations and repairs.',
      requirements: [
        '18+ years old',
        'High school diploma or GED',
        "Valid driver's license",
        'Physical fitness',
      ],
      benefits: [
        'EPA certification included',
        'Industry credentials',
        'Tool allowance provided',
        'Health benefits available',
      ],
      locations: ['Indianapolis, IN', 'Surrounding counties'],
    },
    {
      title: 'Building Maintenance Apprenticeship',
      slug: 'building-maintenance-apprenticeship',
      duration: '2-3 years',
      wage: '$14-$22/hour',
      image: '/hero-images/skilled-trades-cat-new.jpg',
      description:
        'Learn facility maintenance including basic electrical, plumbing, HVAC, and building systems. Become a versatile technician in high demand.',
      requirements: [
        '18+ years old',
        'High school diploma or GED',
        'Basic tool knowledge',
        'Reliable transportation',
      ],
      benefits: [
        'Multi-trade skills training',
        'Safety certifications',
        'Clear career advancement',
        'Stable year-round employment',
      ],
      locations: ['Indianapolis, IN'],
    },
    {
      title: 'Healthcare Support Apprenticeship',
      slug: 'healthcare-apprenticeship',
      duration: '1-2 years',
      wage: '$13-$18/hour',
      image: '/hero-images/healthcare-category.jpg',
      description:
        'Entry into healthcare through CNA, medical assistant, or patient care roles. Gain clinical experience while earning certifications.',
      requirements: [
        '18+ years old',
        'High school diploma or GED',
        'Background check clearance',
        'Current immunizations',
      ],
      benefits: [
        'CNA certification included',
        'Real clinical experience',
        'Healthcare career pathway',
        'Job placement support',
      ],
      locations: ['Indianapolis, IN', 'Partner facilities'],
    },
    {
      title: 'Culinary Arts Apprenticeship',
      slug: 'culinary-apprenticeship',
      duration: '1-2 years',
      wage: '$12-$18/hour',
      image: '/hero-images/culinary-hero.jpg',
      description:
        'Train in professional kitchens learning culinary techniques, food safety, and kitchen management. Work with experienced chefs in real restaurant environments.',
      requirements: [
        '18+ years old',
        'High school diploma or GED',
        'Food handler certification',
        'Ability to stand for long periods',
      ],
      benefits: [
        'ServSafe certification',
        'Professional kitchen experience',
        'Culinary credentials',
        'Restaurant industry connections',
      ],
      locations: ['Indianapolis, IN'],
    },
    {
      title: 'CDL Truck Driver Training',
      slug: 'cdl-transportation',
      duration: '3-6 weeks',
      wage: '$50,000-$80,000/year after completion',
      image: '/hero-images/cdl-transportation-category.jpg',
      description:
        'Earn your Commercial Driver\'s License with classroom and behind-the-wheel training. High-demand career with immediate job opportunities.',
      requirements: [
        '21+ years old',
        'Valid driver\'s license',
        'Clean driving record',
        'DOT physical clearance',
      ],
      benefits: [
        'CDL-A license',
        'Job placement assistance',
        'Sign-on bonuses available',
        'Flexible schedules',
      ],
      locations: ['Indianapolis, IN'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Contact Bar */}
      <div className="bg-blue-900 text-white py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center text-xs sm:text-sm gap-2">
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="tel:+13173143757"
                className="flex items-center gap-1.5 hover:text-blue-300 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="font-medium">(317) 314-3757</span>
              </a>
              <a
                href="mailto:elevate4humanityedu@gmail.com"
                className="hidden sm:flex items-center gap-1.5 hover:text-blue-300 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate max-w-[200px] md:max-w-none">
                  elevate4humanityedu@gmail.com
                </span>
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-blue-100">
              <MapPin className="h-3.5 w-3.5" />
              <span>Indianapolis, IN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-xl md:text-2xl font-bold text-blue-900">
                Elevate <span className="text-orange-600">For Humanity</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/programs"
                className="text-black hover:text-blue-900 font-medium transition-colors"
              >
                Programs
              </Link>
              <Link href="/apprenticeships" className="text-blue-900 font-bold">
                Apprenticeships
              </Link>
              <Link
                href="/about"
                className="text-black hover:text-blue-900 font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-black hover:text-blue-900 font-medium transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/apply?pathway=apprenticeship"
                className="px-6 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors"
              >
                Apply Now
              </Link>
            </div>
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="flex flex-col">
              <Link
                href="/programs"
                className="px-6 py-4 text-base font-medium text-black hover:bg-gray-50 hover:text-blue-900 transition-colors border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Programs
              </Link>
              <Link
                href="/apprenticeships"
                className="px-6 py-4 text-base font-bold text-blue-900 bg-blue-50 border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apprenticeships
              </Link>
              <Link
                href="/about"
                className="px-6 py-4 text-base font-medium text-black hover:bg-gray-50 hover:text-blue-900 transition-colors border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="px-6 py-4 text-base font-medium text-black hover:bg-gray-50 hover:text-blue-900 transition-colors border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/apply?pathway=apprenticeship"
                className="mx-6 my-4 px-6 py-3 bg-orange-600 text-white text-center rounded-lg font-bold hover:bg-orange-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12 md:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Briefcase className="h-5 w-5" />
              <span className="text-sm font-semibold">
                Registered Apprenticeship Programs
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              Earn While You Learn
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-8 leading-relaxed">
              Start your career with hands-on training, industry credentials,
              and a paycheck. Our registered apprenticeship programs combine
              on-the-job experience with classroom instruction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#programs"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-orange-600 text-white font-bold text-base md:text-lg rounded-lg hover:bg-orange-700 transition-colors shadow-lg"
              >
                View Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/apply?pathway=apprenticeship"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-blue-900 font-bold text-base md:text-lg rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Apply Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pathway Disclosure */}
      <PathwayDisclosure programName="Apprenticeship" programSlug="apprenticeship" />

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
              Why Choose Apprenticeship?
            </h2>
            <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
              Apprenticeships offer a proven pathway to skilled careers with no
              student debt
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-black mb-2">
                Get Paid
              </h3>
              <p className="text-sm md:text-base text-black">
                Earn a wage from day one while you learn valuable skills
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-black mb-2">
                Earn Credentials
              </h3>
              <p className="text-sm md:text-base text-black">
                Receive industry-recognized certifications and licenses
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-black mb-2">
                Expert Mentors
              </h3>
              <p className="text-sm md:text-base text-black">
                Learn from experienced professionals in your field
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-black mb-2">
                Career Growth
              </h3>
              <p className="text-sm md:text-base text-black">
                Build a foundation for long-term career advancement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apprenticeship Programs */}
      <section id="programs" className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
              Available Apprenticeship Programs
            </h2>
            <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
              Explore our registered apprenticeship opportunities across
              multiple industries
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {apprenticeships.map((program, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-lg transition-all"
              >
                {/* Program Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                  />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                      {program.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="flex items-center gap-1 text-white/90">
                        <Clock className="h-4 w-4" />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-1 text-green-400 font-semibold">
                        <DollarSign className="h-4 w-4" />
                        {program.wage}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                <p className="text-sm md:text-base text-black mb-6 leading-relaxed">
                  {program.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-bold text-black mb-2 flex items-center gap-2 text-sm md:text-base">
                      <FileText className="h-4 w-4 text-blue-600" />
                      Requirements
                    </h4>
                    <ul className="space-y-1">
                      {program.requirements.map((req, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs md:text-sm text-black"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-black mb-2 flex items-center gap-2 text-sm md:text-base">
                      <Award className="h-4 w-4 text-orange-600" />
                      Benefits
                    </h4>
                    <ul className="space-y-1">
                      {program.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs md:text-sm text-black"
                        >
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-black mb-2 flex items-center gap-2 text-sm md:text-base">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      Locations
                    </h4>
                    <p className="text-xs md:text-sm text-black">
                      {program.locations.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/apply?program=${program.slug}`}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-brand-red-600 text-white font-bold rounded-lg hover:bg-brand-red-700 transition-colors text-sm md:text-base"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    href={`/programs/${program.slug}`}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-brand-blue-600 text-white font-bold rounded-lg hover:bg-brand-blue-700 transition-colors text-sm md:text-base"
                  >
                    Learn More
                  </Link>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4">
              How Apprenticeship Works
            </h2>
            <p className="text-base md:text-lg text-black max-w-2xl mx-auto">
              A clear path from application to career success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                step: '1',
                title: 'Apply',
                description:
                  'Submit your application and meet with our team to discuss your goals',
                icon: FileText,
              },
              {
                step: '2',
                title: 'Get Matched',
                description:
                  'We connect you with an employer sponsor and training program',
                icon: Users,
              },
              {
                step: '3',
                title: 'Start Training',
                description:
                  'Begin earning while learning on the job and in the classroom',
                icon: GraduationCap,
              },
              {
                step: '4',
                title: 'Launch Career',
                description:
                  'Complete your apprenticeship and advance in your chosen field',
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full">
                  <div className="w-12 h-12 bg-blue-900 text-white rounded-lg flex items-center justify-center mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-black">
                    {item.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-10 w-10 text-black" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your Apprenticeship?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Take the first step toward a rewarding career with paid training
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply?pathway=apprenticeship"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-orange-600 text-white font-bold text-base md:text-lg rounded-lg hover:bg-orange-700 transition-colors shadow-lg"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-blue-900 font-bold text-base md:text-lg rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-11 w-11 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-black mb-2">
                Call Us
              </h3>
              <a
                href="tel:+13173143757"
                className="text-blue-600 hover:text-blue-800 font-semibold text-base md:text-lg"
              >
                (317) 314-3757
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-11 w-11 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-black mb-2">
                Email Us
              </h3>
              <a
                href="mailto:elevate4humanityedu@gmail.com"
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base break-all px-2"
              >
                elevate4humanityedu@gmail.com
              </a>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-11 w-11 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-black mb-2">
                Visit Us
              </h3>
              <p className="text-sm md:text-base text-black">
                7009 East 56th Street, Suite EE1
                <br />
                Indianapolis, IN 46226
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4">
                Elevate For Humanity
              </h3>
              <p className="text-black text-sm">
                Empowering individuals through workforce development and
                apprenticeship programs.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/programs"
                    className="text-black hover:text-white transition-colors"
                  >
                    All Programs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/apprenticeships"
                    className="text-black hover:text-white transition-colors"
                  >
                    Apprenticeships
                  </Link>
                </li>
                <li>
                  <Link
                    href="/apply?pathway=apprenticeship"
                    className="text-black hover:text-white transition-colors"
                  >
                    Apply Now
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-black hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="text-black hover:text-white transition-colors"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/founder"
                    className="text-black hover:text-white transition-colors"
                  >
                    Our Founder
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-black">
                <li>(317) 314-3757</li>
                <li className="break-all">elevate4humanityedu@gmail.com</li>
                <li>Indianapolis, IN</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-black">
            <p>
              &copy; {new Date().getFullYear()} Elevate For Humanity. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
