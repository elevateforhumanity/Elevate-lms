import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  ShoppingCart,
  Download,
  BookOpen,
  Gift,
  Star,
  Tag,
  ArrowRight,
  Heart,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Store | Elevate for Humanity',
  description: 'Digital resources, courses, and products. Every purchase supports free training programs.',
};

export const dynamic = 'force-dynamic';

export default async function StorePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get all products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  // Get product categories
  const { data: categories } = await supabase
    .from('product_categories')
    .select('*')
    .order('name', { ascending: true });

  // Get featured products
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .limit(4);

  // Get user's cart count if logged in
  let cartCount = 0;
  if (user) {
    const { count } = await supabase
      .from('cart_items')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);
    cartCount = count || 0;
  }

  // Get user's purchases if logged in
  let purchases: any[] = [];
  if (user) {
    const { data } = await supabase
      .from('purchases')
      .select('product_id')
      .eq('user_id', user.id);
    purchases = data || [];
  }

  const purchasedIds = purchases.map(p => p.product_id);

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
        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link 
              href="/store" 
              className="px-4 py-2 bg-blue-900 text-white rounded-full text-sm font-medium"
            >
              All Products
            </Link>
            {categories.map((cat: any) => (
              <Link 
                key={cat.id} 
                href={`/store?category=${cat.slug}`}
                className="px-4 py-2 bg-white border rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Featured Products */}
        {featuredProducts && featuredProducts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Featured</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: any) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  isPurchased={purchasedIds.includes(product.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-6">All Products</h2>
          {products && products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  isPurchased={purchasedIds.includes(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border">
              <Gift className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Products coming soon</h3>
              <p className="text-gray-600">Check back for digital resources and courses.</p>
            </div>
          )}
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

function ProductCard({ product, isPurchased }: { product: any; isPurchased: boolean }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition">
      {product.image_url ? (
        <div className="h-40 bg-gray-100">
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="h-40 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          {product.type === 'digital' ? (
            <Download className="w-10 h-10 text-blue-400" />
          ) : (
            <BookOpen className="w-10 h-10 text-blue-400" />
          )}
        </div>
      )}
      <div className="p-4">
        {product.is_featured && (
          <div className="flex items-center gap-1 text-red-600 text-xs font-medium mb-2">
            <Star className="w-3 h-3 fill-current" /> Featured
          </div>
        )}
        <h3 className="font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4 text-gray-400" />
            <span className="font-bold text-lg">
              {product.price === 0 ? 'Free' : `$${product.price}`}
            </span>
          </div>
          {isPurchased ? (
            <Link 
              href={`/store/downloads/${product.id}`}
              className="text-green-600 text-sm font-medium"
            >
              Download
            </Link>
          ) : (
            <Link 
              href={`/store/product/${product.id}`}
              className="text-blue-900 text-sm font-medium hover:underline"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
