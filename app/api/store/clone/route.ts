import { cloneRepoForCustomer } from '@/lib/store/github-clone';

export const runtime = 'nodejs';
export const maxDuration = 60;
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: Request) {
  try {
    const { licenseKey, targetOwner, targetRepo } = await req.json();

    if (!licenseKey || !targetOwner || !targetRepo) {
      return Response.json(
        { error: 'License key, target owner, and target repo required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Validate license (simplified - should use proper validation)
    const { data: license, error: licenseError } = await supabase
      .from('licenses')
      .select('*, products(*)')
      .eq('id', licenseKey)
      .single();

    if (licenseError || !license) {
      return Response.json({ error: 'Invalid license' }, { status: 403 });
    }

    const product = license.products;
    if (!product || !product.repo) {
      return Response.json(
        { error: 'Product has no repository' },
        { status: 400 }
      );
    }

    // Clone repository
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return Response.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    const result = await cloneRepoForCustomer({
      sourceRepo: product.repo,
      targetOwner,
      targetRepo,
      githubToken,
    });

    if (!result.success) {
      return Response.json({ error: result.error }, { status: 500 });
    }

    return Response.json({
      success: true,
      repoUrl: result.repoUrl,
      cloneUrl: result.cloneUrl,
    });
  } catch (error: unknown) {
    logger.error(
      'Clone error:',
      error instanceof Error ? error : new Error(String(error))
    );
    return Response.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
