'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col [--header-h:72px]">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      
      {/* Fixed header on all pages except homepage */}
      {!isHomePage && (
        <header className="fixed inset-x-0 top-0 z-[99999] h-[var(--header-h)] bg-white shadow-sm" role="banner">
          <SiteHeader />
        </header>
      )}

      <main
        id="main-content"
        className={`flex-1 ${!isHomePage ? 'pt-[var(--header-h)]' : ''}`}
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
