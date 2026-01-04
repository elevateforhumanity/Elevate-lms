import { redirect } from 'next/navigation';


type Params = Promise<{ id: string }>;

export default async function EmployerPage({ params }: { params: Params }) {
  const { id } = await params;

  // Redirect to proposal (default view)
  redirect(`/admin/employers/${id}/proposal`);
}
