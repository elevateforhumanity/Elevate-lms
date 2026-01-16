import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Calendar as CalendarIcon, Clock, BookOpen, Bell } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Calendar | Elevate For Humanity',
  description: 'View your personal schedule, enrolled classes, and important dates.',
};

export const dynamic = 'force-dynamic';

export default async function CalendarPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let enrollments = null;
  let assignments = null;

  if (user) {
    const { data: enrollmentData } = await supabase
      .from('enrollments')
      .select(`
        id,
        course:courses(id, title, schedule, start_date, end_date)
      `)
      .eq('user_id', user.id)
      .eq('status', 'active');
    enrollments = enrollmentData;

    const courseIds = enrollments?.map((e: any) => e.course?.id).filter(Boolean) || [];
    if (courseIds.length > 0) {
      const { data: assignmentData } = await supabase
        .from('assignments')
        .select('*')
        .in('course_id', courseIds)
        .gte('due_date', new Date().toISOString())
        .order('due_date', { ascending: true })
        .limit(10);
      assignments = assignmentData;
    }
  }

  const { data: programs } = await supabase
    .from('programs')
    .select('id, name, start_date, schedule')
    .eq('is_active', true)
    .limit(10);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Calendar</h1>
          <p className="text-purple-100">Your personal schedule and important dates</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {!user && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8 text-center">
            <CalendarIcon className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-purple-900 mb-2">Sign in to see your schedule</h2>
            <p className="text-purple-700 mb-4">View your enrolled classes, assignments, and deadlines.</p>
            <Link href="/login?redirect=/calendar" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700">
              Sign In
            </Link>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {user && (
              <>
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    My Classes
                  </h2>
                  <div className="space-y-3">
                    {enrollments && enrollments.length > 0 ? enrollments.map((enrollment: any) => (
                      <div key={enrollment.id} className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-purple-100 rounded-lg p-3">
                            <BookOpen className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{enrollment.course?.title}</h3>
                            <div className="flex gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {enrollment.course?.schedule || 'Schedule TBD'}
                              </span>
                            </div>
                          </div>
                          <Link href={`/courses/${enrollment.course?.id}`} className="text-purple-600 text-sm font-medium hover:underline">
                            View
                          </Link>
                        </div>
                      </div>
                    )) : (
                      <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-500">
                        <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                        <p>No enrolled classes</p>
                        <Link href="/programs" className="text-purple-600 font-medium hover:underline">Browse Programs</Link>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-orange-500" />
                    Upcoming Deadlines
                  </h2>
                  <div className="space-y-3">
                    {assignments && assignments.length > 0 ? assignments.map((assignment: any) => (
                      <div key={assignment.id} className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{assignment.title}</h3>
                            <p className="text-sm text-gray-500">{assignment.course_title}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-orange-600">
                              {new Date(assignment.due_date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500">Due</div>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-500">
                        No upcoming deadlines
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Program Schedules</h2>
            <div className="space-y-3">
              {programs && programs.length > 0 ? programs.map((program: any) => (
                <Link key={program.id} href={`/programs/${program.id}`} className="block bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition">
                  <h3 className="font-semibold text-gray-900">{program.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{program.schedule || 'Schedule TBD'}</p>
                  {program.start_date && (
                    <p className="text-xs text-purple-600 mt-2">
                      Starts: {new Date(program.start_date).toLocaleDateString()}
                    </p>
                  )}
                </Link>
              )) : (
                <div className="bg-white rounded-lg shadow-sm border p-4 text-center text-gray-500">
                  No active programs
                </div>
              )}
            </div>

            <div className="mt-6">
              <Link href="/events" className="block bg-purple-50 border border-purple-200 rounded-lg p-4 text-center hover:bg-purple-100 transition">
                <CalendarIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="font-medium text-purple-700">View Public Events</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
