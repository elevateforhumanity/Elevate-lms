// @ts-nocheck
export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * AI Chat Response API
 * OpenAI integration for intelligent chat responses
 */

import { NextRequest, NextResponse } from 'next/server';
import { parseBody, getErrorMessage } from '@/lib/api-helpers';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const { conversation_id, message, user_id } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!openai) {
      return NextResponse.json(
        {
          error: 'AI chat not configured',
          response: 'AI chat is currently unavailable. Please contact support.',
          needs_human: true,
        },
        { status: 503 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get conversation history
    const { data: messages } = await supabase
      .from('chat_messages')
      .select('content, is_ai_generated')
      .eq('conversation_id', conversation_id)
      .order('created_at', { ascending: true })
      .limit(10);

    // Build context for OpenAI
    const conversationHistory =
      messages?.map((msg) => ({
        role: msg.is_ai_generated ? 'assistant' : 'user',
        content: msg.content,
      })) || [];

    // System prompt for the AI
    const systemPrompt = `You are a helpful AI assistant for Elevate for Humanity, a workforce development platform.
Your role is to help students with:
- Course enrollment and registration
- Payment options and financial aid
- Technical support
- General questions about programs

Be friendly, professional, and concise. If you cannot help with something, offer to connect them with a human agent.

Available programs:
- Healthcare (CNA, Medical Assistant, Phlebotomy)
- Skilled Trades (HVAC, Electrical, Plumbing)
- Business (Accounting, Management, Marketing)
- Technology (IT Support, Cybersecurity, Web Development)
- Beauty & Cosmetology
- CDL Training

Payment options:
- Full payment (10% discount)
- Monthly payment plans
- Financial aid and scholarships
- Affirm financing (0% APR for 3 months)

If the user asks about:
- Specific pricing → Provide general ranges and suggest speaking with admissions
- Technical issues → Gather details and offer to escalate
- Enrollment → Guide them through the process
- Complex questions → Offer human agent assistance`;

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse =
      completion.choices[0]?.message?.content ||
      'I apologize, but I encountered an error. Let me connect you with a human agent.';

    // Check if human handoff is needed
    const needsHuman =
      message.toLowerCase().includes('speak to human') ||
      message.toLowerCase().includes('talk to agent') ||
      message.toLowerCase().includes('real person') ||
      aiResponse.toLowerCase().includes('human agent') ||
      aiResponse.toLowerCase().includes('connect you with');

    // Save AI context
    await supabase.from('ai_chat_context').insert({
      conversation_id,
      context_data: {
        messages: conversationHistory,
        last_prompt: message,
        last_response: aiResponse,
      },
      tokens_used: completion.usage?.total_tokens || 0,
      model: 'gpt-4-turbo-preview',
    });

    return NextResponse.json({
      response: aiResponse,
      needs_human: needsHuman,
      tokens_used: completion.usage?.total_tokens || 0,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: 'Failed to get AI response',
        response:
          "I apologize, but I'm having trouble right now. Let me connect you with a human agent who can help.",
        needs_human: true,
      },
      { status: 500 }
    );
  }
}
