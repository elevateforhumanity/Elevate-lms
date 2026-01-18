'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">Elevate for Humanity</h3>
            <p className="text-gray-400 text-sm">
              Free career training programs with job placement support.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/programs" className="hover:text-white">All Programs</Link></li>
              <li><Link href="/programs/barber-apprenticeship" className="hover:text-white">Barber Apprenticeship</Link></li>
              <li><Link href="/apprenticeships" className="hover:text-white">Apprenticeships</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/employers" className="hover:text-white">For Employers</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="tel:317-314-3757" className="hover:text-white">(317) 314-3757</a></li>
              <li><a href="mailto:info@elevateforhumanity.org" className="hover:text-white">info@elevateforhumanity.org</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Elevate for Humanity. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
