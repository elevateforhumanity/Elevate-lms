'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Play, Info, CheckCircle } from 'lucide-react';

interface PageAvatarProps {
  videoSrc: string;
  title?: string;
  description?: string;
  bulletPoints?: string[];
}

export default function PageAvatar({ 
  videoSrc, 
  title = "Your Personal Guide",
  description = "Watch this short video to learn how our programs work and how we can help you start your new career.",
  bulletPoints = [
    "100% free training through government funding",
    "No experience required - we start from the basics",
    "Job placement assistance after completion",
    "Earn industry-recognized certifications"
  ]
}: PageAvatarProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="w-full bg-gradient-to-b from-slate-100 to-white py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Video Section */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black relative">
              {/* Cropped video container to hide bottom branding */}
              <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-[110%] object-cover object-top"
                  src={videoSrc}
                  playsInline
                  controls
                  preload="metadata"
                  poster="/images/avatar-poster.jpg"
                />
              </div>
              {/* Logo overlay - covers bottom right corner where HeyGen logo appears */}
              <div className="absolute bottom-2 right-2 z-10 pointer-events-none">
                <div className="bg-black/80 rounded px-2 py-1 flex items-center gap-1">
                  <Image 
                    src="/logo.png" 
                    alt="Elevate" 
                    width={20} 
                    height={20} 
                    className="opacity-90"
                  />
                  <span className="text-white text-xs font-medium">Elevate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Watch & Learn</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              {title}
            </h2>
            
            <p className="text-lg text-slate-600 mb-6">
              {description}
            </p>

            <div className="space-y-3 mb-6">
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                <strong>No sales calls.</strong> This video explains everything you need to know. Apply online when you're ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
