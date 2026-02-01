import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Course Quizzes | Elevate For Humanity',
  description: 'Manage quizzes and assessments for this course.',
};

export default async function CourseQuizzesPage({ params }: { params: { courseId: string } }) {
  const supabase = await createClient();

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Unavailable</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  // Fetch course details
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', params.courseId)
    .single();

  // Fetch quizzes
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('course_id', params.courseId)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm mb-4">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li><Link href="/admin" className="hover:text-primary">Admin</Link></li>
              <li>/</li>
              <li><Link href="/admin/courses" className="hover:text-primary">Courses</Link></li>
              <li>/</li>
              <li><Link href={`/admin/courses/${params.courseId}`} className="hover:text-primary">{course?.title || 'Course'}</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">Quizzes</li>
            </ol>
          </nav>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Course Quizzes</h1>
              <p className="text-gray-600 mt-2">Manage assessments for {course?.title || 'this course'}</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Create Quiz
            </button>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes && quizzes.length > 0 ? (
            quizzes.map((quiz: any) => (
              <div key={quiz.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    quiz.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {quiz.status || 'draft'}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{quiz.description || 'No description'}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{quiz.question_count || 0} questions</span>
                  <span>{quiz.passing_score || 70}% to pass</span>
                </div>
                <div className="flex gap-2">
                  <Link 
                    href={`/admin/courses/${params.courseId}/quizzes/${quiz.id}/questions`}
                    className="flex-1 text-center bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm hover:bg-blue-100"
                  >
                    Edit Questions
                  </Link>
                  <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
                    Settings
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-lg shadow-sm border p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-500 mb-4">No quizzes created yet</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Create First Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
