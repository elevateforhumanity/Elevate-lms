import { NextRequest, NextResponse } from 'next/server';
import { getLearnerDashboardData, isDatabaseConfigured } from '@/lib/data/learner-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Check if database is configured
    if (isDatabaseConfigured()) {
      // When database is available, fetch real data
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (!authError && user) {
        // Fetch real data from database
        // This would be the full database query implementation
        // For now, return seeded data with user's ID
        const dashboardData = getLearnerDashboardData(user.id);
        return NextResponse.json(dashboardData);
      }
    }
    
    // Return seeded demonstration data
    const dashboardData = getLearnerDashboardData();
    return NextResponse.json(dashboardData);
    
  } catch (error) {
    // On any error, return seeded data
    const dashboardData = getLearnerDashboardData();
    return NextResponse.json(dashboardData);
  }
}
