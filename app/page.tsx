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
          <p 
            className={`text-sm sm:text-base text-blue-400 font-medium mb-2 uppercase tracking-wide transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Free Career Training for Indiana Residents
          </p>
          <h1 
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 max-w-4xl transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Get trained. Get certified. <em className="italic font-normal">Get hired.</em>
          </h1>
          <p 
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-2xl transition-all duration-700 delay-100 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            We provide free job training in healthcare, skilled trades, and technology. WIOA-funded programs mean no tuition for eligible students. Graduate with real credentials and job placement support.
          </p>
          <div 
            className={`flex flex-wrap gap-4 transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <Link 
              href="/apply"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors text-base sm:text-lg"
            >
              Apply Now - It&apos;s Free
            </Link>
            <Link 
              href="/programs"
              className="inline-flex items-center text-white text-base sm:text-lg border-b-2 border-white pb-1 hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* How Free Training Works */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              How Is Training Free?
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              Federal and state workforce programs pay for your training - not you. These programs exist to help people get jobs in high-demand fields. We help you access them.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-800 rounded-2xl p-6">
              <div className="text-blue-400 font-semibold text-sm uppercase tracking-wide mb-2">WIOA Funding</div>
              <h3 className="text-xl font-bold mb-3">Workforce Innovation & Opportunity Act</h3>
              <p className="text-slate-300 mb-4">
                Federal program that pays for job training for adults, dislocated workers, and youth. Covers tuition, books, supplies, and even transportation or childcare in some cases.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Who qualifies:</strong> Unemployed, underemployed, low-income, veterans, single parents, individuals with disabilities, or those receiving public assistance.
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-2xl p-6">
              <div className="text-green-400 font-semibold text-sm uppercase tracking-wide mb-2">Apprenticeships</div>
              <h3 className="text-xl font-bold mb-3">Earn While You Learn</h3>
              <p className="text-slate-300 mb-4">
                USDOL-registered apprenticeships let you work and get paid while training. Your employer sponsors your education. You graduate with experience and a job.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>Programs:</strong> Barber, HVAC, Electrical, Plumbing, and more. Start earning from day one while building your career.
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-2xl p-6">
              <div className="text-purple-400 font-semibold text-sm uppercase tracking-wide mb-2">Other Funding</div>
              <h3 className="text-xl font-bold mb-3">Additional Support Programs</h3>
              <p className="text-slate-300 mb-4">
                SNAP Employment & Training, Trade Adjustment Assistance (TAA), Justice Reinvestment Initiative (JRI), and employer-sponsored training can also cover costs.
              </p>
              <p className="text-slate-400 text-sm">
                <strong>We help you find:</strong> The right funding source for your situation. Most students qualify for at least one program.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center border-t border-slate-700 pt-12">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-blue-400 mb-2">$0</div>
              <p className="text-slate-300">Out-of-pocket tuition for eligible students</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-blue-400 mb-2">8-16</div>
              <p className="text-slate-300">Weeks to complete most programs</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-blue-400 mb-2">100%</div>
              <p className="text-slate-300">Job placement support for graduates</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/wioa-eligibility"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Check If You Qualify
            </Link>
          </div>
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
                src="/images/beauty/hero-barber-training.jpg"
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
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">USDOL Registered Apprenticeship</span>
                      <p className="text-sm text-slate-600">Nationally recognized credential</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">Pathway to Indiana Barber License (IPLA)</span>
                      <p className="text-sm text-slate-600">Meet state board requirements</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">Earn income while training</span>
                      <p className="text-sm text-slate-600">Get paid from day one</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">1,500 hours hands-on experience</span>
                      <p className="text-sm text-slate-600">Learn from licensed barbers</p>
                    </div>
                  </li>
                </ul>
              </div>
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

      {/* Certifications You Can Earn */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Graduate with Credentials Employers Want
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our programs prepare you for industry-recognized certifications and state licenses that lead directly to jobs.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-2">🏥</div>
              <p className="font-semibold text-slate-900 text-sm">CNA Certification</p>
              <p className="text-xs text-slate-500">Healthcare</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-2">❄️</div>
              <p className="font-semibold text-slate-900 text-sm">HVAC EPA 608</p>
              <p className="text-xs text-slate-500">Skilled Trades</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-2">💻</div>
              <p className="font-semibold text-slate-900 text-sm">CompTIA A+</p>
              <p className="text-xs text-slate-500">Technology</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-2">🚛</div>
              <p className="font-semibold text-slate-900 text-sm">CDL Class A</p>
              <p className="text-xs text-slate-500">Transportation</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-2">✂️</div>
              <p className="font-semibold text-slate-900 text-sm">Barber License</p>
              <p className="text-xs text-slate-500">Apprenticeship</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-2">📊</div>
              <p className="font-semibold text-slate-900 text-sm">QuickBooks</p>
              <p className="text-xs text-slate-500">Business</p>
            </div>
          </div>
          
          {/* Partners Row */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-center text-slate-500 mb-6">Approved Training Provider</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="font-semibold">WorkOne Indiana</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="font-semibold">WIOA Approved</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="font-semibold">ETPL Listed</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="font-semibold">USDOL Registered</span>
              </div>
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
