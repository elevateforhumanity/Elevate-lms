'use client';

import Link from 'next/link';
import { useState } from 'react';
import HomeHeroVideo from './HomeHeroVideo';
import PageAvatar from '@/components/PageAvatar';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';

const programCategories = [
  { title: 'Healthcare', href: '/programs/healthcare', image: '/images/healthcare-vibrant.jpg', desc: 'CNA, Medical Assistant, Phlebotomy' },
  { title: 'Skilled Trades', href: '/programs/skilled-trades', image: '/images/skilled-trades-vibrant.jpg', desc: 'HVAC, Electrical, Welding, Plumbing' },
  { title: 'Technology', href: '/programs/technology', image: '/images/technology-vibrant.jpg', desc: 'IT Support, Cybersecurity, Web Dev' },
  { title: 'CDL & Transportation', href: '/programs/cdl', image: '/images/cdl-vibrant.jpg', desc: 'Commercial Driving License' },
  { title: 'Beauty & Barbering', href: '/programs/barber-apprenticeship', image: '/images/barber-vibrant.jpg', desc: 'Barber Apprenticeship, Cosmetology' },
  { title: 'Business', href: '/programs/business', image: '/images/business-vibrant.jpg', desc: 'Tax Prep, Entrepreneurship' },
];

const tabs = [
  { id: 'healthcare', label: 'Healthcare', content: 'Start a rewarding career helping others. CNA, Medical Assistant, and Phlebotomy programs available.' },
  { id: 'trades', label: 'Skilled Trades', content: 'Build a hands-on career in high-demand fields. HVAC, Electrical, Welding, and Plumbing training.' },
  { id: 'technology', label: 'Technology', content: 'Launch your career in the digital economy. IT Support, Cybersecurity, and Web Development.' },
  { id: 'cdl', label: 'CDL', content: 'Get on the road to a stable driving career. Class A and Class B CDL training available.' },
];

// Testimonials now loaded from database via TestimonialsSection component

const faqs = [
  { q: 'Is the training free?', a: 'Free training is available for eligible participants through WIOA, WRG, and other workforce programs. Some licensure apprenticeships (like Barber) are offered as self-pay or employer-paid pathways. See individual program pages for details.' },
  { q: 'How do I know if I qualify for funding?', a: 'Most adults qualify based on income, employment status, or receiving public assistance. Take our 2-minute eligibility check to find out.' },
  { q: 'How long are the programs?', a: 'Most programs are 8-16 weeks. Some certifications can be completed in as little as 4 weeks. Apprenticeships like Barber are 12-18 months.' },
  { q: 'Do you help with job placement?', a: 'Yes! We provide resume help, interview prep, and connect you directly with hiring employers.' },
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
            Elevate for Humanity operates licensed workforce and licensure infrastructure, delivering both publicly funded and self-pay apprenticeship pathways through a managed platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in animation-delay-400">
            <Link href="/programs" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-lg">
              View Programs
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="tel:317-314-3757" className="inline-flex items-center gap-2 border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-600 hover:text-blue-600 hover:scale-105 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              (317) 314-3757
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
                <img src="/images/team-vibrant.jpg" alt="Career training" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
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
                  src={programCategories.find(p => p.title.toLowerCase().includes(activeTab))?.image || '/images/healthcare-vibrant.jpg'} 
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
