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
        role="banner"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '72px',
          backgroundColor: '#ffffff',
          zIndex: 99999,
          opacity: 1,
          visibility: 'visible',
          display: 'block',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        <SiteHeader />
      </header>

      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        style={{ flex: 1, paddingTop: '72px' }}
      >
        <Breadcrumbs />
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
