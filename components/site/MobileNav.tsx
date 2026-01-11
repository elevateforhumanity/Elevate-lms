"use client";

import React from 'react';

import { useEffect } from 'react';
import Link from 'next/link';

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Lock body scroll only when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [open]);

  // Don't mount anything unless open (prevents phantom X / overlays)
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        aria-label="Close menu backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-soft">
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
          <span className="font-semibold">Menu</span>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-xl px-3 py-2 hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

        <nav role="navigation" aria-label="Main navigation" className="p-4 space-y-2">
          <Link
            onClick={onClose}
            className="block rounded-xl px-3 py-3 hover:bg-slate-50"
            href="/programs"
          >
            Programs
          </Link>
          <Link
            onClick={onClose}
            className="block rounded-xl px-3 py-3 hover:bg-slate-50"
            href="/apply"
          >
            Apply
          </Link>
          <Link
            onClick={onClose}
            className="block rounded-xl px-3 py-3 hover:bg-slate-50"
            href="/contact"
          >
            Contact
          </Link>

          {/* Partners Section */}
          <div className="px-3 py-2">
            <div className="text-sm font-semibold text-slate-500 mb-2">
              Partners
            </div>
            <Link
              onClick={onClose}
              className="block py-2 text-black hover:text-blue-600"
              href="/employers"
            >
              For Employers
            </Link>
            <Link
              onClick={onClose}
              className="block py-2 text-black hover:text-blue-600"
              href="/providers"
            >
              For Providers
            </Link>
            <Link
              onClick={onClose}
              className="block py-2 text-black hover:text-blue-600"
              href="/workforce-boards"
            >
              For Workforce Boards
            </Link>
          </div>

          <Link
            onClick={onClose}
            className="block rounded-xl px-3 py-3 hover:bg-slate-50"
            href="/login"
          >
            Login
          </Link>
          <Link
            onClick={onClose}
            className="block mx-3 px-4 py-3 bg-brand-500 text-white text-center rounded-xl font-semibold"
            href="/apply"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </div>
  );
}
