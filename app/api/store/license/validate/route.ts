import { hashLicenseKey, isValidLicenseKeyFormat } from '@/lib/store/license';

export const runtime = 'nodejs';
export const maxDuration = 60;
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: Request) {
  try {
    const { licenseKey, email } = await req.json();

    if (!licenseKey) {
      return Response.json({ error: 'License key required' }, { status: 400 });
    }

    // Validate format
    if (!isValidLicenseKeyFormat(licenseKey)) {
      return Response.json(
        { valid: false, error: 'Invalid license key format' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const licenseHash = hashLicenseKey(licenseKey);

    // Find license
    const query = supabase
      .from('licenses')
      .select('*, products(*)')
      .eq('license_key', licenseHash);

    if (email) {
      query.eq('email', email);
    }

    const { data: license, error } = await query.single();

    if (error || !license) {
      return Response.json(
        { valid: false, error: 'License not found' },
        { status: 404 }
      );
    }

    return Response.json({
      valid: true,
      license: {
        id: license.id,
        email: license.email,
        product: license.products,
        createdAt: license.created_at,
      },
    });
  } catch (error: unknown) {
    logger.error(
      'License validation error:',
      error instanceof Error ? error : new Error(String(error))
    );
    return Response.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
