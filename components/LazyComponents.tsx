'use client';

import dynamic from 'next/dynamic';

// Lazy load heavy components that are below the fold
export const LazyAILiveChat = dynamic(
  () => import('@/components/chat/AILiveChat'),
  {
    ssr: false,
    loading: () => null,
  }
);

export const LazyVideoPlayer = dynamic(
  () => import('@/components/VideoPlayer'),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-200 w-full h-64 rounded-xl" />,
  }
);

export const LazyCalendar = dynamic(
  () => import('@/components/Calendar'),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-200 w-full h-96 rounded-xl" />,
  }
);

export const LazyChart = dynamic(
  () => import('@/components/Chart'),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-200 w-full h-64 rounded-xl" />,
  }
);
