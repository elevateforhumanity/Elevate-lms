
export const runtime = 'nodejs';
export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import { logger } from '@/lib/logger';

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Fallback response when API key is not configured
      const userMessage = body?.messages?.slice(-1)?.[0]?.content?.toLowerCase() || '';
      
      let fallbackReply = `Thanks for reaching out! I'm here to help you learn about Elevate for Humanity's free career training programs.

**Quick Info:**
• Training is 100% FREE for eligible Indiana residents through WIOA funding
• Programs: Healthcare (CNA), Skilled Trades (HVAC, CDL), Barbering, and more
• Call us: (317) 314-3757
• Apply online: elevateforhumanity.org/apply

What would you like to know more about?`;

      if (userMessage.includes('apply') || userMessage.includes('start') || userMessage.includes('enroll')) {
        fallbackReply = `Great! Here's how to apply:

1. Visit **elevateforhumanity.org/apply**
2. Complete the eligibility questionnaire (10-15 min)
3. Upload required documents (ID, proof of income)
4. Schedule your orientation

Training is 100% FREE for eligible participants! Call (317) 314-3757 if you need help.`;
      } else if (userMessage.includes('program') || userMessage.includes('course') || userMessage.includes('training')) {
        fallbackReply = `We offer FREE training in:

**Healthcare:** CNA, Phlebotomy, Medical Assistant
**Skilled Trades:** HVAC, Electrical, CDL Truck Driving
**Professional:** Barbering, Cosmetology
**Technology:** IT Fundamentals, Microsoft Office

All programs include job placement assistance! Visit elevateforhumanity.org/programs for details.`;
      } else if (userMessage.includes('free') || userMessage.includes('cost') || userMessage.includes('pay') || userMessage.includes('money')) {
        fallbackReply = `Yes! Training is **100% FREE** for eligible participants through:

• **WIOA** - For low-income individuals
• **JRI** - For justice-involved individuals  
• **WRG** - Indiana Workforce Ready Grant

Check your eligibility at elevateforhumanity.org/wioa-eligibility or call (317) 314-3757.`;
      } else if (userMessage.includes('eligib') || userMessage.includes('qualify')) {
        fallbackReply = `To qualify for FREE training, you generally need to be:

✓ Indiana resident
✓ 18+ years old
✓ US citizen or authorized to work
✓ Meet income guidelines (varies by family size)

Check your eligibility at elevateforhumanity.org/wioa-eligibility or call (317) 314-3757 for help!`;
      } else if (userMessage.includes('contact') || userMessage.includes('call') || userMessage.includes('phone') || userMessage.includes('person') || userMessage.includes('human')) {
        fallbackReply = `You can reach our team at:

📞 **Phone:** (317) 314-3757
📧 **Email:** info@elevateforhumanity.org
🌐 **Website:** elevateforhumanity.org

We're here to help you start your career journey!`;
      }

      return NextResponse.json({ reply: fallbackReply });
    }

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
You are the Elevate for Humanity AI Assistant - a helpful, friendly guide for prospective students and visitors.

**About Elevate for Humanity:**
- Nonprofit workforce development organization in Indianapolis, Indiana
- DOL Registered Apprenticeship Sponsor
- WIOA-approved training provider
- JRI-approved for justice-involved individuals
- Training is 100% FREE for eligible participants

**Programs We Offer:**
- Healthcare: CNA, Phlebotomy, Medical Assistant, Peer Recovery Specialist
- Skilled Trades: HVAC, Electrical, Plumbing, Construction
- Transportation: CDL Truck Driving
- Professional: Barbering, Cosmetology, Business Administration
- Technology: IT Fundamentals, Microsoft Office Certification

**Funding Options:**
- WIOA (Workforce Innovation and Opportunity Act) - Free for eligible low-income individuals
- WRG (Workforce Ready Grant) - Indiana state funding
- JRI (Justice Reinvestment Initiative) - For justice-involved individuals
- Self-pay options with payment plans available

**Eligibility (General):**
- Indiana resident
- 18 years or older (some programs 17+)
- US citizen or authorized to work
- Meet income guidelines for WIOA (varies by family size)

**How to Apply:**
1. Visit elevateforhumanity.org/apply
2. Complete the eligibility questionnaire
3. Upload required documents
4. Schedule orientation

**Contact:**
- Phone: (317) 314-3757
- Email: info@elevateforhumanity.org
- Address: Indianapolis, Indiana

**Your Role:**
- Be friendly, encouraging, and supportive
- Answer questions about programs, eligibility, and the application process
- Help visitors find the right program for their goals
- Provide clear next steps
- If you don't know something specific, direct them to contact us or visit the website
- Never make guarantees about job placement or specific outcomes
- For complaints, refunds, or complex issues, direct to phone support

Keep responses concise but helpful. Use bullet points for clarity when listing information.
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
