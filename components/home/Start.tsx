import Link from 'next/link';

export default function Start() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Start with clarity
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/programs"
            className="px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded hover:bg-gray-800 transition"
          >
            Explore Programs
          </Link>
          <Link
            href="/eligibility"
            className="px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded border-2 border-gray-900 hover:bg-gray-50 transition"
          >
            Check Eligibility
          </Link>
        </div>
        
        <p className="text-gray-600 text-base">
          You are not signing up for a promise. You are entering a framework designed to work.
        </p>
      </div>
    </section>
  );
}
