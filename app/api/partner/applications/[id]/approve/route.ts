export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createAdminClient();

    // Get the application
    const { data: application, error: fetchError } = await supabase
      .from('partner_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.status !== 'pending') {
      return NextResponse.json({ error: 'Application already processed' }, { status: 400 });
    }

    // Create the partner entity with 'submitted' status (not active until docs complete)
    const { data: partner, error: partnerError } = await supabase
      .from('partners')
      .insert({
        name: application.shop_name,
        dba: application.dba,
        ein: application.ein,
        owner_name: application.owner_name,
        email: application.email,
        phone: application.phone,
        address_line1: application.address_line1,
        address_line2: application.address_line2,
        city: application.city,
        state: application.state,
        zip: application.zip,
        website: application.website,
        apprentice_capacity: application.apprentice_capacity,
        schedule_notes: application.schedule_notes,
        license_number: application.license_number,
        license_state: application.license_state,
        license_expiry: application.license_expiry,
        status: 'active',
        account_status: 'submitted', // Requires document upload to become 'active'
        approved_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (partnerError || !partner) {
      console.error('Failed to create partner:', partnerError);
      return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
    }

    // Create program access entitlements
    for (const programId of application.programs_requested) {
      await supabase.from('partner_program_access').insert({
        partner_id: partner.id,
        program_id: programId,
        can_view_apprentices: true,
        can_enter_progress: true,
        can_view_reports: true,
      });
    }

    // Update application status
    await supabase
      .from('partner_applications')
      .update({
        status: 'approved',
        reviewed_at: new Date().toISOString(),
        partner_id: partner.id,
      })
      .eq('id', id);

    // Send magic link email to partner
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';
    
    // Generate magic link via Supabase
    const { data: magicLinkData, error: magicLinkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: application.email,
      options: {
        redirectTo: `${siteUrl}/partner/dashboard`,
      },
    });

    let loginLink = `${siteUrl}/login`;
    if (magicLinkData?.properties?.action_link) {
      loginLink = magicLinkData.properties.action_link;
    }

    // If user doesn't exist, create them
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const userExists = existingUsers?.users?.find(u => u.email?.toLowerCase() === application.email.toLowerCase());

    if (!userExists) {
      // Create user with magic link
      const { data: newUser, error: createUserError } = await supabase.auth.admin.createUser({
        email: application.email,
        email_confirm: true,
        user_metadata: {
          full_name: application.owner_name,
          partner_id: partner.id,
        },
      });

      if (!createUserError && newUser?.user) {
        // Create partner_user link
        await supabase.from('partner_users').insert({
          user_id: newUser.user.id,
          partner_id: partner.id,
          role: 'partner_admin',
          status: 'active',
          activated_at: new Date().toISOString(),
        });

        // Create profile
        await supabase.from('profiles').upsert({
          id: newUser.user.id,
          email: application.email,
          full_name: application.owner_name,
          role: 'partner_admin',
        });

        // Generate new magic link for the created user
        const { data: newMagicLink } = await supabase.auth.admin.generateLink({
          type: 'magiclink',
          email: application.email,
          options: {
            redirectTo: `${siteUrl}/partner/dashboard`,
          },
        });
        if (newMagicLink?.properties?.action_link) {
          loginLink = newMagicLink.properties.action_link;
        }
      }
    } else {
      // Link existing user to partner
      await supabase.from('partner_users').upsert({
        user_id: userExists.id,
        partner_id: partner.id,
        role: 'partner_admin',
        status: 'active',
        activated_at: new Date().toISOString(),
      });
    }

    // Send approval email with login link
    try {
      await fetch(`${siteUrl}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: application.email,
          subject: '🎉 Partner Application Approved - Elevate for Humanity',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #16a34a;">Congratulations! Your Partner Application is Approved!</h2>
              <p>Hi ${application.owner_name},</p>
              <p>Great news! Your application for <strong>${application.shop_name}</strong> has been approved.</p>
              
              <div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #166534;">You're approved for:</h3>
                <ul style="margin: 0; padding-left: 20px;">
                  ${application.programs_requested.map((p: string) => `<li>${p.charAt(0).toUpperCase() + p.slice(1)} Program</li>`).join('')}
                </ul>
              </div>
              
              <div style="text-align: center; margin: 24px 0;">
                <a href="${loginLink}" style="display: inline-block; background: #7c3aed; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px;">Upload Documents & Activate →</a>
              </div>
              
              <p style="color: #64748b; font-size: 14px;">This link will log you in automatically. If it expires, you can request a new one at ${siteUrl}/login</p>
              
              <h3>Next Steps:</h3>
              <ol>
                <li><strong>Upload required documents</strong> (MOU, W-9, licenses, insurance)</li>
                <li>Once documents are verified, your account will be fully activated</li>
                <li>Then you can view apprentices and enter progress</li>
              </ol>
              
              <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Action Required:</strong> Upload your documents to complete activation.</p>
              </div>
              
              <p>Questions? Call us at <a href="tel:3173143757">(317) 314-3757</a></p>
              
              <p>Welcome to the team!<br><strong>Elevate for Humanity</strong></p>
            </div>
          `,
        }),
      });
    } catch (emailError) {
      console.warn('Failed to send approval email:', emailError);
    }

    return NextResponse.json({ success: true, partnerId: partner.id });
  } catch (error) {
    console.error('Approve error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
