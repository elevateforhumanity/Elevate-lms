'use client';

// Client-only widgets that don't block page rendering
// These load after the page is visible

import dynamic from 'next/dynamic';

// Lazy load chat widget - doesn't block initial render
const FloatingChatWidget = dynamic(
  () => import('@/components/FloatingChatWidget'),
  { ssr: false }
);

// Avatar is now added to each page individually via PageAvatar component
// This ensures proper positioning under hero banners

export default function ClientWidgets() {
  return (
    <>
      {/* AI Chat Widget - bottom right */}
      <FloatingChatWidget />
    </>
  );
}
