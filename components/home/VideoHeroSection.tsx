'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function VideoHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force autoplay on mount for all devices including mobile
    const playVideo = async () => {
      try {
        video.muted = true;
        video.playsInline = true;
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay blocked, try again with user interaction
        console.log('Autoplay blocked, waiting for interaction');
      }
    };

    playVideo();

    // Also try to play on any user interaction
    const handleInteraction = () => {
      if (!isPlaying && video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, [isPlaying]);

  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center bg-black">
      {/* Video Background with poster fallback */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        autoPlay
        preload="metadata"
        poster="/images/artlist/hero-training-1.jpg"
      >
        <source src="/videos/hero-home.mp4" type="video/mp4" />
      </video>

      {/* Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 md:p-8">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                Free Career Training
              </h1>
              <p className="text-base md:text-lg text-white mb-6 max-w-xl">
                Healthcare • Skilled Trades • Technology • Business
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 text-base font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Apply Now
                </Link>
                <Link
                  href="/pathways"
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white text-base font-bold rounded-xl hover:bg-white/10 transition-colors border-2 border-white"
                >
                  View Pathways
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
