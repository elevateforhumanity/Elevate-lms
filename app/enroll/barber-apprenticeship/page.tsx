import { redirect } from 'next/navigation';

// Barber Apprenticeship requires application flow first
// Payment happens AFTER application, not before
export default function BarberEnrollEntryPage() {
  redirect('/apply?program=barber-apprenticeship');
}
