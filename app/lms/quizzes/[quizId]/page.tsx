'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Clock, AlertCircle, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
  params: {
    quizId: string;
  };
}

export default function TakeQuizPage({ params }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [previousAttempts, setPreviousAttempts] = useState<any[]>([]);
  const [canTakeQuiz, setCanTakeQuiz] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    loadQuiz();
  }, []);

  useEffect(() => {
    if (timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const loadQuiz = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch quiz
      const { data: quizData } = await supabase
        .from('quizzes')
        .select(`
          id,
          title,
          description,
          passing_score,
          time_limit_minutes,
          max_attempts,
          courses (
            id,
            title
          )
        `)
        .eq('id', params.quizId)
        .single();

      setQuiz(quizData);

      // Fetch questions
      const { data: questionsData } = await supabase
        .from('quiz_questions')
        .select('id, question_text, question_type, options, points, order_index')
        .eq('quiz_id', params.quizId)
        .order('order_index', { ascending: true });

      setQuestions(questionsData || []);

      // Check previous attempts
      const { data: attemptsData } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('student_id', user.id)
        .eq('quiz_id', params.quizId)
        .order('started_at', { ascending: false });

      setPreviousAttempts(attemptsData || []);

      // Check if can take quiz
      if (attemptsData && attemptsData.length >= quizData.max_attempts) {
        setCanTakeQuiz(false);
      }

      // Start timer if time limit exists
      if (quizData.time_limit_minutes) {
        setTimeRemaining(quizData.time_limit_minutes * 60);
      }

      // Create attempt record
      const { data: attemptData } = await supabase
        .from('quiz_attempts')
        .insert({
          student_id: user.id,
          quiz_id: parseInt(params.quizId),
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      setAttemptId(attemptData?.id || null);
      setLoading(false);
    } catch (error) {
      console.error('Error loading quiz:', error);
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !attemptId) return;

      // Calculate score
      const { data: questionsWithAnswers } = await supabase
        .from('quiz_questions')
        .select('id, correct_answer, points')
        .eq('quiz_id', params.quizId);

      let totalPoints = 0;
      let earnedPoints = 0;

      questionsWithAnswers?.forEach((question) => {
        totalPoints += question.points;
        const studentAnswer = answers[question.id];
        if (studentAnswer && studentAnswer.trim().toLowerCase() === question.correct_answer.trim().toLowerCase()) {
          earnedPoints += question.points;
        }
      });

      const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
      const passed = score >= quiz.passing_score;

      // Update attempt
      await supabase
        .from('quiz_attempts')
        .update({
          completed_at: new Date().toISOString(),
          score: score,
          passed: passed,
          answers: answers,
        })
        .eq('id', attemptId);

      // Create grade record
      await supabase
        .from('grades')
        .insert({
          student_id: user.id,
          course_id: quiz.courses.id,
          quiz_id: parseInt(params.quizId),
          score: score,
          max_score: 100,
          passed: passed,
          graded_at: new Date().toISOString(),
        });

      // Redirect to results
      router.push(`/lms/quizzes/${params.quizId}/results/${attemptId}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz');
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!canTakeQuiz) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="elevate-nav">
          <div className="elevate-logo">
            <div className="elevate-logo-mark">E</div>
            <span>Elevate for Humanity</span>
          </div>
        </header>
        <div className="elevate-container py-12">
          <div className="max-w-2xl mx-auto elevate-card text-center">
            <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Maximum Attempts Reached</h1>
            <p className="text-gray-600 mb-6">
              You have used all {quiz.max_attempts} attempts for this quiz. Please contact your instructor for assistance.
            </p>
            <Link href="/lms/dashboard" className="elevate-btn-primary">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="elevate-nav">
        <div className="elevate-logo">
          <div className="elevate-logo-mark">E</div>
          <span>Elevate for Humanity</span>
        </div>
        {timeRemaining !== null && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            timeRemaining < 300 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
          }`}>
            <Clock className="h-4 w-4" />
            <span className="font-bold">{formatTime(timeRemaining)}</span>
          </div>
        )}
      </header>

      {/* Quiz Header */}
      <section className="bg-gradient-to-br from-red-600 via-orange-500 to-blue-600 text-white py-8">
        <div className="elevate-container">
          <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
          {quiz.description && (
            <p className="text-lg opacity-90">{quiz.description}</p>
          )}
          <div className="mt-4 flex items-center gap-6 text-sm">
            <span>{questions.length} questions</span>
            <span>Passing score: {quiz.passing_score}%</span>
            <span>Attempt {previousAttempts.length + 1} of {quiz.max_attempts}</span>
          </div>
        </div>
      </section>

      <main className="elevate-container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{answeredCount} answered</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          {currentQ && (
            <div className="elevate-card mb-6">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="elevate-pill elevate-pill--info text-xs capitalize">
                    {currentQ.question_type.replace('_', ' ')}
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentQ.points} {currentQ.points === 1 ? 'point' : 'points'}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{currentQ.question_text}</h2>
              </div>

              {/* Multiple Choice / True False */}
              {(currentQ.question_type === 'multiple_choice' || currentQ.question_type === 'true_false') && (
                <div className="space-y-3">
                  {currentQ.options.map((option: string, index: number) => (
                    <label
                      key={index}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        answers[currentQ.id] === option
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        value={option}
                        checked={answers[currentQ.id] === option}
                        onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                        className="flex-shrink-0"
                      />
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Short Answer */}
              {currentQ.question_type === 'short_answer' && (
                <textarea
                  value={answers[currentQ.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                  className="elevate-textarea w-full"
                  rows={4}
                  placeholder="Type your answer here..."
                />
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="elevate-btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="elevate-btn-primary flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting || answeredCount < questions.length}
                className="elevate-btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Quiz'}
                <CheckCircle className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Question Navigator */}
          <div className="mt-8 elevate-card">
            <h3 className="font-bold text-gray-900 mb-3">Question Navigator</h3>
            <div className="grid grid-cols-10 gap-2">
              {questions.map((q, index) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                    index === currentQuestion
                      ? 'bg-red-600 text-white'
                      : answers[q.id]
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Warning */}
          {answeredCount < questions.length && currentQuestion === questions.length - 1 && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-yellow-900 mb-1">Unanswered Questions</h3>
                <p className="text-sm text-yellow-800">
                  You have {questions.length - answeredCount} unanswered question(s). 
                  Please answer all questions before submitting.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
