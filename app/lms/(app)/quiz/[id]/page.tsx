import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

// Redirect to the main quizzes route
export default async function QuizRedirectPage({ params }: Props) {
  const { id } = await params;
  redirect(`/lms/quizzes/${id}`);
}
