'use client';

import { useRef } from 'react';
import Image from 'next/image';

interface PageAvatarProps {
  videoSrc: string;
  title?: string;
}

export default function PageAvatar({ videoSrc, title }: PageAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="w-full bg-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-2xl overflow-hidden shadow-xl bg-black relative">
          {/* Cropped video container to hide bottom branding */}
          <div className="relative overflow-hidden" style={{ paddingBottom: '50%' }}>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-[110%] object-cover object-top"
              src={videoSrc}
              playsInline
              controls
              preload="metadata"
            />
          </div>
          {/* Logo overlay - covers bottom right corner where HeyGen logo appears */}
          <div className="absolute bottom-2 right-2 z-10 pointer-events-none">
            <div className="bg-black/80 rounded px-2 py-1 flex items-center gap-1">
              <Image 
                src="/logo.png" 
                alt="Elevate" 
                width={20} 
                height={20} 
                className="opacity-90"
              />
              <span className="text-white text-xs font-medium">Elevate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
