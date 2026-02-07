/**
 * STRICT Database Health Check Endpoint
 * 
 * This endpoint FAILS with 500 if:
 * - Supabase env vars are missing
 * - Database connection fails
 * - Query execution fails
 * 
 * No mocks. No fallbacks. Real database or fail.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface HealthCheckResult {
  status: 'pass' | 'fail';
  timestamp: string;
  config: {
    supabase_url_present: boolean;
    supabase_anon_key_present: boolean;
    supabase_service_role_key_present: boolean;
  };
  database: {
    connected: boolean;
    latency_ms: number;
    query_executed: string;
    result: any;
    error: string | null;
  };
  tables?: {
    name: string;
    row_count: number;
  }[];
}

export async function GET(): Promise<NextResponse<HealthCheckResult>> {
  const timestamp = new Date().toISOString();
  
  // Step 1: Check env vars - FAIL if missing
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const config = {
    supabase_url_present: !!supabaseUrl,
    supabase_anon_key_present: !!supabaseAnonKey,
    supabase_service_role_key_present: !!supabaseServiceRoleKey,
  };

  // HARD FAIL if required env vars missing
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      {
        status: 'fail',
        timestamp,
        config,
        database: {
          connected: false,
          latency_ms: 0,
          query_executed: 'NONE - missing env vars',
          result: null,
          error: `Missing required environment variables: ${!supabaseUrl ? 'NEXT_PUBLIC_SUPABASE_URL ' : ''}${!supabaseAnonKey ? 'NEXT_PUBLIC_SUPABASE_ANON_KEY' : ''}`.trim(),
        },
      },
      { status: 500 }
    );
  }

  // Step 2: Create client and run real query
  const startTime = Date.now();
  
  try {
    // Use service role key if available for full access, otherwise anon key
    const client = createClient(
      supabaseUrl,
      supabaseServiceRoleKey || supabaseAnonKey,
      {
        auth: { autoRefreshToken: false, persistSession: false },
      }
    );

    // Run a real query - get server time and test connectivity
    const { data: timeData, error: timeError } = await client
      .from('programs')
      .select('id, name, created_at')
      .limit(1);

    const latency = Date.now() - startTime;

    if (timeError) {
      return NextResponse.json(
        {
          status: 'fail',
          timestamp,
          config,
          database: {
            connected: false,
            latency_ms: latency,
            query_executed: 'SELECT id, name, created_at FROM programs LIMIT 1',
            result: null,
            error: timeError.message,
          },
        },
        { status: 500 }
      );
    }

    // Step 3: Get table counts for verification
    const tables: { name: string; row_count: number }[] = [];
    
    const tablesToCheck = ['programs', 'courses', 'enrollments', 'users', 'applications'];
    
    for (const tableName of tablesToCheck) {
      try {
        const { count, error } = await client
          .from(tableName)
          .select('*', { count: 'exact', head: true });
        
        if (!error && count !== null) {
          tables.push({ name: tableName, row_count: count });
        }
      } catch {
        // Table might not exist or no access - skip
      }
    }

    return NextResponse.json(
      {
        status: 'pass',
        timestamp,
        config,
        database: {
          connected: true,
          latency_ms: latency,
          query_executed: 'SELECT id, name, created_at FROM programs LIMIT 1',
          result: {
            row_returned: !!timeData && timeData.length > 0,
            sample: timeData?.[0] ? { id: timeData[0].id, name: timeData[0].name } : null,
          },
          error: null,
        },
        tables,
      },
      { status: 200 }
    );
  } catch (error) {
    const latency = Date.now() - startTime;
    
    return NextResponse.json(
      {
        status: 'fail',
        timestamp,
        config,
        database: {
          connected: false,
          latency_ms: latency,
          query_executed: 'SELECT id, name, created_at FROM programs LIMIT 1',
          result: null,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      },
      { status: 500 }
    );
  }
}
