'use client';

import { useRef } from 'react';
import Image from 'next/image';

interface PageAvatarProps {
  videoSrc: string;
  title: string;
}

export default function PageAvatar({ videoSrc, title }: PageAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="w-full bg-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            src={videoSrc}
            playsInline
            controls
            preload="metadata"
          />
          {/* Logo overlay to cover HeyGen branding - bottom right corner */}
          <div className="absolute bottom-0 right-0 bg-white rounded-tl-lg p-2 shadow-lg z-20">
            <Image
              src="/logo.png"
              alt="Elevate for Humanity"
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />
          </div>
          {/* Title badge - bottom left */}
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg">
            <span className="font-medium">{title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
