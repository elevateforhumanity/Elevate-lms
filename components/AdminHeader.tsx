'use client';

import { Button } from '@/components/ui/Button';

export default function AdminHeader() {
  const handleSignOut = async () => {
    // Sign out logic - redirect to admin login
    window.location.href = '/admin/login';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
        <Button
          onClick={handleSignOut}
          variant="secondary"
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
}
