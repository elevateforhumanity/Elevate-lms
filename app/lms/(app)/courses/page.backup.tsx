import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Users, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interactive Courses | LMS',
  description: 'Browse and enroll in interactive courses with quizzes, assignments, and hands-on activities.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/lms/courses',
  },
};

export const dynamic = 'force-dynamic';

export default async function InteractiveCoursesPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get all courses
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  // Get student's enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('course_id, status, progress')
    .eq('user_id', user.id);

  const enrolledCourseIds = new Set(enrollments?.map(e => e.course_id) || []);
  const enrollmentMap = new Map(enrollments?.map(e => [e.course_id, e]) || []);

  const courseCategories = [
    {
      image: '/hero-images/healthcare-cat-new.jpg',
      title: 'Healthcare',
      count: courses?.filter(c => c.category === 'healthcare').length || 5,
      href: '/lms/courses?category=healthcare',
    },
    {
      image: '/hero-images/skilled-trades-cat-new.jpg',
      title: 'Skilled Trades',
      count: courses?.filter(c => c.category === 'trades').length || 4,
      href: '/lms/courses?category=trades',
    },
    {
      image: '/hero-images/technology-cat-new.jpg',
      title: 'Technology',
      count: courses?.filter(c => c.category === 'technology').length || 6,
      href: '/lms/courses?category=technology',
    },
    {
      image: '/hero-images/business-hero.jpg',
      title: 'Business',
      count: courses?.filter(c => c.category === 'business').length || 3,
      href: '/lms/courses?category=business',
    },
  ];

  // Featured courses with unique images
  const featuredCourses = [
    {
      id: 'healthcare-fundamentals',
      title: 'Healthcare Fundamentals',
      description: 'Learn essential healthcare skills including patient care, medical terminology, and safety protocols.',
      image: '/hero-images/healthcare-category.jpg',
      duration: '4-6 weeks',
      students: 1250,
      rating: 4.9,
      level: 'Beginner',
    },
    {
      id: 'hvac-technician',
      title: 'HVAC Technician Training',
      description: 'Master heating, ventilation, and air conditioning systems installation and repair.',
      image: '/hero-images/skilled-trades-category.jpg',
      duration: '8-12 weeks',
      students: 890,
      rating: 4.8,
      level: 'Intermediate',
    },
    {
      id: 'it-support',
      title: 'IT Support Specialist',
      description: 'Build skills in computer hardware, software troubleshooting, and network basics.',
      image: '/hero-images/technology-category.jpg',
      duration: '6-10 weeks',
      students: 2100,
      rating: 4.9,
      level: 'Beginner',
    },
    {
      id: 'business-management',
      title: 'Business Management',
      description: 'Develop leadership, communication, and management skills for career advancement.',
      image: '/hero-images/business-category.jpg',
      duration: '8 weeks',
      students: 750,
      rating: 4.7,
      level: 'Intermediate',
    },
    {
      id: 'cdl-training',
      title: 'CDL Training',
      description: 'Prepare for your Commercial Driver License with comprehensive training.',
      image: '/hero-images/cdl-transportation-category.jpg',
      duration: '3-4 weeks',
      students: 560,
      rating: 4.9,
      level: 'Beginner',
    },
    {
      id: 'barber-apprenticeship',
      title: 'Barber Apprenticeship',
      description: 'Learn professional barbering techniques from licensed master barbers.',
      image: '/hero-images/barber-beauty-category.jpg',
      duration: '15-17 months',
      students: 320,
      rating: 4.8,
      level: 'All Levels',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Hero */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://pub-23811be4d3844e45a8bc2d3dc5e7aaec.r2.dev/videos/student-portal-hero.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Interactive Courses</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Engaging lessons with quizzes, assignments, and hands-on activities
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse by Category</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {courseCategories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <div className="relative h-36">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-bold text-lg">{category.title}</h3>
                    <p className="text-white/80 text-sm">{category.count} courses</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Course Grid */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">All Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => {
              const isEnrolled = enrolledCourseIds.has(course.id);
              const enrollment = enrollmentMap.get(course.id);
              
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
                >
                  <div className="relative h-44">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                        {course.level}
                      </span>
                    </div>
                    {isEnrolled && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                          Enrolled
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 mb-2">{course.title}</h3>
                    <p className="text-slate-600 text-sm mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students.toLocaleString()}
                      </span>
                    </div>
                    {isEnrolled ? (
                      <Link
                        href={`/lms/courses/${course.id}`}
                        className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg font-medium transition"
                      >
                        Continue Learning ({enrollment?.progress || 0}%)
                      </Link>
                    ) : (
                      <Link
                        href={`/lms/courses/${course.id}`}
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-medium transition"
                      >
                        View Course
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Database Courses */}
          {courses && courses.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">More Courses</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.slice(0, 6).map((course: any) => (
                  <Link
                    key={course.id}
                    href={`/lms/courses/${course.id}`}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
                  >
                    <div className="relative h-40">
                      <Image
                        src={course.thumbnail_url || '/hero-images/how-it-works-hero.jpg'}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 mb-2">{course.title}</h3>
                      <p className="text-slate-600 text-sm line-clamp-2">
                        {course.description || 'Start your learning journey'}
                      </p>
                      <span className="inline-flex items-center gap-1 text-blue-600 font-medium text-sm mt-3">
                        View Course <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
