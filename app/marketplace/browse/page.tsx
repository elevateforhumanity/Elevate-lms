import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronRight,
  Search,
  Filter,
  Star,
  ShoppingCart,
  BookOpen,
  Video,
  FileText,
  Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Browse Marketplace | Elevate',
  description: 'Browse courses, resources, and learning materials.',
};

export const dynamic = 'force-dynamic';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'resource' | 'template' | 'bundle';
  price: number;
  original_price?: number;
  rating: number;
  reviews_count: number;
  seller_name: string;
  image_url?: string;
  category: string;
}

export default async function MarketplaceBrowsePage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Database connection failed.</p>
        </div>
      </div>
    );
  }

  // Sample marketplace items
  const items: MarketplaceItem[] = [
    {
      id: '1',
      title: 'Advanced Barbering Techniques',
      description: 'Master advanced cutting and styling techniques from industry experts.',
      type: 'course',
      price: 149,
      original_price: 199,
      rating: 4.8,
      reviews_count: 124,
      seller_name: 'Master Barber Academy',
      category: 'Barbering',
    },
    {
      id: '2',
      title: 'HVAC Troubleshooting Guide',
      description: 'Comprehensive guide to diagnosing and fixing common HVAC issues.',
      type: 'resource',
      price: 29,
      rating: 4.6,
      reviews_count: 89,
      seller_name: 'HVAC Pro Training',
      category: 'HVAC',
    },
    {
      id: '3',
      title: 'Medical Assistant Exam Prep Bundle',
      description: 'Complete study materials for CMA certification exam.',
      type: 'bundle',
      price: 79,
      original_price: 120,
      rating: 4.9,
      reviews_count: 256,
      seller_name: 'Healthcare Education Co',
      category: 'Healthcare',
    },
    {
      id: '4',
      title: 'Business Plan Templates for Barbers',
      description: 'Professional templates to start your barbershop business.',
      type: 'template',
      price: 19,
      rating: 4.5,
      reviews_count: 67,
      seller_name: 'Entrepreneur Resources',
      category: 'Business',
    },
    {
      id: '5',
      title: 'Tax Preparation Fundamentals',
      description: 'Learn the basics of tax preparation and filing.',
      type: 'course',
      price: 99,
      rating: 4.7,
      reviews_count: 183,
      seller_name: 'Tax Academy',
      category: 'Finance',
    },
    {
      id: '6',
      title: 'Customer Service Excellence',
      description: 'Build lasting client relationships in any service industry.',
      type: 'course',
      price: 49,
      rating: 4.4,
      reviews_count: 92,
      seller_name: 'Service Pro Institute',
      category: 'Professional Skills',
    },
  ];

  const categories = ['All', 'Barbering', 'HVAC', 'Healthcare', 'Finance', 'Business', 'Professional Skills'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <Video className="w-4 h-4" />;
      case 'resource': return <FileText className="w-4 h-4" />;
      case 'template': return <FileText className="w-4 h-4" />;
      case 'bundle': return <BookOpen className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/marketplace" className="hover:text-gray-700">Marketplace</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Browse</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Browse Marketplace</h1>
              <p className="text-gray-600 mt-1">Discover courses, resources, and learning materials</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search marketplace..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <button className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
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

        {/* Items Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white/50" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                    item.type === 'course' ? 'bg-blue-100 text-blue-700' :
                    item.type === 'bundle' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {getTypeIcon(item.type)}
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">{item.category}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">{item.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({item.reviews_count} reviews)</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">By {item.seller_name}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">${item.price}</span>
                    {item.original_price && (
                      <span className="text-sm text-gray-400 line-through">${item.original_price}</span>
                    )}
                  </div>
                  <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Seller CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-2">Share Your Expertise</h2>
          <p className="text-purple-100 mb-6 max-w-xl mx-auto">
            Create and sell courses, templates, and resources to help others succeed in their careers.
          </p>
          <Link
            href="/marketplace/sell"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 font-medium"
          >
            Start Selling
          </Link>
        </div>
      </div>
    </div>
  );
}
