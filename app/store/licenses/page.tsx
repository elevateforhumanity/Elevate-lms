import { redirect } from 'next/navigation';

// Redirect old store/licenses to new /licenses page
export default function StoreLicensesRedirect() {
  redirect('/licenses');
}
