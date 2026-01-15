'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col [--header-h:72px]">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      
      {/* Fixed header on all pages */}
      <header 
        className="fixed inset-x-0 top-0 h-[var(--header-h)] shadow-sm" 
        role="banner"
        style={{ 
          backgroundColor: '#ffffff',
          zIndex: 99999,
          opacity: 1,
          visibility: 'visible',
          display: 'block'
        }}
      >
        <SiteHeader />
      </header>

      <main
        id="main-content"
        className="flex-1 pt-[var(--header-h)]"
        role="main"
        tabIndex={-1}
      >
        <Breadcrumbs />
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
