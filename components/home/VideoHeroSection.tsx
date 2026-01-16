'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function VideoHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        video.muted = true;
        video.playsInline = true;
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.log('Autoplay blocked, waiting for interaction');
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
    document.addEventListener('scroll', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
    };
  }, [isPlaying]);

  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-end bg-black">
      {/* Video Background */}
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

      {/* CTA Buttons at bottom */}
      <div className="relative z-10 w-full pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
