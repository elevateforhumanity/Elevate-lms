'use client';

import Link from 'next/link';
import Image from 'next/image';

import AutoPlayTTS from '@/components/AutoPlayTTS';
import { useEffect, useState, useRef } from 'react';

// Welcome message for TTS - longer, more informative
const WELCOME_MESSAGE = "Welcome to Elevate for Humanity, Indiana's premier workforce training institute. We offer career training at no cost if you qualify through WIOA, WRG, and JRI funding programs. No tuition, no debt, just real credentials and job placement support. Whether you're looking to become a CNA, HVAC technician, barber, or IT professional, we're here to help you launch your new career. Apply today and start your journey to a better future.";

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
      {/* Auto-playing welcome message */}
      <AutoPlayTTS 
        text={WELCOME_MESSAGE} 
        voice="en-US-JennyNeural"
        delay={1500}
      />

      {/* Hero Section - Fast loading like Industrious */}
      <section className="relative w-full min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-end overflow-hidden bg-blue-900">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
        
        {/* Hero Content - Minimal, let voiceover do the talking */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
          <div 
            className={`flex flex-wrap gap-4 transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Link 
              href="/apply"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Apply Now
            </Link>
            <Link 
              href="/programs"
              className="inline-flex items-center text-white text-lg border-b-2 border-white pb-1 hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* How No-Cost Training Works */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How Can Training Be No Cost?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Federal and state workforce programs pay for your training - not you. These programs exist to help people get jobs in high-demand fields. We help you access them.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* WIOA Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
              <div className="relative h-48">
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
              <div className="relative h-48">
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
              <div className="relative h-48">
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
          <div className="bg-slate-900 rounded-2xl p-8 sm:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">$0</div>
                <p className="text-slate-300">Out-of-pocket tuition for eligible students</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">8-16</div>
                <p className="text-slate-300">Weeks to complete most programs</p>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">100%</div>
                <p className="text-slate-300">Job placement support for graduates</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/wioa-eligibility"
                className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Check If You Qualify
              </Link>
            </div>
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

          {/* Program Cards - 3 columns horizontal with image on top */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {programs.map((program) => (
              <article 
                key={program.title}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100"
              >
                {/* Image on top */}
                <div className="relative h-48 sm:h-56">
                  <Image
                    src={program.image}
                    alt={program.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {program.duration}
                  </div>
                </div>
                {/* Content below */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                    {program.title}
                  </h3>
                  <ul className="space-y-2 mb-5">
                    {program.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm sm:text-base text-slate-600">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={program.href} 
                    className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/beauty/program-barber-training.jpg"
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
                      <span className="font-semibold text-slate-900">2,000 hours hands-on experience</span>
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

      {/* Why Choose Us - Compact */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 bg-white rounded-xl p-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">$0</span>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Free Training</p>
                <p className="text-xs text-slate-500">WIOA funded</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Job Placement</p>
                <p className="text-xs text-slate-500">Career support</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Fast-Track</p>
                <p className="text-xs text-slate-500">8-16 weeks</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">Credentials</p>
                <p className="text-xs text-slate-500">Certifications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Industries - Compact */}
      <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">
            Training in 3 High-Demand Industries
          </h2>
          
          {/* 3 Industries - always horizontal */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-2">🏥</div>
              <p className="font-bold text-slate-900 text-sm">Healthcare</p>
              <p className="text-xs text-slate-500">CNA, MA, Phlebotomy</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-2">🔧</div>
              <p className="font-bold text-slate-900 text-sm">Skilled Trades</p>
              <p className="text-xs text-slate-500">HVAC, CDL, Electrical</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <div className="text-3xl mb-2">💻</div>
              <p className="font-bold text-slate-900 text-sm">Technology</p>
              <p className="text-xs text-slate-500">IT, Cybersecurity</p>
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

    </div>
  );
}
