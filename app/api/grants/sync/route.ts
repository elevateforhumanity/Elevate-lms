// @ts-nocheck
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// app/api/grants/sync/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { logger } from '@/lib/logger';

type RawGrant = {
  externalId: string;
  title: string;
  agency: string;
  summary: string;
  eligibility: string;
  naicsTags: string[];
  categories: string[];
  locationLimit: string;
  dueDate: string;
  url: string;
  raw: any;
};

async function fetchMockGrants(): Promise<RawGrant[]> {
  // Replace this later with real Grants.gov / state feeds
  return [
    {
      externalId: 'EFH-DEMO-001',
      title: 'Workforce Training for Healthcare & Trades',
      agency: 'Indiana Department of Workforce Development',
      summary:
        'Funding to support training programs in healthcare, trades, and apprenticeships for underserved communities.',
      eligibility: 'Nonprofits and training providers.',
      naicsTags: ['624190', '611519', '611430'],
      categories: ['workforce', 'nonprofit'],
      locationLimit: 'IN',
      dueDate: '2025-12-31',
      url: 'https://example-grants.gov/EFH-DEMO-001',
      raw: { demo: true },
    },
    {
      externalId: 'EFH-DEMO-002',
      title: 'Small Business Wellness & Beauty Grant',
      agency: 'Local Economic Development Agency',
      summary:
        'Grants for wellness, beauty, and body-contouring businesses to expand services, hire staff, and provide training.',
      eligibility: 'Small businesses in beauty, wellness, and personal care.',
      naicsTags: ['812199', '621399'],
      categories: ['small_business', 'beauty', 'wellness'],
      locationLimit: 'US',
      dueDate: '2025-10-01',
      url: 'https://example-grants.gov/EFH-DEMO-002',
      raw: { demo: true },
    },
  ];
}

export async function POST() {
  try {
    const { data: source, error: sourceError } = await supabaseAdmin
      .from('grant_sources')
      .upsert(
        {
          name: 'EFH Demo Grants',
          code: 'efh_demo_source',
          base_url: 'https://example-grants.gov',
        },
        { onConflict: 'code' }
      )
      .select()
      .single();

    if (sourceError || !source) {
      logger.error(sourceError);
      return NextResponse.json(
        { error: 'Failed to ensure grant source' },
        { status: 500 }
      );
    }

    const rawGrants = await fetchMockGrants();

    for (const g of rawGrants) {
      const { error } = await supabaseAdmin.from('grant_opportunities').upsert(
        {
          source_id: source.id,
          external_id: g.externalId,
          title: g.title,
          agency: g.agency,
          summary: g.summary,
          eligibility: g.eligibility,
          naics_tags: g.naicsTags,
          categories: g.categories,
          location_limit: g.locationLimit,
          due_date: g.dueDate,
          url: g.url,
          raw_json: g.raw,
        },
        { onConflict: 'source_id,external_id' }
      );

      if (error) {
        logger.error('Error upserting grant', g.externalId, error);
      }
    }

    return NextResponse.json({ ok: true, imported: rawGrants.length });
  } catch (err) {
    logger.error(err);
    return NextResponse.json(
      { error: 'Unexpected error during grant sync' },
      { status: 500 }
    );
  }
}
