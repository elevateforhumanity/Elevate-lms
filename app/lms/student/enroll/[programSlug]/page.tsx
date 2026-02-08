import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ programSlug: string }>;
}

// Consolidated: Redirect to main enrollment flow
export default async function LmsStudentEnrollPage({ params }: Props) {
  const { programSlug } = await params;
  redirect(`/enroll/${programSlug}`);
}
