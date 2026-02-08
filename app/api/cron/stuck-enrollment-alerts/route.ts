export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email/resend';

const ADMIN_EMAIL = 'elevate4humanityedu@gmail.com';

/**
 * Stuck State Thresholds
 */
const THRESHOLDS = {
  ORIENTATION_DAYS: 7,      // enrolled_pending_orientation > 7 days
  DOCUMENTS_DAYS: 5,        // orientation_complete but no documents > 5 days
  MILADY_HOURS: 48,         // milady_provisioning_queue > 48 hours
  PAYMENT_HOLD_DAYS: 14,    // payment_hold > 14 days
};

/**
 * Cron job to check for stuck enrollment states
 * Runs daily to alert staff of students who may need intervention
 * 
 * Schedule: 0 8 * * * (8 AM daily)
 */
export async function GET() {
  try {
    const supabase = createAdminClient();
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const alerts: any[] = [];
    const now = new Date();

    // 1. Check for stuck in enrolled_pending_orientation > 7 days
    const orientationCutoff = new Date(now);
    orientationCutoff.setDate(orientationCutoff.getDate() - THRESHOLDS.ORIENTATION_DAYS);

    const { data: stuckOrientation } = await supabase
      .from('student_enrollments')
      .select(`
        id,
        student_id,
        enrolled_at,
        profiles!student_enrollments_student_id_fkey (
          email,
          full_name
        )
      `)
      .or(`enrollment_state.eq.enrolled_pending_orientation,enrollment_state.eq.enrolled`)
      .is('orientation_completed_at', null)
      .lt('enrolled_at', orientationCutoff.toISOString());

    if (stuckOrientation && stuckOrientation.length > 0) {
      for (const record of stuckOrientation) {
        const daysStuck = Math.floor((now.getTime() - new Date(record.enrolled_at).getTime()) / (1000 * 60 * 60 * 24));
        alerts.push({
          type: 'orientation_stuck',
          severity: daysStuck > 14 ? 'high' : 'medium',
          student_id: record.student_id,
          student_name: (record.profiles as any)?.full_name || 'Unknown',
          student_email: (record.profiles as any)?.email || record.student_id,
          days_stuck: daysStuck,
          message: `Student hasn't started orientation (${daysStuck} days)`,
        });
      }
    }

    // 2. Check for stuck in documents_pending > 5 days
    const documentsCutoff = new Date(now);
    documentsCutoff.setDate(documentsCutoff.getDate() - THRESHOLDS.DOCUMENTS_DAYS);

    const { data: stuckDocuments } = await supabase
      .from('student_enrollments')
      .select(`
        id,
        student_id,
        orientation_completed_at,
        profiles!student_enrollments_student_id_fkey (
          email,
          full_name
        )
      `)
      .or(`enrollment_state.eq.orientation_complete,enrollment_state.eq.documents_pending`)
      .is('documents_submitted_at', null)
      .not('orientation_completed_at', 'is', null)
      .lt('orientation_completed_at', documentsCutoff.toISOString());

    if (stuckDocuments && stuckDocuments.length > 0) {
      for (const record of stuckDocuments) {
        const daysStuck = Math.floor((now.getTime() - new Date(record.orientation_completed_at).getTime()) / (1000 * 60 * 60 * 24));
        alerts.push({
          type: 'documents_stuck',
          severity: daysStuck > 10 ? 'high' : 'medium',
          student_id: record.student_id,
          student_name: (record.profiles as any)?.full_name || 'Unknown',
          student_email: (record.profiles as any)?.email || record.student_id,
          days_stuck: daysStuck,
          message: `Student hasn't uploaded documents (${daysStuck} days since orientation)`,
        });
      }
    }

    // 3. Check for stuck Milady provisioning > 48 hours (already handled by milady-provisioning-alerts)
    // Skip here to avoid duplicate alerts

    // 4. Check for payment_hold > 14 days
    const paymentCutoff = new Date(now);
    paymentCutoff.setDate(paymentCutoff.getDate() - THRESHOLDS.PAYMENT_HOLD_DAYS);

    const { data: stuckPayment } = await supabase
      .from('barber_subscriptions')
      .select(`
        id,
        user_id,
        past_due_since,
        profiles!barber_subscriptions_user_id_fkey (
          email,
          full_name
        )
      `)
      .not('past_due_since', 'is', null)
      .lt('past_due_since', paymentCutoff.toISOString());

    if (stuckPayment && stuckPayment.length > 0) {
      for (const record of stuckPayment) {
        const daysStuck = Math.floor((now.getTime() - new Date(record.past_due_since).getTime()) / (1000 * 60 * 60 * 24));
        alerts.push({
          type: 'payment_severely_past_due',
          severity: 'high',
          student_id: record.user_id,
          student_name: (record.profiles as any)?.full_name || 'Unknown',
          student_email: (record.profiles as any)?.email || record.user_id,
          days_stuck: daysStuck,
          message: `Payment severely past due (${daysStuck} days)`,
        });
      }
    }

    // If no alerts, return success
    if (alerts.length === 0) {
      return NextResponse.json({ 
        success: true, 
        alerts_count: 0,
        message: 'No stuck enrollments found'
      });
    }

    // Create admin alerts in database
    for (const alert of alerts) {
      await supabase.from('admin_alerts').insert({
        alert_type: `enrollment_${alert.type}`,
        severity: alert.severity,
        details: alert,
        created_at: now.toISOString(),
        resolved: false,
      }).catch(() => {}); // Don't fail if insert fails
    }

    // Send summary email
    await sendAlertEmail(alerts);

    return NextResponse.json({ 
      success: true, 
      alerts_count: alerts.length,
      alerts: alerts.map(a => ({ type: a.type, student: a.student_email, days: a.days_stuck })),
    });

  } catch (error) {
    console.error('[Stuck Enrollment Alert] Error:', error);
    return NextResponse.json({ error: 'Failed to check stuck enrollments' }, { status: 500 });
  }
}

