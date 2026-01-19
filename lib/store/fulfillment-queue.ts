import { Redis } from '@upstash/redis';
import { logger } from '@/lib/logger';

const QUEUE_KEY = 'store:fulfillment:queue';
const PROCESSING_KEY = 'store:fulfillment:processing';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;

interface FulfillmentJob {
  eventId: string;
  sessionId: string;
  email: string;
  productId: string;
  productTitle: string;
  repo?: string;
  downloadUrl?: string;
  retryCount?: number;
  createdAt?: string;
}

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  
  if (!url || !token) {
    logger.warn('Upstash Redis not configured - queue disabled');
    return null;
  }
  
  redis = new Redis({ url, token });
  return redis;
}

/**
 * Queue a fulfillment job for background processing
 */
export async function queueFulfillment(job: FulfillmentJob): Promise<boolean> {
  const client = getRedis();
  if (!client) return false;
  
  try {
    const jobWithMeta: FulfillmentJob = {
      ...job,
      retryCount: 0,
      createdAt: new Date().toISOString(),
    };
    
    await client.lpush(QUEUE_KEY, JSON.stringify(jobWithMeta));
    logger.info('Fulfillment job queued', { eventId: job.eventId });
    return true;
  } catch (error) {
    logger.error('Failed to queue fulfillment job', error as Error);
    return false;
  }
}

/**
 * Get next job from queue for processing
 */
export async function getNextJob(): Promise<FulfillmentJob | null> {
  const client = getRedis();
  if (!client) return null;
  
  try {
    const jobStr = await client.rpoplpush(QUEUE_KEY, PROCESSING_KEY);
    if (!jobStr) return null;
    return JSON.parse(jobStr as string) as FulfillmentJob;
  } catch (error) {
    logger.error('Failed to get next job', error as Error);
    return null;
  }
}

/**
 * Mark job as completed and remove from processing
 */
export async function completeJob(job: FulfillmentJob): Promise<void> {
  const client = getRedis();
  if (!client) return;
  
  try {
    await client.lrem(PROCESSING_KEY, 1, JSON.stringify(job));
    logger.info('Fulfillment job completed', { eventId: job.eventId });
  } catch (error) {
    logger.error('Failed to complete job', error as Error);
  }
}

/**
 * Retry a failed job with exponential backoff
 */
export async function retryJob(job: FulfillmentJob): Promise<boolean> {
  const client = getRedis();
  if (!client) return false;
  
  const retryCount = (job.retryCount || 0) + 1;
  
  if (retryCount > MAX_RETRIES) {
    logger.error('Job exceeded max retries', { eventId: job.eventId, retryCount });
    // Move to dead letter queue
    await client.lpush('store:fulfillment:dead', JSON.stringify({
      ...job,
      retryCount,
      failedAt: new Date().toISOString(),
    }));
    await client.lrem(PROCESSING_KEY, 1, JSON.stringify(job));
    return false;
  }
  
  try {
    // Remove from processing
    await client.lrem(PROCESSING_KEY, 1, JSON.stringify(job));
    
    // Re-queue with incremented retry count after delay
    const updatedJob: FulfillmentJob = { ...job, retryCount };
    
    // Use setTimeout for delay (in production, use scheduled job)
    setTimeout(async () => {
      await client.lpush(QUEUE_KEY, JSON.stringify(updatedJob));
      logger.info('Job re-queued for retry', { eventId: job.eventId, retryCount });
    }, RETRY_DELAY_MS * retryCount);
    
    return true;
  } catch (error) {
    logger.error('Failed to retry job', error as Error);
    return false;
  }
}

/**
 * Get queue stats
 */
export async function getQueueStats(): Promise<{
  pending: number;
  processing: number;
  dead: number;
} | null> {
  const client = getRedis();
  if (!client) return null;
  
  try {
    const [pending, processing, dead] = await Promise.all([
      client.llen(QUEUE_KEY),
      client.llen(PROCESSING_KEY),
      client.llen('store:fulfillment:dead'),
    ]);
    
    return { pending, processing, dead };
  } catch (error) {
    logger.error('Failed to get queue stats', error as Error);
    return null;
  }
}

/**
 * Process fulfillment jobs (called by cron or background worker)
 */
export async function processFulfillmentQueue(): Promise<number> {
  const { generateLicenseKey, hashLicenseKey } = await import('@/lib/store/license');
  const { createAdminClient } = await import('@/lib/supabase/admin');
  const { auditLog } = await import('@/lib/auditLog');
  
  let processed = 0;
  const maxBatch = 10;
  
  for (let i = 0; i < maxBatch; i++) {
    const job = await getNextJob();
    if (!job) break;
    
    try {
      const supabase = createAdminClient();
      
      // Generate license key
      const licenseKey = generateLicenseKey();
      const licenseHash = hashLicenseKey(licenseKey);
      
      // Store purchase
      await supabase.from('purchases').insert({
        email: job.email,
        product_id: job.productId,
        repo: job.repo,
        stripe_event_id: job.eventId,
      });
      
      // Store license
      const { data: licenseData } = await supabase.from('licenses').insert({
        email: job.email,
        product_id: job.productId,
        license_key: licenseHash,
        stripe_event_id: job.eventId,
      }).select('id').single();
      
      // Audit log
      await auditLog({
        action: 'CREATE',
        entity: 'license_purchase' as any,
        entity_id: licenseData?.id,
        metadata: {
          email: job.email,
          product_id: job.productId,
          license_generated: true,
          stripe_event_id: job.eventId,
          queued: true,
        },
      });

      // Provision tenant automatically
      if (licenseData?.id) {
        const { provisionTenant } = await import('@/lib/store/provision-tenant');
        await provisionTenant({
          email: job.email,
          productId: job.productId,
          licenseId: licenseData.id,
          stripeEventId: job.eventId,
        });
      }
      
      // Send email
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: job.email,
          subject: `Your ${job.productTitle} License Key`,
          template: 'license-delivery',
          data: {
            productName: job.productTitle,
            licenseKey: licenseKey,
            repo: job.repo,
            downloadUrl: job.downloadUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/downloads/${job.productId}`,
          },
        }),
      });
      
      await completeJob(job);
      processed++;
      logger.info('Fulfillment processed', { eventId: job.eventId });
      
    } catch (error) {
      logger.error('Fulfillment failed', error as Error);
      await retryJob(job);
    }
  }
  
  return processed;
}
