import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Clock, Users, Star, Filter, Search, ChevronRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Courses | Elevate LMS' };

export default function CoursesPage() {
  const courses = [
    { id: '1', title: 'HVAC Fundamentals', category: 'Trades', duration: '12 weeks', students: 1234, rating: 4.8, level: 'Beginner', image: '/images/trades/hero-program-hvac.jpg' },
    { id: '2', title: 'Medical Assistant Certification', category: 'Healthcare', duration: '16 weeks', students: 2156, rating: 4.9, level: 'Beginner', image: '/images/healthcare/program-cna-training.jpg' },
    { id: '3', title: 'Professional Barber License', category: 'Beauty', duration: '10 weeks', students: 876, rating: 4.7, level: 'Beginner', image: '/images/barber-hero.jpg' },
    { id: '4', title: 'CDL Class A Training', category: 'Transportation', duration: '8 weeks', students: 1567, rating: 4.8, level: 'Beginner', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '5', title: 'Advanced HVAC Systems', category: 'Trades', duration: '8 weeks', students: 456, rating: 4.6, level: 'Advanced', image: '/images/trades/hero-program-hvac.jpg' },
    { id: '6', title: 'Phlebotomy Technician', category: 'Healthcare', duration: '6 weeks', students: 789, rating: 4.7, level: 'Beginner', image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  const categories = ['All', 'Trades', 'Healthcare', 'Beauty', 'Transportation', 'Technology'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-slate-900 text-white py-16">
        <Image
          src="/images/hero/hero-hands-on-training.jpg"
          alt="Courses"
          fill
          className="object-cover opacity-40"
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
                <button key={cat} className={`px-4 py-2 rounded-lg text-sm ${cat === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search courses..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-64" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{course.category}</span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{course.level}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{course.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900">{course.rating}</span>
                  </div>
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
