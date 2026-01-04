import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';
import { withAuth } from '@/lib/with-auth';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export const POST = withAuth(
  async (req, context) => {
    const { user } = context;
    const supabase = await createRouteHandlerClient({ cookies });
    const body = await req.json();
    const { programHolderId, name, signatureDataUrl } = body || {};

    if (!programHolderId || !name || !signatureDataUrl) {
      return new Response('Missing required fields', { status: 400 });
    }

    const matches = signatureDataUrl.match(/^data:image\/png;base64,(.+)$/);
    if (!matches) {
      return new Response('Invalid signature format', { status: 400 });
    }

    const base64 = matches[1];
    const buffer = Buffer.from(base64, 'base64');

    const serviceClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const path = `program_holders/${programHolderId}/admin_signature.png`;
    const { error: uploadError } = await serviceClient.storage
      .from('agreements')
      .upload(path, buffer, { contentType: 'image/png', upsert: true });

    if (uploadError) {
      logger.error('Upload error:', uploadError);
      return new Response(uploadError.message, { status: 500 });
    }

    const sigUrl = path;
    const now = new Date().toISOString();

    const { data: updated, error } = await supabase
      .from('program_holders')
      .update({
        mou_status: 'fully_executed',
        mou_admin_name: name,
        mou_admin_signed_at: now,
        mou_admin_sig_url: sigUrl,
      })
      .eq('id', programHolderId)
      .select(
        `
        id,
        name,
        payout_share,
        mou_status,
        mou_holder_name,
        mou_holder_signed_at,
        mou_holder_sig_url,
        mou_admin_name,
        mou_admin_signed_at,
        mou_admin_sig_url,
        mou_final_pdf_url
      `
      )
      .single();

    if (error) {
      logger.error('Update error:', error);
      return new Response(toErrorMessage(error), { status: 500 });
    }

    return Response.json(updated);
  },
  { roles: ['admin', 'super_admin'] }
);
