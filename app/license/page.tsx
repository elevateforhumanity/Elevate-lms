import { redirect } from 'next/navigation';

/**
 * Quick access redirect to licensing page
 * Makes /license easier to share than /pricing/sponsor-licensing
 */
export default function LicensePage() {
  redirect('/pricing/sponsor-licensing');
}
