'use client';

import { useEffect, useRef, useState } from 'react';

interface AutoPlayTTSProps {
  text: string;
  voice?: string;
  delay?: number; // Delay before playing in ms
  onStart?: () => void;
  onEnd?: () => void;
}

export default function AutoPlayTTS({ 
  text, 
  voice = 'en-US-JennyNeural',
  delay = 1000,
  onStart,
  onEnd 
}: AutoPlayTTSProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Fetch and cache audio on mount
  useEffect(() => {
    if (hasPlayed || !text) return;

    const fetchAudio = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voice }),
        });

        if (!response.ok) {
          throw new Error('TTS fetch failed');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } catch (error) {
        console.error('TTS error:', error);
        // Fallback to Web Speech API
        fallbackToWebSpeech();
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudio();

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [text, voice, hasPlayed]);

  // Auto-play when audio is ready
  useEffect(() => {
    if (!audioUrl || hasPlayed) return;

    const timer = setTimeout(() => {
      playAudio();
    }, delay);

    return () => clearTimeout(timer);
  }, [audioUrl, delay, hasPlayed]);

  const playAudio = async () => {
    if (!audioUrl || hasPlayed) return;

    try {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onplay = () => {
        onStart?.();
      };
      
      audio.onended = () => {
        setHasPlayed(true);
        onEnd?.();
      };

      audio.onerror = () => {
        console.error('Audio playback error');
        fallbackToWebSpeech();
      };

      // Try to play - may be blocked by browser autoplay policy
      await audio.play();
    } catch (error) {
      console.log('Autoplay blocked, using interaction trigger');
      // Set up one-time click listener to play
      setupInteractionTrigger();
    }
  };

  const fallbackToWebSpeech = () => {
    if (hasPlayed || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    
    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) 
      || voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => onStart?.();
    utterance.onend = () => {
      setHasPlayed(true);
      onEnd?.();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      console.log('Web Speech also blocked');
    }
  };

  const setupInteractionTrigger = () => {
    const handleInteraction = () => {
      if (audioRef.current && !hasPlayed) {
        audioRef.current.play().catch(() => {});
      } else if (audioUrl && !hasPlayed) {
        playAudio();
      }
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
  };

  // Hidden component - no UI
  return null;
}
