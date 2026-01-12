'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

interface UniversalNavProps {
  links: NavLink[];
  ctaText?: string;
  ctaHref?: string;
  bgColor?: string;
  textColor?: string;
  logo?: string;
  logoHref?: string;
}

export default function UniversalNav({
  links,
  ctaText,
  ctaHref,
  bgColor = 'bg-gray-900',
  textColor = 'text-white',
  logo = 'Logo',
  logoHref = '/',
}: UniversalNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`${bgColor} ${textColor} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={logoHref} className="font-bold text-xl">
            {logo}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:opacity-80 transition-opacity text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}

            {ctaText && ctaHref && (
              <Link
                href={ctaHref}
                className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                {ctaText}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:opacity-80 transition-opacity text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {ctaText && ctaHref && (
                <Link
                  href={ctaHref}
                  className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {ctaText}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
