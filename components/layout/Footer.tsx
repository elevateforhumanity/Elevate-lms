'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">Elevate for Humanity</h3>
            <p className="text-gray-400 text-sm mb-4">
              Free career training programs with job placement support for underserved communities.
            </p>
            <div className="flex gap-4">
              <a href="tel:317-314-3757" className="text-gray-400 hover:text-white text-sm">(317) 314-3757</a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/programs" className="hover:text-white">All Programs</Link></li>
              <li><Link href="/apprenticeships" className="hover:text-white">Apprenticeships</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/resources" className="hover:text-white">Resource Library</Link></li>
              <li><Link href="/employers" className="hover:text-white">For Employers</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/directory" className="hover:text-white">Partner Directory</Link></li>
              <li><Link href="/philanthropy" className="hover:text-white">Support Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>© {new Date().getFullYear()} Elevate for Humanity. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/governance" className="hover:text-white">Governance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
