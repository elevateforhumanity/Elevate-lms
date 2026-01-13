import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { toError, toErrorMessage } from '@/lib/safe';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { message, conversationId, mode } = await request.json();

  if (!message) {
    return NextResponse.json({ error: 'Message required' }, { status: 400 });
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    return NextResponse.json(
      {
        error:
          'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.',
      },
      { status: 500 }
    );
  }

  try {
    // Get conversation history if exists
    let messages = [];
    if (conversationId) {
      const { data: history } = await supabase
        .from('ai_conversations')
        .select('messages')
        .eq('id', conversationId)
        .eq('user_id', user.id)
        .single();

      if (history) {
        messages = history.messages || [];
      }
    }

    // Add system prompt based on mode
    const systemPrompts = {
      chat: 'You are a helpful AI tutor. Provide clear, educational responses to help students learn.',
      essay:
        'You are an essay writing assistant. Help students improve their writing with constructive feedback and suggestions.',
      'study-guide':
        'You are a study guide creator. Help students create comprehensive study materials and summaries.',
    };

    const systemMessage = {
      role: 'system',
      content:
        systemPrompts[mode as keyof typeof systemPrompts] || systemPrompts.chat,
    };

    // Add user message
    messages.push({ role: 'user', content: message });

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error?.message || 'OpenAI API error' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message;

    // Add AI response to messages
    messages.push(aiMessage);

    // Save or update conversation
    let newConversationId = conversationId;
    if (!conversationId) {
      const { data: newConv } = await supabase
        .from('ai_conversations')
        .insert({
          user_id: user.id,
          mode,
          messages,
          title: message.substring(0, 50),
        })
        .select()
        .single();

      newConversationId = newConv?.id;
    } else {
      await supabase
        .from('ai_conversations')
        .update({ messages })
        .eq('id', conversationId)
        .eq('user_id', user.id);
    }

    return NextResponse.json({
      message: aiMessage.content,
      conversationId: newConversationId,
    });
  } catch { /* Error handled silently */ 
    logger.error(
      'AI Tutor error:',
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      { error: toErrorMessage(error) || 'Failed to process request' },
      { status: 500 }
    );
  }
}
