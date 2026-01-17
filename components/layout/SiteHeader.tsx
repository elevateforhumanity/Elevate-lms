'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// Hardcoded nav items - no external dependencies that could fail
const NAV_ITEMS = [
  { name: 'Programs', href: '/programs' },
  { name: 'For Employers', href: '/employer' },
  { name: 'About', href: '/about' },
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const user = useSafeUser();

  // Track mount state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track scroll for transparent → solid header
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Server-side render with solid header to avoid flash
  const headerBg = !mounted ? 'bg-white shadow-sm' : (isScrolled ? 'bg-white shadow-sm' : 'bg-transparent');
  const textColor = !mounted ? 'text-gray-700' : (isScrolled ? 'text-gray-700' : 'text-white');

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 h-[56px] sm:h-[70px] transition-all duration-300 ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={36}
                height={36}
                className="w-8 h-8 sm:w-9 sm:h-9"
                priority
              />
              <span className={`hidden sm:inline font-bold text-lg transition-colors ${
                !mounted || isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Elevate
              </span>
            </Link>

            {/* Desktop Navigation - show on sm (640px) and up */}
            <nav className="hidden sm:flex items-center h-full">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative h-full flex items-center px-3 sm:px-4 lg:px-6 text-sm font-medium transition-colors
                    before:absolute before:bottom-0 before:left-2 before:right-2 before:h-[3px] before:bg-blue-600 
                    before:opacity-0 before:transition-opacity hover:before:opacity-100
                    ${!mounted || isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'}
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Phone number - desktop only */}
              <a
                href="tel:317-314-3757"
                className={`hidden lg:inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                  !mounted || isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                (317) 314-3757
              </a>
              {user ? (
                <Link
                  href="/lms/dashboard"
                  className={`hidden sm:inline-flex items-center text-sm font-medium transition-colors ${
                    !mounted || isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className={`hidden sm:inline-flex items-center text-sm font-medium transition-colors ${
                    !mounted || isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  Sign In
                </Link>
              )}
              <Link
                href="/apply"
                className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                  !mounted || isScrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                Apply Now
              </Link>

              {/* Mobile menu button - only show on xs screens */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`sm:hidden flex items-center justify-center w-10 h-10 transition-colors ${textColor}`}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] sm:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
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
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                    >
                      {item.name}
                    </Link>
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
