import { Metadata } from 'next';
import { generateInternalMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateInternalMetadata({
  title: 'Alumni Network',
  description: 'Connect with Elevate for Humanity alumni',
  path: '/lms/alumni',
});

export default function AlumniPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Alumni Network</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-slate-600 mb-4">
          Connect with graduates and build your professional network.
        </p>
        <p className="text-slate-500">
          Coming soon: Alumni directory, networking events, and mentorship opportunities.
        </p>
      </div>
    </div>
  );
}
