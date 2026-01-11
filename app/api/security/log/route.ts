export const runtime = 'edge';
export const maxDuration = 10;

import { NextRequest, NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { createClient } from '@/lib/supabase/server';

// Simple in-memory rate limiting (per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 logs per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limited
  }
  
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limit check
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ success: false, error: 'Rate limited' }, { status: 429 });
    }
    
    const body = await parseBody<Record<string, unknown>>(request);
    
    // Fast response - don't wait for DB
    const responsePromise = NextResponse.json({ success: true });
    
    // Background logging (fire-and-forget)
    Promise.resolve().then(async () => {
      try {
        const supabase = await createClient();
        await supabase.from('security_logs').insert({
          event_type: body.type,
          timestamp: body.timestamp,
          url: body.url,
          user_agent: body.userAgent,
          ip_address: request.ip || request.headers.get('x-forwarded-for'),
          data: body.data,
          severity: getSeverity(body.type as string),
        });

        // Send alerts for critical events (non-blocking)
        if (isCriticalEvent(body.type as string)) {
          sendSecurityAlert(body).catch(() => {});
        }
      } catch (error) {
        // Silent fail
      }
    });

    return responsePromise;
  } catch (error: unknown) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

function getSeverity(eventType: string): string {
  const criticalEvents = [
    'AUTOMATION_DETECTED',
    'IFRAME_EMBEDDING_DETECTED',
    'DEVTOOLS_OPENED',
  ];
  const highEvents = ['RAPID_NAVIGATION', 'CONSOLE_ACCESS'];

  if (criticalEvents.includes(eventType)) return 'critical';
  if (highEvents.includes(eventType)) return 'high';
  return 'medium';
}

function isCriticalEvent(eventType: string): boolean {
  return ['AUTOMATION_DETECTED', 'IFRAME_EMBEDDING_DETECTED'].includes(
    eventType
  );
}

async function sendSecurityAlert(data: unknown) {
  // Send email/SMS/Slack notification for critical events
  // Implementation depends on your notification service
  logger.warn('[CRITICAL SECURITY EVENT]', event);

  // Example: Send to admin email
  try {
    await fetch('/api/notifications/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'security_alert',
        subject: `Security Alert: ${event.type}`,
        message: `Critical security event detected:\n\nType: ${event.type}\nURL: ${event.url}\nTime: ${event.timestamp}\n\nData: ${JSON.stringify(event.data, null, 2)}`,
      }),
    });
  } catch (error: unknown) {
    // Error: $1
  }
}
