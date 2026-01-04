import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minutes for portal automation

/**
 * Automate government portal submissions (SBA, SAM.gov, etc.)
 * Proxies to Python backend for Playwright automation
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user has admin/worker role
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (!profile || !['admin', 'staff'].includes(profile.role)) {
    return NextResponse.json(
      { error: 'Insufficient permissions' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { portalUrl, formData, action } = body;

    if (!portalUrl || !formData) {
      return NextResponse.json(
        { error: 'Missing required fields: portalUrl, formData' },
        { status: 400 }
      );
    }

    // Call Python backend
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:7070';
    const apiKey = process.env.BACKEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Backend not configured' },
        { status: 503 }
      );
    }

    const response = await fetch(`${backendUrl}/api/portal/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        portal_url: portalUrl,
        form_data: formData,
        action: action || 'submit',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'Portal automation failed' },
        { status: response.status }
      );
    }

    const result = await response.json();
    
    // Log automation activity
    await supabase.from('automation_logs').insert({
      user_id: user.id,
      action: 'portal_submit',
      portal_url: portalUrl,
      status: 'success',
      result,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
