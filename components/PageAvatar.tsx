'use client';

import { useRef } from 'react';
import Image from 'next/image';

interface PageAvatarProps {
  videoSrc: string;
  title?: string;
  highlights?: string[];
}

export default function PageAvatar({ videoSrc, title, highlights }: PageAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="w-full bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Video Section */}
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-black relative">
            {/* Cropped video container to hide bottom branding */}
            <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-[115%] object-cover object-top"
                src={videoSrc}
                playsInline
                controls
                autoPlay
                preload="auto"
              />
            </div>
            {/* Logo overlay - covers bottom right corner where HeyGen logo appears */}
            <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
              <div className="bg-black/80 rounded-full p-2">
                <Image 
                  src="/logo.png" 
                  alt="Elevate" 
                  width={28} 
                  height={28} 
                  className="opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-white">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
            )}
            {highlights && highlights.length > 0 && (
              <div className="space-y-3">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-slate-200">{highlight}</p>
                  </div>
                ))}
              </div>
            )}
            {!highlights && (
              <p className="text-slate-300">
                Watch the video to learn more about this program and how it can help you achieve your career goals.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
