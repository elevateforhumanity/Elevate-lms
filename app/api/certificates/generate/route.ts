import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { enrollmentId } = body;

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get enrollment details
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .select(`
        id,
        student_id,
        course_id,
        completed_at,
        courses!inner (
          id,
          title,
          duration_weeks,
          programs!inner (
            id,
            name
          )
        )
      `)
      .eq('id', enrollmentId)
      .single();

    if (enrollmentError || !enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Type guards: Extract nested relations
    const course = Array.isArray(enrollment.courses) ? enrollment.courses[0] : enrollment.courses;
    const program = course && (Array.isArray(course.programs) ? course.programs[0] : course.programs);

    // Verify enrollment is completed
    if (!enrollment.completed_at) {
      return NextResponse.json({ error: 'Enrollment not completed' }, { status: 400 });
    }

    // Check if certificate already exists
    const { data: existingCert } = await supabase
      .from('certificates')
      .select('id, certificate_number')
      .eq('student_id', enrollment.student_id)
      .eq('course_id', enrollment.course_id)
      .single();

    if (existingCert) {
      return NextResponse.json({ 
        certificateNumber: existingCert.certificate_number,
        message: 'Certificate already exists'
      });
    }

    // Get student profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', enrollment.student_id)
      .single();

    // Calculate total hours from attendance
    const { data: attendanceData } = await supabase
      .from('attendance_log')
      .select('duration_minutes')
      .eq('student_id', enrollment.student_id)
      .eq('course_id', enrollment.course_id);

    const totalMinutes = attendanceData?.reduce((sum, log) => sum + (log.duration_minutes || 0), 0) || 0;
    const totalHours = Math.round(totalMinutes / 60 * 10) / 10;

    // Generate certificate number (format: ELEV-YYYY-XXXXXX)
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 900000) + 100000;
    const certificateNumber = `ELEV-${year}-${random}`;

    // Generate verification code
    const verificationCode = `${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 10)}`.toUpperCase();

    // Create certificate record
    const { data: certificate, error: certError } = await supabase
      .from('certificates')
      .insert({
        student_id: enrollment.student_id,
        course_id: enrollment.course_id,
        program_id: program?.id,
        certificate_number: certificateNumber,
        verification_code: verificationCode,
        issued_date: new Date().toISOString(),
        student_name: profile?.full_name || profile?.email || 'Student',
        course_title: course?.title,
        program_name: program?.name,
        hours_completed: totalHours,
        issued_by: user.id,
      })
      .select()
      .single();

    if (certError) {
      console.error('Certificate creation error:', certError);
      return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
    }

    // Send certificate email (async, don't wait)
    fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/emails/certificate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ certificateId: certificate.id }),
    }).catch(err => console.error('Failed to send certificate email:', err));

    return NextResponse.json({
      certificateNumber: certificate.certificate_number,
      verificationCode: certificate.verification_code,
      message: 'Certificate generated successfully'
    });

  } catch (error) {
    console.error('Certificate generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
