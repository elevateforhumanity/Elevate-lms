// Homepage - Full width hero, text below, all real images, no fantasy numbers
import { Metadata } from 'next';
import Link from 'next/link';
import HomeHeroVideo from './HomeHeroVideo';
import PageAvatar from '@/components/PageAvatar';

// Force static generation - page will be pre-rendered at build time
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Free Career Training | Elevate for Humanity',
  description: 'Launch your new career in 8-16 weeks with 100% free WIOA-funded training.',
};

const programCategories = [
  { title: 'Healthcare', href: '/programs/healthcare', image: '/images/healthcare-vibrant.jpg', desc: 'CNA, Medical Assistant, Phlebotomy' },
  { title: 'Skilled Trades', href: '/programs/skilled-trades', image: '/images/skilled-trades-vibrant.jpg', desc: 'HVAC, Electrical, Welding, Plumbing' },
  { title: 'Technology', href: '/programs/technology', image: '/images/technology-vibrant.jpg', desc: 'IT Support, Cybersecurity, Web Dev' },
  { title: 'CDL & Transportation', href: '/programs/cdl', image: '/images/cdl-vibrant.jpg', desc: 'Commercial Driving License' },
  { title: 'Beauty & Barbering', href: '/programs/barber-apprenticeship', image: '/images/barber-vibrant.jpg', desc: 'Barber Apprenticeship, Cosmetology' },
  { title: 'Business', href: '/programs/business', image: '/images/business-vibrant.jpg', desc: 'Tax Prep, Entrepreneurship' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO - Full width video/image */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]">
        <div className="absolute inset-0">
          <HomeHeroVideo />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
          <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            Now Enrolling — Classes Start Soon
          </span>
        </div>
      </section>

      {/* TEXT SECTION - Below hero */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">
            Launch Your <span className="text-red-600">New Career.</span><br />
            <span className="text-blue-600">100% Free.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Indiana&apos;s workforce programs pay for your training. No loans. No debt. Just real skills and a real job in weeks.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/enroll" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg">
              Enroll Now — It&apos;s Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="tel:317-314-3757" className="inline-flex items-center gap-2 border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              (317) 314-3757
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
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

      {/* AVATAR - Only audio that plays */}
      <PageAvatar videoSrc="/videos/avatars/home-welcome.mp4" title="Welcome to Elevate" />

      {/* ABOUT SECTION */}
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
                <img src="/images/team-vibrant.jpg" alt="Career training" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Programs</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Choose Your Career Path</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">All programs are free for eligible participants through WIOA funding.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programCategories.map((cat) => (
              <Link key={cat.title} href={cat.href} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{cat.desc}</p>
                  <span className="text-blue-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore Programs <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/programs" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-all">
              View All Programs
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
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

      {/* FUNDING SECTION - Vibrant colors */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-3">Funding</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How Is Training Free?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* WIOA - Blue theme */}
            <div className="bg-blue-600 rounded-2xl overflow-hidden shadow-xl group hover:-translate-y-2 transition-all hover:shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="/images/funding/funding-dol-program-v2.jpg" alt="WIOA Funding" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6 text-white">
                <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">WIOA FUNDING</span>
                <h3 className="text-xl font-bold mb-2">Workforce Innovation Act</h3>
                <p className="text-blue-100 text-sm mb-4">Federal program covering tuition, books, supplies, and support services.</p>
                <Link href="/wioa-eligibility" className="text-white font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Learn More <span>→</span>
                </Link>
              </div>
            </div>
            
            {/* Apprenticeships - Green theme */}
            <div className="bg-green-600 rounded-2xl overflow-hidden shadow-xl group hover:-translate-y-2 transition-all hover:shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="/images/funding/funding-dol-program.jpg" alt="Apprenticeships" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6 text-white">
                <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">APPRENTICESHIPS</span>
                <h3 className="text-xl font-bold mb-2">Earn While You Learn</h3>
                <p className="text-green-100 text-sm mb-4">USDOL-registered programs where you work and get paid while training.</p>
                <Link href="/apprenticeships" className="text-white font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  View Programs <span>→</span>
                </Link>
              </div>
            </div>
            
            {/* JRI - Purple theme */}
            <div className="bg-purple-600 rounded-2xl overflow-hidden shadow-xl group hover:-translate-y-2 transition-all hover:shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img src="/images/funding/funding-jri-program-v2.jpg" alt="JRI Funding" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6 text-white">
                <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">JRI FUNDING</span>
                <h3 className="text-xl font-bold mb-2">Justice Reinvestment</h3>
                <p className="text-purple-100 text-sm mb-4">Free training and career support for justice-involved individuals.</p>
                <Link href="/jri" className="text-white font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Learn More <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="py-10 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-sm uppercase tracking-widest text-slate-400 mb-6">Approved & Recognized By</p>
          <div className="flex justify-center items-center gap-8 sm:gap-12 flex-wrap">
            {[{ name: 'WIOA', sub: 'Approved' }, { name: 'ETPL', sub: 'Listed' }, { name: 'USDOL', sub: 'Registered' }, { name: 'WorkOne', sub: 'Partner' }].map((logo, i) => (
              <div key={i} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-slate-600 text-sm">{logo.name[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-700 text-sm">{logo.name}</p>
                  <p className="text-xs text-slate-500">{logo.sub}</p>
                </div>
              </div>
            ))}
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
            <Link href="/apply" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all">
              Apply Now — Free
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
          <Link href="/apply" className="flex-1 inline-flex items-center justify-center bg-blue-600 text-white py-3 rounded-full font-semibold text-sm">
            Apply Now — Free
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
