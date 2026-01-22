// SMS notification system using Twilio
import { logger } from '@/lib/logger';

export interface SMSNotification {
  to: string;
  message: string;
}

export interface SMSResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class SMSService {
  private static instance: SMSService;
  private accountSid: string | undefined;
  private authToken: string | undefined;
  private fromNumber: string | undefined;
  private enabled: boolean;

  private constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
    this.enabled = !!(this.accountSid && this.authToken && this.fromNumber);
  }

  static getInstance(): SMSService {
    if (!SMSService.instance) {
      SMSService.instance = new SMSService();
    }
    return SMSService.instance;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async send(notification: SMSNotification): Promise<SMSResult> {
    const cleanPhone = notification.to.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return { success: false, error: 'Invalid phone number' };
    }

    const formattedPhone = cleanPhone.startsWith('1') 
      ? `+${cleanPhone}` 
      : `+1${cleanPhone}`;

    if (!this.enabled) {
      logger.info('SMS not sent (Twilio not configured)', { 
        to: formattedPhone, 
        messageLength: notification.message.length 
      });
      return { success: true, messageId: 'not-configured' };
    }

    try {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: formattedPhone,
          From: this.fromNumber!,
          Body: notification.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        logger.error('Twilio SMS failed', new Error(data.message || 'Unknown error'), {
          to: formattedPhone,
          status: response.status,
        });
        return { success: false, error: data.message || 'SMS send failed' };
      }

      logger.info('SMS sent successfully', { to: formattedPhone, messageId: data.sid });
      return { success: true, messageId: data.sid };
    } catch (error) {
      logger.error('SMS send exception', error as Error, { to: formattedPhone });
      return { success: false, error: (error as Error).message };
    }
  }

  async sendAssignmentReminder(phoneNumber: string, assignmentName: string, dueDate: string): Promise<SMSResult> {
    return this.send({
      to: phoneNumber,
      message: `Reminder: ${assignmentName} is due on ${dueDate}. Submit at www.elevateforhumanity.org/lms/assignments`,
    });
  }

  async sendClassReminder(phoneNumber: string, className: string, startTime: string): Promise<SMSResult> {
    return this.send({
      to: phoneNumber,
      message: `Your ${className} class starts at ${startTime}. Join at www.elevateforhumanity.org/lms/live`,
    });
  }

  async sendAchievementNotification(phoneNumber: string, achievementName: string): Promise<SMSResult> {
    return this.send({
      to: phoneNumber,
      message: `Achievement unlocked: ${achievementName}! View at www.elevateforhumanity.org/achievements`,
    });
  }

  async sendCertificateNotification(phoneNumber: string, courseName: string): Promise<SMSResult> {
    return this.send({
      to: phoneNumber,
      message: `Your ${courseName} certificate is ready! Download at www.elevateforhumanity.org/certificates`,
    });
  }

  async sendEnrollmentConfirmation(phoneNumber: string, courseName: string): Promise<SMSResult> {
    return this.send({
      to: phoneNumber,
      message: `You're enrolled in ${courseName}! Start learning at www.elevateforhumanity.org/lms/courses`,
    });
  }

  async sendVerificationCode(phoneNumber: string, code: string): Promise<SMSResult> {
    return this.send({
      to: phoneNumber,
      message: `Your Elevate verification code is: ${code}. Valid for 10 minutes.`,
    });
  }
}

export const smsService = SMSService.getInstance();

export async function sendSMS(to: string, message: string): Promise<SMSResult> {
  return smsService.send({ to, message });
}
