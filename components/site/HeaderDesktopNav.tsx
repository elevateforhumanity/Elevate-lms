// Server Component - NO 'use client'
// Static desktop navigation links

import Link from 'next/link';

interface NavItem {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
}

interface HeaderDesktopNavProps {
  items: NavItem[];
}

export default function HeaderDesktopNav({ items }: HeaderDesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
      {items.map((item) => (
        <div key={item.name} className="relative group">
          <Link
            href={item.href}
            className="text-slate-700 hover:text-blue-600 font-medium text-sm transition-colors py-2"
          >
            {item.name}
          </Link>
          
          {/* Dropdown - CSS-only hover, no JS needed */}
          {item.subItems && item.subItems.length > 0 && (
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-lg shadow-lg border border-slate-200 py-2 min-w-[200px]">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
