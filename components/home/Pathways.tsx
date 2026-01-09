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
          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/pathways/trades-hero.jpg"
              alt="Students learning"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Explore Programs</h3>
                <p className="mb-4">Browse training in healthcare, skilled trades, technology, and business</p>
                <Link href="/programs" className="text-white underline font-semibold">
                  View All Programs →
                </Link>
              </div>
            </div>
          </div>

          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/efh/hero/hero-support.jpg"
              alt="Career pathways"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Get Funded</h3>
                <p className="mb-4">See if you qualify for WIOA, WRG, or DOL funding to cover 100% of costs</p>
                <Link href="/wioa-eligibility" className="text-white underline font-semibold">
                  Check Eligibility →
                </Link>
              </div>
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
