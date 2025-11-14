'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

// Mock quiz data - in production, this would come from API/database
const quizData = {
  1: {
    id: 1,
    courseId: 1,
    courseName: 'Barber Fundamentals',
    title: 'Module 1 Assessment: Introduction to Barbering',
    description: 'Test your knowledge of basic barbering concepts and safety procedures',
    timeLimit: 30, // minutes
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the most important aspect of barbering safety?',
        options: [
          'Speed of service',
          'Sanitation and hygiene',
          'Customer satisfaction',
          'Tool maintenance'
        ],
        correctAnswer: 1,
        explanation: 'Sanitation and hygiene are paramount in barbering to prevent the spread of infections and ensure client safety.'
      },
      {
        id: 2,
        question: 'Which tool is primarily used for creating clean, sharp lines?',
        options: [
          'Scissors',
          'Clippers',
          'Straight razor',
          'Thinning shears'
        ],
        correctAnswer: 2,
        explanation: 'A straight razor is the traditional tool for creating precise, clean lines and edges in barbering.'
      },
      {
        id: 3,
        question: 'How often should barbering tools be sanitized?',
        options: [
          'Once per day',
          'Once per week',
          'After each client',
          'Only when visibly dirty'
        ],
        correctAnswer: 2,
        explanation: 'Tools must be sanitized after each client to maintain proper hygiene standards and prevent cross-contamination.'
      },
      {
        id: 4,
        question: 'What is the proper angle for holding clippers when creating a fade?',
        options: [
          '90 degrees',
          '45 degrees',
          '0 degrees (flat)',
          'It varies based on the desired effect'
        ],
        correctAnswer: 3,
        explanation: 'The angle varies throughout the fade to create smooth transitions. Starting flat and gradually increasing the angle creates the fade effect.'
      },
      {
        id: 5,
        question: 'Which of the following is NOT a basic haircut type?',
        options: [
          'Taper',
          'Fade',
          'Undercut',
          'Perm'
        ],
        correctAnswer: 3,
        explanation: 'A perm is a chemical treatment, not a haircut type. Taper, fade, and undercut are all cutting techniques.'
      }
    ]
  }
};

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const quizId = parseInt(params.id);
  const quiz = quizData[quizId as keyof typeof quizData];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz?.timeLimit ? quiz.timeLimit * 60 : 0);
  const [quizStarted, setQuizStarted] = useState(false);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Quiz Not Found</CardTitle>
            <CardDescription>The requested quiz could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/lms/dashboard">Return to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleStartQuiz = () => {
    setQuizStarted(true);
    // In production, implement actual timer countdown
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: quiz.questions.length,
      percentage: Math.round((correct / quiz.questions.length) * 100)
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <Button variant="outline" asChild>
              <Link href={`/lms/courses/${quiz.courseId}`}>Back to Course</Link>
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>{quiz.courseName}</span>
                </div>
                <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{quiz.timeLimit} minutes</div>
                      <div className="text-xs text-muted-foreground">Time Limit</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{quiz.questions.length} questions</div>
                      <div className="text-xs text-muted-foreground">Total Questions</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{quiz.passingScore}%</div>
                      <div className="text-xs text-muted-foreground">Passing Score</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Instructions
                  </h3>
                  <ul className="text-sm space-y-1 ml-6 list-disc">
                    <li>You have {quiz.timeLimit} minutes to complete this quiz</li>
                    <li>You must score at least {quiz.passingScore}% to pass</li>
                    <li>You can navigate between questions before submitting</li>
                    <li>Once submitted, you cannot change your answers</li>
                    <li>Review explanations after submission to learn from mistakes</li>
                  </ul>
                </div>

                <Button onClick={handleStartQuiz} className="w-full" size="lg">
                  Start Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Quiz Results Screen
  if (showResults) {
    const score = calculateScore();
    const passed = score.percentage >= quiz.passingScore;

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold">Quiz Results</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Score Summary */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                    <CardDescription>{quiz.courseName}</CardDescription>
                  </div>
                  {passed ? (
                    <Badge className="bg-green-600 text-lg px-4 py-2">
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Passed
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                      <XCircle className="mr-2 h-5 w-5" />
                      Failed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3 mb-6">
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold">{score.percentage}%</div>
                    <div className="text-sm text-muted-foreground">Your Score</div>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold">{score.correct}/{score.total}</div>
                    <div className="text-sm text-muted-foreground">Correct Answers</div>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold">{quiz.passingScore}%</div>
                    <div className="text-sm text-muted-foreground">Passing Score</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button asChild className="flex-1">
                    <Link href={`/lms/courses/${quiz.courseId}`}>Back to Course</Link>
                  </Button>
                  {!passed && (
                    <Button variant="outline" onClick={() => window.location.reload()} className="flex-1">
                      Retake Quiz
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Question Review */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Review Your Answers</h2>
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <Card key={question.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">
                          Question {index + 1}
                        </CardTitle>
                        {isCorrect ? (
                          <Badge className="bg-green-600">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Correct
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <XCircle className="mr-1 h-3 w-3" />
                            Incorrect
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-base text-foreground mt-2">
                        {question.question}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isUserAnswer = userAnswer === optionIndex;
                          const isCorrectAnswer = question.correctAnswer === optionIndex;

                          return (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border-2 ${
                                isCorrectAnswer
                                  ? 'border-green-500 bg-green-50 dark:bg-green-950'
                                  : isUserAnswer
                                  ? 'border-red-500 bg-red-50 dark:bg-red-950'
                                  : 'border-gray-200 dark:border-gray-800'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {isCorrectAnswer && (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <h4 className="font-semibold mb-1 text-sm">Explanation:</h4>
                        <p className="text-sm">{question.explanation}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Quiz Taking Screen
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const allAnswered = quiz.questions.every((q) => answers[q.id] !== undefined);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold">{quiz.title}</h1>
              <p className="text-sm text-muted-foreground">{quiz.courseName}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Question {currentQuestion + 1}
              </CardTitle>
              <CardDescription className="text-base text-foreground mt-2">
                {question.question}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={answers[question.id]?.toString()}
                onValueChange={(value) => handleAnswerSelect(question.id, parseInt(value))}
              >
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        answers[question.id] === index
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentQuestion === quiz.questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className="flex-1"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="flex-1"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>

              {!allAnswered && currentQuestion === quiz.questions.length - 1 && (
                <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
                  Please answer all questions before submitting
                </p>
              )}
            </CardContent>
          </Card>

          {/* Question Navigator */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-sm">Question Navigator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {quiz.questions.map((q, index) => (
                  <Button
                    key={q.id}
                    variant={currentQuestion === index ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentQuestion(index)}
                    className={`relative ${
                      answers[q.id] !== undefined
                        ? 'ring-2 ring-green-500 ring-offset-2'
                        : ''
                    }`}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
