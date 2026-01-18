import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interviews | Elevate for Humanity',
  description: 'Manage interview schedules.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Interviews</h1>
      <p className="text-gray-600">This page is under construction.</p>
    </div>
  );
}
