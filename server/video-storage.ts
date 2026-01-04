/**
 * Video Storage Service
 * Handles video file storage and retrieval
 * Supports local filesystem and Cloudflare R2 storage
 */

import fs from 'fs/promises';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export interface StorageConfig {
  type: 'local' | 'cloudflare-r2' | 'cloudflare-stream';
  localPath?: string;
  // Cloudflare R2 config
  accountId?: string;
  bucket?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  publicUrl?: string; // Custom domain for R2 bucket
  // Cloudflare Stream config
  apiToken?: string;
}

export interface VideoMetadata {
  jobId: string;
  title: string;
  duration: number;
  format: string;
  resolution: string;
  fileSize: number;
  createdAt: Date;
  userId?: string;
  thumbnailUrl?: string;
}

/**
 * Local filesystem storage
 */
export class LocalStorage {
  private basePath: string;

  constructor(basePath: string = path.join(process.cwd(), 'output')) {
    this.basePath = basePath;
  }

  async initialize(): Promise<void> {
    await fs.mkdir(this.basePath, { recursive: true });
    await fs.mkdir(path.join(this.basePath, 'videos'), { recursive: true });
    await fs.mkdir(path.join(this.basePath, 'thumbnails'), { recursive: true });
  }

  async saveVideo(
    videoPath: string,
    jobId: string,
    metadata: VideoMetadata
  ): Promise<string> {
    const fileName = `${jobId}.mp4`;
    const destination = path.join(this.basePath, 'videos', fileName);

    // Copy video file
    await fs.copyFile(videoPath, destination);

    // Save metadata
    const metadataPath = path.join(this.basePath, 'videos', `${jobId}.json`);
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));

    return destination;
  }

  async getVideo(jobId: string): Promise<string | null> {
    const videoPath = path.join(this.basePath, 'videos', `${jobId}.mp4`);

    try {
      await fs.access(videoPath);
      return videoPath;
    } catch {
      return null;
    }
  }

  async getVideoMetadata(jobId: string): Promise<VideoMetadata | null> {
    const metadataPath = path.join(this.basePath, 'videos', `${jobId}.json`);

    try {
      const data = await fs.readFile(metadataPath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  async deleteVideo(jobId: string): Promise<boolean> {
    try {
      const videoPath = path.join(this.basePath, 'videos', `${jobId}.mp4`);
      const metadataPath = path.join(this.basePath, 'videos', `${jobId}.json`);
      const thumbnailPath = path.join(
        this.basePath,
        'thumbnails',
        `${jobId}.jpg`
      );

      await Promise.all([
        fs.unlink(videoPath).catch(() => {}),
        fs.unlink(metadataPath).catch(() => {}),
        fs.unlink(thumbnailPath).catch(() => {}),
      ]);

      return true;
    } catch (error) {
      console.error(`Error deleting video ${jobId}:`, error);
      return false;
    }
  }

  async listVideos(userId?: string): Promise<VideoMetadata[]> {
    try {
      const videosDir = path.join(this.basePath, 'videos');
      const files = await fs.readdir(videosDir);

      const metadataFiles = files.filter((f) => f.endsWith('.json'));
      const videos: VideoMetadata[] = [];

      for (const file of metadataFiles) {
        const metadataPath = path.join(videosDir, file);
        const data = await fs.readFile(metadataPath, 'utf-8');
        const metadata: VideoMetadata = JSON.parse(data);

        // Filter by userId if provided
        if (!userId || metadata.userId === userId) {
          videos.push(metadata);
        }
      }

      // Sort by creation date (newest first)
      videos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      return videos;
    } catch (error) {
      console.error('Error listing videos:', error);
      return [];
    }
  }

  async getVideoStream(jobId: string): Promise<NodeJS.ReadableStream | null> {
    const videoPath = await this.getVideo(jobId);
    if (!videoPath) {
      return null;
    }

    return createReadStream(videoPath);
  }

  async getStorageStats(): Promise<{
    totalVideos: number;
    totalSize: number;
    availableSpace: number;
  }> {
    try {
      const videosDir = path.join(this.basePath, 'videos');
      const files = await fs.readdir(videosDir);

      const videoFiles = files.filter((f) => f.endsWith('.mp4'));
      let totalSize = 0;

      for (const file of videoFiles) {
        const filePath = path.join(videosDir, file);
        const stats = await fs.stat(filePath);
        totalSize += stats.size;
      }

      return {
        totalVideos: videoFiles.length,
        totalSize,
        availableSpace: 0, // Would need to check disk space
      };
    } catch (error) {
      console.error('Error getting storage stats:', error);
      return {
        totalVideos: 0,
        totalSize: 0,
        availableSpace: 0,
      };
    }
  }
}

/**
 * Video export formats and options
 */
export interface ExportOptions {
  format: 'mp4' | 'webm' | 'mov';
  quality: 'low' | 'medium' | 'high' | 'ultra';
  resolution?: string;
  bitrate?: string;
  codec?: string;
}

/**
 * Export video to different formats
 */
export async function exportVideo(
  inputPath: string,
  outputPath: string,
  options: ExportOptions
): Promise<string> {
  // This would use FFmpeg to convert/export video
  // For now, just copy the file
  await fs.copyFile(inputPath, outputPath);
  return outputPath;
}

/**
 * Generate video thumbnail
 */
export async function generateThumbnail(
  videoPath: string,
  outputPath: string,
  timeOffset: number = 1
): Promise<string> {
  // This would use FFmpeg to extract a frame
  // For now, return a placeholder
  return outputPath;
}

/**
 * Get video file size
 */
export async function getVideoFileSize(videoPath: string): Promise<number> {
  try {
    const stats = await fs.stat(videoPath);
    return stats.size;
  } catch (error) {
    console.error('Error getting video file size:', error);
    return 0;
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate video file
 */
export async function validateVideoFile(videoPath: string): Promise<{
  valid: boolean;
  error?: string;
  duration?: number;
  resolution?: string;
}> {
  try {
    // Check if file exists
    await fs.access(videoPath);

    // Check file size
    const stats = await fs.stat(videoPath);
    if (stats.size === 0) {
      return { valid: false, error: 'Video file is empty' };
    }

    // Would use FFprobe to get video metadata
    // For now, return basic validation
    return {
      valid: true,
      duration: 0,
      resolution: '1920x1080',
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Clean up old videos
 */
export async function cleanupOldVideos(
  storage: LocalStorage,
  maxAgeHours: number = 24
): Promise<number> {
  try {
    const videos = await storage.listVideos();
    const now = new Date();
    let deletedCount = 0;

    for (const video of videos) {
      const ageHours =
        (now.getTime() - new Date(video.createdAt).getTime()) /
        (1000 * 60 * 60);

      if (ageHours > maxAgeHours) {
        await storage.deleteVideo(video.jobId);
        deletedCount++;
      }
    }

    return deletedCount;
  } catch (error) {
    console.error('Error cleaning up old videos:', error);
    return 0;
  }
}

/**
 * Cloudflare R2 Storage
 * S3-compatible storage from Cloudflare
 */
export class CloudflareR2Storage {
  private s3Client: S3Client;
  private bucket: string;
  private publicUrl?: string;

  constructor(config: {
    accountId: string;
    bucket: string;
    accessKeyId: string;
    secretAccessKey: string;
    publicUrl?: string;
  }) {
    this.bucket = config.bucket;
    this.publicUrl = config.publicUrl;

    // Initialize S3 client with R2 endpoint
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  async initialize(): Promise<void> {
  }

  async saveVideo(
    videoPath: string,
    jobId: string,
    metadata: VideoMetadata
  ): Promise<string> {
    try {
      const fileName = `videos/${jobId}.mp4`;
      const metadataFileName = `videos/${jobId}.json`;

      // Read video file
      const videoBuffer = await fs.readFile(videoPath);

      // Upload video to R2
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: fileName,
          Body: videoBuffer,
          ContentType: 'video/mp4',
          Metadata: {
            title: metadata.title,
            duration: metadata.duration.toString(),
            format: metadata.format,
            resolution: metadata.resolution,
            userId: metadata.userId || '',
          },
        })
      );

      // Upload metadata
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: metadataFileName,
          Body: JSON.stringify(metadata, null, 2),
          ContentType: 'application/json',
        })
      );

      const url = this.publicUrl
        ? `${this.publicUrl}/${fileName}`
        : `https://${this.bucket}.r2.cloudflarestorage.com/${fileName}`;

      return url;
    } catch (error) {
      console.error('Error uploading to R2:', error);
      throw error;
    }
  }

  async getVideo(jobId: string): Promise<string | null> {
    try {
      const fileName = `videos/${jobId}.mp4`;

      // Check if object exists
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: fileName,
        })
      );

      // Generate presigned URL (valid for 1 hour)
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
      });

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });
      return url;
    } catch (error) {
      console.error('Error getting video from R2:', error);
      return null;
    }
  }

  async getVideoMetadata(jobId: string): Promise<VideoMetadata | null> {
    try {
      const metadataFileName = `videos/${jobId}.json`;

      const response = await this.s3Client.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: metadataFileName,
        })
      );

      if (!response.Body) {
        return null;
      }

      const bodyString = await response.Body.transformToString();
      return JSON.parse(bodyString);
    } catch (error) {
      console.error('Error getting metadata from R2:', error);
      return null;
    }
  }

  async deleteVideo(jobId: string): Promise<boolean> {
    try {
      const fileName = `videos/${jobId}.mp4`;
      const metadataFileName = `videos/${jobId}.json`;
      const thumbnailFileName = `thumbnails/${jobId}.jpg`;

      await Promise.all([
        this.s3Client
          .send(
            new DeleteObjectCommand({
              Bucket: this.bucket,
              Key: fileName,
            })
          )
          .catch(() => {}),
        this.s3Client
          .send(
            new DeleteObjectCommand({
              Bucket: this.bucket,
              Key: metadataFileName,
            })
          )
          .catch(() => {}),
        this.s3Client
          .send(
            new DeleteObjectCommand({
              Bucket: this.bucket,
              Key: thumbnailFileName,
            })
          )
          .catch(() => {}),
      ]);

      return true;
    } catch (error) {
      console.error(`Error deleting video from R2: ${jobId}`, error);
      return false;
    }
  }

  async listVideos(userId?: string): Promise<VideoMetadata[]> {
    try {
      const response = await this.s3Client.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          Prefix: 'videos/',
          MaxKeys: 1000,
        })
      );

      if (!response.Contents) {
        return [];
      }

      const metadataFiles = response.Contents.filter((obj) =>
        obj.Key?.endsWith('.json')
      );

      const videos: VideoMetadata[] = [];

      for (const file of metadataFiles) {
        if (!file.Key) continue;

        try {
          const response = await this.s3Client.send(
            new GetObjectCommand({
              Bucket: this.bucket,
              Key: file.Key,
            })
          );

          if (response.Body) {
            const bodyString = await response.Body.transformToString();
            const metadata: VideoMetadata = JSON.parse(bodyString);

            // Filter by userId if provided
            if (!userId || metadata.userId === userId) {
              videos.push(metadata);
            }
          }
        } catch (error) {
          console.error(`Error reading metadata file ${file.Key}:`, error);
        }
      }

      // Sort by creation date (newest first)
      videos.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return videos;
    } catch (error) {
      console.error('Error listing videos from R2:', error);
      return [];
    }
  }

  async getVideoStream(jobId: string): Promise<NodeJS.ReadableStream | null> {
    try {
      const fileName = `videos/${jobId}.mp4`;

      const response = await this.s3Client.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: fileName,
        })
      );

      if (!response.Body) {
        return null;
      }

      // Convert AWS SDK stream to Node.js stream
      return response.Body as unknown as NodeJS.ReadableStream;
    } catch (error) {
      console.error('Error getting video stream from R2:', error);
      return null;
    }
  }

  async getStorageStats(): Promise<{
    totalVideos: number;
    totalSize: number;
    availableSpace: number;
  }> {
    try {
      const response = await this.s3Client.send(
        new ListObjectsV2Command({
          Bucket: this.bucket,
          Prefix: 'videos/',
          MaxKeys: 1000,
        })
      );

      if (!response.Contents) {
        return { totalVideos: 0, totalSize: 0, availableSpace: 0 };
      }

      const videoFiles = response.Contents.filter((obj) =>
        obj.Key?.endsWith('.mp4')
      );

      const totalSize = videoFiles.reduce(
        (sum, file) => sum + (file.Size || 0),
        0
      );

      return {
        totalVideos: videoFiles.length,
        totalSize,
        availableSpace: 0, // R2 has no practical limit
      };
    } catch (error) {
      console.error('Error getting R2 storage stats:', error);
      return { totalVideos: 0, totalSize: 0, availableSpace: 0 };
    }
  }

  /**
   * Generate public URL for video (if custom domain is configured)
   */
  getPublicUrl(jobId: string): string | null {
    if (!this.publicUrl) {
      return null;
    }
    return `${this.publicUrl}/videos/${jobId}.mp4`;
  }

  /**
   * Generate presigned URL for temporary access
   */
  async getPresignedUrl(
    jobId: string,
    expiresIn: number = 3600
  ): Promise<string | null> {
    try {
      const fileName = `videos/${jobId}.mp4`;

      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
      });

      const url = await getSignedUrl(this.s3Client, command, { expiresIn });
      return url;
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      return null;
    }
  }
}

