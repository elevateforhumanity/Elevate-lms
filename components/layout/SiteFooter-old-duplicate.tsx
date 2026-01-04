import Link from 'next/link';

export default function SiteFooter() {
  try {
    return (
      <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
          {/* Logo and Tagline */}
          <div className="mb-8">
            <Link href="/" className="inline-block mb-4">
              <div className="font-black text-white text-2xl tracking-tight">
                Elevate for Humanity
              </div>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              100% free career training in healthcare, skilled trades, and technology. Get trained, get hired, get paid.
            </p>

            <div className="flex gap-3 mt-6">
              <a
                href="https://x.com/elevate4humanity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition text-black touch-manipulation"
                aria-label="Follow us on X (formerly Twitter)"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/elevate-for-humanity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition touch-manipulation"
                aria-label="Follow us on LinkedIn"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61571046346179"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition touch-manipulation"
                aria-label="Follow us on Facebook"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/elevateforhumanity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition touch-manipulation"
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@elevateforhumanity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition touch-manipulation"
                aria-label="Subscribe on YouTube"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
            <div>
              <h3 className="font-semibold text-white text-sm font-bold mb-4">
                For Students
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/apply" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Apply Now
                  </Link>
                </li>
                <li>
                  <Link href="/programs" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Browse Programs
                  </Link>
                </li>
                <li>
                  <Link href="/funding" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Funding Options
                  </Link>
                </li>
                <li>
                  <Link href="/career-services" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Career Services
                  </Link>
                </li>
                <li>
                  <Link href="/mentorship" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Mentorship
                  </Link>
                </li>
                <li>
                  <Link href="/community" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-white text-sm font-bold mb-4">
                Services
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/supersonic-fast-cash" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Supersonic Fast Cash
                  </Link>
                </li>
                <li>
                  <Link href="/vita" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    VITA Tax Prep
                  </Link>
                </li>
                <li>
                  <Link href="/tax-filing" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Tax Filing
                  </Link>
                </li>
                <li>
                  <Link href="/advising" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Advising
                  </Link>
                </li>
                <li>
                  <Link href="/career-fair" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Career Fair
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white text-sm font-bold mb-4">
                Resources
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/blog" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/videos" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Videos
                  </Link>
                </li>
                <li>
                  <Link href="/webinars" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Webinars
                  </Link>
                </li>
                <li>
                  <Link href="/downloads" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Downloads
                  </Link>
                </li>
                <li>
                  <Link href="/help" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/events" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Partners */}
            <div>
              <h3 className="font-semibold text-white text-sm font-bold mb-4">
                For Partners
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/hire-graduates" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Hire Graduates
                  </Link>
                </li>
                <li>
                  <Link href="/training-providers" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Training Providers
                  </Link>
                </li>
                <li>
                  <Link href="/workforce-partners" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Workforce Boards
                  </Link>
                </li>
                <li>
                  <Link href="/white-label" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    White Label
                  </Link>
                </li>
                <li>
                  <Link href="/franchise" aria-label="Link" className="text-sm text-gray-400 hover:text-white transition">
                    Franchise
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white text-sm font-bold mb-4">Company</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    About Elevate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about/team"
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/philanthropy"
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    Corporate Responsibility
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
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
                  href="/refund-policy"
                  className="hover:text-gray-300 transition"
                >
                  Refund Policy
                </Link>
                <Link
                  href="/accessibility"
                  className="hover:text-gray-300 transition"
                >
                  Accessibility
                </Link>
                <Link href="/cookies" aria-label="Link" className="hover:text-gray-300 transition">
                  Cookie Policy
                </Link>
                <Link href="/security" aria-label="Link" className="hover:text-gray-300 transition">
                  Security
                </Link>
                <Link
                  href="/federal-compliance"
                  className="hover:text-gray-300 transition"
                >
                  Federal Compliance
                </Link>
                <Link href="/contact" aria-label="Link" className="hover:text-gray-300 transition">
                  Contact
                </Link>
                <Link
                  href="/sitemap.xml"
                  className="hover:text-gray-300 transition"
                >
                  Sitemap
                </Link>
              </div>
              <p className="text-xs text-gray-600">
                © {new Date().getFullYear()} Elevate For Humanity. All Rights
                Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error: unknown) {
    // Fallback minimal footer
    return (
      <footer className="bg-white text-black border-t border-gray-200 py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} Elevate For Humanity. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    );
  }
}
