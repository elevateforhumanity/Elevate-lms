'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Never hide header/footer - all pages should be discoverable
  const hideHeaderFooter = false;

  // Show header/footer for public LMS landing page and other exceptions
  const isLMSLanding = pathname === '/lms';

  const shouldShowHeaderFooter = !hideHeaderFooter || isLMSLanding;

  return (
    <div className="min-h-screen flex flex-col [--header-h:72px]">
      {shouldShowHeaderFooter && (
        <header className="fixed inset-x-0 top-0 z-[99999] h-[var(--header-h)]">
          <SiteHeader />
        </header>
      )}

      <main
        id="main-content"
        className={
          shouldShowHeaderFooter ? 'pt-[var(--header-h)] flex-1' : 'flex-1'
        }
      >
        {shouldShowHeaderFooter && <Breadcrumbs />}
        {children}
      </main>

      {shouldShowHeaderFooter && <SiteFooter />}
    </div>
  );
}
