import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | Elevate for Humanity',
  robots: { index: false, follow: false },
};

export default function CheckoutSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
