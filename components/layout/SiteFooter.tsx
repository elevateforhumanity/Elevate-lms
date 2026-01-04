import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t-4 border-orange-600 relative z-10 mt-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        {/* Logo, Tagline, and Social */}
        <div className="mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="font-black text-white text-2xl tracking-tight">
              Elevate for Humanity
            </div>
          </Link>
          <p className="text-gray-400 text-sm max-w-md mb-6">
            100% free career training in healthcare, skilled trades, and
            technology. Get trained, get hired, get paid.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/company/elevate-for-humanity"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
              aria-label="Follow us on LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@elevateforhumanity"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
              aria-label="Subscribe on YouTube"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61571046346179"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
              aria-label="Follow us on Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Legal Links and Copyright */}
        <div className="pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
              <Link
                href="/privacy-policy"
                className="hover:text-gray-300 transition"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-gray-300 transition"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="hover:text-gray-300 transition"
              >
                Accessibility
              </Link>
              <Link href="/careers" className="hover:text-gray-300 transition">
                Careers
              </Link>
              <Link
                href="/sitemap-page"
                className="hover:text-gray-300 transition"
              >
                Site Map
              </Link>
              <Link href="/contact" className="hover:text-gray-300 transition">
                Contact
              </Link>
              <Link href="/admin" className="hover:text-gray-300 transition">
                Admin
              </Link>
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Elevate For Humanity. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
