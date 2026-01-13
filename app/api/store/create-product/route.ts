import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { createStoreProduct } from '@/lib/store/stripe-products';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: NextRequest) {
  try {
    const { title, price, repo, description } = await req.json();

    if (!title || !price || !repo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create product in Stripe
    const { product, price: priceObj } = await createStoreProduct(
      title,
      Number(price),
      repo,
      description
    );

    // Store in Supabase
    const supabase = await createClient();
    const { data, error }: any = await supabase
      .from('products')
      .insert({
        title,
        description,
        price: Number(price),
        repo,
        stripe_product_id: product.id,
        stripe_price_id: priceObj.id,
      })
      .select()
      .single();

    if (error) {
      logger.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save product', details: toErrorMessage(error) },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      productId: data.id,
      stripeProductId: product.id,
    });
  } catch (error: any) {
    logger.error(
      'Create product error:',
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      {
        error: 'Failed to create product',
        message: toErrorMessage(error),
      },
      { status: 500 }
    );
  }
}
