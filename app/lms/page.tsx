import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { CheckCircle, ArrowRight, Play, Star, BookOpen } from 'lucide-react';

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
      image: '/media/programs/cpr-group-training-hd.jpg',
      title: 'Video Lessons',
      description: 'High-quality video content with expert instructors',
      href: '/programs',
    },
    {
      image: '/media/programs/cna-hd.jpg',
      title: 'Interactive Courses',
      description: 'Engaging lessons with quizzes and hands-on activities',
      href: '/programs',
    },
    {
      image: '/media/programs/cpr-certification-group-hd.jpg',
      title: 'Discussion Forums',
      description: 'Connect with classmates and instructors',
      href: '/programs',
    },
    {
      image: '/media/programs/workforce-readiness-hero.jpg',
      title: 'Earn Certificates',
      description: 'Get recognized for completing courses',
      href: '/programs',
    },
    {
      image: '/media/programs/cpr-individual-practice-hd.jpg',
      title: 'Live Chat Support',
      description: '24/7 help when you need it',
      href: '/contact',
    },
    {
      image: '/media/programs/hvac-highlight-3.jpg',
      title: 'Track Progress',
      description: 'Monitor your learning journey in real-time',
      href: '/programs',
    },
  ];

  const courses = [
    {
      title: 'Healthcare Fundamentals',
      instructor: 'Dr. Sarah Johnson',
      students: 'Multiple cohorts',
      rating: 4.9,
      image: '/hero-images/healthcare-category.jpg',
      href: '/programs/healthcare',
      duration: '4-6 weeks',
      level: 'Beginner',
    },
    {
      title: 'HVAC Technician Training',
      instructor: 'Mike Rodriguez',
      students: 'Multiple cohorts',
      rating: 4.8,
      image: '/hero-images/skilled-trades-category.jpg',
      href: '/programs/hvac-technician',
      duration: '6-12 months',
      level: 'Beginner to Advanced',
    },
    {
      title: 'Business Management',
      instructor: 'Jennifer Lee',
      students: 'Multiple cohorts',
      rating: 4.9,
      image: '/hero-images/business-category.jpg',
      href: '/programs/business',
      duration: '8-10 weeks',
      level: 'Intermediate',
    },
    {
      title: 'CDL Training',
      instructor: 'James Wilson',
      students: 'Multiple cohorts',
      rating: 4.9,
      image: '/hero-images/cdl-transportation-category.jpg',
      href: '/programs/cdl-transportation',
      duration: '3-4 weeks',
      level: 'Beginner',
    },
    {
      title: 'Barber Apprenticeship',
      instructor: 'Licensed Barber Mentors',
      students: 'Multiple cohorts',
      rating: 4.8,
      image: '/hero-images/barber-hero.jpg',
      href: '/programs/barber-apprenticeship',
      duration: '15-17 months',
      level: 'Beginner to Advanced',
    },
    {
      title: 'Medical Assistant',
      instructor: 'Dr. Emily Chen',
      students: 'Multiple cohorts',
      rating: 4.9,
      image: '/media/programs/cna-hd.jpg',
      href: '/programs/healthcare',
      duration: '8-12 weeks',
      level: 'Beginner',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Course Teaser Style */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-teal-600 to-teal-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              {/* Logo */}
              <div className="mb-6">
                <Image
                  src="/logo.png"
                  alt="Elevate for Humanity"
                  width={150}
                  height={60}
                  className="brightness-0 invert"
                />
              </div>

              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  Learning Management System
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight uppercase">
                Learn Anywhere, Anytime
              </h1>

              <p className="text-xl text-teal-100 mb-8 leading-relaxed">
                Access interactive courses, video lessons, quizzes, and
                collaboration tools. Learn at your own pace with our modern LMS
                platform.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-black mb-1">50+</div>
                  <div className="text-xs text-teal-100">Courses</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-black mb-1">5,000+</div>
                  <div className="text-xs text-teal-100">Students</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl font-black mb-1">24/7</div>
                  <div className="text-xs text-teal-100">Access</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboards"
                  className="inline-flex items-center justify-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:bg-orange-600 hover:scale-105 transition-all"
                >
                  <span>Access LMS</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#courses"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-teal-600 transition-all"
                >
                  <Play className="w-5 h-5" />
                  <span>Browse Courses</span>
                </Link>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/images/lms-hero-banner.png"
                  alt="LMS Platform - Interactive Learning"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Our LMS platform provides all the tools and resources for
              effective online learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              return (
                <Link
                  key={idx}
                  href={feature.href}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 hover:border-teal-500 hover:shadow-xl transition-all group"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-teal-600 transition-colors">
                      {feature.title} →
                    </h3>
                    <p className="text-black leading-relaxed mb-4">
                      {feature.description}
                    </p>
                    <span className="text-teal-600 font-semibold text-sm">
                      Learn More →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our LMS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Why Choose Our LMS?
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Modern learning platform designed for workforce development
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Learn at Your Own Pace
                </h3>
                <p className="text-black">
                  Access courses anytime, anywhere. Study when it fits your
                  schedule.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Expert Instructors
                </h3>
                <p className="text-black">
                  Learn from industry professionals with real-world experience.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Interactive Learning
                </h3>
                <p className="text-black">
                  Engage with videos, quizzes, discussions, and hands-on
                  projects.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Mobile Friendly
                </h3>
                <p className="text-black">
                  Learn on any device - desktop, tablet, or smartphone.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Track Your Progress
                </h3>
                <p className="text-black">
                  Monitor completion, grades, and achievements in real-time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-black mb-2">
                  Earn Certificates
                </h3>
                <p className="text-black">
                  Receive industry-recognized certificates upon completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Courses Section */}
      <section id="courses" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Available Courses
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Explore our training programs - each course has its own dedicated
              page with full details
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <Link
                key={idx}
                href={course.href}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 hover:border-teal-500 hover:shadow-2xl transition-all hover:-translate-y-2 transform group"
              >
                <div className="relative h-48 bg-gradient-to-br from-teal-500 to-teal-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white opacity-50" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-teal-600">
                    {course.level}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2 group-hover:text-teal-600 transition-colors">
                    {course.title} →
                  </h3>
                  <p className="text-black mb-3 text-sm">
                    Instructor: {course.instructor}
                  </p>
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-black">
                        {course.rating}
                      </span>
                    </div>
                    <div className="text-black">{course.duration}</div>
                  </div>
                  <div className="text-teal-600 font-semibold text-sm">
                    View Course Details →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-700 transition-colors"
            >
              View All Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-8 h-8 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl font-bold text-black mb-6 leading-relaxed">
            "The LMS platform made learning so easy. I could study at my own
            pace and the instructors were always available to help."
          </blockquote>
          <p className="text-xl text-black">
            — Marcus Thompson, CNA Graduate
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/logo.png"
              alt="Elevate for Humanity"
              width={150}
              height={60}
              className="mx-auto brightness-0 invert"
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-orange-100 mb-10">
            Join 5,000+ students already learning on our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="inline-flex items-center gap-3 bg-white text-orange-600 px-10 py-5 rounded-xl text-lg font-black shadow-2xl hover:scale-105 transition-all"
            >
              <span>Apply Now - 100% Free</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              href="/lms/dashboard"
              className="inline-flex items-center gap-3 bg-orange-700 border-2 border-white text-white px-10 py-5 rounded-xl text-lg font-black hover:bg-orange-800 transition-all"
            >
              <span>Access LMS</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
          <p className="text-orange-100 mt-6">
            Already enrolled? Log in to access your courses
          </p>
        </div>
      </section>
    </div>
  );
}
