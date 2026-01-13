import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Success Stories | Elevate For Humanity',
  description: 'Read success stories from our graduates, workforce development insights, program updates, and career training tips from Elevate for Humanity.',
  alternates: {
    canonical: 'https://elevateforhumanity.institute/blog',
    types: {
      'application/rss+xml': 'https://elevateforhumanity.institute/blog/rss.xml',
    },
  },
  openGraph: {
    title: 'Blog & Success Stories | Elevate For Humanity',
    description: 'Success stories, workforce development insights, and career training updates.',
    url: 'https://elevateforhumanity.institute/blog',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
