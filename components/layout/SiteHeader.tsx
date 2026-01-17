'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { getNavigation } from '@/config/navigation-clean';
import { useUser } from '@/hooks/useUser';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();
  const navigation = getNavigation();
  const navItems = useMemo(() => navigation.main, [navigation]);

  // Track scroll for transparent → solid header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header - Transparent on hero, solid on scroll */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 h-[56px] sm:h-[70px] transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-sm' 
            : 'bg-transparent'
        }`}
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
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Elevate
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center h-full">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative h-full flex items-center px-4 lg:px-6 text-sm font-medium transition-colors
                    before:absolute before:bottom-0 before:left-2 before:right-2 before:h-[3px] before:bg-blue-600 
                    before:opacity-0 before:transition-opacity hover:before:opacity-100
                    ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'}
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3 sm:gap-4">
              {user ? (
                <Link
                  href="/lms/dashboard"
                  className={`hidden sm:inline-flex items-center text-sm font-medium transition-colors ${
                    isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className={`hidden sm:inline-flex items-center text-sm font-medium transition-colors ${
                    isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  Sign In
                </Link>
              )}
              <Link
                href="/apply"
                className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                  isScrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                Apply Now
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`md:hidden flex items-center justify-center w-10 h-10 transition-colors ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full screen overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <nav className="absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl">
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
                className="flex items-center justify-center w-10 h-10 text-gray-700"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
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
                    className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-gray-700 border border-gray-300 rounded-full transition-colors"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 text-base font-medium text-gray-700 border border-gray-300 rounded-full transition-colors"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  href="/apply"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white text-base font-semibold rounded-full hover:bg-blue-700 transition-colors"
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
