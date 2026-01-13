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

    // Check admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { programHolderName, programName, customTerms } = body;

    const doc = generateMOUPDF({
      partyAName: 'Elevate for Humanity Institute',
      partyBName: programHolderName || 'Program Holder',
      effectiveDate: new Date().toLocaleDateString(),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      purpose: `This Memorandum of Understanding establishes a partnership for the delivery of ${programName || 'training programs'} to eligible students through the Elevate for Humanity workforce development network.`,
      terms: customTerms || [
        'Program Holder agrees to deliver training according to approved curriculum standards and state regulations',
        'Elevate for Humanity will provide student referrals, enrollment coordination, and funding administration',
        'Both parties will maintain compliance with WIOA, state, and federal workforce development regulations',
        'Program Holder will submit monthly progress reports including attendance, completion, and placement data',
        'Program Holder will maintain appropriate insurance coverage and facility standards',
        'Either party may terminate this agreement with 30 days written notice',
        'All student data will be handled in compliance with FERPA and privacy regulations',
      ],
      signatureDate: new Date().toLocaleDateString(),
    });

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="mou-${programHolderName?.replace(/\s+/g, '-') || 'program-holder'}-${Date.now()}.pdf"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
