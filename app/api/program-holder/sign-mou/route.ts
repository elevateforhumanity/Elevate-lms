import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateMOUPDF } from '@/lib/pdf/generator';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { programHolderId, programId } = body;

    // Get program holder info
    const { data: programHolder } = await supabase
      .from('profiles')
      .select('first_name, last_name, organization')
      .eq('id', programHolderId)
      .single();

    // Get program info
    const { data: program } = await supabase
      .from('programs')
      .select('title')
      .eq('id', programId)
      .single();

    const doc = generateMOUPDF({
      partyAName: 'Elevate for Humanity Institute',
      partyBName: programHolder?.organization || `${programHolder?.first_name} ${programHolder?.last_name}`,
      effectiveDate: new Date().toLocaleDateString(),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      purpose: `This Memorandum of Understanding establishes a partnership for the delivery of ${program?.title || 'training programs'} to eligible students.`,
      terms: [
        'Program Holder agrees to deliver training according to approved curriculum standards',
        'Elevate for Humanity will provide student referrals and funding coordination',
        'Both parties will maintain compliance with state and federal regulations',
        'Program Holder will submit monthly progress reports',
        'Either party may terminate this agreement with 30 days written notice',
      ],
      signatureDate: new Date().toLocaleDateString(),
    });

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="mou-${Date.now()}.pdf"`,
      },
    });
  } catch (error) { /* Error handled silently */ 
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
