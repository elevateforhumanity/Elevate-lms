export const runtime = 'nodejs';
export const maxDuration = 30;

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { withRateLimit } from '@/lib/api/with-rate-limit';
import { contactRateLimit } from '@/lib/rate-limit';
import { applicationSchema } from '@/lib/api/validation-schemas';

export const POST = withRateLimit(
  async (req: Request) => {
    try {
      const contentType = req.headers.get('content-type');
      let data;

      if (contentType?.includes('application/json')) {
        data = await req.json();
      } else {
        const formData = await req.formData();
        data = {
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          program: formData.get('program'),
          funding: formData.get('funding'),
        };
      }
      
      const validatedData = applicationSchema.parse(data);

      const { program, funding, name, email, phone } = validatedData;
      const eligible = funding !== 'Self Pay' && program !== 'Not Sure';

      const supabase = createAdminClient();
    
      const { error } = await supabase.from('applications').insert({
        name,
        email,
        phone,
        program,
        funding,
        eligible,
        notes: eligible ? 'Prescreen pass' : 'Manual review',
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to submit application. Please call 317-314-3757 for assistance.' },
        { status: 500 }
      );
    }

    if (contentType?.includes('application/json')) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.redirect(
      new URL('/apply/confirmation', req.url),
      { status: 303 }
    );
  } catch (err: any) {
    console.error('Apply route error:', err);
    return NextResponse.json(
      { error: 'Submission failed. Please call 317-314-3757.' },
      { status: 500 }
    );
    }
  },
  { limiter: contactRateLimit, skipOnMissing: true }
);
