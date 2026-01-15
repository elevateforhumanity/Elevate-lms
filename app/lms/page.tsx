import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Management System | Elevate for Humanity',
  description:
    'Access interactive courses, video lessons, quizzes, and collaboration tools. Learn at your own pace with our modern LMS platform.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/lms',
  },
};

export default function LMSLandingPage() {
  const features = [
    {
      image: '/hero-images/healthcare-category.jpg',
      title: 'Video Lessons',
      description: 'High-quality video content with expert instructors',
      href: '/lms/video',
    },
    {
      image: '/hero-images/skilled-trades-category.jpg',
      title: 'Interactive Courses',
      description: 'Engaging lessons with quizzes and hands-on activities',
      href: '/lms/courses',
    },
    {
      image: '/hero-images/business-category.jpg',
      title: 'Discussion Forums',
      description: 'Connect with classmates and instructors',
      href: '/lms/community',
    },
    {
      image: '/hero-images/technology-category.jpg',
      title: 'Earn Certificates',
      description: 'Get recognized for completing courses',
      href: '/lms/certificates',
    },
    {
      image: '/hero-images/cdl-transportation-category.jpg',
      title: 'Live Chat Support',
      description: '24/7 help when you need it',
      href: '/lms/support',
    },
    {
      image: '/hero-images/barber-beauty-category.jpg',
      title: 'Track Progress',
      description: 'Monitor your learning journey in real-time',
      href: '/lms/progress',
    },
  ];

  const courses = [
    {
      title: 'Healthcare Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      students: 'Multiple cohorts',
      rating: 4.9,
      image: '/hero-images/healthcare-cat-new.jpg',
      href: '/programs/healthcare',
      duration: '4-6 weeks',
      level: 'Beginner',
    },
    {
      title: 'HVAC Technician Training',
      instructor: 'Mike Rodriguez',
      students: 'Multiple cohorts',
      rating: 4.8,
      image: '/hero-images/skilled-trades-cat-new.jpg',
      href: '/programs/hvac-technician',
      duration: '6-12 months',
      level: 'Beginner to Advanced',
    },
    {
      title: 'Business Management',
      instructor: 'Jennifer Lee',
      students: 'Multiple cohorts',
      rating: 4.9,
      image: '/hero-images/business-hero.jpg',
      href: '/programs/business',
      duration: '8-10 weeks',
      level: 'Intermediate',
    },
    {
      title: 'CDL Training',
      instructor: 'James Wilson',
      students: 'Multiple cohorts',
      rating: 4.9,
      image: '/hero-images/cdl-cat-new.jpg',
      href: '/programs/cdl-transportation',
      duration: '3-4 weeks',
      level: 'Beginner',
    },
    {
      title: 'Barber Apprenticeship',
      instructor: 'Licensed Barber Mentors',
      students: 'Multiple cohorts',
      rating: 4.8,
      image: '/hero-images/barber-beauty-cat-new.jpg',
      href: '/programs/barber-apprenticeship',
      duration: '15-17 months',
      level: 'Beginner to Advanced',
    },
    {
      title: 'Technology & IT',
      instructor: 'Tech Industry Experts',
      students: 'Multiple cohorts',
      rating: 4.9,
      image: '/hero-images/technology-cat-new.jpg',
      href: '/programs/technology',
      duration: '8-12 weeks',
      level: 'Beginner',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Video Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center text-white overflow-hidden">
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
          <Image
            src="/logo.png"
            alt="Elevate for Humanity"
            width={150}
            height={60}
            className="brightness-0 invert mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Learning Management System
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Access interactive courses, video lessons, and collaboration tools. Learn at your own pace.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/lms/dashboard"
              className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-50 transition shadow-lg"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/lms/courses"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur text-white px-8 py-4 rounded-lg font-semibold text-lg transition border border-white/30"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Platform Features
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to succeed in your learning journey
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Popular Programs
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Start your career journey with our most popular training programs
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.title}
                href={course.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                    <p className="text-white/80 text-sm">{course.instructor}</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">
                    {course.rating} ★
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between text-sm text-slate-600 mb-3">
                    <span>{course.duration}</span>
                    <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs font-medium">
                      {course.level}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-teal-600 font-medium text-sm group-hover:gap-2 transition-all">
                    View Program <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition"
            >
              View All Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of students building their careers with free training programs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-50 transition"
            >
              Apply Now - It&apos;s Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition border border-white/30"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
