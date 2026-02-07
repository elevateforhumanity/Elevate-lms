/**
 * File Storage Service
 * 
 * Handles secure file storage and signed URL generation for digital downloads.
 * Supports Cloudflare R2 (S3-compatible) and AWS S3.
 * 
 * Uses dynamic imports to avoid bundling AWS SDK into the main handler.
 */

// Dynamic imports to reduce bundle size
async function getS3Modules() {
  const [s3Client, presigner] = await Promise.all([
    import('@aws-sdk/client-s3'),
    import('@aws-sdk/s3-request-presigner'),
  ]);
  return {
    S3Client: s3Client.S3Client,
    GetObjectCommand: s3Client.GetObjectCommand,
    PutObjectCommand: s3Client.PutObjectCommand,
    getSignedUrl: presigner.getSignedUrl,
  };
}

// Storage configuration
const STORAGE_CONFIG = {
  // Use R2 if configured, otherwise fall back to S3
  endpoint: process.env.R2_ENDPOINT || undefined,
  region: process.env.AWS_REGION || 'auto',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY || process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_KEY || process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  bucket: process.env.R2_BUCKET || process.env.AWS_S3_BUCKET || 'elevate-media',
};

// Cached S3 client instance
let s3ClientInstance: any = null;

async function getS3Client() {
  if (!s3ClientInstance) {
    if (!STORAGE_CONFIG.credentials.accessKeyId || !STORAGE_CONFIG.credentials.secretAccessKey) {
      throw new Error('Storage credentials not configured. Set R2_ACCESS_KEY/R2_SECRET_KEY or AWS credentials.');
    }

    const { S3Client } = await getS3Modules();
    s3ClientInstance = new S3Client({
      endpoint: STORAGE_CONFIG.endpoint,
      region: STORAGE_CONFIG.region,
      credentials: STORAGE_CONFIG.credentials,
      forcePathStyle: !!STORAGE_CONFIG.endpoint, // Required for R2
    });
  }
  return s3ClientInstance;
}

/**
 * Check if storage is configured
 */
export function isStorageConfigured(): boolean {
  return !!(
    STORAGE_CONFIG.credentials.accessKeyId &&
    STORAGE_CONFIG.credentials.secretAccessKey &&
    STORAGE_CONFIG.bucket
  );
}

/**
 * Product file paths mapping
 * Maps product IDs to their file paths in storage
 */
export const PRODUCT_FILES: Record<string, { path: string; filename: string; contentType: string; publicPath: string }> = {
  'capital-readiness-guide': {
    path: 'guides/capital-readiness-guide-v1.pdf',
    publicPath: '/downloads/guides/capital-readiness-guide-v1.pdf',
    filename: 'The-Elevate-Capital-Readiness-Guide.pdf',
    contentType: 'application/pdf',
  },
  'capital-readiness-workbook': {
    path: 'workbooks/capital-readiness-workbook-v1.pdf',
    publicPath: '/downloads/guides/capital-readiness-workbook-v1.pdf',
    filename: 'Capital-Readiness-Workbook.pdf',
    contentType: 'application/pdf',
  },
  'tax-toolkit': {
    path: 'guides/tax-business-toolkit-v1.pdf',
    publicPath: '/downloads/guides/tax-business-toolkit-v1.pdf',
    filename: 'Start-a-Tax-Business-Toolkit.pdf',
    contentType: 'application/pdf',
  },
  'grant-guide': {
    path: 'guides/grant-readiness-guide-v1.pdf',
    publicPath: '/downloads/guides/grant-readiness-guide-v1.pdf',
    filename: 'Grant-Readiness-Guide.pdf',
    contentType: 'application/pdf',
  },
};

/**
 * Get public fallback URL for a product
 * Used when R2/S3 is not configured
 */
export function getPublicFallbackUrl(productId: string, baseUrl: string): string | null {
  const fileInfo = PRODUCT_FILES[productId];
  if (!fileInfo?.publicPath) return null;
  return `${baseUrl}${fileInfo.publicPath}`;
}

/**
 * Generate a signed download URL for a product
 * URL expires after the specified duration (default: 1 hour)
 */
export async function generateSignedDownloadUrl(
  productId: string,
  expiresInSeconds: number = 3600
): Promise<string | null> {
  const fileInfo = PRODUCT_FILES[productId];
  if (!fileInfo) {
    console.error(`No file mapping for product: ${productId}`);
    return null;
  }

  if (!isStorageConfigured()) {
    console.error('Storage not configured');
    return null;
  }

  try {
    const { GetObjectCommand, getSignedUrl } = await getS3Modules();
    const client = await getS3Client();
    const command = new GetObjectCommand({
      Bucket: STORAGE_CONFIG.bucket,
      Key: fileInfo.path,
      ResponseContentDisposition: `attachment; filename="${fileInfo.filename}"`,
      ResponseContentType: fileInfo.contentType,
    });

    const signedUrl = await getSignedUrl(client, command, {
      expiresIn: expiresInSeconds,
    });

    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return null;
  }
}

/**
 * Upload a file to storage
 * Used for admin uploads of new product files
 */
export async function uploadFile(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string
): Promise<boolean> {
  if (!isStorageConfigured()) {
    throw new Error('Storage not configured');
  }

  try {
    const { PutObjectCommand } = await getS3Modules();
    const client = await getS3Client();
    const command = new PutObjectCommand({
      Bucket: STORAGE_CONFIG.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    });

    await client.send(command);
    return true;
  } catch (error) {
    console.error('Error uploading file:', error);
    return false;
  }
}

/**
 * Get file info for a product
 */
export function getProductFileInfo(productId: string) {
  return PRODUCT_FILES[productId] || null;
}
