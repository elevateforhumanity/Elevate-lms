'use client';

import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

export function SupersonicHeader() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+13173143757" className="flex items-center gap-2 hover:text-blue-200">
                <Phone className="w-4 h-4" />
                (317) 314-3757
              </a>
              <a href="mailto:Supersonicfadtcashllc@gmail.com" className="flex items-center gap-2 hover:text-blue-200">
                <Mail className="w-4 h-4" />
                Supersonicfadtcashllc@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-blue-200">Facebook</a>
              <a href="#" className="hover:text-blue-200">YouTube</a>
              <a href="#" className="hover:text-blue-200">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/supersonic-fast-cash" className="flex items-center">
              <div className="text-2xl font-bold text-blue-900">
                Supersonic Fast Cash
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/supersonic-fast-cash" className="text-gray-700 hover:text-blue-600 font-semibold">
                Home
              </Link>
              <Link href="/supersonic-fast-cash/services" className="text-gray-700 hover:text-blue-600 font-semibold">
                Services
              </Link>
              <Link href="/supersonic-fast-cash/tax-information" className="text-gray-700 hover:text-blue-600 font-semibold">
                Tax Information
              </Link>
              <Link href="/supersonic-fast-cash/tax-tools" className="text-gray-700 hover:text-blue-600 font-semibold">
                Tax Tools
              </Link>
              <Link href="/supersonic-fast-cash/contact" className="text-gray-700 hover:text-blue-600 font-semibold">
                Contact
              </Link>
              <Link
                href="/supersonic-fast-cash/apply"
                className="px-6 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition-colors"
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
