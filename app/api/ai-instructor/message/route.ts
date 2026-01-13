import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;
import OpenAI from 'openai';
import { logger } from '@/lib/logger';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

const contextPrompts = {
  welcome:
    'You are a warm, encouraging AI instructor welcoming a new student to their training program. Be brief (2-3 sentences), supportive, and motivating.',
  lesson:
    'You are an AI instructor introducing a new lesson. Be encouraging, explain that learning takes time, and offer support. Keep it brief (2-3 sentences).',
  encouragement:
    'You are an AI instructor providing encouragement to a student who is progressing through their training. Be positive, specific, and motivating. Keep it brief (2-3 sentences).',
  completion:
    'You are an AI instructor congratulating a student on completing a module. Celebrate their achievement and encourage them to continue. Keep it brief (2-3 sentences).',
};

export async function POST(req: NextRequest) {
  try {
    if (!openai) {
      return NextResponse.json(
        { error: 'AI instructor not configured' },
        { status: 503 }
      );
    }

    const { programId, lessonId, context = 'welcome' } = await req.json();

    const systemPrompt =
      contextPrompts[context as keyof typeof contextPrompts] ||
      contextPrompts.welcome;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Generate an encouraging message for a student in program ${programId || 'general training'}, lesson ${lessonId || 'introduction'}.`,
        },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const message =
      completion.choices[0]?.message?.content ||
      "Welcome! I'm here to support your learning journey.";

    // Optional: Generate audio with ElevenLabs
    // const audioUrl = await generateAudio(message);

    return NextResponse.json({
      message,
      // audioUrl,
    });
  } catch { /* Error handled silently */ 
    logger.error(
      'AI Instructor error:',
      error instanceof Error ? error : new Error(String(error))
    );

    // Fallback messages if API fails
    const fallbackMessages = {
      welcome:
        "Welcome to your training! I'm here to guide you every step of the way. Let's get started on your path to success!",
      lesson:
        "Let's dive into this lesson together. Take your time, ask questions, and remember - every expert was once a beginner!",
      encouragement:
        "You're making great progress! Keep up the excellent work. Your dedication is paying off!",
      completion:
        "Congratulations on completing this module! You've worked hard and it shows. Ready for the next challenge?",
    };

    const { context = 'welcome' } = await req
      .json()
      .catch(() => ({ context: 'welcome' }));

    return NextResponse.json({
      message:
        fallbackMessages[context as keyof typeof fallbackMessages] ||
        fallbackMessages.welcome,
    });
  }
}
