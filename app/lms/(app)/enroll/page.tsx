'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, BookOpen, Clock, AlertCircle } from 'lucide-react';

interface Application {
  id: string;
  status: string;
  program_id: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration_hours: number;
  thumbnail_url: string;
}

interface Enrollment {
  id: string;
  course_id: string;
  status: string;
  progress: number;
  courses: Course;
}

export default function EnrollPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState<Application | null>(null);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [enrolling, setEnrolling] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login?redirect=/lms/enroll');
      return;
    }

    // Check application status
    const { data: app } = await supabase
      .from('applications')
      .select('*')
      .eq('email', user.email)
      .eq('status', 'approved')
      .order('submitted_at', { ascending: false })
      .limit(1)
      .single();

    setApplication(app);

    // Get existing enrollments
    const { data: existingEnrollments } = await supabase
      .from('enrollments')
      .select('*, courses(*)')
      .eq('user_id', user.id);

    setEnrollments(existingEnrollments || []);

    // Get available courses
    const { data: courses } = await supabase
      .from('courses')
      .select('*')
      .eq('status', 'published')
      .order('title');

    // Filter out already enrolled courses
    const enrolledCourseIds = new Set(existingEnrollments?.map(e => e.course_id) || []);
    const available = courses?.filter(c => !enrolledCourseIds.has(c.id)) || [];
    setAvailableCourses(available);

    setLoading(false);
  };

  const handleEnroll = async (courseId: string) => {
    setEnrolling(courseId);

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        // Refresh data
        await loadData();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to enroll');
      }
    } catch {
      alert('Failed to enroll. Please try again.');
    } finally {
      setEnrolling(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // If no approved application, redirect to apply
  if (!application) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Application Required</h1>
          <p className="text-gray-600 mb-6">
            You need an approved application before you can enroll in courses.
          </p>
          <Link
            href="/lms/apply"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
          >
            Submit Application
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Already applied?{' '}
            <Link href="/lms/apply/status" className="text-emerald-600 hover:underline">
              Check your status
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Course Enrollment</h1>
        <p className="text-gray-600 mt-2">Select courses to begin your training</p>
      </div>

      {/* Current Enrollments */}
      {enrollments.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Your Enrollments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{enrollment.courses?.title}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm px-2 py-1 rounded ${
                      enrollment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      enrollment.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {enrollment.status}
                    </span>
                    <span className="text-sm text-gray-500">{enrollment.progress}% complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-emerald-600 h-2 rounded-full"
                      style={{ width: `${enrollment.progress}%` }}
                    />
                  </div>
                  <Link
                    href={`/lms/courses/${enrollment.course_id}`}
                    className="block text-center bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
                  >
                    {enrollment.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Courses */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
        {availableCourses.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-600">You're enrolled in all available courses!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {course.description || 'No description available'}
                  </p>
                  {course.duration_hours && (
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration_hours} hours
                    </div>
                  )}
                  <button
                    onClick={() => handleEnroll(course.id)}
                    disabled={enrolling === course.id}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {enrolling === course.id ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
