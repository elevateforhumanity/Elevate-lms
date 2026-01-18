import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Resume Building',
  alternates: { canonical: 'https://www.elevateforhumanity.org/career-services/resume-building' },
};

export default function Page() {
  redirect('/career-services');
}
