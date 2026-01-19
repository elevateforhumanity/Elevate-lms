import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ programId: string }>;
}

// Redirect to the main admin programs page
export default async function ProgramAdminRedirectPage({ params }: Props) {
  const { programId } = await params;
  redirect(`/admin/programs/${programId}`);
}
