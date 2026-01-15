import sharp from 'sharp';
import { createClient } from '@/lib/supabase/server';

// =====================================================
// IMAGE OPTIMIZATION
// =====================================================

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

/**
 * Optimize image using Sharp
 */
export async function optimizeImage(
  buffer: Buffer,
  options: ImageOptimizationOptions = {}
): Promise<Buffer> {
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    fit = 'cover',
  } = options;

  let pipeline = sharp(buffer);

  // Resize if dimensions provided
  if (width || height) {
    pipeline = pipeline.resize(width, height, { fit });
  }

  // Convert format and compress
  switch (format) {
    case 'webp':
      pipeline = pipeline.webp({ quality });
      break;
    case 'jpeg':
      pipeline = pipeline.jpeg({ quality, progressive: true });
      break;
    case 'png':
      pipeline = pipeline.png({ quality, compressionLevel: 9 });
      break;
    case 'avif':
      pipeline = pipeline.avif({ quality });
      break;
  }

  return pipeline.toBuffer();
}

/**
 * Generate responsive image sizes
 */
export async function generateResponsiveImages(
  buffer: Buffer,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): Promise<Array<{ width: number; buffer: Buffer }>> {
  const results = await Promise.all(
    sizes.map(async (width) => ({
      width,
      buffer: await optimizeImage(buffer, { width, format: 'webp' }),
    }))
  );

  return results;
}

/**
 * Get optimized image URL from Supabase Storage
 */
