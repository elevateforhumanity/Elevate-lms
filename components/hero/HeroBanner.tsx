'use client';

import React from 'react';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type HeroBannerProps = {
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  trustIndicators?: string[];
  // Video mode
  type?: 'image' | 'video';
  videoSrc?: string;
  voiceoverSrc?: string;
  posterSrc?: string;
  // Image mode
  heroImageSrc?: string;
  heroImageAlt?: string;
  overlay?: boolean;
};

export default function HeroBanner({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  trustIndicators = [],
  type = 'image',
  videoSrc = '/video/hero-home-dec12.mp4',
  voiceoverSrc,
  posterSrc = '/images/hero/hero-dec12-poster.svg',
  heroImageSrc = '/images/hero/hero-main.svg',
  heroImageAlt = 'Elevate for Humanity hero banner',
  overlay = true,
}: HeroBannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioBlocked, setAudioBlocked] = useState(false);

  // Always autoplay the muted video on load
  useEffect(() => {
    if (type !== 'video') return;

    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.loop = voiceoverSrc ? false : true; // no loop if voiceover present
    v.playsInline = true;

    v.play().catch(() => {
      // If even muted autoplay fails (rare), user gesture will be needed
    });
  }, [type, voiceoverSrc]);

  // Attempt to autoplay voiceover on load (may be blocked by browser)
  useEffect(() => {
    if (type !== 'video' || !voiceoverSrc) return;

    const v = videoRef.current;
    const a = audioRef.current;
    if (!v || !a) return;

    const attempt = async () => {
      try {
        v.muted = true;
        a.currentTime = v.currentTime || 0;
        await a.play();
        setAudioBlocked(false);
      } catch {
        setAudioBlocked(true);
      }
    };

    attempt();
  }, [type, voiceoverSrc]);

  // Keep voiceover synced to video
  useEffect(() => {
    if (type !== 'video' || !voiceoverSrc) return undefined;

    const v = videoRef.current;
    const a = audioRef.current;
    if (!v || !a) return undefined;

    const onPlay = async (): Promise<void> => {
      if (audioBlocked) return;
      try {
        a.currentTime = v.currentTime || 0;
        await a.play();
      } catch {
        setAudioBlocked(true);
      }
    };

    const onPause = (): void => {
      a.pause();
    };

    const onSeeked = (): void => {
      a.currentTime = v.currentTime || 0;
      if (!v.paused && !audioBlocked) {
        a.play().catch(() => setAudioBlocked(true));
      }
    };

    const onTimeUpdate = (): void => {
      // Light drift correction
      const drift = Math.abs((a.currentTime || 0) - (v.currentTime || 0));
      if (drift > 0.35) a.currentTime = v.currentTime || 0;
    };

    const onEnded = (): void => {
      a.pause();
      a.currentTime = 0;
    };

    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    v.addEventListener('seeked', onSeeked);
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('ended', onEnded);

    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('seeked', onSeeked);
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('ended', onEnded);
    };
  }, [type, voiceoverSrc, audioBlocked]);

  // User gesture fallback: enable sound
  const enableSound = async () => {
    const v = videoRef.current;
    const a = audioRef.current;
    if (!v || !a) return;

    try {
      v.muted = true;
      await v.play().catch(() => {
        // Video play blocked
      });
      a.currentTime = v.currentTime || 0;
      await a.play();
      setAudioBlocked(false);
    } catch {
      setAudioBlocked(true);
    }
  };

  return (
    <section className="relative w-full overflow-hidden rounded-3xl">
      <div className="relative h-[520px] w-full md:h-[600px]">
        {type === 'video' ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={videoSrc}
              autoPlay
              muted
              playsInline
              preload="none"
            />

            {voiceoverSrc && (
              <audio ref={audioRef} src={voiceoverSrc} preload="none" />
            )}

            {overlay && (
              <div
                className="absolute inset-0 bg-black/45"
                aria-hidden="true"
              />
            )}
          </>
        ) : (
          <>
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-cover"
            />
            {overlay && (
              <div
                className="absolute inset-0 bg-black/45"
                aria-hidden="true"
              />
            )}
          </>
        )}

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-base text-white/90 md:text-lg">
                {subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {primaryCta && (
                  <a
                    href={primaryCta.href}
                    className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    {primaryCta.label}
                  </a>
                )}
                {secondaryCta && (
                  <a
                    href={secondaryCta.href}
                    className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition-colors"
                  >
                    {secondaryCta.label}
                  </a>
                )}
              </div>

              {trustIndicators && trustIndicators.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {trustIndicators.map((indicator, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur"
                    >
                      {indicator}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
