import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ courseId: string; lessonId: string; attemptId: string }>;
}

// Redirect to the LMS quiz results page
export default async function QuizResultsRedirectPage({ params }: Props) {
  const { attemptId } = await params;
  
  // Find the quiz ID from the attempt and redirect
  redirect(`/lms/quizzes/results/${attemptId}`);
}
