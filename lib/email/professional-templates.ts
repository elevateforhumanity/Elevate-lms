/**
 * Professional Email Templates
 * Ready-to-use templates for all email scenarios
 */

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

/**
 * Base email layout with branding
 */
function emailLayout(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%); padding: 40px 20px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
    .content { padding: 40px 30px; }
    .content h2 { color: #1e40af; font-size: 24px; margin-top: 0; }
    .button { display: inline-block; padding: 14px 32px; background-color: #ea580c; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .info-box { background-color: #f0f9ff; border-left: 4px solid #1e40af; padding: 16px; margin: 20px 0; }
    .success-box { background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; margin: 20px 0; }
    .footer { background-color: #f9fafb; padding: 30px; text-align: center; color: #6b7280; font-size: 14px; }
    ul { padding-left: 20px; }
    ul li { margin: 8px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>Elevate for Humanity</h1></div>
    ${content}
    <div class="footer">
      <p><strong>Elevate for Humanity</strong></p>
      <p>Phone: <a href="tel:3173143757">317-314-3757</a> | Email: support@elevateforhumanity.org</p>
      <p>© ${new Date().getFullYear()} Elevate for Humanity. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`.trim();
}

/**
 * Welcome Email
 */
export function welcomeEmail(data: { firstName: string; programName: string; loginUrl: string }): EmailTemplate {
  return {
    subject: `Welcome to ${data.programName}!`,
    html: emailLayout(`
      <div class="content">
        <h2>Welcome! 🎉</h2>
        <p>Hi ${data.firstName},</p>
        <p>Your enrollment in <strong>${data.programName}</strong> is now active.</p>
        <div class="success-box"><p style="margin:0;"><strong>✅ 100% FREE</strong> - No tuition. No debt.</p></div>
        <div style="text-align:center;"><a href="${data.loginUrl}" class="button">Access Portal →</a></div>
      </div>
    `),
    text: `Welcome ${data.firstName}! Your enrollment in ${data.programName} is active. Login: ${data.loginUrl}`,
  };
}

/**
 * Course Completion Email
 */
export function completionEmail(data: { firstName: string; courseName: string; certificateNumber: string; certificateUrl: string }): EmailTemplate {
  return {
    subject: `🎓 You Completed ${data.courseName}!`,
    html: emailLayout(`
      <div class="content">
        <h2>🎓 Congratulations!</h2>
        <p>Hi ${data.firstName},</p>
        <p>You've completed <strong>${data.courseName}</strong>!</p>
        <div class="success-box"><p style="margin:0;"><strong>Certificate:</strong> ${data.certificateNumber}</p></div>
        <div style="text-align:center;"><a href="${data.certificateUrl}" class="button">Download Certificate →</a></div>
      </div>
    `),
    text: `Congratulations ${data.firstName}! You completed ${data.courseName}. Certificate: ${data.certificateNumber}. Download: ${data.certificateUrl}`,
  };
}

/**
 * Application Confirmation
 */
export function applicationConfirmationEmail(data: { firstName: string; programName: string }): EmailTemplate {
  return {
    subject: `Application Received - ${data.programName}`,
    html: emailLayout(`
      <div class="content">
        <h2>Application Received ✅</h2>
        <p>Hi ${data.firstName},</p>
        <p>Thank you for applying to <strong>${data.programName}</strong>!</p>
        <div class="info-box"><p style="margin:0;">An advisor will contact you within 1-2 business days.</p></div>
      </div>
    `),
    text: `Hi ${data.firstName}, your application for ${data.programName} has been received. An advisor will contact you within 1-2 business days.`,
  };
}

export { emailLayout };
