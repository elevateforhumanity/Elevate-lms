import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, BookOpen, Award, Shirt, ArrowRight, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shop | Elevate For Humanity',
  description: 'Shop courses, workbooks, study materials, and Elevate merchandise. Support our mission while advancing your career.',
};

const categories = [
  {
    name: 'Online Courses',
    description: 'Self-paced learning for career advancement',
    count: 24,
    icon: BookOpen,
    href: '/courses',
    image: '/images/technology/hero-programs-technology.jpg',
  },
  {
    name: 'Workbooks & Study Guides',
    description: 'Printed and digital study materials',
    count: 18,
    icon: BookOpen,
    href: '/workbooks',
    image: '/images/healthcare/program-cna-training.jpg',
  },
  {
    name: 'Certifications',
    description: 'Industry-recognized certification prep',
    count: 12,
    icon: Award,
    href: '/certifications',
    image: '/images/trades/hero-program-hvac.jpg',
  },
  {
    name: 'Merchandise',
    description: 'Elevate branded apparel and accessories',
    count: 15,
    icon: Shirt,
    href: '/store',
    image: '/images/artlist/hero-training-1.jpg',
  },
];

const featuredProducts = [
  {
    name: 'CNA Exam Prep Course',
    price: 49.99,
    originalPrice: 99.99,
    rating: 4.8,
    reviews: 156,
    image: '/images/healthcare/program-cna-training.jpg',
    badge: 'Best Seller',
  },
  {
    name: 'CompTIA A+ Study Guide',
    price: 29.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: '/images/technology/hero-programs-technology.jpg',
    badge: null,
  },
  {
    name: 'HVAC Fundamentals Workbook',
    price: 24.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 67,
    image: '/images/trades/hero-program-hvac.jpg',
    badge: 'New',
  },
  {
    name: 'Elevate T-Shirt',
    price: 19.99,
    originalPrice: null,
    rating: 5.0,
    reviews: 34,
    image: '/images/artlist/hero-training-2.jpg',
    badge: null,
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ShoppingBag className="w-4 h-4" />
              Support Our Mission
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Elevate Shop
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Courses, study materials, and merchandise to support your career journey. 100% of proceeds fund free training for those in need.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group bg-white rounded-xl overflow-hidden border hover:shadow-lg transition-shadow"
              >
                <div className="relative h-40">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold">{cat.name}</h3>
                    <p className="text-sm text-white/80">{cat.count} items</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link href="/store" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.name} className="bg-white rounded-xl border hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Banner */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Every Purchase Supports Free Training</h2>
          <p className="text-blue-100 mb-6">
            100% of shop proceeds go directly to funding free career training for Indiana residents who qualify for WIOA and state grants.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Learn About Our Mission
          </Link>
        </div>
      </section>
    </div>
  );
}
