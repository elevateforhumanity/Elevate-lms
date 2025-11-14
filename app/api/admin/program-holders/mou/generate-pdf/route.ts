import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Resend } from 'resend';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured - email notifications will be skipped');
    return null;
  }
  return new Resend(apiKey);
}

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    return new Response('Forbidden', { status: 403 });
  }

  const body = await req.json();
  const { programHolderId } = body || {};
  
  if (!programHolderId) {
    return new Response('Missing program holder ID', { status: 400 });
  }

  // Get program holder details with owner info
  const { data: ph, error: phError } = await supabase
    .from('program_holders')
    .select(`
      id,
      name,
      payout_share,
      mou_holder_name,
      mou_holder_signed_at,
      mou_holder_sig_url,
      mou_admin_name,
      mou_admin_signed_at,
      mou_admin_sig_url,
      owner_user_id,
      application:program_holder_applications(contact_email)
    `)
    .eq('id', programHolderId)
    .single();

  if (phError || !ph) {
    return new Response('Program holder not found', { status: 404 });
  }

  if (!ph.mou_holder_sig_url || !ph.mou_admin_sig_url) {
    return new Response('Both signatures required', { status: 400 });
  }

  try {
    // Create PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([612, 792]); // Letter size
    const { width, height } = page.getSize();
    
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    let yPosition = height - 50;
    const margin = 50;
    const lineHeight = 15;

    // Title
    page.drawText('MEMORANDUM OF UNDERSTANDING', {
      x: margin,
      y: yPosition,
      size: 16,
      font: boldFont,
      color: rgb(0, 0, 0),
    });
    yPosition -= lineHeight * 2;

    // Parties
    page.drawText('Between:', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
    });
    yPosition -= lineHeight;

    page.drawText('Elevate for Humanity Career & Technical Institute ("Elevate")', {
      x: margin,
      y: yPosition,
      size: 10,
      font,
    });
    yPosition -= lineHeight;

    page.drawText('and', {
      x: margin,
      y: yPosition,
      size: 10,
      font,
    });
    yPosition -= lineHeight;

    page.drawText(`${ph.name} ("Program Holder")`, {
      x: margin,
      y: yPosition,
      size: 10,
      font,
    });
    yPosition -= lineHeight * 2;

    // Purpose
    page.drawText('Purpose', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
    });
    yPosition -= lineHeight;

    const purposeText = `This MOU outlines the partnership between Elevate and Program Holder for workforce training programs. Elevate serves as the training sponsor and system of record, while Program Holder provides training environment and instruction.`;
    
    const words = purposeText.split(' ');
    let line = '';
    for (const word of words) {
      const testLine = line + word + ' ';
      const testWidth = font.widthOfTextAtSize(testLine, 10);
      if (testWidth > width - 2 * margin && line !== '') {
        page.drawText(line, { x: margin, y: yPosition, size: 10, font });
        yPosition -= lineHeight;
        line = word + ' ';
      } else {
        line = testLine;
      }
    }
    if (line !== '') {
      page.drawText(line, { x: margin, y: yPosition, size: 10, font });
      yPosition -= lineHeight * 2;
    }

    // Revenue Share
    page.drawText('Revenue Share', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
    });
    yPosition -= lineHeight;

    page.drawText(`Program Holder will receive ${Math.round((ph.payout_share || 0.333) * 100)}% of Net Program Revenue per enrolled,`, {
      x: margin,
      y: yPosition,
      size: 10,
      font,
    });
    yPosition -= lineHeight;

    page.drawText('funded participant, after direct costs (credentials, toolkits, compliance expenses).', {
      x: margin,
      y: yPosition,
      size: 10,
      font,
    });
    yPosition -= lineHeight * 2;

    // Responsibilities
    page.drawText('Program Holder Responsibilities', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
    });
    yPosition -= lineHeight;

    const responsibilities = [
      '• Provide safe, compliant training environment',
      '• Deliver hands-on instruction aligned with curriculum',
      '• Maintain required insurance and safety standards',
      '• Report participant progress and completion data',
      '• Comply with workforce program requirements',
      '• Maintain confidentiality of participant information'
    ];

    for (const resp of responsibilities) {
      page.drawText(resp, { x: margin, y: yPosition, size: 10, font });
      yPosition -= lineHeight;
    }
    yPosition -= lineHeight;

    // Term
    page.drawText('Term and Termination', {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
    });
    yPosition -= lineHeight;

    page.drawText('This agreement may be terminated by either party with 30 days written notice.', {
      x: margin,
      y: yPosition,
      size: 10,
      font,
    });
    yPosition -= lineHeight;

    page.drawText('Elevate may terminate immediately for safety concerns, fraud, or noncompliance.', {
      x: margin,
      y: yPosition,
      size: 10,
      font,
    });
    yPosition -= lineHeight * 3;

    // Use service client to download signatures
    const serviceClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Download holder signature
    const { data: holderSigData } = await serviceClient.storage
      .from('agreements')
      .download(ph.mou_holder_sig_url);

    // Download admin signature
    const { data: adminSigData } = await serviceClient.storage
      .from('agreements')
      .download(ph.mou_admin_sig_url);

    if (holderSigData && adminSigData) {
      // Embed signatures
      const holderSigBytes = await holderSigData.arrayBuffer();
      const adminSigBytes = await adminSigData.arrayBuffer();
      
      const holderSigImage = await pdfDoc.embedPng(new Uint8Array(holderSigBytes));
      const adminSigImage = await pdfDoc.embedPng(new Uint8Array(adminSigBytes));

      // Signatures section
      page.drawText('Signatures', {
        x: margin,
        y: yPosition,
        size: 12,
        font: boldFont,
      });
      yPosition -= lineHeight * 2;

      // Program Holder signature
      const holderSigDims = holderSigImage.scale(0.2);
      page.drawImage(holderSigImage, {
        x: margin,
        y: yPosition - holderSigDims.height,
        width: holderSigDims.width,
        height: holderSigDims.height,
      });
      yPosition -= holderSigDims.height + 5;

      page.drawText(`${ph.mou_holder_name}`, {
        x: margin,
        y: yPosition,
        size: 10,
        font,
      });
      yPosition -= lineHeight;

      page.drawText(`Program Holder - ${ph.name}`, {
        x: margin,
        y: yPosition,
        size: 10,
        font,
      });
      yPosition -= lineHeight;

      page.drawText(`Date: ${new Date(ph.mou_holder_signed_at!).toLocaleDateString()}`, {
        x: margin,
        y: yPosition,
        size: 10,
        font,
      });
      yPosition -= lineHeight * 3;

      // Admin signature
      const adminSigDims = adminSigImage.scale(0.2);
      page.drawImage(adminSigImage, {
        x: margin,
        y: yPosition - adminSigDims.height,
        width: adminSigDims.width,
        height: adminSigDims.height,
      });
      yPosition -= adminSigDims.height + 5;

      page.drawText(`${ph.mou_admin_name}`, {
        x: margin,
        y: yPosition,
        size: 10,
        font,
      });
      yPosition -= lineHeight;

      page.drawText('Elevate for Humanity Career & Technical Institute', {
        x: margin,
        y: yPosition,
        size: 10,
        font,
      });
      yPosition -= lineHeight;

      page.drawText(`Date: ${new Date(ph.mou_admin_signed_at!).toLocaleDateString()}`, {
        x: margin,
        y: yPosition,
        size: 10,
        font,
      });
    }

    // Save PDF
    const pdfBytes = await pdfDoc.save();

    // Upload to storage
    const pdfPath = `program_holders/${ph.id}/MOU_signed.pdf`;
    const { error: uploadError } = await serviceClient.storage
      .from('agreements')
      .upload(pdfPath, pdfBytes, { contentType: 'application/pdf', upsert: true });

    if (uploadError) {
      console.error('PDF upload error:', uploadError);
      return new Response(uploadError.message, { status: 500 });
    }

    // Update program holder with PDF path
    const { error: updateError } = await supabase
      .from('program_holders')
      .update({ mou_final_pdf_url: pdfPath })
      .eq('id', ph.id);

    if (updateError) {
      console.error('Update error:', updateError);
      return new Response(updateError.message, { status: 500 });
    }

    // Generate signed URL for email (valid for 7 days)
    const { data: signedUrlData } = await serviceClient.storage
      .from('agreements')
      .createSignedUrl(pdfPath, 60 * 60 * 24 * 7); // 7 days

    const pdfDownloadUrl = signedUrlData?.signedUrl;

    // Send email notifications
    if (pdfDownloadUrl) {
      const contactEmail = ph.application?.[0]?.contact_email;
      const recipients = [
        contactEmail,
        process.env.MOU_ARCHIVE_EMAIL || 'agreements@elevateforhumanity.org'
      ].filter(Boolean) as string[];

      if (recipients.length > 0) {
        const resend = getResendClient();
        if (resend) {
          try {
            await resend.emails.send({
            from: process.env.EMAIL_FROM || 'Elevate for Humanity <noreply@elevateforhumanity.org>',
            to: recipients,
            subject: `Fully Executed MOU – ${ph.name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #2563eb;">MOU Fully Executed</h2>
                
                <p>The Memorandum of Understanding between Elevate for Humanity and <strong>${ph.name}</strong> has been fully executed.</p>
                
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">Signature Details</h3>
                  <p><strong>Program Holder:</strong> ${ph.mou_holder_name}<br/>
                  <strong>Signed:</strong> ${new Date(ph.mou_holder_signed_at!).toLocaleDateString()}</p>
                  
                  <p><strong>Elevate Representative:</strong> ${ph.mou_admin_name}<br/>
                  <strong>Signed:</strong> ${new Date(ph.mou_admin_signed_at!).toLocaleDateString()}</p>
                  
                  <p><strong>Revenue Share:</strong> ${Math.round((ph.payout_share || 0.333) * 100)}% of Net Program Revenue</p>
                </div>
                
                <p>You can download the fully executed MOU using the link below (valid for 7 days):</p>
                
                <p style="text-align: center; margin: 30px 0;">
                  <a href="${pdfDownloadUrl}" 
                     style="background-color: #2563eb; color: white; padding: 12px 24px; 
                            text-decoration: none; border-radius: 6px; display: inline-block;">
                    Download Signed MOU
                  </a>
                </p>
                
                <p style="font-size: 12px; color: #6b7280; margin-top: 30px;">
                  The signed MOU is also stored securely in the Elevate agreements archive and can be accessed 
                  at any time through your program holder portal.
                </p>
                
                <p>Best regards,<br>
                <strong>Elevate for Humanity Team</strong></p>
              </div>
            `
            });
          } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Don't fail the request if email fails
          }
        }
      }
    }

    return Response.json({ 
      success: true,
      pdfUrl: pdfPath
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return new Response('Failed to generate PDF', { status: 500 });
  }
}
