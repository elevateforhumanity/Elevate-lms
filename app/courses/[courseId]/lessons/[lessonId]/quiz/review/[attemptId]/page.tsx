import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ courseId: string; lessonId: string; attemptId: string }>;
}

// Redirect to the LMS quiz results page for review
export default async function QuizReviewRedirectPage({ params }: Props) {
  const { attemptId } = await params;
  
  redirect(`/lms/quizzes/results/${attemptId}`);
}
