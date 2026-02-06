'use client';

// Client-only widgets that don't block page rendering
// These load after user interaction or idle time

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Lazy load chat widget - doesn't block initial render
const FloatingChatWidget = dynamic(
  () => import('@/components/FloatingChatWidget'),
  { ssr: false, loading: () => null }
);

// Lazy load funding toast - shows WIOA/free tuition info
const FundingToast = dynamic(
  () => import('@/components/ui/FundingToast'),
  { ssr: false, loading: () => null }
);

// Lazy load sticky mobile CTA - shows on program pages
const StickyMobileCTA = dynamic(
  () => import('@/components/programs/StickyMobileCTA').then(mod => ({ default: mod.StickyMobileCTA })),
  { ssr: false, loading: () => null }
);

// Avatar is now added to each page individually via PageAvatar component
// This ensures proper positioning under hero banners

export default function ClientWidgets() {
  const [showChat, setShowChat] = useState(false);
  const [showFundingToast, setShowFundingToast] = useState(false);
  const pathname = usePathname();

  // Show sticky CTA on program pages, apply page, and inquiry page
  const showStickyCTA = pathname?.startsWith('/programs/') || 
                        pathname === '/apply' || 
                        pathname === '/inquiry' ||
                        pathname?.startsWith('/forms/');

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

    // Show funding toast after short delay (handled internally by component)
    setShowFundingToast(true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* Funding Toast - WIOA/free tuition notification */}
      {showFundingToast && <FundingToast />}
      
      {/* Sticky Mobile CTA - Apply/Contact buttons on program pages */}
      {showStickyCTA && <StickyMobileCTA />}
      
      {/* AI Chat Widget - deferred load for performance */}
      {showChat && <FloatingChatWidget />}
    </>
  );
}
