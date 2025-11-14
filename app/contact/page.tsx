import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Elevate for Humanity',
  description: 'Get in touch with our team for questions about our training programs.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">E</div>
              <span className="text-xl font-bold">Elevate for Humanity</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/programs" className="hover:text-blue-600">Programs</Link>
              <Link href="/about" className="hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-blue-600 font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-700 mb-12">
            Have questions? We're here to help you get started on your career journey.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">Phone</h3>
                  <p className="text-gray-700">(317) 314-3757</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Location</h3>
                  <p className="text-gray-700">Indianapolis, IN</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 9am - 5pm</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
              <div className="space-y-3">
                <Link href="/apply" className="block text-blue-600 hover:underline font-medium">
                  → Apply for Training
                </Link>
                <Link href="/programs" className="block text-blue-600 hover:underline font-medium">
                  → Browse Programs
                </Link>
                <Link href="/faq" className="block text-blue-600 hover:underline font-medium">
                  → Frequently Asked Questions
                </Link>
                <Link href="/student-portal" className="block text-blue-600 hover:underline font-medium">
                  → Student Portal
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
            <p className="mb-6">
              Don't wait to transform your career. Our programs are 100% funded and ready for you.
            </p>
            <Link href="/apply" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 inline-block">
              Apply Now
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
