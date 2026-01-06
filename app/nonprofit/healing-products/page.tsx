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

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mt-8">
            <p className="text-gray-700 mb-4">Products coming soon. Check back for updates.</p>
            <Link href="/contact" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
