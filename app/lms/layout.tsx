import React from 'react';
import { Metadata } from 'next';

// Root LMS layout - NO AUTH CHECKS HERE
// Auth is handled in app/lms/(app)/layout.tsx
// This layout wraps both public and protected routes

export const metadata: Metadata = {
  title: {
    default: 'Learning Portal | Elevate',
    template: '%s | Elevate Learn',
  },
  description: 'Access your courses, track progress, and earn certifications.',
  manifest: '/manifest-student.json',
};

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  // No auth, no sidebar - just pass through
  // The (app) route group has its own layout with auth + sidebar
  // The (public) route group renders standalone

  return <>{children}</>;
}
