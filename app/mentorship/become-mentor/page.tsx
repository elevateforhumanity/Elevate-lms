import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Mentor | Elevate for Humanity',
  description: 'Volunteer as a mentor to help job seekers succeed in their careers.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/contact',
  },
};

// Redirect to contact page for mentor inquiries
export default function BecomeMentorPage() {
  redirect('/contact');
}
