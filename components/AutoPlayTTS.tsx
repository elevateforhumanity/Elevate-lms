'use client';

import { useEffect, useState } from 'react';

interface AutoPlayTTSProps {
  text: string;
  delay?: number;
}

export default function AutoPlayTTS({ text, delay = 1500 }: AutoPlayTTSProps) {
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (hasPlayed || !text || typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) return;

    const timer = setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Try to find a good English voice
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => 
        v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Microsoft'))
      ) || voices.find(v => v.lang.startsWith('en'));
      
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onend = () => setHasPlayed(true);
      
      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        // Autoplay blocked
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, hasPlayed]);

  return null;
}
