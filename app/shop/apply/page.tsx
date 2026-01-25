import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply to Partner | Elevate for Humanity',
  description: 'Apply to become a barbershop partner with Elevate for Humanity apprenticeship program.',
};

export default function ShopApplyPage() {
  redirect('/partners/barbershop-apprenticeship/apply');
}
