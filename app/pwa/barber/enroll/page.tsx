import { redirect } from 'next/navigation';

// Consolidated: Redirect to main barber apprenticeship application
export default function PwaBarberEnrollPage() {
  redirect('/programs/barber-apprenticeship/apply');
}
