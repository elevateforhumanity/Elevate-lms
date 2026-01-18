import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Store, Search, Filter, Star, Users, Clock, ChevronRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Marketplace | Elevate LMS' };

export default function MarketplacePage() {
  const categories = ['All', 'Trades', 'Healthcare', 'Technology', 'Business', 'Creative'];
  
  const courses = [
    { id: '1', title: 'Advanced Welding Techniques', creator: 'John Masters', price: 199, rating: 4.9, students: 1234, duration: '8 hours', image: 'https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '2', title: 'Medical Coding Essentials', creator: 'Sarah Health', price: 149, rating: 4.8, students: 2345, duration: '12 hours', image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '3', title: 'Cybersecurity Fundamentals', creator: 'Tech Academy', price: 249, rating: 4.7, students: 3456, duration: '20 hours', image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '4', title: 'Project Management Pro', creator: 'Business School', price: 179, rating: 4.8, students: 1567, duration: '15 hours', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '5', title: 'Graphic Design Mastery', creator: 'Creative Hub', price: 129, rating: 4.6, students: 987, duration: '10 hours', image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: '6', title: 'Plumbing Basics', creator: 'Trade Skills', price: 99, rating: 4.9, students: 2134, duration: '6 hours', image: 'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-indigo-900 text-white py-16">
        <Image
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Marketplace"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Store className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Course Marketplace</h1>
          </div>
          <p className="text-xl text-indigo-100 max-w-2xl mb-8">
            Discover courses from expert creators and expand your skills
          </p>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search courses..." className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Filter className="w-5 h-5 text-gray-500" />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} className={`px-4 py-2 rounded-lg text-sm ${cat === 'All' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/marketplace/course/${course.id}`} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-3">by {course.creator}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-current" /> {course.rating}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.students.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                  <span className="text-indigo-600 flex items-center gap-1 text-sm font-medium">
                    View <ChevronRight className="w-4 h-4" />
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
