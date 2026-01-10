import Link from 'next/link';

export default function SimpleHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="Link" className="flex items-center gap-2">
              <div className="text-2xl font-bold text-blue-600">Elevate</div>
            </Link>
            <nav role="navigation" aria-label="Main navigation" className="hidden lg:flex items-center gap-6">
              <Link href="/programs" aria-label="Link" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                Programs
              </Link>
              <Link href="/courses" aria-label="Link" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                Courses
              </Link>
              <Link href="/about" aria-label="Link" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                About
              </Link>
              <Link href="/contact" aria-label="Link" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" aria-label="Link" className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50 rounded-lg transition">
              Log In
            </Link>
            <Link href="/apply" aria-label="Link" className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition shadow-sm">
              Join for Free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
