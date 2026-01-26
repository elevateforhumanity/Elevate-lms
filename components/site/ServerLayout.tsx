// Server Component - NO 'use client'
// Main layout that renders header/footer server-side

import Header from './Header';
import ServerFooter from './ServerFooter';

interface ServerLayoutProps {
  children: React.ReactNode;
}

export default function ServerLayout({ children }: ServerLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 pt-[70px]" role="main">
        {children}
      </main>
      <ServerFooter />
    </div>
  );
}
