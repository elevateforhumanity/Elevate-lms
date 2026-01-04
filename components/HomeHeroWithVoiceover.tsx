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
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Voiceover Audio */}
      <audio ref={audioRef} src={audioSrc} preload="auto" />

      <div className="absolute inset-0 flex items-center justify-center text-center px-4 pointer-events-none">
        <div className="max-w-4xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white uppercase tracking-wide">
            LIMITLESS OPPORTUNITIES
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6 sm:mb-8">
            WHERE LEARNING LEADS TO EARNING!
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <Link
              href="/apply"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-orange-500 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold text-white shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105 uppercase"
            >
              Apply Now
            </Link>
            <Link
              href="/hire-graduates"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border-2 sm:border-3 border-white bg-transparent px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold text-white hover:bg-white hover:text-blue-900 transition-all transform hover:scale-105 uppercase"
            >
              Hire A Student
            </Link>
          </div>

          {/* Play with Sound Button */}
          {showButton && (
            <button
              onClick={handlePlaySound}
              className="mt-6 px-6 py-2 bg-white/20 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-full hover:bg-white/30 transition-all"
            >
              🔊 Play with Sound
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