/**
 * Cloudflare Stream Storage
 * Uses Cloudflare Stream for video hosting
 */
export class CloudflareStreamStorage {
  private streamService: any; // CloudflareStreamService
  private localCache: LocalStorage;

  constructor(config: { accountId: string; apiToken: string }) {
    // Dynamically import to avoid circular dependencies
    import('./cloudflare-stream').then((module) => {
      this.streamService = new module.CloudflareStreamService(config);
    });

    // Use local storage for temporary caching
    this.localCache = new LocalStorage();
  }

  async initialize(): Promise<void> {
    await this.localCache.initialize();
  }

  async saveVideo(
    videoPath: string,
    jobId: string,
    metadata: VideoMetadata
  ): Promise<string> {
    try {
      if (!this.streamService) {
        throw new Error('Cloudflare Stream service not initialized');
      }


      // Upload to Cloudflare Stream
      const streamVideo = await this.streamService.uploadVideo(videoPath, {
        name: jobId,
        title: metadata.title,
        userId: metadata.userId,
        requireSignedURLs: false,
        allowedOrigins: ['*'],
      });

      // Wait for video to be ready
      await this.streamService.waitForVideoReady(streamVideo.uid, 300000, 5000);

      // Save metadata locally with Stream UID
      const extendedMetadata = {
        ...metadata,
        streamUid: streamVideo.uid,
        streamUrl: this.streamService.getVideoUrl(streamVideo.uid),
        thumbnailUrl: this.streamService.getThumbnailUrl(streamVideo.uid),
        embedCode: this.streamService.getEmbedCode(streamVideo.uid),
      };

      await this.localCache.saveVideo(videoPath, jobId, extendedMetadata);

      return streamVideo.uid;
    } catch (error) {
      console.error('Error uploading to Cloudflare Stream:', error);
      throw error;
    }
  }

