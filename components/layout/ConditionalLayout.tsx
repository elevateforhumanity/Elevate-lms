'use client';

import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import dynamic from 'next/dynamic';
import AvatarChatBar from '@/components/AvatarChatBar';

// Lazy load chat widget to avoid blocking initial render
const LiveChatWidget = dynamic(
  () => import('@/components/support/LiveChatWidget').then(mod => ({ default: mod.ConditionalLiveChatWidget })),
  { ssr: false }
);

/**
 * ConditionalLayout - Main layout wrapper
 * 
 * IMPORTANT: DO NOT MODIFY THE HEADER
 * The SiteHeader component is locked and working correctly.
 * Any changes to navigation should be made carefully in SiteHeader.tsx
 * A backup exists at SiteHeader.backup.tsx
 */
export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1 pt-[56px] sm:pt-[70px]" role="main">
        {children}
      </main>
      <AvatarChatBar />
      <SiteFooter />
      <LiveChatWidget />
    </div>
  );
}
