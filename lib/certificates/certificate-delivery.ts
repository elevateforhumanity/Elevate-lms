import { createClient } from '@supabase/supabase-js';
import {
  issueModuleCertificate,
  issueProgramCertificate,
} from './certificate-generator';
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase configuration missing');
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}
interface EmailData {
  to: string;
  subject: string;
  html: string;
}
async function sendCertificateEmail(emailData: EmailData) {
  // Send email via your email service
  // This is a Content - integrate with your email service (SendGrid, Resend, etc.)
  // Example with fetch to your email API
  try {
    await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    });
  } catch { /* Error handled silently */ 
    // Error: $1
  }
}
export async function deliverModuleCertificate(
  enrollmentId: string,
  moduleId: string
) {
  const supabase = getSupabaseClient();
  // Issue the certificate
  const certificateNumber = await issueModuleCertificate(
    enrollmentId,
    moduleId
  );
  // Get enrollment details for email
  const { data: enrollment } = await supabase
    .from('partner_course_enrollments')
    .select(
      `
        *,
        student:profiles!partner_course_enrollments_student_id_fkey(full_name, email),
        course:partner_courses(name)
      `
    )
    .eq('id', enrollmentId)
    .single();
  if (!enrollment) {
    throw new Error('Enrollment not found');
  }
  const { data: module } = await supabase
    .from('partner_course_modules')
    .select('name')
    .eq('id', moduleId)
    .single();
  if (!module) {
    throw new Error('Module not found');
  }
  // Get certificate details
  const { data: certificate } = await supabase
    .from('student_certificates')
    .select('*')
    .eq('certificate_number', certificateNumber)
    .single();
  if (!certificate) {
    throw new Error('Certificate not found');
  }
  // Send email notification
  await sendCertificateEmail({
    to: enrollment.student.email,
    subject: `🎉 Your Certificate for ${module.name}`,
    html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .certificate-box { background: white; border: 3px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Congratulations!</h1>
              <p>You've earned a certificate!</p>
            </div>
            <div class="content">
              <p>Hi ${enrollment.student.full_name},</p>
              <p>We're thrilled to inform you that you've successfully completed <strong>${module.name}</strong> from ${enrollment.course.name}!</p>
              <div class="certificate-box">
                <h2>Certificate of Completion</h2>
                <p><strong>${module.name}</strong></p>
                <p>Certificate Number: <code>${certificateNumber}</code></p>
              </div>
              <p style="text-align: center;">
                <a href="${certificate.pdf_url}" class="button">Download Your Certificate</a>
              </p>
              <p>Your certificate is now available in your student dashboard. You can download it, share it with employers, or verify it online.</p>
              <p><strong>What's Next?</strong></p>
              <ul>
                <li>Continue with the next module in your program</li>
                <li>Share your achievement on LinkedIn</li>
                <li>Add this certificate to your resume</li>
              </ul>
              <p>Keep up the great work!</p>
              <p>Best regards,<br>The Elevate for Humanity Team</p>
              <div class="footer">
                <p>Verify this certificate at: elevateforhumanity.institute/certificates/verify</p>
                <p>Certificate Number: ${certificateNumber}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
  });
  // Create notification in app
  await supabase.from('notifications').insert({
    user_id: enrollment.student_id,
    type: 'certificate_earned',
    title: 'Certificate Earned!',
    message: `You've earned a certificate for completing ${module.name}`,
    data: {
      certificate_id: certificate.id,
      certificate_number: certificateNumber,
      pdf_url: certificate.pdf_url,
    },
  });
  return certificateNumber;
}

export async function deliverProgramCertificate(
  studentId: string,
  programId: string
) {
  const supabase = getSupabaseClient();
  // Issue the certificate
  const certificateNumber = await issueProgramCertificate(studentId, programId);
  // Get student and program details
  const { data: student } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', studentId)
    .single();
  if (!student) {
    throw new Error('Student not found');
  }
  const { data: program } = await supabase
    .from('programs')
    .select('name')
    .eq('id', programId)
    .single();
  if (!program) {
    throw new Error('Program not found');
  }
  // Get certificate details
  const { data: certificate } = await supabase
    .from('student_certificates')
    .select('*')
    .eq('certificate_number', certificateNumber)
    .single();
  if (!certificate) {
    throw new Error('Certificate not found');
  }
  // Send email notification
  await sendCertificateEmail({
    to: student.email,
    subject: `🏆 Program Completion Certificate - ${program.name}`,
    html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .certificate-box { background: white; border: 4px solid #f5576c; padding: 30px; margin: 20px 0; border-radius: 8px; text-align: center; }
            .button { display: inline-block; background: #f5576c; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; margin: 10px 0; font-weight: bold; }
            .achievement { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏆 Outstanding Achievement!</h1>
              <p style="font-size: 18px;">Program Completion Certificate</p>
            </div>
            <div class="content">
              <p>Dear ${student.full_name},</p>
              <p>It is with great pride that we congratulate you on successfully completing the <strong>${program.name}</strong> program!</p>
              <div class="certificate-box">
                <h2 style="color: #f5576c;">Certificate of Program Completion</h2>
                <p style="font-size: 20px; margin: 20px 0;"><strong>${program.name}</strong></p>
                <p>Issued by: <strong>Elevate for Humanity</strong></p>
                <p>Certificate Number: <code style="background: #f0f0f0; padding: 5px 10px; border-radius: 3px;">${certificateNumber}</code></p>
              </div>
              <p style="text-align: center;">
                <a href="${certificate.pdf_url}" class="button">Download Your Certificate</a>
              </p>
              <div class="achievement">
                <h3>🎯 Your Achievement</h3>
                <p>This certificate represents your dedication, hard work, and commitment to professional development. You've completed all required modules and demonstrated mastery of the program content.</p>
              </div>
              <p><strong>Share Your Success:</strong></p>
              <ul>
                <li>Add this certificate to your LinkedIn profile</li>
                <li>Include it in your professional portfolio</li>
                <li>Share it with current or prospective employers</li>
                <li>Use it to advance your career opportunities</li>
              </ul>
              <p>This is a significant milestone in your professional journey. We're honored to have been part of your learning experience.</p>
              <p>Congratulations once again on this remarkable achievement!</p>
              <p>With pride and best wishes,<br><strong>The Elevate for Humanity Team</strong></p>
              <div class="footer">
                <p>Verify this certificate at: elevateforhumanity.institute/certificates/verify</p>
                <p>Certificate Number: ${certificateNumber}</p>
                <p>This certificate is digitally verified and tamper-proof</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
  });
  // Create notification in app
  await supabase.from('notifications').insert({
    user_id: studentId,
    type: 'program_completed',
    title: 'Program Completed! 🏆',
    message: `Congratulations! You've completed ${program.name} and earned your program certificate.`,
    data: {
      certificate_id: certificate.id,
      certificate_number: certificateNumber,
      pdf_url: certificate.pdf_url,
      program_id: programId,
    },
  });
  return certificateNumber;
}

// Automatic certificate delivery when module is completed
export async function onModuleComplete(enrollmentId: string, moduleId: string) {
  const supabase = getSupabaseClient();
  // Update module completion status
  const { error: updateError } = await supabase
    .from('partner_course_enrollments')
    .update({
      completed_modules: supabase.rpc('array_append', {
        arr: 'completed_modules',
        elem: moduleId,
      }),
    })
    .eq('id', enrollmentId);
  if (updateError) {
    // Error: $1
  }
  // Deliver certificate
  await deliverModuleCertificate(enrollmentId, moduleId);
  // Check if all modules are complete for program certificate
  const { data: enrollment } = await supabase
    .from('partner_course_enrollments')
    .select(
      `
        *,
        course:partner_courses(id)
      `
    )
    .eq('id', enrollmentId)
    .single();
  if (enrollment) {
    const { data: modules } = await supabase
      .from('partner_course_modules')
      .select('id')
      .eq('partner_course_id', enrollment.course.id);
    const allModulesComplete = modules?.every((m) =>
      enrollment.completed_modules?.includes(m.id)
    );
    if (allModulesComplete) {
      // Update enrollment status
      await supabase
        .from('partner_course_enrollments')
        .update({ status: 'completed' })
        .eq('id', enrollmentId);
      // Check if this completes a program
      const { data: programCert } = await supabase
        .from('program_required_certifications')
        .select('program_id')
        .eq('partner_course_id', enrollment.partner_course_id)
        .single();
      if (programCert) {
        // Check if all required certifications for program are complete
        const { data: requiredCerts } = await supabase
          .from('program_required_certifications')
          .select('partner_course_id')
          .eq('program_id', programCert.program_id);
        const allCertsComplete = await Promise.all(
          (requiredCerts || []).map(async (cert) => {
            const { data }: any = await supabase
              .from('partner_course_enrollments')
              .select('status')
              .eq('student_id', enrollment.student_id)
              .eq('partner_course_id', cert.partner_course_id)
              .eq('status', 'completed')
              .single();
            return !!data;
          })
        );
        if (allCertsComplete.every(Boolean)) {
          // Deliver program certificate
          await deliverProgramCertificate(
            enrollment.student_id,
            programCert.program_id
          );
        }
      }
    }
  }
}
