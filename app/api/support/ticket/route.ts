export const runtime = 'edge';
export const maxDuration = 60;

// app/api/support/ticket/route.ts
import { NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { requireAuth } from '@/lib/auth/getSession';
import { createZendeskTicket } from '@/lib/support/zendesk';

export async function POST(request: Request) {
  const session = await requireAuth();
  const { subject, message } = await request.json();

  if (!subject || !message) {
    return NextResponse.json(
      { error: 'subject and message are required' },
      { status: 400 }
    );
  }

  const email = session.user?.email as string;

  await createZendeskTicket({
    requesterEmail: email,
    subject,
    body: message,
    tags: ['elevate_lms', 'in_app'],
  });

  return NextResponse.json({ ok: true });
}
