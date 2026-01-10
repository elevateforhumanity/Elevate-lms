'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { BookOpen, Clock, Award, DollarSign, CheckCircle, Users } from 'lucide-react';
import Link from 'next/link';

export default function ProgramCoursesPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/programs/${slug}/courses`)
      .then(res => res.json())
      .then(data => {
        setCourses(data.courses || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleEnroll = async (courseId: string, price: number) => {
    if (price === 0) {
      window.location.href = `/courses/${courseId}/enroll`;
      return;
    }

    const response = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseId,
        priceId: `price_${courseId}`,
        successUrl: `${window.location.origin}/courses/${courseId}/success`,
        cancelUrl: window.location.href
      })
    });

    const { url } = await response.json();
    if (url) window.location.href = url;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Available Courses</h1>
          <p className="text-xl">Choose a course to start your learning journey</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {courses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Courses Available Yet</h2>
            <p className="text-gray-600 mb-6">Courses for this program are coming soon.</p>
            <Link href="/programs" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">
              Browse Other Programs
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <img 
                  src={course.image || '/images/courses/default-course.jpg'} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration || '8 weeks'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons || 24} lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{course.enrolled || 0} enrolled</span>
                    </div>
                    {course.certification && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Award className="w-4 h-4" />
                        <span>Certificate included</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {course.price === 0 ? (
                          <div className="text-2xl font-bold text-green-600">FREE</div>
                        ) : (
                          <>
                            <div className="text-2xl font-bold text-gray-900">${course.price}</div>
                            {course.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">${course.originalPrice}</div>
                            )}
                          </>
                        )}
                      </div>
                      {course.funding && (
                        <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {course.funding}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleEnroll(course.id, course.price)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                    >
                      {course.price === 0 ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Enroll Free
                        </>
                      ) : (
                        <>
                          <DollarSign className="w-5 h-5" />
                          Enroll Now
                        </>
                      )}
                    </button>
                  </div>

                  <Link 
                    href={`/courses/${course.id}`}
                    className="block text-center text-blue-600 hover:text-blue-700 text-sm font-semibold"
                  >
                    View Course Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