  async getVideo(jobId: string): Promise<string | null> {
    try {
      const metadata = await this.getVideoMetadata(jobId);
      if (!metadata || !(metadata as any).streamUid) {
        return null;
      }

      return this.streamService.getVideoUrl((metadata as any).streamUid);
    } catch (error) {
      console.error('Error getting video from Cloudflare Stream:', error);
      return null;
    }
  }

  async getVideoMetadata(jobId: string): Promise<VideoMetadata | null> {
    return await this.localCache.getVideoMetadata(jobId);
  }

  async deleteVideo(jobId: string): Promise<boolean> {
    try {
      const metadata = await this.getVideoMetadata(jobId);
      if (metadata && (metadata as any).streamUid) {
        await this.streamService.deleteVideo((metadata as any).streamUid);
      }

      await this.localCache.deleteVideo(jobId);
      return true;
    } catch (error) {
      console.error('Error deleting video from Cloudflare Stream:', error);
      return false;
    }
  }

  async listVideos(userId?: string): Promise<VideoMetadata[]> {
    return await this.localCache.listVideos(userId);
  }

  async getVideoStream(jobId: string): Promise<NodeJS.ReadableStream | null> {
    // Cloudflare Stream uses HLS, so we return the URL instead
    const url = await this.getVideo(jobId);
    if (!url) {
      return null;
    }

    // For HLS streaming, client should use the URL directly
    // This is a placeholder - actual streaming would be handled by Cloudflare
    return null;
  }

