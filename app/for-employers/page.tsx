import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'For Employers | Hire Trained Workers | Elevate for Humanity',
  description: 'Partner with Elevate for Humanity to hire job-ready workers. Access our talent pipeline of trained, certified candidates at no cost.',
  alternates: { canonical: 'https://www.elevateforhumanity.org/employers' },
};

export default function ForEmployersRedirect() {
  redirect('/employers');
}
