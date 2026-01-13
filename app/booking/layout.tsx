import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Appointment | Elevate For Humanity',
  description: 'Schedule an appointment for career counseling, training enrollment, or support services.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/booking',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