  async getStorageStats(): Promise<{
    totalVideos: number;
    totalSize: number;
    availableSpace: number;
  }> {
    if (!this.streamService) {
      return { totalVideos: 0, totalSize: 0, availableSpace: 0 };
    }

    const { videos, total } = await this.streamService.listVideos({
      limit: 1000,
    });
    const totalSize = videos.reduce(
      (sum: number, video: any) => sum + (video.size || 0),
      0
    );

    return {
      totalVideos: total,
      totalSize,
      availableSpace: 0, // Cloudflare Stream has no practical limit
    };
  }

  /**
   * Get Cloudflare Stream embed code
   */
  async getEmbedCode(jobId: string): Promise<string | null> {
    const metadata = await this.getVideoMetadata(jobId);
    if (!metadata || !(metadata as any).streamUid) {
      return null;
    }

    return this.streamService.getEmbedCode((metadata as any).streamUid);
  }

  /**
   * Get video thumbnail URL
   */
  async getThumbnailUrl(jobId: string): Promise<string | null> {
    const metadata = await this.getVideoMetadata(jobId);
    if (!metadata || !(metadata as any).streamUid) {
      return null;
    }

    return this.streamService.getThumbnailUrl((metadata as any).streamUid);
  }
}

/**
 * Storage factory - creates appropriate storage based on config
 */
