import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronRight,
  TrendingUp,
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  Target,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Progress | Student Portal',
  description: 'Track your learning progress and achievements.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

interface CourseProgress {
  id: string;
  name: string;
  progress: number;
  modules_completed: number;
  total_modules: number;
  hours_spent: number;
  last_activity: string;
}

export default async function StudentProgressPage() {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Database connection failed.</p>
        </div>
      </div>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login?next=/student/progress');

  // Sample progress data
  const courses: CourseProgress[] = [
    {
      id: '1',
      name: 'Barbering Fundamentals',
      progress: 65,
      modules_completed: 13,
      total_modules: 20,
      hours_spent: 32,
      last_activity: '2026-01-18T10:30:00Z',
    },
    {
      id: '2',
      name: 'Business Management for Barbers',
      progress: 30,
      modules_completed: 3,
      total_modules: 10,
      hours_spent: 8,
      last_activity: '2026-01-17T14:00:00Z',
    },
  ];

  const overallProgress = Math.round(
    courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
  );

  const totalHours = courses.reduce((sum, c) => sum + c.hours_spent, 0);
  const totalModules = courses.reduce((sum, c) => sum + c.modules_completed, 0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/student" className="hover:text-gray-700">Student Portal</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Progress</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>
          <p className="text-gray-600 mt-1">Track your learning journey</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{overallProgress}%</p>
            <p className="text-sm text-gray-500">Overall Progress</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalModules}</p>
            <p className="text-sm text-gray-500">Modules Done</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
            <p className="text-sm text-gray-500">Hours Spent</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            <p className="text-sm text-gray-500">Active Courses</p>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Course Progress</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {courses.map((course) => (
              <div key={course.id} className="px-6 py-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-500">
                        {course.modules_completed} of {course.total_modules} modules completed
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{course.progress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.hours_spent} hours
                    </span>
                    <span>Last activity: {formatDate(course.last_activity)}</span>
                  </div>
                  <Link
                    href={`/lms/course/${course.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">Weekly Learning Goal</h2>
              <p className="text-green-100">Complete 5 modules this week</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">3/5</p>
              <p className="text-green-100">modules</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
