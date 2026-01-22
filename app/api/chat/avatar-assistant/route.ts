import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIClient, isOpenAIConfigured } from '@/lib/openai-client';
import { 
  MASTER_AVATAR_PROMPT, 
  getPageScript,
  getStatusScript 
} from '@/lib/avatar-scripts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatRequest {
  message: string;
  route?: string;           // Current page route (e.g., "/programs/cna")
  userRole?: string;        // learner, employer, partner, staff
  enrollmentStatus?: string; // submitted, under_review, approved, denied, enrolled, etc.
  fundingType?: string;     // wioa, wrg, jri, self_pay, employer_sponsored
  hasMissingDocs?: boolean;
  history?: Array<{ role: 'user' | 'assistant'; content: string }>;
  // Legacy support
  context?: string;
}

/**
 * Build the system prompt based on page context
 * ONE GLOBAL AVATAR with deterministic routing
 */
function buildSystemPrompt(req: ChatRequest): string {
  let prompt = MASTER_AVATAR_PROMPT + '\n\n';

  // Add page-specific script if route provided
  if (req.route) {
    const pageScript = getPageScript(req.route);
    if (pageScript) {
      prompt += `Current page: ${req.route}\n`;
      prompt += `Opening script: ${pageScript.opening}\n`;
      prompt += `Default next action: ${pageScript.nextAction}\n\n`;
    }
  }

  // Add status-specific guidance
  if (req.enrollmentStatus) {
    const statusScript = getStatusScript(req.enrollmentStatus);
    if (statusScript) {
      prompt += `User status: ${req.enrollmentStatus}\n`;
      prompt += `Status guidance: ${statusScript}\n\n`;
    }
  }

  // Add missing docs warning
  if (req.hasMissingDocs) {
    prompt += `IMPORTANT: User has missing or incomplete documents. Prioritize document completion.\n`;
    prompt += getStatusScript('doc_pending') + '\n\n';
  }

  // Add funding context
  if (req.fundingType) {
    const fundingLabels: Record<string, string> = {
      wioa: 'WIOA (federal workforce funding)',
      wrg: 'Workforce Ready Grant (Indiana state)',
      jri: 'Justice Reinvestment Initiative',
      self_pay: 'Self-pay',
      employer_sponsored: 'Employer-sponsored',
    };
    prompt += `Funding path: ${fundingLabels[req.fundingType] || req.fundingType}\n\n`;
  }

  // Add role context
  if (req.userRole) {
    prompt += `User role: ${req.userRole}\n\n`;
  }

  prompt += `Remember: Max 3 sentences. End with ONE next action.`;

  return prompt;
}

export async function POST(request: NextRequest) {
  try {
    if (!isOpenAIConfigured()) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 503 }
      );
    }

    const body: ChatRequest = await request.json();
    const { message, history = [] } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build deterministic system prompt based on context
    const systemPrompt = buildSystemPrompt(body);
    const openai = getOpenAIClient();

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...history.slice(-6).map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 150, // Shorter for spoken avatar
      temperature: 0.3, // Lower temperature for more deterministic responses
    });

    const reply = completion.choices[0]?.message?.content || 
      "I can help with that. What specific information do you need?";

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error('Avatar chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to retrieve opening script for a page
 * Used for initial avatar message on page load
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const route = searchParams.get('route');

  if (!route) {
    return NextResponse.json(
      { error: 'Route parameter required' },
      { status: 400 }
    );
  }

  const pageScript = getPageScript(route);

  if (!pageScript) {
    // Default opening for unknown pages
    return NextResponse.json({
      opening: "Welcome. I can help you navigate training, funding, enrollment, or credentials. What do you need?",
      nextAction: "Tell me what you're looking for.",
    });
  }

  return NextResponse.json(pageScript);
}
