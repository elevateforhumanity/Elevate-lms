"use client";

import React from 'react';

import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    // Track 404 errors
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: `404 Error: ${pathname}`,
        fatal: false,
      });
    }

    // Log to console for debugging
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center   ">
      <div className="text-center px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-brand-orange-600 mb-4">404</h1>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 text-2xl md:text-3xl lg:text-4xl">
            Page Not Found
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange-600 text-white rounded-lg hover:bg-brand-orange-700 transition font-semibold"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-semibold"
          >
            <Search className="h-5 w-5" />
            Browse Programs
          </Link>
        </div>

        <div className="text-sm text-slate-500">
          <p className="mb-2">Looking for something specific?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/about" aria-label="Link" className="hover:text-brand-orange-600 transition">About Us</Link>
            <span>•</span>
            <Link href="/contact" aria-label="Link" className="hover:text-brand-orange-600 transition">Contact</Link>
            <span>•</span>
            <Link href="/wioa-eligibility" aria-label="Link" className="hover:text-brand-orange-600 transition">WIOA Eligibility</Link>
            <span>•</span>
            <Link href="/contact" aria-label="Link" className="hover:text-brand-orange-600 transition">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
