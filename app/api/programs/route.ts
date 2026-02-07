export const runtime = 'edge';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';
import { sanitizeSearchInput } from '@/lib/utils';

export async function GET(request: Request) {
  // STRICT: Check env vars first - fail explicitly if missing
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { 
        status: 'error', 
        error: 'Database not configured',
        data_source: 'none',
        config: {
          supabase_url_present: !!supabaseUrl,
          supabase_key_present: !!supabaseKey,
        }
      },
      { status: 503 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const isActive = searchParams.get('active') !== 'false';

    let query = supabase
      .from('programs')
      .select('*')
      .eq('is_active', isActive)
      .order('name');

    // Filter by category
    if (category) {
      const sanitizedCategory = sanitizeSearchInput(category);
      query = query.ilike('category', `%${sanitizedCategory}%`);
    }

    // Filter by search term
    if (search) {
      const sanitizedSearch = sanitizeSearchInput(search);
      query = query.or(`name.ilike.%${sanitizedSearch}%,description.ilike.%${sanitizedSearch}%,slug.ilike.%${sanitizedSearch}%`);
    }

    const { data: programs, error } = await query;

    if (error) {
      logger.error('Error fetching programs from database:', error);
      return NextResponse.json(
        { 
          status: 'error', 
          error: 'Failed to fetch programs',
          data_source: 'supabase',
          db_error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'success',
      data_source: 'supabase',
      count: programs?.length || 0,
      programs: programs || [],
    });
  } catch (error) {
    logger.error('Error in programs API:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        error: 'Failed to fetch programs',
        data_source: 'supabase',
      },
      { status: 500 }
    );
  }
}
