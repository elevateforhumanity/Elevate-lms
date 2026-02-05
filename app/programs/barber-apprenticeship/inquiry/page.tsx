import { redirect } from 'next/navigation';

export default function BarberInquiryRedirect() {
  redirect('/inquiry?program=barber-apprenticeship');
}
