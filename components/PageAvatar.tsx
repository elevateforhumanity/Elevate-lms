'use client';

import { useRef } from 'react';

interface PageAvatarProps {
  videoSrc: string;
  title?: string;
}

export default function PageAvatar({ videoSrc, title }: PageAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="w-full bg-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-2xl overflow-hidden shadow-xl bg-black">
          <video
            ref={videoRef}
            className="w-full aspect-video object-contain"
            src={videoSrc}
            playsInline
            controls
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
}
