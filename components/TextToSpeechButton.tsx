"use client";

import React from 'react';

import { useEffect, useState } from "react";

type Props = {
  text: string;
  label?: string;
};

export function TextToSpeechButton({ text, label = "Listen to this section" }: Props) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
    }
  }, []);

  function handleClick() {
    if (!isSupported) return;

    const synth = window.speechSynthesis;

    // stop any existing speech
    if (synth.speaking || isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // speed
    utterance.pitch = 1; // tone

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
  }

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-black shadow-sm hover:bg-slate-50 transition-colors"
    >
      <span aria-hidden="true">{isSpeaking ? "⏹️" : "▶️"}</span>
      <span>{isSpeaking ? "Stop audio" : label}</span>
    </button>
  );
}
