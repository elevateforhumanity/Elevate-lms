'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { getNavigation } from '@/config/navigation-clean';
import { useUser } from '@/hooks/useUser';
import { DesktopNav } from '@/components/header/DesktopNav';
import { MobileMenu } from '@/components/header/MobileMenu';
import { UserMenu } from '@/components/header/UserMenu';
import { SearchButton } from '@/components/header/SearchButton';
import { SocialLinks } from '@/components/header/SocialLinks';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoading } = useUser();
  const navigation = getNavigation();

  return (
    <div className="w-full h-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Elevate for Humanity"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className="hidden sm:inline font-bold text-black text-lg">
              Elevate for Humanity
            </span>
          </Link>

          <DesktopNav items={navigation.main} />

          <div className="flex items-center gap-4">
            <SearchButton />
            <SocialLinks />
            <UserMenu user={user} isLoading={isLoading} />

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-black hover:text-blue-600 transition"
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
        items={navigation.main}
      />
    </div>
  );
}
