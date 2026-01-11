import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Users, Star, DollarSign, ShoppingBag } from 'lucide-react';

export const metadata = {
  title: 'Community Marketplace | Elevate for Humanity',
  description:
    'Discover courses, programs, and products from our community of creators and program owners.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/community/marketplace',
  },
};

export const dynamic = 'force-dynamic';

export default async function CommunityMarketplacePage() {
  let courses: any[] = [];
  
  try {
    const supabase = await createClient();
    const result = await supabase
      .from('creator_courses')
      .select(
        `
        *,
        creator_profiles!inner(display_name, bio, verified)
      `
      )
      .eq('status', 'published')
      .order('total_enrollments', { ascending: false })
      .limit(12);
    
    courses = result.data || [];
  } catch (error) {
    console.error('Failed to fetch marketplace courses:', error);
  }

  // Get active shop products
  const { data: products } = await supabase
    .from('shop_products')
    .select(
      `
      *,
      shop_profiles!inner(shop_name, verified, rating)
    `
    )
    .eq('status', 'active')
    .order('total_sales', { ascending: false })
    .limit(8);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-zinc-900  via-white  py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-black text-gray-900 mb-6">
            Community Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover courses, training programs, and products created by our
            community of program owners, instructors, and entrepreneurs.
          </p>
        </div>
      </section>

      {/* Creator Courses */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Courses
              </h2>
              <p className="text-gray-600 mt-2">
                Learn from expert instructors in our community
              </p>
            </div>
            <Link
              href="/community/courses"
              className="text-brand-green-600 font-semibold hover:text-green-700"
            >
              View All →
            </Link>
          </div>

          {courses && courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course: any) => (
                <Link
                  key={course.id}
                  href={`/community/courses/${course.id}`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
                >
                  {course.thumbnail_url && (
                    <div className="aspect-video bg-gray-100 overflow-hidden relative">
                      <Image
                        priority
                        src={course.thumbnail_url}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {course.category || 'Course'}
                      </span>
                      {course.creator_profiles.verified && (
                        <span className="text-blue-600">✓</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-green-600">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.total_enrollments || 0}</span>
                        </div>
                        {course.average_rating > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{course.average_rating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {course.is_free ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${(course.price / 100).toFixed(2)}`
                        )}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        by{' '}
                        <span className="font-semibold">
                          {course.creator_profiles.display_name}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600">
                No courses available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Shop Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Shop Products
              </h2>
              <p className="text-gray-600 mt-2">
                Tools and resources from community sellers
              </p>
            </div>
            <Link
              href="/community/shop"
              className="text-brand-green-600 font-semibold hover:text-green-700"
            >
              View All →
            </Link>
          </div>

          {products && products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/community/shop/products/${product.id}`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
                >
                  {product.images && product.images[0] && (
                    <div className="aspect-square bg-gray-100 overflow-hidden relative">
                      <Image
                        loading="lazy"
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-brand-green-600">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">
                        ${(product.price / 100).toFixed(2)}
                      </div>
                      {product.compare_at_price && (
                        <div className="text-sm text-gray-700 line-through">
                          ${(product.compare_at_price / 100).toFixed(2)}
                        </div>
                      )}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{product.shop_profiles.shop_name}</span>
                        {product.shop_profiles.verified && (
                          <span className="text-blue-600">✓ Verified</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600">
                No products available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA for Program Owners */}
      <section className="py-16 bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Are You a Program Owner?</h2>
          <p className="text-xl opacity-90 mb-8">
            Create your own courses, build your community, and sell products to
            students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/creator/dashboard"
              className="px-8 py-4 bg-white text-brand-green-600 font-bold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start Creating
            </Link>
            <Link
              href="/store/licenses"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
