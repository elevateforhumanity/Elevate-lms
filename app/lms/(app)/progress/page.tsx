import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ArrowRight, TrendingUp, Clock, CheckCircle, Target } from 'lucide-react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/lms/progress',
  },
  title: 'Track Progress | Elevate For Humanity',
  description: 'Monitor your learning journey with real-time progress tracking.',
};

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch enrollments with progress
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      courses (
        id,
        title,
        description,
        thumbnail_url
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const { count: activeCourses } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .in('status', ['active', 'in_progress']);

  const { count: completedCourses } = await supabase
    .from('enrollments')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'completed');

  // Calculate overall progress
  const totalProgress = enrollments?.length 
    ? Math.round(enrollments.reduce((acc, e) => acc + (e.progress || 0), 0) / enrollments.length)
    : 0;

  const totalHours = enrollments?.reduce((acc, e) => acc + (e.hours_completed || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Hero */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/artlist/hero-training-4.jpg"
        >
          <source src="/videos/student-portal-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/85 to-emerald-800/75" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-4 text-green-300" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Progress</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Monitor your learning journey in real-time
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/hero-images/healthcare-cat-new.jpg"
                alt="Overall Progress"
                width={400}
                height={200}
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-3xl font-bold">{totalProgress}%</p>
                <p className="text-sm">Overall Progress</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/hero-images/skilled-trades-cat-new.jpg"
                alt="Active Courses"
                width={400}
                height={200}
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-3xl font-bold">{activeCourses || 0}</p>
                <p className="text-sm">Active Courses</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/hero-images/technology-cat-new.jpg"
                alt="Completed"
                width={400}
                height={200}
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-3xl font-bold">{completedCourses || 0}</p>
                <p className="text-sm">Completed</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/hero-images/business-hero.jpg"
                alt="Hours Logged"
                width={400}
                height={200}
                className="w-full h-36 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-3xl font-bold">{totalHours}</p>
                <p className="text-sm">Hours Logged</p>
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Progress</h2>
          {enrollments && enrollments.length > 0 ? (
            <div className="space-y-6">
              {enrollments.map((enrollment: any) => (
                <div
                  key={enrollment.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
                      <Image
                        src={enrollment.courses?.thumbnail_url || '/hero-images/how-it-works-hero.jpg'}
                        alt={enrollment.courses?.title || 'Course'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-1">
                            {enrollment.courses?.title || 'Course'}
                          </h3>
                          <p className="text-slate-500 text-sm">
                            {enrollment.courses?.description || 'Continue your learning journey'}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          enrollment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : enrollment.status === 'active' || enrollment.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {enrollment.status === 'completed' ? 'Completed' : 
                           enrollment.status === 'active' || enrollment.status === 'in_progress' ? 'In Progress' : 
                           'Not Started'}
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Progress</span>
                          <span className="text-sm font-bold text-green-600">{enrollment.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${enrollment.progress || 0}%` }}
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm text-slate-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {enrollment.hours_completed || 0} hours completed
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          {enrollment.lessons_completed || 0} lessons done
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {enrollment.quizzes_passed || 0} quizzes passed
                        </span>
                      </div>

                      <Link
                        href={`/lms/courses/${enrollment.courses?.id || enrollment.course_id}`}
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition"
                      >
                        {enrollment.status === 'completed' ? 'Review Course' : 'Continue Learning'}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12 text-center">
              <Image
                src="/hero-images/how-it-works-hero.jpg"
                alt="Start learning"
                width={300}
                height={200}
                className="mx-auto rounded-lg mb-6 opacity-80"
              />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Courses Yet</h3>
              <p className="text-slate-500 mb-6 max-w-md mx-auto">
                Enroll in a program to start tracking your progress
              </p>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Browse Programs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
