import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';

    const { data: programs } = await supabase
      .from('programs')
      .select('id, title, slug, description, category, status, tuition, duration_weeks, total_hours')
      .eq('status', 'active')
      .order('title');

    if (format === 'csv') {
      const headers = ['ID', 'Title', 'Slug', 'Category', 'Status', 'Tuition', 'Duration (weeks)', 'Total Hours'];
      const rows = programs?.map(p => [
        p.id, p.title, p.slug, p.category, p.status, p.tuition, p.duration_weeks, p.total_hours
      ].join(',')) || [];
      const csv = [headers.join(','), ...rows].join('\n');
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="catalog-export.csv"'
        }
      });
    }

    return NextResponse.json({
      programs: programs || [],
      exportedAt: new Date().toISOString(),
      count: programs?.length || 0,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
