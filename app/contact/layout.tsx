import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Elevate For Humanity',
  description: 'Get in touch with Elevate for Humanity. Questions about free career training programs? We are here to help you start your career journey.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/contact',
  },
  openGraph: {
    title: 'Contact Elevate for Humanity',
    description: 'Questions about free career training? We are here to help.',
    url: 'https://www.elevateforhumanity.org/contact',
    siteName: 'Elevate for Humanity',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Contact Us' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Elevate for Humanity',
    description: 'Questions about free career training? We are here to help.',
    images: ['/og-default.jpg'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
