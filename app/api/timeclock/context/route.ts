import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * GET /api/timeclock/context
 * Returns the authenticated user's timeclock context:
 * - apprenticeId (from apprentices table, not auth.uid directly)
 * - programId
 * - defaultSiteId (current_shop_id)
 * - allowedSites (sites the apprentice can clock into)
 * - activeShift (if currently clocked in)
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get apprentice record for this user
    const { data: apprentice, error: apprenticeError } = await supabase
      .from('apprentices')
      .select(`
        id,
        user_id,
        program_id,
        program_name,
        current_shop_id,
        status,
        hours_completed,
        total_hours_required
      `)
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (apprenticeError || !apprentice) {
      return NextResponse.json(
        { 
          error: 'No active apprenticeship found',
          code: 'NO_APPRENTICESHIP'
        },
        { status: 404 }
      );
    }

    // Get allowed sites (partner shops the apprentice can clock into)
    // For now, use current_shop_id as the only allowed site
    // In future, could expand to multiple assigned sites
    const allowedSites: { id: string; name: string; lat: number; lng: number; radius_m: number }[] = [];
    
    if (apprentice.current_shop_id) {
      const { data: shop } = await supabase
        .from('partner_shops')
        .select('id, name, latitude, longitude, geofence_radius_m')
        .eq('id', apprentice.current_shop_id)
        .single();
      
      if (shop) {
        allowedSites.push({
          id: shop.id,
          name: shop.name,
          lat: shop.latitude,
          lng: shop.longitude,
          radius_m: shop.geofence_radius_m || 100,
        });
      }
    }

    // Check for active shift (clocked in but not out)
    const { data: activeShift } = await supabase
      .from('progress_entries')
      .select('id, clock_in_at, lunch_start_at, lunch_end_at, site_id')
      .eq('apprentice_id', apprentice.id)
      .is('clock_out_at', null)
      .order('clock_in_at', { ascending: false })
      .limit(1)
      .single();

    // Get partner_id from the shop if available
    let partnerId: string | null = null;
    if (apprentice.current_shop_id) {
      const { data: shopPartner } = await supabase
        .from('partner_shops')
        .select('partner_id')
        .eq('id', apprentice.current_shop_id)
        .single();
      partnerId = shopPartner?.partner_id || null;
    }

    return NextResponse.json({
      apprenticeId: apprentice.id,
      userId: user.id,
      programId: apprentice.program_id,
      programName: apprentice.program_name,
      partnerId,
      defaultSiteId: apprentice.current_shop_id,
      allowedSites,
      hoursCompleted: apprentice.hours_completed,
      hoursRequired: apprentice.total_hours_required,
      activeShift: activeShift ? {
        entryId: activeShift.id,
        clockInAt: activeShift.clock_in_at,
        lunchStartAt: activeShift.lunch_start_at,
        lunchEndAt: activeShift.lunch_end_at,
        siteId: activeShift.site_id,
      } : null,
    });
  } catch (error) {
    console.error('Timeclock context error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
