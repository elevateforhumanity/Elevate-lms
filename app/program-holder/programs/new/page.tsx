import { redirect } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function NewProgramPage() {
  redirect('/program-holder');
}
