"use client";

import React from 'react';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PWAInstallSection() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Wait for page to fully load before showing PWA prompt
    setIsLoaded(true);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      alert(
        'To install: \n\n• On iOS: Tap Share button, then "Add to Home Screen"\n• On Android: Tap menu (⋮) then "Install app" or "Add to Home screen"'
      );
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowButton(false);
    }
  };

  // Don't render until page is loaded
  if (!isLoaded) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-white mb-6">
              📱 Download Our App
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Take Your Training Anywhere
            </h2>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              Access your courses, track progress, and stay connected—right from
              your phone. No app store required. Works on iPhone, Android, and
              desktop.
            </p>

            <button
              onClick={handleInstall}
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-orange-600 px-8 py-4 text-white font-bold text-lg hover:bg-orange-700 transition-all shadow-lg"
            >
              📱 Download the App
            </button>

            <p className="mt-6 text-sm text-slate-600">
              ✓ Works offline - access courses anywhere
              <br />
              ✓ Fast and lightweight - no app store required
              <br />
              ✓ Push notifications for assignments and updates
              <br />✓ Automatic updates - always the latest version
            </p>
          </div>

          <div className="relative aspect-video max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
            <Image
              src="/images/heroes/hero-homepage.jpg"
              alt="Elevate for Humanity App"
              fill
              className="object-cover"
              quality={95}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
