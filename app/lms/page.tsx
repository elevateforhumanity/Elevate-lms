import Link from 'next/link';
import { Metadata } from 'next';
import { Play, Star, Clock, Users, BookOpen, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'LMS | Elevate for Humanity',
  description: 'Access courses and training programs.',
};

export default function LMSPage() {
  const courses = [
    { title: 'Healthcare Fundamentals', duration: '4-6 weeks', students: '500+', rating: 4.9, href: '/programs/healthcare', color: 'from-blue-500 to-blue-700' },
    { title: 'HVAC Technician', duration: '6-12 months', students: '300+', rating: 4.8, href: '/programs/skilled-trades', color: 'from-orange-500 to-red-600' },
    { title: 'CDL Training', duration: '3-4 weeks', students: '400+', rating: 4.9, href: '/programs/cdl-transportation', color: 'from-green-500 to-green-700' },
    { title: 'Barber Apprenticeship', duration: '15-18 months', students: '200+', rating: 4.8, href: '/programs/barber-apprenticeship', color: 'from-purple-500 to-purple-700' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="py-10 md:py-16 px-4 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-3">Learn Skills That Matter</h1>
          <p className="text-sm md:text-lg opacity-90 mb-6">Access industry training and earn certifications.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/programs" className="bg-white text-teal-700 px-6 py-2.5 rounded-lg text-sm font-bold">Browse Programs</Link>
            <Link href="/apply" className="border border-white/50 px-6 py-2.5 rounded-lg text-sm font-bold">Apply Now</Link>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Popular Programs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.map((course) => (
              <Link key={course.title} href={course.href} className="bg-white rounded-xl shadow border overflow-hidden hover:shadow-lg transition">
                <div className={`h-20 md:h-28 bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white opacity-80" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm md:text-base mb-2">{course.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{course.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-6">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <BookOpen className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <h3 className="font-bold text-sm mb-1">Expert Instructors</h3>
              <p className="text-xs text-gray-600">Learn from industry pros</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <CheckCircle className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <h3 className="font-bold text-sm mb-1">Certifications</h3>
              <p className="text-xs text-gray-600">Earn recognized credentials</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Users className="w-8 h-8 text-teal-600 mx-auto mb-2" />
              <h3 className="font-bold text-sm mb-1">Job Placement</h3>
              <p className="text-xs text-gray-600">Career support included</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-teal-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-3">Ready to Start?</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/programs" className="bg-white text-teal-700 px-6 py-2.5 rounded-lg text-sm font-bold">View Programs</Link>
            <Link href="/contact" className="border border-white/50 px-6 py-2.5 rounded-lg text-sm font-bold">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
