import { redirect } from 'next/navigation';

// Redirect to the main student chat
export default function StudentPortalMessagesPage() {
  redirect('/student/chat');
}
