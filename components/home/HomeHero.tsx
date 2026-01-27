'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';

export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] flex items-center">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        autoPlay
        poster="/images/heroes-hq/homepage-hero.jpg"
      >
        <source src="https://pub-23811be4d3844e45a8bc2d3dc5e7aaec.r2.dev/videos/hero-home.mp4" type="video/mp4" />
      </video>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 md:mb-8">
              Reach your career potential.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 md:mb-10 leading-relaxed">
              Connect with training providers, get industry credentials, and build a higher paying career with Elevate for Humanity.
            </p>
            <Link
              href="/programs"
              className="inline-flex items-center gap-3 bg-red-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-red-700 transition-colors"
            >
              Explore training paths near you
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
