export const runtime = 'nodejs';
export const maxDuration = 30;

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const d = await req.formData();
    const program = d.get('program') as string;
    const funding = d.get('funding') as string;

    const eligible = funding !== 'Self Pay' && program !== 'Not Sure';

    const supabase = createAdminClient();
    
    const { error } = await supabase.from('applications').insert({
      name: d.get('name'),
      email: d.get('email'),
      phone: d.get('phone'),
      program,
      funding,
      eligible,
      notes: eligible ? 'Prescreen pass' : 'Manual review',
    });

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    return NextResponse.redirect(
      new URL('/apply/confirmation', req.url),
      { status: 303 }
    );
  } catch (err: unknown) {
    console.error('Apply route error:', err);
    return NextResponse.json(
      { error: 'Submission failed. Please call 317-314-3757.' },
      { status: 500 }
    );
  }
}
