import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Programs Technology',
  description: 'Programs Technology - Elevate for Humanity workforce training and career development programs in Indianapolis.',
  path: '/programs/technology',
});

import { redirect } from 'next/navigation';

/**
 * Redirect to main programs page with technology filter
 */
export default function TechnologyProgramsPage() {
  redirect('/programs?category=technology');
}
