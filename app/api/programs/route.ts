export const runtime = 'edge';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { COMPLETE_PROGRAMS } from '@/lib/programs-data-complete';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const funding = searchParams.get('funding');

    let filteredPrograms = COMPLETE_PROGRAMS;

    // Filter by funding type
    if (funding) {
      filteredPrograms = filteredPrograms.filter((p) =>
        p.funding.some((f) => f.toLowerCase() === funding.toLowerCase())
      );
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPrograms = filteredPrograms.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.tagline.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      status: 'success',
      count: filteredPrograms.length,
      programs: filteredPrograms,
    });
  } catch (error: unknown) {
    logger.error('Error fetching programs:', error);
    return NextResponse.json(
      { status: 'error', error: 'Failed to fetch programs' },
      { status: 500 }
    );
  }
}
