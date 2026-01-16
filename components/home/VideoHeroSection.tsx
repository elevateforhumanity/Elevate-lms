'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function VideoHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener('canplay', handleCanPlay);

    const playVideo = async () => {
      try {
        video.muted = true;
        video.playsInline = true;
        await video.play();
        setIsPlaying(true);
      } catch {
        // Autoplay blocked - image fallback will show
      }
    };

    playVideo();

    const handleInteraction = () => {
      if (!isPlaying && video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('click', handleInteraction, { once: true });

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
    };
  }, [isPlaying]);

  return (
    <section className="relative w-full min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[650px] flex items-center bg-slate-900 overflow-hidden">
      {/* Fallback Image - always present for mobile */}
      <Image
        src="/images/artlist/hero-training-1.jpg"
        alt="Career Training"
        fill
        className="object-cover"
        priority
      />
      
      {/* Video Background - only on larger screens */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 hidden sm:block ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
      >
        <source src="/videos/hero-home.mp4" type="video/mp4" />
      </video>

      {/* CTA buttons at bottom */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Apply Now
            </Link>
            <Link
              href="/pathways"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-bold rounded-xl hover:bg-white/20 transition-colors border-2 border-white"
            >
              View Pathways
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
