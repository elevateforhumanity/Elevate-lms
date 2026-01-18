import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Interview Prep',
  alternates: { canonical: 'https://www.elevateforhumanity.org/career-services/interview-prep' },
};

export default function Page() {
  redirect('/career-services');
}
