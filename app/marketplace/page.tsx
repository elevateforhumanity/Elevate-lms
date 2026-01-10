import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Marketplace',
  description: 'Marketplace - Elevate for Humanity workforce training and career development programs in Indianapolis.',
  path: '/marketplace',
});

import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';


// Revalidate every 60 seconds for better performance
export const revalidate = 60;

export default async function MarketplacePage() {
  const supabase = await createClient();

  // Fetch approved products with error handling
  const { data: products, error: productsError } = await supabase
    .from('marketplace_products')
    .select(
      `
      *,
      creator:marketplace_creators(display_name)
    `
    )
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(12);

  // Fetch featured creators with error handling
  const { data: creators, error: creatorsError } = await supabase
    .from('marketplace_creators')
    .select('*')
    .eq('status', 'approved')
    .limit(6);

  // If tables don't exist yet, show setup message
  if (productsError || creatorsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-brand-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">
            Marketplace Setup Required
          </h1>
          <p className="text-gray-600 mb-6">
            The marketplace database tables need to be created. Please run the
            database migrations.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
            <code className="text-sm">supabase db push</code>
          </div>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-brand-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue-700 transition"
            >
              Return Home
            </Link>
            <Link
              href="/programs"
              className="border-2 border-brand-blue-600 text-brand-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              View Programs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Creator Marketplace
          </h1>
          <p className="text-base md:text-lg mb-8 opacity-90">
            Discover digital products from our community of creators
          </p>
          <Link
            href="/marketplace/apply"
            className="inline-block bg-white text-brand-blue-600 px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all"
          >
            Become a Creator
          </Link>
        </div>
      </div>

      {/* Featured Creators */}
      {creators && creators.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Featured Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creators.map((creator) => (
              <div
                key={creator.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="w-16 h-16 bg-white rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {creator.display_name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {creator.display_name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {creator.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>

        {!products || products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">
              No products available yet. Be the first creator!
            </p>
            <Link
              href="/marketplace/apply"
              className="inline-block bg-brand-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-brand-blue-700 hover:shadow-xl transition-all"
            >
              Apply to Sell
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/marketplace/product/${product.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group"
              >
                <div className="aspect-video bg-white flex items-center justify-center relative">
                  {product.thumbnail_url ? (
                    <Image priority
                      src={product.thumbnail_url}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <svg
                      className="w-16 h-16 text-white opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 group-hover:text-brand-blue-600 transition line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by {product.creator?.display_name || 'Unknown'}
                  </p>
                  <p className="text-lg font-bold text-brand-blue-600">
                    ${(product.price_cents / 100).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Share Your Work?
          </h2>
          <p className="text-gray-600 mb-8">
            Join our marketplace and earn 70% on every sale. No upfront costs,
            no technical setup required.
          </p>
          <Link
            href="/marketplace/apply"
            className="inline-block bg-brand-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-brand-blue-700 hover:shadow-xl transition-all"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
