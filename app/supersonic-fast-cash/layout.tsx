import { LiveChatWidget } from '@/components/LiveChatWidget';

export default function SupersonicFastCashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <LiveChatWidget />
    </>
  );
}
