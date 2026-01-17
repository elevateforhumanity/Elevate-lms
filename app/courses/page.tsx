import { Metadata } from 'next';
import Link from 'next/link';
import {
  Clock,
  Award,
  Users,
  Search,
  ArrowRight,
  Star,
  CheckCircle,
  BookOpen,
  Play,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Course Catalog | Elevate For Humanity',
  description: 'Professional certification courses. CPR, OSHA, forklift, and more.',
};

const COURSES = [
  {
    id: 'cpr',
    title: 'CPR & First Aid Certification',
    slug: 'cpr-certification',
    description: 'American Heart Association certified CPR, AED, and First Aid training. Required for healthcare careers.',
    duration: '4 hours',
    price: 75,
    format: 'In-Person',
    certification: 'AHA Certified',
    image: '/images/healthcare/cpr-certification-group.jpg',
    rating: 4.9,
    students: 1250,
  },
  {
    id: 'osha-10',
    title: 'OSHA 10-Hour Safety',
    slug: 'osha-10',
    description: 'OSHA-authorized safety training for construction and general industry. Get your OSHA card.',
    duration: '10 hours',
    price: 89,
    format: 'Online',
    certification: 'OSHA Card',
    image: '/images/certifications/osha.jpg',
    rating: 4.8,
    students: 890,
  },
  {
    id: 'forklift',
    title: 'Forklift Operator Certification',
    slug: 'forklift-certification',
    description: 'OSHA-compliant forklift training with hands-on practical exam. Same-day certification.',
    duration: '8 hours',
    price: 150,
    format: 'In-Person',
    certification: 'OSHA Compliant',
    image: '/images/transportation/forklift.jpg',
    rating: 4.9,
    students: 650,
  },
  {
    id: 'food-handlers',
    title: 'Food Handler Certification',
    slug: 'food-handlers',
    description: 'State-approved food safety training. Required for restaurant and food service jobs.',
    duration: '2 hours',
    price: 15,
    format: 'Online',
    certification: 'State Approved',
    image: '/images/hospitality/culinary.jpg',
    rating: 4.7,
    students: 2100,
  },
  {
    id: 'comptia',
    title: 'CompTIA A+ Prep Course',
    slug: 'comptia-a-plus',
    description: 'Comprehensive preparation for CompTIA A+ certification exams. Launch your IT career.',
    duration: '80 hours',
    price: 499,
    format: 'Hybrid',
    certification: 'CompTIA A+',
    image: '/images/technology/hero-program-it-support.jpg',
    rating: 4.8,
    students: 320,
  },
  {
    id: 'excel',
    title: 'Advanced Excel for Business',
    slug: 'excel-advanced',
    description: 'Master pivot tables, VLOOKUP, macros, and data analysis. Essential office skills.',
    duration: '16 hours',
    price: 149,
    format: 'Online',
    certification: 'Certificate',
    image: '/images/business/professional-2.jpg',
    rating: 4.8,
    students: 720,
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Image */}
      <section className="relative">
        <div className="relative h-[400px] sm:h-[450px]">
          <img
            src="/images/efh/sections/classroom.jpg"
            alt="Professional training"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <BookOpen className="w-4 h-4" />
                  Professional Certifications
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                  Course Catalog
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  Industry-recognized certifications to advance your career. 
                  Online and in-person options available.
                </p>
                
                {/* Search */}
                <div className="relative max-w-lg">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search courses..."
                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            <div className="text-center">
              <div className="text-2xl font-bold">50+</div>
              <div className="text-blue-100 text-sm">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">5,000+</div>
              <div className="text-blue-100 text-sm">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-blue-100 text-sm">Avg Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-blue-100 text-sm">Pass Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {['All Courses', 'Safety', 'Healthcare', 'Technology', 'Business'].map((cat, i) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    i === 0
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white">
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {course.format}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white text-gray-900 text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {course.rating}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs font-medium text-blue-600 mb-2">{course.certification}</div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-2xl font-bold text-gray-900">
                      ${course.price}
                    </span>
                    <span className="inline-flex items-center gap-1 text-blue-600 font-medium">
                      Enroll Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img
            src="/images/efh/sections/coaching.jpg"
            alt="Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/80" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our advisors can help you find the right courses for your career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition"
            >
              Talk to an Advisor
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition border-2 border-white"
            >
              View Full Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
