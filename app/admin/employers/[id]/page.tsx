import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Employers | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';


type Params = Promise<{ id: string }>;

export default async function EmployerPage({ params }: { params: Params }) {
  const { id } = await params;

  // Redirect to proposal (default view)
  redirect(`/admin/employers/${id}/proposal`);
}
