'use client';

import SiteHeader from './SiteHeader';

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
      <main className="flex-1 pt-[56px] sm:pt-[70px]">
        {children}
      </main>
    </div>
  );
}
