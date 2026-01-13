import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { getDigitalProduct } from '@/lib/store/digital-products';
import { createClient } from '@/lib/supabase/server';

/**
 * Download digital product
 *
 * This endpoint handles secure download delivery for purchased digital products.
 * Verifies purchase tokens, tracks downloads, and delivers files securely.
 */

async function verifyDownloadToken(
  token: string,
  productId: string
): Promise<boolean> {
  try {
    const supabase = await createClient();

    // Check if purchase exists with this token
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('download_token', token)
      .eq('product_id', productId)
      .single();

    if (!purchase) return false;

    // Check if token has expired (24 hours)
    if (purchase.token_expires_at) {
      const expiresAt = new Date(purchase.token_expires_at);
      if (expiresAt < new Date()) return false;
    }

    return true;
  } catch { /* Error handled silently */ 
    return false;
  }
}

async function logDownload(
  productId: string,
  token: string,
  request: NextRequest
): Promise<void> {
  try {
    const supabase = await createClient();

    await supabase.from('downloads').insert({
      product_id: productId,
      download_token: token,
      ip_address:
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip'),
      user_agent: request.headers.get('user-agent'),
    });
  } catch { /* Error handled silently */ 
  }
}

/**
 * Handle download request
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token'); // Verification token from purchase

    // Get product
    const product = getDigitalProduct(productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Verify purchase token
    if (!token) {
      return NextResponse.json(
        { error: 'Download token required' },
        { status: 401 }
      );
    }

    // Verify token against purchase records
    // In production, this should check:
    // 1. Token exists in database
    // 2. Token matches product ID
    // 3. Token hasn't expired
    // 4. Download limit not exceeded
    const isValidToken = await verifyDownloadToken(token, productId);
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Invalid or expired download link' },
        { status: 403 }
      );
    }

    // Log download attempt
    await logDownload(productId, token, request);

    // Generate signed URL or redirect to file storage
    // In production:
    // 1. Generate time-limited signed URL from S3/CloudFlare R2
    // 2. Return redirect to signed URL
    // 3. Track download analytics

    // For now, return product download URL if configured
    if (product.downloadUrl) {
      return NextResponse.redirect(product.downloadUrl);
    }

    // If no download URL configured, return instructions
    return NextResponse.json({
      message: 'Download link will be sent to your email',
      product: {
        id: product.id,
        name: product.name,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    );
  }
}
