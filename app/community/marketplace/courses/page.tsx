import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Clock,
  Star,
  Users,
  Search,
  Filter,
  Play,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export const metadata: Metadata = {
  title: 'Community Courses | Elevate for Humanity',
  description:
    'Browse courses created by community members and instructors. Learn new skills from peers who have been where you are.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/community/marketplace/courses',
  },
};

export const dynamic = 'force-dynamic';

export default async function CommunityCoursesPage() {
  const supabase = await createClient();
  
  let courses: any[] = [];
  
  if (supabase) {
    const { data } = await supabase
      .from('courses')
      .select('id, title, description, thumbnail_url, duration_hours, price, category, instructor_id, profiles:instructor_id(full_name)')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(12);
    
    if (data && data.length > 0) {
      courses = data.map((course: any) => ({
        id: course.id,
        title: course.title,
        instructor: course.profiles?.full_name || 'Elevate Team',
        rating: 4.5,
        reviews: 0,
        students: 0,
        duration: course.duration_hours ? `${course.duration_hours} hours` : 'Self-paced',
        price: course.price ? `$${course.price}` : 'Free',
        image: course.thumbnail_url || '/images/courses/default-course.jpg',
        category: course.category || 'General',
      }));
    }
  }
  
  // Show empty state if no courses
  if (courses.length === 0) {
    courses = []; // Empty array - will show "No courses available" message
  }

  const categories = [
    'All Courses',
    'Healthcare',
    'Skilled Trades',
    'Beauty',
    'Technology',
    'Career Development',
    'Business',
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
            <span className="text-gray-900 font-medium">Courses</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Courses</h1>
          <p className="text-blue-100">Learn from peers and industry experts</p>
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
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                    index === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Courses Available Yet</h3>
              <p className="text-gray-500 mb-6">Community courses will appear here as they are published.</p>
              <Link href="/programs" className="text-blue-600 font-medium hover:underline">
                Browse Official Programs →
              </Link>
            </div>
          ) : null}
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/community/marketplace/courses/${course.id}`}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-48">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                    {course.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`text-sm font-bold px-3 py-1 rounded ${
                    course.price === 'Free' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-900'
                  }`}>
                    {course.price}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    {course.rating} ({course.reviews})
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students} students
                  </span>
                  <button className="flex items-center text-blue-600 font-medium hover:text-blue-700">
                    <Play className="w-4 h-4 mr-1" />
                    Preview
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition">
            Load More Courses
          </button>
        </div>

        {/* Become Instructor CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-2">Share Your Knowledge</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Have expertise to share? Create a course and help others succeed while earning income.
          </p>
          <Link
            href="/creator"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
          >
            Become an Instructor
          </Link>
        </div>
      </div>
    </div>
  );
}
