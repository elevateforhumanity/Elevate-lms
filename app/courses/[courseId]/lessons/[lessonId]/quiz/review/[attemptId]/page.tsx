import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  alternates: {
    canonical:
      'https://elevateforhumanity.institute/courses/[courseId]/lessons/[lessonId]/quiz/review/[attemptId]',
  },
  title: '[attemptId] | Elevate For Humanity',
  description:
    'Explore [attemptId] and discover opportunities for career growth and development at Elevate For Humanity.',
};

export default async function QuizReviewPage({
  params,
}: {
  params: { courseId: string; lessonId: string; attemptId: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/signin');

  const { data: attempt } = await supabase
    .from('quiz_attempts')
    .select('*, quizzes(title)')
    .eq('id', params.attemptId)
    .eq('user_id', user.id)
    .single();

  if (!attempt) {
    return <div>Attempt not found</div>;
  }

  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', attempt.quiz_id)
    .order('order');

  const userAnswers = attempt.answers as Record<string, number>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center text-white overflow-hidden">
        <Image
          src="/images/artlist/hero-training-1.jpg"
          alt="[attemptId]"
          fill
          className="object-cover"
          quality={100}
          priority
          sizes="100vw"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-2xl">
            [attemptId]
          </h1>
          <p className="text-base md:text-lg mb-8 text-gray-100 drop-shadow-lg">
            Transform your career with free training and industry certifications
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-brand-orange-600 hover:bg-brand-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              Get Started Free
            </Link>
            <Link
              href="/programs"
              className="bg-white hover:bg-gray-100 text-brand-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-2xl"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Quiz Review
          </h1>
          <p className="text-slate-600">{attempt.quizzes.title}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-sm text-slate-600">
              Your Score:{' '}
              <span className="font-bold text-slate-900">{attempt.score}%</span>
            </div>
          </div>
        </div>

        {/* Questions Review */}
        <div className="space-y-6">
          {questions?.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const isCorrect = userAnswer === question.correct_answer;

            return (
              <div
                key={question.id}
                className="bg-white rounded-xl border border-slate-200 p-6"
              >
                <div className="flex items-start gap-4">
                  {/* Question Number */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-brand-green-100' : 'bg-red-100'
                    }`}
                  >
                    {isCorrect ? (
                      <svg
                        className="w-5 h-5 text-brand-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-brand-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1">
                    {/* Question */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      {index + 1}. {question.question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3 mb-4">
                      {question.options.map(
                        (option: string, optionIndex: number) => {
                          const isUserAnswer = userAnswer === optionIndex;
                          const isCorrectAnswer =
                            question.correct_answer === optionIndex;

                          return (
                            <div
                              key={optionIndex}
                              className={`p-4 rounded-lg border-2 ${
                                isCorrectAnswer
                                  ? 'border-green-500 bg-green-50'
                                  : isUserAnswer
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    isCorrectAnswer
                                      ? 'border-green-500 bg-green-500'
                                      : isUserAnswer
                                        ? 'border-red-500 bg-brand-orange-500'
                                        : 'border-slate-300'
                                  }`}
                                >
                                  {(isCorrectAnswer || isUserAnswer) && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  )}
                                </div>
                                <span className="flex-1">{option}</span>
                                {isCorrectAnswer && (
                                  <span className="text-xs font-semibold text-green-700">
                                    Correct Answer
                                  </span>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <span className="text-xs font-semibold text-red-700">
                                    Your Answer
                                  </span>
                                )}

                                {/* Storytelling Section */}
                                <section className="py-16 bg-white">
                                  <div className="container mx-auto px-4">
                                    <div className="max-w-7xl mx-auto">
                                      <div className="grid md:grid-cols-2 gap-12 items-center">
                                        <div>
                                          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                                            Your Journey Starts Here
                                          </h2>
                                          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                            Every great career begins with a
                                            single step. Whether you're looking
                                            to change careers, upgrade your
                                            skills, or enter the workforce for
                                            the first time, we're here to help
                                            you succeed. Our programs are 100%
                                            free, government-funded, and
                                            designed to get you hired fast.
                                          </p>
                                          <ul className="space-y-4">
                                            <li className="flex items-start">
                                              <svg
                                                className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M5 13l4 4L19 7"
                                                />
                                              </svg>
                                              <span className="text-gray-700">
                                                100% free training - no tuition,
                                                no hidden costs
                                              </span>
                                            </li>
                                            <li className="flex items-start">
                                              <svg
                                                className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M5 13l4 4L19 7"
                                                />
                                              </svg>
                                              <span className="text-gray-700">
                                                Industry-recognized
                                                certifications that employers
                                                value
                                              </span>
                                            </li>
                                            <li className="flex items-start">
                                              <svg
                                                className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M5 13l4 4L19 7"
                                                />
                                              </svg>
                                              <span className="text-gray-700">
                                                Job placement assistance and
                                                career support
                                              </span>
                                            </li>
                                            <li className="flex items-start">
                                              <svg
                                                className="w-6 h-6 text-brand-green-600 mr-3 flex-shrink-0 mt-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth={2}
                                                  d="M5 13l4 4L19 7"
                                                />
                                              </svg>
                                              <span className="text-gray-700">
                                                Flexible scheduling for working
                                                adults
                                              </span>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                          <Image
                                            src="/images/artlist/hero-training-2.jpg"
                                            alt="Students learning"
                                            fill
                                            className="object-cover"
                                            quality={100}
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </section>

                                {/* CTA Section */}
                                <section className="py-16    text-white">
                                  <div className="container mx-auto px-4">
                                    <div className="max-w-4xl mx-auto text-center">
                                      <h2 className="text-2xl md:text-3xl font-bold mb-6">
                                        Ready to Transform Your Career?
                                      </h2>
                                      <p className="text-base md:text-lg mb-8 text-blue-100">
                                        Join thousands who have launched
                                        successful careers through our free
                                        training programs.
                                      </p>
                                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link
                                          href="/contact"
                                          className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 text-lg shadow-2xl transition-all"
                                        >
                                          Apply Now - It's Free
                                        </Link>
                                        <Link
                                          href="/programs"
                                          className="bg-blue-800 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 border-2 border-white text-lg shadow-2xl transition-all"
                                        >
                                          Browse All Programs
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-1">
                          Explanation
                        </h4>
                        <p className="text-sm text-blue-800">
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Link
            href={`/courses/${params.courseId}/learn`}
            className="flex-1 px-6 py-3 border border-slate-300 rounded-lg text-center font-semibold hover:bg-slate-50 transition"
          >
            Back to Course
          </Link>
          <Link
            href={`/courses/${params.courseId}/lessons/${params.lessonId}/quiz`}
            className="flex-1 px-6 py-3 bg-brand-orange-600 text-white rounded-lg text-center font-semibold hover:bg-brand-orange-700 transition"
          >
            Retake Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
