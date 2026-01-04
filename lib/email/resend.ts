import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(options: EmailOptions) {
  if (!resend) {
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from:
        options.from || 'Elevate for Humanity <noreply@elevateforhumanity.org>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (data: unknown) {
    return { success: false, error: error.message };
  }
}

export async function sendWelcomeEmail(params: {
  email: string;
  name: string;
  programName: string;
  dashboardUrl: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f97316; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9fafb; }
          .button { display: inline-block; padding: 12px 30px; background: #f97316; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Elevate for Humanity!</h1>
          </div>
          <div class="content">
            <h2>Hi ${params.name},</h2>
            <p>Congratulations! You've successfully enrolled in <strong>${params.programName}</strong>.</p>
            <p>We're excited to have you join our community of learners. Your journey to a better career starts now!</p>
            <p><strong>What's Next:</strong></p>
            <ul>
              <li>Access your student dashboard</li>
              <li>Complete your student profile</li>
              <li>Review your course materials</li>
              <li>Connect with your instructor</li>
            </ul>
            <p style="text-align: center;">
              <a href="${params.dashboardUrl}" class="button">Go to Dashboard</a>
            </p>
            <p>If you have any questions, our support team is here to help. Just reply to this email.</p>
            <p>Best regards,<br>The Elevate for Humanity Team</p>
          </div>
          <div class="footer">
            <p>Elevate for Humanity Career & Technical Institute<br>
            8888 Keystone Crossing Suite 1300, Indianapolis, IN 46240</p>
            <p><a href="https://elevateforhumanity.org">www.elevateforhumanity.org</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: params.email,
    subject: `Welcome to ${params.programName}!`,
    html,
  });
}

export async function sendCreatorApprovalEmail(params: {
  email: string;
  name: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9fafb; }
          .button { display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Creator Application Approved!</h1>
          </div>
          <div class="content">
            <h2>Hi ${params.name},</h2>
            <p>Great news! Your creator application has been approved.</p>
            <p>You can now start creating and selling courses on our marketplace.</p>
            <p style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/creator/dashboard" class="button">Go to Creator Dashboard</a>
            </p>
            <p>Best regards,<br>The Elevate for Humanity Team</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: params.email,
    subject: 'Your Creator Application Has Been Approved!',
    html,
  });
}

export async function sendCreatorRejectionEmail(params: {
  email: string;
  name: string;
  reason: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ef4444; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9fafb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Creator Application Update</h1>
          </div>
          <div class="content">
            <h2>Hi ${params.name},</h2>
            <p>Thank you for your interest in becoming a creator on our platform.</p>
            <p>After careful review, we're unable to approve your application at this time.</p>
            <p><strong>Reason:</strong> ${params.reason}</p>
            <p>You're welcome to reapply in the future. If you have questions, please contact us.</p>
            <p>Best regards,<br>The Elevate for Humanity Team</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: params.email,
    subject: 'Creator Application Update',
    html,
  });
}

export async function sendPayoutConfirmationEmail(params: {
  email: string;
  name: string;
  amount: number;
  payoutId: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9fafb; }
          .amount { font-size: 32px; font-weight: bold; color: #10b981; text-align: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💰 Payout Processed</h1>
          </div>
          <div class="content">
            <h2>Hi ${params.name},</h2>
            <p>Your payout has been processed successfully!</p>
            <div class="amount">$${params.amount.toFixed(2)}</div>
            <p><strong>Payout ID:</strong> ${params.payoutId}</p>
            <p>The funds should arrive in your account within 2-5 business days.</p>
            <p>Best regards,<br>The Elevate for Humanity Team</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: params.email,
    subject: `Payout Processed: $${params.amount.toFixed(2)}`,
    html,
  });
}

export async function sendProductApprovalEmail(params: {
  email: string;
  name: string;
  productName: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9fafb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Product Approved!</h1>
          </div>
          <div class="content">
            <h2>Hi ${params.name},</h2>
            <p>Your product "<strong>${params.productName}</strong>" has been approved and is now live on the marketplace!</p>
            <p>Students can now purchase and access your content.</p>
            <p>Best regards,<br>The Elevate for Humanity Team</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: params.email,
    subject: `Product Approved: ${params.productName}`,
    html,
  });
}

export async function sendProductRejectionEmail(params: {
  email: string;
  name: string;
  productName: string;
  reason: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #ef4444; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9fafb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Product Review Update</h1>
          </div>
          <div class="content">
            <h2>Hi ${params.name},</h2>
            <p>Your product "<strong>${params.productName}</strong>" requires revisions before it can be approved.</p>
            <p><strong>Reason:</strong> ${params.reason}</p>
            <p>Please make the necessary changes and resubmit for review.</p>
            <p>Best regards,<br>The Elevate for Humanity Team</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: params.email,
    subject: `Product Needs Revision: ${params.productName}`,
    html,
  });
}

export async function sendMarketplaceSaleNotification(params: {
  creatorEmail: string;
  creatorName: string;
  productName: string;
  amount: number;
  buyerName: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9fafb; }
          .amount { font-size: 24px; font-weight: bold; color: #10b981; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Sale!</h1>
          </div>
          <div class="content">
            <h2>Hi ${params.creatorName},</h2>
            <p>Great news! You just made a sale.</p>
            <p><strong>Product:</strong> ${params.productName}</p>
            <p><strong>Buyer:</strong> ${params.buyerName}</p>
            <p><strong>Amount:</strong> <span class="amount">$${params.amount.toFixed(2)}</span></p>
            <p>Keep up the great work!</p>
            <p>Best regards,<br>The Elevate for Humanity Team</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: params.creatorEmail,
    subject: `New Sale: ${params.productName}`,
    html,
  });
}

export async function sendMarketplaceApplicationEmail(params: {
  adminEmail: string;
  applicantName: string;
  applicantEmail: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #3b82f6; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9fafb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Creator Application</h1>
          </div>
          <div class="content">
            <p>A new creator application has been submitted:</p>
            <p><strong>Name:</strong> ${params.applicantName}</p>
            <p><strong>Email:</strong> ${params.applicantEmail}</p>
            <p>Please review the application in the admin dashboard.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: params.adminEmail,
    subject: 'New Creator Application',
    html,
  });
}
