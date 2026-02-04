import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for Mentorship | Elevate for Humanity',
  description: 'Apply to be matched with a mentor in your career field.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/apply',
  },
};

// Redirect to main apply page - mentorship is part of career services
export default function MentorshipApplyPage() {
  redirect('/apply');
}
