import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle, ArrowRight, Play, Star, BookOpen, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Management System | Elevate for Humanity',
  description: 'Access interactive courses, video lessons, quizzes, and collaboration tools.',
};

export default function LMSLandingPage() {
  const courses = [
    { title: 'Healthcare Fundamentals', duration: '4-6 weeks', students: '500+', rating: 4.9, href: '/programs/healthcare', color: 'from-blue-500 to-blue-700' },
    { title: 'HVAC Technician Training', duration: '6-12 months', students: '300+', rating: 4.8, href: '/programs/hvac', color: 'from-orange-500 to-red-600' },
    { title: 'CDL Training', duration: '3-4 weeks', students: '400+', rating: 4.9, href: '/programs/cdl', color: 'from-green-500 to-green-700' },
    { title: 'Barber Apprenticeship', duration: '15-18 months', students: '200+', rating: 4.8, href: '/programs/barber', color: 'from-purple-500 to-purple-700' },
    { title: 'Business Management', duration: '8-10 weeks', students: '350+', rating: 4.9, href: '/programs/business', color: 'from-indigo-500 to-indigo-700' },
    { title: 'Medical Assistant', duration: '8-12 weeks', students: '450+', rating: 4.9, href: '/programs/healthcare', color: 'from-teal-500 to-teal-700' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 px-4 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Learn Skills That Matter</h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Access industry-leading training programs, earn certifications, and launch your career.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/programs" className="bg-white text-teal-700 px-8 py-4 rounded-lg font-bold hover:bg-teal-50 transition">Browse Programs</Link>
            <Link href="/apply" className="bg-teal-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-teal-800 transition border border-white/30">Apply Now</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link key={course.title} href={course.href} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group">
                <div className={`h-32 bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                  <Play className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{course.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our LMS?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert-Led Courses</h3>
              <p className="text-gray-600">Learn from industry professionals with real-world experience.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Industry Certifications</h3>
              <p className="text-gray-600">Earn recognized credentials that employers value.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Career Support</h3>
              <p className="text-gray-600">Get job placement assistance and career coaching.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-teal-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of students building their careers with us.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/programs" className="bg-white text-teal-700 px-8 py-4 rounded-lg font-bold hover:bg-teal-50 transition">View All Programs</Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
