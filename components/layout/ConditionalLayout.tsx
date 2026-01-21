'use client';

import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-[56px] sm:pt-[70px]">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
