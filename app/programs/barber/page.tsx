import { redirect } from 'next/navigation';

// Consolidated: /programs/barber redirects to /programs/barber-apprenticeship
export default function BarberProgramPage() {
  redirect('/programs/barber-apprenticeship');
}
