import { redirect } from 'next/navigation';

// Consolidated: Redirect to main enrollment flow
export default function PortalBarberEnrollPage() {
  redirect('/apply?program=barber-apprenticeship');
}
