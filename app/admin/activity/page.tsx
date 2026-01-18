import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activity Log | Elevate for Humanity',
  description: 'View system activity and audit logs.',
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Activity Log</h1>
      <p className="text-gray-600">This page is under construction.</p>
    </div>
  );
}
