'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { getNavigation } from '@/config/navigation-clean';
import { useUser } from '@/hooks/useUser';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const navigation = getNavigation();
  const navItems = useMemo(() => navigation.main, [navigation]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 min-h-[44px]">
              <Image
                src="/logo.png"
                alt="Elevate for Humanity"
                width={36}
                height={36}
                className="w-8 h-8 sm:w-9 sm:h-9"
                priority
              />
              <span className="hidden sm:inline text-gray-900 font-bold text-base sm:text-lg">
                Elevate
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-4">
              {user ? (
                <Link
                  href="/lms/dashboard"
                  className="hidden sm:inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors min-h-[44px]"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors min-h-[44px]"
                >
                  Sign In
                </Link>
              )}
              <Link
                href="/apply"
                className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors min-h-[44px]"
              >
                Apply Now
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-gray-700 hover:text-blue-600 transition-colors"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="Elevate for Humanity"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-gray-900 font-bold">Elevate</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-11 h-11 -mr-2 text-gray-700 hover:text-blue-600"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors min-h-[48px]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t space-y-3">
                {user ? (
                  <Link
                    href="/lms/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 border border-gray-300 rounded-lg transition-colors min-h-[48px]"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 border border-gray-300 rounded-lg transition-colors min-h-[48px]"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  href="/apply"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors min-h-[48px]"
                >
                  Apply Now
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
