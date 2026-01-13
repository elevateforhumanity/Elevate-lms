import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { createServerSupabaseClient } from '@/lib/auth';
import { toError, toErrorMessage } from '@/lib/safe';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: toErrorMessage(error), courses: [] }, { status: 200 });
    }

    return NextResponse.json({ courses: courses || [], total: courses?.length || 0 });
  } catch { /* Error handled silently */ 
    return NextResponse.json({ error: toErrorMessage(error), courses: [] }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const body = await parseBody<Record<string, any>>(request);

    if (!body.title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: newCourse, error } = await supabase
      .from('courses')
      .insert({
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        level: body.level,
        duration_hours: body.duration_hours,
        status: body.status || 'draft',
        is_free: body.is_free || true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
    }

    return NextResponse.json(newCourse, { status: 201 });
  } catch { /* Error handled silently */ 
    return NextResponse.json({ error: toErrorMessage(error) }, { status: 500 });
  }
}
