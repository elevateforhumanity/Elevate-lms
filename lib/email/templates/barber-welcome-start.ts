/**
 * Barber Apprenticeship - Welcome & Start Date Email
 * 
 * Sent after ALL onboarding is complete:
 * - Documents uploaded
 * - Handbook completed
 * - MOU signed
 * - Milady enrollment confirmed
 * 
 * Contains:
 * - Start date (next Monday)
 * - Complete clock-in/out instructions
 * - Geofencing rules
 * - Auto clock-out rules
 * - Lunch rules
 * - Max hours
 * - Everything they need to know
 */

export interface BarberWelcomeStartEmailData {
  studentName: string;
  studentEmail: string;
  startDate: string; // Formatted date string
  shopName: string;
  shopAddress: string;
  supervisorName?: string;
  dashboardUrl: string;
  timeclockUrl: string;
  requiredHours: number;
}

function getNextMonday(): Date {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek);
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilMonday);
  return nextMonday;
}

export function formatStartDate(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export function getBarberWelcomeStartEmail(data: BarberWelcomeStartEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const { 
    studentName, 
    studentEmail,
    startDate,
    shopName,
    shopAddress,
    supervisorName,
    dashboardUrl,
    timeclockUrl,
    requiredHours = 1500,
  } = data;

  const subject = `🎉 You're Ready to Start! Training Begins ${startDate}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">

  <!-- Header -->
  <div style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 28px;">🎉 Congratulations!</h1>
    <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.95;">Your Onboarding is Complete</p>
  </div>

  <div style="background: white; padding: 25px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

    <p style="font-size: 16px; color: #334155;">Hi ${studentName},</p>
    
    <p style="color: #334155; font-size: 16px;">
      You've completed all your onboarding requirements. You're officially ready to begin your Barber Apprenticeship!
    </p>

    <!-- START DATE BOX -->
    <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 25px; border-radius: 12px; margin: 25px 0; text-align: center;">
      <p style="margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">Your Training Starts</p>
      <h2 style="margin: 10px 0; font-size: 32px; font-weight: bold;">${startDate}</h2>
      <p style="margin: 0; font-size: 16px;">Report to your assigned shop by 9:00 AM</p>
    </div>

    <!-- SHOP ASSIGNMENT -->
    <div style="background: #f8fafc; border: 2px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 25px 0;">
      <h3 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px;">📍 Your Shop Assignment</h3>
      <table style="width: 100%;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 120px;">Shop Name:</td>
          <td style="padding: 8px 0; color: #1e293b; font-weight: bold;">${shopName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b;">Address:</td>
          <td style="padding: 8px 0; color: #1e293b;">${shopAddress}</td>
        </tr>
        ${supervisorName ? `
        <tr>
          <td style="padding: 8px 0; color: #64748b;">Supervisor:</td>
          <td style="padding: 8px 0; color: #1e293b;">${supervisorName}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- CLOCK-IN INSTRUCTIONS -->
    <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
      <h3 style="margin: 0 0 15px 0; color: #1e40af; font-size: 18px;">⏰ How to Clock In/Out</h3>
      
      <ol style="margin: 0; padding-left: 20px; color: #1e40af;">
        <li style="margin-bottom: 12px;">
          <strong>Open the Timeclock</strong><br>
          <span style="color: #3b82f6;">Go to your dashboard and tap "Clock In" or visit the timeclock directly.</span>
        </li>
        <li style="margin-bottom: 12px;">
          <strong>Allow Location Access</strong><br>
          <span style="color: #3b82f6;">Your phone will ask for location permission. You MUST allow this to clock in.</span>
        </li>
        <li style="margin-bottom: 12px;">
          <strong>Be at the Shop</strong><br>
          <span style="color: #3b82f6;">You must be physically at your assigned shop location to clock in. The system uses GPS to verify.</span>
        </li>
        <li style="margin-bottom: 12px;">
          <strong>Tap "Clock In"</strong><br>
          <span style="color: #3b82f6;">Once your location is verified, tap the button to start your shift.</span>
        </li>
      </ol>

      <div style="text-align: center; margin-top: 20px;">
        <a href="${timeclockUrl}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Open Timeclock →
        </a>
      </div>
    </div>

    <!-- IMPORTANT RULES -->
    <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 25px 0;">
      <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 18px;">⚠️ Important Rules - READ CAREFULLY</h3>
      
      <div style="margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px 0; color: #78350f; font-size: 15px;">🚨 Automatic Clock-Out (Geofencing)</h4>
        <p style="margin: 0; color: #92400e; font-size: 14px;">
          If you leave the shop premises while clocked in, <strong>you will be automatically clocked out</strong>. 
          The system tracks your location every 2 minutes. If you're outside the shop boundary, your shift ends automatically.
        </p>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px 0; color: #78350f; font-size: 15px;">🍽️ Lunch Break Rules</h4>
        <p style="margin: 0; color: #92400e; font-size: 14px;">
          <strong>Shifts over 6 hours:</strong> You MUST take a 30-minute unpaid lunch break.<br>
          <strong>Auto-deduction:</strong> If you don't manually clock out for lunch, 30 minutes will be automatically deducted from shifts over 6 hours.<br>
          <strong>To take lunch:</strong> Tap "Start Lunch" on the timeclock. Tap "End Lunch" when you return.
        </p>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px 0; color: #78350f; font-size: 15px;">⏱️ Maximum Hours</h4>
        <p style="margin: 0; color: #92400e; font-size: 14px;">
          <strong>Daily max:</strong> 10 hours per day<br>
          <strong>Weekly max:</strong> 50 hours per week<br>
          <strong>Auto clock-out:</strong> You will be automatically clocked out after 10 hours if you forget.
        </p>
      </div>

      <div>
        <h4 style="margin: 0 0 8px 0; color: #78350f; font-size: 15px;">📱 Keep Your Phone Charged</h4>
        <p style="margin: 0; color: #92400e; font-size: 14px;">
          Your phone must have battery and location services enabled to clock in/out. 
          If your phone dies while clocked in, you'll need to manually request a time correction.
        </p>
      </div>
    </div>

    <!-- HOUR REQUIREMENTS -->
    <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
      <h3 style="margin: 0 0 15px 0; color: #166534; font-size: 18px;">📊 Your Hour Requirements</h3>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #166534;">Total Hours Required:</td>
          <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #166534; font-size: 18px;">${requiredHours.toLocaleString()} hours</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #166534;">OJT (On-the-Job):</td>
          <td style="padding: 10px 0; text-align: right; color: #166534;">~90% at the shop</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #166534;">RTI (Theory/Milady):</td>
          <td style="padding: 10px 0; text-align: right; color: #166534;">~10% online</td>
        </tr>
      </table>

      <p style="margin: 15px 0 0 0; color: #166534; font-size: 14px;">
        At 40 hours/week, you'll complete the program in approximately <strong>${Math.ceil(requiredHours / 40)} weeks</strong>.
      </p>
    </div>

    <!-- CHECKLIST REMINDER -->
    <div style="background: #faf5ff; border-left: 4px solid #a855f7; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
      <h3 style="margin: 0 0 15px 0; color: #7e22ce; font-size: 18px;">✅ What You've Completed</h3>
      <ul style="margin: 0; padding-left: 20px; color: #7e22ce;">
        <li style="margin-bottom: 8px;">✓ Payment processed</li>
        <li style="margin-bottom: 8px;">✓ Milady enrollment confirmed</li>
        <li style="margin-bottom: 8px;">✓ Documents uploaded</li>
        <li style="margin-bottom: 8px;">✓ Student handbook reviewed</li>
        <li style="margin-bottom: 8px;">✓ MOU signed</li>
      </ul>
    </div>

    <!-- FIRST DAY CHECKLIST -->
    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
      <h3 style="margin: 0 0 15px 0; color: #1e293b; font-size: 18px;">📋 First Day Checklist</h3>
      <ul style="margin: 0; padding-left: 20px; color: #475569;">
        <li style="margin-bottom: 10px;">Arrive by <strong>9:00 AM</strong></li>
        <li style="margin-bottom: 10px;">Bring your <strong>phone</strong> (charged, with location enabled)</li>
        <li style="margin-bottom: 10px;">Wear <strong>professional attire</strong> (black pants, closed-toe shoes)</li>
        <li style="margin-bottom: 10px;">Bring a <strong>notebook</strong> for notes</li>
        <li style="margin-bottom: 10px;">Clock in using the <strong>Elevate timeclock</strong> when you arrive</li>
        <li style="margin-bottom: 10px;">Introduce yourself to your <strong>supervisor</strong></li>
      </ul>
    </div>

    <!-- CTA BUTTONS -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="${dashboardUrl}" style="display: inline-block; background: #7c3aed; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 5px;">
        Go to Dashboard
      </a>
      <a href="${timeclockUrl}" style="display: inline-block; background: #2563eb; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin: 5px;">
        Open Timeclock
      </a>
    </div>

    <!-- CONTACT -->
    <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; margin-top: 30px; text-align: center;">
      <h3 style="margin: 0 0 10px 0; color: #334155; font-size: 16px;">Questions or Issues?</h3>
      <p style="margin: 0 0 5px 0;">
        <strong>Call:</strong> <a href="tel:317-314-3757" style="color: #3b82f6; text-decoration: none;">(317) 314-3757</a>
      </p>
      <p style="margin: 0 0 20px 0;">
        <strong>Email:</strong> <a href="mailto:elevate4humanityedu@gmail.com" style="color: #3b82f6; text-decoration: none;">elevate4humanityedu@gmail.com</a>
      </p>
      <p style="margin: 0; color: #64748b; font-size: 14px;">
        We're excited to have you! Let's get you licensed.<br>
        <strong>Elizabeth Greene, CEO</strong><br>
        Elevate For Humanity Career & Training Institute
      </p>
    </div>

  </div>

</body>
</html>
  `;

  const text = `
🎉 CONGRATULATIONS - YOU'RE READY TO START!

Hi ${studentName},

You've completed all your onboarding requirements. You're officially ready to begin your Barber Apprenticeship!

═══════════════════════════════════════════
YOUR TRAINING STARTS: ${startDate}
Report to your assigned shop by 9:00 AM
═══════════════════════════════════════════

YOUR SHOP ASSIGNMENT
--------------------
Shop: ${shopName}
Address: ${shopAddress}
${supervisorName ? `Supervisor: ${supervisorName}` : ''}

HOW TO CLOCK IN/OUT
-------------------
1. Open the Timeclock (${timeclockUrl})
2. Allow Location Access on your phone
3. Be physically at the shop
4. Tap "Clock In" to start your shift

⚠️ IMPORTANT RULES - READ CAREFULLY
------------------------------------

🚨 AUTOMATIC CLOCK-OUT (GEOFENCING)
If you leave the shop while clocked in, you will be AUTOMATICALLY clocked out.
The system tracks your location every 2 minutes.

🍽️ LUNCH BREAK RULES
- Shifts over 6 hours: You MUST take a 30-minute unpaid lunch
- Auto-deduction: 30 minutes deducted if you don't manually clock out for lunch
- To take lunch: Tap "Start Lunch" then "End Lunch" when you return

⏱️ MAXIMUM HOURS
- Daily max: 10 hours per day
- Weekly max: 50 hours per week
- Auto clock-out after 10 hours if you forget

📱 KEEP YOUR PHONE CHARGED
Your phone must have battery and location services enabled.

HOUR REQUIREMENTS
-----------------
Total Required: ${requiredHours.toLocaleString()} hours
OJT (On-the-Job): ~90% at the shop
RTI (Theory/Milady): ~10% online

At 40 hours/week = ~${Math.ceil(requiredHours / 40)} weeks to complete

FIRST DAY CHECKLIST
-------------------
□ Arrive by 9:00 AM
□ Bring your phone (charged, location enabled)
□ Wear professional attire (black pants, closed-toe shoes)
□ Bring a notebook
□ Clock in using Elevate timeclock
□ Introduce yourself to your supervisor

Dashboard: ${dashboardUrl}
Timeclock: ${timeclockUrl}

Questions? Call (317) 314-3757

We're excited to have you! Let's get you licensed.

Elizabeth Greene, CEO
Elevate For Humanity Career & Training Institute
  `;

  return { subject, html, text };
}

// Helper to calculate next Monday
export function calculateNextMonday(): { date: Date; formatted: string } {
  const nextMonday = getNextMonday();
  return {
    date: nextMonday,
    formatted: formatStartDate(nextMonday),
  };
}
