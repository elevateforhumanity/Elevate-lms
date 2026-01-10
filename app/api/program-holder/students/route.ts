import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getProgramHolderStudents } from '@/lib/program-holder-access';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'program_holder') {
      return NextResponse.json({ error: 'Forbidden - Program holder access only' }, { status: 403 });
    }

    const students = await getProgramHolderStudents(user.id);

    return NextResponse.json({ students });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
