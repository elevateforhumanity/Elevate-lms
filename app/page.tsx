'use client';

import Link from 'next/link';
import Image from 'next/image';

import VoiceoverWithMusic from '@/components/VoiceoverWithMusic';
import { useEffect, useState, useRef } from 'react';

// Reusable checkmark icon
const CheckIcon = () => (
  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

interface ProgramCategory {
  title: string;
  duration: string;
  items: string[];
  href: string;
  image: string;
  alt: string;
}

const categoryConfig: Record<string, Omit<ProgramCategory, 'items'>> = {
  healthcare: {
    title: 'Healthcare',
    duration: '8-12 Weeks',
    href: '/programs/healthcare',
    image: '/images/healthcare/program-cna-training.jpg',
    alt: 'Healthcare Training',
  },
  trades: {
    title: 'Skilled Trades',
    duration: '10-16 Weeks',
    href: '/programs/skilled-trades',
    image: '/images/trades/hero-program-hvac.jpg',
    alt: 'Skilled Trades Training',
  },
  technology: {
    title: 'Technology',
    duration: '12-20 Weeks',
    href: '/programs/technology',
    image: '/images/technology/hero-programs-technology.jpg',
    alt: 'Technology Training',
  },
};

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [programs, setPrograms] = useState<ProgramCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch programs from database
  useEffect(() => {
    async function fetchPrograms() {
      try {
        const res = await fetch('/api/programs');
        const data = await res.json();
        if (data.status === 'success' && data.programs) {
          const categoryMap: Record<string, string[]> = {};
          
          data.programs.forEach((p: any) => {
            const cat = p.category?.toLowerCase() || 'other';
            let normalizedCat = cat;
            if (cat.includes('health')) normalizedCat = 'healthcare';
            else if (cat.includes('trade') || cat.includes('barber') || cat.includes('beauty')) normalizedCat = 'trades';
            else if (cat.includes('tech')) normalizedCat = 'technology';
            
            if (!categoryMap[normalizedCat]) {
              categoryMap[normalizedCat] = [];
            }
            if (categoryMap[normalizedCat].length < 3) {
              categoryMap[normalizedCat].push(p.name);
            }
          });

          const cats: ProgramCategory[] = [];
          ['healthcare', 'trades', 'technology'].forEach(key => {
            const config = categoryConfig[key];
            if (config && categoryMap[key]) {
              cats.push({
                ...config,
                items: categoryMap[key],
              });
            }
          });
          
          setPrograms(cats);
        }
      } catch (error) {
        console.error('Failed to fetch programs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPrograms();
  }, []);

  // Animate content on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Force video autoplay on ALL devices (mobile, tablet, iPad, laptop, desktop)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force all required attributes for autoplay on every browser
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.preload = 'auto';
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('muted', '');

    const forcePlay = async () => {
      if (!video.paused) return; // Already playing
      try {
        video.muted = true;
        video.volume = 0;
        await video.play();
      } catch {
        // Silent fail, will retry
      }
    };

    // Aggressive play attempts at multiple intervals
    forcePlay();
    const t1 = setTimeout(forcePlay, 50);
    const t2 = setTimeout(forcePlay, 100);
    const t3 = setTimeout(forcePlay, 250);
    const t4 = setTimeout(forcePlay, 500);
    const t5 = setTimeout(forcePlay, 1000);

    // Play on all video ready events
    video.addEventListener('loadedmetadata', forcePlay);
    video.addEventListener('loadeddata', forcePlay);
    video.addEventListener('canplay', forcePlay);
    video.addEventListener('canplaythrough', forcePlay);
    
    // Play on visibility change (tab switch)
    const onVisible = () => {
      if (document.visibilityState === 'visible') forcePlay();
    };
    document.addEventListener('visibilitychange', onVisible);

    // Fallback: play on any user interaction
    const onInteract = () => {
      forcePlay();
      ['click', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(e => 
        document.removeEventListener(e, onInteract)
      );
    };
    ['click', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(e => 
      document.addEventListener(e, onInteract, { passive: true })
    );

    return () => {
      [t1, t2, t3, t4, t5].forEach(clearTimeout);
      video.removeEventListener('loadedmetadata', forcePlay);
      video.removeEventListener('loadeddata', forcePlay);
      video.removeEventListener('canplay', forcePlay);
      video.removeEventListener('canplaythrough', forcePlay);
      document.removeEventListener('visibilitychange', onVisible);
      ['click', 'touchstart', 'scroll', 'mousemove', 'keydown'].forEach(e => 
        document.removeEventListener(e, onInteract)
      );
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Voiceover disabled - replace /audio/welcome-voiceover.mp3 with professional recording */}
      {/* <VoiceoverWithMusic audioSrc="/audio/welcome-voiceover.mp3" delay={500} /> */}

      {/* Hero Section - Optimized for all screen sizes: mobile, tablet, laptop, desktop */}
      <section className="relative w-full min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[70vh] flex items-end overflow-hidden bg-slate-900">
        {/* Background video - autoplay on ALL devices */}
        {/* Required for autoplay: muted, playsinline, autoplay attributes */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source src="/videos/hero-home-fast.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay for text readability */}
        
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
          <div 
            className={`transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 max-w-3xl leading-tight">
              Launch Your New Career in 8-16 Weeks — <span className="text-blue-400">100% Free</span>
            </h1>
            <p className="text-base sm:text-lg text-white/90 mb-4 max-w-2xl">
              Indiana&apos;s workforce programs pay for your training. No loans. No debt. Just real skills and a real job.
            </p>
            
            <div className="flex flex-wrap gap-3 items-center">
              <Link 
                href="/apply"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all hover:scale-105 text-base shadow-lg shadow-blue-600/30"
              >
                Apply Now — It&apos;s Free
              </Link>
              <Link 
                href="tel:317-314-3757"
                className="inline-flex items-center gap-2 text-white text-base hover:text-blue-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                (317) 314-3757
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How No-Cost Training Works */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              How Can Training Be No Cost?
            </h2>
            <p className="text-base text-slate-600 max-w-3xl mx-auto">
              Federal and state workforce programs pay for your training - not you. These programs exist to help people get jobs in high-demand fields. We help you access them.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* WIOA Card */}
            <Link href="/wioa-eligibility" className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/funding/funding-dol-program-v2.jpg"
                  alt="WIOA funded career training"
                  fill
                  className="object-cover"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  WIOA FUNDING
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Workforce Innovation &amp; Opportunity Act</h3>
                <p className="text-slate-600 mb-4 flex-1">
                  Federal program that pays for job training. Covers tuition, books, supplies, and even transportation or childcare.
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  Learn more about WIOA →
                </p>
              </div>
            </Link>
            
            {/* Apprenticeships Card */}
            <Link href="/apprenticeships" className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/funding/funding-dol-program.jpg"
                  alt="Apprenticeship training"
                  fill
                  className="object-cover"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  APPRENTICESHIPS
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Earn While You Learn</h3>
                <p className="text-slate-600 mb-4 flex-1">
                  USDOL-registered apprenticeships let you work and get paid while training. Graduate with experience and a job.
                </p>
                <p className="text-sm text-green-600 font-medium">
                  View apprenticeship programs →
                </p>
              </div>
            </Link>
            
            {/* JRI Card */}
            <Link href="/jri" className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/funding/funding-jri-program-v2.jpg"
                  alt="JRI funding programs"
                  fill
                  className="object-cover"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  JRI FUNDING
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Justice Reinvestment Initiative</h3>
                <p className="text-slate-600 mb-4 flex-1">
                  100% free training for justice-involved individuals. Second chance employment support and career services.
                </p>
                <p className="text-sm text-purple-600 font-medium">
                  Learn about JRI programs →
                </p>
              </div>
            </Link>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link 
              href="/wioa-eligibility"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors text-sm"
            >
              Check If You Qualify
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-2 sm:mb-3">
            Training programs for every path
          </h2>
          <Link 
            href="/programs" 
            className="inline-flex items-center text-blue-600 border-b border-blue-600 pb-0.5 hover:text-blue-800 hover:border-blue-800 mb-6 sm:mb-8 min-h-[44px] text-sm"
          >
            Explore All Programs
          </Link>

          {/* Program Cards - 3 columns with compact images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {loading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-72 animate-pulse" />
              ))
            ) : (
              programs.map((program) => (
                <article 
                  key={program.title}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100 max-w-sm mx-auto sm:max-w-none"
                >
                  {/* Compact image container */}
                  <div className="relative h-36 md:h-32 lg:h-40">
                    <Image
                      src={program.image}
                      alt={program.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                      {program.duration}
                    </div>
                  </div>
                  {/* Content below */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {program.title}
                    </h3>
                    <ul className="space-y-1.5 mb-4">
                      {program.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckIcon />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href={program.href} 
                      className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                    >
                      Learn More
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>



      {/* Featured Program - Barber Apprenticeship */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative h-56 sm:h-64 lg:h-80 rounded-xl overflow-hidden">
              <Image
                src="/images/beauty/program-barber-training.jpg"
                alt="Barber Apprenticeship Program"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                <span>⭐</span> USDOL Registered
              </div>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Barber Apprenticeship Program
              </h2>
              <p className="text-base text-slate-600 mb-4">
                Earn while you learn. Get your Indiana Barber License through our USDOL-registered apprenticeship.
              </p>
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>USDOL Registered Apprenticeship</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Indiana Barber License pathway</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Earn while you learn</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>2,000 hours hands-on training</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/programs/barber-apprenticeship"
                  className="inline-flex items-center text-blue-600 border-b border-blue-600 pb-0.5 hover:text-blue-800 text-sm font-medium"
                >
                  Learn More
                </Link>
                <Link 
                  href="/apply"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
          
          {/* Also Offering */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-slate-500 text-sm mb-2">Also offering free training in:</p>
            <p className="text-base font-medium text-slate-700">
              Healthcare • Skilled Trades • Technology • Business
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Compact */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="flex items-center gap-2 bg-white rounded-lg p-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">$0</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Free Training</p>
                <p className="text-xs text-slate-500">WIOA funded</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg p-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-xs">Job Placement</p>
                <p className="text-xs text-slate-500">Career support</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg p-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-xs">Fast-Track</p>
                <p className="text-xs text-slate-500">8-16 weeks</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg p-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-xs">Credentials</p>
                <p className="text-xs text-slate-500">Certifications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Compact with Links */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase tracking-wider text-slate-400 font-medium mb-6">Approved &amp; Recognized By</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <Link href="/wioa-eligibility" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">W</span>
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-slate-800 block">WIOA</span>
                <span className="text-[10px] text-slate-500">Approved Provider</span>
              </div>
            </Link>
            <Link href="/funding" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">E</span>
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-slate-800 block">ETPL</span>
                <span className="text-[10px] text-slate-500">Listed Provider</span>
              </div>
            </Link>
            <Link href="/how-it-works" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">W1</span>
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-slate-800 block">WorkOne</span>
                <span className="text-[10px] text-slate-500">Indiana Partner</span>
              </div>
            </Link>
            <Link href="/apprenticeships" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">US</span>
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-slate-800 block">USDOL</span>
                <span className="text-[10px] text-slate-500">Registered</span>
              </div>
            </Link>
            <Link href="/certifications" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">IN</span>
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-slate-800 block">Indiana</span>
                <span className="text-[10px] text-slate-500">State Licensed</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
            <span className="w-2 h-2 bg-yellow-900 rounded-full animate-pulse"></span>
            Next Class Starts February 3rd — Limited Seats Available
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Your New Career Starts Here
          </h2>
          <p className="text-sm sm:text-base text-white/90 mb-5">
            Apply in 2 minutes. Get approved in 48 hours. Start training within weeks.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href="/apply"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all hover:scale-105 text-sm shadow-lg"
            >
              Apply Now — It&apos;s Free
            </Link>
            <Link 
              href="tel:317-314-3757"
              className="inline-flex items-center justify-center border-2 border-white text-white px-5 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors text-sm gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              (317) 314-3757
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-blue-200 text-xs">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              No credit check
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              No upfront costs
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              Job placement support
            </span>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 p-3 shadow-lg">
        <div className="flex gap-2">
          <Link 
            href="/apply"
            className="flex-1 inline-flex items-center justify-center bg-blue-600 text-white py-3 rounded-lg font-semibold text-sm"
          >
            Apply Now — Free
          </Link>
          <Link 
            href="tel:317-314-3757"
            className="inline-flex items-center justify-center bg-gray-100 text-gray-700 px-4 py-3 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          </Link>
        </div>
      </div>

      {/* Spacer for sticky CTA on mobile */}
      <div className="h-16 md:hidden"></div>

    </div>
  );
}
