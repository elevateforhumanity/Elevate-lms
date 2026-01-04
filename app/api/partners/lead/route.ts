export const runtime = 'edge';
export const maxDuration = 60;

// app/api/partners/lead/route.ts
import { NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { createOrUpdateContact, createOpportunity } from '@/lib/integrations/salesforce';

export async function POST(request: Request) {
  const { name, email, phone, company, programInterest } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      { error: 'name and email are required' },
      { status: 400 }
    );
  }

  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ') || 'Partner';

  const contactId = await createOrUpdateContact({
    email,
    firstName,
    lastName,
    phone,
  });

  const oppName = `Elevate LMS - ${company || email}`;
  const closeDate = new Date();
  closeDate.setDate(closeDate.getDate() + 30);

  await createOpportunity({
    name: oppName,
    closeDate: closeDate.toISOString().slice(0, 10),
    stageName: 'Qualification',
    amount: 5000,
  });

  return NextResponse.json({ ok: true, contactId });
}
