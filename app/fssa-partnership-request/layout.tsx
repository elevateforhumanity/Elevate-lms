import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FSSA Partnership Request | Indiana Family & Social Services | Elevate for Humanity',
  description: 'Request a partnership with Elevate for Humanity for FSSA programs. We provide WIOA-aligned career training for TANF, SNAP E&T, and other FSSA-served populations.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/fssa-partnership-request',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
