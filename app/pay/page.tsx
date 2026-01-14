// app/pay/page.tsx
import type { Metadata } from 'next';
import PaymentOptionsClient from './PaymentOptionsClient';

export const metadata: Metadata = {
  title: 'Payment Options | Elevate for Humanity',
  description:
    'See tuition payment options in one place: monthly payments with Affirm or pay-in-full with Stripe.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/pay',
  },
};

export default function PayPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
          Payment Options
        </h1>
        <p className="text-black mb-6">
          If you're not using WIOA/WRG/JRI or other funding, you can review{' '}
          monthly payments with Affirm or pay in full with Stripe below.
        </p>
        <PaymentOptionsClient />
      </section>
    </div>
  );
}
