import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { createClient } from '@/lib/supabase/server';
import { programs } from '@/app/data/programs';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const type = searchParams.get('type') || 'all';

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const searchLower = query.toLowerCase();
  let results: any[] = [];

  try {
    // Search programs from static data
    if (type === 'all' || type === 'programs') {
      const programResults = programs
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchLower) ||
            p.shortDescription.toLowerCase().includes(searchLower)
        )
        .map((p) => ({
          id: p.slug,
          title: p.name,
          type: 'program',
          url: `/programs/${p.slug}`,
          description: p.shortDescription,
        }));
      results = results.concat(programResults);
    }

    // Search pages (static list of key pages)
    if (type === 'all' || type === 'pages') {
      const pages = [
        {
          title: 'About Us',
          url: '/about',
          description: 'Learn about our mission and values',
        },
        {
          title: 'WIOA Eligibility',
          url: '/wioa-eligibility',
          description: 'Check if you qualify for WIOA funding',
        },
        {
          title: 'Career Services',
          url: '/career-services',
          description: 'Job placement and career support',
        },
        {
          title: 'Financial Aid',
          url: '/financial-aid',
          description: 'Learn about funding options',
        },
        {
          title: 'Contact',
          url: '/contact',
          description: 'Get in touch with us',
        },
      ];

      const pageResults = pages
        .filter(
          (p) =>
            p.title.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower)
        )
        .map((p, i) => ({
          id: `page-${i}`,
          title: p.title,
          type: 'page',
          url: p.url,
          description: p.description,
        }));
      results = results.concat(pageResults);
    }

    return NextResponse.json({ results, query });
  } catch (error: any) {
    return NextResponse.json(
      { results: [], query, error: 'Search failed' },
      { status: 500 }
    );
  }
}
