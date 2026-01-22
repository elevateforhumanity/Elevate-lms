'use client';

/**
 * ============================================================================
 * LOCKED COMPONENT - DO NOT MODIFY WITHOUT CAREFUL TESTING
 * ============================================================================
 * 
 * This header is working correctly on all screen sizes (mobile, tablet, laptop, desktop).
 * 
 * RULES:
 * 1. DO NOT add "hidden" classes to the nav element
 * 2. DO NOT change breakpoints (sm, md, lg, xl) without testing all devices
 * 3. Keep NAV_ITEMS to 5 or fewer items to prevent overflow
 * 4. Test on laptop (1024px-1366px) after ANY changes
 * 
 * Backup: SiteHeader.backup.tsx
 * Last working commit: 9867f917
 * ============================================================================
 */

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { NotificationBell } from '@/components/notifications/NotificationBell';

// Main navigation - focused on workforce training mission
const NAV_ITEMS = [
  { 
    name: 'Programs', 
    href: '/programs',
    subItems: [
      { name: 'Healthcare', href: '/programs/healthcare' },
      { name: 'Skilled Trades', href: '/programs/skilled-trades' },
      { name: 'Technology', href: '/programs/technology' },
      { name: 'CDL & Transportation', href: '/programs/cdl-transportation' },
      { name: 'Tax Preparation', href: '/programs/tax-preparation' },
      { name: 'Barber Apprenticeship', href: '/programs/barber-apprenticeship' },
      { name: 'All Courses', href: '/courses' },
    ]
  },
  { 
    name: 'How It Works', 
    href: '/how-it-works',
    subItems: [
      { name: 'WIOA Eligibility', href: '/wioa-eligibility' },
      { name: 'Funding Options', href: '/funding' },
      { name: 'Financial Aid', href: '/financial-aid' },
      { name: 'Career Services', href: '/career-services' },
      { name: 'FAQ', href: '/faq' },
    ]
  },
  { 
    name: 'Portals', 
    href: '/dashboards',
    subItems: [
      { name: 'Student Portal', href: '/student-portal' },
      { name: 'LMS Dashboard', href: '/lms' },
      { name: 'Employer Portal', href: '/employer-portal' },
      { name: 'Partner Portal', href: '/partner' },
      { name: 'Staff Portal', href: '/staff-portal' },
      { name: 'Hire Graduates', href: '/hire-graduates' },
      { name: 'Partner With Us', href: '/partners' },
    ]
  },
  { 
    name: 'Services', 
    href: '/services',
    subItems: [
      { name: 'Free Tax Help (VITA)', href: '/vita' },
      { name: 'Supersonic Fast Cash', href: '/supersonic-fast-cash' },
      { name: 'Career Services', href: '/career-services' },
      { name: 'Store', href: '/store' },
    ]
  },
  { 
    name: 'About', 
    href: '/about',
    subItems: [
      { name: 'Our Mission', href: '/about/mission' },
      { name: 'Our Team', href: '/about/team' },
      { name: 'Join Our Team', href: '/careers' },
      { name: 'Success Stories', href: '/success-stories' },
      { name: 'Locations', href: '/locations' },
      { name: 'Contact', href: '/contact' },
    ]
  },
];

// Safe user hook that never throws
function useSafeUser() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  
  useEffect(() => {
    // Only fetch if we're in browser
    if (typeof window === 'undefined') return;
    
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, []);
  
  return user;
}

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const user = useSafeUser();

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 h-[56px] sm:h-[70px] transition-all duration-300 bg-white shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={44}
                height={44}
                className="w-10 h-10 sm:w-11 sm:h-11"
                priority
              />
              <span className="hidden sm:inline font-bold text-xl text-gray-900">
                Elevate
              </span>
            </Link>

            {/* Desktop Navigation - hidden on mobile/tablet */}
            <nav className="hidden md:flex items-center h-full" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="relative h-full group">
                  <Link
                    href={item.href}
                    className={`relative h-full flex items-center gap-1 px-3 lg:px-4 text-sm font-medium transition-colors
                      before:absolute before:bottom-0 before:left-2 before:right-2 before:h-[3px] before:bg-blue-600 
                      before:opacity-0 before:transition-opacity group-hover:before:opacity-100
                      text-gray-700 hover:text-gray-900
                    `}
                    aria-haspopup={item.subItems ? "true" : undefined}
                  >
                    {item.name}
                    {item.subItems && <ChevronDown className="w-3 h-3" aria-hidden="true" />}
                  </Link>
                  {/* Dropdown */}
                  {item.subItems && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" role="menu">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[200px]">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                            role="menuitem"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Switcher */}
              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>
              
              {/* Phone number - desktop only */}
              <a
                href="tel:317-314-3757"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                (317) 314-3757
              </a>
              {user ? (
                <>
                  <div className="hidden md:block">
                    <NotificationBell />
                  </div>
                  <Link
                    href="/lms/dashboard"
                    className="hidden md:inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
              )}
              <Link
                href="/apply"
                className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </Link>

              {/* Mobile menu button - show on smaller screens (below lg/1024px) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden flex items-center justify-center w-10 h-10 text-gray-900 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - shows on screens below lg (1024px) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Image src="/logo.png" alt="Elevate" width={32} height={32} className="w-8 h-8" />
                <span className="text-gray-900 font-bold">Elevate</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-10 h-10 text-gray-700"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.name}>
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => setExpandedSection(expandedSection === item.name ? null : item.name)}
                          className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-gray-900 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === item.name ? 'rotate-180' : ''}`} />
                        </button>
                        {/* Collapsible Sub-items */}
                        {expandedSection === item.name && (
                          <ul className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-2">
                            <li>
                              <Link
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:bg-slate-50 rounded-lg"
                              >
                                View All {item.name}
                              </Link>
                            </li>
                            {item.subItems.map((subItem) => (
                              <li key={subItem.name}>
                                <Link
                                  href={subItem.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t space-y-3">
                <Link
                  href={user ? "/lms/dashboard" : "/login"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-gray-700 border border-gray-300 rounded-full"
                >
                  {user ? 'Dashboard' : 'Sign In'}
                </Link>
                <Link
                  href="/apply"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white text-base font-semibold rounded-full hover:bg-blue-700"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