async function sendAlertEmail(alerts: any[]) {
  const highPriority = alerts.filter(a => a.severity === 'high');
  const mediumPriority = alerts.filter(a => a.severity === 'medium');

  const tableRows = alerts.map(a => `
    <tr style="background: ${a.severity === 'high' ? '#fef2f2' : '#fffbeb'};">
      <td style="padding: 8px; border: 1px solid #ddd;">${a.student_name}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${a.student_email}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${a.type.replace(/_/g, ' ')}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${a.days_stuck} days</td>
      <td style="padding: 8px; border: 1px solid #ddd;">
        <span style="color: ${a.severity === 'high' ? '#dc2626' : '#d97706'}; font-weight: bold;">
          ${a.severity.toUpperCase()}
        </span>
      </td>
    </tr>
  `).join('');

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `⚠️ ${alerts.length} Stuck Enrollment${alerts.length > 1 ? 's' : ''} Require Attention${highPriority.length > 0 ? ' (HIGH PRIORITY)' : ''}`,
    html: `
      <h2>Stuck Enrollment Alert</h2>
      <p>The following students may need intervention:</p>
      
      ${highPriority.length > 0 ? `<p style="color: #dc2626; font-weight: bold;">🚨 ${highPriority.length} HIGH PRIORITY alert(s)</p>` : ''}
      
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <thead>
          <tr style="background: #f3f4f6;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Student</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Email</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Issue</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Duration</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Priority</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>

      <h3>Thresholds</h3>
      <ul>
        <li>Orientation not started: > ${THRESHOLDS.ORIENTATION_DAYS} days</li>
        <li>Documents not uploaded: > ${THRESHOLDS.DOCUMENTS_DAYS} days after orientation</li>
        <li>Payment severely past due: > ${THRESHOLDS.PAYMENT_HOLD_DAYS} days</li>
      </ul>

      <p>
        <a href="https://www.elevateforhumanity.org/admin/enrollments" 
           style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 10px;">
          View Enrollments Dashboard
        </a>
      </p>
    `,
  });
}
