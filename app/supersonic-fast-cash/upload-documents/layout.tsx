import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload Documents | Supersonic Fast Cash',
  description: 'Upload your tax documents securely.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
