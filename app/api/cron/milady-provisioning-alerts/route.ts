export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email/resend';

const ADMIN_EMAIL = 'elevate4humanityedu@gmail.com';
const STALE_THRESHOLD_HOURS = 48;

/**
 * Cron job to check for stuck Milady provisioning requests
 * Runs daily to alert staff of any provisioning that's been pending > 48 hours
 * 
 * Schedule: 0 9 * * * (9 AM daily)
 */
export async function GET() {
  try {
    const supabase = createAdminClient();
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - STALE_THRESHOLD_HOURS);

    // Find stuck provisioning requests
    const { data: stuckRequests, error } = await supabase
      .from('milady_provisioning_queue')
      .select(`
        id,
        student_id,
        program_slug,
        status,
        created_at,
        profiles!milady_provisioning_queue_student_id_fkey (
          email,
          full_name
        )
      `)
      .in('status', ['pending', 'queued', 'manual_required'])
      .lt('created_at', cutoffTime.toISOString())
      .order('created_at', { ascending: true });

    if (error) {
      console.error('[Milady Alert] Query error:', error);
      // Try simpler query without join
      const { data: simpleRequests } = await supabase
        .from('milady_provisioning_queue')
        .select('id, student_id, program_slug, status, created_at')
        .in('status', ['pending', 'queued', 'manual_required'])
        .lt('created_at', cutoffTime.toISOString());
      
      if (simpleRequests && simpleRequests.length > 0) {
        await sendAlertEmail(simpleRequests);
        return NextResponse.json({ 
          success: true, 
          stuck_count: simpleRequests.length,
          message: `Found ${simpleRequests.length} stuck Milady provisioning requests`
        });
      }
    }

    if (!stuckRequests || stuckRequests.length === 0) {
      return NextResponse.json({ 
        success: true, 
        stuck_count: 0,
        message: 'No stuck Milady provisioning requests found'
      });
    }

    // Send alert email
    await sendAlertEmail(stuckRequests);

    // Also create admin alerts in database
    for (const request of stuckRequests) {
      await supabase.from('admin_alerts').insert({
        alert_type: 'milady_provisioning_stuck',
        severity: 'warning',
        details: {
          provisioning_id: request.id,
          student_id: request.student_id,
          program_slug: request.program_slug,
          status: request.status,
          created_at: request.created_at,
          hours_waiting: Math.round((Date.now() - new Date(request.created_at).getTime()) / (1000 * 60 * 60)),
        },
        created_at: new Date().toISOString(),
        resolved: false,
      });
    }

    return NextResponse.json({ 
      success: true, 
      stuck_count: stuckRequests.length,
      message: `Alert sent for ${stuckRequests.length} stuck Milady provisioning requests`
    });

  } catch (error) {
    console.error('[Milady Alert] Error:', error);
    return NextResponse.json({ error: 'Failed to check provisioning queue' }, { status: 500 });
  }
}

async function sendAlertEmail(requests: any[]) {
  const tableRows = requests.map((r: any) => {
    const hoursWaiting = Math.round((Date.now() - new Date(r.created_at).getTime()) / (1000 * 60 * 60));
    const studentName = r.profiles?.full_name || 'Unknown';
    const studentEmail = r.profiles?.email || r.student_id;
    
    return `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${studentName}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${studentEmail}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${r.program_slug}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${r.status}</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${hoursWaiting} hours</td>
      </tr>
    `;
  }).join('');

  await sendEmail({
    to: ADMIN_EMAIL,
    subject: `⚠️ ${requests.length} Milady Provisioning Request(s) Stuck > 48 Hours`,
    html: `
      <h2>Milady Provisioning Alert</h2>
      <p>The following students have been waiting more than 48 hours for Milady access:</p>
      
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <thead>
          <tr style="background: #f3f4f6;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Student</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Email</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Program</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Status</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Waiting</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>

      <p><strong>Action Required:</strong> Please manually provision Milady access for these students or investigate the provisioning failure.</p>
      
      <p>
        <a href="https://www.elevateforhumanity.org/admin/milady-provisioning" 
           style="display: inline-block; background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 10px;">
          View Provisioning Queue
        </a>
      </p>
    `,
  });
}
