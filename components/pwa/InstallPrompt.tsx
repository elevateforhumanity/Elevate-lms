'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallPromptProps {
  appName: string;
  appDescription: string;
  themeColor?: string;
}

function InstallPrompt({ appName, appDescription, themeColor = '#7c3aed' }: InstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Check if dismissed recently
    const dismissed = localStorage.getItem('pwa_install_dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) return; // Don't show for 7 days after dismissal
    }

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Show iOS prompt after delay
    if (iOS && !standalone) {
      setTimeout(() => setShowPrompt(true), 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_install_dismissed', Date.now().toString());
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
      <div 
        className="rounded-2xl p-4 shadow-2xl"
        style={{ backgroundColor: themeColor }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg">{appName}</h3>
            <p className="text-white/80 text-sm mt-1">{appDescription}</p>
          </div>
          <button
            onClick={handleDismiss}
            className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {isIOS ? (
          <div className="mt-4 bg-white/10 rounded-xl p-3">
            <p className="text-white/90 text-sm">
              To install: tap <span className="font-bold">Share</span> then <span className="font-bold">"Add to Home Screen"</span>
            </p>
          </div>
        ) : (
          <button
            onClick={handleInstall}
            className="mt-4 w-full bg-white text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-98"
          >
            <Download className="w-5 h-5" />
            Install App
          </button>
        )}
      </div>
    </div>
  );
}

export { InstallPrompt };
export default InstallPrompt;
