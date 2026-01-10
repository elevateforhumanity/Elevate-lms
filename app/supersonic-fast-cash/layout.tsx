import { LiveChatWidget } from '@/components/LiveChatWidget';
import { SupersonicHeader } from './components/Header';
import { SupersonicFooter } from './components/Footer';

export default function SupersonicFastCashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SupersonicHeader />
      <main>{children}</main>
      <SupersonicFooter />
      <LiveChatWidget />
    </>
  );
}
