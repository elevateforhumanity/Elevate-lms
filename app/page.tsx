'use client';

import Link from 'next/link';
import { useState } from 'react';
import HomeHeroVideo from './HomeHeroVideo';
import PageAvatar from '@/components/PageAvatar';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';

const programCategories = [
  { title: 'Healthcare', href: '/programs/healthcare', image: '/images/programs-hq/healthcare-hero.jpg', desc: 'CNA, Medical Assistant, Phlebotomy' },
  { title: 'Skilled Trades', href: '/programs/skilled-trades', image: '/images/programs-hq/skilled-trades-hero.jpg', desc: 'HVAC, Electrical, Welding, Plumbing' },
  { title: 'Technology', href: '/programs/technology', image: '/images/programs-hq/cybersecurity.jpg', desc: 'IT Support, Cybersecurity, Web Dev' },
  { title: 'CDL & Transportation', href: '/programs/cdl', image: '/images/programs-hq/cdl-trucking.jpg', desc: 'Commercial Driving License' },
  { title: 'Beauty & Barbering', href: '/programs/barber-apprenticeship', image: '/images/beauty/hero-program-barber.jpg', desc: 'Barber Apprenticeship, Cosmetology' },
  { title: 'Business', href: '/programs/business', image: '/images/programs-hq/business-training.jpg', desc: 'Tax Prep, Entrepreneurship' },
];

const tabs = [
  { id: 'healthcare', label: 'Healthcare', content: 'Start a rewarding career helping others. CNA, Medical Assistant, and Phlebotomy programs available.', image: '/images/healthcare/hero-healthcare-professionals.jpg' },
  { id: 'trades', label: 'Skilled Trades', content: 'Build a hands-on career in high-demand fields. HVAC, Electrical, Welding, and Plumbing training.', image: '/images/trades/program-hvac-technician.jpg' },
  { id: 'technology', label: 'Technology', content: 'Launch your career in the digital economy. IT Support, Cybersecurity, and Web Development.', image: '/images/technology/hero-program-cybersecurity.jpg' },
  { id: 'cdl', label: 'CDL', content: 'Get on the road to a stable driving career. Class A and Class B CDL training available.', image: '/images/trades/hero-program-cdl.jpg' },
];

// Testimonials now loaded from database via TestimonialsSection component

const faqs = [
  { q: 'Is the training really free?', a: 'Yes, for eligible participants. Federal and state workforce programs (WIOA, WRG, JRI) pay for your training. Some licensure apprenticeships like Barber are self-pay or employer-sponsored. Each program page shows exact costs and funding options.' },
  { q: 'How do I know if I qualify for free training?', a: 'You likely qualify if you are unemployed, underemployed, receiving public assistance (SNAP, TANF, Medicaid), a veteran, or have a household income below 200% of poverty level. Take our 2-minute eligibility check to find out instantly.' },
  { q: 'What programs do you offer?', a: 'Healthcare (CNA, Medical Assistant, Phlebotomy), Skilled Trades (HVAC, Electrical, Welding), Technology (IT Support, Cybersecurity), CDL/Transportation, Beauty & Barbering, and Business programs. Most lead to industry certifications.' },
  { q: 'How long are the programs?', a: 'Most certification programs are 4-16 weeks. Apprenticeships like Barber are 12-18 months. CDL training is 3-6 weeks. Each program page shows exact duration and schedule.' },
  { q: 'Do I need prior experience or education?', a: 'Most programs require only a high school diploma or GED. No prior experience needed. Some healthcare programs require background checks. We help you meet all requirements.' },
  { q: 'What if I have a criminal record?', a: 'We specialize in serving justice-involved individuals. Many of our programs are specifically designed for people with records. JRI funding covers training for eligible participants. Your past does not disqualify you.' },
  { q: 'Do you help with job placement?', a: 'Yes. Every program includes career services: resume writing, interview preparation, and direct connections to hiring employers. Our employer partners actively recruit from our graduates.' },
  { q: 'Where are you located?', a: 'We are based in Indianapolis, Indiana (Marion County). Training locations vary by program. Some programs offer hybrid or online options. Contact us for specific location details.' },
  { q: 'How do I get started?', a: 'Step 1: Check your eligibility (2 minutes). Step 2: Choose a program. Step 3: Complete the application. Step 4: Meet with an advisor. Most people start training within 2-4 weeks of applying.' },
];

