import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Apply | Supersonic Fast Cash',
  description: 'Apply to work with Supersonic Fast Cash as a tax preparer or office staff.',
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <Image src="/images/efh/hero/hero-main-clean.jpg" alt="Apply" width={800} height={600} className="absolute inset-0 w-full h-full object-cover" quality={85} / loading="lazy">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Apply to Supersonic Fast Cash
            </h1>
            <p className="text-xl">
              Join our team of tax professionals
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <h2 className="text-2xl font-bold mb-6">Career Opportunities</h2>
            <p className="text-gray-700 mb-6">
              We're looking for motivated individuals to join our team. Whether you're an experienced tax professional or looking to start your career, we have opportunities available.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Available Positions</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Tax Preparers (IRS-certified)</li>
                  <li>Office Staff</li>
                  <li>Customer Service Representatives</li>
                  <li>Sub-Office Operators</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">How to Apply</h3>
                <p className="text-gray-700 mb-4">
                  Visit our careers page to learn more about available positions and requirements.
                </p>
                <Link
                  href="/supersonic-fast-cash/careers"
                  className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  View Careers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
