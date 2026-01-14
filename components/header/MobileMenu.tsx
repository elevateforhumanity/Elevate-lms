'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  user?: any;
}

export function MobileMenu({ isOpen, onClose, items, user }: MobileMenuProps) {
  const pathname = usePathname();
  const menuRef = useFocusTrap(isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-[100000]"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="lg:hidden fixed right-0 top-0 bottom-0 w-80 max-w-full bg-white z-[100001] overflow-y-auto shadow-2xl focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            tabIndex={-1}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 id="mobile-menu-title" className="text-lg font-bold text-black">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 text-black hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Primary CTAs at top */}
            <div className="p-4 border-b border-gray-200 space-y-3">
              <Link
                href="/apply"
                onClick={onClose}
                className="block w-full text-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Apply Now
              </Link>
              {user ? (
                <Link
                  href="/lms/dashboard"
                  onClick={onClose}
                  className="block w-full text-center px-4 py-3 border border-gray-300 text-black font-medium rounded-lg hover:bg-gray-50 transition"
                >
                  My Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={onClose}
                  className="block w-full text-center px-4 py-3 border border-gray-300 text-black font-medium rounded-lg hover:bg-gray-50 transition"
                >
                  Login
                </Link>
              )}
            </div>

            <nav className="px-4 py-6 space-y-4" aria-labelledby="mobile-menu-title">
              {items.map((item) => {
                const isActive = pathname === item.href;

                if (item.children) {
                  return (
                    <div key={item.name} className="space-y-2">
                      <div className="font-bold text-black text-lg" role="heading" aria-level={3}>
                        {item.name}
                      </div>
                      {item.children.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={onClose}
                            className={`block pl-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded ${
                              childActive ? 'text-blue-600 font-semibold' : 'text-black hover:text-blue-600'
                            }`}
                            aria-current={childActive ? 'page' : undefined}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`block py-2 text-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded ${
                      isActive ? 'text-blue-600' : 'text-black hover:text-blue-600'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
