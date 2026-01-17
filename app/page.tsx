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

      {/* Featured Program - Barber Apprenticeship */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/programs/barber.jpg"
                alt="Barber Apprenticeship Program"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <span>⭐</span> USDOL Registered Apprenticeship
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Barber Apprenticeship Program
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Earn while you learn. Get your Indiana Barber License through our USDOL-registered apprenticeship. Work with a licensed sponsor, build real skills, and launch your career.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-700">
                  <CheckIcon />
                  USDOL Registered Apprenticeship
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <CheckIcon />
                  Pathway to Indiana Barber License (IPLA)
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <CheckIcon />
                  Earn income while training
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <CheckIcon />
                  1,500 hours hands-on experience
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/programs/barber-apprenticeship"
                  className="inline-flex items-center text-blue-600 border-b-2 border-blue-600 pb-1 hover:text-blue-800 font-medium"
                >
                  Learn More
                </Link>
                <Link 
                  href="/apply"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
          
          {/* Also Offering */}
          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-500 mb-4">Also offering free training in:</p>
            <p className="text-lg font-medium text-slate-700">
              Healthcare • Skilled Trades • Technology • Business
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Our Programs */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-center">
            Why Choose Our Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Free Training</h3>
              <p className="text-slate-400">WIOA, WRG, or DOL funding covers tuition for eligible students</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Job Placement</h3>
              <p className="text-slate-400">Resume help, interview prep, and connections to hiring employers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast-Track Programs</h3>
              <p className="text-slate-400">Complete in weeks or months, not years</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real Credentials</h3>
              <p className="text-slate-400">State licenses, national certifications, DOL apprenticeships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 mb-8">Trusted Partners & Recognized Credentials</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-blue-600">W1</span>
              </div>
              <span className="text-sm text-slate-600">WorkOne Indiana</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-green-600">C</span>
              </div>
              <span className="text-sm text-slate-600">Certiport Testing</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-purple-600">W</span>
              </div>
              <span className="text-sm text-slate-600">WIOA Approved</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-orange-600">E</span>
              </div>
              <span className="text-sm text-slate-600">ETPL Listed</span>
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
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/apply"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-50 active:bg-blue-100 transition-colors min-h-[48px] text-base sm:text-lg"
            >
              Apply Now
            </Link>
            <Link 
              href="/login"
              className="inline-flex items-center justify-center border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/10 transition-colors min-h-[48px] text-base sm:text-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
