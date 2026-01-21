import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Star, Filter, Search, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const SITE_URL = 'https://www.elevateforhumanity.org';

export const metadata: Metadata = {
  title: 'Course Catalog | Elevate for Humanity',
  description: 'Explore career-focused training programs in healthcare, skilled trades, technology, and more. Find the right course to launch your new career.',
  keywords: ['courses', 'training programs', 'career education', 'HVAC training', 'medical assistant', 'CDL training', 'barber school'],
  alternates: { canonical: `${SITE_URL}/courses` },
  openGraph: {
    title: 'Course Catalog | Elevate for Humanity',
    description: 'Explore career-focused training programs in healthcare, skilled trades, technology, and more.',
    url: `${SITE_URL}/courses`,
    siteName: 'Elevate for Humanity',
    type: 'website',
  },
};

const categories = ['All', 'Healthcare', 'Trades', 'Beauty', 'Transportation', 'Technology'];

export default async function CoursesPage() {
  const supabase = await createClient();
  let courses: any[] = [];

  if (supabase) {
    try {
      const { data } = await supabase
        .from('programs')
        .select('id, title, slug, category, image_url, description')
        .eq('is_active', true)
        .order('featured', { ascending: false })
        .order('title', { ascending: true })
        .limit(12);

      if (data && data.length > 0) {
        courses = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          category: p.category ? p.category.charAt(0).toUpperCase() + p.category.slice(1) : 'General',
          slug: p.slug,
          image_url: p.image_url || '/images/hero/hero-hands-on-training.jpg',
          description: p.description,
        }));
      }
    } catch (error) {
      console.error('[Courses] Error:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-slate-900 text-white py-16">
        <Image
          src="/images/hero/hero-hands-on-training.jpg"
          alt="Courses"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Course Catalog</h1>
          <p className="text-xl text-gray-200">Explore our career-focused training programs</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={cat === 'All' ? '/courses' : `/courses?category=${cat.toLowerCase()}`}
                  className={`px-4 py-2 rounded-lg text-sm ${cat === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
              aria-label="Search courses"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any) => (
            <Link
              key={course.id}
              href={`/programs/${course.slug || course.id}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={course.image_url}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{course.category}</span>
                <h2 className="font-semibold text-gray-900 text-lg mt-2 mb-2">{course.title}</h2>
                {course.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{course.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 flex items-center gap-1 text-sm font-medium">
                    View Details <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
