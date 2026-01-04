import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 60;

export async function GET() {
  return NextResponse.json({
    provider: 'NRF Rise Up',
    status: 'active',
    certifications: [
      'Customer Service & Sales',
      'Retail Industry Fundamentals',
      'Store Operations',
      'Inventory Management',
    ],
    integration_status: 'ready',
  });
}
