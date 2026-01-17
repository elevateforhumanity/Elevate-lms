'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import AutoPlayTTS from '@/components/AutoPlayTTS';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

const TECH_MESSAGE = "Welcome to our technology training programs. Learn IT support, cybersecurity, or web development. Tech careers offer excellent pay and remote work options. Training is available at no cost if you qualify.";

const programs = [
  {
    title: 'IT Support',
    duration: '8-12 Weeks',
    description: 'CompTIA A+ certification and help desk skills.',
    href: '/programs/technology/it-support',
    image: '/images/technology/hero-program-it-support.jpg',
  },
  {
    title: 'Cybersecurity',
    duration: '12-16 Weeks',
    description: 'Protect networks and systems from cyber threats.',
    href: '/programs/technology/cybersecurity',
    image: '/images/technology/hero-program-cybersecurity.jpg',
  },
  {
    title: 'Web Development',
    duration: '16-20 Weeks',
    description: 'Build websites and web applications.',
    href: '/programs/technology/web-development',
    image: '/images/technology/hero-program-web-dev.jpg',
  },
];

export default function TechnologyProgramsPage() {
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
      <AutoPlayTTS text={TECH_MESSAGE} delay={1000} />

      {/* Hero */}
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
              href="/apply?program=technology"
              className="inline-flex items-center justify-center bg-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-700 transition-colors text-lg"
            >
              Apply Now
            </Link>
            <Link 
              href="/wioa-eligibility"
              className="inline-flex items-center text-white text-lg border-b-2 border-white pb-1 hover:border-purple-400 hover:text-purple-400 transition-all duration-300"
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
                  <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {program.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <span className="text-purple-600 font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-purple-600">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Link
            href="/apply?program=technology"
            className="inline-block bg-white text-purple-600 px-8 py-3 font-semibold rounded-full hover:bg-purple-50 transition-colors"
          >
            Start Your Tech Career
          </Link>
        </div>
      </section>
    </div>
  );
}
