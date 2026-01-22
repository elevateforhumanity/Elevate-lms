import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Metadata } from 'next';
import { Package, Star, User, ShoppingCart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Marketplace | Elevate For Humanity',
  description: 'Browse digital products, courses, and resources from creators.',
};

export const dynamic = 'force-dynamic';

export default async function MarketplaceBrowsePage() {
  const supabase = await createClient();

  // Fetch marketplace items from database
  const { data: items, error } = await supabase
    .from('marketplace_items')
    .select(`
      id,
      title,
      description,
      price,
      category,
      rating,
      reviews_count,
      image_url,
      seller_id,
      seller:profiles(full_name)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching marketplace items:', error.message);
  }

  const itemList = items || [];
  const categories = ['All', ...new Set(itemList.map((i: any) => i.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-1">Digital products, courses, and resources from creators</p>
        </div>

        {/* Categories */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {itemList.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {itemList.map((item: any) => (
              <div key={item.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-300" />
                </div>
                <div className="p-4">
                  <span className="text-xs text-gray-500">{item.category || 'General'}</span>
                  <h3 className="font-semibold text-gray-900 mt-1 line-clamp-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">{item.seller?.full_name || 'Creator'}</span>
                  </div>
                  {item.rating > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-sm text-gray-500">({item.reviews_count || 0})</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold text-gray-900">${item.price || 0}</span>
                    <Link
                      href={`/marketplace/items/${item.id}`}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Marketplace Coming Soon</h2>
            <p className="text-gray-600 mb-6">We're building our creator marketplace. Check back soon for digital products and resources.</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
