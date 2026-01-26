'use client';

// Client-only widgets that don't block page rendering
// These load after the page is visible

import dynamic from 'next/dynamic';

// Lazy load non-critical client components
const AvatarChatBar = dynamic(() => import('@/components/AvatarChatBar'), {
  ssr: false,
});

const LiveChatWidget = dynamic(() => import('@/components/LiveChatWidget'), {
  ssr: false,
});

export default function ClientWidgets() {
  return (
    <>
      <AvatarChatBar />
      {/* <LiveChatWidget /> */}
    </>
  );
}
