import { redirect } from 'next/navigation';


type Params = Promise<{ courseId: string; quizId: string }>;

export default async function QuizPage({ params }: { params: Params }) {
  const { courseId, quizId } = await params;

  // Redirect to questions page (default view)
  redirect(`/admin/courses/${courseId}/quizzes/${quizId}/questions`);
}
