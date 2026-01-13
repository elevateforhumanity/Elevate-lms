import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Tracker | Supersonic Fast Cash',
  description: 'Track your tax refund status with Supersonic Fast Cash.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
