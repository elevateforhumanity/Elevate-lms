import { redirect } from 'next/navigation';

// Enterprise licensing moved to /licenses
export default function EnterpriseRedirect() {
  redirect('/licenses');
}
