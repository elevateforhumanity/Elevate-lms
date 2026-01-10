import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healing Products | Selfish Inc.',
  description: 'Products designed to support your healing journey',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/nonprofit/healing-products',
  },
};

export default function HealingProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link href="/nonprofit" className="text-purple-600 hover:text-purple-700 mb-8 inline-block">
          ← Back to Selfish Inc.
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-6">Healing Products</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Carefully curated products to support your wellness journey.
          </p>

          <p className="text-gray-700 mb-4">
            Our healing products are designed to uplift your mood and support your body's natural healing processes.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Wellness Journals</h3>
              <p className="text-gray-600 mb-4">
                Guided journals for self-reflection, gratitude, and healing. Track your journey and celebrate progress.
              </p>
              <div className="text-2xl font-bold text-purple-600 mb-4">$24.99</div>
              <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition" aria-label="Action button">
                Add to Cart
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Healing Tea Collection</h3>
              <p className="text-gray-600 mb-4">
                Organic herbal teas designed to calm, restore, and support your body's natural healing.
              </p>
              <div className="text-2xl font-bold text-purple-600 mb-4">$18.99</div>
              <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition" aria-label="Action button">
                Add to Cart
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aromatherapy Set</h3>
              <p className="text-gray-600 mb-4">
                Essential oils and diffuser to create a calming environment for meditation and relaxation.
              </p>
              <div className="text-2xl font-bold text-purple-600 mb-4">$39.99</div>
              <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition" aria-label="Action button">
                Add to Cart
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Self-Care Kit</h3>
              <p className="text-gray-600 mb-4">
                Complete kit with bath salts, candles, and mindfulness cards for your healing journey.
              </p>
              <div className="text-2xl font-bold text-purple-600 mb-4">$49.99</div>
              <button className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition" aria-label="Action button">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Questions about our products?</h3>
            <p className="text-gray-700 mb-4">
              Contact us for more information or to place a custom order.
            </p>
            <Link href="/contact" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
