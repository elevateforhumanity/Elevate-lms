/**
 * Weekly Payment System
 * 
 * Handles automatic weekly payment links sent to students every Friday.
 * Students on payment plans receive a Stripe payment link based on their
 * current balance and hours per week.
 * 
 * If payment is overdue, student cannot clock in until paid.
 */

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { BARBER_PRICING, calculateWeeklyPayment } from '@/lib/programs/pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export interface StudentPaymentPlan {
  studentId: string;
  enrollmentId: string;
  email: string;
  fullName: string;
  hoursPerWeek: number;
  transferHours: number;
  totalPaid: number;
  totalOwed: number;
  remainingBalance: number;
  weeklyPaymentAmount: number;
  weeksRemaining: number;
  lastPaymentDate: string | null;
  nextPaymentDue: string;
  paymentStatus: 'current' | 'due' | 'overdue' | 'paid_in_full';
}

export interface WeeklyPaymentResult {
  success: boolean;
  paymentLinkUrl?: string;
  paymentLinkId?: string;
  amount?: number;
  error?: string;
}

/**
 * Get student's current payment plan status
 */
export async function getStudentPaymentPlan(studentId: string): Promise<StudentPaymentPlan | null> {
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Get enrollment with payment info
  const { data: enrollment } = await supabase
    .from('student_enrollments')
    .select(`
      id,
      student_id,
      hours_per_week,
      transfer_hours,
      amount_paid,
      weekly_payment_amount,
      profiles!inner(email, full_name)
    `)
    .eq('student_id', studentId)
    .eq('program_slug', 'barber-apprenticeship')
    .single();

  if (!enrollment) return null;

  // Get total payments made
  const { data: payments } = await supabase
    .from('student_payments')
    .select('amount, created_at')
    .eq('student_id', studentId)
    .eq('status', 'completed')
    .order('created_at', { ascending: false });

  const totalPaid = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
  const lastPayment = payments?.[0];

  // Calculate payment plan
  const calculation = calculateWeeklyPayment(
    enrollment.hours_per_week || 40,
    enrollment.transfer_hours || 0
  );

  const remainingBalance = BARBER_PRICING.fullPrice - totalPaid;
  const weeklyAmount = enrollment.weekly_payment_amount || calculation.weeklyPaymentDollars;

  // Determine next payment due (next Friday)
  const nextFriday = getNextFriday();
  
  // Determine payment status
  let paymentStatus: StudentPaymentPlan['paymentStatus'] = 'current';
  if (remainingBalance <= 0) {
    paymentStatus = 'paid_in_full';
  } else if (isPaymentOverdue(lastPayment?.created_at)) {
    paymentStatus = 'overdue';
  } else if (isPaymentDueToday()) {
    paymentStatus = 'due';
  }

  return {
    studentId,
    enrollmentId: enrollment.id,
    email: (enrollment.profiles as any).email,
    fullName: (enrollment.profiles as any).full_name,
    hoursPerWeek: enrollment.hours_per_week || 40,
    transferHours: enrollment.transfer_hours || 0,
    totalPaid,
    totalOwed: BARBER_PRICING.fullPrice,
    remainingBalance,
    weeklyPaymentAmount: weeklyAmount,
    weeksRemaining: Math.ceil(remainingBalance / weeklyAmount),
    lastPaymentDate: lastPayment?.created_at || null,
    nextPaymentDue: nextFriday.toISOString(),
    paymentStatus,
  };
}

/**
 * Check if student can clock in (payment must be current)
 */
export async function canStudentClockIn(studentId: string): Promise<{
  allowed: boolean;
  reason?: string;
  amountDue?: number;
  paymentUrl?: string;
}> {
  const plan = await getStudentPaymentPlan(studentId);
  
  if (!plan) {
    return { allowed: false, reason: 'No active enrollment found' };
  }

  if (plan.paymentStatus === 'paid_in_full') {
    return { allowed: true };
  }

  if (plan.paymentStatus === 'overdue') {
    // Generate payment link for overdue amount
    const paymentResult = await createWeeklyPaymentLink(studentId, plan.weeklyPaymentAmount);
    
    return {
      allowed: false,
      reason: 'Payment is overdue. Please complete your weekly payment to continue training.',
      amountDue: plan.weeklyPaymentAmount,
      paymentUrl: paymentResult.paymentLinkUrl,
    };
  }

  return { allowed: true };
}

/**
 * Create a Stripe payment link for weekly payment
 */
