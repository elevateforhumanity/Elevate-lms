'use client';

import { useEffect } from 'react';
import { checkVersionMismatch, clearVersionAndReload } from '@/lib/version-check';

export function VersionGuard() {
  useEffect(() => {
    if (checkVersionMismatch()) {
      clearVersionAndReload();
    }
  }, []);

  return null;
}
