'use client';

// Client-only widgets that don't block page rendering
// These load after user interaction or idle time

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Lazy load chat widget - doesn't block initial render
const FloatingChatWidget = dynamic(
  () => import('@/components/FloatingChatWidget'),
  { ssr: false, loading: () => null }
);

// Avatar is now added to each page individually via PageAvatar component
// This ensures proper positioning under hero banners

export default function ClientWidgets() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Defer chat widget loading:
    // 1. After 6 seconds idle, OR
    // 2. On first scroll, OR
    // 3. On user interaction

    let loaded = false;
    const loadChat = () => {
      if (!loaded) {
        loaded = true;
        setShowChat(true);
      }
    };

    // Load after 6 seconds
    const timer = setTimeout(loadChat, 6000);

    // Load on scroll
    const handleScroll = () => loadChat();
    window.addEventListener('scroll', handleScroll, { once: true, passive: true });

    // Load on any click
    const handleClick = () => loadChat();
    window.addEventListener('click', handleClick, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* AI Chat Widget - deferred load for performance */}
      {showChat && <FloatingChatWidget />}
    </>
  );
}
