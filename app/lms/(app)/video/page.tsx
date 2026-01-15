import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play } from 'lucide-react';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Video Lessons | LMS',
  description: 'Access video lessons and training content for your enrolled courses.',
};

export default async function VideoLessonsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch user's enrolled courses with video content
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      courses (
        id,
        title,
        description,
        thumbnail_url
      )
    `)
    .eq('user_id', user.id)
    .in('status', ['active', 'in_progress']);

  // Fetch available video lessons
  const { data: videos } = await supabase
    .from('lessons')
    .select('*')
    .eq('type', 'video')
    .order('created_at', { ascending: false })
    .limit(20);

  const videoCategories = [
    {
      image: '/hero-images/healthcare-category.jpg',
      title: 'Healthcare Training',
      description: 'CNA, Medical Assistant, and healthcare fundamentals',
      count: 24,
      href: '/lms/courses?category=healthcare',
    },
    {
      image: '/hero-images/skilled-trades-category.jpg',
      title: 'Skilled Trades',
      description: 'HVAC, electrical, plumbing, and construction',
      count: 18,
      href: '/lms/courses?category=trades',
    },
    {
      image: '/hero-images/technology-category.jpg',
      title: 'Technology & IT',
      description: 'IT support, cybersecurity, and web development',
      count: 32,
      href: '/lms/courses?category=technology',
    },
    {
      image: '/hero-images/business-category.jpg',
      title: 'Business Skills',
      description: 'Management, entrepreneurship, and professional development',
      count: 15,
      href: '/lms/courses?category=business',
    },
  ];

  const featuredVideos = [
    {
      image: '/hero-images/healthcare-cat-new.jpg',
      title: 'Introduction to Patient Care',
      duration: '12:45',
      instructor: 'Dr. Sarah Johnson',
      href: '/lms/courses/healthcare-fundamentals',
    },
    {
      image: '/hero-images/skilled-trades-cat-new.jpg',
      title: 'HVAC Safety Fundamentals',
      duration: '18:30',
      instructor: 'Mike Rodriguez',
      href: '/lms/courses',
    },
    {
      image: '/hero-images/technology-cat-new.jpg',
      title: 'IT Support Basics',
      duration: '22:15',
      instructor: 'Tech Team',
      href: '/lms/courses',
    },
    {
      image: '/hero-images/business-hero.jpg',
      title: 'Professional Communication',
      duration: '15:00',
      instructor: 'Jennifer Lee',
      href: '/lms/courses',
    },
    {
      image: '/hero-images/barber-beauty-cat-new.jpg',
      title: 'Barbering Techniques 101',
      duration: '25:30',
      instructor: 'Master Barbers',
      href: '/lms/courses',
    },
    {
      image: '/hero-images/cdl-cat-new.jpg',
      title: 'CDL Pre-Trip Inspection',
      duration: '20:00',
      instructor: 'James Wilson',
      href: '/lms/courses',
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
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/artlist/hero-training-1.jpg"
        >
          <source src="/videos/student-portal-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/85 to-teal-700/75" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Video Lessons</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Learn from expert instructors with high-quality video content
          </p>
        </div>
      </section>

      {/* Video Categories */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {videoCategories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold mb-1">{category.title}</h3>
                    <p className="text-white/80 text-sm mb-2">{category.description}</p>
                    <span className="text-teal-300 text-sm font-medium">{category.count} videos</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Videos */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Featured Videos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <Link
                key={video.title}
                href={video.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-teal-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-teal-600 transition">
                    {video.title}
                  </h3>
                  <p className="text-slate-500 text-sm">{video.instructor}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* My Enrolled Courses */}
          {enrollments && enrollments.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6">My Course Videos</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrollments.map((enrollment: any) => (
                  <Link
                    key={enrollment.id}
                    href={`/lms/courses/${enrollment.courses?.id}`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={enrollment.courses?.thumbnail_url || '/hero-images/healthcare-category.jpg'}
                        alt={enrollment.courses?.title || 'Course'}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-teal-600 text-white px-2 py-1 rounded text-xs font-medium">
                          Enrolled
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 mb-1">
                        {enrollment.courses?.title || 'Course'}
                      </h3>
                      <p className="text-slate-500 text-sm line-clamp-2">
                        {enrollment.courses?.description || 'Continue your learning journey'}
                      </p>
                      <span className="inline-flex items-center gap-1 text-teal-600 font-medium text-sm mt-2 group-hover:gap-2 transition-all">
                        Continue Learning <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Empty State */}
          {(!enrollments || enrollments.length === 0) && (!videos || videos.length === 0) && (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center mt-8">
              <Image
                src="/hero-images/how-it-works-hero.jpg"
                alt="Get started"
                width={300}
                height={200}
                className="mx-auto rounded-lg mb-6 opacity-80"
              />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Start Your Learning Journey</h3>
              <p className="text-slate-500 mb-6">Enroll in a program to access video lessons and training content</p>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Browse Programs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
