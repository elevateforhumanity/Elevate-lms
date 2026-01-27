'use client';

import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

interface PageAvatarProps {
  videoSrc: string;
  title: string;
  poster?: string;
}

const R2_URL = process.env.NEXT_PUBLIC_R2_URL;

export default function PageAvatar({ videoSrc, title, poster }: PageAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Use R2 URL if configured and video is from /videos/
  const finalVideoSrc = R2_URL && videoSrc.startsWith('/videos/') 
    ? `${R2_URL}${videoSrc}` 
    : videoSrc;

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.volume = 1;
    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {});
  };

  return (
    <section className="w-full bg-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            playsInline
            preload="none"
            poster={poster || '/images/heroes-hq/homepage-hero.jpg'}
            onEnded={() => setIsPlaying(false)}
          >
            <source src={finalVideoSrc} type="video/mp4" />
          </video>
          
          {/* Play button overlay - shows until video plays */}
          {!isPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer"
              aria-label="Play video"
            >
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <Play className="w-10 h-10 text-blue-600 ml-1" />
              </div>
            </button>
          )}
          
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg">
            <span className="font-medium">{title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
