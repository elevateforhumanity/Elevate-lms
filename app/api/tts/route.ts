import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_VOICE = 'en-US-JennyNeural';

export async function POST(request: NextRequest) {
  try {
    const { text, voice = DEFAULT_VOICE } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Limit text length
    const trimmedText = text.slice(0, 1000);

    // Dynamic import edge-tts
    const { tts } = await import('edge-tts');
    
    // Generate audio buffer
    const audioBuffer = await tts(trimmedText, {
      voice: voice,
      rate: '+0%',
      pitch: '+0Hz',
      volume: '+0%',
    });

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('TTS API error:', error);
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  const voice = searchParams.get('voice') || DEFAULT_VOICE;

  if (!text) {
    return NextResponse.json({ error: 'Text parameter required' }, { status: 400 });
  }

  const mockRequest = new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ text, voice }),
    headers: { 'Content-Type': 'application/json' },
  });

  return POST(mockRequest);
}
