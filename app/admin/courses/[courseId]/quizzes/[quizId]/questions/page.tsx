import { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Quiz Questions | Elevate For Humanity',
  description: 'Manage quiz questions and answers.',
};

export default async function QuizQuestionsPage({ 
  params 
}: { 
  params: { courseId: string; quizId: string } 
}) {
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

  // Fetch quiz details
  const { data: quiz } = await supabase
    .from('quizzes')
    .select('*')
    .eq('id', params.quizId)
    .single();

  // Fetch questions
  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', params.quizId)
    .order('order_index');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm mb-4">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li><Link href="/admin" className="hover:text-primary">Admin</Link></li>
              <li>/</li>
              <li><Link href="/admin/courses" className="hover:text-primary">Courses</Link></li>
              <li>/</li>
              <li><Link href={`/admin/courses/${params.courseId}/quizzes`} className="hover:text-primary">Quizzes</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">Questions</li>
            </ol>
          </nav>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{quiz?.title || 'Quiz Questions'}</h1>
              <p className="text-gray-600 mt-2">Manage questions and answers for this quiz</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add Question
            </button>
          </div>
        </div>

        {/* Quiz Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{questions?.length || 0}</p>
            <p className="text-sm text-gray-500">Questions</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{quiz?.passing_score || 70}%</p>
            <p className="text-sm text-gray-500">Passing Score</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{quiz?.time_limit || 'No'}</p>
            <p className="text-sm text-gray-500">Time Limit (min)</p>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions && questions.length > 0 ? (
            questions.map((question: any, index: number) => (
              <div key={question.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{question.question_text}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {question.question_type === 'multiple_choice' ? 'Multiple Choice' : 
                         question.question_type === 'true_false' ? 'True/False' : 'Short Answer'}
                        {question.points && ` • ${question.points} points`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </div>
                </div>
                
                {question.options && (
                  <div className="ml-11 space-y-2">
                    {JSON.parse(question.options).map((option: string, optIndex: number) => (
                      <div 
                        key={optIndex} 
                        className={`p-2 rounded border text-sm ${
                          option === question.correct_answer 
                            ? 'bg-green-50 border-green-200 text-green-800' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        {option}
                        {option === question.correct_answer && (
                          <span className="ml-2 text-green-600">✓ Correct</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 mb-4">No questions added yet</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Add First Question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
