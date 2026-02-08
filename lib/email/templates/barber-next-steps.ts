/**
 * Barber Apprenticeship - Post-Payment Next Steps Email
 * 
 * Sent immediately after payment is complete.
 * Tells student what to expect next (Milady email coming).
 */

export interface BarberNextStepsEmailData {
  studentName: string;
  studentEmail: string;
  dashboardUrl: string;
}

export function getBarberNextStepsEmail(data: BarberNextStepsEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const { studentName, studentEmail, dashboardUrl } = data;

  const subject = '✅ Payment Received - Here\'s What Happens Next';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">

  <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 26px;">✅ Payment Confirmed!</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">Welcome to the Barber Apprenticeship Program</p>
  </div>

  <div style="background: white; padding: 25px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

    <p style="font-size: 16px; color: #334155;">Hi ${studentName},</p>
    
    <p style="color: #334155;">
      Your payment has been received and your enrollment is being processed. Here's what happens next:
    </p>

    <!-- Timeline -->
    <div style="margin: 30px 0;">
      
      <!-- Step 1 -->
      <div style="display: flex; margin-bottom: 20px;">
        <div style="width: 40px; height: 40px; background: #22c55e; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">✓</div>
        <div style="margin-left: 15px; padding-top: 8px;">
          <h3 style="margin: 0; color: #166534; font-size: 16px;">Payment Received</h3>
          <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Just completed</p>
        </div>
      </div>

      <!-- Step 2 -->
      <div style="display: flex; margin-bottom: 20px;">
        <div style="width: 40px; height: 40px; background: #f59e0b; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
        <div style="margin-left: 15px; padding-top: 8px;">
          <h3 style="margin: 0; color: #92400e; font-size: 16px;">Milady Account Created</h3>
          <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Within 24-48 hours, you'll receive an email with your Milady login credentials. We'll forward it to you.</p>
        </div>
      </div>

      <!-- Step 3 -->
      <div style="display: flex; margin-bottom: 20px;">
        <div style="width: 40px; height: 40px; background: #e2e8f0; color: #64748b; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
        <div style="margin-left: 15px; padding-top: 8px;">
          <h3 style="margin: 0; color: #334155; font-size: 16px;">Complete Onboarding</h3>
          <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Upload documents, review handbook, sign MOU</p>
        </div>
      </div>

      <!-- Step 4 -->
      <div style="display: flex; margin-bottom: 20px;">
        <div style="width: 40px; height: 40px; background: #e2e8f0; color: #64748b; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">4</div>
        <div style="margin-left: 15px; padding-top: 8px;">
          <h3 style="margin: 0; color: #334155; font-size: 16px;">Start Training</h3>
          <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Begin on the following Monday after onboarding is complete</p>
        </div>
      </div>

    </div>

    <!-- What to Watch For -->
    <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
      <h3 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px;">📧 Watch Your Inbox</h3>
      <p style="margin: 0; color: #1e40af; font-size: 14px;">
        You'll receive your <strong>Milady login credentials</strong> within 24-48 hours. 
        Check your spam folder if you don't see it. Once you receive it, log into Milady, 
        then return to your dashboard to continue onboarding.
      </p>
    </div>

    <!-- Dashboard Button -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="${dashboardUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
        Go to Your Dashboard →
      </a>
    </div>

    <!-- Contact -->
    <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center;">
      <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
        Questions? We're here to help.
      </p>
      <p style="margin: 0;">
        <a href="tel:317-314-3757" style="color: #2563eb; text-decoration: none; font-weight: bold;">(317) 314-3757</a>
        &nbsp;|&nbsp;
        <a href="mailto:elevate4humanityedu@gmail.com" style="color: #2563eb; text-decoration: none;">elevate4humanityedu@gmail.com</a>
      </p>
    </div>

  </div>

</body>
</html>
  `;

  const text = `
PAYMENT CONFIRMED - HERE'S WHAT HAPPENS NEXT

Hi ${studentName},

Your payment has been received and your enrollment is being processed.

WHAT HAPPENS NEXT:

✓ Step 1: Payment Received (Complete)

→ Step 2: Milady Account Created (24-48 hours)
  You'll receive an email with your Milady login credentials.
  We'll forward it to: ${studentEmail}

→ Step 3: Complete Onboarding
  Upload documents, review handbook, sign MOU

→ Step 4: Start Training
  Begin on the following Monday after onboarding is complete

WATCH YOUR INBOX
You'll receive your Milady login credentials within 24-48 hours.
Check your spam folder if you don't see it.

Go to your dashboard: ${dashboardUrl}

Questions? Call (317) 314-3757
  `;

  return { subject, html, text };
}
