"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function GoogleClassroomSync() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    // Simulate sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastSync(new Date());
    setSyncing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Sync Status</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-black">Last Sync</p>
            <p className="font-medium">
              {lastSync ? lastSync.toLocaleString() : 'Never'}
            </p>
          </div>
          <Button
            onClick={handleSync}
            disabled={syncing}
            className="w-full"
          >
            {syncing ? 'Syncing...' : 'Sync Now'}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Sync Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Au courses</span>
            <input type="checkbox" className="toggle" />
          </div>
          <div className="flex items-center justify-between">
            <span>Sync assignments</span>
            <input type="checkbox" className="toggle" />
          </div>
          <div className="flex items-center justify-between">
            <span>Sync grades</span>
            <input type="checkbox" className="toggle" />
          </div>
        </div>
      </Card>
    </div>
  );
}
