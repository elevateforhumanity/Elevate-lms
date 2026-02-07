/**
 * Signed Download URL Generator
 * Uses dynamic imports to avoid bundling AWS SDK into the main handler.
 */

// Cached client instance
let clientInstance: any = null;

async function getClient() {
  if (!clientInstance) {
    const { S3Client } = await import("@aws-sdk/client-s3");
    clientInstance = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY!,
        secretAccessKey: process.env.R2_SECRET_KEY!,
      },
    });
  }
  return clientInstance;
}

export async function getSignedDownload(key: string, expiresIn = 600) {
  const { GetObjectCommand } = await import("@aws-sdk/client-s3");
  const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
  
  const client = await getClient();
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: key,
  });

  return await getSignedUrl(client, command, { expiresIn });
}
