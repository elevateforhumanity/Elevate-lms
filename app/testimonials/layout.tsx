import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success Stories & Testimonials | Elevate for Humanity',
  description: 'Read inspiring success stories from graduates who transformed their lives through our workforce training programs. Real careers, real salary increases, real impact.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/testimonials',
  },
  openGraph: {
    title: 'Success Stories - Real People, Real Results',
    description: 'Meet the graduates who transformed their lives through career training.',
    url: 'https://www.elevateforhumanity.org/testimonials',
    siteName: 'Elevate for Humanity',
    type: 'website',
  },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
