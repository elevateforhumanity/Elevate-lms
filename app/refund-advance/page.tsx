import { Metadata } from 'next';
import { redirect } from 'next/navigation';


export const metadata: Metadata = {
  title: 'Refund Advance | Elevate for Humanity',
  description: 'Elevate for Humanity - Career training and workforce development programs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/refund-advance',
  },
};

export default function RefundAdvancePage() {
  redirect('/banking/refund-advance');
}
