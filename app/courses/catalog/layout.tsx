import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Course Catalog | Elevate For Humanity',
  description: 'Browse our complete catalog of career training courses in healthcare, IT, business, and skilled trades.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/courses/catalog',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
