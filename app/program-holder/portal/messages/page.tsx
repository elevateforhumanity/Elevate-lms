import { redirect } from 'next/navigation';

// ACTIVE: Messaging is Implemented
// Redirect to support
export default function PortalMessagesRedirect() {
  redirect('/program-holder/support');
}
