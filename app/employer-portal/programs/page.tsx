import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Training Programs | Elevate for Humanity',
  description: 'View available training programs.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Training Programs</h1>
      <p className="text-gray-600">This page is under construction.</p>
    </div>
  );
}
