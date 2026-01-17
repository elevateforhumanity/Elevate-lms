'use client';

import Link from 'next/link';
import Image from 'next/image';

import AutoPlayTTS from '@/components/AutoPlayTTS';
import { useEffect, useState, useRef } from 'react';

// Welcome message for TTS - natural, conversational tone
const WELCOME_MESSAGE = "Hey, welcome! We help people get into careers like healthcare, skilled trades, and tech. The best part? If you qualify, training is completely free through state and federal programs. No loans, no debt. Just real skills and a real job at the end. Ready to get started?";

// Reusable checkmark icon
const CheckIcon = () => (
  <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

// Program card data
const programs = [
  {
    title: 'Healthcare',
    duration: '8-12 Weeks',
    items: ['CNA Certification', 'Medical Assistant', 'Phlebotomy'],
    href: '/programs/healthcare',
    image: '/images/healthcare/program-cna-training.jpg',
    alt: 'Healthcare Training',
  },
  {
    title: 'Skilled Trades',
    duration: '10-16 Weeks',
    items: ['HVAC Technician', 'Electrical', 'Welding'],
    href: '/programs/skilled-trades',
    image: '/images/trades/hero-program-hvac.jpg',
    alt: 'Skilled Trades Training',
  },
  {
    title: 'Technology',
    duration: '12-20 Weeks',
    items: ['IT Support', 'Cybersecurity', 'Cloud Computing'],
    href: '/programs/technology',
    image: '/images/technology/hero-programs-technology.jpg',
    alt: 'Technology Training',
  },
];



export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(false);

  // Animate content on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Play video immediately - works on all devices including iPad/laptop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force attributes required for autoplay on all browsers
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    
    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // If autoplay fails, try again with user interaction simulation
        const retryPlay = async () => {
          try {
            video.currentTime = 0;
            await video.play();
          } catch {
            // Final fallback: play on any user interaction
            const playOnInteraction = () => {
              video.play().catch(() => {});
              document.removeEventListener('click', playOnInteraction);
              document.removeEventListener('touchstart', playOnInteraction);
              document.removeEventListener('scroll', playOnInteraction);
            };
            document.addEventListener('click', playOnInteraction, { once: true });
            document.addEventListener('touchstart', playOnInteraction, { once: true });
            document.addEventListener('scroll', playOnInteraction, { once: true });
          }
        };
        setTimeout(retryPlay, 100);
      }
    };

    // Try to play immediately
    playVideo();

    // Also try when video data is loaded
    video.addEventListener('loadeddata', playVideo);
    video.addEventListener('canplay', playVideo);
    
    // Try again when page becomes visible (for tab switches)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Auto-playing welcome message */}
      <AutoPlayTTS 
        text={WELCOME_MESSAGE} 
        voice="en-US-JennyNeural"
        delay={1500}
      />

      {/* Hero Section - Optimized for all screen sizes including Chromebooks */}
      <section className="relative w-full min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[70vh] flex items-end overflow-hidden bg-blue-900">
        {/* Background video - compressed 741KB, loads fast */}
        {/* Key mobile fixes: webkit-playsinline, muted MUST be present for autoplay */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover brightness-110"
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          webkit-playsinline="true"
          poster="/images/artlist/hero-training-1.jpg"
        >
          <source src="/videos/hero-home-fast.mp4" type="video/mp4" />
        </video>
        
        {/* Lighter gradient for brighter feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
        
        {/* Hero Content - Clear value proposition */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
          <div 
            className={`transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Headline - visible for users with sound off */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 max-w-3xl">
              Free Career Training in Indianapolis
            </h1>
            <p className="text-base sm:text-lg text-white/90 mb-6 max-w-2xl">
              Get certified in healthcare, skilled trades, or technology — at no cost if you qualify.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/apply"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors text-base"
              >
                Apply Now
              </Link>
              <Link 
                href="/programs"
                className="inline-flex items-center text-white text-base border-b-2 border-white pb-1 hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
              >
                View Programs
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
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <div className="relative h-48 md:h-40 lg:h-48">
                <Image
                  src="/images/artlist/hero-training-6.jpg"
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
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Workforce Innovation & Opportunity Act</h3>
                <p className="text-slate-600 mb-4">
                  Federal program that pays for job training for adults, dislocated workers, and youth. Covers tuition, books, supplies, and even transportation or childcare.
                </p>
                <p className="text-sm text-slate-500">
                  <strong className="text-slate-700">Who qualifies:</strong> Unemployed, underemployed, low-income, veterans, single parents, individuals with disabilities, or those receiving public assistance.
                </p>
              </div>
            </div>
            
            {/* Apprenticeships Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <div className="relative h-48 md:h-40 lg:h-48">
                <Image
                  src="/images/artlist/hero-training-7.jpg"
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
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Earn While You Learn</h3>
                <p className="text-slate-600 mb-4">
                  USDOL-registered apprenticeships let you work and get paid while training. Your employer sponsors your education. Graduate with experience and a job.
                </p>
                <p className="text-sm text-slate-500">
                  <strong className="text-slate-700">Programs:</strong> Barber, HVAC, Electrical, Plumbing, and more. Start earning from day one while building your career.
                </p>
              </div>
            </div>
            
            {/* Other Funding Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <div className="relative h-48 md:h-40 lg:h-48">
                <Image
                  src="/images/artlist/hero-training-8.jpg"
                  alt="Additional funding programs"
                  fill
                  className="object-cover"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  OTHER FUNDING
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Additional Support Programs</h3>
                <p className="text-slate-600 mb-4">
                  SNAP Employment & Training, Trade Adjustment Assistance (TAA), Justice Reinvestment Initiative (JRI), and employer-sponsored training can cover costs.
                </p>
                <p className="text-sm text-slate-500">
                  <strong className="text-slate-700">We help you find:</strong> The right funding source for your situation. Most students qualify for at least one program.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">$0</div>
                <p className="text-sm text-slate-300">Out-of-pocket tuition for eligible students</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">8-16</div>
                <p className="text-sm text-slate-300">Weeks to complete most programs</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">100%</div>
                <p className="text-sm text-slate-300">Job placement support for graduates</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link 
                href="/wioa-eligibility"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-colors text-sm"
              >
                Check If You Qualify
              </Link>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {programs.map((program) => (
              <article 
                key={program.title}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100"
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
            ))}
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

      {/* Three Industries - Compact */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 text-center">
            Training in 3 High-Demand Industries
          </h2>
          
          {/* 3 Industries - always horizontal */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl mb-1">🏥</div>
              <p className="font-bold text-slate-900 text-xs">Healthcare</p>
              <p className="text-xs text-slate-500">CNA, MA</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl mb-1">🔧</div>
              <p className="font-bold text-slate-900 text-xs">Skilled Trades</p>
              <p className="text-xs text-slate-500">HVAC, CDL</p>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-2xl mb-1">💻</div>
              <p className="font-bold text-slate-900 text-xs">Technology</p>
              <p className="text-xs text-slate-500">IT, Cyber</p>
            </div>
          </div>
          
          {/* Partners Row - Compact */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-slate-400">
            <span>WorkOne Indiana</span>
            <span>•</span>
            <span>WIOA Approved</span>
            <span>•</span>
            <span>ETPL Listed</span>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Compact for Chromebook */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
            What Our Graduates Say
          </h2>
          <p className="text-sm text-slate-600 text-center mb-6 max-w-2xl mx-auto">
            Real stories from people who changed their careers.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* Testimonial 1 */}
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-3 text-sm leading-relaxed">
                "This program got me CNA certified in 8 weeks. Now I'm making $18/hour with benefits."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xs">TJ</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Tanya J.</p>
                  <p className="text-xs text-slate-500">CNA Graduate</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-3 text-sm leading-relaxed">
                "The barber apprenticeship let me earn while I learned. Now I'm licensed with my own chair."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xs">MR</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Marcus R.</p>
                  <p className="text-xs text-slate-500">Barber Graduate</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-3 text-sm leading-relaxed">
                "WIOA covered everything at 42. Now I'm an HVAC tech making real money."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-xs">DW</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">David W.</p>
                  <p className="text-xs text-slate-500">HVAC Graduate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges / Partners Section - Compact */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs text-slate-500 mb-4">Approved and recognized by</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                <span className="text-lg">🏛️</span>
              </div>
              <span className="text-xs text-slate-600">WIOA</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                <span className="text-lg">📋</span>
              </div>
              <span className="text-xs text-slate-600">ETPL</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                <span className="text-lg">🤝</span>
              </div>
              <span className="text-xs text-slate-600">WorkOne</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                <span className="text-lg">🎓</span>
              </div>
              <span className="text-xs text-slate-600">USDOL</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-1">
                <span className="text-lg">⚖️</span>
              </div>
              <span className="text-xs text-slate-600">Licensed</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Ready to start your journey?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 mb-4">
            Apply today and begin training within weeks.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href="/apply"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-5 py-2.5 rounded-full font-semibold hover:bg-blue-50 transition-colors text-sm"
            >
              Apply Now
            </Link>
            <Link 
              href="/login"
              className="inline-flex items-center justify-center border-2 border-white text-white px-5 py-2.5 rounded-full font-semibold hover:bg-white/10 transition-colors text-sm"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
