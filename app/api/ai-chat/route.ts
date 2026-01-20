
export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import { logger } from '@/lib/logger';

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not set on the server" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Missing messages array" },
        { status: 400 }
      );
    }

    // Safety: only keep role/content
    const messages = body.messages.map((item: any) => ({
      role: item.role === "user" ? "user" : "assistant",
      content: String(item.content || "")
    }));

    const systemPrompt = `
You are the Elevate for Humanity AI Helper.
- Tone: encouraging, smart, "boss energy", but professional.
- Focus: workforce development, apprenticeships, WIOA/WRG/JRI, program design, grants, and wellness.
- You DO NOT invent legal approvals or guarantees.
- You can help brainstorm copy, explain processes, and suggest next steps.
- You help with program descriptions, grant writing, student communications, and partner outreach.
- You understand Indiana workforce ecosystem: Modern Apprenticeship, WIOA, WRG, JRI.
- Programs include: Truck Driving (CDL), HVAC Tech, Barbering, CNA, and more.
- All training is 100% free for eligible participants through WIOA funding.
If user asks anything unsafe, redirect them to safe, legal, positive options.
    `.trim();

    const payload = {
      model: "gpt-4o-mini", // Using gpt-4o-mini instead of gpt-5.1-mini
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000
    };

    const res = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json().catch((parseErr) => {
        logger.error('Failed to parse error response:', parseErr);
        return {};
      });
      logger.error("OpenAI error:", err);
      return NextResponse.json(
        { error: "OpenAI request failed", details: err },
        { status: 500 }
      );
    }

    const data = await res.json();
    const reply =
      data.choices?.[0]?.message?.content ??
      "I couldn't generate a response. Try asking in a different way.";

    return NextResponse.json({ reply });
  } catch (error) { /* Error handled silently */ 
    logger.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