export async function createWeeklyPaymentLink(
  studentId: string,
  amount: number,
  customMessage?: string
): Promise<WeeklyPaymentResult> {
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Get student info
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', studentId)
      .single();

    if (!profile) {
      return { success: false, error: 'Student not found' };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';

    // Create Stripe payment link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Weekly Tuition Payment',
            description: `Barber Apprenticeship - Week of ${new Date().toLocaleDateString()}`,
          },
          unit_amount: Math.round(amount * 100), // Convert to cents
        },
        quantity: 1,
      }],
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${siteUrl}/apprentice?payment=success`,
        },
      },
      metadata: {
        type: 'weekly_payment',
        student_id: studentId,
        amount: amount.toString(),
        week_of: new Date().toISOString(),
      },
    });

    // Log the payment link
    await supabase.from('payment_links').insert({
      student_id: studentId,
      stripe_payment_link_id: paymentLink.id,
      url: paymentLink.url,
      amount,
      type: 'weekly_payment',
      status: 'active',
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      created_at: new Date().toISOString(),
    });

    return {
      success: true,
      paymentLinkUrl: paymentLink.url,
      paymentLinkId: paymentLink.id,
      amount,
    };
  } catch (error: any) {
    console.error('Error creating payment link:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send weekly payment reminder emails to all students with balances
 * This should be called by a cron job every Friday morning
 */
export async function sendWeeklyPaymentReminders(): Promise<{
  sent: number;
  failed: number;
  errors: string[];
}> {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';

  // Get all active enrollments with remaining balance
  const { data: enrollments } = await supabase
    .from('student_enrollments')
    .select(`
      id,
      student_id,
      hours_per_week,
      transfer_hours,
      weekly_payment_amount,
      profiles!inner(email, full_name)
    `)
    .eq('program_slug', 'barber-apprenticeship')
    .eq('status', 'active');

  if (!enrollments || enrollments.length === 0) {
    return { sent: 0, failed: 0, errors: [] };
  }

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const enrollment of enrollments) {
    try {
      const plan = await getStudentPaymentPlan(enrollment.student_id);
      
      if (!plan || plan.paymentStatus === 'paid_in_full') {
        continue; // Skip students who are paid in full
      }

      // Create payment link
      const paymentResult = await createWeeklyPaymentLink(
        enrollment.student_id,
        plan.weeklyPaymentAmount
      );

      if (!paymentResult.success) {
        failed++;
        errors.push(`${plan.email}: ${paymentResult.error}`);
        continue;
      }

      // Send email
      const emailResponse = await fetch(`${siteUrl}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: plan.email,
          subject: `Weekly Payment Due - $${plan.weeklyPaymentAmount.toFixed(2)}`,
          html: getWeeklyPaymentEmailHtml({
            studentName: plan.fullName,
            amount: plan.weeklyPaymentAmount,
            remainingBalance: plan.remainingBalance,
            weeksRemaining: plan.weeksRemaining,
            paymentUrl: paymentResult.paymentLinkUrl!,
            dashboardUrl: `${siteUrl}/apprentice`,
          }),
        }),
      });

      if (emailResponse.ok) {
        sent++;
      } else {
        failed++;
        errors.push(`${plan.email}: Email send failed`);
      }
    } catch (err: any) {
      failed++;
      errors.push(`${enrollment.student_id}: ${err.message}`);
    }
  }

  return { sent, failed, errors };
}

/**
 * Get next Friday date
 */
function getNextFriday(): Date {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 7 - dayOfWeek + 5;
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysUntilFriday);
  nextFriday.setHours(10, 0, 0, 0); // 10 AM
  return nextFriday;
}

/**
 * Check if payment is overdue (more than 7 days since last Friday)
 */
function isPaymentOverdue(lastPaymentDate: string | null): boolean {
  if (!lastPaymentDate) {
    // If no payments ever made, check enrollment date
    return true; // Will be handled by checking if setup fee was paid
  }
  
  const lastPayment = new Date(lastPaymentDate);
  const daysSincePayment = Math.floor((Date.now() - lastPayment.getTime()) / (1000 * 60 * 60 * 24));
  
  return daysSincePayment > 7;
}

/**
 * Check if today is a payment day (Friday)
 */
function isPaymentDueToday(): boolean {
  return new Date().getDay() === 5; // Friday
}

/**
 * Generate weekly payment email HTML
 */
function getWeeklyPaymentEmailHtml(data: {
  studentName: string;
  amount: number;
  remainingBalance: number;
  weeksRemaining: number;
  paymentUrl: string;
  dashboardUrl: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">

  <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 25px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">Weekly Payment Due</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Barber Apprenticeship Program</p>
  </div>

  <div style="background: white; padding: 25px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

    <p style="font-size: 16px; color: #334155;">Hi ${data.studentName},</p>
    
    <p style="color: #334155;">Your weekly tuition payment is due. Please complete your payment to continue your training.</p>

    <!-- Payment Amount Box -->
    <div style="background: #eff6ff; border: 2px solid #3b82f6; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center;">
      <p style="margin: 0; color: #1e40af; font-size: 14px; text-transform: uppercase;">Amount Due</p>
      <h2 style="margin: 10px 0; color: #1e40af; font-size: 36px; font-weight: bold;">$${data.amount.toFixed(2)}</h2>
      <p style="margin: 0; color: #3b82f6; font-size: 14px;">Due by end of day Friday</p>
    </div>

    <!-- Pay Now Button -->
    <div style="text-align: center; margin: 25px 0;">
      <a href="${data.paymentUrl}" style="display: inline-block; background: #22c55e; color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px;">
        Pay Now →
      </a>
    </div>

    <!-- Balance Summary -->
    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 25px 0;">
      <table style="width: 100%;">
        <tr>
          <td style="padding: 8px 0; color: #64748b;">Remaining Balance:</td>
          <td style="padding: 8px 0; text-align: right; color: #1e293b; font-weight: bold;">$${data.remainingBalance.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b;">Weeks Remaining:</td>
          <td style="padding: 8px 0; text-align: right; color: #1e293b; font-weight: bold;">${data.weeksRemaining} weeks</td>
        </tr>
      </table>
    </div>

    <!-- Warning -->
    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0; border-radius: 0 8px 8px 0;">
      <p style="margin: 0; color: #92400e; font-size: 14px;">
        <strong>⚠️ Important:</strong> If payment is not received, you will not be able to clock in for training until your account is current.
      </p>
    </div>

    <!-- Dashboard Link -->
    <div style="text-align: center; margin: 25px 0;">
      <a href="${data.dashboardUrl}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">
        View your dashboard →
      </a>
    </div>

    <!-- Contact -->
    <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; margin-top: 25px; text-align: center;">
      <p style="margin: 0; color: #64748b; font-size: 14px;">
        Questions about your payment? Call <a href="tel:317-314-3757" style="color: #3b82f6;">(317) 314-3757</a>
      </p>
    </div>

  </div>

</body>
</html>
  `;
}
