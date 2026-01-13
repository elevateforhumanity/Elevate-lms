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

      // Split name into first and last
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const supabase = createAdminClient();
    
      const { error } = await supabase.from('applications').insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        city: 'Indianapolis',
        zip: '46208',
        program_interest: program,
        status: 'pending',
        support_notes: `Funding: ${funding}. ${eligible ? 'Prescreen pass' : 'Manual review'}`,
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
