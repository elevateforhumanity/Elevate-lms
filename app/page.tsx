'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import HomeHeroVideo from './HomeHeroVideo';
import { CredentialBadges } from '@/components/ui/CredentialBadges';
import { CheckCircle, Clock, DollarSign, Briefcase, Users, Award, Phone, ArrowRight, Star, Shield, Calendar } from 'lucide-react';

const STATS = [
  { value: '94%', label: 'Job Placement Rate' },
  { value: '8-16', label: 'Weeks to Complete' },
  { value: '$0', label: 'Tuition for Eligible Students' },
  { value: '500+', label: 'Employer Partners' },
];

const PROGRAMS = [
  { 
    name: 'CNA Certification', 
    category: 'Healthcare',
    duration: '8 weeks', 
    salary: '$35,000-$45,000/yr',
    funding: 'WIOA Eligible',
    href: '/programs/cna',
    image: '/images/healthcare/cna-training.jpg',
    hot: true,
  },
  { 
    name: 'HVAC Technician', 
    category: 'Skilled Trades',
    duration: '16 weeks', 
    salary: '$45,000-$65,000/yr',
    funding: 'WIOA Eligible',
    href: '/programs/hvac',
    image: '/images/trades/program-hvac-technician.jpg',
    hot: true,
  },
  { 
    name: 'CDL Training', 
    category: 'Transportation',
    duration: '4 weeks', 
    salary: '$50,000-$70,000/yr',
    funding: 'WIOA Eligible',
    href: '/programs/cdl',
    image: '/images/cdl/cdl-training.jpg',
    hot: false,
  },
  { 
    name: 'Medical Assistant', 
    category: 'Healthcare',
    duration: '16 weeks', 
    salary: '$38,000-$48,000/yr',
    funding: 'WIOA Eligible',
    href: '/programs/medical-assistant',
    image: '/images/healthcare/medical-assistant.jpg',
    hot: false,
  },
  { 
    name: 'Barber Apprenticeship', 
    category: 'Beauty',
    duration: '12 months', 
    salary: '$30,000-$60,000/yr',
    funding: 'Self-Pay: $4,980',
    href: '/programs/barber-apprenticeship',
    image: '/images/programs/barber-hero.jpg',
    hot: false,
  },
  { 
    name: 'IT Support Specialist', 
    category: 'Technology',
    duration: '12 weeks', 
    salary: '$40,000-$55,000/yr',
    funding: 'WIOA Eligible',
    href: '/programs/it-support',
    image: '/images/technology/it-support.jpg',
    hot: false,
  },
];

const TESTIMONIALS = [
  {
    quote: "I went from unemployed to making $52,000 a year as an HVAC tech in just 4 months. The training was free through WIOA.",
    name: "Marcus J.",
    role: "HVAC Technician",
  },
  {
    quote: "The CNA program changed my life. I'm now working at a hospital with full benefits. They helped me every step of the way.",
    name: "Keisha T.",
    role: "Certified Nursing Assistant",
  },
  {
    quote: "Got my CDL in 4 weeks and had 3 job offers before I even finished. Best decision I ever made.",
    name: "David R.",
    role: "CDL Driver",
  },
];

