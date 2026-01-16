import { GuidedDemoChat } from '@/components/store/GuidedDemoChat';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <GuidedDemoChat />
    </>
  );
}
