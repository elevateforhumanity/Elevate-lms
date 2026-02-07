'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

interface HomeHeroWithVoiceoverProps {
  videoSrc: string;
  audioSrc: string;
}

export function HomeHeroWithVoiceover({
  videoSrc,
  audioSrc,
}: HomeHeroWithVoiceoverProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showButton, setShowButton] = useState(true);

  const handlePlaySound = () => {
    if (videoRef.current && audioRef.current) {
      videoRef.current.muted = true;
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => {
          setShowButton(false);
        })
        .catch(() => {
          // Audio play failed
        });
    }
  };

  return (
    <section className="relative h-[400px] md:h-[450px] w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Voiceover Audio */}
      <audio ref={audioRef} src={audioSrc} preload="none" />

      {/* Text removed from hero banner - clean video only */}
      
      {/* Play with Sound Button */}
      <div className="absolute bottom-4 right-4">
        {showButton && (
          <button
            onClick={handlePlaySound}
            className="px-6 py-2 bg-white/20 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-full hover:bg-white/30 transition-all pointer-events-auto"
          >
            🔊 Play with Sound
          </button>
        )}
      </div>
    </section>
  );
}
