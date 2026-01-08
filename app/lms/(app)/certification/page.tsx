import { Metadata } from 'next';
import { generateInternalMetadata } from '@/lib/seo/metadata';
import { redirect } from 'next/navigation';

export const metadata: Metadata = generateInternalMetadata({
  title: 'Certification',
  description: 'View your certifications',
  path: '/lms/certification',
});

export default function CertificationPage() {
  // Redirect to certificates page (singular vs plural)
  redirect('/lms/certificates');
}
