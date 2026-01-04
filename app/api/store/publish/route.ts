export const runtime = 'nodejs';
export const maxDuration = 60;

import { stripe } from '@/lib/stripe/client';
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Check auth
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const product = await req.json();

    // Create product in Stripe
    const stripeProduct = await createStripeProduct(product);

    // Save to database
    const { data, error }: any = await supabase
      .from('store_products')
      .upsert({
        title: product.title,
        description: product.description,
        features: product.features,
        pricing: product.pricing,
        demo_enabled: product.demo.enabled,
        demo_url: product.demo.url,
        stripe_product_id: stripeProduct.id,
        published: true,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      url: `/store/codebase-clone`,
      productId: data.id,
    });
  } catch (error: unknown) {
    logger.error(
      'Failed to publish product:',
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      { error: 'Failed to publish product', message: toErrorMessage(error) },
      { status: 500 }
    );
  }
}

async function createStripeProduct(product: Record<string, unknown>) {
  // Create Stripe product with pricing tiers
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-12-18.acacia',
  });

  const stripeProduct = await stripe.products.create({
    name: product.title as string,
    description: product.description as string,
    metadata: {
      type: 'codebase_clone',
    },
  });

  // Create prices for each tier
  const pricing = product.pricing as Record<string, { price: number; name: string }>;
  for (const [key, tier] of Object.entries(pricing)) {
    await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: tier.price * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        tier: key,
        name: tier.name,
      },
    });
  }

  return stripeProduct;
}