export function getOptimizedImageUrl(
  path: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
  } = {}
): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucket = 'images';

  const params = new URLSearchParams();
  if (options.width) params.append('width', options.width.toString());
  if (options.height) params.append('height', options.height.toString());
  if (options.quality) params.append('quality', options.quality.toString());

  const queryString = params.toString();
  const url = `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;

  return queryString ? `${url}?${queryString}` : url;
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(
  path: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): string {
  return widths
    .map((width) => `${getOptimizedImageUrl(path, { width })} ${width}w`)
    .join(', ');
}

// =====================================================
// VIDEO OPTIMIZATION
// =====================================================

export interface VideoOptimizationOptions {
  resolution?: '360p' | '480p' | '720p' | '1080p';
  bitrate?: string;
  codec?: 'h264' | 'h265' | 'vp9';
  format?: 'mp4' | 'webm';
}

/**
 * Get video optimization settings
 */
export function getVideoOptimizationSettings(
  resolution: '360p' | '480p' | '720p' | '1080p' = '720p'
): {
  width: number;
  height: number;
  bitrate: string;
} {
  const settings = {
    '360p': { width: 640, height: 360, bitrate: '800k' },
    '480p': { width: 854, height: 480, bitrate: '1200k' },
    '720p': { width: 1280, height: 720, bitrate: '2500k' },
    '1080p': { width: 1920, height: 1080, bitrate: '5000k' },
  };

  return settings[resolution];
}

/**
 * Generate video thumbnail
 */
export async function generateVideoThumbnail(
  videoPath: string,
  timestamp: number = 0
): Promise<Buffer> {
  // This would use FFmpeg in production
  // For now, return a Content
  throw new Error('Video thumbnail generation requires FFmpeg');
}

/**
 * Get adaptive streaming manifest URL
 */
export function getAdaptiveStreamingUrl(videoId: string): {
  hls: string;
  dash: string;
} {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  return {
    hls: `${supabaseUrl}/storage/v1/object/public/videos/${videoId}/master.m3u8`,
    dash: `${supabaseUrl}/storage/v1/object/public/videos/${videoId}/manifest.mpd`,
  };
}

// =====================================================
// LAZY LOADING UTILITIES
// =====================================================

/**
 * Generate blur Content for image
 */
export async function generateBlurContent(buffer: Buffer): Promise<string> {
  const Content = await sharp(buffer)
    .resize(20, 20, { fit: 'inside' })
    .blur(10)
    .webp({ quality: 20 })
    .toBuffer();

  return `data:image/webp;base64,${Content.toString('base64')}`;
}

/**
 * Get low quality image Content (LQIP)
 */
export async function generateLQIP(buffer: Buffer): Promise<string> {
  const lqip = await sharp(buffer)
    .resize(40, 40, { fit: 'inside' })
    .webp({ quality: 30 })
    .toBuffer();

  return `data:image/webp;base64,${lqip.toString('base64')}`;
}

// =====================================================
// CDN INTEGRATION
// =====================================================

/**
 * Get CDN URL for asset
 */
export function getCDNUrl(path: string, type: 'image' | 'video' = 'image'): string {
  const cdnDomain = process.env.NEXT_PUBLIC_CDN_DOMAIN;

  if (!cdnDomain) {
    // Fallback to Supabase storage
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const bucket = type === 'image' ? 'images' : 'videos';
    return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
  }

  return `${cdnDomain}/${type}s/${path}`;
}

// =====================================================
// BATCH OPTIMIZATION
// =====================================================

/**
 * Batch optimize images in a directory
 */
export async function batchOptimizeImages(
  paths: string[],
  options: ImageOptimizationOptions = {}
): Promise<Array<{ path: string; success: boolean; error?: string }>> {
  const results = await Promise.allSettled(
    paths.map(async (path) => {
      try {
        const supabase = await createClient();

        // Download original
        const { data, error }: any = await supabase.storage
          .from('images')
          .download(path);

        if (error) throw error;

        // Convert to buffer and optimize
        const buffer = Buffer.from(await data.arrayBuffer());
        const optimized = await optimizeImage(buffer, options);

        // Upload optimized version
        const optimizedPath = path.replace(/\.[^.]+$/, '.webp');
        await supabase.storage
          .from('images')
          .upload(optimizedPath, optimized, {
            contentType: 'image/webp',
            upsert: true,
          });

        return { path, success: true };
      } catch (error) { /* Error handled silently */ 
        return {
          path,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    })
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return {
        path: paths[index],
        success: false,
        error: result.reason?.message || 'Unknown error',
      };
    }
  });
}

// =====================================================
// PERFORMANCE MONITORING
// =====================================================

export interface MediaMetrics {
  originalSize: number;
  optimizedSize: number;
  compressionRatio: number;
  format: string;
  dimensions: { width: number; height: number };
}

/**
 * Get image metrics
 */
export async function getImageMetrics(buffer: Buffer): Promise<MediaMetrics> {
  const metadata = await sharp(buffer).metadata();
  const optimized = await optimizeImage(buffer);

  return {
    originalSize: buffer.length,
    optimizedSize: optimized.length,
    compressionRatio: ((buffer.length - optimized.length) / buffer.length) * 100,
    format: metadata.format || 'unknown',
    dimensions: {
      width: metadata.width || 0,
      height: metadata.height || 0,
    },
  };
}

// =====================================================
// NEXT.JS IMAGE LOADER
// =====================================================

/**
 * Custom image loader for Next.js Image component
 */
export function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // If it's already a full URL, return as is
  if (src.startsWith('http')) {
    return src;
  }

  return getOptimizedImageUrl(src, { width, quality: quality || 75 });
}

// =====================================================
// PRELOAD HINTS
// =====================================================

/**
 * Generate preload link tags for critical images
 */
export function generatePreloadLinks(images: Array<{ src: string; type?: string }>): string {
  return images
    .map(
      (img) =>
        `<link rel="preload" as="image" href="${img.src}" ${
          img.type ? `type="${img.type}"` : ''
        }>`
    )
    .join('\n');
}

/**
 * Generate prefetch link tags for images
 */
export function generatePrefetchLinks(images: string[]): string {
  return images
    .map((src) => `<link rel="prefetch" as="image" href="${src}">`)
    .join('\n');
}
