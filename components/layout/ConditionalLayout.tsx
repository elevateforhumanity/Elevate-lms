'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide main site header/footer for these sections (they have their own navigation)
  const hideHeaderFooter = 
    pathname?.startsWith('/supersonic-fast-cash') ||
    pathname?.startsWith('/lms/') || // LMS app pages have LMSNavigation
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/staff-portal') ||
    pathname?.startsWith('/creator') ||
    pathname?.startsWith('/instructor') ||
    pathname?.startsWith('/employer/dashboard') ||
    pathname?.startsWith('/employer/post-job') ||
    pathname?.startsWith('/program-holder/dashboard') ||
    pathname?.startsWith('/workforce-board/dashboard') ||
    pathname?.startsWith('/mobile/') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/verify-email') ||
    pathname?.startsWith('/admin-login') ||
    pathname?.startsWith('/nonprofit') || // Has custom navigation
    pathname?.startsWith('/rise-foundation') || // Part of nonprofit
    pathname?.startsWith('/tax/rise-up-foundation'); // Has custom layout

  // Show header/footer for public LMS landing page and other exceptions
  const isLMSLanding = pathname === '/lms';

  const shouldShowHeaderFooter = !hideHeaderFooter || isLMSLanding;

  return (
    <div className="min-h-screen flex flex-col [--header-h:72px]">
      {shouldShowHeaderFooter && (
        <header className="fixed inset-x-0 top-0 z-[9999] h-[var(--header-h)]">
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
