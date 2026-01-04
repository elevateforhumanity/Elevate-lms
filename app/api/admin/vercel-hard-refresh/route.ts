export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/rbac';
import { withAuth } from '@/lib/with-auth';
import { logger } from '@/lib/logger';

export const POST = withAuth(
  async (req: NextRequest, user) => {
    // Check if user is admin
    const session = await requireAdmin();

    if (!session || session.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
      const PROJECT_ID = process.env.VERCEL_PROJECT_ID;

      if (!VERCEL_TOKEN || !PROJECT_ID) {
        return NextResponse.json(
          { error: 'Vercel credentials not configured' },
          { status: 500 }
        );
      }

      // Trigger a new deployment
      const response = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'fix2-gpql',
          projectId: PROJECT_ID,
          target: 'production',
          gitSource: {
            type: 'github',
            ref: 'main',
            repoId: 'elevateforhumanity/fix2',
          },
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        logger.error('Vercel deployment error:', error);
        return NextResponse.json(
          { error: 'Failed to trigger deployment' },
          { status: 500 }
        );
      }

      const deployment = await response.json();

      return NextResponse.json({
        success: true,
        deploymentId: deployment.id,
        deploymentUrl: deployment.url,
        message: 'New deployment triggered successfully',
      });
    } catch (err: unknown) {
      logger.error(
        'Hard refresh error:',
        err instanceof Error ? err : new Error(String(err))
      );
      return NextResponse.json(
        { error: (err as Error).message || 'Failed to trigger hard refresh' },
        { status: 500 }
      );
    }
  },
  { roles: ['admin', 'super_admin'] }
);
