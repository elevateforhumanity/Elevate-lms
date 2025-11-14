import Link from 'next/link';

export const metadata = {
  title: 'About Us | Elevate for Humanity',
  description: 'Learn about our mission to provide free workforce training and career development.',
};

export default function AboutPage() {
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
              <Link href="/about" className="text-blue-600 font-medium">About</Link>
              <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">About Elevate for Humanity</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-8">
              We provide free workforce training and career development programs to help individuals transform their lives through education and skill-building.
            </p>

            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              To elevate communities by providing accessible, high-quality career and technical training that leads to meaningful employment and economic opportunity.
            </p>

            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span>100% funded training programs through WIOA and WRG</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span>Industry-recognized certifications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span>Hands-on training with experienced instructors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span>Job placement assistance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-xl">✓</span>
                <span>Ongoing career support</span>
              </li>
            </ul>

            <div className="bg-blue-50 p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-gray-700 mb-6">
                Join thousands of students who have transformed their careers through our programs.
              </p>
              <Link href="/apply" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 inline-block">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
