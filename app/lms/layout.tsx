import React from 'react';
// Root LMS layout - NO AUTH CHECKS HERE
// Auth is handled in app/lms/(app)/layout.tsx
// This layout wraps both public and protected routes

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  // No auth, no sidebar - just pass through
  // The (app) route group has its own layout with auth + sidebar
  // The (public) route group renders standalone

  return <>{children}</>;
}
