export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

// WebSocket upgrade endpoint info
// Note: Next.js App Router doesn't support WebSocket upgrades directly
// This endpoint returns connection info for the WebSocket server
export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'WebSocket terminal available',
    wsUrl: process.env.TERMINAL_WS_URL || 'ws://localhost:3001',
    instructions: 'Connect to wsUrl for PTY terminal access',
  });
}
