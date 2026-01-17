'use client';

import { useEffect, useState, useCallback } from 'react';

interface AutoPlayTTSProps {
  text: string;
  voice?: string;
  delay?: number;
}

// Detect iOS/iPadOS
const isIOS = () => {
  if (typeof window === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

export default function AutoPlayTTS({ text, delay = 1500 }: AutoPlayTTSProps) {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const playTTS = useCallback(() => {
    if (!text || typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Samantha'))
    ) || voices.find(v => v.lang.startsWith('en'));
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      setHasPlayed(true);
      setShowPlayButton(false);
    };
    
    utterance.onstart = () => {
      setHasPlayed(true);
      setShowPlayButton(false);
    };
    
    window.speechSynthesis.speak(utterance);
  }, [text]);

  useEffect(() => {
    if (hasPlayed || !text || typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) return;

    // Load voices (needed for some browsers)
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    const isiOSDevice = isIOS();

    // On iOS/iPad, we need user interaction - show play button immediately
    if (isiOSDevice) {
      // Try to play on first user interaction
      const handleInteraction = () => {
        if (!hasPlayed) {
          playTTS();
        }
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('click', handleInteraction);
      };

      document.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
      document.addEventListener('click', handleInteraction, { once: true });

      // Show play button after delay if not played
      const buttonTimer = setTimeout(() => {
        if (!hasPlayed) {
          setShowPlayButton(true);
        }
      }, delay);

      return () => {
        clearTimeout(buttonTimer);
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('click', handleInteraction);
      };
    }

    // On desktop/laptop - autoplay works
    const timer = setTimeout(() => {
      playTTS();
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, hasPlayed, playTTS]);

  // Show a small play button only on iOS if autoplay was blocked
  if (showPlayButton && !hasPlayed) {
    return (
      <button
        onClick={playTTS}
        className="fixed bottom-24 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all animate-pulse"
        aria-label="Play welcome message"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
    );
  }

  return null;
}
