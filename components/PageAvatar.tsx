'use client';

import { useRef } from 'react';

interface PageAvatarProps {
  videoSrc: string;
  title: string;
}

export default function PageAvatar({ videoSrc, title }: PageAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="w-full bg-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black">
          <video
            ref={videoRef}
            className="w-full aspect-video object-contain"
            src={videoSrc}
            playsInline
            controls
            preload="metadata"
          />
          {/* Title badge */}
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <span className="font-medium text-sm">{title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
