import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 60;

export async function GET() {
  return NextResponse.json({
    openapi: '3.0.0',
    info: {
      title: 'Elevate for Humanity API',
      version: '1.0.0',
      description: 'API documentation for Elevate for Humanity platform'
    },
    paths: {}
  });
}
