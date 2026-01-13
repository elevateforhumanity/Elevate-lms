import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Courses | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';


type Params = Promise<{ courseId: string; quizId: string }>;

export default async function QuizPage({ params }: { params: Params }) {
  const { courseId, quizId } = await params;

  // Redirect to questions page (default view)
  redirect(`/admin/courses/${courseId}/quizzes/${quizId}/questions`);
}