const partners = [
  { name: 'US DOL', logo: '/images/partners/usdol.webp' },
  { name: 'WorkOne', logo: '/images/partners/workone.webp' },
  { name: 'DWD', logo: '/images/partners/dwd.webp' },
  { name: 'Next Level Jobs', logo: '/images/partners/nextleveljobs.webp' },
  { name: 'OSHA', logo: '/images/partners/osha.webp' },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('healthcare');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  // Testimonials state removed - now handled by TestimonialsSection component

  return (
    <div className="min-h-screen bg-white">
      {/* HERO with animated text */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]">
        <div className="absolute inset-0">
          <HomeHeroVideo />
        </div>
        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
          <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-fade-in">
            Now Enrolling — Classes Start Soon
          </span>
        </div>
      </section>

      {/* TEXT SECTION with animated reveals */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
            <span className="inline-block animate-slide-up">Launch Your </span>
            <span className="inline-block animate-slide-up animation-delay-100 text-red-600">New Career.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-4 animate-fade-in animation-delay-300">
            Free training is available for eligible participants through public funding. Some licensure apprenticeships are offered as self-pay or employer-paid pathways.
          </p>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto mb-8 animate-fade-in animation-delay-300">
            Based in Marion County, Indiana. Connecting people to funded training programs since 2019.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in animation-delay-400">
            <Link href="/programs" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-lg">
              Find a Funded Program
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          

        </div>
      </section>

      {/* LOGO TICKER */}
      <section className="py-6 bg-slate-100 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 mx-8">
              {partners.map((partner, j) => (
                <div key={j} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
                  <img src={partner.logo} alt={partner.name} className="h-10 w-auto object-contain" />
                  <span className="font-semibold text-slate-600">{partner.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE TEXT */}
      <section className="py-3 bg-slate-900 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4">
              {['Healthcare', 'Skilled Trades', 'Technology', 'Free Tuition', 'Job Placement', 'WIOA Funded'].map((text, j) => (
                <span key={j} className="text-white/80 text-base font-medium flex items-center gap-4">
                  {text}<span className="text-red-500">★</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* AVATAR */}
      <PageAvatar videoSrc="/videos/avatars/home-welcome.mp4" title="Welcome to Elevate" />

      {/* ABOUT with play button overlay */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">About Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-6">
                We connect people to <span className="text-blue-600">free training</span> that leads to <span className="text-red-600">real jobs.</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Federal and state workforce programs pay for your training. We help you access them and support you from enrollment to employment.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                Learn Our Story
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img src="/images/heroes-hq/team-hero.jpg" alt="Career training" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Who We Serve</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Training for People Who Need It Most</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We serve adults facing barriers to employment. If traditional paths haven&apos;t worked for you, we can help.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Justice-Involved</h3>
              <p className="text-slate-600 text-sm">Second chance training through JRI funding. Your record doesn&apos;t define your future.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Low-Income Families</h3>
              <p className="text-slate-600 text-sm">Free training through WIOA funding. No tuition, no debt, real careers.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Veterans</h3>
              <p className="text-slate-600 text-sm">Transition your military skills to civilian careers with priority enrollment.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Career Changers</h3>
              <p className="text-slate-600 text-sm">Unemployed or underemployed? Get new skills for in-demand careers.</p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link href="/wioa-eligibility" className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition-all">
              Check Your Eligibility (2 min)
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 lg:py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-200 font-semibold text-sm uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">From Application to Employment in 4 Steps</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-blue-600">1</span>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Check Eligibility</h3>
              <p className="text-blue-100 text-sm">Answer a few questions to see which funding programs you qualify for. Takes 2 minutes.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-blue-600">2</span>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Choose a Program</h3>
              <p className="text-blue-100 text-sm">Pick from healthcare, trades, technology, or other career paths based on your interests.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-blue-600">3</span>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Complete Training</h3>
              <p className="text-blue-100 text-sm">Attend classes, earn certifications, and get hands-on experience. Most programs are 4-16 weeks.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-black text-blue-600">4</span>
              </div>
              <h3 className="font-bold text-white text-lg mb-2">Get Hired</h3>
              <p className="text-blue-100 text-sm">We connect you with employers actively hiring. Resume help and interview prep included.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-blue-200 mb-4">Most people start training within 2-4 weeks of applying.</p>
            <Link href="/apply" className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all">
              Start Your Application
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* TABBED PROGRAMS SECTION */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Programs</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Choose Your Career Path</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Tabs */}
            <div className="space-y-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-6 rounded-xl transition-all ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{tab.label}</h3>
                  <p className={activeTab === tab.id ? 'text-blue-100' : 'text-slate-500'}>{tab.content}</p>
                </button>
              ))}
            </div>
            
            {/* Image */}
            <div className="lg:sticky lg:top-24">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={tabs.find(t => t.id === activeTab)?.image || '/images/healthcare/hero-healthcare-professionals.jpg'} 
                  alt={activeTab} 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLLING TEXT */}
      <section className="py-6 bg-blue-600 overflow-hidden">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-4xl md:text-5xl font-black text-white/20 mx-6">
              Free Training • Real Jobs • No Debt • Career Growth • 
            </span>
          ))}
        </div>
      </section>

      {/* PROGRAMS GRID with staggered animations */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">All Programs</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Explore Training Options</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programCategories.map((cat, i) => (
              <Link 
                key={cat.title} 
                href={cat.href} 
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{cat.desc}</p>
                  <span className="text-blue-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-3 transition-all">
                    Explore Programs <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-16 lg:py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Results</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Happens After Training</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Our graduates don&apos;t just get certificates. They get careers.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">85%</div>
              <p className="text-slate-400">Job placement rate within 90 days of completion</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">$18+</div>
              <p className="text-slate-400">Average starting hourly wage for graduates</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">500+</div>
              <p className="text-slate-400">Participants trained since 2019</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-white mb-2">50+</div>
              <p className="text-slate-400">Employer partners actively hiring graduates</p>
            </div>
          </div>
          
          <div className="mt-12 bg-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Certifications You Can Earn</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['CNA', 'OSHA 10/30', 'CompTIA A+', 'CDL Class A', 'Phlebotomy', 'Medical Assistant', 'HVAC EPA 608', 'Welding AWS'].map((cert) => (
                <span key={cert} className="bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - DB-backed, renders nothing if no testimonials */}
      <TestimonialsSection />

      {/* FAQ ACCORDION */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-4">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-600 mb-8">Everything you need to know about our free training programs.</p>
              
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left p-6 flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-900">{faq.q}</span>
                      <svg 
                        className={`w-5 h-5 text-blue-600 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-6">
                        <p className="text-slate-600">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:sticky lg:top-24">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img src="/images/about-team-new.jpg" alt="FAQ" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Your New Career Starts Here</h2>
          <p className="text-lg text-slate-400 mb-8">Apply today. Start training within weeks.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/programs" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 hover:scale-105 transition-all">
              Browse Programs
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="tel:317-314-3757" className="inline-flex items-center gap-2 text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
              (317) 314-3757
            </Link>
          </div>
        </div>
      </section>

      {/* MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t p-3 shadow-lg">
        <div className="flex gap-2">
          <Link href="/programs" className="flex-1 inline-flex items-center justify-center bg-blue-600 text-white py-3 rounded-full font-semibold text-sm">
            Browse Programs
          </Link>
          <Link href="tel:317-314-3757" className="inline-flex items-center justify-center bg-slate-100 text-slate-700 px-4 py-3 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </Link>
        </div>
      </div>
      <div className="h-16 md:hidden"></div>
    </div>
  );
}
