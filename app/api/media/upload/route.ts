import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    const form = await req.formData();
    const file = form.get('file') as File;
    const folder = (form.get('folder') as string) || 'uploads';
    const bucket = (form.get('bucket') as string) || 'media';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${sanitizedName}`;
    const path = `${folder}/${filename}`;

    // Upload to Supabase Storage
    const { data, error }: any = await supabase.storage
      .from(bucket)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: false,
        cacheControl: '3600',
      });

    if (error) {
      logger.error('Upload error:', error);
      return NextResponse.json(
        { error: toErrorMessage(error) },
        { status: 500 }
      );
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path);

    return NextResponse.json({
      ok: true,
      path: data.path,
      url: publicUrl,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error: any) {
    logger.error(
      'Upload error:',
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      { error: 'Failed to upload file', message: toErrorMessage(error) },
      { status: 500 }
    );
  }
}
