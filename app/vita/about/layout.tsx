import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About VITA | Free Tax Prep',
  description: 'Learn about the Volunteer Income Tax Assistance program and how it helps families.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/vita/about',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
