'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoHeroBannerProps {
  videoSrc?: string;
  withAudio?: boolean;
  voiceoverSrc?: string;
  headline?: string;
  subheadline?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
}

export default function VideoHeroBanner({
  videoSrc = '/videos/hero-home.mp4',
  withAudio = false,
  voiceoverSrc,
  headline = 'Elevate for Humanity',
  subheadline = 'Free, Funded Workforce Training',
  primaryCTA = { text: 'Apply Now', href: '/apply' },
  secondaryCTA = { text: 'Learn More', href: '/programs' },
}: VideoHeroBannerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(!withAudio);
  const [showControls, setShowControls] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true); // Start true - hero visible by default
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set loaded state when video can play
    const handleCanPlay = () => {
      setIsLoaded(true);
      video.play().catch(() => {
        setIsPlaying(false);
      });
    };

    const handleError = () => {
      setHasError(true);
      setIsLoaded(true); // Show fallback
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Auto-play voiceover if provided (unmuted)
    if (audioRef.current && voiceoverSrc) {
      audioRef.current.muted = false;
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch(() => {
      });
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [voiceoverSrc, videoSrc]);

  // Ensure audio plays on any user interaction
  const handleUserInteraction = () => {
    if (audioRef.current && voiceoverSrc && audioRef.current.paused) {
      audioRef.current.play().catch(console.error);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        if (audioRef.current) {
          audioRef.current.pause();
        }
      } else {
        videoRef.current.play();
        if (audioRef.current) {
          audioRef.current.play();
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section
      className="relative w-full bg-gradient-to-br from-blue-900 to-purple-900"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      onClick={handleUserInteraction}
    >
      {/* Video Container - Mobile Optimized with viewport units */}
      <div
        className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px]"
        style={{
          height: '100vh',
          height: '100svh',
          maxHeight: '900px',
        }}
      >
        {/* Fallback Background Image - Always visible */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/homepage/students.jpg')",
          }}
        />

        {/* Video Background - Always rendered, enhanced progressively */}
        {!hasError && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover z-1"
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            autoPlay
            poster="/images/homepage/students.jpg"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-5" />

        {/* Text Content - Mobile First */}
        <div className="absolute inset-0 flex items-center z-10 pt-16 md:pt-0">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight break-words drop-shadow-2xl">
                {headline}
              </h1>
              <p className="text-base md:text-lg text-white/90 mb-6 max-w-xl drop-shadow-lg">
                {subheadline}
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={primaryCTA.href}
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-brand-blue-600 text-base font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  {primaryCTA.text}
                </Link>
                <Link
                  href={secondaryCTA.href}
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-white text-base font-bold rounded-xl hover:bg-white/10 transition-colors border-2 border-white"
                >
                  {secondaryCTA.text}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Loading indicator */}
        {!isLoaded && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Voiceover Audio (plays independently of video mute) */}
        {voiceoverSrc && (
          <audio ref={audioRef} loop muted={false}>
            <source src={voiceoverSrc} type="audio/mpeg" />
          </audio>
        )}

        {/* Video Controls - Only show when video loaded */}
        {isLoaded && (
          <div
            className={`absolute bottom-4 right-4 flex items-center gap-2 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={togglePlay}
              className="p-2 bg-black/70 backdrop-blur-sm text-white rounded-full hover:bg-black/90 transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 bg-black/70 backdrop-blur-sm text-white rounded-full hover:bg-black/90 transition-colors"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 bg-black/70 backdrop-blur-sm text-white rounded-full hover:bg-black/90 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
