import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, Award, TrendingUp, Target, Calendar } from 'lucide-react';
import LMSNav from '@/components/lms/LMSNav';
import LoginTracker from '@/components/lms/LoginTracker';
import AttendanceTracker from '@/components/lms/AttendanceTracker';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { ProgressChart } from '@/components/dashboard/ProgressChart';
import { UpcomingCalendar } from '@/components/dashboard/UpcomingCalendar';
import { getCurrentUser, requireStudent } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/auth';

export const metadata = {
  title: 'Dashboard | Elevate LMS',
  description: 'Your learning dashboard',
};

const stats = [
  { label: 'Courses Enrolled', value: '4', icon: BookOpen, change: '+1 this month' },
  { label: 'Hours Completed', value: '42', icon: Clock, change: '+8 this week' },
  { label: 'Certificates Earned', value: '1', icon: Award, change: 'Barber Fundamentals' },
  { label: 'Average Score', value: '87%', icon: Target, change: '+5% improvement' },
];

const upcomingDeadlines = [
  { course: 'CNA Certification Prep', task: 'Module 3 Quiz', dueDate: '2024-11-15' },
  { course: 'HVAC Technician Training', task: 'Safety Assessment', dueDate: '2024-11-18' },
];

export default async function LMSDashboard() {
  // Require student authentication
  await requireStudent();
  
  const user = await getCurrentUser();
  const supabase = await createServerSupabaseClient();

  // Fetch user's enrollments with course details
  const { data: enrollments, error } = await supabase
    .from('enrollments')
    .select(`
      id,
      status,
      progress,
      enrolled_at,
      courses (
        id,
        title,
        slug,
        description,
        duration_weeks,
        programs (
          name,
          slug
        )
      )
    `)
    .eq('student_id', user.id)
    .order('enrolled_at', { ascending: false });

  // Map enrollments to course cards
  const enrolledCourses = enrollments?.map((enrollment: any) => {
    const course = enrollment.courses;
    const programSlug = course.programs?.slug || 'default';
    
    return {
      id: course.id,
      slug: course.slug,
      title: course.title,
      progress: enrollment.progress || 0,
      nextLesson: enrollment.status === 'completed' ? 'Course Completed!' : 'Continue where you left off',
      thumbnail: `/course-covers/${programSlug}/cover.svg`,
      totalLessons: 24, // TODO: Calculate from modules/lessons
      completedLessons: Math.floor((enrollment.progress || 0) * 24 / 100),
      status: enrollment.status,
      instructor: 'Instructor Name', // TODO: Add instructor to courses table
      duration: `${course.duration_weeks} weeks`,
    };
  }) || [];

  const firstName = user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'Student';
  return (
    <div className="min-h-screen bg-gray-50">
      <LoginTracker />
      <AttendanceTracker activityType="dashboard" />
      
      {/* Navigation */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <nav className="flex gap-6 items-center">
          <Link href="/lms/dashboard" className="text-red-600 font-semibold">Dashboard</Link>
          <Link href="/lms/courses" className="text-gray-700 hover:text-red-600 font-medium">Courses</Link>
          <Link href="/lms/progress" className="text-gray-700 hover:text-red-600 font-medium">Progress</Link>
          <Link href="/lms/certificates" className="text-gray-700 hover:text-red-600 font-medium">Certificates</Link>
        </nav>
        <div className="flex gap-4 items-center">
          <button className="relative">
            <span className="text-2xl">🔔</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">3</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
            J
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="elevate-hero">
        <div className="elevate-hero-content">
          <div className="elevate-hero-kicker">Student Learning Portal</div>
          <h1 className="elevate-hero-title">Welcome back, {firstName}!</h1>
          <p className="elevate-hero-subtitle">
            Continue your learning journey and achieve your workforce training goals
          </p>
          <div className="flex gap-3">
            {enrolledCourses.length > 0 && (
              <Link href={`/lms/courses/${enrolledCourses[0].id}`} className="elevate-btn-primary">
                Continue Learning
              </Link>
            )}
            <Link href="/lms/progress" className="elevate-btn-secondary">
              View Progress
            </Link>
          </div>
        </div>
      </section>

      <main className="elevate-container" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-5">
          {stats.map((stat) => (
            <div key={stat.label} className="elevate-card">
              <div className="elevate-card-header">
                <div>
                  <div className="elevate-card-subtitle">{stat.label}</div>
                  <div className="text-2xl font-bold mt-1">{stat.value}</div>
                </div>
                <stat.icon className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-xs text-slate-400 mt-2">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Continue Learning */}
        <section className="mb-5">
          <div className="elevate-page-heading">
            <h2 className="elevate-page-title">Continue Learning</h2>
            <Link href="/lms/courses" className="elevate-btn-secondary text-xs">
              View All Courses
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => {
              const isCompleted = course.status === 'completed';
              const progressColor = isCompleted ? 'bg-green-500' : 'bg-red-600';
              const buttonClass = isCompleted ? 'elevate-btn-secondary w-full text-center block' : 'elevate-btn-primary w-full text-center block';
              
              return (
                <div key={course.id} className="elevate-card">
                  <div className="relative rounded-lg overflow-hidden mb-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    {isCompleted && (
                      <span className="elevate-pill elevate-pill--success absolute top-3 right-3">
                        <Award className="h-4 w-4" />
                        Completed
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                      <p className="text-sm text-gray-500">{course.nextLesson}</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold text-gray-900">
                          {course.completedLessons}/{course.totalLessons} lessons
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all rounded-full ${progressColor}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Link href={`/lms/courses/${course.id}`} className={buttonClass}>
                        {isCompleted ? 'Review Course' : 'Continue Learning'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Upcoming Deadlines */}
        <section className="mb-5">
          <h2 className="elevate-page-title mb-3">Upcoming Deadlines</h2>
          <div className="elevate-card">
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium text-sm">{deadline.task}</p>
                      <p className="text-xs text-slate-400">{deadline.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {new Date(deadline.dueDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-xs text-slate-400">
                      {Math.ceil((new Date(deadline.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Widgets Grid */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <ProgressChart />
          <UpcomingCalendar />
          <ActivityFeed />
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="elevate-page-title mb-3">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Link href="/lms/courses" className="elevate-card hover:border-orange-500/50 transition-all">
              <BookOpen className="h-7 w-7 mb-2 text-orange-500" />
              <h3 className="elevate-card-title">Browse Courses</h3>
              <p className="elevate-card-subtitle mt-1">
                Explore available training programs
              </p>
            </Link>
            <Link href="/lms/progress" className="elevate-card hover:border-blue-500/50 transition-all">
              <TrendingUp className="h-7 w-7 mb-2 text-blue-500" />
              <h3 className="elevate-card-title">My Progress</h3>
              <p className="elevate-card-subtitle mt-1">
                Track your learning achievements
              </p>
            </Link>
            <Link href="/lms/certificates" className="elevate-card hover:border-green-500/50 transition-all">
              <Award className="h-7 w-7 mb-2 text-green-500" />
              <h3 className="elevate-card-title">My Certificates</h3>
              <p className="elevate-card-subtitle mt-1">
                View and download certificates
              </p>
            </Link>
            <Link href="/lms/profile" className="elevate-card hover:border-purple-500/50 transition-all">
              <Target className="h-7 w-7 mb-2 text-purple-500" />
              <h3 className="elevate-card-title">Profile Settings</h3>
              <p className="elevate-card-subtitle mt-1">
                Manage your account settings
              </p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
