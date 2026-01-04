import { createCheckoutSession } from '@/lib/store/stripe';

export const runtime = 'nodejs';
export const maxDuration = 60;
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: Request) {
  try {
    const { productId, email } = await req.json();

    if (!productId) {
      return Response.json({ error: 'Product ID required' }, { status: 400 });
    }

    const supabase = await createClient();

    // Get product details
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error || !product) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      productId: product.id,
      productTitle: product.title,
      price: product.price,
      email,
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/store/cancel`,
    });

    return Response.json({ sessionId: session.id, url: session.url });
  } catch (error: unknown) {
    logger.error(
      'Checkout error:',
      error instanceof Error ? error : new Error(String(error))
    );
    return Response.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
