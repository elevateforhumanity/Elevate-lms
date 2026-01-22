import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Play, Clock, Users, Star, Lock, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Classroom | Community | Elevate For Humanity',
  description: 'Access exclusive courses, tutorials, and learning resources in our community classroom.',
};

export const dynamic = 'force-dynamic';

export default async function ClassroomPage() {
  const supabase = await createClient();

  let courses: any[] = [];

  if (supabase) {
    try {
      const { data } = await supabase
        .from('courses')
        .select('id, course_name, description, duration_hours, is_active')
        .eq('is_active', true)
        .limit(6);
      if (data) courses = data;
    } catch (error) {
      console.error('[Classroom] Error:', error);
    }
  }

  const featuredCourses = [
    {
      title: 'Career Success Fundamentals',
      description: 'Master the essential skills for career advancement',
      image: '/images/community/event-5.jpg',
      lessons: 12,
      duration: '4 hours',
      students: 1250,
      rating: 4.8,
      free: true,
    },
    {
      title: 'Professional Communication',
      description: 'Improve your workplace communication skills',
      image: '/images/community/community-hero.jpg',
      lessons: 8,
      duration: '2.5 hours',
      students: 890,
      rating: 4.9,
      free: true,
    },
    {
      title: 'Interview Mastery',
      description: 'Ace your next job interview with confidence',
      image: '/images/community/event-1.jpg',
      lessons: 10,
      duration: '3 hours',
      students: 2100,
      rating: 4.7,
      free: false,
    },
    {
      title: 'Resume Building Workshop',
      description: 'Create a resume that gets you noticed',
      image: '/images/community/event-3.jpg',
      lessons: 6,
      duration: '1.5 hours',
      students: 1800,
      rating: 4.8,
      free: true,
    },
    {
      title: 'Networking Strategies',
      description: 'Build meaningful professional connections',
      image: '/images/community/event-4.jpg',
      lessons: 8,
      duration: '2 hours',
      students: 750,
      rating: 4.6,
      free: false,
    },
    {
      title: 'Time Management Essentials',
      description: 'Boost your productivity and work-life balance',
      image: '/images/community/event-2.jpg',
      lessons: 7,
      duration: '2 hours',
      students: 1100,
      rating: 4.7,
      free: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-green-800 to-emerald-900 text-white py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/community/event-5.jpg"
            alt="Online learning"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-green-300" />
              <span className="text-green-200 font-medium">Community Classroom</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Learn New Skills,<br />Advance Your Career
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Access exclusive courses, tutorials, and resources designed to help you succeed in your career journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#courses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-800 font-semibold rounded-full hover:bg-green-50 transition-colors"
              >
                Browse Courses
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
              >
                Back to Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">50+</p>
              <p className="text-gray-600">Courses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">200+</p>
              <p className="text-gray-600">Video Lessons</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">10K+</p>
              <p className="text-gray-600">Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">4.8</p>
              <p className="text-gray-600">Avg Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="courses" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Courses</h2>
              <p className="text-gray-600">Start learning with our most popular courses</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  {course.free ? (
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      FREE
                    </span>
                  ) : (
                    <span className="absolute top-4 left-4 bg-violet-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Lock className="w-3 h-3" /> PREMIUM
                    </span>
                  )}
                  <button className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-green-600 ml-1" />
                    </div>
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium text-gray-900">{course.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 text-sm">{course.students.toLocaleString()} students</span>
                    </div>
                  </div>

                  <Link
                    href={`/community/classroom/${index + 1}`}
                    className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {course.free ? 'Start Learning' : 'Unlock Course'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join our community to access all free courses and unlock premium content.
          </p>
          <Link
            href="/community/join"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 transition-colors"
          >
            Join the Community
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
