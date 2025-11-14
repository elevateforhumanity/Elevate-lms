import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { generateMOUPDF } from '@/lib/mou-pdf-generator';
import { PDFDocument } from 'pdf-lib';
import { sendMOUSignedConfirmation, sendMOUSignedAdminNotification } from '@/lib/email-mou-notifications';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await req.json();
  const { signatureDataUrl, signerName, signerTitle } = body;

  if (!signatureDataUrl || !signerName || !signerTitle) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Get user's program holder
  const { data: prof } = await supabase
    .from('user_profiles')
    .select('program_holder_id')
    .eq('user_id', user.id)
    .single();

  if (!prof?.program_holder_id) {
    return Response.json({ error: 'No program holder found' }, { status: 404 });
  }

  // Get program holder details
  const { data: holder, error: holderError } = await supabase
    .from('program_holders')
    .select(`
      id,
      name,
      payout_share,
      mou_status,
      application:program_holder_applications(
        contact_name,
        contact_email,
        phone,
        site_address
      )
    `)
    .eq('id', prof.program_holder_id)
    .single();

  if (holderError || !holder) {
    return Response.json({ error: 'Program holder not found' }, { status: 404 });
  }

  // Check if already signed
  if (holder.mou_status === 'signed') {
    return Response.json({ error: 'MOU already signed' }, { status: 400 });
  }

  try {
    // Generate base PDF
    const basePdfBytes = await generateMOUPDF({
      programHolderName: holder.name,
      payoutShare: holder.payout_share || 0.333,
      contactName: holder.application?.[0]?.contact_name,
      contactEmail: holder.application?.[0]?.contact_email,
      phone: holder.application?.[0]?.phone,
      siteAddress: holder.application?.[0]?.site_address,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });

    // Load PDF and add signature
    const pdfDoc = await PDFDocument.load(basePdfBytes);
    const pages = pdfDoc.getPages();
    const lastPage = pages[pages.length - 1];

    // Convert signature data URL to bytes
    const signatureImageBytes = Uint8Array.from(
      atob(signatureDataUrl.split(',')[1]),
      c => c.charCodeAt(0)
    );
    const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

    // Add signature to last page
    const signatureDims = signatureImage.scale(0.3);
    lastPage.drawImage(signatureImage, {
      x: 100,
      y: 150,
      width: signatureDims.width,
      height: signatureDims.height,
    });

    // Add signer info
    lastPage.drawText(`Signed by: ${signerName}`, {
      x: 100,
      y: 130,
      size: 10,
    });
    lastPage.drawText(`Title: ${signerTitle}`, {
      x: 100,
      y: 115,
      size: 10,
    });
    lastPage.drawText(`Date: ${new Date().toLocaleDateString('en-US')}`, {
      x: 100,
      y: 100,
      size: 10,
    });

    const signedPdfBytes = await pdfDoc.save();

    // Upload to Supabase Storage
    const filename = `${holder.id}_mou_signed_${Date.now()}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from('mous')
      .upload(filename, signedPdfBytes, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return Response.json({ error: 'Failed to upload signed MOU' }, { status: 500 });
    }

    // Update program holder status
    const signedAt = new Date().toISOString();
    const { error: updateError } = await supabase
      .from('program_holders')
      .update({
        mou_status: 'signed',
        mou_signed_at: signedAt,
        signed_mou_url: filename
      })
      .eq('id', holder.id);

    if (updateError) {
      console.error('Update error:', updateError);
      return Response.json({ error: 'Failed to update MOU status' }, { status: 500 });
    }

    // Send email notifications
    const emailData = {
      programHolderName: holder.name,
      signerName,
      signerTitle,
      contactEmail: holder.application?.[0]?.contact_email || '',
      signedAt
    };

    await Promise.all([
      sendMOUSignedConfirmation(emailData),
      sendMOUSignedAdminNotification(emailData)
    ]);

    return Response.json({ 
      success: true,
      message: 'MOU signed successfully'
    });

  } catch (error) {
    console.error('Error signing MOU:', error);
    return Response.json({ error: 'Failed to process signature' }, { status: 500 });
  }
}
