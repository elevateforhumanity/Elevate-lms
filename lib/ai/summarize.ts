import OpenAI from "openai";
import { logger } from "@/lib/logger";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function summarizeText(text: string, maxLength = 200) {
  if (!process.env.OPENAI_API_KEY) {
    logger.warn("OpenAI API key not configured");
    return text.slice(0, maxLength) + "...";
  }

  try {
    const res = await client.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "Summarize content at 8th-grade reading level. Be concise and clear.",
        },
        { role: "user", content: text },
      ],
      temperature: 0.5,
      max_tokens: 150,
    });

    return res.choices[0].message.content || text.slice(0, maxLength) + "...";
  } catch { /* Error handled silently */ 
    logger.error("Summarization error", error as Error, {
      textLength: text.length,
      maxLength
    });
    return text.slice(0, maxLength) + "...";
  }
}

export async function summarizeLessonContent(lessonContent: string) {
  return summarizeText(lessonContent, 300);
}

export async function summarizeModuleContent(moduleContent: string) {
  return summarizeText(moduleContent, 500);
}
