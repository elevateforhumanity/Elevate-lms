export const runtime = 'nodejs';
export const maxDuration = 60;

import { verifyWebhookSignature } from '@/lib/store/stripe';
import { generateLicenseKey, hashLicenseKey } from '@/lib/store/license';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return Response.json({ error: 'No signature' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return Response.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Verify webhook signature
    const event = verifyWebhookSignature(body, signature, webhookSecret);

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const productId = session.metadata?.productId;
      const email = session.customer_email;

      if (!productId || !email) {
        logger.error('Missing productId or email in webhook');
        return Response.json(
          { error: 'Invalid webhook data' },
          { status: 400 }
        );
      }

      const supabase = await createClient();

      // Get product details
      const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (!product) {
        logger.error('Product not found:', productId);
        return Response.json({ error: 'Product not found' }, { status: 404 });
      }

      // Generate license key
      const licenseKey = generateLicenseKey();
      const licenseHash = hashLicenseKey(licenseKey);

      // Store purchase
      const { error: purchaseError } = await supabase.from('purchases').insert({
        email,
        product_id: productId,
        repo: product.repo,
      });

      if (purchaseError) {
        logger.error('Failed to store purchase:', purchaseError);
      }

      // Store license
      const { error: licenseError } = await supabase.from('licenses').insert({
        email,
        product_id: productId,
        license_key: licenseHash,
      });

      if (licenseError) {
        logger.error('Failed to store license:', licenseError);
      }

      // Send email with license key
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            subject: `Your ${product.title} License Key`,
            template: 'license-delivery',
            data: {
              productName: product.title,
              licenseKey: licenseKey,
              repo: product.repo,
              downloadUrl:
                product.download_url ||
                `${process.env.NEXT_PUBLIC_SITE_URL}/downloads/${productId}`,
            },
          }),
        });
        logger.info('License email sent to:', email);
      } catch (emailError) {
        logger.error('Failed to send license email:', emailError);
        // Still return success - license is stored in database
      }

      return Response.json({ received: true });
    }

    return Response.json({ received: true });
  } catch (error: unknown) {
    logger.error(
      'Webhook error:',
      error instanceof Error ? error : new Error(String(error))
    );
    return Response.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
