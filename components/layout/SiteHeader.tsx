'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

// Main navigation - clean top-level links only (subpages live on landing pages)
const NAV_ITEMS = [
  { name: 'Programs', href: '/programs' },
  { name: 'Apprenticeships', href: '/apprenticeships' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Services', href: '/career-services' },
  { name: 'VITA Tax Prep', href: '/vita' },
  { name: 'Store', href: '/store' },
  { name: 'For Employers', href: '/employer' },
  { name: 'About', href: '/about' },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
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
  const user = useSafeUser();

  return (
    <>
      <header 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '80px', 
          backgroundColor: '#ffffff', 
          zIndex: 9999,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px'
        }}
      >
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 16px'
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <Image
              src="/logo.png"
              alt="Elevate for Humanity"
              width={44}
              height={44}
              style={{ width: '44px', height: '44px' }}
              priority
            />
            <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#111827' }}>
              Elevate
            </span>
          </Link>

          {/* Right side - same on all screen sizes */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Apply Now button */}
            <Link
              href="/apply"
              style={{ 
                backgroundColor: '#2563eb', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '9999px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Apply Now
            </Link>

            {/* Menu button - always visible */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '44px', 
                height: '44px',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              aria-label="Open menu"
            >
              <Menu style={{ width: '24px', height: '24px', color: '#111827' }} />
            </button>
          </div>
        </div>
      </header>

      {/* Menu - shows on all screen sizes */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100]">
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
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-base font-semibold text-gray-900 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                    >
                      {item.name}
                    </Link>
                    {/* Sub-items */}
                    {item.subItems && (
                      <ul className="ml-4 mt-1 space-y-1">
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
