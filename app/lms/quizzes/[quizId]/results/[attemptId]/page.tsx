import Link from 'next/link';
import { CheckCircle, XCircle, Award, Clock, TrendingUp } from 'lucide-react';
import { getCurrentUser, requireStudent } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    quizId: string;
    attemptId: string;
  };
}

export default async function QuizResultsPage({ params }: Props) {
  await requireStudent();
  const user = await getCurrentUser();
  const supabase = await createServerSupabaseClient();

  // Fetch attempt
  const { data: attempt } = await supabase
    .from('quiz_attempts')
    .select(`
      id,
      score,
      passed,
      started_at,
      completed_at,
      answers,
      quizzes!inner (
        id,
        title,
        passing_score,
        max_attempts,
        courses!inner (
          id,
          title
        )
      )
    `)
    .eq('id', params.attemptId)
    .eq('student_id', user.id)
    .single();

  if (!attempt) {
    redirect('/lms/dashboard');
  }

  // Type guard: Supabase returns nested relations as arrays, extract first element
  const quiz = (Array.isArray(attempt.quizzes) ? attempt.quizzes[0] : attempt.quizzes) as { id: any; title: any; passing_score: any; max_attempts: any; courses: any } | undefined;
  const course = (quiz && (Array.isArray(quiz.courses) ? quiz.courses[0] : quiz.courses)) as { id: any; title: any } | undefined;

  // Fetch questions with correct answers
  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('id, question_text, question_type, options, correct_answer, points')
    .eq('quiz_id', params.quizId)
    .order('order_index', { ascending: true });

  // Calculate stats
  const totalQuestions = questions?.length || 0;
  const correctAnswers = questions?.filter(q => {
    const studentAnswer = attempt.answers?.[q.id];
    return studentAnswer && studentAnswer.trim().toLowerCase() === q.correct_answer.trim().toLowerCase();
  }).length || 0;

  const timeSpent = attempt.completed_at && attempt.started_at
    ? Math.round((new Date(attempt.completed_at).getTime() - new Date(attempt.started_at).getTime()) / 60000)
    : 0;

  // Get all attempts for this quiz
  const { data: allAttempts } = await supabase
    .from('quiz_attempts')
    .select('score, passed')
    .eq('student_id', user.id)
    .eq('quiz_id', params.quizId)
    .order('started_at', { ascending: false });

  const attemptNumber = allAttempts?.length || 1;
  const canRetake = quiz && attemptNumber < quiz.max_attempts && !attempt.passed;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        <Link href="/lms/dashboard" className="text-gray-700 hover:text-red-600 font-medium">
          Back to Dashboard
        </Link>
      </header>

      {/* Results Header */}
      <section className={`py-12 ${
        attempt.passed
          ? 'bg-gradient-to-br from-green-600 to-emerald-600'
          : 'bg-gradient-to-br from-red-600 to-orange-600'
      } text-white`}>
        <div className="elevate-container text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4">
            {attempt.passed ? (
              <CheckCircle className="h-10 w-10" />
            ) : (
              <XCircle className="h-10 w-10" />
            )}
          </div>
          <h1 className="text-4xl font-bold mb-2">
            {attempt.passed ? 'Congratulations!' : 'Keep Trying!'}
          </h1>
          <p className="text-xl opacity-90 mb-4">
            You scored {attempt.score}%
          </p>
          <p className="text-lg opacity-75">
            {attempt.passed 
              ? `You passed! The passing score was ${quiz?.passing_score}%`
              : `You need ${quiz?.passing_score}% to pass. You can try again!`
            }
          </p>
        </div>
      </section>

      <main className="elevate-container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <div className="elevate-card">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">Score</div>
                  <div className="text-2xl font-bold">{attempt.score}%</div>
                </div>
              </div>
            </div>
            <div className="elevate-card">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-500">Correct</div>
                  <div className="text-2xl font-bold">{correctAnswers}/{totalQuestions}</div>
                </div>
              </div>
            </div>
            <div className="elevate-card">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-sm text-gray-500">Time</div>
                  <div className="text-2xl font-bold">{timeSpent}m</div>
                </div>
              </div>
            </div>
            <div className="elevate-card">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-sm text-gray-500">Attempt</div>
                  <div className="text-2xl font-bold">{attemptNumber}/{quiz?.max_attempts}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz Info */}
          <div className="elevate-card mb-8">
            <h2 className="font-bold text-gray-900 mb-2">{quiz?.title}</h2>
            <p className="text-sm text-gray-600">{course?.title}</p>
          </div>

          {/* Question Review */}
          <div className="elevate-card mb-8">
            <h2 className="font-bold text-gray-900 mb-4">Question Review</h2>
            <div className="space-y-6">
              {questions?.map((question, index) => {
                const studentAnswer = attempt.answers?.[question.id];
                const isCorrect = studentAnswer && 
                  studentAnswer.trim().toLowerCase() === question.correct_answer.trim().toLowerCase();

                return (
                  <div key={question.id} className={`p-4 rounded-lg border-2 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : (
                          <XCircle className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-gray-500">
                            Question {index + 1}
                          </span>
                          <span className="elevate-pill elevate-pill--info text-xs capitalize">
                            {question.question_type.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900 mb-3">{question.question_text}</p>

                        {/* Show options for multiple choice */}
                        {question.options && question.options.length > 0 && (
                          <div className="space-y-2 mb-3">
                            {question.options.map((option: string, optIndex: number) => {
                              const isStudentAnswer = option === studentAnswer;
                              const isCorrectAnswer = option === question.correct_answer;

                              return (
                                <div
                                  key={optIndex}
                                  className={`p-2 rounded ${
                                    isCorrectAnswer
                                      ? 'bg-green-100 border border-green-300'
                                      : isStudentAnswer
                                      ? 'bg-red-100 border border-red-300'
                                      : 'bg-white border border-gray-200'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {isCorrectAnswer && (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    )}
                                    {isStudentAnswer && !isCorrectAnswer && (
                                      <XCircle className="h-4 w-4 text-red-600" />
                                    )}
                                    <span className={`text-sm ${
                                      isCorrectAnswer ? 'font-semibold text-green-900' :
                                      isStudentAnswer ? 'font-semibold text-red-900' :
                                      'text-gray-700'
                                    }`}>
                                      {option}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Show answers for short answer */}
                        {question.question_type === 'short_answer' && (
                          <div className="space-y-2">
                            <div>
                              <div className="text-xs font-semibold text-gray-500 mb-1">Your Answer:</div>
                              <div className={`p-2 rounded ${
                                isCorrect ? 'bg-green-100' : 'bg-red-100'
                              }`}>
                                <p className="text-sm">{studentAnswer || '(No answer provided)'}</p>
                              </div>
                            </div>
                            {!isCorrect && (
                              <div>
                                <div className="text-xs font-semibold text-gray-500 mb-1">Correct Answer:</div>
                                <div className="p-2 rounded bg-green-100">
                                  <p className="text-sm">{question.correct_answer}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mt-2 text-xs text-gray-500">
                          {question.points} {question.points === 1 ? 'point' : 'points'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {canRetake && (
              <Link
                href={`/lms/quizzes/${params.quizId}`}
                className="elevate-btn-primary"
              >
                Retake Quiz
              </Link>
            )}
            <Link
              href={`/lms/courses/${course?.id}`}
              className="elevate-btn-secondary"
            >
              Back to Course
            </Link>
            <Link
              href="/lms/dashboard"
              className="elevate-btn-secondary"
            >
              Back to Dashboard
            </Link>
          </div>

          {/* Previous Attempts */}
          {allAttempts && allAttempts.length > 1 && (
            <div className="mt-8 elevate-card">
              <h3 className="font-bold text-gray-900 mb-4">Previous Attempts</h3>
              <div className="space-y-2">
                {allAttempts.map((att, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Attempt {allAttempts.length - index}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{att.score}%</span>
                      <span className={`elevate-pill text-xs ${
                        att.passed ? 'elevate-pill--success' : 'elevate-pill--danger'
                      }`}>
                        {att.passed ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
