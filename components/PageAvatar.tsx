'use client';

import { useEffect, useRef } from 'react';

interface PageAvatarProps {
  videoSrc: string;
  title: string;
}

export default function PageAvatar({ videoSrc, title }: PageAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.volume = 1;
    video.play().catch(() => {
      // Browser blocked autoplay - will play on interaction
    });
  }, []);

  return (
    <section className="w-full bg-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            playsInline
            autoPlay
            preload="auto"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg">
            <span className="font-medium">{title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
