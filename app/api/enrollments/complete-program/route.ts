// @ts-nocheck
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * PROGRAM COMPLETION ENDPOINT
 * 
 * Triggered when a student completes all requirements for a program.
 * Auto-issues certificate and sends delivery email.
 * Idempotent - will not create duplicate certificates.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

interface CompleteProgramRequest {
  enrollment_id: string;
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: CompleteProgramRequest = await req.json();
    const { enrollment_id } = body;

    if (!enrollment_id) {
      return NextResponse.json(
        { error: 'Missing required field: enrollment_id' },
        { status: 400 }
      );
    }

    logger.info('Starting program completion', { enrollment_id, user_id: user.id });

    // Get enrollment with program and student details
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .select(`
        id,
        user_id,
        program_id,
        status,
        completed_at,
        certificate_id,
        programs:program_id (
          id,
          name,
          slug,
          duration_hours
        )
      `)
      .eq('id', enrollment_id)
      .single();

    if (enrollmentError || !enrollment) {
      logger.error('Enrollment not found', { enrollment_id, error: enrollmentError });
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Verify user owns this enrollment or is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';
    if (enrollment.user_id !== user.id && !isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // IDEMPOTENCY CHECK: If certificate already exists, return it
    if (enrollment.certificate_id) {
      const { data: existingCert } = await supabase
        .from('certificates')
        .select('*')
        .eq('id', enrollment.certificate_id)
        .single();

      if (existingCert) {
        logger.info('Certificate already exists, returning existing', {
          enrollment_id,
          certificate_id: existingCert.id,
        });
        return NextResponse.json({
          success: true,
          already_completed: true,
          certificate: existingCert,
        });
      }
    }

    // Get student profile
    const { data: studentProfile } = await supabase
      .from('profiles')
      .select('full_name, first_name, last_name, email')
      .eq('id', enrollment.user_id)
      .single();

    if (!studentProfile) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 });
    }

    const studentName = studentProfile.full_name || 
      `${studentProfile.first_name || ''} ${studentProfile.last_name || ''}`.trim() ||
      'Student';
    const programName = enrollment.programs?.name || 'Program';
    const programHours = enrollment.programs?.duration_hours || null;

    // Generate certificate number
    const certificateNumber = `EFH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const completionDate = new Date().toISOString();

    // Create certificate record
    const { data: certificate, error: certError } = await supabase
      .from('certificates')
      .insert({
        student_id: enrollment.user_id,
        program_id: enrollment.program_id,
        certificate_number: certificateNumber,
        student_name: studentName,
        program_name: programName,
        completion_date: completionDate,
        program_hours: programHours,
        issued_at: completionDate,
        status: 'active',
      })
      .select()
      .single();

    if (certError) {
      logger.error('Failed to create certificate', { error: certError });
      return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
    }

    logger.info('Certificate created', {
      certificate_id: certificate.id,
      certificate_number: certificateNumber,
    });

    // Update enrollment with completion and certificate reference
    const { error: updateError } = await supabase
      .from('enrollments')
      .update({
        status: 'completed',
        completed_at: completionDate,
        certificate_id: certificate.id,
        certificate_issued_at: completionDate,
        updated_at: completionDate,
      })
      .eq('id', enrollment_id);

    if (updateError) {
      logger.error('Failed to update enrollment', { error: updateError });
      // Certificate was created, continue to email
    }

    // PHASE 4: Send certificate delivery email in same transaction
    const certificateUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org'}/certificates/${certificate.id}`;
    
    try {
      const { emailService } = await import('@/lib/notifications/email');
      await emailService.sendCertificateNotification(
        studentProfile.email,
        studentName,
        programName,
        certificateUrl
      );
      logger.info('Certificate delivery email sent', {
        email: studentProfile.email,
        certificate_id: certificate.id,
      });
    } catch (emailError) {
      logger.error('Certificate email failed', { error: emailError });
      // Don't fail the completion - certificate is issued
    }

    // Create in-app notification
    await supabase.from('notifications').insert({
      user_id: enrollment.user_id,
      type: 'achievement',
      title: 'Certificate Issued!',
      message: `Congratulations! Your certificate for ${programName} is ready.`,
      action_url: certificateUrl,
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      certificate: {
        id: certificate.id,
        certificate_number: certificateNumber,
        student_name: studentName,
        program_name: programName,
        completion_date: completionDate,
        url: certificateUrl,
      },
      enrollment: {
        id: enrollment_id,
        status: 'completed',
        completed_at: completionDate,
      },
    });
  } catch (error) {
    logger.error('Program completion error', { error });
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
