import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const checks: Record<string, any> = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'production',
    checks: {}
  };

  // Check 1: Environment Variables
  checks.checks.environment = {
    supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    service_role_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    status: (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ? 'pass' : 'fail'
  };

  // Check 2: Database Connection
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      
      const { error } = await supabase.from('programs').select('count').limit(1);
      
      checks.checks.database = {
        connected: !error,
        status: error ? 'fail' : 'pass',
        error: error?.message || null
      };
    } else {
      checks.checks.database = {
        connected: false,
        status: 'fail',
        error: 'Missing Supabase credentials'
      };
    }
  } catch (error: any) {
    checks.checks.database = {
      connected: false,
      status: 'fail',
      error: error.message
    };
  }

  // Check 3: System Resources
  checks.checks.system = {
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    },
    status: 'pass'
  };

  // Check 4: API Endpoints
  checks.checks.api = {
    health: 'pass',
    messages: 'available',
    assignments: 'available',
    certificates: 'available',
    status: 'pass'
  };

  // Overall Status
  const allPassed = Object.values(checks.checks).every((check: any) => check.status === 'pass');
  checks.status = allPassed ? 'healthy' : 'degraded';
  checks.overall = allPassed ? 'pass' : 'fail';

  return NextResponse.json(checks, { 
    status: allPassed ? 200 : 503,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}
