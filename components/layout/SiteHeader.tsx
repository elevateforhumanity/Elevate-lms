'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { Menu } from 'lucide-react';
import { getNavigation } from '@/config/navigation-clean';
import { useUser } from '@/hooks/useUser';
import { DesktopNav } from '@/components/header/DesktopNav';
import { MobileMenu } from '@/components/header/MobileMenu';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoading } = useUser();
  const navigation = getNavigation();

  const navItems = useMemo(() => navigation.main, [navigation]);

  return (
    <div 
      className="w-full h-full border-b border-gray-200" 
      style={{ 
        backgroundColor: '#ffffff',
        opacity: 1,
        visibility: 'visible',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full w-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo - using optimized smaller version */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Elevate for Humanity"
              width={40}
              height={40}
              className="w-9 h-9 md:w-10 md:h-10"
              priority
            />
            <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '1.125rem' }}>
              Elevate for Humanity
            </span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav items={navItems} />

          {/* Right side: CTAs and mobile menu */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Apply Now - always visible */}
            <Link
              href="/apply"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Apply Now
            </Link>

            {/* Login/Dashboard */}
            {user ? (
              <Link
                href="/lms/dashboard"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                style={{ color: '#000000' }}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
                style={{ color: '#000000' }}
              >
                Login
              </Link>
            )}

            {/* Mobile menu button - visible on mobile/small tablets */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 hover:text-blue-600 transition"
              style={{ color: '#000000' }}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navItems}
        user={user}
      />
    </div>
  );
}
