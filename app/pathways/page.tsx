import { redirect } from 'next/navigation';

// Redirect /pathways to /programs for consolidated user experience
export default function PathwaysPage() {
  redirect('/programs');
}
