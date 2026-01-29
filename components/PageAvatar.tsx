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
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, []);

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <video
            ref={videoRef}
            className="w-full"
            playsInline
            autoPlay
            muted
            preload="auto"
            src={videoSrc}
          />
          {/* Tiny logo bottom-right corner over HeyGen watermark */}
          <img 
            src="/logo.png" 
            alt="" 
            className="absolute bottom-2 right-2 h-4 w-auto z-10 opacity-80"
          />
        </div>
        <p className="text-center text-slate-500 mt-2 text-sm">{title}</p>
      </div>
    </section>
  );
}
