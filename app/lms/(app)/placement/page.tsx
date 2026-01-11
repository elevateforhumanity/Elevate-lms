import { Metadata } from 'next';
import { generateInternalMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateInternalMetadata({
  title: 'Job Placement',
  description: 'Career services and job placement assistance',
  path: '/lms/placement',
});

export default function PlacementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Placement Services</h1>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-black mb-4">
          Get help finding employment after completing your training.
        </p>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Services Available:</h2>
            <ul className="list-disc list-inside text-black space-y-2">
              <li>Resume review and optimization</li>
              <li>Interview preparation</li>
              <li>Job search assistance</li>
              <li>Employer connections</li>
              <li>Career counseling</li>
            </ul>
          </div>
          <p className="text-slate-500 mt-4">
            Contact your program coordinator to schedule a placement consultation.
          </p>
        </div>
      </div>
    </div>
  );
}
