import { Metadata } from 'next';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { ShopClient } from './ShopClient';
import { PageTracker } from '@/components/analytics/PageTracker';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'Shop | Elevate for Humanity',
  description: 'Shop professional tools, equipment, apparel, and study materials for your career training programs. Quality gear at student-friendly prices.',
  keywords: ['shop', 'tools', 'equipment', 'scrubs', 'study guides', 'career training', 'student supplies'],
  alternates: {
    canonical: `${SITE_URL}/shop`,
  },
  openGraph: {
    title: 'Shop | Elevate for Humanity',
    description: 'Shop professional tools, equipment, apparel, and study materials for your career training programs.',
    url: `${SITE_URL}/shop`,
    siteName: 'Elevate for Humanity',
    type: 'website',
    images: [{ url: `${SITE_URL}/images/og/shop-og.jpg`, width: 1200, height: 630, alt: 'Elevate Shop' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop | Elevate for Humanity',
    description: 'Shop professional tools, equipment, and study materials for your career training.',
  },
};

const fallbackProducts = [
  { id: '1', name: 'HVAC Tool Kit', price: 149.99, rating: 4.8, review_count: 124, category: 'Tools', image_url: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400', slug: 'hvac-tool-kit' },
  { id: '2', name: 'Medical Scrubs Set', price: 49.99, rating: 4.6, review_count: 89, category: 'Apparel', image_url: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400', slug: 'medical-scrubs-set' },
  { id: '3', name: 'Barber Shears Pro', price: 89.99, rating: 4.9, review_count: 156, category: 'Tools', image_url: 'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=400', slug: 'barber-shears-pro' },
  { id: '4', name: 'Study Guide Bundle', price: 29.99, rating: 4.7, review_count: 234, category: 'Books', image_url: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400', slug: 'study-guide-bundle' },
  { id: '5', name: 'Safety Glasses', price: 24.99, rating: 4.5, review_count: 67, category: 'Safety', image_url: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400', slug: 'safety-glasses' },
  { id: '6', name: 'Elevate Hoodie', price: 59.99, rating: 4.8, review_count: 178, category: 'Apparel', image_url: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg?auto=compress&cs=tinysrgb&w=400', slug: 'elevate-hoodie' },
];

const categories = ['All', 'Tools', 'Apparel', 'Books', 'Safety', 'Accessories'];

export default async function ShopPage() {
  let products = fallbackProducts;
  
  try {
    const supabase = await createClient();
    if (supabase) {
      const { data } = await supabase
        .from('shop_products')
        .select('id, name, slug, price, rating, review_count, category, image_url')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(12);
      
      if (data && data.length > 0) {
        products = data;
      }
    }
  } catch {
    // Use fallback products
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageTracker pageName="Shop" pageCategory="ecommerce" />
      
      <div className="relative bg-slate-900 text-white py-16">
        <Image
          src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Shop"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Elevate Shop</h1>
          </div>
          <p className="text-xl text-gray-200 max-w-2xl">
            Get the tools and gear you need for your training programs
          </p>
        </div>
      </div>

      <ShopClient products={products} categories={categories} />
    </div>
  );
}
