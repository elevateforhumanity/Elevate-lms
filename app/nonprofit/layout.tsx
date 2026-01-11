'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function NonprofitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [founderOpen, setFounderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link href="/nonprofit" className="text-xl font-bold text-black">
              Selfish Inc.(dba)Rise Forward Foundation
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link
                href="/nonprofit"
                className="text-black hover:text-purple-600"
              >
                Home
              </Link>
              <Link
                href="/nonprofit/workshops"
                className="text-black hover:text-purple-600"
              >
                Workshops
              </Link>
              <Link
                href="/nonprofit/sign-up"
                className="text-black hover:text-purple-600"
              >
                Sign up for workshops
              </Link>
              <Link
                href="/nonprofit/donations"
                className="text-black hover:text-purple-600"
              >
                Donations
              </Link>
              <Link
                href="/rise-foundation/programs"
                className="text-black hover:text-purple-600"
              >
                Our Programs
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-2">
              <Link
                href="/nonprofit"
                className="block py-2 text-black hover:text-purple-600"
              >
                Home
              </Link>
              <Link
                href="/nonprofit/workshops"
                className="block py-2 text-black hover:text-purple-600"
              >
                Workshops
              </Link>
              <Link
                href="/nonprofit/sign-up"
                className="block py-2 text-black hover:text-purple-600"
              >
                Sign up for workshops
              </Link>
              <Link
                href="/nonprofit/donations"
                className="block py-2 text-black hover:text-purple-600"
              >
                Donations
              </Link>
              <Link
                href="/rise-foundation/programs"
                className="block py-2 text-black hover:text-purple-600"
              >
                Our Programs
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-100 text-center">
        <p className="text-sm text-black">
          Do Not Sell My Personal Information
        </p>
      </footer>
    </div>
  );
}