export function createStorage(
  config?: StorageConfig
): LocalStorage | CloudflareR2Storage | CloudflareStreamStorage {
  const storageType = config?.type || process.env.STORAGE_TYPE || 'local';

  if (storageType === 'cloudflare-stream') {
    const accountId = config?.accountId || process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken =
      config?.apiToken ||
      process.env.CLOUDFLARE_STREAM_API_TOKEN ||
      process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId || !apiToken) {
        'Cloudflare Stream credentials not configured, falling back to local storage'
      );
      return new LocalStorage(config?.localPath);
    }

    return new CloudflareStreamStorage({
      accountId,
      apiToken,
    });
  }

  if (storageType === 'cloudflare-r2') {
    const accountId = config?.accountId || process.env.CLOUDFLARE_ACCOUNT_ID;
    const bucket = config?.bucket || process.env.CLOUDFLARE_R2_BUCKET;
    const accessKeyId =
      config?.accessKeyId || process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const secretAccessKey =
      config?.secretAccessKey || process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    const publicUrl = config?.publicUrl || process.env.CLOUDFLARE_R2_PUBLIC_URL;

    if (!accountId || !bucket || !accessKeyId || !secretAccessKey) {
        'Cloudflare R2 credentials not configured, falling back to local storage'
      );
      return new LocalStorage(config?.localPath);
    }

    return new CloudflareR2Storage({
      accountId,
      bucket,
      accessKeyId,
      secretAccessKey,
      publicUrl,
    });
  }

  return new LocalStorage(config?.localPath);
}

// Default storage instance
export const defaultStorage = createStorage();

// Initialize storage on module load
defaultStorage.initialize().catch(console.error);
