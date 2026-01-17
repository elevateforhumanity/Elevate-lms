'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface AmbientMusicProps {
  // Path to ambient music file (soft, looping background music)
  src?: string;
  // Volume (0-1), keep low for ambient
  volume?: number;
  // Fade in duration in ms
  fadeInDuration?: number;
  // Delay before starting
  delay?: number;
}

/**
 * Soft ambient background music for pages without video.
 * Plays subtle, non-intrusive music that enhances the experience.
 * 
 * Recommended: 
 * - Lo-fi beats, soft piano, or ambient corporate music
 * - Keep volume low (0.15-0.25)
 * - Use seamless loops
 */
export default function AmbientMusic({ 
  src = '/audio/ambient-soft.mp3',
  volume = 0.18,
  fadeInDuration = 2000,
  delay = 1000
}: AmbientMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControl, setShowControl] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeInterval = useRef<NodeJS.Timeout | null>(null);

  const fadeIn = useCallback((audio: HTMLAudioElement, targetVolume: number, duration: number) => {
    audio.volume = 0;
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    fadeInterval.current = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(volumeStep * currentStep, targetVolume);
      if (currentStep >= steps) {
        if (fadeInterval.current) clearInterval(fadeInterval.current);
      }
    }, stepTime);
  }, []);

  const startMusic = useCallback(() => {
    if (!audioRef.current || isPlaying) return;
    
    audioRef.current.loop = true;
    fadeIn(audioRef.current, volume, fadeInDuration);
    
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setShowControl(true);
        setHasInteracted(true);
      })
      .catch(() => {
        // Autoplay blocked - will start on interaction
        setShowControl(true);
      });
  }, [isPlaying, volume, fadeInDuration, fadeIn]);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = volume;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [isPlaying, volume]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const audio = new Audio(src);
    audio.preload = 'auto';
    audio.loop = true;
    audioRef.current = audio;

    // Try autoplay after delay
    const timer = setTimeout(startMusic, delay);

    // Start on first interaction if autoplay blocked
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        startMusic();
      }
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      if (fadeInterval.current) clearInterval(fadeInterval.current);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, delay, startMusic, hasInteracted]);

  // Minimal, elegant control
  if (!showControl) return null;

  return (
    <button
      onClick={toggleMusic}
      className={`fixed bottom-6 left-6 z-40 p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm ${
        isPlaying 
          ? 'bg-white/90 text-gray-700 hover:bg-white' 
          : 'bg-gray-900/80 text-white hover:bg-gray-900'
      }`}
      aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
      title={isPlaying ? 'Mute music' : 'Play music'}
    >
      {isPlaying ? (
        // Sound on icon with animated bars
        <div className="w-5 h-5 flex items-center justify-center">
          <div className="flex items-end gap-0.5 h-4">
            <span className="w-1 bg-current rounded-full animate-pulse" style={{ height: '40%', animationDelay: '0ms' }} />
            <span className="w-1 bg-current rounded-full animate-pulse" style={{ height: '70%', animationDelay: '150ms' }} />
            <span className="w-1 bg-current rounded-full animate-pulse" style={{ height: '50%', animationDelay: '300ms' }} />
            <span className="w-1 bg-current rounded-full animate-pulse" style={{ height: '90%', animationDelay: '450ms' }} />
          </div>
        </div>
      ) : (
        // Sound off icon
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
    </button>
  );
}
