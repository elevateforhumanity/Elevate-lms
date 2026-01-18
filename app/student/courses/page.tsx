import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { BookOpen, Clock, CheckCircle, Play, Award } from 'lucide-react';

export const metadata: Metadata = { title: 'My Courses | Student Portal' };
export const dynamic = 'force-dynamic';

export default async function StudentCoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const courses = [
    { id: '1', title: 'HVAC Fundamentals', progress: 75, totalLessons: 24, completedLessons: 18, status: 'in_progress' },
    { id: '2', title: 'EPA 608 Certification Prep', progress: 100, totalLessons: 12, completedLessons: 12, status: 'completed' },
    { id: '3', title: 'Customer Service Excellence', progress: 30, totalLessons: 8, completedLessons: 2, status: 'in_progress' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/student" className="hover:text-blue-600">Student Portal</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">My Courses</span>
          </nav>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Courses</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white opacity-80" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.completedLessons}/{course.totalLessons} lessons
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${course.progress === 100 ? 'bg-green-600' : 'bg-blue-600'}`} style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
                <Link href={`/lms/courses/${course.id}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium flex items-center justify-center">
                  {course.progress === 100 ? <><Award className="w-4 h-4 mr-2" />View Certificate</> : <><Play className="w-4 h-4 mr-2" />Continue</>}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
