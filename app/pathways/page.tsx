import { redirect } from 'next/navigation';
import { Metadata } from 'next';

// Redirect /pathways to /programs for consolidated user experience

export const metadata: Metadata = {
  title: 'Pathways',
  alternates: { canonical: 'https://www.elevateforhumanity.org/pathways' },
};

export default function PathwaysPage() {
  redirect('/programs');
}
