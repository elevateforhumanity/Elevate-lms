import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Career Guidance',
  alternates: { canonical: 'https://www.elevateforhumanity.org/mentorship/career-guidance' },
};

export default function CareerGuidancePage() {
  redirect('/mentorship');
}