const TRUST_BADGES = [
  { name: 'US Department of Labor', logo: '/images/partners/usdol.webp' },
  { name: 'Indiana DWD', logo: '/images/partners/dwd.webp' },
  { name: 'WorkOne', logo: '/images/partners/workone.webp' },
  { name: 'Next Level Jobs', logo: '/images/partners/nextleveljobs.webp' },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================ */}
      {/* VIDEO HERO - With clear value prop overlay */}
      {/* ============================================ */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <HomeHeroVideo />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
        </div>
        
        {/* Content Overlay */}
        <div className="relative h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 w-full">
            <div className="max-w-2xl animate-fade-in">
              {/* Urgency badge */}
              <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Spring Classes Start February 17th — Limited Seats
              </div>
              
              {/* Main headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                Get Trained. Get Hired.
                <span className="block text-blue-400">No Tuition. No Debt.</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl text-slate-300 mb-8 max-w-xl">
                Free career training in healthcare, skilled trades, and technology. 
                Most students complete in 8-16 weeks and get hired within 30 days.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/programs" 
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg hover-lift"
                >
                  See Available Programs
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/eligibility" 
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-white/30 backdrop-blur-sm"
                >
                  Check If You Qualify
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  USDOL Registered
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  State Approved
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  94% Job Placement
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS BAR */}
      {/* ============================================ */}
      <section className="bg-slate-100 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CREDENTIAL VERIFICATION STRIP */}
      {/* ============================================ */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <CredentialBadges variant="compact" />
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS */}
      {/* ============================================ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From application to employment in as little as 8 weeks
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {[
              { step: '1', title: 'Apply Online', desc: 'Complete a 5-minute application. We\'ll check your eligibility for free training.', icon: Calendar },
              { step: '2', title: 'Get Trained', desc: 'Attend classes online or in-person. Most programs are 8-16 weeks.', icon: Award },
              { step: '3', title: 'Get Hired', desc: 'We connect you with 500+ employer partners. 94% of graduates get hired.', icon: Briefcase },
            ].map((item) => (
              <div key={item.step} className="relative bg-slate-50 rounded-2xl p-8 text-center hover-lift">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {item.step}
                </div>
                <item.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PROGRAMS */}
      {/* ============================================ */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Career Path
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              High-demand careers with real salary potential. Most programs are free for eligible students.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {PROGRAMS.map((program) => (
              <Link 
                key={program.name} 
                href={program.href}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-200 hover:border-blue-300 hover-lift"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={program.image} 
                    alt={program.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {program.hot && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" /> High Demand
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                    {program.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {program.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {program.duration}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      {program.salary}
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className={program.funding.includes('WIOA') ? 'text-green-600 font-medium' : 'text-slate-600'}>
                        {program.funding}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              href="/programs" 
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold transition-all hover-lift"
            >
              View All Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS */}
      {/* ============================================ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Real Students. Real Results.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6 hover-lift">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TRUST BADGES */}
      {/* ============================================ */}
      <section className="py-12 bg-slate-100 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-sm text-slate-500 mb-6">Approved and funded by</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.name} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <img src={badge.logo} alt={badge.name} className="h-10 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FAQ */}
      {/* ============================================ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Common Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: 'Is the training really free?', a: 'Yes, for eligible students. Federal and state workforce programs (WIOA, WRG) cover 100% of tuition. Most adults qualify based on income, employment status, or receiving public assistance. Some programs like Barber Apprenticeship are self-pay.' },
              { q: 'How do I know if I qualify?', a: 'Take our 2-minute eligibility check or call us at (317) 314-3757. Most Indiana residents who are unemployed, underemployed, or receiving public assistance qualify.' },
              { q: 'How long until I can start working?', a: 'Most programs are 8-16 weeks. Our CDL program is just 4 weeks. 94% of graduates receive job offers within 30 days of completion.' },
              { q: 'Do you help with job placement?', a: 'Yes. We have partnerships with 500+ employers. We provide resume help, interview prep, and direct introductions to hiring managers.' },
            ].map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden transition-all hover:border-slate-300">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-5 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900">{faq.q}</span>
                  <ArrowRight className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-48' : 'max-h-0'}`}>
                  <div className="px-5 pb-5 bg-slate-50">
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your New Career?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Spring classes start February 17th. Apply now to secure your spot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/apply" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg"
            >
              Apply Now — It&apos;s Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="tel:317-314-3757" 
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-white/20"
            >
              <Phone className="w-5 h-5" />
              (317) 314-3757
            </a>
          </div>
          <p className="text-sm text-slate-500 mt-6">
            Questions? Call us Monday-Friday, 9am-5pm EST
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* MOBILE STICKY CTA */}
      {/* ============================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-sm border-t border-slate-200 p-3 shadow-lg">
        <div className="flex gap-2">
          <Link 
            href="/apply" 
            className="flex-1 inline-flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all active:scale-98"
          >
            Apply Now
          </Link>
          <a 
            href="tel:317-314-3757" 
            className="inline-flex items-center justify-center bg-slate-100 text-slate-700 px-4 py-3 rounded-lg transition-all active:scale-98"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="h-16 md:hidden"></div>
    </div>
  );
}
