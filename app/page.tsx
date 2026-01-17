'use client';

import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import AutoPlayTTS from '@/components/AutoPlayTTS';
import { useEffect, useState, useRef } from 'react';

// Welcome message for TTS
const WELCOME_MESSAGE = "Welcome to Elevate for Humanity. Launch your new career today with free workforce training for Indiana residents. Explore our healthcare, skilled trades, and technology programs.";

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
    image: '/images/healthcare/cna-training.jpg',
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
    image: '/images/technology/hero-program-it-support.jpg',
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

  // Play video immediately - with mobile retry
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted (required for mobile autoplay)
    video.muted = true;
    
    const playVideo = () => {
      video.play().catch(() => {
        // Retry after a short delay on mobile
        setTimeout(() => {
          video.play().catch(() => {});
        }, 500);
      });
    };

    // Play when video is ready
    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo, { once: true });
    }

    return () => {
      video.removeEventListener('loadeddata', playVideo);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      
      {/* Auto-playing welcome message */}
      <AutoPlayTTS 
        text={WELCOME_MESSAGE} 
        voice="en-US-JennyNeural"
        delay={1500}
      />

      {/* Hero Section - Fast loading like Industrious */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background video - compressed 741KB, loads fast */}
        {/* Key mobile fixes: webkit-playsinline, muted MUST be present for autoplay */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          poster="/images/artlist/hero-training-1.jpg"
          webkit-playsinline="true"
        >
          <source src="/videos/hero-home-fast.mp4" type="video/mp4" />
        </video>
        
        {/* Subtle bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
          <h1 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 max-w-4xl transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Launch your <em className="italic font-normal">new career</em> today.
          </h1>
          <p 
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-xl transition-all duration-700 delay-100 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Free workforce training for Indiana residents
          </p>
          <Link 
            href="/programs"
            className={`inline-flex items-center text-white text-base sm:text-lg border-b-2 border-white pb-1 hover:border-blue-400 hover:text-blue-400 transition-all duration-300 min-h-[44px] ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Explore Programs
          </Link>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            Training programs for every path
          </h2>
          <Link 
            href="/programs" 
            className="inline-flex items-center text-blue-600 border-b border-blue-600 pb-0.5 hover:text-blue-800 hover:border-blue-800 mb-8 sm:mb-10 md:mb-12 min-h-[44px] text-sm sm:text-base"
          >
            Explore All Programs
          </Link>

          {/* Program Cards - Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {programs.map((program) => (
              <article 
                key={program.title}
                className="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-5 sm:p-6">
                  <span className="text-xs sm:text-sm text-slate-500 uppercase tracking-wide">
                    {program.duration}
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mt-2 mb-3 sm:mb-4">
                    {program.title}
                  </h3>
                  <ul className="space-y-2 mb-5 sm:mb-6">
                    {program.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm sm:text-base text-slate-600">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={program.href} 
                    className="inline-flex items-center text-blue-600 border-b border-blue-600 pb-0.5 hover:text-blue-800 min-h-[44px] text-sm sm:text-base"
                  >
                    Learn More
                  </Link>
                </div>
                <div className="relative h-40 sm:h-48">
                  <Image
                    src={program.image}
                    alt={program.alt}
                    fill
                    className="object-cover"
                    quality={80}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>



      {/* How We Help You Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Training Funded by Programs That Work
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We connect you with federal and state workforce programs that pay for your training. You focus on learning - we handle the paperwork.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* WIOA Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/artlist/hero-training-2.jpg"
                  alt="WIOA funded training"
                  fill
                  className="object-cover"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">WIOA Funding</h3>
                <p className="text-slate-600 mb-4">
                  The Workforce Innovation and Opportunity Act covers tuition, books, and supplies for eligible adults and dislocated workers. If you qualify, your training is completely free.
                </p>
                <Link href="/wioa-eligibility" className="text-blue-600 border-b border-blue-600 pb-0.5 hover:text-blue-800">
                  Check Eligibility
                </Link>
              </div>
            </div>

            {/* Earn While You Learn Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/artlist/hero-training-3.jpg"
                  alt="Apprenticeship training"
                  fill
                  className="object-cover"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Earn While You Learn</h3>
                <p className="text-slate-600 mb-4">
                  Our registered apprenticeship programs let you get paid while training. Work alongside experienced professionals and graduate with real job experience and industry credentials.
                </p>
                <Link href="/programs" className="text-blue-600 border-b border-blue-600 pb-0.5 hover:text-blue-800">
                  View Apprenticeships
                </Link>
              </div>
            </div>

            {/* Reentry Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src="/images/artlist/hero-training-4.jpg"
                  alt="Justice-involved reentry programs"
                  fill
                  className="object-cover"
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Second Chance Programs</h3>
                <p className="text-slate-600 mb-4">
                  Justice Reinvestment Initiative (JRI) funding supports reentry training. We partner with employers who hire based on skills, not background. Your past does not define your future.
                </p>
                <Link href="/reentry" className="text-blue-600 border-b border-blue-600 pb-0.5 hover:text-blue-800">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Who We Serve */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 sm:h-96 lg:h-[450px] rounded-2xl overflow-hidden">
              <Image
                src="/images/artlist/hero-training-5.jpg"
                alt="Students in career training"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                Who We Serve
              </h3>
              <ul className="space-y-4 text-lg text-slate-600 mb-8">
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Adults seeking a career change or first-time job training</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Displaced workers who lost jobs due to layoffs or closures</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Veterans transitioning to civilian careers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Justice-involved individuals ready for a fresh start</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Anyone eligible for WIOA, SNAP E&T, or other workforce funding</span>
                </li>
              </ul>
              <p className="text-lg text-slate-600 mb-8">
                We guide you from enrollment through certification to employment. No confusion, no runaround - just a clear path to a real job.
              </p>
              <Link 
                href="/apply"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Apply Now - It&apos;s Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Ready to start your journey?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Apply today and begin training within weeks.
          </p>
          <Link 
            href="/apply"
            className="inline-flex items-center justify-center bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-50 active:bg-blue-100 transition-colors min-h-[48px] text-base sm:text-lg"
          >
            Apply Now
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
