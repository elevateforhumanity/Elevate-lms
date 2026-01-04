import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Fill existing PDF forms (government forms with fillable fields)
 * Proxies to Python backend for PyPDF2 form filling
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { templatePath, data, outputPath } = body;

    if (!templatePath || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: templatePath, data' },
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

    const response = await fetch(`${backendUrl}/api/pdf/fill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify({
        template_path: templatePath,
        data,
        output_path: outputPath,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'PDF fill failed' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
