import Link from 'next/link';

export default function Highlights() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Highlight 1 */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Free Training
            </h3>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              100% funded programs in healthcare, skilled trades, and technology. 
              No tuition. No debt.
            </p>
            <Link
              href="/programs"
              className="inline-block px-8 py-4 bg-brand-red-600 text-white text-lg font-semibold rounded hover:bg-brand-red-700 transition"
            >
              View Programs
            </Link>
          </div>

          {/* Highlight 2 */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Real Credentials
            </h3>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Earn industry-recognized certifications that employers trust and value.
            </p>
            <Link
              href="/eligibility"
              className="inline-block px-8 py-4 bg-brand-red-600 text-white text-lg font-semibold rounded hover:bg-brand-red-700 transition"
            >
              Check Eligibility
            </Link>
          </div>

          {/* Highlight 3 */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Clear Pathways
            </h3>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Structured steps from training to employment. No guesswork.
            </p>
            <Link
              href="/apply"
              className="inline-block px-8 py-4 bg-brand-red-600 text-white text-lg font-semibold rounded hover:bg-brand-red-700 transition"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
