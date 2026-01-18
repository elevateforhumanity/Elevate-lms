import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Career Counseling',
  alternates: { canonical: 'https://www.elevateforhumanity.org/career-services/career-counseling' },
};

export default function Page() {
  redirect('/career-services');
}
