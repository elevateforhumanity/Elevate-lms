import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 60;
import { searchEntities } from '@/lib/integrations/sam-gov';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name') || '';

    if (!name) {
      return NextResponse.json(
        { error: 'name parameter is required' },
        { status: 400 }
      );
    }

    const entities = await searchEntities(name);

    return NextResponse.json({
      ok: true,
      count: entities.length,
      entities,
    });
  } catch (error: any) {
    logger.error('SAM.gov search error:', toError(error));
    return NextResponse.json(
      { error: toErrorMessage(error) || 'Failed to search SAM.gov' },
      { status: 500 }
    );
  }
}
