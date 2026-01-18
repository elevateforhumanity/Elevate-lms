import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop | Seller | Register | Elevate for Humanity',
  description: 'Elevate for Humanity - Career training and workforce development programs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/shop/seller/register',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
