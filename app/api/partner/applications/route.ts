export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    const {
      shopName,
      dba,
      ein,
      ownerName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      zip,
      website,
      programsRequested,
      apprenticeCapacity,
      scheduleNotes,
      licenseNumber,
      licenseState,
      licenseExpiry,
      additionalNotes,
      agreedToTerms,
    } = body;

    // Validate required fields
    if (!shopName || !ownerName || !email || !phone || !addressLine1 || !city || !state || !zip) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!programsRequested || programsRequested.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one program' },
        { status: 400 }
      );
    }

    if (!agreedToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms to submit' },
        { status: 400 }
      );
    }

    // Check for existing application with same email
    const { data: existingApp } = await supabase
      .from('partner_applications')
      .select('id, status')
      .eq('email', email.toLowerCase())
      .in('status', ['pending', 'approved'])
      .single();

    if (existingApp) {
      return NextResponse.json(
        { error: 'An application with this email already exists' },
        { status: 400 }
      );
    }

    // Create the application
    const { data: application, error: insertError } = await supabase
      .from('partner_applications')
      .insert({
        shop_name: shopName,
        dba: dba || null,
        ein: ein || null,
        owner_name: ownerName,
        email: email.toLowerCase(),
        phone,
        address_line1: addressLine1,
        address_line2: addressLine2 || null,
        city,
        state,
        zip,
        website: website || null,
        programs_requested: programsRequested,
        apprentice_capacity: apprenticeCapacity || 1,
        schedule_notes: scheduleNotes || null,
        license_number: licenseNumber || null,
        license_state: licenseState || null,
        license_expiry: licenseExpiry || null,
        additional_notes: additionalNotes || null,
        agreed_to_terms: true,
        agreed_at: new Date().toISOString(),
        status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to create partner application:', insertError);
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    // Send confirmation email to applicant
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';
      await fetch(`${siteUrl}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: 'Partner Shop Application Received - Elevate for Humanity',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e3a8a;">Partner Shop Application Received</h2>
              <p>Hi ${ownerName},</p>
              <p>Thank you for applying to become a Partner Shop with Elevate for Humanity!</p>
              
              <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Application Details</h3>
                <p><strong>Shop:</strong> ${shopName}</p>
                <p><strong>Programs:</strong> ${programsRequested.join(', ')}</p>
                <p><strong>Application ID:</strong> ${application.id}</p>
              </div>
              
              <h3>What's Next?</h3>
              <ol>
                <li>Our team will review your application within 1-3 business days</li>
                <li>You'll receive an email with your approval status</li>
                <li>Once approved, you'll get a link to access your Partner Dashboard</li>
              </ol>
              
              <p>Questions? Call us at <a href="tel:3173143757">(317) 314-3757</a></p>
              
              <p>Best regards,<br><strong>Elevate for Humanity Team</strong></p>
            </div>
          `,
        }),
      });
    } catch (emailError) {
      console.warn('Failed to send confirmation email:', emailError);
    }

    // Send notification to admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'elizabethpowell6262@gmail.com';
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';
      await fetch(`${siteUrl}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: adminEmail,
          subject: `New Partner Shop Application: ${shopName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e3a8a;">New Partner Shop Application</h2>
              
              <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="margin: 0; font-weight: bold;">Action Required: Review and approve/deny this application</p>
              </div>
              
              <h3>Shop Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Shop Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${shopName}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Owner:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${ownerName}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${email}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Phone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${phone}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Location:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${city}, ${state}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Programs:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${programsRequested.join(', ')}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Capacity:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${apprenticeCapacity} apprentice(s)</td></tr>
              </table>
              
              <div style="margin-top: 24px; text-align: center;">
                <a href="${siteUrl}/admin/partners" style="display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Review Application</a>
              </div>
            </div>
          `,
        }),
      });
    } catch (emailError) {
      console.warn('Failed to send admin notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      applicationId: application.id,
    });
  } catch (error) {
    console.error('Partner application error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - List applications (admin only)
export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';

    const { data: applications, error } = await supabase
      .from('partner_applications')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
