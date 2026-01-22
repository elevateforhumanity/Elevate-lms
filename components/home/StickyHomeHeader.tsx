'use client';

import SiteHeader from '@/components/layout/SiteHeader';

export function StickyHomeHeader() {
  return (
    <header 
      className="sticky top-0 z-[99999] h-[72px] bg-white shadow-sm" 
      role="banner"
      style={{ backgroundColor: '#ffffff' }}
    >
      <SiteHeader />
    </header>
  );
}
