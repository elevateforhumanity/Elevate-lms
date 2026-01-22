'use client';

import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('@/components/Confetti'), { ssr: false });

export default function ConfettiWrapper() {
  return <Confetti />;
}
