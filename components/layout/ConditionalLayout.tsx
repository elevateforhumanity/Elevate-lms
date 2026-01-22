'use client';

import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

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
      <SiteFooter />
    </div>
  );
}
