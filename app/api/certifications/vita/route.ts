import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// IRS VITA/TCE Certification Integration
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Get VITA certifications from database
    const query = supabase
      .from('certificates')
      .select('*, profiles:user_id(full_name, email)')
      .eq('certificate_type', 'VITA');

    if (userId) {
      query.eq('user_id', userId);
    }

    const { data: certificates, error } = await query.limit(100);

    if (error) {
      console.error('VITA certificates error:', error);
    }

    return NextResponse.json({
      provider: 'IRS VITA/TCE',
      status: 'active',
      program: 'Volunteer Income Tax Assistance',
      availableCertifications: [
        { id: 'vita-basic', name: 'Basic Tax Preparation', level: 1 },
        { id: 'vita-advanced', name: 'Advanced Tax Preparation', level: 2 },
        { id: 'vita-military', name: 'Military Tax Preparation', level: 2 },
        { id: 'vita-international', name: 'International Tax Preparation', level: 3 },
      ],
      issuedCertificates: certificates?.length || 0,
      certificates: certificates || [],
      integrationStatus: 'active',
    });
  } catch (error) {
    console.error('VITA API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch VITA certifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { certificationType, testScore, completedAt } = body;

    if (!certificationType || testScore === undefined) {
      return NextResponse.json(
        { error: 'Certification type and test score are required' },
        { status: 400 }
      );
    }

    // Verify passing score (typically 80% for VITA)
    const passed = testScore >= 80;

    if (!passed) {
      return NextResponse.json({
        success: false,
        passed: false,
        score: testScore,
        message: 'Score below passing threshold (80%)',
      });
    }

    // Issue certificate
    const { data: certificate, error } = await supabase
      .from('certificates')
      .insert({
        user_id: user.id,
        certificate_type: 'VITA',
        certificate_subtype: certificationType,
        issued_at: completedAt || new Date().toISOString(),
        expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
        metadata: JSON.stringify({ testScore, provider: 'IRS VITA/TCE' }),
      })
      .select()
      .single();

    if (error) {
      console.error('Certificate creation error:', error);
      return NextResponse.json(
        { error: 'Failed to issue certificate' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      passed: true,
      score: testScore,
      certificate,
      message: 'VITA certification issued successfully',
    });
  } catch (error) {
    console.error('VITA certification error:', error);
    return NextResponse.json(
      { error: 'Failed to process certification' },
      { status: 500 }
    );
  }
}
