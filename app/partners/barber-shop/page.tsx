import { redirect } from 'next/navigation';

// Consolidated: /partners/barber-shop redirects to /partners/barbershop-apprenticeship
export default function BarberShopPartnerPage() {
  redirect('/partners/barbershop-apprenticeship');
}
