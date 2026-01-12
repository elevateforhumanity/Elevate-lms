'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

interface DesktopNavProps {
  items: NavItem[];
}

export function DesktopNav({ items }: DesktopNavProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent, name: string, hasChildren: boolean) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (hasChildren) {
        setOpenDropdown(openDropdown === name ? null : name);
      }
    }
    if (e.key === 'Escape') {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
      {items.map((item) => {
        const isOpen = openDropdown === item.name;
        const isActive = pathname === item.href;

        if (item.children) {
          return (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                onKeyDown={(e) => handleKeyDown(e, item.name, true)}
                className="flex items-center gap-1 text-black hover:text-blue-600 font-medium transition"
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls={`dropdown-${item.name}`}
              >
                {item.name}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div
                  id={`dropdown-${item.name}`}
                  className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  role="menu"
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-100 transition"
                      role="menuitem"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`text-black hover:text-blue-600 font-medium transition ${
              isActive ? 'text-blue-600' : ''
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
