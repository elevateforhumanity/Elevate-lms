import { redirect } from 'next/navigation';

// Consolidated to /testimonials - redirect handled by Netlify edge,
// this catches local dev and non-Netlify deployments
export default function SuccessStoriesRedirect() {
  redirect('/testimonials');
}

// Keep metadata for SEO during transition
export const metadata = {
  title: 'Success Stories - Real People, Real Results | Elevate for Humanity',
  description:
    'Read inspiring success stories from graduates who transformed their lives through our workforce training programs. Real careers, real impact.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/testimonials',
  },
};
