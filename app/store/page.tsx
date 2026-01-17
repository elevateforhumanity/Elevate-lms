import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShoppingCart,
  Gift,
  ArrowRight,
  Heart,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Store | Elevate for Humanity',
  description: 'Digital resources, courses, and products. Every purchase supports free training programs.',
};

export const dynamic = 'force-dynamic';

export default async function StorePage() {
  const cartCount = 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Store</h1>
              <p className="text-blue-200 text-lg">
                Every purchase supports free training programs
              </p>
            </div>
            <Link 
              href="/store/cart" 
              className="relative flex items-center gap-2 bg-white text-blue-900 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-100"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Products Coming Soon */}
        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Products</h2>
          <div className="text-center py-16 bg-white rounded-xl border">
            <Gift className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">Store Coming Soon</h3>
            <p className="text-gray-600 mb-4">Digital resources and products will be available here.</p>
            <Link href="/programs" className="text-blue-600 font-medium hover:underline">
              Browse our training programs instead →
            </Link>
          </div>
        </section>

        {/* Mission Banner */}
        <section className="mt-16 bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <Heart className="w-10 h-10 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-blue-900 mb-3">Your Purchase Makes a Difference</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            100% of proceeds support free workforce training programs for underserved communities.
          </p>
          <Link 
            href="/donate"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700"
          >
            Make a Donation <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
