'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import AutoPlayTTS from '@/components/AutoPlayTTS';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

const PROGRAMS_MESSAGE = "Explore our career training programs in healthcare, skilled trades, and technology. All programs are available at no cost if you qualify through WIOA, WRG, or JRI funding. Click on a program to learn more and start your application.";

const programs = [
  {
    title: 'Healthcare',
    description: 'CNA, Direct Support Professional, Drug Collector',
    href: '/programs/healthcare',
    image: '/images/healthcare/program-cna-training.jpg',
  },
  {
    title: 'Skilled Trades',
    description: 'HVAC, CDL, Barber Apprenticeship',
    href: '/programs/skilled-trades',
    image: '/images/trades/hero-program-hvac.jpg',
  },
  {
    title: 'Technology',
    description: 'IT Support, Cybersecurity, Web Development',
    href: '/programs/technology',
    image: '/images/technology/hero-programs-technology.jpg',
  },
];

export default function ProgramsPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <AutoPlayTTS text={PROGRAMS_MESSAGE} delay={1000} />

      {/* Hero - Clean video with just CTAs */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] flex items-end overflow-hidden bg-slate-900">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover brightness-110"
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
        >
          <source src="/videos/hero-home-fast.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className={`flex flex-wrap gap-4 transition-all duration-700 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link 
              href="/apply"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg"
            >
              Apply Now
            </Link>
            <Link 
              href="/wioa-eligibility"
              className="inline-flex items-center text-white text-lg border-b-2 border-white pb-1 hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
            >
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Programs Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-slate-100"
              >
                <div className="relative h-48">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    quality={85}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <span className="text-blue-600 font-semibold group-hover:underline">
                    View Programs →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Link
            href="/apply"
            className="inline-block bg-white text-blue-600 px-8 py-3 font-semibold rounded-full hover:bg-blue-50 transition-colors"
          >
            Start Your Application
          </Link>
        </div>
      </section>
    </div>
  );
}
