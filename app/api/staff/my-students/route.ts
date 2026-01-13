import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get staff profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'staff') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get students assigned to this staff member
    // For now, return all students (you can add assignment logic later)
    const { data: students, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, last_sign_in_at')
      .eq('role', 'student')
      .order('full_name', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }

    return NextResponse.json({ students: students || [] });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          (error instanceof Error ? error.message : String(error)) ||
          'Failed to fetch students',
      },
      { status: 500 }
    );
  }
}
