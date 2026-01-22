import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  Download,
  Star,
  Search,
  ShoppingCart,
  Tag,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Community Products | Elevate for Humanity',
  description:
    'Browse digital products, templates, and resources created by community members. Study guides, templates, and more.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/community/marketplace/products',
  },
};

export const dynamic = 'force-dynamic';

export default async function CommunityProductsPage() {
  const supabase = await createClient();
  
  let products: any[] = [];
  
  if (supabase) {
    const { data } = await supabase
      .from('products')
      .select('id, name, description, price, category, download_count, creator_id, profiles:creator_id(full_name)')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(12);
    
    if (data && data.length > 0) {
      products = data.map((product: any) => ({
        id: product.id,
        title: product.name,
        creator: product.profiles?.full_name || 'Elevate Team',
        rating: 4.5,
        reviews: 0,
        downloads: product.download_count || 0,
        price: product.price ? `$${product.price}` : 'Free',
        type: 'Digital Download',
        category: product.category || 'General',
      }));
    }
  }

  const categories = [
    'All Products',
    'Study Materials',
    'Career Tools',
    'Business Tools',
    'Templates',
    'Workbooks',
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/community" className="hover:text-blue-600">Community</Link>
            <span className="mx-2">/</span>
            <Link href="/community/marketplace" className="hover:text-blue-600">Marketplace</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Products</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Digital Products</h1>
          <p className="text-green-100">Templates, guides, and resources from the community</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                    index === 0
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Available Yet</h3>
              <p className="text-gray-500 mb-6">Community products will appear here as they are published.</p>
              <Link href="/store" className="text-green-600 font-medium hover:underline">
                Browse Official Store →
              </Link>
            </div>
          ) : null}
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded ${
                    product.price === 'Free' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {product.price}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {product.creator}</p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {product.type}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    {product.rating} ({product.reviews})
                  </span>
                  <span className="flex items-center">
                    <Download className="w-4 h-4 mr-1" />
                    {product.downloads}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/community/marketplace/products/${product.id}`}
                    className="flex-1 text-center py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                  >
                    Preview
                  </Link>
                  <button className="flex-1 flex items-center justify-center py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.price === 'Free' ? 'Get Free' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
            Load More Products
          </button>
        </div>

        {/* Sell Products CTA */}
        <div className="mt-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white text-center">
          <Tag className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-2">Sell Your Products</h2>
          <p className="text-green-100 mb-6 max-w-xl mx-auto">
            Create and sell digital products to help others succeed. Templates, guides, workbooks, and more.
          </p>
          <Link
            href="/creator/products/new"
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
          >
            Start Selling
          </Link>
        </div>
      </div>
    </div>
  );
}
