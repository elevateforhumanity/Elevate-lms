import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronRight,
  Search,
  Star,
  User,
  BookOpen,
  Users,
  Award,
  Filter,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Marketplace Sellers | Elevate',
  description: 'Browse verified sellers and instructors on our marketplace.',
};

export const dynamic = 'force-dynamic';

interface Seller {
  id: string;
  name: string;
  title: string;
  avatar_url?: string;
  bio: string;
  rating: number;
  reviews_count: number;
  courses_count: number;
  students_count: number;
  specialties: string[];
  verified: boolean;
}

export default async function MarketplaceSellersPage() {
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

  // Sample sellers
  const sellers: Seller[] = [
    {
      id: '1',
      name: 'Master Barber Academy',
      title: 'Professional Barbering Education',
      bio: 'Industry-leading barbering education with over 20 years of experience training successful barbers.',
      rating: 4.9,
      reviews_count: 342,
      courses_count: 12,
      students_count: 2500,
      specialties: ['Barbering', 'Business', 'Client Relations'],
      verified: true,
    },
    {
      id: '2',
      name: 'HVAC Pro Training',
      title: 'HVAC Certification & Training',
      bio: 'Comprehensive HVAC training from certified technicians with real-world experience.',
      rating: 4.8,
      reviews_count: 189,
      courses_count: 8,
      students_count: 1200,
      specialties: ['HVAC', 'Electrical', 'Troubleshooting'],
      verified: true,
    },
    {
      id: '3',
      name: 'Healthcare Education Co',
      title: 'Medical & Healthcare Training',
      bio: 'Preparing the next generation of healthcare professionals with accredited programs.',
      rating: 4.9,
      reviews_count: 456,
      courses_count: 15,
      students_count: 3800,
      specialties: ['Medical Assisting', 'Phlebotomy', 'Healthcare Admin'],
      verified: true,
    },
    {
      id: '4',
      name: 'Tax Academy',
      title: 'Tax Preparation & Finance',
      bio: 'Expert tax preparation training from IRS-certified instructors.',
      rating: 4.7,
      reviews_count: 234,
      courses_count: 6,
      students_count: 1800,
      specialties: ['Tax Preparation', 'Bookkeeping', 'Finance'],
      verified: true,
    },
    {
      id: '5',
      name: 'Service Pro Institute',
      title: 'Customer Service Excellence',
      bio: 'Building world-class customer service skills for any industry.',
      rating: 4.6,
      reviews_count: 156,
      courses_count: 5,
      students_count: 950,
      specialties: ['Customer Service', 'Communication', 'Sales'],
      verified: true,
    },
    {
      id: '6',
      name: 'Entrepreneur Resources',
      title: 'Business & Entrepreneurship',
      bio: 'Helping aspiring entrepreneurs start and grow successful businesses.',
      rating: 4.5,
      reviews_count: 98,
      courses_count: 4,
      students_count: 620,
      specialties: ['Business Planning', 'Marketing', 'Finance'],
      verified: false,
    },
  ];

  const categories = ['All', 'Barbering', 'HVAC', 'Healthcare', 'Finance', 'Business'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/marketplace" className="hover:text-gray-700">Marketplace</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Sellers</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Marketplace Sellers</h1>
              <p className="text-gray-600 mt-1">Browse verified instructors and content creators</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sellers..."
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

        {/* Sellers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellers.map((seller) => (
            <div key={seller.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  {seller.avatar_url ? (
                    <img
                      src={seller.avatar_url}
                      alt={seller.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">{seller.name}</h3>
                    {seller.verified && (
                      <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{seller.title}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{seller.bio}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {seller.specialties.slice(0, 3).map((specialty, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-gray-900">{seller.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">{seller.reviews_count} reviews</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-gray-900">{seller.courses_count}</span>
                  </div>
                  <p className="text-xs text-gray-500">Courses</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-gray-900">{seller.students_count.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500">Students</p>
                </div>
              </div>

              <Link
                href={`/marketplace/seller/${seller.id}`}
                className="block w-full text-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>

        {/* Become a Seller CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <Award className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-2">Become a Verified Seller</h2>
          <p className="text-purple-100 mb-6 max-w-xl mx-auto">
            Share your expertise with our community and earn revenue from your courses and resources.
          </p>
          <Link
            href="/marketplace/sell"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 font-medium"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
