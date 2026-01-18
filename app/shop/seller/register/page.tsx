import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Register',
  alternates: { canonical: 'https://www.elevateforhumanity.org/shop/seller/register' },
};

export default function Page() {
  redirect('/shop');
}
