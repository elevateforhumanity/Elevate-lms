import Image from 'next/image';
import Link from 'next/link';

export default function Pathways() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Your Path to Success
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/images/pathways/trades-hero.jpg"
              alt="Students learning"
              width={800}
              height={450}
              className="w-full h-auto"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Explore Programs</h3>
              <p className="mb-4 text-base text-gray-700">Browse training in healthcare, skilled trades, technology, and business</p>
              <Link href="/programs" className="text-blue-600 underline font-semibold hover:text-blue-700">
                View All Programs →
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/images/efh/hero/hero-support.jpg"
              alt="Career pathways"
              width={800}
              height={450}
              className="w-full h-auto"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Get Funded</h3>
              <p className="mb-4 text-base text-gray-700">See if you qualify for WIOA, WRG, or DOL funding to cover 100% of costs</p>
              <Link href="/wioa-eligibility" className="text-blue-600 underline font-semibold hover:text-blue-700">
                Check Eligibility →
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">What You Get</h3>
          <div className="grid md:grid-cols-2 gap-6 text-lg text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Training programs tied to real careers with employer demand</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Industry-recognized credentials employers trust</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Funding options that reduce or eliminate tuition costs</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Clear steps from enrollment to certification to employment</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Support and guidance throughout your training journey</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-xl">✓</span>
              <span>Connection to job opportunities after completion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
